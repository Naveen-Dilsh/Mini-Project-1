import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const categoryThemes = [
  "from-emerald-400 to-emerald-600",
  "from-blue-400 to-blue-600", 
  "from-purple-400 to-purple-600",
  "from-orange-400 to-orange-600"
];

const CollectionItem = ({ category, index }) => {
  // Randomly select a theme or use a theme based on index
  const theme = categoryThemes[index % categoryThemes.length];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.2,
        type: "spring",
        stiffness: 100
      }}
      className={`relative overflow-hidden rounded-2xl shadow-lg 
        bg-gradient-to-br ${theme}
        transform transition-all duration-300
        hover:scale-105 hover:shadow-2xl`}
    >
      <Link to={"/category"+category.href} className="block">
        <div className="grid grid-cols-4 gap-2 p-10">
          {/* Left Column: Image */}
          <div className="col-span-2 flex items-center justify-center">
            <div className="w-full aspect-square bg-white/20 rounded-xl 
              flex items-center justify-center backdrop-blur-sm overflow-hidden">
              <img
                src={category.imageUrl}
                alt={category.name}
                className="w-full h-full object-cover rounded-xl 
                  transition-transform duration-300 
                  group-hover:scale-110"
              />
            </div>
          </div>

          {/* Right Columns: Details */}
          <div className="col-span-2 flex flex-col justify-center space-y-4 pl-4">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white">
                {category.name}
              </h3>
              <p className="text-white/80 text-sm">
                Explore our {category.name.toLowerCase()} collection
              </p>
            </div>

            <div className="flex items-center text-white">
              <span className="mr-2 font-medium">Shop Now</span>
              <ArrowRight size={20} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CollectionItem;