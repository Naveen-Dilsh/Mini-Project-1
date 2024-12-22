// CategoryPage.jsx
import React, { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";
import { useParams, Link } from "react-router-dom";
import { Crown, Filter } from "lucide-react";
import ProductCard from "../components/ProductCard"
import LoadingSpinner from "../components/LoadingSpinner";

const CategoryPage = () => {
  const { fetchFeaturedProductsByCategory, products, loading } = useProductStore();
  const { category } = useParams();
  console.log(products);
  useEffect(() => {
    if (category) {
      fetchFeaturedProductsByCategory(category);
    }
  }, [fetchFeaturedProductsByCategory, category]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F9FA] to-[#E5E5E5] relative pt-10">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-5" />
      <div className="absolute top-0 left-0 right-0 h-72 bg-gradient-to-b from-white via-gray-50 to-transparent" />

      <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Category Header */}
        <div className="text-center mb-1">
          <div className="flex justify-center mb-1">
            <Crown className="w-12 h-12 text-gray-800" strokeWidth={1.2} />
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-serif text-gray-900 mb-4">
            {category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Products'}
          </h1>
          
          <div className="w-24 h-0.5 bg-gray-200 mx-auto mb-4" />
          
          <p className="text-gray-600 max-w-2xl mx-auto font-light">
            Discover our exquisite collection of handcrafted wedding attire,
            where timeless elegance meets contemporary sophistication
          </p>

          <div className="mt-8 flex justify-center">
            <button 
              className="px-6 py-2 bg-white border border-gray-200 rounded-full
              hover:bg-gray-50 transition-all duration-300 ease-in-out
              flex items-center space-x-2 text-gray-700"
            >
              <Filter className="w-4 h-4" />
              <span className="text-sm">Refine Selection</span>
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {!products || products.length === 0 ? (
            <div className="text-center col-span-full py-16">
              <h2 className="text-2xl font-serif text-gray-400 mb-4">
                No Products Available
              </h2>
              <p className="text-gray-500 font-light">
                Please explore our other exclusive collections
              </p>
            </div>
          ) : (
            products.map((product) => (
              <div key={product._id}>
                <ProductCard product={product} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;