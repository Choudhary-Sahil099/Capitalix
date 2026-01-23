import React from 'react'

const CTA = ({onSignClick}) => {
  return (
    <footer className="bg-[#000000] text-[#94A3B8] px-20 pt-16 pb-2">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-3">
        
        <div className="flex flex-col gap-4">
          <h2 className="text-white text-2xl font-bold">CapitalIx</h2>
          <p className="text-sm leading-relaxed">
            Learn. Practice. Grow — without risking real money.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Product</h3>
          <ul className="flex flex-col gap-3 text-sm">
            <li className="hover:text-white cursor-pointer">Paper Trading</li>
            <li className="hover:text-white cursor-pointer">Virtual Portfolio</li>
            <li className="hover:text-white cursor-pointer">Performance Analytics</li>
            <li className="hover:text-white cursor-pointer">Leaderboard</li>
            <li className="hover:text-white cursor-pointer">How It Works</li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-white font-semibold mb-4">Resources</h3>
          <ul className="flex flex-col gap-3 text-sm">
            <li className="hover:text-white cursor-pointer">Learn Investing</li>
            <li className="hover:text-white cursor-pointer">Market Basics</li>
            <li className="hover:text-white cursor-pointer">Trading Strategies</li>
            <li className="hover:text-white cursor-pointer">FAQs</li>
            <li className="hover:text-white cursor-pointer">Blog</li>
          </ul>
        </div>
        <div className="flex flex-col gap-6">
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li className="hover:text-white cursor-pointer">Terms & Conditions</li>
              <li className="hover:text-white cursor-pointer">Privacy Policy</li>
              <li className="hover:text-white cursor-pointer">Risk Disclaimer</li>
            </ul>
          </div>

          <div>
            <p className="text-sm mb-3 text-white">
              Start building your investment skills today.
            </p>
            <button className="bg-white text-[#081028] px-5 py-2 rounded-md text-sm font-semibold hover:bg-gray-200 transition" onClick={onSignClick}>
              Start Paper Trading →
            </button>
          </div>
        </div>
      </div>

      <div className="pt-4 flex flex-col gap-4 text-xs">
        <p className="max-w-3xl leading-relaxed">
          This platform is for educational purposes only. No real money is involved.
          Market data may be delayed or simulated. We do not provide financial advice.
        </p>
        <p>© 2026 CapitalIx. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default CTA
