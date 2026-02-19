import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const TradeSection = () => {
  const [positions, setPositions] = useState([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const res = await API.get("/positions");
        setPositions(res.data.positions);
        setBalance(res.data.availableBalance);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPositions();
  }, []);

  return (
    <div className="bg-black min-h-screen p-6 flex flex-col gap-6">
      <div className=" flex flex-col justify-center items-center">
        <h3 className="text-gray-400 text-sm uppercase">Balance Available</h3>
        <p className="text-white text-3xl font-semibold mt-2">
          ₹ {balance.toLocaleString()}
        </p>
      </div>
      <div className="bg-[#111] p-6 rounded-2xl shadow-lg border border-[#1f1f1f]">
        <h3 className="text-white text-lg font-semibold mb-4">
          Your Positions
        </h3>

        <div className="flex flex-col gap-4">
          {positions.map((p) => {
            const isPositive = p.percent >= 0;

            return (
              <div
                key={p.asset}
                className="flex justify-between items-center p-3 rounded-lg hover:bg-[#1a1a1a] transition-all"
              >
                <div>
                  <div className="text-white font-semibold">{p.asset}</div>
                  <div className="text-gray-500 text-sm">Qty: {p.quantity}</div>
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
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TradeSection;
