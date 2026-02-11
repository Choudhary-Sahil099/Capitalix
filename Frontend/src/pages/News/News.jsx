import React from 'react'
import TopSearch from '../../components/layouts/TopSearch'
import NewsBox from '../../components/news/NewsBox'
const News = () => {
  return (
    <div className='flex flex-col gap-4'>
      <TopSearch />
      <NewsBox />
    </div>
  )
}

export default News
