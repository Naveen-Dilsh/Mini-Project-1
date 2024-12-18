import React from 'react'
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ShoppingCart, 
  Trash2, 
  Heart, 
  Tag, 
  Truck, 
  CirclePercent,
  Sparkles
} from "lucide-react";
import { useCartStore } from '../stores/useCartStore';

const CartItemCard = ({item}) => {
    const {updateQuantity,removeFromCart} =useCartStore();
  return (
    <div>
         <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center bg-gray-100 rounded-lg p-4 shadow-sm"
                >
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-24 h-24 object-cover rounded-md mr-6"
                  />
                  <div className="flex-grow">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-gray-500">Size: {item.size} | Color: {item.color}</p>
                    <div className="flex items-center mt-2">
                      <button 
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="bg-gray-200 px-2 rounded-l"
                      >
                        -
                      </button>
                      <span className="bg-gray-100 px-4 py-1">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="bg-gray-200 px-2 rounded-r"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                    <button 
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-500 hover:text-red-700 mt-2"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </motion.div>
    </div>
  )
}

export default CartItemCard