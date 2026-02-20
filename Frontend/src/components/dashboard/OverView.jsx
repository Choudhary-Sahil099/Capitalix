import React from "react";
import { BringToFront } from "lucide-react";

const OverView = ({ overview }) => {
  const data = [
    { name: "Account", value: "55AWAS5" },
    {
      name: "Invested",
      value: `₹${overview?.invested?.toFixed(2) || 0}`,
    },
    {
      name: "P&L",
      value: `₹${overview?.pnl?.toFixed(2) || 0}`,
    },
    {
      name: "Available Funds",
      value: `₹${overview?.availableBalance?.toFixed(2) || 0}`,
    },
  ];

  return (
    <div className="w-72 bg-[#0e0d0d] rounded-xl p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl text-[#a8a8a8]">Overview</h1>
        <BringToFront className="text-[#a8a8a8]" />
      </div>

      <div className="space-y-3">
        {data.map(({ name, value }, index) => (
          <div
            key={index}
            className="flex justify-between items-center text-sm"
          >
            <span className="text-[#a8a8a8]">{name}</span>
            <span className="text-white font-medium">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverView;