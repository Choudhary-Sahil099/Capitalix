import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import yahooFinance from "yahoo-finance2";

const getStockPrice = async (symbol) => {
  const quote = await yahooFinance.quote(symbol);
  return quote.regularMarketPrice;
};

export const buyStock = async (req, res) => {
  try {
    const { symbol, quantity } = req.body;
    const userId = req.user.id;

    if (!symbol || !quantity || quantity <= 0) {
      return res.status(400).json({ message: "Invalid data" });
    }

    const user = await User.findById(userId);
    const stockPrice = await getStockPrice(symbol);

    const totalCost = stockPrice * quantity;

    if (user.balance < totalCost) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // Deduct balance
    user.balance -= totalCost;
    await user.save();

    // Create transaction
    await Transaction.create({
      user: userId,
      symbol,
      type: "BUY",
      quantity,
      price: stockPrice,
      total: totalCost,
    });

    res.status(200).json({
      message: "Stock purchased successfully",
      balance: user.balance,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOwnedQuantity = async (userId, symbol) => {
  const transactions = await Transaction.find({ user: userId, symbol });

  let total = 0;

  transactions.forEach((tx) => {
    if (tx.type === "BUY") total += tx.quantity;
    if (tx.type === "SELL") total -= tx.quantity;
  });

  return total;
};
export const sellStock = async (req, res) => {
  try {
    const { symbol, quantity } = req.body;
    const userId = req.user.id;

    const qty = Number(quantity);

    if (!symbol || !qty || qty <= 0) {
      return res.status(400).json({ message: "Invalid data" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const ownedQty = await getOwnedQuantity(userId, symbol);

    if (ownedQty < qty) {
      return res.status(400).json({ message: "Not enough shares" });
    }

    const stockPrice = await getStockPrice(symbol);
    if (!stockPrice)
      return res.status(400).json({ message: "Invalid stock symbol" });

    const totalReturn = stockPrice * qty;

    user.balance += totalReturn;
    await user.save();

    await Transaction.create({
      user: userId,
      asset: symbol,
      name: quote.longName || quote.shortName,
      type: "buy",
      quantity,
      price: stockPrice,
      total,
    });

    res.status(200).json({
      message: "Stock sold successfully",
      balance: user.balance,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
