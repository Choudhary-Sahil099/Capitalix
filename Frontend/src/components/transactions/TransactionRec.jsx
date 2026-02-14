import {useState, useEffect} from "react";
import { Layers, Filter, Calendar, Download } from "lucide-react";
import API from '../../api/axios'

const TransactionRec = () => {
  const [range, setRange] = useState("All Categories");
  const [transactions, setTransactions] = useState([]);

  const filters = [
    { label: "All Categories", icon: Layers },
    { label: "Filter", icon: Filter },
    { label: "This Year", icon: Calendar },
    { label: "Export", icon: Download },
  ];
  useEffect(() =>{
    const fetchTransactions = async () =>{
      try{
        const {data} = await API.get("/transactions");
        setTransactions(data);
      }catch(err){
        console.log(err);
      }
    };

    fetchTransactions();
  },[])
  return (
    <div className="w-full h-168 rounded-xl bg-[#0e0d0d] flex flex-col p-6">
      <div className="flex justify-between items-center px-3 pb-4 border-b border-white/5">
        <input
          className="bg-black w-50 h-10 rounded-md text-white p-4 outline-none placeholder:text-gray-500"
          placeholder="Search"
        />
        <div className="flex gap-2 bg-[#141414] p-1 rounded-xl">
          {filters.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => setRange(label)}
              className={`flex items-center gap-2 px-3 py-1 text-xs rounded-lg transition-all
                    ${
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
      <div
        className="grid grid-cols-[2.5fr_1.5fr_1fr_0.8fr_1fr_1fr]
                 h-8 items-center
                 text-xs text-gray-400 px-2
                 border-b border-white/5"
      >
        <span>Asset</span>
        <span>Date & Time</span>
        <span>Type</span>
        <span>Qty</span>
        <span>Total</span>
        <span>Status</span>
      </div>
      <div className="flex-1 overflow-y-auto mt-3 pr-2 hide-scrollbar">
        <div className="flex flex-col gap-3">
          {transactions.map((tx) => (
            <div
              key={tx._id}
              className="grid grid-cols-[2.5fr_1.5fr_1fr_0.8fr_1fr_1fr]
                       items-center bg-[#141414] px-4 py-3 rounded-lg
                       hover:bg-[#1a1a1a] transition"
            >
              <div className="flex flex-col">
                <span className="text-white font-medium truncate">
                  {tx.asset}
                </span>
              </div>
              <div className="flex flex-col text-sm text-gray-400">
                <span>{new Date(tx.createdAt).toLocaleDateString()}</span>
                <span className="text-xs">{new Date(tx.createdAt).toLocaleTimeString()}</span>
              </div>

              <span
                className={`text-sm font-semibold ${
                  tx.type === "buy" ? "text-green-500" : "text-red-500"
                }`}
              >
                {tx.type}
              </span>
              <span className="text-sm text-gray-300">{tx.quantity}</span>

              <span className="text-sm text-white font-medium">
                ₹{(tx.quantity * tx.price).toLocaleString()}
              </span>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-md w-fit
                ${
                  tx.status === "Completed"
                    ? "bg-green-500/10 text-green-500"
                    : tx.status === "Pending"
                      ? "bg-yellow-500/10 text-yellow-500"
                      : "bg-red-500/10 text-red-500"
                }`}
              >
                {tx.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionRec;
