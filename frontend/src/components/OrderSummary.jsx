import React from 'react';
import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import { Link } from "react-router-dom";
import { 
  ShoppingCart, 
  CreditCard, 
  Percent, 
  TagIcon, 
  CheckCircle2, 
  ArrowRight 
} from "lucide-react";



const OrderSummary = () => {
  const { total, subtotal, coupon, isCouponApplied, cart } = useCartStore();
  const savings = subtotal - total;
  const formattedSubtotal = subtotal.toFixed(2);
  const formattedTotal = total.toFixed(2);
  const formattedSavings = savings.toFixed(2);

  const handlePayment = async () => {
    
  };

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 space-y-6 max-w-md mx-auto ring-1 ring-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-200 pb-4">
        <div className="flex items-center space-x-3">
          <ShoppingCart className="text-sky-600" size={24} />
          <h2 className="text-2xl font-semibold text-gray-800">Order Summary</h2>
        </div>
        <div className="bg-sky-50 px-3 py-1 rounded-full">
          <span className="text-sky-600 text-sm font-medium">
            {cart.length} Items
          </span>
        </div>
      </div>

      {/* Order Details */}
      <div className="space-y-4 bg-gray-50 rounded-xl p-4">
        {/* Original Price */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <CreditCard className="text-gray-500" size={18} />
            <span className="text-gray-600">Original Price</span>
          </div>
          <span className="text-gray-800 font-semibold">${formattedSubtotal}</span>
        </div>

        {/* Savings */}
        {savings > 0 && (
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Percent className="text-emerald-600" size={18} />
              <span className="text-emerald-700">Total Savings</span>
            </div>
            <span className="text-emerald-700 font-semibold">
              -${formattedSavings}
            </span>
          </div>
        )}

        {/* Coupon */}
        {coupon && isCouponApplied && (
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <TagIcon className="text-violet-600" size={18} />
              <span className="text-violet-700">
                Coupon ({coupon.code})
              </span>
            </div>
            <span className="text-violet-700 font-semibold">
              -{coupon.discountPercentage}%
            </span>
          </div>
        )}

        {/* Total */}
        <div className="border-t border-gray-200 pt-4 mt-2 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <CheckCircle2 className="text-sky-600" size={20} />
            <span className="text-gray-800 font-bold">Total</span>
          </div>
          <span className="text-sky-700 text-xl font-bold">
            ${formattedTotal}
          </span>
        </div>
      </div>

      {/* Checkout Button */}
      <motion.button
        className="w-full bg-sky-500 text-white py-3 rounded-lg flex items-center justify-center space-x-3 
        hover:bg-sky-600 transition-all duration-300 ease-in-out 
        shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handlePayment}
      >
        <span className="font-semibold">Proceed to Checkout</span>
        <ArrowRight size={20} />
      </motion.button>

      {/* Continue Shopping Link */}
      <div className="text-center">
        <Link
          to="/"
          className="text-gray-500 hover:text-sky-600 
          transition-colors flex items-center justify-center space-x-2 text-sm"
        >
          <span>Continue Shopping</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </motion.div>
  );
};

export default OrderSummary;