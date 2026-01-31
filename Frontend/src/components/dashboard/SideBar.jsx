import React, { useState } from "react";
import Logo from "../../assets/logo.png";
import { Bell , Settings} from 'lucide-react';




const SideBar = () => {

  const [language, setLanguage] = useState("EN");
  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "EN" ? "HI" : "EN"));
  };


  return (
    <div className="w-70 flex flex-col gap-4 min-h-screen">
      <div className="flex justify-center items-center">
        <img src={Logo} className="w-50 h-20" />
      </div>
      <div className="bg-[#161616] border border-[#2a2a2a] rounded-xl p-3 flex flex-col gap-2">
        <div className="flex justify-between">
          <button onClick={toggleLanguage}>
            {language}
            </button>
          <div className="flex gap-3">
            <Bell className="text-[#1e1d1d] rounded-sm size-5 bg-[#000000] " />
            <Settings />
          </div>
        </div>
        <div className=" bg-black rounded-md p-1 flex justify-between items-center">
        <h2 className="text-[#656464]">Sahil</h2>
        <h2 className="text-[#088c2d] bg-black rounded-md p-1 text-sm">verified</h2>
        </div>
      </div>
      <div className="flex flex-col gap-3 border border-white mt-6 bg-[#161616] rounded-xl p-2">
        {["Dashboard", "Market", "Trade", "Transactions","News","Explore", "Watchlist"].map(
          (item) => (
            <button
              key={item}
              className="text-left text-gray-400 hover:text-white px-3 py-2 rounded-md hover:bg-[#1f1f1f]"
            >
              {item}
            </button>
          )
        )}
      </div>
      <div className="bg-[#161616] border border-[#2a2a2a] rounded-xl p-3 mt-8">
        <button>Account</button>
      </div>

    </div>
  );
};

export default SideBar;
