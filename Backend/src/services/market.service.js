import axios from "axios";
import YahooFinance from "yahoo-finance2";

const yahooFinance = new YahooFinance();
export const getIndices = async () => {
  try {
    const symbols = ["^NSEI", "^BSESN", "^NSEBANK"];

    const data = await Promise.all(
      symbols.map(async (symbol) => {
        const quote = await yahooFinance.quote(symbol);

        return {
          symbol: quote.symbol,
          name: quote.shortName || quote.longName || "Unknown",
          percent: Number((quote.regularMarketChangePercent ?? 0).toFixed(2)),
          price: Number((quote.regularMarketPrice ?? 0).toFixed(2)),
          change: Number((quote.regularMarketChange ?? 0).toFixed(2)),
        };
      })
    );

    return data;
  } catch (error) {
    console.error("Indices fetch error:", error.message);
    return [];
  }
};

export const getTopMovers = async () => {
  try {
    const params = (scrIds) => ({
      scrIds,
      count: 25,
      region: "IN",
      lang: "en-IN",
    });

    const [gainersRes, losersRes] = await Promise.all([
      axios.get(
        "https://query1.finance.yahoo.com/v1/finance/screener/predefined/saved",
        { params: params("day_gainers") }
      ),
      axios.get(
        "https://query1.finance.yahoo.com/v1/finance/screener/predefined/saved",
        { params: params("day_losers") }
      ),
    ]);

    const format = (quotes) =>
      (quotes ?? [])
        .filter((q) => q.symbol?.endsWith(".NS"))
        .slice(0, 5)
        .map((q) => ({
          symbol: q.symbol, 
          displaySymbol: q.symbol.replace(".NS", ""),
          name: q.shortName || q.longName || "Unknown",
          price: Number((q.regularMarketPrice ?? 0).toFixed(2)),
          percent: Number((q.regularMarketChangePercent ?? 0).toFixed(2)),
          change: Number((q.regularMarketChange ?? 0).toFixed(2)),
        }));

    const gainers = format(
      gainersRes.data?.finance?.result?.[0]?.quotes
    );

    const losers = format(
      losersRes.data?.finance?.result?.[0]?.quotes
    );

    return { gainers, losers };

  } catch (error) {
    console.error("Error fetching movers:", error.message);
    return { gainers: [], losers: [] };
  }
};