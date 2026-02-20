import Transaction from "../models/Transaction.js";
import YahooFinance from "yahoo-finance2";

const yahooFinance = new YahooFinance();
const INITIAL_BALANCE = 1000000;

export const getPositions = async (req, res) => {
  try {
    const userId = req.user.id;

    const transactions = await Transaction.find({
      user: userId,
    }).sort({ createdAt: 1 });

    const holdingsMap = {};

    let totalBuyAmount = 0;
    let totalSellAmount = 0;

    transactions.forEach((t) => {
      if (!holdingsMap[t.asset]) {
        holdingsMap[t.asset] = {
          quantity: 0,
          totalInvested: 0,
        };
      }

      if (t.type === "buy") {
        holdingsMap[t.asset].quantity += t.quantity;
        holdingsMap[t.asset].totalInvested += t.quantity * t.price;
        totalBuyAmount += t.quantity * t.price;
      }

      if (t.type === "sell") {
        const currentQty = holdingsMap[t.asset].quantity;

        if (currentQty > 0) {
          const avgPrice = holdingsMap[t.asset].totalInvested / currentQty;

          holdingsMap[t.asset].totalInvested -= avgPrice * t.quantity;
          holdingsMap[t.asset].quantity -= t.quantity;
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

        const avgPrice = data.totalInvested / data.quantity;
        const currentPrice = quote.regularMarketPrice;
        const invested = data.totalInvested;
        const currentValue = currentPrice * data.quantity;
        const pnl = currentValue - invested;
        const percent = (pnl / invested) * 100;

        positions.push({
          asset,
          quantity: data.quantity,
          avgPrice,
          currentPrice,
          invested,
          currentValue,
          pnl,
          percent,
        });
      } catch {
        continue;
      }
    }

    const availableBalance = INITIAL_BALANCE - totalBuyAmount + totalSellAmount;

    res.json({
      initialBalance: INITIAL_BALANCE,
      availableBalance,
      positions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Positions error" });
  }
};
