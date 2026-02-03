import React, { useState } from "react";
import Logo from "../../assets/logo.png";
import {
  LayoutDashboard,
  LineChart,
  ArrowLeftRight,
  Receipt,
  Newspaper,
  Compass,
  Eye,
  UserRoundPen,
  Settings,
  HelpCircle,
  LifeBuoy, 
} from "lucide-react";

const SideBar = () => {
  const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard },
    { label: "Market", icon: LineChart },
    { label: "Trade", icon: ArrowLeftRight },
    { label: "Transactions", icon: Receipt },
    { label: "News", icon: Newspaper },
    { label: "Explore", icon: Compass },
    { label: "Watchlist", icon: Eye },
  ];
  const ProfileItems = [
    { label: "Account", icon: UserRoundPen},
    { label: "Settings", icon: Settings },
    {label : "FAQ", icon:HelpCircle},
    {label : "Help", icon: LifeBuoy},
  ];
  return (
    <div className="min-h-screen w-59 flex flex-col gap-3">
      <div className="flex flex-col gap-4 min-h-min rounded-br-xl p-4 bg-[#0e0d0d]">
        <div className="flex justify-center items-center">
          <img src={Logo} className="w-49 h-20" />
        </div>
        <div className="flex flex-col gap-3 mt-6 rounded-xl p-2">
          {menuItems.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className="group flex items-center gap-3 text-xl text-left text-gray-400 
                 hover:text-white px-3 py-2 rounded-md hover:bg-[#1f1f1f]
                 transition"
            >
              <Icon className="group-hover:text-indigo-500" size={22} />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>
      <div></div>
      <div className="h-49 bg-[#0e0d0d] px-4 rounded-tr-xl rounded-br-xl">
        <div className="flex flex-col p-2">
          {ProfileItems.map(({label,icon:Icon}) => (
            <button
              key={label}
              className="group flex items-center gap-3 text-xl text-left text-gray-400 
                 hover:text-white px-3 py-2 rounded-md hover:bg-[#1f1f1f]
                 transition"
            >
              <Icon className="group-hover:text-indigo-500" size={22} />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
