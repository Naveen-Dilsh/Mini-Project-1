import React from "react";

const GallerySection = () => {
  return (
    <section className="max-w-6xl mx-auto py-16 px-6 text-center bg-gradient-to-r from-gray-100 to-gray-300 rounded-lg shadow-xl">
      <h2 className="text-2xl text-gray-700 uppercase tracking-wide mb-8 font-bold">Get to Know Us</h2>
      <div className="grid md:grid-cols-3 gap-8 items-center">
        {/* Unique Vision */}
        <div className="p-6 shadow-lg bg-white rounded-lg transform hover:scale-105 transition duration-300">
          <img 
            src="/Groom 1.jpg" 
            alt="Unique Vision" 
            className="w-full h-64 object-cover rounded-lg"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold mt-4 text-gray-800">Unique Vision</h3>
            <p className="text-sm text-gray-600 mt-2">
              Every detail is carefully crafted to create an unforgettable experience.
            </p>
          </div>
        </div>

        {/* Dedication (Main Image) */}
        <div className="p-6 shadow-lg bg-white rounded-lg transform hover:scale-105 transition duration-300">
          <img 
            src="/dedication.jpg" 
            alt="Dedication" 
            className="w-full h-80 object-cover rounded-lg"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold mt-4 text-gray-800">Dedication</h3>
            <p className="text-sm text-gray-600 mt-2">
              We pour passion into every wedding, ensuring the magic of love shines through.
            </p>
            <button className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition duration-300">See More</button>
          </div>
        </div>

        {/* Celebrate Love */}
        <div className="p-6 shadow-lg bg-white rounded-lg transform hover:scale-105 transition duration-300">
          <img 
            src="/celebrate-love.jpg" 
            alt="Celebrate Love" 
            className="w-full h-64 object-cover rounded-lg"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold mt-4 text-gray-800">Celebrate Love</h3>
            <p className="text-sm text-gray-600 mt-2">
              Creating lasting memories with beautifully curated experiences.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
