import React, { useState, useEffect } from "react";
import { Sun, Bell, CircleUser } from "lucide-react";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";

const TopSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [user, setUser] = useState("User1");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/auth/me");
        setUser(res.data);
      } catch (err) {
        console.error("User fetch failed", err);
      }
    };

    fetchUser();
  }, []);
  useEffect(() => {
    const fetchStocks = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      try {
        const res = await API.get(`/market/search?q=${query}`);
        setResults(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const debounce = setTimeout(fetchStocks, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  return (
    <div className="relative w-full h-20 rounded-bl-xl rounded-br-xl bg-[#0e0d0d] flex justify-between items-center p-6">
      <div className="relative w-96">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-black w-full h-12 rounded-md text-white p-4"
          placeholder="Search stocks..."
        />

        {results.length > 0 && (
          <div className="absolute top-14 w-full bg-[#1a1a1a] border border-gray-700 rounded-md shadow-lg max-h-60 overflow-y-auto z-50 hide-scrollbar">
            {results.map((stock) => (
              <div
                key={stock.symbol}
                onClick={() => {
                  navigate(`/stock/${stock.symbol}`);
                  setQuery("");
                  setResults([]);
                }}
                className="p-3 hover:bg-[#2a2a2a] cursor-pointer text-white"
              >
                <div className="font-semibold">{stock.symbol}</div>
                <div className="text-sm text-gray-400">{stock.name}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-6 justify-center items-center text-white">
        <Bell size={30} />
        <div className="flex justify-center items-center gap-2">
          <CircleUser size={30} />
          <span className="text-md text-[#6b6a6a]">{user ? user.name : "Loading..."}</span>
        </div>
        <Sun size={30} />
      </div>
    </div>
  );
};

export default TopSearch;
