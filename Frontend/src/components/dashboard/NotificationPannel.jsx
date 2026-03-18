import React, { useEffect, useState } from "react";
import { Rss, Bell, TrendingUp, Wallet } from "lucide-react";
import API from "../../api/axios";

const NotificationPannel = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await API.get("/notifications");
        setNotifications(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchNotifications();
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case "price":
        return <TrendingUp className="text-green-400" size={16} />;
      case "portfolio":
        return <Wallet className="text-yellow-400" size={16} />;
      case "watchlist":
        return <Bell className="text-blue-400" size={16} />;
      case "news":
        return <Rss className="text-purple-400" size={16} />;
      default:
        return <Bell size={16} />;
    }
  };

  return (
    <div className="w-72 bg-[#0e0d0d] rounded-xl p-4 flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <h1 className="text-xl text-[#a8a8a8]">Notifications</h1>
        <Bell className="text-[#aeacac]" />
      </div>

      <div className="flex flex-col gap-3 max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <p className="text-gray-500 text-sm">No notifications</p>
        ) : (
          notifications.map((n) => (
            <div
              key={n._id}
              className="border-b border-[#2a2a2a] pb-2 last:border-none flex gap-2"
            >
              {getIcon(n.type)}

              <div>
                <h2 className="text-sm text-white font-medium">
                  {n.title}
                </h2>

                <p className="text-xs text-[#a8a8a8] mt-1">
                  {n.message}
                </p>

                <span className="text-[10px] text-[#6f6f6f]">
                  {new Date(n.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          ))
        )}
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