import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User,
  ShoppingBag,
  Star,
  ChevronRight
} from "lucide-react";
import UserProfile from '../components/UserProfile';
import OrdersList from '../components/OrderList';

const tabs = [
  { 
    id: "profile", 
    label: "Profile", 
    icon: User,
    gradient: "from-stone-700 to-stone-900"
  },
  { 
    id: "orders", 
    label: "Orders", 
    icon: ShoppingBag,
    gradient: "from-slate-700 to-slate-900"
  },
  { 
    id: "recommendations", 
    label: "For You", 
    icon: Star,
    gradient: "from-zinc-700 to-zinc-900"
  }
];

const UserPage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const pageVariants = {
    initial: { opacity: 0, x: "-10%" },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: "10%" }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-stone-100 to-slate-200 relative overflow-hidden py-8'>
      {/* Decorative background shapes */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-stone-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-slate-300 rounded-full blur-3xl"></div>
        <div className="absolute top-[50%] left-[50%] w-96 h-96 bg-zinc-300 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className='relative z-10 container mx-auto px-4 py-16'>
        <motion.h1 
          className='text-5xl font-extrabold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-stone-700 to-slate-900 text-center'
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        >
          Welcome Back
        </motion.h1>

        {/* Tab Navigation */}
        <div className='flex justify-center mb-2 space-x-6'>
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                flex items-center px-6 py-3 rounded-xl 
                transition-all duration-300 
                shadow-lg hover:shadow-xl
                backdrop-blur-sm
                ${activeTab === tab.id 
                  ? `bg-gradient-to-br ${tab.gradient} text-stone-100` 
                  : 'bg-white text-stone-600 hover:bg-stone-50 border border-stone-200'}
              `}
            >
              <tab.icon className='mr-2 h-5 w-5' />
              {tab.label}
              {activeTab === tab.id && (
                <ChevronRight className='ml-2 h-4 w-4 animate-pulse' />
              )}
            </motion.button>
          ))}
        </div>

        {/* Animated Content Sections */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="max-w-4xl mx-auto"
          >
            {activeTab === "profile" && (<UserProfile />)}
            {activeTab === "orders" && (<OrdersList/>)}
            {activeTab === "recommendations" && (
              <div className="bg-white/90 backdrop-blur-md rounded-xl p-8 shadow-xl border border-zinc-200">
                <h2 className="text-2xl font-bold mb-4 text-zinc-800">Recommended for You</h2>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 p-4 bg-zinc-50 rounded-lg border border-zinc-100">
                    <Star className="h-12 w-12 text-zinc-600" />
                    <div>
                      <h3 className="text-lg font-semibold text-zinc-800">Personalized Picks</h3>
                      <p className="text-zinc-600">Curated selections based on your preferences</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UserPage;