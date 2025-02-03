import React from "react";

const WeddingShowcase = () => {
  return (
    <div className="bg-[#F8F5F0] py-12 px-6 md:px-16 lg:px-32 text-center">
      <h2 className="text-gray-700 text-lg uppercase tracking-wide mb-8">
        Our Wedding Suit Offerings
      </h2>
      <div className="grid md:grid-cols-3 gap-8 items-center">
        <div className="space-y-4">
          <img
            src="/Groom 1.jpg"
            alt="Unique Style"
            className="rounded-lg shadow-md"
          />
          <h3 className="text-lg font-semibold text-gray-800">Unique Style</h3>
          <p className="text-gray-600 text-sm px-4">
            Our wedding suits blend timeless elegance with modern flair, for a
            look that stands out.
          </p>
        </div>
        <div className="space-y-4">
          <img
            src="/show 1.jpg"
            alt="Expert Tailoring"
            className="rounded-lg shadow-md"
          />
          <h3 className="text-lg font-semibold text-gray-800">Expert Tailoring</h3>
          <p className="text-gray-600 text-sm px-4">
            With meticulous attention to detail, our tailors craft suits that fit
            you perfectly.
          </p>
          <button className="bg-gray-700 text-white px-6 py-2 rounded-lg text-sm hover:bg-gray-900 transition">
            Schedule Consultation
          </button>
        </div>
        <div className="space-y-4">
          <img
            src="/Groom 3.jpg"
            alt="Celebrate Your Love"
            className="rounded-lg shadow-md"
          />
          <h3 className="text-lg font-semibold text-gray-800">Celebrate Your Love</h3>
          <p className="text-gray-600 text-sm px-4">
            Let our wedding suits be the canvas for your love story on your
            special day.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeddingShowcase;