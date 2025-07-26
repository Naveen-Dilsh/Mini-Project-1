import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  MapPin,
  CreditCard,
  Shield,
  Sparkles
} from "lucide-react";
import CartItemCard from '../components/CartItemCard';
import { useCartStore } from '../stores/useCartStore';
import OrderSummary from '../components/OrderSummary';

const CartPage = () => {
  const { cart } = useCartStore();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addresses] = useState([
    {
      id: 1,
      name: "John Doe",
      street: "123 Luxury Avenue",
      city: "Beverly Hills",
      state: "CA",
      zip: "90210",
      type: "Home",
      default: true
    }
  ]);

  if (cart.length === 0) {
    return <EmptyCartView />;
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 15;
  const tax = subtotal * 0.085;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-4 space-y-4">
                {cart.map((item) => (
                  <CartItemCard key={item.id} item={item} />
                ))}
              </div>
            </div>

            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-lg shadow-md p-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  Shipping Address
                </h2>
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    onClick={() => setSelectedAddress(address)}
                    className={`relative p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedAddress?.id === address.id
                        ? 'border-gray-900 bg-gray-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex gap-3">
                      <MapPin className="w-5 h-5 text-gray-900 flex-shrink-0" />
                      <div className="flex-grow">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{address.name}</span>
                          {address.default && (
                            <span className="text-xs bg-gray-100 text-gray-900 px-2 py-1 rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm mt-1">
                          {address.street}<br />
                          {address.city}, {address.state} {address.zip}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                <button className="w-full mt-3 text-gray-900 border-2 border-gray-900 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors">
                  Add New Address
                </button>
              </div>

              <OrderSummary/>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const EmptyCartView = () => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="p-8 bg-white rounded-lg shadow-md max-w-md w-full mx-4"
    >
      <div className="text-center">
        <ShoppingCart className="mx-auto text-gray-900" size={64} />
        <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">
          Your Cart is Empty
        </h2>
        <p className="text-gray-500 mb-6">
          Discover our curated collection of luxury items waiting for you.
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-gray-900 hover:bg-black text-white rounded-lg transition-all shadow-md hover:shadow-lg"
        >
          <Sparkles className="mr-2" size={20} />
          Explore Collection
        </Link>
      </div>
    </motion.div>
  </div>
);

export default CartPage;
