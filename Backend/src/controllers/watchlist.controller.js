import Watchlist from "../models/Watchlist.js";
import YahooFinance from "yahoo-finance2";
const yahooFinance = new YahooFinance({
  suppressNotices: ["yahooSurvey"],
});
export const addToWatchlist = async (req, res) => {
  try {
    const { asset, assetName } = req.body;

    let watchlist = await Watchlist.findOne({
      user: req.user._id,
    });

    if (!watchlist) {
      watchlist = await Watchlist.create({
        user: req.user._id,
        stocks: [{ asset, assetName }],
      });

      return res.status(201).json(watchlist);
    }

    const exists = watchlist.stocks.find(
      (item) => item.asset === asset
    );

    if (exists) {
      return res.status(400).json({
        message: "Stock already exists",
      });
    }

    watchlist.stocks.push({ asset, assetName });
    await watchlist.save();

    res.status(200).json(watchlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getWatchlist = async (req, res) => {
  try {
    const watchlist = await Watchlist.findOne({
      user: req.user._id,
    });

    if (!watchlist || watchlist.stocks.length === 0) {
      return res.json([]);
    }

    const enrichedStocks = await Promise.all(
      watchlist.stocks.map(async (stock) => {
        try {
          const quote = await yahooFinance.quote(
            stock.asset + ".NS"
          );

          return {
            asset: stock.asset,
            assetName: stock.assetName,
            currentPrice: quote.regularMarketPrice || 0,
            dayChange:
              quote.regularMarketChange || 0,
            dayPercent:
              quote.regularMarketChangePercent || 0,
          };
        } catch {
          return {
            asset: stock.asset,
            assetName: stock.assetName,
            currentPrice: 0,
            dayChange: 0,
            dayPercent: 0,
          };
        }
      })
    );

    res.json(enrichedStocks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeFromWatchlist = async (req, res) => {
  try {
    const { asset } = req.params;

    const watchlist = await Watchlist.findOne({
      user: req.user._id,
    });

    if (!watchlist) {
      return res.status(404).json({
        message: "Watchlist not found",
      });
    }

    watchlist.stocks = watchlist.stocks.filter(
      (item) => item.asset !== asset
    );

    await watchlist.save();

    res.status(200).json({
      message: "Stock removed successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};