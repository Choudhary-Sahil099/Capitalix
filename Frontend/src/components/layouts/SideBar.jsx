import React from "react";
import { NavLink } from "react-router-dom";
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
    { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { label: "Market", icon: LineChart, path: "/dashboard/market" },
    { label: "Trade", icon: ArrowLeftRight, path: "/dashboard/trade" },
    { label: "Transactions", icon: Receipt, path: "/dashboard/transactions" },
    { label: "News", icon: Newspaper, path: "/dashboard/news" },
    { label: "Explore", icon: Compass, path: "/dashboard/explore" },
    { label: "Watchlist", icon: Eye, path: "/dashboard/watchlist" },
  ];

  const profileItems = [
    { label: "Account", icon: UserRoundPen, path: "/dashboard/account" },
    { label: "Settings", icon: Settings, path: "/dashboard/settings" },
    { label: "FAQ", icon: HelpCircle, path: "/dashboard/faq" },
    { label: "Help", icon: LifeBuoy, path: "/dashboard/help" },
  ];

  return (
    <div className="min-h-screen w-59 flex flex-col gap-3 sticky top-0">
  
      <div className="flex flex-col gap-4 rounded-br-xl p-4 bg-[#0e0d0d]">
        <div className="flex justify-center items-center">
          <img src={Logo} alt="Logo" className="w-49 h-20" />
        </div>

        <div className="flex flex-col gap-3 mt-6 rounded-xl p-2">
          {menuItems.map(({ label, icon: Icon, path }) => (
            <NavLink
              key={label}
              to={path}
              end={path === "/dashboard"}
              className={({ isActive }) =>
                `group flex items-center gap-3 text-xl px-3 py-2 rounded-md transition
                ${
                  isActive
                    ? "bg-[#1f1f1f] text-white"
                    : "text-gray-400 hover:text-white hover:bg-[#1f1f1f]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={22}
                    className={
                      isActive
                        ? "text-indigo-500"
                        : "group-hover:text-indigo-500"
                    }
                  />
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
      <div className="flex-1" />

      <div className="bg-[#0e0d0d] px-4 rounded-tr-xl rounded-br-xl">
        <div className="flex flex-col p-2">
          {profileItems.map(({ label, icon: Icon, path }) => (
            <NavLink
              key={label}
              to={path}
              className={({ isActive }) =>
                `group flex items-center gap-3 text-xl px-3 py-2 rounded-md transition
                ${
                  isActive
                    ? "bg-[#1f1f1f] text-white"
                    : "text-gray-400 hover:text-white hover:bg-[#1f1f1f]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={22}
                    className={
                      isActive
                        ? "text-indigo-500"
                        : "group-hover:text-indigo-500"
                    }
                  />
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
