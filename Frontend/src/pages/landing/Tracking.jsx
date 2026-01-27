import React from "react";
import Market from "../../assets/Market.png";
import Analysis from "../../assets/Analysis.png";
import Updates from "../../assets/updates.png";


const Tracking = () => {
  return (
    <div className="flex gap-10">
      <div className="h-100 w-full border border-white rounded-2xl p-10">
        <div className="flex flex-col justify-center items-center gap-5">
          <img
            src={Market}
            className="w-50 h-50 border p-5 border-[#c6c6c6] rounded-xl"
          />
          <h2 className="text-2xl text-white">Live Market's Data</h2>
          <button className="border border-white p-3 rounded-xl w-full text-left text-[#b1b0b0]">
            Learn more
          </button>
        </div>
      </div>
      <div className="h-100 w-full border border-white rounded-2xl p-10">
        <div className="flex flex-col justify-center items-center gap-5">
          <img
            src={Updates}
            className="w-50 h-50 border p-5 border-[#c6c6c6] rounded-xl"
          />
          <h2 className="text-2xl text-white">Instant Portfolio Updates</h2>
          <button className="border border-white p-3 rounded-xl text-left text-[#b1b0b0] w-full">
            Learn more
          </button>
        </div>
      </div>
      <div className="h-100 w-full border border-white rounded-2xl p-10">
        <div className="flex flex-col justify-center items-center gap-5">
          <img
            src={Analysis}
            className="w-50 h-50 border p-5 border-[#c6c6c6] rounded-xl"
          />
          <h2 className="text-2xl text-white">Performance Analytics</h2>
          <button className="border border-white p-3 rounded-xl text-left text-[#b1b0b0] w-full">
            Learn more
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tracking;
