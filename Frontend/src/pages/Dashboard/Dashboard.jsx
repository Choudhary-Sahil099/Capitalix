import React from 'react';
import TopSearch from '../../components/dashboard/TopSearch';
import UserGraph from '../../components/dashboard/UserGraph';
import TransactionHistory from '../../components/dashboard/TransactionHistory';
import CurrentWatchlist from '../../components/dashboard/CurrentWatchlist';
import OverView from '../../components/dashboard/OverView';
import NotificationPannel from '../../components/dashboard/NotificationPannel';

const Dashboard = () => {
  return (
    <div className='flex flex-col gap-4'>
      <TopSearch />

      <div className='flex gap-4'>
        <div className='flex flex-col gap-4'>
          <UserGraph />
          <div className='flex gap-4'>
            <TransactionHistory />
            <CurrentWatchlist />
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <OverView />
          <NotificationPannel />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
