import React from 'react';
import SideBar from '../../components/dashboard/SideBar'
import TopSearch from '../../components/dashboard/TopSearch';
import UserGraph from '../../components/dashboard/UserGraph';
import TransactionHistory from '../../components/dashboard/TransactionHistory';
import CurrentWatchlist from '../../components/dashboard/CurrentWatchlist';
import OverView from '../../components/dashboard/OverView';
import NotificationPannel from '../../components/dashboard/NotificationPannel';

const Dashboard = () => {
  return (
    <div className='bg-black flex gap-4 min-h-screen'>
      <SideBar />
      <div className='flex-1 flex flex-col gap-4'>
        <TopSearch />
        <div className='flex gap-4'>
          <div className='flex flex-col gap-4'>
            <UserGraph />
            <div className='flex gap-4'>
            <TransactionHistory />
            <CurrentWatchlist />
            </div>
          </div>
          <div className='flex gap-4'>
          <OverView />
          <NotificationPannel />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
