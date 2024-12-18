import React from 'react';
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
import CartItemCard from '../components/CartItemCard';
import { useCartStore } from '../stores/useCartStore';
import OrderSummary from '../components/OrderSummary';



const CartPage = () => {
    const { cart } = useCartStore();

  if (cart.length === 0) {
    return <EmptyCartView />;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow-xl rounded-2xl overflow-hidden"
        >
          <div className="p-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white flex items-center">
            <ShoppingCart className="mr-4" size={32} />
            <h1 className="text-2xl font-bold">Your Shopping Cart</h1>
          </div>

          <div className="grid md:grid-cols-3 gap-8 p-8">
            {/* Cart Items Column */}
            <div className="md:col-span-2 space-y-6">
              {cart.map((item) => (
                <CartItemCard key={item._id} item={item} />
              ))}
            </div>

            {/* Order Summery */}
            <OrderSummary/>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const EmptyCartView = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center">
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="p-8 bg-white rounded-2xl shadow-xl"
    >
      <ShoppingCart className="mx-auto mb-6 text-gray-300" size={100} />
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        Your Cart is Empty
      </h2>
      <p className="text-gray-500 mb-6">
        Looks like you haven't added any items to your cart yet.
      </p>
      <Link
        to="/"
        className="inline-flex items-center bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition"
      >
        <Sparkles className="mr-2" />
        Start Shopping
      </Link>
    </motion.div>
  </div>
);

export default CartPage;