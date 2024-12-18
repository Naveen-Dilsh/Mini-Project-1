import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, 
  Truck, 
  Shield, 
  Star, 
  Minus, 
  Plus, 
  Zap 
} from 'lucide-react';

const ProductDetails = ({ 
  product = {
    name: "Pro Performance Running Shoes",
    brand: "SwiftStride Athletics",
    price: 149.99,
    description: "Engineered for peak performance, these lightweight running shoes provide ultimate comfort and support for athletes of all levels.",
    features: [
      "Breathable Mesh Upper",
      "Advanced Cushioning",
      "Lightweight Design",
      "Flexible Sole"
    ],
    rating: 4.7,
    reviews: 245,
    colors: ['Bright White', 'Ocean Blue', 'Neon Green'],
    sizes: [6, 7, 8, 9, 10, 11, 12],
    imageUrl: "/bags.jpg"
  }
}) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);

  const getColorClass = (color) => {
    const colorMap = {
      'Bright White': 'bg-white border-gray-200',
      'Ocean Blue': 'bg-blue-500',
      'Neon Green': 'bg-green-500'
    };
    return colorMap[color] || 'bg-gray-300';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 p-6"
      >
        {/* Product Image Section */}
        <motion.div 
          className="relative flex items-center justify-center bg-gray-100 rounded-xl p-8"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        >
          <motion.img 
            src={product.imageUrl} 
            alt={product.name}
            className="w-full max-h-[500px] object-contain hover:scale-105 transition-transform duration-300"
          />
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="absolute top-4 right-4 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center"
          >
            <Zap className="mr-1" size={16} /> Limited Edition
          </motion.div>
        </motion.div>

        {/* Product Details Section */}
        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          className="space-y-6 p-2"
        >
          <div>
            <motion.h3 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sm uppercase tracking-wide text-blue-600"
            >
              {product.brand}
            </motion.h3>
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-3xl font-bold text-gray-800 mt-2"
            >
              {product.name}
            </motion.h1>

            {/* Rating and Price */}
            <div className="mt-4 flex justify-between items-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={20} 
                    fill={i < Math.floor(product.rating) ? '#FFD700' : 'none'}
                    className="text-yellow-400 mr-1"
                  />
                ))}
                <span className="ml-2 text-gray-600">
                  ({product.rating}) • {product.reviews} Reviews
                </span>
              </div>
              <div className="text-3xl font-bold text-blue-600">
                ${product.price.toFixed(2)}
              </div>
            </div>

            {/* Description */}
            <p className="mt-4 text-gray-600">
              {product.description}
            </p>

            {/* Features */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              {product.features.map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center bg-blue-50 p-3 rounded-lg"
                >
                  <Shield className="mr-2 text-blue-500" size={20} />
                  <span className="text-sm text-gray-700">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* Color Selection */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
              <div className="flex space-x-3">
                {product.colors.map(color => (
                  <motion.button
                    key={color}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 ${
                      selectedColor === color 
                        ? 'ring-2 ring-blue-500' 
                        : 'border-transparent'
                    } ${getColorClass(color)}`}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <motion.button
                    key={size}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                      selectedSize === size 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {size}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Quantity and Cart */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="col-span-1 flex items-center bg-gray-100 rounded-lg">
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-gray-600 hover:text-blue-600"
                >
                  <Minus size={16} />
                </motion.button>
                <span className="px-4 text-gray-800">{quantity}</span>
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-gray-600 hover:text-blue-600"
                >
                  <Plus size={16} />
                </motion.button>
              </div>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="col-span-2 bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center hover:bg-blue-700 transition"
              >
                <ShoppingCart className="mr-2" size={20} /> Add to Cart
              </motion.button>
            </div>

            {/* Shipping Info */}
            <div className="mt-6 flex items-center text-gray-600">
              <Truck className="mr-2 text-blue-500" size={20} />
              <span className="text-sm">Free shipping • Easy 30-day returns</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProductDetails;