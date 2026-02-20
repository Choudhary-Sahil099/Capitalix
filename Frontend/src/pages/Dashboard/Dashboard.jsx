import React, { useEffect, useState } from "react";
import API from "../../api/axios";

import TopSearch from "../../components/layouts/TopSearch";
import UserGraph from "../../components/dashboard/UserGraph";
import TransactionHistory from "../../components/dashboard/TransactionHistory";
import CurrentWatchlist from "../../components/dashboard/CurrentWatchlist";
import OverView from "../../components/dashboard/OverView";
import NotificationPannel from "../../components/dashboard/NotificationPannel";

const Dashboard = () => {
  const [positions, setPositions] = useState([]);
  const [overview, setOverview] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await API.get("/dashboard");

      setPositions(res.data.positions);
      setOverview(res.data.overview);
      setTransactions(res.data.transactions);
      setWatchlist(res.data.watchlist);

      console.log("Dashboard:", res.data);

    } catch (error) {
      console.error("Dashboard fetch error:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <TopSearch />

      <div className="flex gap-4">
        <div className="flex flex-col gap-4">
          <UserGraph
            positions={positions}
            balance={overview.availableBalance || 0}
          />

          <div className="flex gap-4">
            <TransactionHistory transactions={transactions} />
            <CurrentWatchlist watchlist={watchlist} />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <OverView overview={overview} />
          <NotificationPannel />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;