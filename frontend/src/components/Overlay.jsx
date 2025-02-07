import React from 'react';

const Overlay = () => {
  return (
    <div className="relative w-full h-96">
      {/* Background Image Section */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url('/Groom 2.jpg')`,
          backgroundPosition: 'top',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content Container */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
        {/* Small number detail */}
        <span className="text-gray-300 font-light mb-6">03.</span>
        
        {/* Main Quote */}
        <h2 className="text-4xl md:text-5xl text-white font-serif mb-6">
          "Our day was pure magic"
        </h2>
        
        {/* Description Text */}
        <p className="max-w-2xl text-gray-200 text-sm md:text-base leading-relaxed mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae felis at lorem
          sodales consectetur. Nullam hendrerit ipsum ut lectus feugiat, id facilisis eros sodales.
          Vestibulum ante ipsum primis in faucibus.
        </p>
        
        {/* Attribution */}
        <span className="text-gray-300 text-sm tracking-wider uppercase">
          Julie & Jordan
        </span>
      </div>
    </div>
  );
};

export default Overlay;