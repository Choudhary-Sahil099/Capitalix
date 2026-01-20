import Logo from '../../assets/Logo.png'
import { Search } from 'lucide-react';
const NavBar = () => {
  return (
    // the nav will have the simple logo of the website and a search space and a button which will seach the stock or the crypto currency from the backend
    <div className="bg-[#081028] h-20 w-full flex justify-between items-center px-20">
      <div className='h-12 w-40 object-cover'>
        <img src={Logo}/>
      </div>
      <div className='flex justify-center items-center gap-3'>
        <div className='flex justify-center items-center border border-[#aeb9e185] bg-[#0B1739] px-2 rounded-sm'>
            <Search className='text-[#60677c] '/>
            <input className='h-9 w-50 pl-2 rounded-sm bg-[#0B1739] text-md text-[#60677c] focus:outline-none focus:ring-0 focus:border-transparent' placeholder='search stocks, crypto....'/>
        </div>
        <button className='h-9 bg-[#CB3CFF] w-23 text-white rounded-xl text-center text-md flex justify-center items-center'>Search</button>
      </div>
    </div>
  );
};

export default NavBar;