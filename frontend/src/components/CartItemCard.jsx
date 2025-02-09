import React from 'react';
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { useCartStore } from '../stores/useCartStore';

const CartItemCard = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCartStore();
  console.log(item);
  // Get the first image from the array or fallback to a placeholder
  const displayImage = Array.isArray(item.images) ? item.images[0] : item.images;

  return (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="mb-2"
    >
      <div className="flex items-center bg-gradient-to-r from-slate-50 to-white rounded-lg p-4 shadow-md border border-slate-100">
        <div className="relative group">
          <img
            src={displayImage}
            alt={item.name}
            className="w-24 h-24 object-contain rounded-md shadow-sm transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 rounded-md bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="flex-grow ml-4">
          <h3 className="font-semibold text-lg text-slate-800">{item.name}</h3>
          <p className="text-slate-500 mt-1 text-sm">
            Size: <span className="text-slate-700">{item.size}</span> | 
            Color: <span className="text-slate-700">{item.color}</span>
          </p>
          
          <div className="flex items-center mt-2">
            <button
              onClick={() => updateQuantity(item._id, item.quantity - 1)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-600 w-6 h-6 flex items-center justify-center rounded-l-md transition-colors duration-200 text-sm"
            >
              -
            </button>
            <span className="bg-white px-4 py-1 border-y border-slate-100 text-slate-800 text-sm">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item._id, item.quantity + 1)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-600 w-6 h-6 flex items-center justify-center rounded-r-md transition-colors duration-200 text-sm"
            >
              +
            </button>
          </div>
        </div>

        <div className="text-right flex flex-col items-end">
          <p className="text-lg font-semibold text-slate-800">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
          <button
            onClick={() => removeFromCart(item._id)}
            className="mt-2 text-slate-400 hover:text-red-500 transition-colors duration-200"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItemCard;
