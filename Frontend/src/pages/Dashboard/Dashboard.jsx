import React from 'react';
import SideBar from '../../components/dashboard/SideBar'
import TopSearch from '../../components/dashboard/TopSearch';
import UserGraph from '../../components/dashboard/UserGraph';

const Dashboard = () => {
  return (
    <div className='bg-black flex gap-4 min-h-screen'>
      <SideBar />
      <div className='flex-1 flex flex-col gap-4'>
        <TopSearch />
        <div className='flex'>
          <div>
            <UserGraph />
          </div>
          <div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
