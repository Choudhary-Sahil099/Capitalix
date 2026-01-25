import React, { useState } from 'react';
import NavBar from '../../components/Layouts/NavBar';
import Hero from './Hero'
import Features from './Features';
import CTA from './CTA';
import Login from '../Auth/Login';
import Signup from '../Auth/Signup';

const Landing = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp , setShowSignUp] = useState(false);
  const openLogin = () => {
    setShowSignUp(false);
    setShowLogin(true);
  };

  const openSignup = () => {
    setShowLogin(false);
    setShowSignUp(true);
  };

  const closeAll = () => {
    setShowLogin(false);
    setShowSignUp(false);
  };

  const isModalOpen = showLogin || showSignUp;
  return (
    <>
    <div className={isModalOpen ? "blur-sm transition-all duration-200" : ""}>
     <NavBar onLoginClick={openLogin}  onSignClick={openSignup}/>
     <Hero onSignClick={openSignup}/>
     <Features />
     <CTA onSignClick={openSignup}/>
    </div>
     {showLogin && <Login setShowLogin={closeAll} openSignup={openSignup}/>}
     {showSignUp && <Signup setShowSignUp={closeAll} openLogin={openLogin}/>}
    </>
  )
}

export default Landing
