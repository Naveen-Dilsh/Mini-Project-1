// ProductCard.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { user } = useUserStore();
  const { addToCart } = useCartStore();

  // Get primary and secondary images from the images array
  const primaryImage = product.images?.[0] || '';
  const secondaryImage = product.images?.[1] || '';

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to add products to cart");
      return;
    }
    
    try {
      addToCart(product);
      toast.success("Added to cart successfully");
      console.log(product)
    } catch (error) {
      toast.error("Failed to add to cart");
      console.error("Error adding to cart:", error);
    }
  };

  const handleFavorite = (e) => {
    e.preventDefault();
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
    <Link to={`/product/${product._id}`} className="block group">
      <div 
        className="relative w-full overflow-hidden bg-white rounded-lg shadow-lg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Images Container */}
        <div className="relative aspect-[3/4] overflow-hidden">
          {primaryImage && (
            <img 
              src={primaryImage}
              alt={product.name}
              className={`absolute inset-0 w-full h-full object-contain transition-transform duration-700 ease-out
                ${isHovered ? 'scale-110' : 'scale-100'}`}
            />
          )}
          {secondaryImage && (
            <img 
              src={secondaryImage}
              alt={`${product.name} alternate view`}
              className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-700 ease-out
                ${isHovered ? 'opacity-100' : 'opacity-0'}`}
            />
          )}
          
          {/* Overlay */}
          <div 
            className={`absolute inset-0 transition-opacity duration-500
              ${isHovered ? 'opacity-20' : 'opacity-0'}`} 
          />

          {/* Favorite Button */}
          <button 
            onClick={handleFavorite}
            className={`absolute top-4 right-4 z-10 p-2 rounded-full 
              ${isFavorite ? 'bg-red-500 text-white' : 'bg-white/80'} 
              transition-all duration-300 hover:scale-110`}
          >
            <Heart 
              size={20} 
              fill={isFavorite ? 'currentColor' : 'none'}
              strokeWidth={isFavorite ? 0 : 1.5}
            />
          </button>
        </div>

        {/* Product Info */}
        <div className="p-4 bg-white">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-medium text-gray-900 line-clamp-2">
              {product.name}
            </h3>
            <div className="flex items-center">
              <Star size={16} className="text-yellow-400" fill="currentColor" />
              <span className="ml-1 text-sm text-gray-600">
                {product.rating?.toFixed(1) || '4.5'}
              </span>
            </div>
          </div>

          <div className="mt-2 flex justify-between items-center">
            <span className="text-xl font-semibold text-gray-900">
              €{product.price?.toFixed(2)}
            </span>
            <button
              onClick={handleAddToCart}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg 
                transition-all duration-300 hover:bg-gray-800 flex items-center"
            >
              <ShoppingCart size={18} className="mr-2" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;