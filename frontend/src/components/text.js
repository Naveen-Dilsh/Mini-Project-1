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
      <Link to={category.href} className="block p-6">
        <div className="flex flex-col items-start space-y-4">
          {/* Optional: Add dynamic icon based on category */}
          <div className="w-16 h-16 bg-white/20 rounded-full 
            flex items-center justify-center backdrop-blur-sm">
            <img 
              src={category.imageUrl} 
              alt={category.name} 
              className="w- h-10 object-cover rounded-full"
            />
          </div>
          
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
      </Link>
    </motion.div>
  );
};

export default CollectionItem;

