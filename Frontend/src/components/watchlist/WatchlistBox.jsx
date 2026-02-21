import React, { useState, useEffect } from "react";
import Nvidia from "../../assets/nvidia.png";
import Alphabet from "../../assets/Alphabet.webp";
import API from "../../api/axios";

const WatchlistBox = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const { data } = await API.get("/watchlist");
        setWatchlist(data || []);

        if (data?.length > 0) {
          setSelectedStock(data[0]);
        }
      } catch (err) {
        console.log("Error fetching watchlist", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, []);

  if (loading) {
    return (
      <div className="text-white text-center py-20">
        Loading watchlist...
      </div>
    );
  }

  const similar = [
    {
      img: Nvidia,
      name: "NVIDIA Corp (NVDA)",
      current: 190.04,
      returns: { value: 4.05, percentage: -0.16 },
    },
    {
      img: Alphabet,
      name: "Alphabet Inc (GOOGL)",
      current: 234.32,
      returns: { value: 1.32, percentage: 0.03 },
    },
  ];

  return (
    <div className="flex gap-4">
      <div className="w-230 h-168 rounded-xl bg-[#0e0d0d] flex flex-col p-6">
        <h2 className="text-xl text-white font-semibold mb-6">
          My Watchlist
        </h2>
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] text-xs text-gray-400 px-4 pb-2 border-b border-white/5">
          <span>Asset</span>
          <span>Price</span>
          <span>Change</span>
          <span>%</span>
        </div>
        <div className="flex-1 overflow-y-auto mt-3 pr-2">
          {watchlist.length === 0 ? (
            <div className="text-gray-500 text-center py-10">
              No stocks in watchlist
            </div>
          ) : (
            watchlist.map((item) => (
              <div
                key={item.asset}
                onClick={() => setSelectedStock(item)}
                className={`grid grid-cols-[2fr_1fr_1fr_1fr] items-center px-4 py-3 border-b border-white/5 cursor-pointer transition ${
                  selectedStock?.asset === item.asset
                    ? "bg-indigo-500/10"
                    : "hover:bg-[#141414]"
                }`}
              >
                <div>
                  <p className="text-white font-medium">
                    {item.asset}
                  </p>
                  <p className="text-xs text-gray-400">
                    {item.assetName}
                  </p>
                </div>

                <span className="text-gray-300 text-sm">
                  ₹ {item.currentPrice?.toFixed(2)}
                </span>

                <span
                  className={`text-sm font-medium ${
                    item.dayChange >= 0
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {item.dayChange >= 0 ? "+" : ""}
                  {item.dayChange?.toFixed(2)}
                </span>

                <span
                  className={`text-sm font-medium ${
                    item.dayPercent >= 0
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {item.dayPercent >= 0 ? "+" : ""}
                  {item.dayPercent?.toFixed(2)}%
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="h-[380px] w-[350px] bg-[#0e0d0d] rounded-xl p-6">
          {selectedStock ? (
            <>
              <h2 className="text-lg font-semibold text-white">
                {selectedStock.asset}
              </h2>
              <p className="text-sm text-gray-400">
                {selectedStock.assetName}
              </p>

              <div className="mt-6">
                <p className="text-3xl font-bold text-white">
                  ₹ {selectedStock.currentPrice?.toFixed(2)}
                </p>
                <p
                  className={`text-sm mt-1 ${
                    selectedStock.dayChange >= 0
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {selectedStock.dayChange >= 0 ? "+" : ""}
                  {selectedStock.dayChange?.toFixed(2)} (
                  {selectedStock.dayPercent?.toFixed(2)}%)
                </p>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500 text-sm">
              Select a stock from the watchlist
            </div>
          )}
        </div>

        <div className="h-[240px] w-[350px] bg-[#0e0d0d] rounded-xl p-4 flex flex-col">
          <div className="flex justify-between items-center">
            <h3 className="text-md text-[#747070]">
              Similar Stocks
            </h3>
            <button className="text-sm underline text-blue-300">
              View more
            </button>
          </div>

          <div className="mt-4 flex flex-col gap-4">
            {similar.map((stock, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gradient-to-br from-[#141414] to-[#0f0f0f] px-5 py-4 rounded-2xl border border-white/5 hover:border-indigo-500/40 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
              >
                <div className="flex flex-col">
                  <span className="text-white font-semibold text-sm">
                    {stock.name}
                  </span>
                  <span className="text-xs text-gray-400 mt-1">
                    ${stock.current}
                  </span>
                </div>

                <div
                  className={`text-sm font-semibold ${
                    stock.returns.value >= 0
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {stock.returns.value >= 0 ? "+" : ""}
                  {stock.returns.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchlistBox;