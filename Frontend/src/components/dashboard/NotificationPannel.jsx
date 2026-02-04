import React from "react";
import { Rss } from "lucide-react";

const NotificationPannel = () => {
  const todaysTop3News = [
    {
      title:
        "Indian markets surge on India-US trade deal; Sensex & NIFTY rally sharply",
      description:
        "Dalal Street saw strong buying as FIIs net bought shares worth over ₹5,200 crore.",
      source: "Upstox News Desk",
      date: "Feb 3, 2026",
    },
    {
      title:
        "US markets slide as tech stocks drag S&P 500 and Nasdaq lower",
      description:
        "Major US indices posted their worst day in two weeks led by tech stocks.",
      source: "MarketWatch",
      date: "Feb 3, 2026",
    },
    {
      title:
        "FTSE 100 falls amid tech selloff while commodities rebound",
      description:
        "UK markets dipped as tech stocks sold off while gold and silver rallied.",
      source: "The Guardian",
      date: "Feb 3, 2026",
    },
  ];

  return (
    <div className="w-72 bg-[#0e0d0d] rounded-xl p-4 flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <h1 className="text-xl text-[#a8a8a8]">Notifications</h1>
        <Rss className="text-[#a8a8a8]" />
      </div>

      <div className="flex flex-col gap-3">
        {todaysTop3News.map((news, index) => (
          <div
            key={index}
            className="border-b border-[#2a2a2a] pb-2 last:border-none"
          >
            <h2 className="text-sm text-white font-medium leading-snug">
              {news.title}
            </h2>
            <p className="text-xs text-[#a8a8a8] mt-1">
              {news.description}
            </p>
            <div className="flex justify-between text-[10px] text-[#6f6f6f] mt-1">
              <span>{news.source}</span>
              <span>{news.date}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <button className="text-sm text-white border border-white px-4 py-2 rounded-xl hover:bg-white hover:text-black transition">
          View More
        </button>
      </div>
    </div>
  );
};

export default NotificationPannel;
