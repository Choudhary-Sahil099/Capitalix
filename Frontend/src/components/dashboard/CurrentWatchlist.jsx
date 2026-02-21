import React from "react";

const CurrentWatchlist = ({ watchlist = [] }) => {

  const stocks = watchlist.slice(0, 5).map((s) => ({
    _id: s.asset,
    stock: s.assetName,
    symbol: s.asset,
    rate: s.currentPrice || 0,
    change: s.dayPercent || 0,
  }));

  return (
    <div className="w-120 h-54 bg-[#0e0d0d] rounded-xl p-4 flex flex-col text-white">
      <h2 className="text-sm font-semibold mb-2">Watchlist</h2>

      <div className="flex-1 overflow-hidden">
        <table className="w-full table-fixed text-sm">
          <thead className="block text-gray-400">
            <tr className="table w-full table-fixed">
              <th className="text-left">Stock</th>
              <th className="text-left">Symbol</th>
              <th className="text-left">Mkt.Price</th>
              <th className="text-right">Return</th>
            </tr>
          </thead>

          <tbody className="block h-32 overflow-y-auto hide-scrollbar">
            {stocks.length === 0 ? (
              <tr className="table w-full">
                <td colSpan="4" className="text-center text-gray-500 py-4">
                  No stocks in watchlist
                </td>
              </tr>
            ) : (
              stocks.map((item) => (
                <tr
                  key={item._id}
                  className="table w-full table-fixed border-b border-gray-800 hover:bg-[#1a1a1a] transition-all"
                >
                  <td className="py-2 truncate">
                    {item.stock}
                  </td>
                  <td className="text-gray-400">
                    {item.symbol}
                  </td>
                  <td>
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-900 text-blue-300">
                      ₹{item.rate.toFixed(2)}
                    </span>
                  </td>
                  <td className="text-right font-semibold">
                    <div className="font-semibold">
                      ₹{item.rate.toFixed(2)}
                    </div>

                    <div
                      className={`text-xs ${
                        item.change >= 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {item.change >= 0 ? "+" : ""}
                      {item.change.toFixed(2)}%
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CurrentWatchlist;