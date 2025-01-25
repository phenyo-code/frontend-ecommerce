import React from 'react';
import './hero.css';  // Optional: for styling

const Hero = ({ title, subtitle, Image }) => {
  return (
    <div 
      className="hero-container" 
      style={{
        backgroundImage: `url(${Image})`,
        backgroundSize: 'cover',
        width: '100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '500px', // Adjust height as needed
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff', // Ensure text is readable
        textAlign: 'center',
        padding: '20px',
      }}
    >
      <div className="hero-content">
        <h1 className='hero-title'>{title}</h1>
        <p className='hero-subtitle'>{subtitle}</p>
        <p className="shop-btn">Shop Now</p>
      </div>
    </div>
  );
};
export default Hero;



