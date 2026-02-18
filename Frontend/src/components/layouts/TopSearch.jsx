import React from 'react'
import { Sun,Bell,CircleUser } from 'lucide-react'
const TopSearch = () => {
  return (
    <div className='w-full h-20 rounded-bl-xl rounded-br-xl bg-[#0e0d0d] flex justify-between items-center p-6'>
      <div>
        <input className='bg-black w-100 h-12 rounded-md text-white p-4' placeholder='Search stocks & crypto....'/>
      </div>
      <div className='flex gap-6 justify-center items-center text-white'>
        <Bell size={30}/>
        <div className='flex justify-center items-center gap-2'><CircleUser size={30}/><span className='text-md text-[#6b6a6a]'>Sahil</span></div>
        <Sun size={30}/>
      </div>
    </div>
  )
}

export default TopSearch
