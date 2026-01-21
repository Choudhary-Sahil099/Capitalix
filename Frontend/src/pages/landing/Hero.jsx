import React from 'react'
import Tumbnail from '../../assets/Tubnail.png'
const Hero = () => {
  return (
    <section className='bg-[#081028] w-full min-h-min px-20 flex py-17'>
      <div className='w-1/2 font-bold flex flex-col gap-12'>
        <h1 className='text-white text-8xl'>Build Trading Skills, Safely</h1>
        <h3 className='text-xl text-[#94A3B8]  '>Make mistakes here, not with real money.</h3>
        <p className='text-3xl text-[#AEB9E1]'>Practice real stock and crypto trades without risking real money.<br/>Track performance, learn faster, and trade with confidence.</p>
        <div className='flex gap-7'>
          <button className='bg-[#CB3CFF] w-50 h-15 text-xl rounded-xl text-white flex justify-center items-center gap-3'>Open An Account</button>
          <button className='bg-[#CB3CFF] w-40 h-15 text-xl rounded-xl text-white flex justify-center items-center gap-3'>Learn More</button>
          
        </div>
      </div>
      <div className='w-1/2 flex justify-center items-center'>
        <img src={Tumbnail}  className='w-full'/>
      </div>
    </section>
  )
}

export default Hero
