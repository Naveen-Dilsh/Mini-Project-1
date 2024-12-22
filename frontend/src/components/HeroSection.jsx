import React from 'react';

const WeddingSuitsHero = () => {
  const images = [
    "/Coat 1.png",
    "/Coat 2.png",
    "/Coat 3.png",
    "/Coat 6.webp",
    "/Coat 5.webp",
    "/Coat 7.webp",
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center relative overflow-hidden pt-16">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-20 w-64 h-64 bg-[#C6A85C]/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#800020]/5 rounded-full blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Luxurious Text Content */}
          <div className="space-y-6">
            {/* Refined header section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="h-[1px] w-12 bg-[#C6A85C]"></div>
                <span className="text-[#C6A85C] font-serif italic text-lg tracking-wider uppercase">Haute Couture</span>
              </div>
              <h1 className="text-6xl lg:text-7xl font-serif text-[#0A2647] leading-tight">
                <span className="block">Artisanal</span>
                <span className="block mt-2 text-[#C6A85C] font-light italic">Masterpieces</span>
              </h1>
            </div>
            
            {/* Refined description */}
            <div className="space-y-6">
              <p className="text-[#2C3333] text-xl leading-relaxed max-w-xl font-light tracking-wide">
                Experience the epitome of bespoke craftsmanship, where each stitch tells 
                a story of unparalleled excellence and timeless sophistication.
              </p>
              <p className="text-[#2C3333]/80 text-lg leading-relaxed max-w-xl font-light">
                Our atelier brings together centuries of tailoring heritage with contemporary 
                elegance to create wedding suits that transcend fashion.
              </p>
            </div>
            
            {/* Enhanced CTA section */}
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row gap-6">
                <button className="px-10 py-5 bg-[#0A2647] text-white hover:bg-[#0A2647]/90 transition-all duration-300 rounded-none shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  <span className="text-lg tracking-wider uppercase">Private Consultation</span>
                </button>
                <button className="group px-10 py-5 border-2 border-[#C6A85C] text-[#C6A85C] hover:bg-[#C6A85C] hover:text-white transition-all duration-300 rounded-none shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  <span className="text-lg tracking-wider uppercase">View Anthology</span>
                </button>
              </div>

              {/* Luxury indicators */}
              <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 rounded-full border-2 border-[#C6A85C] flex items-center justify-center">
                    <div className="w-2 h-2 bg-[#C6A85C] rounded-full"></div>
                  </div>
                  <span className="text-[#2C3333] font-serif italic">Bespoke Excellence</span>
                </div>
                <div className="h-[1px] w-16 bg-[#C6A85C]"></div>
              </div>
            </div>
          </div>

          {/* Right Column - Symphony Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 relative z-10">
              {images.map((src, index) => (
                <div 
                  key={index} 
                  className={`relative group ${
                    index === 0 ? 'col-span-2 row-span-2 md:col-span-1 md:row-span-1' :
                    index === 1 ? 'md:translate-y-16' :
                    index === 3 ? 'md:-translate-y-16' :
                    index === 4 ? 'md:translate-y-8' : ''
                  }`}
                >
                  <div className="overflow-hidden rounded-none shadow-xl">
                    <img
                      src={src}
                      alt={`Luxury Wedding Suit ${index + 1}`}
                      className="w-full h-72 object-cover transform transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A2647]/30 group-hover:opacity-0 transition-opacity duration-500"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
              <div className="w-32 h-32 border-2 border-[#C6A85C]/20 rounded-full"></div>
            </div>
            <div className="absolute bottom-0 left-0 transform -translate-x-1/2 translate-y-1/2">
              <div className="w-48 h-48 border-2 border-[#800020]/20 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeddingSuitsHero;