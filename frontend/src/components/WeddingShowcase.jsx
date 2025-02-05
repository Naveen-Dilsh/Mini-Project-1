import React from "react";

const GallerySection = () => {
  return (
    <section className="max-w-7xl mx-auto py-16 px-6 text-center bg-white">
      <h2 className="text-3xl text-gray-800 uppercase tracking-wide mb-12 font-bold">Discover Our Vision</h2>
      <div className="grid md:grid-cols-3 gap-12 items-center">
        {/* Unique Vision */}
        <div className="relative group overflow-hidden rounded-xl shadow-xl">
          <img 
            src="/Groom 2.jpg" 
            alt="Unique Vision" 
            className="w-full h-80 object-cover transform group-hover:scale-110 transition duration-500"
          />
          <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 p-6 text-white">
            <h3 className="text-lg font-semibold">Unique Vision</h3>
            <p className="text-sm mt-2">Every detail is carefully crafted to create an unforgettable experience.</p>
          </div>
        </div>

        {/* Dedication (Main Image) */}
        <div className="relative group overflow-hidden rounded-xl shadow-xl">
          <img 
            src="/Groom 1.jpg" 
            alt="Dedication" 
            className="w-full h-96 object-cover transform group-hover:scale-110 transition duration-500"
          />
          <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 p-6 text-white">
            <h3 className="text-lg font-semibold">Dedication</h3>
            <p className="text-sm mt-2">We pour passion into every wedding, ensuring the magic of love shines through.</p>
            <button className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg text-sm font-semibold hover:bg-green-600 transition duration-300">See More</button>
          </div>
        </div>

        {/* Celebrate Love */}
        <div className="relative group overflow-hidden rounded-xl shadow-xl">
          <img 
            src="/Groom 3.jpg" 
            alt="Celebrate Love" 
            className="w-full h-80 object-cover transform group-hover:scale-110 transition duration-500"
          />
          <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 p-6 text-white">
            <h3 className="text-lg font-semibold">Celebrate Love</h3>
            <p className="text-sm mt-2">Creating lasting memories with beautifully curated experiences.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;