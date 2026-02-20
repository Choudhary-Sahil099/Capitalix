import Transaction from "../models/Transaction.js";
import Watchlist from "../models/Watchlist.js";
import YahooFinance from "yahoo-finance2";

const yahooFinance = new YahooFinance();
const INITIAL_BALANCE = 1000000;

export const getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const transactions = await Transaction.find({
      user: userId,
    }).sort({ createdAt: 1 });

    const holdingsMap = {};
    let totalBuyAmount = 0;
    let totalSellAmount = 0;

    transactions.forEach((t) => {
      const asset = t.asset;

      if (!holdingsMap[asset]) {
        holdingsMap[asset] = {
          quantity: 0,
          totalInvested: 0,
        };
      }

      if (t.type.toLowerCase() === "buy") {
        holdingsMap[asset].quantity += t.quantity;
        holdingsMap[asset].totalInvested += t.quantity * t.price;
        totalBuyAmount += t.quantity * t.price;
      }

      if (t.type.toLowerCase() === "sell") {
        const currentQty = holdingsMap[asset].quantity;

        if (currentQty > 0) {
          const avgPrice =
            holdingsMap[asset].totalInvested / currentQty;

          holdingsMap[asset].totalInvested -= avgPrice * t.quantity;
          holdingsMap[asset].quantity -= t.quantity;
        }

        totalSellAmount += t.quantity * t.price;
      }
    });

    const positions = [];
    for (let asset in holdingsMap) {
      const data = holdingsMap[asset];

      if (data.quantity <= 0) continue;

      try {
        const quote = await yahooFinance.quote(asset + ".NS");

        if (!quote?.regularMarketPrice) continue;

        const currentPrice = quote.regularMarketPrice;
        const invested = data.totalInvested;
        const currentValue = currentPrice * data.quantity;
        const pnl = currentValue - invested;

        positions.push({
          asset,
          quantity: data.quantity,
          avgPrice: invested / data.quantity,
          currentPrice,
          invested,
          currentValue,
          pnl,
        });
      } catch {
        continue;
      }
    }

    const invested = positions.reduce(
      (acc, p) => acc + p.invested,
      0
    );

    const pnl = positions.reduce(
      (acc, p) => acc + p.pnl,
      0
    );

    const availableBalance =
      INITIAL_BALANCE - totalBuyAmount + totalSellAmount;

    const portfolioValue = availableBalance + 
      positions.reduce((acc, p) => acc + p.currentValue, 0);

    const latestTransactions = await Transaction.find({
      user: userId,
    })
      .sort({ createdAt: -1 })
      .limit(3);

    const watchlist = await Watchlist.find({
      user: userId,
    });

    res.json({
      overview: {
        invested,
        pnl,
        availableBalance,
        portfolioValue,
      },
      positions,
      transactions: latestTransactions,
      watchlist,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Dashboard error" });
  }
};