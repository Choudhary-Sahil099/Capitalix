import React from "react";
import Avatar from "../../assets/Avatar.png";
const AccountBox = () => {
  return (
    <div className="flex gap-6">
      <div className="flex flex-col gap-5">
        <div className="bg-[#0e0d0d] w-120 h-90 rounded-xl p-6 flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <img src={Avatar} className="h-24 w-24 rounded-xl cursor-pointer" />

            <div>
              <h1 className="text-white text-2xl font-semibold">
                Sahil Choudhary
              </h1>
              <p className="text-gray-400">@sahil_investor</p>
            </div>
          </div>

          <div className="flex gap-10">
            <div>
              <p className="text-gray-400 text-sm">Portfolio</p>
              <p className="text-green-400 text-xl">₹12,430</p>
            </div>

            <div>
              <p className="text-gray-400 text-sm">Profit</p>
              <p className="text-green-400 text-xl">+₹1,245</p>
            </div>
          </div>

          <div className="flex gap-10 text-center">
            <div>
              <p className="text-white text-xl">120</p>
              <p className="text-gray-400 text-sm">Followers</p>
            </div>

            <div>
              <p className="text-white text-xl">95</p>
              <p className="text-gray-400 text-sm">Following</p>
            </div>

            <div>
              <p className="text-white text-xl">34</p>
              <p className="text-gray-400 text-sm">Posts</p>
            </div>
          </div>

          <p className="text-gray-500 text-sm">Joined March 2026</p>
        </div>


        {/* this section will show badges for the different Achievements and in the future we will upgrade them */}
        <div className="bg-[#0e0d0d] w-120 h-74 rounded-xl p-5">
          <h2 className="text-white text-xl font-semibold mb-4">
            Achievements
          </h2>

          <div className="flex flex-wrap gap-4">
            <div className="bg-[#1c1c1c] px-4 py-2 rounded-lg text-white">
              📈 Profit Master
            </div>

            <div className="bg-[#1c1c1c] px-4 py-2 rounded-lg text-white">
              🐂 Bull Trader
            </div>

            <div className="bg-[#1c1c1c] px-4 py-2 rounded-lg text-white">
              🔥 Hot Streak
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#0e0d0d] w-194 h-169 rounded-xl p-6 overflow-y-auto">
        <h2 className="text-white text-xl font-semibold mb-6">Trade Posts</h2>

        <div className="flex flex-col gap-6">
          <div className="bg-[#1a1a1a] p-4 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <img src={Avatar} className="h-8 w-8 rounded-full" />
              <p className="text-white">Sahil Choudhary</p>
            </div>

            <p className="text-gray-300">
              Bought NVDA today. AI sector looks very bullish 🚀
            </p>

            <p className="text-gray-500 text-sm mt-2">2 hours ago</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountBox;
