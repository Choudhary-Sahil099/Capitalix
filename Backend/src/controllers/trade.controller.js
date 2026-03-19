import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import YahooFinance from "yahoo-finance2";
import { createNotification } from "../services/notification.services.js";

const yahooFinance = new YahooFinance();

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

    user.balance -= totalCost;
    await user.save();

    await Transaction.create({
      user: userId,
      symbol,
      type: "BUY",
      quantity,
      price: stockPrice,
      total: totalCost,
    });

    await createNotification({
      userId,
      type: "trade",
      title: "Order Executed",
      message: `Bought ${quantity} shares of ${symbol} at ₹${stockPrice}`,
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
    if (!stockPrice) {
      return res.status(400).json({ message: "Invalid stock symbol" });
    }

    const totalReturn = stockPrice * qty;

    user.balance += totalReturn;
    await user.save();
    await Transaction.create({
      user: userId,
      symbol,
      type: "SELL",
      quantity: qty,
      price: stockPrice,
      total: totalReturn,
    });
    await createNotification({
      userId,
      type: "trade",
      title: "Order Executed",
      message: `Sold ${qty} shares of ${symbol} at ₹${stockPrice}`,
    });
    if (totalReturn > 5000) {
      await createNotification({
        userId,
        type: "portfolio",
        title: "Portfolio Update",
        message: `You gained ₹${totalReturn.toFixed(2)} from ${symbol} `,
      });
    }

    res.status(200).json({
      message: "Stock sold successfully",
      balance: user.balance,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};