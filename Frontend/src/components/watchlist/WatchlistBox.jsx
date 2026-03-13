import React, { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";
import getStockLogo from "../../utils/getStockLogo";
import defaultStock from "../../assets/DefaultStock.png";
import toast from "react-hot-toast";
const WatchlistBox = () => {
  const navigate = useNavigate();

  const [watchlist, setWatchlist] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [tradeLoading, setTradeLoading] = useState(false);
  const [tradeError, setTradeError] = useState("");
  const [similarStocks, setSimilarStocks] = useState([]);
  const [similarLoading, setSimilarLoading] = useState(false);

  // Fetch watchlist
  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const { data } = await API.get("/watchlist");

        setWatchlist(data || []);

        // Only set selected stock once
        setSelectedStock((prev) => {
          if (!prev && data?.length > 0) {
            return data[0];
          }
          return prev;
        });
      } catch (err) {
        console.log("Error fetching watchlist", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();

    const interval = setInterval(fetchWatchlist, 5000); // refresh every 5 sec

    return () => clearInterval(interval);
  }, []);

  // Fetch similar stocks when selected stock changes
  useEffect(() => {
    const fetchSimilarStocks = async () => {
      if (!selectedStock) return;

      try {
        setSimilarLoading(true);

        const { data } = await API.get(
          `/watchlist/similar/${selectedStock.asset}`,
        );

        console.log("Similar stocks:", data);

        setSimilarStocks(data || []);
      } catch (err) {
        console.log("Error fetching similar stocks", err);
        setSimilarStocks([]);
      } finally {
        setSimilarLoading(false);
      }
    };

    fetchSimilarStocks();
  }, [selectedStock]);

  const handleRemove = async (asset, e) => {
    e.stopPropagation();

    try {
      await API.delete(`/watchlist/${asset}`);

      const { data } = await API.get("/watchlist");

      const updatedStocks = data || [];

      setWatchlist(updatedStocks);

      if (selectedStock?.asset === asset) {
        setSelectedStock(updatedStocks[0] || null);
      }
    } catch (err) {
      console.log("Error removing stock", err);
    }
  };
  const handleTrade = async (type) => {
    if (!selectedStock || !quantity || quantity <= 0) return;

    try {
      setTradeLoading(true);
      setTradeError("");

      await API.post("/transactions", {
        asset: selectedStock.asset.replace(".NS",""),
        name: selectedStock.assetName,
        type,
        quantity: Number(quantity),
      });

      toast.success("Order placed");
    } catch (err) {
      setTradeError(err.response?.data?.message || "Transaction failed");
    } finally {
      setTradeLoading(false);
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
        <div className="h-95 w-87.5 bg-[#0e0d0d] rounded-xl p-6">
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
                    className="text-2xl font-semibold text-white cursor-pointer"
                    onClick={() =>
                      navigate(`/dashboard/stock/${selectedStock.asset}`)
                    }
                  >
                    {selectedStock.asset}
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
              <div className="flex flex-col gap-2 mt-5">
                <div className="flex flex-col gap-1 ">
                  <h1 className="text-[#b6b6b6]">Enter Quantity</h1>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="bg-gray-800 border border-gray-700 px-3 py-2 rounded-md w-full mb-3 text-white"
                  />
                  <div className="text-gray-400 mb-1">
                    Total: ₹
                    {selectedStock
                      ? (selectedStock.currentPrice * quantity).toFixed(2)
                      : "0.00"}
                  </div>
                </div>
                <div className="flex gap-2 justify-center items-center">
                  <button
                    onClick={() => handleTrade("buy")}
                    disabled={tradeLoading}
                    className="bg-green-500 hover:bg-green-600 text-white p-3 w-35 text-xl rounded-xl"
                  >
                    Buy
                  </button>

                  <button
                    onClick={() => handleTrade("sell")}
                    disabled={tradeLoading}
                    className="bg-red-500 hover:bg-red-600 text-white p-3 w-35 text-xl rounded-xl"
                  >
                    Sell
                  </button>
                </div>
                {tradeError && (
                  <div className="text-red-400 text-sm mb-1">{tradeError}</div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500 text-sm">
              Select a stock from the watchlist
            </div>
          )}
        </div>

        <div className="h-60 w-87.5 bg-[#0e0d0d] rounded-xl p-4 flex flex-col">
          <h3 className="text-md text-[#747070]">Similar Stocks</h3>

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
                  className="flex items-center justify-between bg-linear-to-br from-[#141414] to-[#0f0f0f] px-5 py-4 rounded-2xl border border-white/5 hover:border-indigo-500/40 hover:scale-[1.02] transition cursor-pointer"
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
