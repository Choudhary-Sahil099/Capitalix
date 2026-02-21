import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const TradeSection = () => {
  const [positions, setPositions] = useState([]);
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await API.get("/dashboard");

      setPositions(res.data.positions || []);
      setOverview(res.data.overview || {});
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center text-white">
        Loading portfolio...
      </div>
    );
  }

  const isProfit = overview?.totalPnL >= 0;
  const isDayProfit = overview?.totalDayPnL >= 0;

  return (
    <div className="bg-black min-h-min pt-6 px-6 flex flex-col gap-6">
      <div className="flex flex-col justify-center items-center">
        <h3 className="text-gray-400 text-sm uppercase">Available Balance</h3>

        <p className="text-white text-3xl font-semibold mt-2">
          ₹ {overview?.availableBalance?.toLocaleString()}
        </p>

        <p className="text-indigo-400 text-sm mt-2">
          Net Worth ₹ {overview?.portfolioValue?.toLocaleString()}
        </p>

        <div className="flex gap-6 mt-3 text-sm">
          <div>
            <span className="text-gray-400">Total PnL </span>
            <span
              className={`font-semibold ${
                isProfit ? "text-green-400" : "text-red-400"
              }`}
            >
              ₹ {overview?.totalPnL?.toLocaleString()} (
              {overview?.totalReturnPercent?.toFixed(2)}%)
            </span>
          </div>

          <div>
            <span className="text-gray-400">Today </span>
            <span
              className={`font-semibold ${
                isDayProfit ? "text-green-400" : "text-red-400"
              }`}
            >
              ₹ {overview?.totalDayPnL?.toLocaleString()} (
              {overview?.totalDayPercent?.toFixed(2)}%)
            </span>
          </div>
        </div>
      </div>

      <div className="bg-[#111] p-6 rounded-2xl border border-[#1f1f1f] h-129 flex flex-col">
        <h3 className="text-white text-lg font-semibold mb-4">
          Your Positions
        </h3>

        {positions.length === 0 ? (
          <div className="text-gray-500 text-center py-4">
            No active positions
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto pr-2 space-y-3 hide-scrollbar">
            {positions.map((p) => {
              const isPositive = p.percent >= 0;

              return (
                <div
                  key={p.asset}
                  className="flex justify-between items-center p-3 rounded-lg hover:bg-[#1a1a1a] transition-all"
                >
                  <div>
                    <div className="text-white font-semibold">{p.asset}</div>
                    <div className="text-gray-500 text-sm">
                      Qty: {p.quantity}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-gray-400 text-sm">
                      ₹{p.currentPrice.toFixed(2)}
                    </div>

                    <div
                      className={`flex items-center gap-1 font-semibold ${
                        isPositive ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {isPositive ? (
                        <ArrowUpRight size={16} />
                      ) : (
                        <ArrowDownRight size={16} />
                      )}
                      ₹{p.pnl.toFixed(2)} ({p.percent.toFixed(2)}%)
                    </div>

                    <div
                      className={`text-xs ${
                        p.dayChange >= 0 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      Today: ₹{p.dayChange?.toFixed(2)} (
                      {p.dayPercent?.toFixed(2)}%)
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TradeSection;
