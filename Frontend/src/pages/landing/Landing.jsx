import React from 'react';
import NavBar from '../../components/Layouts/NavBar';
import Hero from './Hero'
import Features from './Features';
import CTA from './CTA';

const Landing = () => {
  return (
    <div>
     <NavBar />
     <Hero />
     <Features />
     <CTA />
    </div>
  )
}

export default Landing
