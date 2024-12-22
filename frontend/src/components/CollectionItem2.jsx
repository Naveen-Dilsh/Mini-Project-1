import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CollectionItem2 = ({ image, title, price, categories ,mainCategory}) => {
  return (
    <React.Fragment>
      {/* Image Column */}
      <div className="col-span-1 md:col-span-2 lg:col-span-1">
        <div className="relative group overflow-hidden rounded-lg">
          <img
            src={image}
            alt={title}
            className="w-full h-[400px] md:h-[400px] lg:h-[600px] object-contain object-center transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </div>

      {/* Content Column */}
      <div className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col justify-center space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl lg:text-3xl font-light text-gray-800">{title}</h2>
          <p className="text-lg text-gray-600">{price}</p>

          <Link to={"/category"+mainCategory} className="block">
          <button className="w-full px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-all duration-300">
            START DESIGNING
          </button>
          </Link>
        </div>

        <div className="space-y-2">
          {categories.map((category, idx) => (
            <div 
              key={idx} 
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 cursor-pointer group transition-all duration-200"
            >
              <ChevronRight 
                className="w-4 h-4 text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" 
              />
              <span className="text-sm lg:text-base group-hover:translate-x-1 transition-transform duration-200">
                {category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default CollectionItem2;