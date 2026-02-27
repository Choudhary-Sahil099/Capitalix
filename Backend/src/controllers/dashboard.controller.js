import Transaction from "../models/Transaction.js";
import Watchlist from "../models/Watchlist.js";
import Wallet from "../models/Wallet.js";
import YahooFinance from "yahoo-finance2";

const yahooFinance = new YahooFinance({
  suppressNotices: ["yahooSurvey"],
});

const priceCache = {};

async function getCachedQuote(asset) {
  const now = Date.now();

  if (
    priceCache[asset] &&
    now - priceCache[asset].timestamp < 30000
  ) {
    return priceCache[asset].data;
  }

  const symbol = asset.endsWith(".NS")
    ? asset
    : asset + ".NS";

  const quote = await yahooFinance.quote(symbol);

  priceCache[asset] = {
    data: quote,
    timestamp: now,
  };

  return quote;
}

export const getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    let wallet = await Wallet.findOne({ user: userId });

    if (!wallet) {
      wallet = await Wallet.create({
        user: userId,
        balance: 1000000,
      });
    }

    const balance = wallet.balance;

    const transactions = await Transaction.find({
      user: userId,
    }).sort({ createdAt: 1 });

    const holdingsMap = {};
    let totalRealizedPnL = 0;

    transactions.forEach((t) => {
      const asset = t.asset;

      if (!holdingsMap[asset]) {
        holdingsMap[asset] = {
          quantity: 0,
          totalInvested: 0,
        };
      }

      if (t.type === "buy") {
        holdingsMap[asset].quantity += t.quantity;
        holdingsMap[asset].totalInvested += t.totalAmount;
      }

      if (t.type === "sell") {
        const currentQty = holdingsMap[asset].quantity;

        if (currentQty > 0) {
          const avgPrice =
            holdingsMap[asset].totalInvested / currentQty;

          const realizedProfit =
            (t.price - avgPrice) * t.quantity;

          totalRealizedPnL += realizedProfit;

          holdingsMap[asset].quantity -= t.quantity;
          holdingsMap[asset].totalInvested -=
            avgPrice * t.quantity;

          if (holdingsMap[asset].quantity <= 0) {
            holdingsMap[asset].quantity = 0;
            holdingsMap[asset].totalInvested = 0;
          }
        }
      }
    });

    const positions = (
      await Promise.all(
        Object.keys(holdingsMap).map(async (asset) => {
          const data = holdingsMap[asset];

          if (data.quantity <= 0) return null;

          try {
            const quote = await getCachedQuote(asset);

            const currentPrice =
              quote?.regularMarketPrice ?? 0;

            const invested = data.totalInvested;

            const currentValue =
              currentPrice * data.quantity;

            const unrealizedPnL =
              currentValue - invested;

            const percent =
              invested > 0
                ? (unrealizedPnL / invested) * 100
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
              pnl: +unrealizedPnL.toFixed(2),
              percent: +percent.toFixed(2),
            };
          } catch {
            return null;
          }
        })
      )
    ).filter(Boolean);

    const totalInvested = positions.reduce(
      (acc, p) => acc + p.invested,
      0
    );

    const totalCurrentValue = positions.reduce(
      (acc, p) => acc + p.currentValue,
      0
    );

    const totalUnrealizedPnL =
      totalCurrentValue - totalInvested;

    const totalPnL =
      totalRealizedPnL + totalUnrealizedPnL;

    const totalReturnPercent =
      totalInvested > 0
        ? (totalPnL / totalInvested) * 100
        : 0;

    const portfolioValue =
      balance + totalCurrentValue;

    const latestTransactions = transactions
      .slice(-5)
      .reverse();

    const watchlistDoc =
      await Watchlist.findOne({ user: userId });

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
                await getCachedQuote(stock.asset);

              const currentPrice =
                quote?.regularMarketPrice ?? 0;

              return {
                asset: stock.asset,
                assetName: stock.assetName,
                currentPrice:
                  +currentPrice.toFixed(2),
              };
            } catch {
              return {
                asset: stock.asset,
                assetName: stock.assetName,
                currentPrice: 0,
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
        totalRealizedPnL:
          +totalRealizedPnL.toFixed(2),
        totalUnrealizedPnL:
          +totalUnrealizedPnL.toFixed(2),
        totalPnL:
          +totalPnL.toFixed(2),
        totalReturnPercent:
          +totalReturnPercent.toFixed(2),
      },
      positions,
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