import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Plus } from "lucide-react";
import API from "../../api/axios";
import { createChart, CandlestickSeries } from "lightweight-charts";

const ranges = ["1d", "1w", "1m", "6m", "1y"];

const StockDetails = () => {
  const { symbol } = useParams();

  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const candleSeriesRef = useRef(null);
  const clampRef = useRef(null);
  const [stockInfo, setStockInfo] = useState(null);
  const [range, setRange] = useState("1y");
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [tradeLoading, setTradeLoading] = useState(false);
  const [tradeError, setTradeError] = useState("");
  const [watchlistLoading, setWatchlistLoading] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  useEffect(() => {
    let interval;
    const fetchStock = async () => {
      try {
        const res = await API.get(`/market/quote/${symbol}`);
        setStockInfo(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStock();
    interval = setInterval(fetchStock,4000);
    return () =>clearInterval(interval);
  }, [symbol]);

  useEffect(() => {
    const checkWatchlist = async () => {
      try {
        const res = await API.get("/watchlist");
        const exists = res.data.some((item) => item.symbol === symbol);
        setIsInWatchlist(exists);
      } catch (err) {
        console.error(err);
      }
    };

    checkWatchlist();
  }, [symbol]);

  const handleAddToWatchlist = async () => {
    if (!stockInfo || isInWatchlist) return;

    try {
      setWatchlistLoading(true);

      const cleanSymbol = stockInfo.symbol.replace(".NS", ""); // the backend only excepts the format or the stock name not with the teh .ns

      await API.post("/watchlist/add", {
        asset: cleanSymbol,
        assetName: stockInfo.name,
      });

      setIsInWatchlist(true);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add");
    } finally {
      setWatchlistLoading(false);
    }
  };

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      autoSize: true,
      height: 500,
      layout: {
        background: { color: "#0f0f0f" },
        textColor: "#d1d5db",
      },
      grid: {
        vertLines: { color: "#1f2937" },
        horzLines: { color: "#1f2937" },
      },
      rightPriceScale: {
        borderColor: "#374151",
      },
      handleScroll: {
        mouseWheel: true,
        pressedMouseMove: true,
        horzTouchDrag: true,
        vertTouchDrag: false,
      },
      handleScale: {
        mouseWheel: true,
        pinch: true,
        axisPressedMouseMove: true,
      },
      timeScale: {
        borderColor: "#374151",
        rightBarStaysOnScroll: false,
        rightOffset: 0,
        fixRightEdge: true,
        lockVisibleTimeRangeOnResize: true,
        minBarSpacing: 5,
      },
    });

    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#16a34a",
      downColor: "#dc2626",
      borderVisible: false,
      wickUpColor: "#16a34a",
      wickDownColor: "#dc2626",
    });

    chartRef.current = chart;
    candleSeriesRef.current = candleSeries;

    return () => {
      chart.remove();
    };
  }, []);

  useEffect(() => {
    let interval;
    const fetchChart = async () => {
      if (!candleSeriesRef.current || !chartRef.current) return;

      try {
        setLoading(true);
        const res = await API.get(`/market/chart/${symbol}?range=${range}`);

        const formattedData = res.data.map((item) => {
          const date = new Date(item.date);
          return {
            time:
              range === "1d" || range === "1w" || range === "1m"
                ? Math.floor(date.getTime() / 1000)
                : date.toISOString().split("T")[0],
            open: item.open,
            high: item.high,
            low: item.low,
            close: item.close,
          };
        });

        candleSeriesRef.current.setData(formattedData);

        const timeScale = chartRef.current.timeScale();
        timeScale.fitContent();
        timeScale.scrollToRealTime();

        const totalBars = formattedData.length;

        if (clampRef.current) {
          chartRef.current.unsubscribeVisibleLogicalRangeChange(
            clampRef.current,
          );
        }

        const clampRange = (range) => {
          if (!range) return;

          const length = range.to - range.from;
          let newFrom = range.from;
          let newTo = range.to;

          if (range.from < 0) {
            newFrom = 0;
            newTo = length;
          }

          if (range.to > totalBars) {
            newTo = totalBars;
            newFrom = totalBars - length;
          }

          if (newFrom !== range.from || newTo !== range.to) {
            timeScale.setVisibleLogicalRange({
              from: newFrom,
              to: newTo,
            });
          }
        };

        clampRef.current = clampRange;
        chartRef.current.subscribeVisibleLogicalRangeChange(clampRange);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchChart();
    interval = setInterval(fetchChart, 4000);
    return () => clearInterval(interval);
  }, [symbol, range]);

  const handleTrade = async (type) => {
    if (!quantity || quantity <= 0) return;

    try {
      setTradeLoading(true);
      setTradeError("");

      await API.post("/transactions", {
        asset: stockInfo.symbol,
        name: stockInfo.name,
        type,
        quantity: Number(quantity),
      });

      alert(`${type.toUpperCase()} order placed`);
    } catch (err) {
      setTradeError(err.response?.data?.message || "Transaction failed");
    } finally {
      setTradeLoading(false);
    }
  };

  return (
    <div className="p-6 text-white">
      <div className="flex gap-6 items-start">
        <div className="flex-1">
          {stockInfo && (
            <div className="mb-4">
              <div className="flex gap-5 items-center">
                <h1 className="text-3xl font-bold">{stockInfo.symbol}</h1>
                <Plus
                  onClick={handleAddToWatchlist}
                  className={`border rounded-sm p-1 cursor-pointer transition ${
                    isInWatchlist
                      ? "bg-green-500 text-black border-green-500"
                      : "border-white hover:bg-white hover:text-black"
                  } ${watchlistLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                />
              </div>

              <p className="text-gray-400">{stockInfo.name}</p>

              <div className="flex items-center gap-4 mt-2">
                <span className="text-4xl font-bold">₹{stockInfo.price}</span>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    stockInfo.change >= 0
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {stockInfo.change?.toFixed(2)}%
                </span>
              </div>
            </div>
          )}

          <div className="flex gap-3 mb-4">
            {ranges.map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`px-3 py-1 text-sm rounded-md ${
                  range === r
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                }`}
              >
                {r.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="w-80 bg-gray-900 p-4 rounded-xl border border-gray-800">
          <h2 className="text-lg font-semibold mb-3">Trade</h2>

          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="bg-gray-800 border border-gray-700 px-3 py-2 rounded-md w-full mb-3"
          />

          <div className="text-gray-400 mb-3">
            Total: ₹
            {stockInfo ? (stockInfo.price * quantity).toFixed(2) : "0.00"}
          </div>

          {tradeError && (
            <div className="text-red-400 text-sm mb-2">{tradeError}</div>
          )}

          <div className="flex gap-3">
            <button
              onClick={() => handleTrade("buy")}
              disabled={tradeLoading}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md w-full"
            >
              Buy
            </button>

            <button
              onClick={() => handleTrade("sell")}
              disabled={tradeLoading}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md w-full"
            >
              Sell
            </button>
          </div>
        </div>
      </div>

      {loading && <div className="text-gray-400 mt-4">Loading chart...</div>}

      <div
        ref={chartContainerRef}
        className="w-full h-[500px] rounded-2xl border border-gray-800 mt-4"
      />
    </div>
  );
};

export default StockDetails;
