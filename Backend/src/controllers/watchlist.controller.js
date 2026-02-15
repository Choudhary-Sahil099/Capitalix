import Watchlist from "../models/Watchlist.js";

export const addToWatchlist = async (req, res) => {
  try {
    const { watchlistName, stock } = req.body;

    let watchlist = await Watchlist.findOne({
      user: req.user._id,
      name: watchlistName,
    });

    if (!watchlist) {
      watchlist = await Watchlist.create({
        user: req.user._id,
        name: watchlistName,
        stocks: [stock],
      });

      return res.status(201).json(watchlist);
    }

    const exists = watchlist.stocks.find(
      (item) => item.asset === stock.asset
    );

    if (exists) {
      return res.status(400).json({ message: "Stock already exists" });
    }

    watchlist.stocks.push(stock);
    await watchlist.save();

    res.status(200).json(watchlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getWatchlist = async (req, res) => {
  try {
    const watchlists = await Watchlist.find({
      user: req.user._id,
    });

    const formatted = {};

    watchlists.forEach((wl) => {
      formatted[wl.name] = wl.stocks;
    });

    res.status(200).json(formatted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const removeFromWatchlist = async (req, res) => {
  try {
    const { watchlistName, asset } = req.params;

    const watchlist = await Watchlist.findOne({
      user: req.user._id,
      name: watchlistName,
    });

    if (!watchlist) {
      return res.status(404).json({ message: "Watchlist not found" });
    }

    watchlist.stocks = watchlist.stocks.filter(
      (item) => item.asset !== asset
    );

    await watchlist.save();

    res.status(200).json({ message: "Stock removed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
