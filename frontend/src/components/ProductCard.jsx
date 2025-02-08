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
      console.log(product);
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
              className={`absolute inset-0 w-full h-full object-contain transition-transform duration-700 ease-in-out
                ${isHovered ? '-translate-x-full opacity-0' : 'translate-x-0 opacity-100'}`}
            />
          )}
         
          {secondaryImage && (
            <img 
              src={secondaryImage}
              alt={`${product.name} alternate view`}
              className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out
                ${isHovered ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
            />
          )}
           {secondaryImage && (
            <div className={`absolute inset-0 w-full h-full flex items-center justify-center text-white text-lg font-extrabold tracking-wide leading-relaxed italic uppercase transition-opacity duration-700 ease-in-out ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
              {product.color}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4 bg-white">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-small font-medium text-gray-900 line-clamp-2 text-neutral-500 leading-relaxed italic">
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
