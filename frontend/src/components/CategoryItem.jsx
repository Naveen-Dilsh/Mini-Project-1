import React from 'react';
import { motion } from "framer-motion";
import {
    ChevronRight,
    Layers,
    Sparkles
} from "lucide-react";

const CategoryItem = ({ category, onCategorySelect }) => {
    return (
        <motion.div
            className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-xl aspect-[4/3] w-full"
            whileHover={{
                scale: 1.05,
                boxShadow: "0 25px 50px -12px rgba(134, 99, 255, 0.25)"
            }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 20
            }}
            onClick={() => onCategorySelect && onCategorySelect(category)}
        >
            {/* Background Image Container */}
            <div className="absolute inset-0 overflow-hidden">
                <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="w-full h-full object-cover absolute top-0 left-0 
                    transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                />
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-200/70 to-blue-500/70 mix-blend-multiply" />

            {/* Content Layer */}
            <div className="relative z-20 flex flex-col justify-end h-full p-4 sm:p-6">
                {/* Animated Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center mb-2 sm:mb-4 space-x-2"
                >
                    <Layers className="text-blue-200" size={20} />
                    <span className="text-white/80 text-xs sm:text-sm font-medium">
                        {category.type || 'Collection'}
                    </span>
                </motion.div>

                {/* Category Title */}
                <div className="relative">
                    <motion.h3
                        className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white mb-2 sm:mb-3 flex items-center"
                        initial={{ opacity: 0, x: -20 }}
                        whileHover={{ x: 0 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        {category.name}
                        <Sparkles
                            className="ml-2 sm:ml-3 text-yellow-300 animate-pulse"
                            size={24} 
                        />
                    </motion.h3>

                    {/* Explore Button */}
                    <motion.div
                        whileHover={{ x: 10 }}
                        className="flex items-center text-white/90 hover:text-white group"
                    >
                        <span className="mr-2 text-sm sm:text-lg">Explore Collection</span>
                        <ChevronRight
                            className="group-hover:translate-x-1 transition-transform"
                            size={20} 
                        />
                    </motion.div>
                </div>
            </div>

            {/* Hover Effect Layer */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
        </motion.div>
    );
};

export default CategoryItem;