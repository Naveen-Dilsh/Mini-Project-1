import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Guarantee = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const images = [
    {
      src: "/Coat 1.png",
      alt: "Suit model 1"
    },
    {
      src: "/Coat 2.png",
      alt: "Suit model 2"
    },
    {
      src: "/Linen 1.png",
      alt: "Suit model 3"
    },
    {
      src: "/Coat 3.png",
      alt: "Suit model 3"
    },
    {
      src: "/Linen 2.webp",
      alt: "Suit model 3"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      handleImageChange((currentImage + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [currentImage]);

  const handleImageChange = (newIndex) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImage(newIndex);
      setIsTransitioning(false);
    }, 300);
  };

  const nextImage = () => {
    handleImageChange((currentImage + 1) % images.length);
  };

  const prevImage = () => {
    handleImageChange(currentImage === 0 ? images.length - 1 : currentImage - 1);
  };

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row bg-gradient-to-b from-[#F8F9FA] to-[#E5E5E5]">
      {/* Left side - Image Carousel */}
      <div className="relative w-full md:w-1/2 h-[80vh] md:h-screen overflow-hidden">
        {/* Image Container */}
        <div className="relative h-full w-full">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full flex items-start justify-center transition-opacity duration-300 ${
                currentImage === index 
                  ? 'opacity-100 z-10' 
                  : 'opacity-0 z-0'
              } ${isTransitioning ? 'scale-105' : 'scale-100'}`}
              style={{
                transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out'
              }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-[150%] w-auto max-w-none object-cover"
                style={{
                  objectPosition: 'top'
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Right side - Enhanced Text Content */}
      <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-gradient-to-br from-white to-[#F8F9FA]">
        {/* Luxury Brand Label */}
        <div className="mb-6">
          <p className="text-[#C6A85C] uppercase tracking-[0.2em] text-sm font-medium mb-2">
            Bespoke Tailoring
          </p>
        </div>

        {/* Main Heading with Enhanced Typography */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-4 text-[#0A2647] leading-tight">
          Fit to
          <span className="block font-bold">Perfection</span>
          <span className="font-medium">Guaranteed</span>
        </h1>

        {/* Elegant Divider */}
        <div className="w-24 h-0.5 bg-[#C6A85C] my-8"></div>

        {/* Enhanced Description */}
        <p className="text-lg text-[#2C3333] mb-12 leading-relaxed font-light tracking-wide">
          From the finest fabrics and artisanal buttons to bespoke pocket styles 
          and signature lining colors, every detail is meticulously crafted to 
          your preferences. Experience true sartorial excellence with our
          Perfect Fit Guarantee.
        </p>

        {/* Pricing Section with Enhanced Layout */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 mb-8">
          <div>
            <p className="text-[#2C3333] uppercase tracking-wider text-sm mb-1">Starting Price</p>
            <p className="text-3xl font-light text-[#0A2647]">
              from <span className="font-medium">299€</span>
            </p>
          </div>
          
          {/* Vertical Divider for Desktop */}
          <div className="hidden sm:block w-0.5 h-12 bg-[#C6A85C]/20"></div>

          {/* CTA Button with Enhanced Styling */}
          <button className="px-8 py-4 bg-[#0A2647] text-white rounded-none hover:bg-[#C6A85C] transition-colors duration-300 uppercase tracking-wider text-sm font-medium shadow-lg hover:shadow-xl">
            Design Your Suit
          </button>
        </div>

        {/* Additional Trust Element */}
        <div className="mt-8 pt-8 border-t border-[#C6A85C]/20">
          <p className="text-sm text-[#2C3333]/80 uppercase tracking-wider">
            Trusted by discerning gentlemen worldwide
          </p>
        </div>
      </div>
    </div>
  );
};

export default Guarantee;