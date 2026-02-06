import React, { useState } from "react";
import { Plus, Filter } from "lucide-react";

export const WATCHLIST_DATA = {
  Watchlist1: [
    {
      id: 1,
      asset: "AAPL",
      assetName: "Apple Inc.",
      quantity: 10,
      marketPrice: 185.2,
      invested: 1700,
      current: 1852,
      returns: {
        value: 152,
        percent: 8.94,
      },
    },
    {
      id: 2,
      asset: "TSLA",
      assetName: "Tesla Inc.",
      quantity: 5,
      marketPrice: 240.6,
      invested: 1100,
      current: 1203,
      returns: {
        value: 103,
        percent: 9.36,
      },
    },
    {
      id: 3,
      asset: "MSFT",
      assetName: "Microsoft Corp.",
      quantity: 6,
      marketPrice: 378.4,
      invested: 2100,
      current: 2270.4,
      returns: {
        value: 170.4,
        percent: 8.11,
      },
    },
  ],

  Watchlist2: [
    {
      id: 4,
      asset: "BTC",
      assetName: "Bitcoin",
      quantity: 0.05,
      marketPrice: 43250,
      invested: 2000,
      current: 2162.5,
      returns: {
        value: 162.5,
        percent: 8.12,
      },
    },
    {
      id: 5,
      asset: "ETH",
      assetName: "Ethereum",
      quantity: 0.8,
      marketPrice: 2290,
      invested: 1600,
      current: 1832,
      returns: {
        value: 232,
        percent: 14.5,
      },
    },
    {
      id: 6,
      asset: "SOL",
      assetName: "Solana",
      quantity: 15,
      marketPrice: 98.6,
      invested: 1200,
      current: 1479,
      returns: {
        value: -279,
        percent: 23.25,
      },
    },
  ],
};

const WatchlistBox = () => {
  const [range, setRange] = useState("All Categories");
  const [activeWatchlist, setActiveWatchlist] = useState("Watchlist1");
  const currentWatchlist = WATCHLIST_DATA[activeWatchlist] || [];
  const numbers = ["Watchlist1", "Watchlist2"];
  const filters = [
    { label: "Add New", icon: Plus },
    { label: "Filter", icon: Filter },
  ];

  return (
    <div className="flex gap-4">
      <div className="w-230 h-168 rounded-xl bg-[#0e0d0d] flex flex-col p-6">
      <div className="flex justify-between items-center px-3 pb-4 border-b border-white/5">
        <div className="flex gap-3">
          {numbers.map((item) => (
            <button
              key={item}
              onClick={() => setActiveWatchlist(item)}
              className={`text-sm px-4 py-2 rounded-lg transition
        ${
          activeWatchlist === item
            ? "bg-indigo-500 text-white"
            : "text-gray-400 hover:bg-[#222]"
        }`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="flex gap-2 bg-[#141414] p-1 rounded-xl">
          {filters.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => setRange(label)}
              className={`flex items-center gap-2 px-3 py-1 text-xs rounded-lg transition-all
                ${
                  range === label
                    ? "bg-indigo-500 text-white"
                    : "text-[#a8a8a8] hover:bg-[#222]"
                }`}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>
      </div>
      <div
        className="grid grid-cols-[2.5fr_1.5fr_1fr_0.8fr_1fr_1fr]
             h-8 items-center
             text-xs text-gray-400 px-2
             border-b border-white/5"
      >
        <span>Asset</span>
        <span>Quantity</span>
        <span>Mkt. Prize</span>
        <span>Invested</span>
        <span>Current</span>
        <span>Return</span>
      </div>
      <div className="flex-1 overflow-y-auto mt-3 pr-2 hide-scrollbar">
        <div className="flex flex-col gap-3">
          {currentWatchlist.map((tx) => (
            <div
              key={tx.id}
              className="grid grid-cols-[2.5fr_1.5fr_1fr_0.8fr_1fr_1fr]
           items-center bg-[#141414] px-4 py-3 rounded-lg
           hover:bg-[#1a1a1a] transition"
            >
              {/* Asset */}
              <div className="flex flex-col">
                <span className="text-white font-medium truncate">
                  {tx.asset}
                  <span className="text-gray-400 text-sm ml-1">
                    ({tx.assetName})
                  </span>
                </span>
              </div>
              <span className="text-sm text-gray-300">{tx.quantity}</span>
              <span className="text-sm text-gray-300">
                ${tx.marketPrice.toLocaleString()}
              </span>
              <span className="text-sm text-gray-300">
                ${tx.invested.toLocaleString()}
              </span>
              <span className="text-sm text-white font-medium">
                ${tx.current.toLocaleString()}
              </span>
              <span
                className={`text-sm font-semibold
        ${tx.returns.value >= 0 ? "text-green-500" : "text-red-500"}`}
              >
                {tx.returns.value >= 0 ? "+" : ""}
                {tx.returns.value.toLocaleString()} ({tx.returns.percent}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="flex flex-col gap-3">
          <div className="h-100 w-86 bg-[#0e0d0d] rounded-xl">

          </div>
          <div className="h-65 w-86 bg-[#0e0d0d] rounded-xl p-4 flex flex-col">
              <div className="flex justify-between items-center">
                <h3 className="text-md text-[#747070]">Similar Stocks</h3>
                <button className="text-sm underline text-blue-300">View more</button>
              </div>
          </div>
    </div>
    </div>
  );
};

export default WatchlistBox;
