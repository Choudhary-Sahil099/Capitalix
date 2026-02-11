import React from "react";
import FirstNews from "../../assets/firstnews.png";
import SecondNews from "../../assets/newsTwo.png";
import ThirdNews from "../../assets/newsThree.png";

export const newsData = [
  {
    img: FirstNews,
    title: "U.S. Stocks Lose Momentum After Strong Jobs Report",
    description:
      "Major U.S. stock indexes initially climbed after a stronger-than-expected January jobs report showing 130,000 new jobs added, but later reversed gains amid higher Treasury yields and mixed earnings results, with robust sectors like data center infrastructure stocks rising while others fell. :contentReference[oaicite:1]{index=1}",
    impact:
      "Markets showed volatility — strong labor data boosted confidence in economic growth but higher yields and mixed earnings capped gains, leading to sideways trading in major indices.",
  },
  {
    img: SecondNews,
    title: "Wall Street Stocks Flip to Losses After Jobs Data",
    description:
      "U.S. stocks briefly rallied on the solid employment data but then turned negative as investors grew cautious about potential delays in rate cuts. S&P 500, Dow Jones, and Nasdaq dipped while certain individual stocks like Moderna and Robinhood experienced notable declines. :contentReference[oaicite:2]{index=2}",
    impact:
      "The reversal suggests investors are balancing optimism about economic resilience with concerns that stronger labor data may reduce the chance of near-term rate cuts, putting short-term pressure on equities.",
  },
  {
    img: ThirdNews,
    title: "Indian Markets Close Flat as IT Stocks Weaken",
    description:
      "Indian benchmark indices ended mostly flat, with the Sensex snapping a 3-day win streak and the Nifty holding above key levels, as weakness in major IT stocks dampened overall sentiment despite support from other sectors and global factors. :contentReference[oaicite:3]{index=3}",
    impact:
      "Stable domestic trading with sector-specific weakness indicates cautious sentiment among Indian investors ahead of global catalysts — the flat close suggests limited near-term upside without fresh triggers.",
  },
];

const NewsBox = () => {
  return (
    <div className="bg-[#0e0d0d] w-322 h-168 rounded-xl overflow-y-auto">
      <div className="flex flex-col p-6 gap-6">
        <h1 className="text-white text-xl font-semibold">News</h1>

        {newsData.map((item, index) => (
          <div key={index} className="flex gap-4">
            <img
              src={item.img}
              alt={item.title}
              className="w-80 object-cover rounded-md"
            />

            <div className="flex flex-col gap-3 text-white">
              <h4 className="font-semibold text-xl">{item.title}</h4>
              <p className="text-sm text-gray-400">{item.description}</p>
              <p className="text-xs text-green-400">Impact: {item.impact}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsBox;
