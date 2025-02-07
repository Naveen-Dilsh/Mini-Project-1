import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, HeartIcon } from 'lucide-react';

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Bride",
      image: "/api/placeholder/64/64",
      rating: 5,
      text: "The coat exceeded all my expectations! The quality and attention to detail made me feel absolutely stunning on my winter wedding day."
    },
    {
      id: 2,
      name: "Emily Davis",
      role: "Winter Bride",
      image: "/api/placeholder/64/64",
      rating: 5,
      text: "I received so many compliments on my wedding coat. The fit was perfect and the material was luxurious. It added such a magical touch to my winter wonderland theme."
    },
    {
      id: 3,
      name: "Michelle Wong",
      role: "Bride",
      image: "/api/placeholder/64/64",
      rating: 5,
      text: "The perfect addition to my December wedding! The coat was both practical and beautiful. The team was amazing with alterations."
    },
    {
      id: 4,
      name: "Jessica Smith",
      role: "Bride",
      image: "/api/placeholder/64/64",
      rating: 5,
      text: "Absolutely perfect for my mountain wedding! The coat kept me warm during outdoor photos while looking incredibly elegant."
    },
    {
      id: 5,
      name: "Rachel Brown",
      role: "Winter Bride",
      image: "/api/placeholder/64/64",
      rating: 5,
      text: "The craftsmanship is outstanding. This coat made my winter wedding photos look like a fairytale come true."
    },
    {
      id: 6,
      name: "Laura Chen",
      role: "Bride",
      image: "/api/placeholder/64/64",
      rating: 5,
      text: "Such a beautiful addition to my wedding outfit. The details are exquisite and it photographed beautifully in the snow."
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const itemsPerSlide = isMobile ? 1 : isTablet ? 2 : 3;
  const totalSlides = Math.ceil(testimonials.length / itemsPerSlide);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [totalSlides]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
    );
  };

  return (
    <div className="w-full bg-gray-50 py-8 md:py-12 lg:py-16">
      {/* Heading Section */}
      <div className="text-center mb-8 md:mb-12 px-4">
        <div className="flex items-center justify-center gap-2 mb-3">
          <HeartIcon className="w-5 h-5 md:w-6 md:h-6 text-pink-400" />
          <span className="text-xs md:text-sm uppercase tracking-wider text-pink-400 font-medium">Love Stories</span>
          <HeartIcon className="w-5 h-5 md:w-6 md:h-6 text-pink-400" />
        </div>
        <h2 className="text-3xl md:text-4xl font-serif font-medium mb-3 md:mb-4">What Our Brides Say</h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
          Discover why brides choose our wedding coats to make their special day even more magical
        </p>
      </div>

      {/* Carousel Section */}
      <div className="relative w-full max-w-6xl mx-auto px-4">
        <div className="overflow-hidden relative rounded-xl">
          <div 
            className="transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            <div className="flex">
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0 flex gap-4">
                  {testimonials
                    .slice(slideIndex * itemsPerSlide, slideIndex * itemsPerSlide + itemsPerSlide)
                    .map((testimonial) => (
                    <div
                      key={testimonial.id}
                      className="w-full md:w-1/2 lg:w-1/3 p-4 md:p-6 bg-white rounded-lg shadow-lg"
                    >
                      <div className="flex flex-col items-center text-center h-full">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-14 h-14 md:w-16 md:h-16 rounded-full mb-3 md:mb-4 object-cover"
                        />
                        
                        <div className="flex gap-1 mb-3 md:mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        
                        <p className="text-gray-700 text-xs md:text-sm mb-3 md:mb-4 italic flex-grow">
                          "{testimonial.text}"
                        </p>
                        
                        <div>
                          <h3 className="font-semibold text-sm md:text-base">{testimonial.name}</h3>
                          <p className="text-gray-500 text-xs md:text-sm">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-1.5 md:p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 md:w-6 md:h-6 text-gray-600" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-1.5 md:p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
        >
          <ChevronRight className="w-4 h-4 md:w-6 md:h-6 text-gray-600" />
        </button>

        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-gray-800' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;