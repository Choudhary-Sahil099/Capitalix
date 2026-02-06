import React from 'react'
import NavWatch from '../../components/watchlist/NavWatch'
import WatchlistBox from '../../components/watchlist/WatchlistBox'

const Watchlist = () => {
  return (
    <div className='flex flex-col gap-4'>
      <NavWatch />
      <WatchlistBox />
    </div>
  )
}

export default Watchlist
