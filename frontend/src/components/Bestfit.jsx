import React, { useState, useEffect } from 'react';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import { useProductStore } from '../stores/useProductStore';

const BestOutfits = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [itemsPerView, setItemsPerView] = useState(4);
  
  const { 
    recommendedItems, 
    loading, 
    fetchRecommendedItems 
  } = useProductStore();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 768) {
        setItemsPerView(2);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(3);
      } else {
        setItemsPerView(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    fetchRecommendedItems();
    
    const timer = setInterval(() => {
      if (recommendedItems.length > 0) {
        setActiveSlide((prev) => (prev + 1) % recommendedItems.length);
      }
    }, 3000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(timer);
    };
  }, [fetchRecommendedItems]);

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black" />
      </div>
    );
  }

  if (!recommendedItems?.length) {
    return null;
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12 bg-gradient-to-br from-gray-50 to-gray-100">
      <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-900 tracking-tight">
        R
      </h2>
      
      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${activeSlide * (100 / itemsPerView)}%)`,
          }}
        >
          {recommendedItems.map((item, index) => (
            <div 
              key={item._id}
              className={`w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex-shrink-0 px-3 mb-6`}
            >
              <div 
                className="group relative w-full bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-2"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Images Container */}
                <div className="relative aspect-[3/4] overflow-hidden rounded-t-2xl">
                  <img 
                    src={item.primaryImage}
                    alt={item.name}
                    className={`absolute inset-0 w-full h-full object-contain transition-transform duration-700 ease-out
                      ${hoveredIndex === index ? 'scale-110' : 'scale-100'}`}
                  />
                  {item.secondaryImage && (
                    <img 
                      src={item.secondaryImage}
                      alt={`${item.name} alternate view`}
                      className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-700 ease-out
                        ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`}
                    />
                  )}
                  
                  {/* Overlay */}
                  <div 
                    className={`absolute inset-0 bg-black transition-opacity duration-500
                      ${hoveredIndex === index ? 'opacity-20' : 'opacity-0'}`} 
                  />

                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button 
                      className="p-2 rounded-full bg-white/80 shadow-md hover:bg-white transition-all duration-300 hover:scale-110"
                    >
                      <Heart size={20} className="text-gray-700" />
                    </button>
                    <button 
                      className="p-2 rounded-full bg-white/80 shadow-md hover:bg-white transition-all duration-300 hover:scale-110"
                    >
                      <ShoppingCart size={20} className="text-gray-700" />
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4 bg-white rounded-b-2xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">
                    {item.name}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-900">
                      €{item.price.toFixed(2)}
                    </span>
                    {item.rating && (
                      <div className="flex items-center">
                        <Star size={16} className="text-yellow-500 fill-yellow-500" />
                        <span className="ml-1 text-sm text-gray-600">
                          {item.rating}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-8 gap-2">
          {recommendedItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 
                ${activeSlide === index ? 'bg-black w-4' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );b
};

export default BestOutfits;