import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const ranges = ["1d", "1w", "1m", "6m", "1y"];

const StockDetails = () => {
  const { symbol } = useParams();
  const [chartData, setChartData] = useState([]);
  const [stockInfo, setStockInfo] = useState(null);
  const [range, setRange] = useState("1y");

  useEffect(() => {
    const fetchStock = async () => {
      const res = await API.get(`/market/quote/${symbol}`);
      setStockInfo(res.data);
    };

    fetchStock();
  }, [symbol]);

  useEffect(() => {
    const fetchChart = async () => {
      const res = await API.get(`/market/chart/${symbol}?range=${range}`);
      setChartData(res.data);
      console.log("Fetching range:", range);
    };

    fetchChart();
  }, [symbol, range]);

  const isPositive = stockInfo?.change >= 0;
  const lineColor = isPositive ? "#16a34a" : "#dc2626";

  return (
    <div className="p-6 text-white">
      {stockInfo && (
        <div className="mb-6">
          <h1 className="text-3xl font-bold">{stockInfo.symbol}</h1>
          <p className="text-gray-400">{stockInfo.name}</p>

          <div className="flex items-center gap-4 mt-3">
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

      <div className="flex gap-4 mb-4">
        {ranges.map((r) => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className={`px-4 py-2 rounded-lg ${
              range === "1d"
                ? "bg-indigo-600 text-white"
                : "bg-gray-800 text-gray-400"
            }`}
          >
            {r.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-[#1a1a1a] p-4 rounded-xl h-[450px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="date" hide />
            <YAxis domain={["auto", "auto"]} />
            <Tooltip
              contentStyle={{ backgroundColor: "#111", border: "none" }}
            />
            <Line
              type="monotone"
              dataKey="close"
              stroke={lineColor}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StockDetails;
