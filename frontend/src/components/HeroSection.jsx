import React from 'react';
import { ShoppingCart, Star, Truck } from 'lucide-react';
import HeroImg from "../assets/E-commerce.jpg"
import {Link} from "react-router-dom"
const HeroSection = () => {
  return (
    <div className="relative w-full h-[600px] overflow-hidden flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-200">
      {/* Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute w-64 h-64 bg-blue-300 rounded-full -top-32 -left-32 transform rotate-45"></div>
        <div className="absolute w-80 h-80 bg-blue-400 rounded-full -bottom-40 -right-40 transform -rotate-45"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        {/* Text Content */}
        <div className="text-center md:text-left space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Discover Your <span className="text-blue-600">Perfect Style</span>
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Elevate your shopping experience with our curated collection of trendy and high-quality products.
          </p>
          
          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors">
              <ShoppingCart size={20} />
              Shop Now
            </button>
            <Link to="/collection">
            <button className="flex items-center gap-2 border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-full hover:bg-blue-50 transition-colors">
              <Star size={20} />
              View Collections
            </button>
            </Link>
          </div>
          
          {/* Feature Highlights */}
          <div className="flex justify-center md:justify-start gap-6 mt-8 text-gray-600">
            <div className="flex items-center gap-2">
              <Truck size={24} className="text-blue-600" />
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <Star size={24} className="text-blue-600" />
              <span>Quality Guaranteed</span>
            </div>
          </div>
        </div>
        
        {/* Hero Image */}
        <div className="hidden md:block self-end">
          <img 
            src={HeroImg}
            alt="E-commerce Hero"
            className="w-full h-[500px] object-cover rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300 mb-[-50px]"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;