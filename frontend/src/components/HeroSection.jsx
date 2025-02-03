import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoveRight } from 'lucide-react';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Architectural Elegance",
      subtitle: "DESIGN MASTERPIECE",
      description: "Crafting extraordinary spaces that transcend conventional boundaries, where every line tells a story of innovation and precision.",
      image: "/Groom 1.jpg",
      accentColor: "border-gold-500 text-gold-500"
    },
    {
      title: "Modern Sophistication",
      subtitle: "VISIONARY CONCEPTS",
      description: "Transforming environments through intelligent design, blending cutting-edge technology with timeless aesthetic principles.",
      image: "/Groom 2.jpg",
      accentColor: "border-platinum-500 text-platinum-500"
    },
    {
      title: "Urban Harmony",
      subtitle: "CONTEMPORARY LIVING",
      description: "Redefining spatial experiences with meticulously crafted environments that celebrate the intersection of form and function.",
      image: "/Groom 3.jpg",
      accentColor: "border-silver-500 text-silver-500"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const pageVariants = {
    initial: { opacity: 0, y: 50 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -50 }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  };

  const imageVariants = {
    initial: { opacity: 0, scale: 1.1 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 }
  };

  return (
    <motion.div 
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="relative h-screen w-full flex flex-col md:flex-row overflow-hidden"
    >
      {/* Image Section (moves to top on mobile) */}
      <div className="w-full md:w-3/4 h-1/2 md:h-full relative top-12 sm:top-16 md:top-0 overflow-hidden order-first md:order-last">
        <AnimatePresence mode="wait">
          {slides.map((slide, index) => (
            index === currentSlide && (
              <motion.div
                key={index}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={imageVariants}
                transition={{ duration: 1 }}
                className="absolute inset-0"
              >
                <img 
                  src={slide.image} 
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>

      {/* Content Section (moves to bottom on mobile) */}
      <div className="w-full md:w-1/4 bg-black text-white flex items-center justify-center relative z-10 h-1/2 md:h-full order-last md:order-first">
        <div className="w-full px-4 md:px-6 lg:px-8 py-8 max-w-md">
          <AnimatePresence mode="wait">
            {slides.map((slide, index) => (
              index === currentSlide && (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 px-4 md:px-6 lg:px-8 py-8 flex flex-col justify-center"
                >
                  {/* Subtitle with Accent */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className={`flex items-center space-x-4 mb-4 ${slide.accentColor}`}
                  >
                    <div className="w-8 h-[1px] bg-current opacity-60" />
                    <span className="text-xs tracking-[0.3em] uppercase opacity-80">
                      {slide.subtitle}
                    </span>
                  </motion.div>

                  {/* Title */}
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-thin text-white/90 mb-4 whitespace-pre-line leading-tight"
                  >
                    {slide.title}
                  </motion.h1>

                  {/* Description */}
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-sm sm:text-base md:text-base text-white/70 mb-6 leading-relaxed"
                  >
                    {slide.description}
                  </motion.p>

                  {/* Call to Action */}
                  <motion.button 
                    initial={{ opacity: 0, }}
                    animate={{ opacity: 1,  }}
                    transition={{ delay: 1 }}
                    className={`
                      group relative inline-flex items-center px-6 py-3 
                      border ${slide.accentColor} 
                      text-xs sm:text-sm tracking-wider
                      hover:bg-white/10 transition-all duration-300
                    `}
                  >
                    <span>Explore More</span>
                    <MoveRight 
                      className="ml-2 group-hover:translate-x-1 transition-transform" 
                      size={16} 
                    />
                  </motion.button>

                  {/* Slide Counter */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="absolute bottom-4 left-0 w-full px-4 md:px-6 lg:px-8"
                  >
                    <div className="flex items-center space-x-4 text-white/60">
                      <span className="text-xl font-light">
                        {String(currentSlide + 1).padStart(2, '0')}
                      </span>
                      <div className="w-8 h-[1px] bg-white/30" />
                      <span className="text-base">
                        {String(slides.length).padStart(2, '0')}
                      </span>
                    </div>
                  </motion.div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroSection;