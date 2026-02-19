import YahooFinance from "yahoo-finance2";

const yahooFinance = new YahooFinance();

export const getIndices = async () => {
  const symbols = ["^NSEI", "^BSESN", "^NSEBANK"];

  const data = await Promise.all(
    symbols.map(async (symbol) => {
      const quote = await yahooFinance.quote(symbol);

      return {
        symbol: quote.symbol,
        name: quote.shortName,
        percent: Number(quote.regularMarketChangePercent.toFixed(2)),
        price: Number(quote.regularMarketPrice.toFixed(2)),
        change: Number(quote.regularMarketChange.toFixed(2)),
      };
    }),
  );

  return data;
};

export const getTopMovers = async () => {
  const stocks = [
    "RELIANCE.NS",
    "TCS.NS",
    "INFY.NS",
    "HDFCBANK.NS",
    "ICICIBANK.NS",
    "SBIN.NS",
    "ITC.NS",
    "LT.NS",
  ];

  const quotes = await Promise.all(
    stocks.map((symbol) => yahooFinance.quote(symbol)),
  );

  const formatted = quotes.map((q) => ({
    symbol: q.symbol.replace(".NS", ""),
    name: q.shortName,
    price: q.regularMarketPrice,
    percent: q.regularMarketChangePercent,
  }));

  const gainers = [...formatted]
    .sort((a, b) => b.percent - a.percent)
    .slice(0, 4);

  const losers = [...formatted]
    .sort((a, b) => a.percent - b.percent)
    .slice(0, 4);

  return { gainers, losers };
};
