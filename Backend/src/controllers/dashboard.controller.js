import Transaction from "../models/Transaction.js";
import Watchlist from "../models/Watchlist.js";
import YahooFinance from "yahoo-finance2";

const yahooFinance = new YahooFinance({
  suppressNotices: ["yahooSurvey"],
});

const INITIAL_BALANCE = 1000000;


const priceCache = {};

async function getCachedQuote(asset) {
  const now = Date.now();

  if (
    priceCache[asset] &&
    now - priceCache[asset].timestamp < 30000
  ) {
    return priceCache[asset].data;
  }

  const quote = await yahooFinance.quote(asset + ".NS");

  priceCache[asset] = {
    data: quote,
    timestamp: now,
  };

  return quote;
}

export const getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const transactions = await Transaction.find({
      user: userId,
    }).sort({ createdAt: 1 });

    const holdingsMap = {};
    let balance = INITIAL_BALANCE;


    transactions.forEach((t) => {
      const asset = t.asset;
      const amount = t.price * t.quantity;

      if (!holdingsMap[asset]) {
        holdingsMap[asset] = {
          quantity: 0,
          totalInvested: 0,
        };
      }

      if (t.type === "buy") {
        holdingsMap[asset].quantity += t.quantity;
        holdingsMap[asset].totalInvested += amount;
        balance -= amount;
      }

      if (t.type === "sell") {
        const currentQty = holdingsMap[asset].quantity;

        if (currentQty > 0) {
          const avgPrice =
            holdingsMap[asset].totalInvested / currentQty;

          holdingsMap[asset].totalInvested -=
            avgPrice * t.quantity;

          holdingsMap[asset].quantity -= t.quantity;
        }

        balance += amount;
      }
    });

    const positionPromises = Object.keys(holdingsMap).map(
      async (asset) => {
        const data = holdingsMap[asset];

        if (data.quantity <= 0) return null;

        try {
          const quote = await getCachedQuote(asset);

          const currentPrice =
            quote.regularMarketPrice || 0;

          const previousClose =
            quote.regularMarketPreviousClose ||
            currentPrice;

          const invested = data.totalInvested;
          const currentValue =
            currentPrice * data.quantity;

          const pnl = currentValue - invested;

          const percent =
            invested > 0 ? (pnl / invested) * 100 : 0;

          const dayChange =
            (currentPrice - previousClose) *
            data.quantity;

          const dayPercent =
            previousClose > 0
              ? ((currentPrice - previousClose) /
                  previousClose) *
                100
              : 0;

          return {
            asset,
            quantity: data.quantity,
            avgPrice: +(
              invested / data.quantity
            ).toFixed(2),
            currentPrice: +currentPrice.toFixed(2),
            invested: +invested.toFixed(2),
            currentValue: +currentValue.toFixed(2),
            pnl: +pnl.toFixed(2),
            percent: +percent.toFixed(2),
            dayChange: +dayChange.toFixed(2),
            dayPercent: +dayPercent.toFixed(2),
          };
        } catch {
          return null;
        }
      }
    );

    const positions = (
      await Promise.all(positionPromises)
    ).filter(Boolean);


    const totalInvested = positions.reduce(
      (acc, p) => acc + p.invested,
      0
    );

    const totalCurrentValue = positions.reduce(
      (acc, p) => acc + p.currentValue,
      0
    );

    const totalPnL =
      totalCurrentValue - totalInvested;

    const totalReturnPercent =
      totalInvested > 0
        ? (totalPnL / totalInvested) * 100
        : 0;

    const totalDayPnL = positions.reduce(
      (acc, p) => acc + p.dayChange,
      0
    );

    const totalDayPercent =
      totalCurrentValue > 0
        ? (totalDayPnL / totalCurrentValue) * 100
        : 0;

    const positionsWithAllocation =
      positions.map((p) => ({
        ...p,
        allocation:
          totalCurrentValue > 0
            ? +(
                (p.currentValue /
                  totalCurrentValue) *
                100
              ).toFixed(2)
            : 0,
      }));

    const portfolioValue =
      balance + totalCurrentValue;

    const latestTransactions =
      await Transaction.find({ user: userId })
        .sort({ createdAt: -1 })
        .limit(5);
    const watchlistDoc =
      await Watchlist.findOne({
        user: userId,
      });

    let watchlist = [];

    if (
      watchlistDoc &&
      watchlistDoc.stocks.length > 0
    ) {
      watchlist = await Promise.all(
        watchlistDoc.stocks
          .slice(0, 5)
          .map(async (stock) => {
            try {
              const quote =
                await getCachedQuote(
                  stock.asset
                );

              const currentPrice =
                quote.regularMarketPrice || 0;

              const previousClose =
                quote.regularMarketPreviousClose ||
                currentPrice;

              const dayChange =
                currentPrice -
                previousClose;

              const dayPercent =
                previousClose > 0
                  ? ((currentPrice -
                      previousClose) /
                      previousClose) *
                    100
                  : 0;

              return {
                asset: stock.asset,
                assetName:
                  stock.assetName,
                currentPrice:
                  +currentPrice.toFixed(2),
                dayChange:
                  +dayChange.toFixed(2),
                dayPercent:
                  +dayPercent.toFixed(2),
              };
            } catch {
              return {
                asset: stock.asset,
                assetName:
                  stock.assetName,
                currentPrice: 0,
                dayChange: 0,
                dayPercent: 0,
              };
            }
          })
      );
    }
    res.json({
      overview: {
        availableBalance:
          +balance.toFixed(2),
        portfolioValue:
          +portfolioValue.toFixed(2),
        totalInvested:
          +totalInvested.toFixed(2),
        totalCurrentValue:
          +totalCurrentValue.toFixed(2),
        totalPnL:
          +totalPnL.toFixed(2),
        totalReturnPercent:
          +totalReturnPercent.toFixed(2),
        totalDayPnL:
          +totalDayPnL.toFixed(2),
        totalDayPercent:
          +totalDayPercent.toFixed(2),
      },
      positions: positionsWithAllocation,
      transactions: latestTransactions,
      watchlist,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Dashboard error",
    });
  }
};