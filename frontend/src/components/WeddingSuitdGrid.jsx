import React from 'react';
import { Crown, Sparkles, DiamondIcon, Scissors } from 'lucide-react';

const WeddingSuitsGrid = () => {
  return (
    <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 px-4 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-4xl mx-auto">
        {/* First Square - Luxe Full Image */}
        <div className="relative group overflow-hidden rounded-lg">
          <img
            src="/Groom 1.jpg"
            alt="Luxury Groom Suit"
            className="w-full h-48 md:h-60 object-cover 
              filter brightness-90 group-hover:brightness-100 
              transform group-hover:scale-110 
              transition-all duration-700 rounded-lg"
          />
          <div className="absolute top-2 left-2 flex items-center 
            bg-white/30 backdrop-blur-md px-2 py-1 rounded-full">
            <Crown className="text-gold-500 mr-1" size={16} />
            <span className="text-white text-xs font-semibold">Signature</span>
          </div>
        </div>
        
        {/* Second Square - Refined Collection Details */}
        <div className="bg-gradient-to-br from-neutral-100 to-neutral-200 
          flex flex-col justify-center items-center text-center p-4 
          rounded-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-white opacity-10 
            clip-path-polygon-[0%_0%,100%_0%,100%_85%,0%_100%]" />
          <div className="max-w-md relative z-10">
            <h2 className="text-2xl font-thin text-neutral-900 mb-3 
              tracking-tight">Bespoke Elegance</h2>
            <p className="text-neutral-700 text-xs mb-3">
              Meticulously crafted suits that transcend ordinary design.
            </p>
            <div className="flex justify-center space-x-2 mb-3">
              <div className="flex items-center text-neutral-800">
                <Sparkles className="mr-1" size={16} />
                <span className="text-xs">Premium Fabrics</span>
              </div>
              <div className="flex items-center text-neutral-800">
                <DiamondIcon className="mr-1" size={16} />
                <span className="text-xs">Precision Tailoring</span>
              </div>
            </div>
          </div>
          <button className="px-4 py-1 bg-neutral-900 text-white 
            rounded-full hover:bg-neutral-800 transition-colors 
            text-xs shadow-md relative z-10">
            Explore
          </button>
        </div>
        
        {/* Third Square - Exclusive Customization */}
        <div className="bg-white flex flex-col justify-center items-center 
          text-center p-4 relative overflow-hidden rounded-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 
            to-neutral-100 opacity-50 -z-10 
            clip-path-polygon-[20%_0%,100%_0%,100%_80%,0%_100%]" />
          <div className="max-w-md">
            <h3 className="text-2xl font-thin text-neutral-900 mb-3 
              tracking-tight">Tailored Experience</h3>
            <div className="text-neutral-700 space-y-2 text-xs mb-3">
              <div className="flex items-center justify-center space-x-2">
                <Scissors className="text-neutral-800" size={16} />
                <p>Precision Measurement</p>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <DiamondIcon className="text-neutral-800" size={16} />
                <p>Curated Fabric</p>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Sparkles className="text-neutral-800" size={16} />
                <p>Styling Workshop</p>
              </div>
            </div>
          </div>
          <button className="px-4 py-1 border-2 border-neutral-900 
            text-neutral-900 rounded-full hover:bg-neutral-900 
            hover:text-white transition-all text-xs">
            Begin Journey
          </button>
        </div>
        
        {/* Fourth Square - Artistic Groom Image */}
        <div className="relative group overflow-hidden rounded-lg">
          <img
            src="/Groom 2.jpg"
            alt="Artistic Groom Portrait"
            className="w-full h-48 md:h-60 object-cover 
              filter brightness-90 group-hover:brightness-100 
              transform group-hover:scale-110 
              transition-all duration-700 rounded-lg"
          />
          <div className="absolute bottom-2 left-2 
            bg-white/30 backdrop-blur-md px-2 py-1 rounded-full">
            <span className="text-white text-xs font-semibold">
              Timeless Style
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeddingSuitsGrid;