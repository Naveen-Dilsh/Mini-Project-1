import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { useProductStore } from '../stores/useProductStore'; // Adjust path as needed

const BestOutfits = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  const { 
    recommendedItems, 
    loading, 
    fetchRecommendedItems 
  } = useProductStore();

  useEffect(() => {
    // Fetch recommended items when component mounts
    fetchRecommendedItems();
    
    // Set up auto-scroll
    const timer = setInterval(() => {
      if (recommendedItems.length > 0) {
        setActiveSlide((prev) => (prev + 1) % recommendedItems.length);
      }
    }, 3000);

    return () => clearInterval(timer);
  }, [fetchRecommendedItems]);

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (!recommendedItems?.length) {
    return null;
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold text-center mb-8">Recommended For You</h2>
      
      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${activeSlide * 25}%)`,
          }}
        >
          {recommendedItems.map((item, index) => (
            <div 
              key={item._id}
              className="w-1/4 flex-shrink-0 px-2"
            >
              <div 
                className="relative w-full overflow-hidden bg-white rounded-lg shadow-lg"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Images Container */}
                <div className="relative aspect-[3/4] overflow-hidden">
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

                  {/* Favorite Button */}
                  <button 
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80
                      transition-all duration-300 hover:scale-110"
                  >
                    <Heart size={20} />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-4 bg-white">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {item.name}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-semibold text-gray-900">
                      €{item.price.toFixed(2)}
                    </span>
                    {item.rating && (
                      <div className="flex items-center">
                        <span className="text-sm text-yellow-500">★</span>
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
        <div className="flex justify-center mt-6 gap-2">
          {recommendedItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 
                ${activeSlide === index ? 'bg-gray-800 w-4' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestOutfits;