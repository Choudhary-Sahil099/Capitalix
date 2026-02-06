import {useState} from "react";
import { Layers, Filter, Calendar, Download } from "lucide-react";
export const transactions = [
  {
    id: 1,
    type: "Buy",
    asset: "AAPL",
    assetName: "Apple Inc.",
    quantity: 10,
    price: 182.45,
    total: 1824.5,
    status: "Completed",
    date: "2026-02-04",
    time: "10:15 AM",
  },
  {
    id: 2,
    type: "Sell",
    asset: "TSLA",
    assetName: "Tesla Inc.",
    quantity: 5,
    price: 238.12,
    total: 1190.6,
    status: "Completed",
    date: "2026-02-03",
    time: "02:40 PM",
  },
  {
    id: 3,
    type: "Buy",
    asset: "BTC",
    assetName: "Bitcoin",
    quantity: 0.02,
    price: 43120,
    total: 862.4,
    status: "Completed",
    date: "2026-02-03",
    time: "11:05 AM",
  },
  {
    id: 4,
    type: "Buy",
    asset: "ETH",
    assetName: "Ethereum",
    quantity: 0.5,
    price: 2280,
    total: 1140,
    status: "Pending",
    date: "2026-02-02",
    time: "06:20 PM",
  },
  {
    id: 5,
    type: "Sell",
    asset: "NFLX",
    assetName: "Netflix Inc.",
    quantity: 3,
    price: 512.3,
    total: 1536.9,
    status: "Completed",
    date: "2026-02-02",
    time: "01:10 PM",
  },
  {
    id: 6,
    type: "Buy",
    asset: "AMZN",
    assetName: "Amazon.com Inc.",
    quantity: 2,
    price: 165.8,
    total: 331.6,
    status: "Completed",
    date: "2026-02-01",
    time: "04:55 PM",
  },
  {
    id: 7,
    type: "Sell",
    asset: "SOL",
    assetName: "Solana",
    quantity: 12,
    price: 98.4,
    total: 1180.8,
    status: "Completed",
    date: "2026-02-01",
    time: "12:30 PM",
  },
  {
    id: 8,
    type: "Buy",
    asset: "GOOGL",
    assetName: "Alphabet Inc.",
    quantity: 4,
    price: 142.75,
    total: 571,
    status: "Completed",
    date: "2026-01-31",
    time: "03:05 PM",
  },
  {
    id: 9,
    type: "Buy",
    asset: "MSFT",
    assetName: "Microsoft Corp.",
    quantity: 6,
    price: 376.2,
    total: 2257.2,
    status: "Failed",
    date: "2026-01-31",
    time: "11:50 AM",
  },
  {
    id: 10,
    type: "Sell",
    asset: "ADA",
    assetName: "Cardano",
    quantity: 500,
    price: 0.62,
    total: 310,
    status: "Completed",
    date: "2026-01-30",
    time: "09:40 AM",
  },
];
const TransactionRec = () => {
  const [range, setRange] = useState("All Categories");

  const filters = [
    { label: "All Categories", icon: Layers },
    { label: "Filter", icon: Filter },
    { label: "This Year", icon: Calendar },
    { label: "Export", icon: Download },
  ];
  return (
    <div className="w-full h-168 rounded-xl bg-[#0e0d0d] flex flex-col p-6">
      <div className="flex justify-between items-center px-3 pb-4 border-b border-white/5">
        <input
          className="bg-black w-50 h-10 rounded-md text-white p-4 outline-none placeholder:text-gray-500"
          placeholder="Search"
        />
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
        <span>Date & Time</span>
        <span>Type</span>
        <span>Qty</span>
        <span>Total</span>
        <span>Status</span>
      </div>
      <div className="flex-1 overflow-y-auto mt-3 pr-2 hide-scrollbar">
        <div className="flex flex-col gap-3">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="grid grid-cols-[2.5fr_1.5fr_1fr_0.8fr_1fr_1fr]
                       items-center bg-[#141414] px-4 py-3 rounded-lg
                       hover:bg-[#1a1a1a] transition"
            >
              <div className="flex flex-col">
                <span className="text-white font-medium truncate">
                  {tx.asset}
                  <span className="text-gray-400 text-sm ml-1">
                    ({tx.assetName})
                  </span>
                </span>
              </div>
              <div className="flex flex-col text-sm text-gray-400">
                <span>{tx.date}</span>
                <span className="text-xs">{tx.time}</span>
              </div>

              <span
                className={`text-sm font-semibold ${
                  tx.type === "Buy" ? "text-green-500" : "text-red-500"
                }`}
              >
                {tx.type}
              </span>
              <span className="text-sm text-gray-300">{tx.quantity}</span>

              <span className="text-sm text-white font-medium">
                ${tx.total.toLocaleString()}
              </span>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-md w-fit
                ${
                  tx.status === "Completed"
                    ? "bg-green-500/10 text-green-500"
                    : tx.status === "Pending"
                      ? "bg-yellow-500/10 text-yellow-500"
                      : "bg-red-500/10 text-red-500"
                }`}
              >
                {tx.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionRec;
