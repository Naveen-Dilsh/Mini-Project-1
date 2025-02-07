import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Shield, Award, Star, CheckCircle } from 'lucide-react';

const WeddingSuitShowcase = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const suits = [
    { 
      src: "/Linen 1.png",
      alt: "Classic Black Tuxedo",
      name: "Classic Black Tuxedo",
      price: "899"
    },
    { 
      src: "/Coat 1.png",
      alt: "Modern Navy Suit",
      name: "Modern Navy Suit",
      price: "749"
    },
    { 
      src: "/Linen 2.webp",
      alt: "Elegant White Suit",
      name: "Elegant White Suit",
      price: "999"
    },
  ];

  const features = [
    { icon: Shield, title: "Premium Fabrics", desc: "Crafted with the finest materials" },
    { icon: Award, title: "Tailored Fit", desc: "Designed for ultimate comfort" },
    { icon: Star, title: "Exclusive Designs", desc: "Stand out on your special day" },
    { icon: CheckCircle, title: "Satisfaction Guarantee", desc: "Ensuring the perfect look" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      handleImageChange((currentImage + 1) % suits.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentImage]);

  const handleImageChange = (newIndex) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImage(newIndex);
      setIsTransitioning(false);
    }, 300);
  };

  const navigate = (direction) => {
    const newIndex = direction === 'next'
      ? (currentImage + 1) % suits.length
      : currentImage === 0 ? suits.length - 1 : currentImage - 1;
    handleImageChange(newIndex);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-neutral-100 to-stone-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Suit Details */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-sm text-amber-700 uppercase tracking-wider font-medium">
                Exclusive Wedding Collection
              </h2>
              <h1 className="text-5xl font-bold text-stone-800">
                {suits[currentImage].name}
              </h1>
              <div className="h-1 w-24 bg-amber-600 rounded-full"></div>
              <p className="text-xl text-stone-600 font-light leading-relaxed">
                Elevate your wedding look with our premium collection of suits, 
                designed for elegance, comfort, and sophistication. 
                Make your special day truly unforgettable.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="p-4 rounded-lg bg-white shadow-lg border border-stone-100">
                  <feature.icon className="h-6 w-6 text-amber-600 mb-2" />
                  <h3 className="font-medium text-lg text-stone-800">{feature.title}</h3>
                  <p className="text-stone-600 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>

            {/* Price and CTA */}
            {/* <div className="space-y-6">
              <div className="flex items-end gap-2">
                <span className="text-stone-500 text-xl">Starting at</span>
                <span className="text-4xl font-bold text-amber-700">${suits[currentImage].price}</span>
              </div>
              <div className="flex gap-4">
                <button className="px-8 py-3 bg-amber-700 text-white rounded-lg font-medium 
                  hover:bg-amber-600 transition-colors duration-300 shadow-lg">
                  Book Fitting
                </button>
                <button className="px-8 py-3 border border-amber-700 text-amber-700 rounded-lg 
                  font-medium hover:bg-amber-50 transition-colors duration-300">
                  View Details
                </button>
              </div>
            </div> */}
          </div>

          {/* Right side - Image Showcase */}
          <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
            {suits.map((suit, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-500 ease-in-out
                  ${currentImage === index ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}
                  ${isTransitioning ? 'blur-sm' : 'blur-0'}`}
              >
                <img
                  src={suit.src}
                  alt={suit.alt}
                  className="w-full h-full object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/20 to-transparent"></div>
              </div>
            ))}
            
            {/* Navigation Controls */}
            {/* <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4">
              <button
                onClick={() => navigate('prev')}
                className="p-2 rounded-full bg-white/80 hover:bg-amber-600 hover:text-white
                  transition-colors duration-300 text-amber-700"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <div className="flex gap-2">
                {suits.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleImageChange(index)}
                    className={`h-2 rounded-full transition-all duration-300 
                      ${currentImage === index ? 'w-8 bg-amber-600' : 'w-2 bg-white/80'}`}
                  />
                ))}
              </div>
              <button
                onClick={() => navigate('next')}
                className="p-2 rounded-full bg-white/80 hover:bg-amber-600 hover:text-white
                  transition-colors duration-300 text-amber-700"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeddingSuitShowcase;