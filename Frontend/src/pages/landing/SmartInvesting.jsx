import React from "react";
import AIDriven from "../../assets/AIDriven.png";

const SmartInvesting = () => {
  return (
    <div className="flex gap-10">
      <div className="h-100 w-full border border-white rounded-2xl p-10">
        <div className="flex flex-col justify-center items-center gap-5">
          <img src={AIDriven} className="w-50 h-50 border p-5 border-[#c6c6c6] rounded-xl" />
          <h2 className="text-2xl text-white">AI Driven Insights</h2>
          <button className="border border-white p-3 rounded-xl w-full text-left text-[#b1b0b0]">
            Learn more
          </button>
        </div>
      </div>
      <div className="h-100 w-full border border-white rounded-2xl p-10">
        <div className="">
          <img src={AIDriven} className="w-40 h-40" />
          <h2 className="text-2xl">AI Driven Insights</h2>
          <button className="border border-white p-3 rounded-xl  text-left">
            Learn more
          </button>
        </div>
      </div>
      <div className="h-100 w-full border border-white rounded-2xl p-10">
        <div className="">
          <img src={AIDriven} className="w-40 h-40" />
          <h2 className="text-2xl">AI Driven Insights</h2>
          <button className="border border-white p-3 rounded-xl  text-left">
            Learn more
          </button>
        </div>
      </div>
    </div>
  );
};

export default SmartInvesting;
