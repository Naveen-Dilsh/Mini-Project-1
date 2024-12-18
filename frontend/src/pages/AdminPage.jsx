import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart, 
  PlusCircle, 
  ShoppingBasket, 
  ChevronRight,
  Settings,
  User
} from "lucide-react";

import CreateProduct from "../components/CreateProduct"
import ProductsList from '../components/ProductsList';
import { useProductStore } from '../stores/useProductStore';

// Define tabs with icons
const tabs = [
  { 
    id: "create", 
    label: "Create Product", 
    icon: PlusCircle,
    gradient: "from-emerald-400 to-emerald-600"
  },
  { 
    id: "products", 
    label: "Products", 
    icon: ShoppingBasket,
    gradient: "from-blue-400 to-blue-600"
  },
  { 
    id: "analytics", 
    label: "Analytics", 
    icon: BarChart,
    gradient: "from-purple-400 to-purple-600"
  },
  { 
    id: "settings", 
    label: "Settings", 
    icon: Settings,
    gradient: "from-orange-400 to-orange-600"
  }
];

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("create");
  const {fetchAllProducts} = useProductStore()

  useEffect(() => {
		fetchAllProducts();
	}, [fetchAllProducts]);

  // Variant for page transitions
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
    <div className='min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 relative overflow-hidden'>
      {/* Decorative background shapes */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-purple-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
      </div>

      <div className='relative z-10 container mx-auto px-4 py-16'>
        <motion.h1 
          className='text-5xl font-extrabold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 text-center'
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        >
          Admin Dashboard
        </motion.h1>

        {/* Tab Navigation */}
        <div className='flex justify-center mb-12 space-x-4'>
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                flex items-center px-5 py-3 rounded-xl 
                transition-all duration-300 
                shadow-lg hover:shadow-xl
                ${activeTab === tab.id 
                  ? `bg-gradient-to-br ${tab.gradient} text-white` 
                  : 'bg-white/70 text-gray-600 hover:bg-white/90'}
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
          >
            {activeTab === "create" && <CreateProduct/>}
            {activeTab === "products" && <ProductsList/>}
            {activeTab === "analytics" && (
              <div className="bg-white/70 backdrop-blur-md rounded-xl p-8 shadow-xl">
                <h2 className="text-2xl font-bold mb-4 text-blue-700">Analytics Dashboard</h2>
                <p>Detailed analytics coming soon...</p>
              </div>
            )}
            {activeTab === "settings" && (
              <div className="bg-white/70 backdrop-blur-md rounded-xl p-8 shadow-xl">
                <h2 className="text-2xl font-bold mb-4 text-orange-700">Settings</h2>
                <p>Configuration options coming soon...</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminPage;