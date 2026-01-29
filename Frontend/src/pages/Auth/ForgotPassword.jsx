import React from 'react'
import Logo from '../../assets/logo.png'

const ForgotPassword = () => {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm'>
      <div className='bg-transparent p-8 rounded-xl border border-white min-h-min w-100'>
        <div className='text-white flex flex-col justify-center items-center gap-1'>
            <img src={Logo} className='w-50 h-20'/>
            <h2 className='text-3xl'>Forgot Password</h2>
        </div>
        <div className='mt-6 flex flex-col gap-1'>
          <h4 className='text-white text-xl '>Enter your email</h4>
          <input
          type="email"
          placeholder="Enter your email...."
          className="w-full mb-4 p-3 rounded border border-[#717171] text-white"
        />
        </div>
        <h1 className='text-center text-[#3a0bf6] hover:cursor-pointer'>Back to login</h1>
        <div className='flex justify-center items-center mt-6'>
            <button className='bg-[#835fdf] w-40 h-10 rounded-xl text-white'>
            Send
        </button>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
