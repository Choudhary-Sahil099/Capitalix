import Transaction from "../models/Transaction.js";
import Wallet from "../models/Wallet.js";
import YahooFinance from "yahoo-finance2";
import { v4 as uuidv4 } from "uuid";
const yahooFinance = new YahooFinance({
  suppressNotices: ["yahooSurvey"],
});
export const addTransaction = async (req, res) => {
  try {
    const { asset, name, type, quantity } = req.body;

    if (!asset || !name || !type || !quantity) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const wallet = await Wallet.findOne({ user: req.user._id });

    if (!wallet) {
      return res.status(400).json({ message: "Wallet not found" });
    }

    const formattedSymbol = asset.endsWith(".NS") ? asset : asset + ".NS";
    const quote = await yahooFinance.quote(formattedSymbol);
    if (!quote || !quote.regularMarketPrice) {
      return res.status(400).json({
        message: "Unable to fetch live market price",
      });
    }

    const livePrice = quote.regularMarketPrice;

    if (!livePrice) {
      return res.status(400).json({ message: "Unable to fetch live price" });
    }

    const totalAmount = livePrice * quantity;

    const previousTransactions = await Transaction.find({
      user: req.user._id,
      asset,
    });

    let holdingQuantity = 0;

    previousTransactions.forEach((tx) => {
      if (tx.type === "buy") holdingQuantity += tx.quantity;
      if (tx.type === "sell") holdingQuantity -= tx.quantity;
    });

    if (type === "buy") {
      if (wallet.balance < totalAmount) {
        return res.status(400).json({ message: "Insufficient balance" });
      }
      wallet.balance -= totalAmount;
    }

    if (type === "sell") {
      if (holdingQuantity < quantity) {
        return res.status(400).json({ message: "Not enough shares to sell" });
      }
      wallet.balance += totalAmount;
    }

    const transaction = await Transaction.create({
      user: req.user._id,
      orderId: uuidv4(),
      asset,
      name,
      type,
      quantity,
      price: livePrice,
      totalAmount,
      status: "Completed",
    });

    await wallet.save();

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
