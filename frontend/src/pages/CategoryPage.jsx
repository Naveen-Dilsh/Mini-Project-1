import React, { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Tag, Filter, ArrowUpRight } from "lucide-react";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";

const categoryThemes = [
  {
    gradient: "from-emerald-400 to-emerald-600",
    icon: "text-emerald-500",
    bg: "bg-emerald-50"
  },
  {
    gradient: "from-blue-400 to-blue-600",
    icon: "text-blue-500",
    bg: "bg-blue-50"
  },
  {
    gradient: "from-purple-400 to-purple-600",
    icon: "text-purple-500",
    bg: "bg-purple-50"
  },
  {
    gradient: "from-orange-400 to-orange-600",
    icon: "text-orange-500",
    bg: "bg-orange-50"
  }
];

const CategoryPage = () => {
  const { fetchFeaturedProductsByCategory, products,loading } = useProductStore();
  const { category } = useParams();

  // Select a theme based on category name
  const selectedTheme = categoryThemes[
    category.length % categoryThemes.length
  ];

  useEffect(() => {
    fetchFeaturedProductsByCategory(category);
  }, [fetchFeaturedProductsByCategory, category]);
  if(loading) return <LoadingSpinner/>
  return (
    <div className={`min-h-screen ${selectedTheme.bg} bg-opacity-50 relative`}>
      {/* Decorative Background Gradient */}
      <div 
        className={`absolute top-0 left-0 right-0 h-64 bg-gradient-to-br ${selectedTheme.gradient} opacity-10`}
      />

      <div className='relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        {/* Category Header */}
        <motion.div 
          className='flex justify-between items-center mb-12'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className={`text-4xl sm:text-5xl font-bold ${selectedTheme.icon} flex items-center`}
          >
            <Tag className="mr-4 w-12 h-12" strokeWidth={1.5} />
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </motion.h1>

          <div className="flex items-center space-x-4">
            <button 
              className={`p-3 rounded-full ${selectedTheme.bg} hover:${selectedTheme.gradient} 
              transition-all duration-300 ease-in-out transform hover:scale-105`}
            >
              <Filter className={selectedTheme.icon} />
            </button>
          </div>
        </motion.div>

        {/* Products Grid */}
        <motion.div 
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {products?.length === 0 && (
            <motion.div 
              className='text-center col-span-full flex flex-col items-center'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h2 className='text-3xl font-semibold text-gray-300 mb-4'>
                No products found
              </h2>
              <p className='text-gray-500 flex items-center'>
                Explore other categories <ArrowUpRight className="ml-2" />
              </p>
            </motion.div>
          )}

          {products?.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100 
              }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CategoryPage;