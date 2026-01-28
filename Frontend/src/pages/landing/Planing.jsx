import React from "react";
import Goal from "../../assets/Goal.png";
import Long from "../../assets/Long.png";
import Retire from "../../assets/retrire.png";


const Planing = () => {
  return (
    <div className="flex gap-10">
      <div className="h-100 w-full border border-white rounded-2xl p-10">
        <div className="flex flex-col justify-center items-center gap-5">
          <img
            src={Goal}
            className="w-50 h-50 border p-5 border-[#c6c6c6] rounded-xl"
          />
          <h2 className="text-2xl text-white">Goal Based Investing</h2>
          <button className="border border-white p-3 rounded-xl w-full text-left text-[#b1b0b0]">
            Learn more
          </button>
        </div>
      </div>
      <div className="h-100 w-full border border-white rounded-2xl p-10">
        <div className="flex flex-col justify-center items-center gap-5">
          <img
            src={Retire}
            className="w-50 h-50 border p-5 border-[#c6c6c6] rounded-xl"
          />
          <h2 className="text-2xl text-white">Retirement Planning</h2>
          <button className="border border-white p-3 rounded-xl text-left text-[#b1b0b0] w-full">
            Learn more
          </button>
        </div>
      </div>
      <div className="h-100 w-full border border-white rounded-2xl p-10">
        <div className="flex flex-col justify-center items-center gap-5">
          <img
            src={Long}
            className="w-50 h-50 border p-5 border-[#c6c6c6] rounded-xl"
          />
          <h2 className="text-2xl text-white">Long Term Wealth Growth</h2>
          <button className="border border-white p-3 rounded-xl text-left text-[#b1b0b0] w-full">
            Learn more
          </button>
        </div>
      </div>
    </div>
  );
};

export default Planing;
