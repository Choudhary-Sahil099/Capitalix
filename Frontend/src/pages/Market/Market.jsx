import React from 'react'
import TopSearch from '../../components/layouts/TopSearch'
import MarketSection from '../../components/market/marketSection'
const Market = () => {
  return (
    <div className='flex flex-col gap-4'>
      <TopSearch />
      <MarketSection />
    </div>
  )
}

export default Market
