import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const IndexCard = ({ item }) => {
  const isPositive = item.percent >= 0;

  return (
    <div className="bg-gradient-to-br from-[#141414] to-[#0f0f0f] p-6 rounded-2xl shadow-lg hover:scale-[1.02] transition-all duration-300 border border-[#1f1f1f]">
      <h3 className="text-gray-400 text-sm uppercase tracking-wide">
        {item.name}
      </h3>

      <p className="text-white text-2xl font-semibold mt-2">
        ₹{item.price?.toLocaleString()}
      </p>

      <div
        className={`flex items-center gap-1 mt-2 text-sm font-medium ${
          isPositive ? "text-green-400" : "text-red-400"
        }`}
      >
        {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
        {item.change?.toFixed(2)} ({item.percent?.toFixed(2)}%)
      </div>
    </div>
  );
};

const MoversCard = ({ title, data }) => {
  return (
    <div className="bg-[#121212] p-6 rounded-2xl shadow-lg border border-[#1f1f1f]">
      <h3 className="text-white text-lg font-semibold mb-4">
        {title}
      </h3>

      <div className="flex flex-col gap-4">
        {data.map((item) => {
          const isPositive = item.percent >= 0;

          return (
            <div
              key={item.symbol}
              className="flex justify-between items-center hover:bg-[#1c1c1c] p-2 rounded-lg transition-all cursor-pointer"
            >
              <div>
                <div className="text-white font-semibold">
                  {item.symbol}
                </div>
                <div className="text-gray-500 text-sm">
                  ₹{item.price?.toLocaleString()}
                </div>
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
                {item.percent?.toFixed(2)}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const MarketSection = () => {
  const [indices, setIndices] = useState([]);
  const [gainers, setGainers] = useState([]);
  const [losers, setLosers] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const indicesRes = await API.get("/market/indices");
        const moversRes = await API.get("/market/movers");

        setIndices(indicesRes.data);
        setGainers(moversRes.data.gainers);
        setLosers(moversRes.data.losers);
        setLastUpdated(new Date());
      } catch (err) {
        console.error("Market fetch error:", err);
      }
    };

    fetchMarketData();
    const interval = setInterval(fetchMarketData, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black min-h-screen py-2 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-white text-2xl font-semibold">
          Market Overview
        </h2>
        {lastUpdated && (
          <span className="text-gray-500 text-sm">
            Updated {lastUpdated.toLocaleTimeString()}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {indices.map((item) => (
          <IndexCard key={item.symbol} item={item} />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MoversCard title="Top Gainers" data={gainers} />
        <MoversCard title="Top Losers" data={losers} />
      </div>
    </div>
  );
};

export default MarketSection;
