import React, { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const UserGraph = ({ positions = [], balance = 0, transactions = [] }) => {
  const [range, setRange] = useState("week");

  const portfolioValue =
    balance +
    positions.reduce((acc, p) => acc + (p.currentValue || 0), 0);

  const chartData = useMemo(() => {
    if (!transactions.length) return [];

    const now = new Date();

    let runningTotal = 0;

    const filtered = transactions.filter((tx) => {
      const txDate = new Date(tx.createdAt);

      if (range === "day") {
        return txDate.toDateString() === now.toDateString();
      }

      if (range === "week") {
        const diff = (now - txDate) / (1000 * 60 * 60 * 24);
        return diff <= 7;
      }

      if (range === "month") {
        return (
          txDate.getMonth() === now.getMonth() &&
          txDate.getFullYear() === now.getFullYear()
        );
      }

      if (range === "year") {
        return txDate.getFullYear() === now.getFullYear();
      }

      return true;
    });

    return filtered.map((tx) => {
      const amount = tx.price * tx.quantity;

      if (tx.type === "buy") runningTotal += amount;
      else runningTotal -= amount;

      let label;

      if (range === "day") {
        label = new Date(tx.createdAt).toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        });
      } else if (range === "year") {
        label = new Date(tx.createdAt).toLocaleString("en-IN", {
          month: "short",
        });
      } else {
        label = new Date(tx.createdAt).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
        });
      }

      return {
        name: label,
        value: runningTotal,
      };
    });
  }, [transactions, range]);

  return (
    <div className="bg-[#0e0d0d] rounded-2xl p-6 w-full min-h-[420px] flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-[#a8a8a8] text-sm">Portfolio Value</h2>
          <p className="text-white text-3xl font-semibold mt-1">
            ₹ {portfolioValue.toFixed(2)}
          </p>
        </div>

        <div className="flex gap-2 bg-[#141414] p-1 rounded-xl">
          {["day", "week", "month", "year"].map((item) => (
            <button
              key={item}
              onClick={() => setRange(item)}
              className={`px-3 py-1 text-xs rounded-lg capitalize ${
                range === item
                  ? "bg-indigo-500 text-white"
                  : "text-[#a8a8a8]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
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
              domain={["auto", "auto"]}
            />

            <Tooltip />

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