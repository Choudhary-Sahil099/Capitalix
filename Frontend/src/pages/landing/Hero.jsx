import React from 'react'
import Tumbnail from '../../assets/Tubnail.png'
import { MoveRight } from 'lucide-react';
const Hero = () => {
  return (
    <div className='bg-[#081028] w-full min-h-screen px-20 flex py-15'>
      <div className='w-1/2 font-bold flex flex-col gap-10'>
        <h1 className='text-white text-8xl'>Build Trading Skills, Safely</h1>
        <h3 className='text-xl text-[#94A3B8]  '>Make mistakes here, not with real money.</h3>
        <p className='text-3xl text-[#AEB9E1]'>Practice real stock and crypto trades without risking real money.<br/>Track performance, learn faster, and trade with confidence.</p>
        <button className='bg-[#CB3CFF] w-50 h-15 text-xl rounded-xl text-white flex justify-center items-center gap-3'>Get Started <MoveRight strokeWidth={4}/></button>
      </div>
      <div className='w-1/2 flex justify-center items-center'>
        <img src={Tumbnail}  className='w-full'/>
      </div>
    </div>
  )
}

export default Hero
