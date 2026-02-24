import { getIndices, getTopMovers } from "../services/market.service.js";
import stocks from "../data/stocks.data.js";
import YahooFinance from "yahoo-finance2";

const yahooFinance = new YahooFinance({
  suppressNotices: ["yahooSurvey"],
});
export const fetchIndices = async (req, res) => {
  try {
    const data = await getIndices();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const fetchMovers = async (req, res) => {
  try {
    const data = await getTopMovers();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const searchStocks = (req, res) => {
  const query = req.query.q?.toLowerCase() || "";

  if (!query) {
    return res.json([]);
  }

  const ranked = stocks
    .map((stock) => {
      const symbol = stock.symbol.toLowerCase();
      const name = stock.name.toLowerCase();

      let score = 0;

      if (symbol === query) score = 4;               
      else if (symbol.startsWith(query)) score = 3;
      else if (name.startsWith(query)) score = 2;
      else if (symbol.includes(query) || name.includes(query)) score = 1;

      return { ...stock, score };
    })
    .filter(stock => stock.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 20)
    .map(({ score, ...rest }) => rest); 

  res.json(ranked);
};

export const getStockQuote = async (req, res) => {
  try {
    let { symbol } = req.params;

    if (!symbol.includes(".")) {
      symbol = `${symbol}.NS`;
    }

    const quote = await yahooFinance.quote(symbol);

    res.json({
      symbol: quote.symbol,
      name: quote.shortName,
      price: quote.regularMarketPrice,
      change: quote.regularMarketChangePercent,
    });
  } catch (error) {
    console.error("QUOTE ERROR:", error);
    res.status(500).json({ message: "Error fetching quote" });
  }
};

export const getStockChart = async (req, res) => {
  try {
    let { symbol } = req.params;
    const { range } = req.query;

    if (!symbol.includes(".")) {
      symbol = `${symbol}.NS`;
    }

    const now = new Date();
    let period1;
    let interval;

    switch (range) {
      case "1d":
        period1 = new Date(now - 1 * 24 * 60 * 60 * 1000);
        interval = "5m";
        break;

      case "1w":
        period1 = new Date(now - 7 * 24 * 60 * 60 * 1000);
        interval = "30m";
        break;

      case "1m":
        period1 = new Date(now - 30 * 24 * 60 * 60 * 1000);
        interval = "1d";
        break;

      case "6m":
        period1 = new Date(now - 180 * 24 * 60 * 60 * 1000);
        interval = "1d";
        break;

      case "1y":
      default:
        period1 = new Date(now - 365 * 24 * 60 * 60 * 1000);
        interval = "1d";
        break;
    }

    console.log("Range:", range);
    console.log("Period1:", period1);
    console.log("Interval:", interval);

    const result = await yahooFinance.chart(symbol, {
      period1: Math.floor(period1.getTime() / 1000),
      period2: Math.floor(now.getTime() / 1000),
      interval,
    });

    if (!result?.quotes?.length) {
      return res.status(404).json({ message: "No chart data found" });
    }

    const chartData = result.quotes.map((item) => ({
      date: item.date,
      close: item.close,
      volume: item.volume,
    }));

    res.json(chartData);

  } catch (error) {
    console.error("BACKEND CHART ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};