import React from 'react'
const transactionHistoryAlt = [
  {
    stock: "ICICI Bank",
    symbol: "ICICIBANK",
    type: "Buy",
    rate: 1046.50,
  },
  {
    stock: "Bharti Airtel",
    symbol: "BHARTIARTL",
    type: "Sell",
    rate: 1132.20,
  },
  {
    stock: "State Bank of India",
    symbol: "SBIN",
    type: "Buy",
    rate: 738.90,
  },
];
const TransactionHistory = () => {
  return (
    <div className="w-120 h-54 bg-[#0e0d0d] rounded-xl p-4 flex flex-col text-white">
      <h2 className="text-sm font-semibold mb-2">Last Transactions</h2>
      <div className="flex-1 overflow-hidden">
        <table className="w-full table-fixed text-sm">
          <thead className="block text-gray-400">
            <tr className="table w-full table-fixed">
              <th className="text-left">Stock</th>
              <th className="text-left">Symbol</th>
              <th className="text-left">Type</th>
              <th className="text-right">Rate</th>
            </tr>
          </thead>

          <tbody className="block h-32">
            {transactionHistoryAlt.map((item) => (
              <tr
                key={item.symbol}
                className="table w-full table-fixed border-b border-gray-800 hover:bg-[#1a1a1a]"
              >
                <td className="py-2">{item.stock}</td>
                <td className="text-gray-400">{item.symbol}</td>
                <td>
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-900 text-blue-300">
                    {item.type}
                  </span>
                </td>
                <td className="text-right font-semibold">
                  ₹{item.rate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TransactionHistory
