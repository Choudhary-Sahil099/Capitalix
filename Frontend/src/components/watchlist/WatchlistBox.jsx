import React, { useState, useEffect } from "react";
import Nvidia from "../../assets/nvidia.png";
import Alphabet from "../../assets/Alphabet.webp";
import { Plus, Filter } from "lucide-react";
import API from "../../api/axios";

const WatchlistBox = () => {
  const [range, setRange] = useState("All Categories");
  const [activeWatchlist, setActiveWatchlist] = useState("");
  const [watchlist, setWatchlist] = useState({});
  const [selectedStock, setSelectedStock] = useState(null);
  const [loading, setLoading] = useState(true);

  const filters = [
    { label: "Add New", icon: Plus },
    { label: "Filter", icon: Filter },
  ];

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const { data } = await API.get("/watchlist");
        console.log("DATA FROM BACKEND:", data); // to verify that the frontend recieves the data from the backend
        setWatchlist(data);

        const keys = Object.keys(data);

        if (keys.length > 0) {
          setActiveWatchlist(keys[0]);

          if (data[keys[0]].length > 0) {
            setSelectedStock(data[keys[0]][0]);
          }
        }
      } catch (err) {
        console.log("Error fetching the watchlists", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, []);

  const currentWatchlist = watchlist[activeWatchlist] || [];
  const numbers = Object.keys(watchlist);

  if (loading) {
    return (
      <div className="text-white text-center py-20">
        Loading watchlists...
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
        <div className="flex justify-between items-center px-3 pb-4 border-b border-white/5">
          <div className="flex gap-3">
            {numbers.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setActiveWatchlist(item);
                  setSelectedStock(null);

                  if (watchlist[item]?.length > 0) {
                    setSelectedStock(watchlist[item][0]);
                  }
                }}
                className={`text-sm px-4 py-2 rounded-lg transition ${
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
                className={`flex items-center gap-2 px-3 py-1 text-xs rounded-lg transition-all ${
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
        <div className="grid grid-cols-[2.5fr_1.5fr_1fr_0.8fr_1fr_1fr] h-8 items-center text-xs text-gray-400 px-2 border-b border-white/5">
          <span>Asset</span>
          <span>Quantity</span>
          <span>Mkt. Price</span>
          <span>Invested</span>
          <span>Current</span>
          <span>Return</span>
        </div>
        <div className="flex-1 overflow-y-auto mt-3 pr-2 hide-scrollbar">
          <div className="flex flex-col gap-3">
            {currentWatchlist.length === 0 ? (
              <div className="text-gray-500 text-center py-10">
                No stocks in this watchlist
              </div>
            ) : (
              currentWatchlist.map((items) => (
                <div
                  key={items._id}
                  onClick={() => setSelectedStock(items)}
                  className={`grid grid-cols-[2.5fr_1.5fr_1fr_0.8fr_1fr_1fr] items-center px-4 py-3 rounded-lg transition cursor-pointer ${
                    selectedStock?._id === items._id
                      ? "bg-indigo-500/20"
                      : "bg-[#141414] hover:bg-[#1a1a1a]"
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-white font-medium truncate">
                      {items.asset}
                      <span className="text-gray-400 text-sm ml-1">
                        ({items.assetName})
                      </span>
                    </span>
                  </div>

                  <span className="text-sm text-gray-300">
                    {items.quantity ?? 0}
                  </span>

                  <span className="text-sm text-gray-300">
                    ${items.marketPrice?.toLocaleString() || 0}
                  </span>

                  <span className="text-sm text-gray-300">
                    ${items.invested?.toLocaleString() || 0}
                  </span>

                  <span className="text-sm text-white font-medium">
                    ${items.current?.toLocaleString() || 0}
                  </span>

                  <span
                    className={`text-sm font-semibold ${
                      items.returns?.value >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {items.returns?.value >= 0 ? "+" : ""}
                    {items.returns?.value?.toLocaleString() || 0} (
                    {items.returns?.percent ?? 0}%)
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="h-100 w-86 bg-[#0e0d0d] rounded-xl p-6 flex flex-col justify-between">
          {selectedStock ? (
            <>
              <div>
                <h2 className="text-lg font-semibold text-white">
                  {selectedStock.asset}
                </h2>
                <p className="text-sm text-gray-400">
                  {selectedStock.assetName}
                </p>
              </div>

              <div className="mt-4">
                <p className="text-3xl font-bold text-white">
                  ${selectedStock.current?.toLocaleString() || 0}
                </p>
                <p
                  className={`text-sm mt-1 ${
                    selectedStock.returns?.value >= 0
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {selectedStock.returns?.value >= 0 ? "+" : ""}
                  {selectedStock.returns?.value ?? 0} (
                  {selectedStock.returns?.percent ?? 0}%)
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
                <div>
                  <p className="text-gray-400">Quantity</p>
                  <p className="text-white font-medium">
                    {selectedStock.quantity ?? 0}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400">Invested</p>
                  <p className="text-white font-medium">
                    ${selectedStock.invested?.toLocaleString() || 0}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400">Market Price</p>
                  <p className="text-white font-medium">
                    ${selectedStock.marketPrice?.toLocaleString() || 0}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => console.log("BUY", selectedStock)}
                  className="flex-1 bg-green-500/15 text-green-400 py-3 rounded-xl font-semibold text-sm hover:bg-green-500 hover:text-white transition-all duration-300"
                >
                  Buy more
                </button>

                <button
                  onClick={() => console.log("SELL", selectedStock)}
                  className="flex-1 bg-red-500/15 text-red-400 py-3 rounded-xl font-semibold text-sm hover:bg-red-500 hover:text-white transition-all duration-300"
                >
                  Sell
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500 text-sm">
              Select a stock from the watchlist
            </div>
          )}
        </div>

        <div className="h-65 w-86 bg-[#0e0d0d] rounded-xl p-4 flex flex-col">
          <div className="flex justify-between items-center">
            <h3 className="text-md text-[#747070]">Similar Stocks</h3>
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
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0b0b0b] flex items-center justify-center">
                    <img
                      src={stock.img}
                      alt={stock.name}
                      className="w-8 h-8 object-contain"
                    />
                  </div>

                  <div className="flex flex-col">
                    <span className="text-white font-semibold text-sm">
                      {stock.name}
                    </span>
                    <span className="text-xs text-gray-400 mt-1">
                      ${stock.current}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <span
                    className={`text-sm font-semibold ${
                      stock.returns.value >= 0
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {stock.returns.value >= 0 ? "+" : ""}
                    {stock.returns.value}
                  </span>

                  <span
                    className={`text-xs px-2 py-0.5 mt-1 rounded-full ${
                      stock.returns.percentage >= 0
                        ? "bg-green-500/10 text-green-400"
                        : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    {stock.returns.percentage}%
                  </span>
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
