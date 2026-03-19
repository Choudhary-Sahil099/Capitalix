import Watchlist from "../models/Watchlist.js";
import YahooFinance from "yahoo-finance2";
import { checkWatchlistAlerts } from "../services/watchlist.services.js";
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

    const exists = watchlist.stocks.find((item) => item.asset === asset);

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
          const quote = await yahooFinance.quote(stock.asset + ".NS");

          return {
            asset: stock.asset,
            assetName: stock.assetName,
            currentPrice: quote.regularMarketPrice || 0,
            dayChange: quote.regularMarketChange || 0,
            dayPercent: quote.regularMarketChangePercent || 0,
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
      }),
    );
    await checkWatchlistAlerts(req.user._id, enrichedStocks, watchlist);
    res.json(enrichedStocks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeFromWatchlist = async (req, res) => {
  try {
    const { asset } = req.params;

    const updated = await Watchlist.findOneAndUpdate(
      { user: req.user._id },
      { $pull: { stocks: { asset } } },
      { new: true },
    );

    if (!updated) {
      return res.status(404).json({ message: "Watchlist not found" });
    }

    if (updated.stocks.length === 0) {
      return res.json([]);
    }

    const enrichedStocks = await Promise.all(
      updated.stocks.map(async (stock) => {
        try {
          const quote = await yahooFinance.quote(stock.asset + ".NS");

          return {
            asset: stock.asset,
            assetName: stock.assetName,
            currentPrice: quote.regularMarketPrice || 0,
            dayChange: quote.regularMarketChange || 0,
            dayPercent: quote.regularMarketChangePercent || 0,
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
      }),
    );

    res.status(200).json(enrichedStocks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSimilarStocks = async (req, res) => {
  try {
    let { symbol } = req.params;

    if (!symbol.includes(".")) {
      symbol = `${symbol}.NS`;
    }

    const profile = await yahooFinance.quoteSummary(symbol, {
      modules: ["assetProfile"],
    });

    const industry = profile?.assetProfile?.industry;

    console.log("Industry:", industry);

    if (!industry) {
      return res.json([]);
    }

    const search = await yahooFinance.search(industry);

    console.log("Search results:", search?.quotes);

    if (!search || !search.quotes) {
      return res.json([]);
    }

    const stocks = search.quotes
      .filter(
        (q) => q.symbol && q.symbol.endsWith(".NS") && q.symbol !== symbol,
      )
      .slice(0, 2);

    const similarStocks = await Promise.all(
      stocks.map(async (stock) => {
        try {
          const quote = await yahooFinance.quote(stock.symbol);

          return {
            symbol: stock.symbol.replace(".NS", ""),
            name: quote.shortName || stock.shortname,
            price: quote.regularMarketPrice || 0,
            change: quote.regularMarketChangePercent || 0,
          };
        } catch {
          return null;
        }
      }),
    );

    res.json(similarStocks.filter(Boolean));
  } catch (error) {
    console.error("SIMILAR STOCK ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch similar stocks",
      error: error.message,
    });
  }
};
