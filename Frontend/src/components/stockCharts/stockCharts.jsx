import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import API from "../../api/axios";

const StockChart = ({ symbol }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!symbol) return;

    const fetchChart = async () => {
      try {
        const res = await API.get(`/market/chart/${symbol}`);
        setData(res.data);
      } catch (err) {
        console.error("Chart fetch error:", err);
      }
    };

    fetchChart();
  }, [symbol]);

  return (
    <div style={{ width: "100%", height: 350 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="date" hide />
          <YAxis domain={["auto", "auto"]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="close"
            stroke="#4f46e5"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockChart;