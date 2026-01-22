import React from 'react'

const Features = () => {
  return (
    <section className='min-h-min w-full flex flex-col bg-[#000000] px-20 pt-20 gap-12'>
      <div className='text-center'>
        <h1 className='text-white text-6xl'>Invest Smart from Day One —<br/> Zero Investment Required</h1>
      </div>
      <div className='flex justify-center items-center gap-25 text-2xl pt-8 text-white'>
        <a href="">Start Investing</a>
        <a href="">Secure Assets</a>
        <a href="">Real-Time Tracking</a>
        <a href="">Easy Planing</a>
      </div>
      <div className='flex gap-10'>
        <div className='h-100 w-full border border-white rounded-2xl'></div>
        <div className='h-100 w-full border border-white rounded-2xl'></div>
        <div className='h-100 w-full border border-white rounded-2xl'></div>
      </div>
      <div className='flex justify-center items-center'>
        <button className='h-10 bg-[#CB3CFF] w-40 text-white rounded-md text-center text-md flex justify-center items-center'>Explore</button>
      </div>
    </section>
  )
}

export default Features
