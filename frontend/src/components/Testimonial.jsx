import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Alexander Brighton",
    role: "Savile Row Collection",
    image: "/User 1.jpg",
    text: "The level of craftsmanship in my wedding suit was beyond exceptional. Every detail was meticulously crafted to perfection, making me feel truly distinguished on my special day.",
    location: "London, UK"
  },
  {
    id: 2,
    name: "William Crawford",
    role: "Platinum Bespoke Collection",
    image: "/User 2.jpg",
    text: "An unparalleled experience in luxury tailoring. The attention to detail and personal service created a suit that exceeded all expectations. Simply magnificent.",
    location: "New York, USA"
  },
  {
    id: 3,
    name: "Charles Montgomery",
    role: "Royal Heritage Collection",
    image: "/api/placeholder/120/120",
    text: "The finest suit I've ever worn. The subtle details and perfect fit made me feel exceptional. The compliments were endless throughout my wedding day.",
    location: "Paris, France"
  }
];

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const itemsPerPage = 2; // Number of testimonials to show at once
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 600);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 600);
  };

  const getVisibleTestimonials = () => {
    const start = currentIndex * itemsPerPage;
    const end = start + itemsPerPage;
    return testimonials.slice(start, end);
  };

  return (
    <div className="w-full bg-gradient-to-b from-stone-100 to-stone-400 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-light text-stone-800 tracking-wider mb-4">
            CLIENT EXPERIENCES
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-stone-200 via-stone-300 to-stone-200 mx-auto"></div>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-700 ease-in-out transform ${
                isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
              }`}
            >
              {getVisibleTestimonials().map((testimonial) => (
                <div 
                  key={testimonial.id}
                  className="bg-white rounded-2xl shadow-xl border border-stone-200 p-8"
                >
                  <div className="flex flex-col items-center">
                    <div className="relative mb-6">
                      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-100 shadow-xl">
                        <img 
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <Quote className="absolute -bottom-2 right-0 text-stone-300 w-8 h-8 transform rotate-180" />
                    </div>

                    <div className="text-center">
                      <p className="text-lg text-stone-700 italic font-light leading-relaxed mb-4">
                        {testimonial.text}
                      </p>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-stone-800 mb-2">
                          {testimonial.name}
                        </h3>
                        <p className="text-stone-600 font-light mb-1">
                          {testimonial.role}
                        </p>
                        <p className="text-stone-400 text-sm">
                          {testimonial.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <button 
            onClick={handlePrev}
            className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-stone-50 p-3 rounded-full shadow-lg transition-all duration-300 group border border-stone-200"
          >
            <ChevronLeft className="w-6 h-6 text-stone-400 group-hover:text-stone-600" />
          </button>
          
          <button 
            onClick={handleNext}
            className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-stone-50 p-3 rounded-full shadow-lg transition-all duration-300 group border border-stone-200"
          >
            <ChevronRight className="w-6 h-6 text-stone-400 group-hover:text-stone-600" />
          </button>

          {/* Progress Indicators */}
          <div className="flex justify-center space-x-4 mt-8">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true);
                    setCurrentIndex(index);
                    setTimeout(() => setIsAnimating(false), 600);
                  }
                }}
                className={`transition-all duration-300 ${
                  index === currentIndex 
                    ? 'w-12 h-1 bg-stone-500' 
                    : 'w-6 h-1 bg-stone-200 hover:bg-stone-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;