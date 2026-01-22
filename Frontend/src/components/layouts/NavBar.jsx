import Logo from '../../assets/Logo.png'
import { Menu } from 'lucide-react';
const NavBar = () => {
  return (
    // the nav will have the simple logo of the website and a search space and a button which will seach the stock or the crypto currency from the backend
    <div className="nav-bg h-20 w-full flex justify-between items-center px-20">
      <div className='h-16 w-50'>
        <img src={Logo}/>
      </div>
      <div className='flex justify-center items-center gap-3'>
        <button className='h-10 border w-40 text-white rounded-md text-center text-md flex justify-center items-center'>Open An Account</button>
        <button className='h-10 bg-[#835fdf] w-23 text-white rounded-md text-center text-md flex justify-center items-center'>Log In</button>
        <button className='h-10 w-15 text-white rounded-md text-center text-md flex justify-center items-center'><Menu className='w-15 h-8' /></button> 
      </div>
    </div>
  );
};

export default NavBar;