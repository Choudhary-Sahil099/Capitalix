import React from "react";

const TransactionHistory = ({ transactions }) => {
  return (
    <div className="w-120 h-54 bg-[#0e0d0d] rounded-xl p-4 flex flex-col text-white">
      <h2 className="text-sm font-semibold mb-2">Last Transactions</h2>

      <div className="flex-1 overflow-hidden">
        <table className="w-full table-fixed text-sm">
          <thead className="block text-gray-400">
            <tr className="table w-full table-fixed">
              <th className="text-left">Stock</th>
              <th className="text-left">Type</th>
              <th className="text-right">Rate</th>
            </tr>
          </thead>

          <tbody className="block h-32 overflow-y-auto">
            {transactions && transactions.length > 0 ? (
              transactions.map((tx) => (
                <tr
                  key={tx._id}
                  className="table w-full table-fixed border-b border-gray-800 hover:bg-[#1a1a1a]"
                >
                  <td className="py-2">{tx.asset}</td>

                  <td>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        tx.type === "buy"
                          ? "bg-green-900 text-green-300"
                          : "bg-red-900 text-red-300"
                      }`}
                    >
                      {tx.type.toUpperCase()}
                    </span>
                  </td>

                  <td className="text-right font-semibold">
                    ₹{tx.price}
                  </td>
                </tr>
              ))
            ) : (
              <tr className="table w-full">
                <td className="py-4 text-center text-gray-500" colSpan="3">
                  No transactions yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistory;