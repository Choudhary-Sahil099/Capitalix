import Transaction from "../models/Transaction.js";

export const addTransaction = async (req, res) => {
  try {
    const { asset, type, quantity, price } = req.body;

    const transaction = await Transaction.create({
      user: req.user._id,
      asset,
      type,
      quantity,
      price,
    });

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
