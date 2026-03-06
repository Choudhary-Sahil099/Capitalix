import React, { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";
import getStockLogo from "../../utils/getStockLogo";
import defaultStock from "../../assets/DefaultStock.png";
// adding the feature of the remove the watchlist form the watchlist section
const WatchlistBox = () => {
  const navigate = useNavigate();
  const [watchlist, setWatchlist] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [loading, setLoading] = useState(true);
  const [similarStocks, setSimilarStocks] = useState([]);
  const [similarLoading, setSimilarLoading] = useState(false);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const { data } = await API.get("/watchlist");
        setWatchlist(data || []);

        setSelectedStock((prev) => {
          if (!prev) return data?.[0] || null;

          const updated = data?.find((s) => s.asset === prev.asset);
          return updated || data?.[0] || null;
        });
      } catch (err) {
        console.log("Error fetching watchlist", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();

    const interval = setInterval(() => {
      fetchWatchlist();
    }, 2000); // refresh every 2 sec

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchSimilarStocks = async () => {
      if (!selectedStock) return;

      try {
        setSimilarLoading(true);

        const { data } = await API.get(
          `/watchlist/similar/${selectedStock.asset}`,
        );
        console.log(data);
        setSimilarStocks(data || []);
      } catch (err) {
        console.log("Error fetching similar stocks", err);
        setSimilarStocks([]);
      } finally {
        setSimilarLoading(false);
      }
    };

    fetchSimilarStocks();
  }, []);


  const handleRemove = async (asset, e) => {
    e.stopPropagation();

    try {
      await API.delete(`/watchlist/${asset}`);
      const { data } = await API.get("/watchlist");
      // console.log("WATCHLIST RESPONSE:", data);
      const updatedStocks = data || [];

      setWatchlist(updatedStocks);

      if (selectedStock?.asset === asset) {
        setSelectedStock(updatedStocks[0] || null);
      }
    } catch (err) {
      console.log("Error removing stock", err);
    }
  };
  
  if (loading) {
    return (
      <div className="text-white text-center py-20">Loading watchlist...</div>
    );
  }
  return (
    <div className="flex gap-4">
      <div className="w-230 h-168 rounded-xl bg-[#0e0d0d] flex flex-col p-6">
        <h2 className="text-xl text-white font-semibold mb-6">My Watchlist</h2>
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_0.2fr] text-xs text-gray-400 px-4 pb-2 border-b border-white/5">
          <span>Asset</span>
          <span>Price</span>
          <span>Change</span>
          <span>%</span>
        </div>
        <div className="flex-1 overflow-y-auto mt-3 pr-2 hide-scrollbar">
          {watchlist.length === 0 ? (
            <div className="text-gray-500 text-center py-10">
              No stocks in watchlist
            </div>
          ) : (
            watchlist.map((item) => (
              <div
                key={item.asset}
                onClick={() => setSelectedStock(item)}
                className={`grid grid-cols-[2fr_1fr_1fr_1fr_0.1fr] items-center px-4 py-3 border-b border-white/5 cursor-pointer transition ${
                  selectedStock?.asset === item.asset
                    ? "bg-indigo-500/10"
                    : "hover:bg-[#141414]"
                }`}
              >
                <div>
                  <p className="text-white font-medium">{item.asset}</p>
                  <p className="text-xs text-gray-400">{item.assetName}</p>
                </div>

                <span className="text-gray-300 text-sm">
                  ₹ {item.currentPrice?.toFixed(2)}
                </span>

                <span
                  className={`text-sm font-medium ${
                    item.dayChange >= 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {item.dayChange >= 0 ? "+" : ""}
                  {item.dayChange?.toFixed(2)}
                </span>

                <span
                  className={`text-sm font-medium ${
                    item.dayPercent >= 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {item.dayPercent >= 0 ? "+" : ""}
                  {item.dayPercent?.toFixed(2)}%
                </span>
                <button
                  onClick={(e) => handleRemove(item.asset, e)}
                  className="border border-[#626262] p-1 rounded hover:bg-red-500/20 hover:border-red-500 transition"
                >
                  <Trash2 size={16} className="text-red-400" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="h-[380px] w-[350px] bg-[#0e0d0d] rounded-xl p-6">
          {selectedStock ? (
            <>
              <div className="flex items-center gap-4">
                <img
                  src={getStockLogo(selectedStock.asset)}
                  alt={selectedStock.asset}
                  className="w-15 h-15 rounded-xl bg-white p-1 object-fill"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = defaultStock;
                  }}
                />

                <div>
                  <h2
                    className="text-2xl font-semibold text-white hover:cursor-pointer"
                    onClick={() =>
                      navigate(`/dashboard/stock/${selectedStock.asset}`)
                    }
                  >
                    {selectedStock.asset.replace(".NS", "")}
                  </h2>

                  <p className="text-sm text-gray-400">
                    {selectedStock.assetName}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-4xl font-bold text-white">
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
            <h3 className="text-md text-[#747070]">Similar Stocks</h3>
            <button className="text-sm underline text-blue-300">
              View more
            </button>
          </div>

          <div className="mt-4 flex flex-col gap-4">
            {similarLoading ? (
              <p className="text-gray-400 text-sm">Loading...</p>
            ) : similarStocks.length === 0 ? (
              <p className="text-gray-500 text-sm">No similar stocks found</p>
            ) : (
              similarStocks.map((stock, index) => (
                <div
                  key={index}
                  onClick={() => navigate(`/dashboard/stock/${stock.symbol}`)}
                  className="flex items-center justify-between bg-gradient-to-br from-[#141414] to-[#0f0f0f] px-5 py-4 rounded-2xl border border-white/5 hover:border-indigo-500/40 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={getStockLogo(stock.symbol)}
                      alt={stock.symbol}
                      className="w-8 h-8 rounded-md bg-white p-1"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = defaultStock;
                      }}
                    />

                    <div className="flex flex-col">
                      <span className="text-white font-semibold text-sm">
                        {stock.symbol}
                      </span>
                      <span className="text-xs text-gray-400 mt-1">
                        ₹{stock.price?.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`text-sm font-semibold ${
                      stock.change >= 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {stock.change >= 0 ? "+" : ""}
                    {stock.change?.toFixed(2)}%
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchlistBox;
