import { useState } from "react";
import Logo from "../../assets/Logo.png";
import { Menu as MenuIcon } from "lucide-react";

const NavBar = ({ onLoginClick, onSignClick }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="nav-bg h-20 w-full flex items-center px-20">

      <div className="h-16 w-40 flex items-center justify-center">
        <img
          src={Logo}
          alt="Logo"
          className="h-full object-contain"
        />
      </div>

      <div className="ml-auto flex items-center gap-3">
        <button
          onClick={onSignClick}
          className="h-10 w-40 border border-white text-white rounded-md text-md flex items-center justify-center"
        >
          Open An Account
        </button>

        <button
          onClick={onLoginClick}
          className="h-10 w-24 bg-[#835fdf] text-white rounded-md text-md flex items-center justify-center"
        >
          Log In
        </button>

        <button
          onClick={() => setOpen(!open)}
          className="h-10 w-10 text-white flex items-center justify-center"
        >
          <MenuIcon className="h-8 w-8" />
        </button>
      </div>


      {open && (
        <div className="absolute top-20 right-2 bg-white text-black shadow-lg rounded-md p-4 w-40 transform transition-all duration-300 ease-out opacity-100 translate-y-0 scale-100">
          <p className="cursor-pointer hover:text-purple-600">Main</p>
          <p className="cursor-pointer hover:text-purple-600">Features</p>
          <p className="cursor-pointer hover:text-purple-600">Contact</p>
          <p className="cursor-pointer hover:text-purple-600">About Us</p>
        </div>
      )}
    </div>
  );
};

export default NavBar;
