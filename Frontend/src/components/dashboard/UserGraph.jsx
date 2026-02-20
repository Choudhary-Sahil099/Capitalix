import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const UserGraph = ({ positions = [], balance = 0 }) => {
  const [range, setRange] = useState("week");

  const portfolioValue =
    balance +
    positions.reduce((acc, p) => acc + (p.currentValue || 0), 0);

  const chartData = {
    week: positions.map((p, index) => ({
      name: `P${index + 1}`,
      value: p.currentValue,
    })),
  };

  return (
    <div className="bg-[#0e0d0d] rounded-2xl p-6 w-full h-110 flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-[#a8a8a8] text-sm">Portfolio Value</h2>
          <p className="text-white text-3xl font-semibold mt-1">
            ₹ {portfolioValue.toFixed(2)}
          </p>
        </div>

        <div className="flex gap-2 bg-[#141414] p-1 rounded-xl">
          <button
            onClick={() => setRange("week")}
            className="px-3 py-1 text-xs rounded-lg bg-indigo-500 text-white"
          >
            Week
          </button>
        </div>
      </div>

      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData.week}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1f1f1f"
              vertical={false}
            />

            <XAxis
              dataKey="name"
              stroke="#6f6f6f"
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              stroke="#6f6f6f"
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#141414",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
              }}
            />

            <Line
              type="natural"
              dataKey="value"
              stroke="#6366f1"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserGraph;