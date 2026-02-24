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
    .filter((stock) => stock.score > 0)
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
    let { range } = req.query;

    if (!symbol.includes(".")) {
      symbol = `${symbol}.NS`;
    }

    const now = new Date();
    let startDate = new Date();
    let interval = "1d";

    switch (range) {
      case "1d":
        startDate.setDate(now.getDate() - 1);
        interval = "5m";
        break;

      case "1w":
        startDate.setDate(now.getDate() - 7);
        interval = "15m";
        break;

      case "1m":
        startDate.setMonth(now.getMonth() - 1);
        interval = "1h";
        break;

      case "6m":
        startDate.setMonth(now.getMonth() - 6);
        interval = "1d";
        break;

      case "1y":
      default:
        startDate.setFullYear(now.getFullYear() - 1);
        interval = "1d";
        break;
    }

    const result = await yahooFinance.chart(symbol, {
      period1: Math.floor(startDate.getTime() / 1000),
      period2: Math.floor(now.getTime() / 1000),
      interval,
    });

    if (!result || !result.quotes || result.quotes.length === 0) {
      return res.status(404).json({ message: "No chart data found" });
    }
    const uniqueMap = new Map();

    result.quotes.forEach((item) => {
      if (
        item.date &&
        item.open !== null &&
        item.high !== null &&
        item.low !== null &&
        item.close !== null
      ) {
        uniqueMap.set(item.date, {
          date: item.date,
          open: item.open,
          high: item.high,
          low: item.low,
          close: item.close,
          volume: item.volume,
        });
      }
    });

    const chartData = Array.from(uniqueMap.values()).sort(
      (a, b) => a.date - b.date
    );

    res.json(chartData);

  } catch (error) {
    console.error("🔥 BACKEND CHART ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};