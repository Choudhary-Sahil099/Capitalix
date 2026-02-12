import React from "react";

const marketIndexes = [
  {
    name: "NIFTY-50",
    price: 23568.5,
    change: -193.55,
    percentage: -0.75,
  },
  {
    name: "SENSEX",
    price: 83576.02,
    change: 40.37,
    percentage: 0.04,
  },
  {
    name: "BANKNIFTY",
    price: 51240.2,
    change: 215.8,
    percentage: 0.42,
  },
];

const topGainers = [
  { name: "TCS", price: 4120, change: 3.5 },
  { name: "HDFC Bank", price: 1680, change: 2.9 },
  { name: "Infosys", price: 1502, change: 2.2 },
  { name: "Infosys", price: 1502, change: 2.2 },

];

const topLosers = [
  { name: "Adani Ports", price: 820, change: -2.8 },
  { name: "Axis Bank", price: 1012, change: -1.9 },
  { name: "Wipro", price: 456, change: -1.2 },
  { name: "Wipro", price: 456, change: -1.2 },
];

const mostPurchased = [
  { name: "Reliance", orders: 12500 },
  { name: "Tata Motors", orders: 10200 },
  { name: "ICICI Bank", orders: 9500 },
  { name: "ICICI Bank", orders: 9500 },

];

const highestReturns = [
  { name: "Zomato", returns: 125 },
  { name: "IRFC", returns: 92 },
  { name: "Suzlon", returns: 80 },
  { name: "Suzlon", returns: 80 },

];

const SectionCard = ({ title, data, type }) => {
  return (
    <div className="bg-[#111] p-5 rounded-2xl shadow-md flex flex-col gap-3">
      <h3 className="text-white text-lg font-semibold">{title}</h3>

      {data.map((item, index) => (
        <div key={index} className="flex justify-between items-center">
          <span className="text-gray-300">{item.name}</span>

          {type === "gainers" || type === "losers" ? (
            <span
              className={`font-semibold ${
                item.change >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {item.change > 0 ? "+" : ""}
              {item.change}%
            </span>
          ) : type === "purchase" ? (
            <span className="text-blue-400 font-semibold">
              {item.orders.toLocaleString()} orders
            </span>
          ) : (
            <span className="text-green-400 font-semibold">
              {item.returns}%
            </span>
          )}
        </div>
      ))}
    </div>
  );
};


const marketSection= () => {
  return (
    <div className="bg-black min-h-min overflow-hidden px-6 flex flex-col gap-4 ">
      <div className="flex flex-col gap-3">
        <h2 className="text-white text-2xl">Today's Market</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {marketIndexes.map((item, index) => (
            <div
              key={index}
              className="bg-[#111] p-6 rounded-2xl shadow-md flex flex-col gap-2"
            >
              <h3 className="text-white text-lg font-semibold">
                {item.name}
              </h3>

              <p className="text-gray-400">
                ₹{item.price.toLocaleString()}
              </p>

              <span
                className={`font-semibold ${
                  item.change >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {item.change > 0 ? "+" : ""}
                {item.change} ({item.percentage}%)
              </span>
            </div>
          ))}
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <SectionCard
          title="Top Market Gainers"
          data={topGainers}
          type="gainers"
        />

        <SectionCard
          title="Top Market Losers"
          data={topLosers}
          type="losers"
        />

        <SectionCard
          title="Most Purchased Stocks"
          data={mostPurchased}
          type="purchase"
        />

        <SectionCard
          title="Highest Returns"
          data={highestReturns}
          type="returns"
        />
      </div>
    </div>
  );
};

export default marketSection;
