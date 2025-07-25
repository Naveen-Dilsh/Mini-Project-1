import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Leaf, ShoppingBag } from 'lucide-react';
import CollectionItem from '../components/CollectionItem';
import { useProductStore } from '../stores/useProductStore';
import LoadingSpinner from '../components/LoadingSpinner';


const categories = [
  { 
    href: "/Phone", 
    name: "Jeans", 
    imageUrl: "/bags.jpg",
    description: "Sustainable denim for conscious fashion"
  },
  { 
    href: "/LapTop", 
    name: "T-shirts", 
    imageUrl: "/suits.jpg",
    description: "Eco-friendly comfort wear"
  },
  { 
    href: "/Watch", 
    name: "Shoes", 
    imageUrl: "/tshirts.jpg",
    description: "Walk with purpose, tread lightly"
  },
  { 
    href: "/Monitor", 
    name: "Glasses", 
    imageUrl: "/shoes.jpg",
    description: "Style meets sustainability"
  },
  { 
    href: "/Phone", 
    name: "Jeans", 
    imageUrl: "/E-commerce.jpg",
    description: "Sustainable denim for conscious fashion"
  },
  { 
    href: "/LapTop", 
    name: "T-shirts", 
    imageUrl: "/E-commerce.jpg",
    description: "Eco-friendly comfort wear"
  },
  { 
    href: "/Watch", 
    name: "Shoes", 
    imageUrl: "/E-commerce.jpg",
    description: "Walk with purpose, tread lightly"
  },
];

const CollectionsPage = () => {
   const { loading } = useProductStore();
  if(loading) return <LoadingSpinner/>
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='relative min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 text-gray-900 overflow-hidden'
    >
      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        <motion.div
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className='text-center mb-16'
        >
          <div className='flex justify-center items-center mb-4'>
            <Leaf className='text-emerald-500 mr-3' size={40} />
            <h1 className='text-4xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-blue-500'>
              Sustainable Collections
            </h1>
          </div>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto flex items-center justify-center'>
            <ShoppingBag className='mr-3 text-blue-500' size={24} />
            Discover Fashion That Cares for Our Planet
            <Sparkles className='ml-3 text-emerald-500' size={24} />
          </p>
        </motion.div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {categories.map((category, index) => (
            <CollectionItem
              key={category.name} 
              category={category} 
              index={index} 
            />
          ))}
        </div>

       
      </div>
    </motion.div>
  );
};

export default CollectionsPage;