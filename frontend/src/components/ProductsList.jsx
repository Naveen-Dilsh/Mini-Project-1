import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trash, 
  Star, 
  Info, 
  Edit, 
  Package, 
  ShoppingBag,
  X 
} from "lucide-react";
import { useProductStore } from "../stores/useProductStore";
import LoadingSpinner from "../components/LoadingSpinner"

const ProductsList = () => {
  const { products, toggleFeaturedProducts, deleteProduct, loading, fetchAllProducts } = useProductStore();
  const [expandedProduct, setExpandedProduct] = useState(null);

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts])
  
  // Color themes from AdminPage tabs
  const themes = {
    create: "from-emerald-400 to-emerald-600",
    products: "from-blue-400 to-blue-600",
    analytics: "from-purple-400 to-purple-600",
    settings: "from-orange-400 to-orange-600"
  };

  // Variant for product card animations
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 100
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9,
      transition: { duration: 0.2 }
    }
  };

  // Show loading spinner if products are loading
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {products?.length === 0 && (
            <h2 className='text-3xl font-semibold text-gray-300 text-center col-span-full'>
              No products found
            </h2>
          )}
          {products?.map((product) => (
            <motion.div
              key={product._id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`
                relative bg-gradient-to-br ${themes.products} 
                text-white rounded-xl shadow-xl overflow-hidden 
                transform transition-all duration-300 
                hover:scale-105 hover:shadow-2xl
              `}
            >
              {/* Product Image */}
              <div className="relative h-48 w-full">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="absolute inset-0 w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  {/* Featured Toggle */}
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleFeaturedProducts(product._id)}
                    className={`
                      p-2 rounded-full 
                      ${product.isFeatured 
                        ? "bg-yellow-400 text-gray-900" 
                        : "bg-white/20 text-white"}
                      hover:bg-yellow-400 hover:text-gray-900
                      transition-colors duration-200
                    `}
                  >
                    <Star className="h-5 w-5" />
                  </motion.button>

                  {/* Info Button */}
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setExpandedProduct(
                      expandedProduct === product._id ? null : product._id
                    )}
                    className="bg-white/20 p-2 rounded-full hover:bg-white/40 transition-colors"
                  >
                    <Info className="h-5 w-5" />
                  </motion.button>
                </div>
              </div>

              {/* Product Details */}
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold">{product.name}</h3>
                  <div className="flex items-center space-x-2">
                    <Package className="h-4 w-4" />
                    <span className="text-sm">{product.category}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold">${product.price.toFixed(2)}</div>
                  <div className="flex space-x-2">
                    {/* Edit Button */}
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      className="text-white hover:text-gray-200"
                    >
                      <Edit className="h-5 w-5" />
                    </motion.button>
                    
                    {/* Delete Button */}
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => deleteProduct(product._id)}
                      className="text-red-300 hover:text-red-100"
                    >
                      <Trash className="h-5 w-5" />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Expanded Product Details */}
              <AnimatePresence>
                {expandedProduct === product._id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="absolute inset-0 bg-black/80 p-6 flex flex-col justify-center items-center text-center"
                  >
                    {/* Close Button */}
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setExpandedProduct(null)}
                      className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
                    >
                      <X className="h-6 w-6" />
                    </motion.button>

                    <h4 className="text-2xl font-bold mb-4">Product Details</h4>
                    <p className="mb-4">{product.description || 'No description available'}</p>
                    <div className="flex items-center space-x-2">
                      <ShoppingBag className="h-6 w-6" />
                      <span>Stock: {product.stock || 'N/A'}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProductsList;