import React, { useEffect,useState } from 'react'
import { X } from 'lucide-react';
import Logo from '../../assets/logo.png'
import ForgotPassword from './ForgotPassword';
const Login = ({ setShowLogin, openSignup }) => {
  const [forgot, setForgot] = useState(false);
  if(forgot){
    return(
      <ForgotPassword onBack={() =>setForgot(false)} onClose={() =>setShowLogin(false)} />
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setShowLogin(false)}>
      <div className="bg-transparent p-8 rounded-xl w-100 relative border border-white h-min-h" onClick={(e) => e.stopPropagation()} >
        <button
          onClick={() => setShowLogin(false)}
          className="absolute top-3 right-3 text-white text-xl hover:cursor-pointer"
        >
          <X />
        </button>

        <div className='text-white flex flex-col justify-center items-center gap-2'>
          <img src={Logo} className='w-50 h-20'/>
          <h2 className='text-3xl'>Login to CapitalIx</h2>
        </div>

        <div className='mt-4 flex flex-col gap-1'>
          <h4 className='text-white text-xl '>Email</h4>
          <input
          type="email"
          placeholder="Enter your email...."
          className="w-full mb-4 p-3 rounded border border-[#717171] text-white"
        />
        </div>

        <div className='mt-4 flex flex-col gap-1'>
          <h4 className='text-white text-xl '>Password</h4>
          <input
          type="password"
          placeholder="Enter your password...."
          className="w-full mb-4 p-3 rounded border border-[#717171] text-white"
        />
        <span className='text-white text-right hover:cursor-pointer' onClick={() =>setForgot(true)}>Forgot passord?</span>
        </div>

        <button className="w-full bg-[#835fdf] py-3 rounded text-white font-semibold mt-6">
          Login
        </button>
        <h2 className='mt-2 text-center text-white'>Don't have an account?<span className='text-[#3a0bf6] hover:cursor-pointer hover:underline' onClick={openSignup}>SignUp</span></h2>
      </div>
    </div>
  );
};

export default Login;
