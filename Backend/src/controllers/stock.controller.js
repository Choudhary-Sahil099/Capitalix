import YahooFinance from "yahoo-finance2";

const yahooFinance = new YahooFinance({
  suppressNotices: ["yahooSurvey"],
});

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
        period1 = new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000);
        interval = "5m";
        break;

      case "1w":
        period1 = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        interval = "30m";
        break;

      case "1m":
        period1 = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        interval = "1d";
        break;

      case "6m":
        period1 = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);
        interval = "1d";
        break;

      case "1y":
      default:
        period1 = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        interval = "1d";
        break;
    }

    console.log("Range:", range);
    console.log("Period1:", period1);
    console.log("Interval:", interval);

    const result = await yahooFinance.chart(symbol, {
      period1: period1,
      period2: now,
      interval: interval,
    });

    if (!result?.quotes?.length) {
      return res.status(404).json({ message: "No data found" });
    }

    const chartData = result.quotes.map((item) => ({
      date: new Date(item.date).toLocaleString(),
      close: item.close,
      volume: item.volume,
    }));

    res.json(chartData);

  } catch (error) {
    console.error("Chart Error:", error);
    res.status(500).json({ message: error.message });
  }
};