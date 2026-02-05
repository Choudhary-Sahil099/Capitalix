import React from "react";

const stocks = [
  {
    stock: "Reliance Industries",
    symbol: "RELIANCE",
    type: "Equity",
    rate: 2458.4,
    change: +1.25,
  },
  {
    stock: "Tata Motors",
    symbol: "TATAMOTORS",
    type: "Equity",
    rate: 721.1,
    change: -0.85,
  },
  {
    stock: "HDFC Bank",
    symbol: "HDFCBANK",
    type: "Equity",
    rate: 1582.75,
    change: +0.45,
  }
];

const CurrentWatchlist = () => {
  return (
    <div className="w-120 h-54 bg-[#0e0d0d] rounded-xl p-4 flex flex-col text-white">
      <h2 className="text-sm font-semibold mb-2">Watchlist</h2>
      <div className="flex-1 overflow-hidden">
        <table className="w-full table-fixed text-sm">
          <thead className="block text-gray-400">
            <tr className="table w-full table-fixed">
              <th className="text-left">Stock</th>
              <th className="text-left">Symbol</th>
              <th className="text-left">Type</th>
              <th className="text-right">Rate</th>
            </tr>
          </thead>

          <tbody className="block h-32">
            {stocks.map((item) => (
              <tr
                key={item.symbol}
                className="table w-full table-fixed border-b border-gray-800 hover:bg-[#1a1a1a]"
              >
                <td className="py-2">{item.stock}</td>
                <td className="text-gray-400">{item.symbol}</td>
                <td>
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-900 text-blue-300">
                    {item.type}
                  </span>
                </td>
                <td className="text-right font-semibold">
                  <div className="font-semibold">₹{item.rate}</div>
                  <div
                    className={`text-xs ${
                      item.change > 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {item.change > 0 ? "+" : ""}
                    {item.change}%
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CurrentWatchlist;
