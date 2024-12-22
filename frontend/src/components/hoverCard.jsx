import React, { useState } from 'react';

const HoverImageCard = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative w-64 h-80 rounded-lg overflow-hidden shadow-lg cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-full h-full relative">
        {/* First Image */}
        <img
          src="/bags.jpg"
          alt="Default image"
          className={`absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 ease-in-out ${
            isHovered ? '-translate-x-full' : '-translate-x-0'
          }`}
        />
        
        {/* Second Image (Revealed on hover) */}
        <img
          src="/suits.jpg"
          alt="Hover image"
          className={`absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 ease-in-out ${
            isHovered ? 'translate-x-0' : 'translate-x-full'
          }`}
        />
      </div>
      
      {/* Optional content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white">
        <h3 className="text-lg font-semibold">Card Title</h3>
        <p className="text-sm">Card description</p>
      </div>
    </div>
  );
};

export default HoverImageCard;