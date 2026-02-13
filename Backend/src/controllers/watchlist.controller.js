import Watchlist from "../models/Watchlist.js";

export const addToWatchlist = async (req, res) => {
  try {
    const { asset } = req.body;

    const exists = await Watchlist.findOne({
      user: req.user._id,
      asset,
    });

    if (exists) {
      return res.status(400).json({ message: "Already in watchlist" });
    }

    const item = await Watchlist.create({
      user: req.user._id,
      asset,
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getWatchlist = async (req, res) => {
  try {
    const items = await Watchlist.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeFromWatchlist = async (req, res) => {
  try {
    const item = await Watchlist.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!item) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json({ message: "Removed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
