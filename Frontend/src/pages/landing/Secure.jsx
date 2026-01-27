import React from 'react'
import Security from "../../assets/security.png";
import Encryption from "../../assets/encryption.png";
import Trust from "../../assets/trust.png";

const Secure = () => {
  return (
    <div className="flex gap-10">
          <div className="h-100 w-full border border-white rounded-2xl p-10">
            <div className="flex flex-col justify-center items-center gap-5">
              <img src={Security} className="w-50 h-50 border p-5 border-[#c6c6c6] rounded-xl" />
              <h2 className="text-2xl text-white">Bank Grade Security</h2>
              <button className="border border-white p-3 rounded-xl w-full text-left text-[#b1b0b0]">
                Learn more
              </button>
            </div>
          </div>
          <div className="h-100 w-full border border-white rounded-2xl p-10">
            <div className="flex flex-col justify-center items-center gap-5">
              <img src={Encryption} className="w-50 h-50 border p-5 border-[#c6c6c6] rounded-xl" />
              <h2 className="text-2xl text-white">Encryted Transactions</h2>
              <button className="border border-white p-3 rounded-xl text-left text-[#b1b0b0] w-full">
                Learn more
              </button>
            </div>
          </div>
          <div className="h-100 w-full border border-white rounded-2xl p-10">
            <div className="flex flex-col justify-center items-center gap-5">
              <img src={Trust} className="w-50 h-50 border p-5 border-[#c6c6c6] rounded-xl" />
              <h2 className="text-2xl text-white">Trust & Saftey Focus</h2>
              <button className="border border-white p-3 rounded-xl text-left text-[#b1b0b0] w-full">
                Learn more
              </button>
            </div>
          </div>
        </div>
  )
}

export default Secure
