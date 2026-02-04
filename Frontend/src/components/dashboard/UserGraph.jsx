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

const UserGraph = () => {
  const [range, setRange] = useState("week");

  const chartData = {
    day: [
      { name: "9AM", value: 10500 },
      { name: "12PM", value: 10800 },
      { name: "3PM", value: 11000 },
      { name: "6PM", value: 11203 },
    ],
    week: [
      { name: "Mon", value: 400 },
      { name: "Tue", value: 300 },
      { name: "Wed", value: 500 },
      { name: "Thu", value: 200 },
      { name: "Fri", value: 600 },
      { name: "Sat", value: 700 },
      { name: "Sun", value: 450 },
    ],
    month: [
      { name: "W1", value: 2000 },
      { name: "W2", value: 2800 },
      { name: "W3", value: 2500 },
      { name: "W4", value: 3200 },
    ],
    year: [
      { name: "Jan", value: 3000 },
      { name: "Feb", value: 3200 },
      { name: "Mar", value: 3500 },
      { name: "Apr", value: 3300 },
      { name: "May", value: 3800 },
      { name: "Jun", value: 4200 },
      { name: "Jul", value: 1500 },
      { name: "Aug", value: 4600 },
      { name: "Sep", value: 6000 },
      { name: "Oct", value: 5600 },
      { name: "Nov", value: 3200 },
      { name: "Dec", value: 4000 },


    ],
  };

  return (
    <div className="bg-[#0e0d0d] rounded-2xl p-6 w-full h-110 flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-[#a8a8a8] text-sm">Portfolio Value</h2>
          <p className="text-white text-3xl font-semibold mt-1">
            ₹ 11,20,302
          </p>
        </div>

        <div className="flex gap-2 bg-[#141414] p-1 rounded-xl">
          {["day", "week", "month", "year"].map((item) => (
            <button
              key={item}
              onClick={() => setRange(item)}
              className={`px-3 py-1 text-xs rounded-lg capitalize transition-all
                ${
                  range === item
                    ? "bg-indigo-500 text-white"
                    : "text-[#a8a8a8] hover:bg-[#222]"
                }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData[range]}>
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#6366f1" stopOpacity={0.05} />
              </linearGradient>
            </defs>

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
                outline:"none",
                boxShadow:"none",
                borderRadius:"8px",
                color: "#fff",
              }}
              labelStyle={{ color: "#a8a8a8" }}
              cursor={{ stroke: "#6366f1", strokeDasharray: "4 4" }}
            />

            <Line
              type="natural"
              dataKey="value"
              stroke="url(#lineGradient)"
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 6,
                stroke: "#6366f1",
                strokeWidth: 2,
                fill: "#0e0d0d",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserGraph;
