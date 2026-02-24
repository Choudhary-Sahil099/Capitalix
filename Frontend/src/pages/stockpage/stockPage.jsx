import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/axios";
import { createChart, CandlestickSeries } from "lightweight-charts";

const ranges = ["1d", "1w", "1m", "6m", "1y"];

const StockDetails = () => {
  const { symbol } = useParams();

  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const candleSeriesRef = useRef(null);

  const [stockInfo, setStockInfo] = useState(null);
  const [range, setRange] = useState("1y");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const res = await API.get(`/market/quote/${symbol}`);
        setStockInfo(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStock();
  }, [symbol]);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 450,
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
      timeScale: {
        borderColor: "#374151",
        timeVisible: true,
        secondsVisible: false,
      },
      localization: {
        locale: "en-IN",
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

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, []);

  useEffect(() => {
    const fetchChart = async () => {
      if (!candleSeriesRef.current) return;

      try {
        setLoading(true);

        const res = await API.get(`/market/chart/${symbol}?range=${range}`);

        const formattedData = res.data.map((item) => {
          const date = new Date(item.date);
          if (range === "1d" || range === "1w" || range === "1m") {
            const istOffset = 5.5 * 60 * 60 * 1000;
            return {
              time: Math.floor((date.getTime() + istOffset) / 1000),
              open: item.open,
              high: item.high,
              low: item.low,
              close: item.close,
            };
          }
          return {
            time: date.toISOString().split("T")[0],
            open: item.open,
            high: item.high,
            low: item.low,
            close: item.close,
          };
        });

        candleSeriesRef.current.setData(formattedData);
        chartRef.current.timeScale().fitContent();
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchChart();
  }, [symbol, range]);

  return (
    <div className="p-6 text-white">
      {stockInfo && (
        <div className="mb-4">
          <h1 className="text-3xl font-bold">{stockInfo.symbol}</h1>
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
            className={`px-3 py-1 text-sm rounded-md transition-all ${
              range === r
                ? "bg-indigo-600 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            {r.toUpperCase()}
          </button>
        ))}
      </div>

      {loading && <div className="text-gray-400 mb-2">Loading chart...</div>}
      <div
        ref={chartContainerRef}
        className="w-full h-[450px] rounded-2xl border border-gray-800 shadow-lg"
      />
    </div>
  );
};

export default StockDetails;
