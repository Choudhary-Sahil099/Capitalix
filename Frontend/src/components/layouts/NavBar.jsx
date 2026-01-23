import Logo from '../../assets/Logo.png'
import { Menu } from 'lucide-react';
const NavBar = ({ onLoginClick, onSignClick }) => {
  return (
    <div className="nav-bg h-20 w-full flex justify-between items-center px-20">
      <div className='h-16 w-50'>
        <img src={Logo}/>
      </div>
      <div className='flex justify-center items-center gap-3'>
        <button onClick={onSignClick} className='h-10 border w-40 text-white rounded-md text-center text-md flex justify-center items-center'>Open An Account</button>
        <button onClick={onLoginClick} className ='h-10 bg-[#835fdf] w-23 text-white rounded-md text-center text-md flex justify-center items-center'>Log In</button>
        <button className='h-10 w-15 text-white rounded-md text-center text-md flex justify-center items-center'><Menu className='w-15 h-8' /></button> 
      </div>
    </div>
  );
};

export default NavBar;