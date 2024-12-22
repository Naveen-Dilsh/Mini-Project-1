import React, { useState, useEffect } from 'react';
import { CheckCircle2, ArrowRight, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useCartStore } from '../stores/useCartStore';
import axios from '../lib/axios';

const buttonVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 }
};

const PurchaseSuccessPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const {clearCart} = useCartStore();
  const[error,setError] =useState(null);
  
  useEffect(() => {
    const handleCheckoutSuccess = async (sessionId) =>{
        try {
            await axios.post("/payment/checkout-success",{
                sessionId,
            });
            clearCart();
        } catch (error) {
            console.log(error)
        }
        finally{
            setIsLoading(false)
        }
    };

    const sessionId = new URLSearchParams(window.location.search).get("session_id");
		if (sessionId) {
			handleCheckoutSuccess(sessionId);
		} else {
			setIsLoading(false);
			setError("No session ID found in the URL");
		}
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [clearCart]);
  
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-sky-600 text-xl">Processing your order...</div>
      </div>
    );
  }

  return (
    <motion.div 
      className="min-h-screen bg-gray-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-md w-full">
        <motion.div 
          className="bg-white rounded-2xl shadow-xl p-8 space-y-6"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Success Icon */}
          <div className="flex justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.4 
              }}
            >
              <CheckCircle2 className="w-16 h-16 text-emerald-500" />
            </motion.div>
          </div>

          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-gray-800">
              Purchase Successful!
            </h1>
            <p className="text-gray-600">
              Thank you for your order. We're processing it now.
            </p>
            <p className="text-sm text-emerald-600 font-medium">
              Order confirmation has been sent to your email.
            </p>
          </div>

          {/* Order Details */}
          <div className="bg-gray-50 rounded-xl p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Order number</span>
              <span className="font-semibold text-gray-800">#ORD-2024-123</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Expected delivery</span>
              <span className="font-semibold text-gray-800">3-5 business days</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <motion.button
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className="w-full bg-emerald-500 text-white py-3 rounded-lg flex items-center justify-center space-x-2 font-medium hover:bg-emerald-600 transition-colors"
            >
              <Heart className="w-5 h-5" />
              <span>Thanks for shopping with us!</span>
            </motion.button>

            <motion.button
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              onClick={() => window.location.href = '/'}
              className="w-full bg-gray-100 text-gray-800 py-3 rounded-lg flex items-center justify-center space-x-2 font-medium hover:bg-gray-200 transition-colors"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PurchaseSuccessPage;