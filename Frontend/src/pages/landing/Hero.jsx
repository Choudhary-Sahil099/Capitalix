import React from 'react'
import Tumbnail from '../../assets/Tubnail.png'
const Hero = () => {
  return (
    <section id="hero" className='hero-bg w-full min-h-min px-20 flex py-17'>
      <div className='w-1/2 flex flex-col gap-8 pt-10'>
        <h1 className='text-white text-7xl leading-tight'><span className='textSan'>Build Real Trading</span> Skills, Safely and Confidently</h1>
        <h3 className='text-xl text-[#94A3B8]'>Make mistakes here, not with real money.</h3>
        <p className='text-xl text-[#AEB9E1]'>Practice real stock and crypto trades without risking real money.<br/>Track performance, learn faster, and trade with confidence.</p>
        <div className='flex gap-7'>
          <button className='hero-bg border border-amber-50 w-50 h-15 text-xl rounded-xl text-white flex justify-center items-center gap-3'>Open An Account</button>
          <button className='bg-[#835fdf] w-40 h-15 text-xl rounded-xl text-white flex justify-center items-center gap-3'>Learn More</button>
        </div>
      </div>
      <div className='w-1/2 flex justify-center items-center'>
        <img src={Tumbnail}  className='w-full'/>
      </div>
    </section>
  )
}

export default Hero
