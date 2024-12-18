import React, { useState } from "react";
import toast from "react-hot-toast";
import { ShoppingCart, Heart, Star} from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import {Link} from "react-router-dom";
const categoryThemes = [
  {
    gradient: "from-emerald-400 to-emerald-600",
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    hover: "hover:bg-emerald-700"
  },
  {
    gradient: "from-blue-400 to-blue-600",
    bg: "bg-blue-50",
    text: "text-blue-600",
    hover: "hover:bg-blue-700"
  },
  {
    gradient: "from-purple-400 to-purple-600",
    bg: "bg-purple-50",
    text: "text-purple-600",
    hover: "hover:bg-purple-700"
  }
];

const ProductCard = ({ product }) => {
  const { user } = useUserStore();
  const { addToCart } =useCartStore();
  const [isFavorite, setIsFavorite] = useState(false);

  // Select a theme based on product name or index
  const selectedTheme = categoryThemes[product.name.length % categoryThemes.length];

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login to add products to cart", { id: "login" });
      return;
    } else {

      try {
        addToCart(product)
        console.log(product.name);

      } catch (error) {
        console.log("Error");
      }
    }
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast(isFavorite ? "Removed from favorites" : "Added to favorites", {
      icon: '❤️',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      }
    });
  };

  return (
    <Link to="/product-details">
      <motion.div 
      className={`relative w-full max-w-xs group ${selectedTheme.bg} 
        rounded-2xl overflow-hidden shadow-lg border border-gray-100/20
        transform transition-all duration-300 hover:scale-105`}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 10
      }}
    >
      {/* Favorite Button */}
      <button 
        onClick={handleFavorite}
        className={`absolute top-4 right-4 z-10 p-2 rounded-full 
          ${isFavorite ? 'bg-red-500 text-white' : 'bg-white/20 text-gray-300'}
          backdrop-blur-sm transition-all duration-300 hover:scale-110`}
      >
        <Heart 
          size={20} 
          fill={isFavorite ? 'currentColor' : 'none'}
          strokeWidth={isFavorite ? 0 : 1.5}
        />
      </button>

      {/* Product Image */}
      <div className='relative overflow-hidden'>
        <img 
          src={product.image} 
          alt={product.name} 
          className='w-64 h-64 object-cover transition-transform 
            duration-300 group-hover:scale-110'
        />
        <div className='absolute inset-0 bg-black opacity-10' />
      </div>

      {/* Product Details */}
      <div className='p-6 bg-white/5 backdrop-blur-sm'>
        <div className='flex justify-between items-center mb-2'>
          <h3 className={`text-xl font-bold ${selectedTheme.text}`}>
            {product.name}
          </h3>
          <div className='flex items-center text-yellow-400'>
            <Star size={16} fill='currentColor' />
            <span className='ml-1 text-sm text-gray-300'>
              {product.rating || 4.5}
            </span>
          </div>
        </div>

        <div className='flex justify-between items-center mt-4'>
          <span className={`text-xl font-bold ${selectedTheme.text}`}>
            ${product.price}
          </span>
          <button
            onClick={handleAddToCart}
            className={`px-4 py-2 rounded-lg ${selectedTheme.gradient} 
              text-white ${selectedTheme.hover} 
              flex items-center transition-all duration-300 
              transform hover:scale-105`}
          >
            <ShoppingCart size={18} className='mr-2' />
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
    </Link>
  );
};

export default ProductCard;