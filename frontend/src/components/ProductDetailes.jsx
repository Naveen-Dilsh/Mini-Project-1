import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, Share2 } from 'lucide-react';
import { useCartStore } from '../stores/useCartStore';
import { useUserStore } from '../stores/useUserStore';
import toast from 'react-hot-toast';
import axios from '../lib/axios';
import ProductGallery from './ProductGallery';

const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useUserStore();
  const { addToCart } = useCartStore();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');

  const sizes = ['46R', '48R', '50R', '52R', '54R'];

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`/products/${id}`);
        setProduct(response.data.product);
      } catch (error) {
        toast.error('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please login to add products to cart");
      return;
    }

    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }

    try {
      addToCart({...product, selectedSize});
      toast.success("Added to cart successfully");
    } catch (error) {
      toast.error("Failed to add to cart");
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-300">Crafting Your Experience...</div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center text-gray-300">Exclusive Item Not Found</div>;

  return (
    <div className="bg-neutral-50 min-h-screen flex items-center justify-center py-10 px-4 md:py-20">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 bg-white shadow-2xl rounded-3xl overflow-hidden p-6 md:p-0">
          {/* Gallery Section */}
          <div className="w-full aspect-square">
            <ProductGallery images={product.images} name={product.name} />
          </div>

          {/* Product Information */}
          <div className="p-6 md:p-12 space-y-6 relative">
            {/* Elegant Branding Overlay */}
            <div className="absolute top-4 right-4 flex space-x-4">
              <button className="text-neutral-400 hover:text-neutral-600 transition-colors">
                <Heart className="w-6 h-6 stroke-current" />
              </button>
              <button className="text-neutral-400 hover:text-neutral-600 transition-colors">
                <Share2 className="w-6 h-6 stroke-current" />
              </button>
            </div>

            {/* Product Title & Price */}
            <div>
              <h1 className="text-3xl md:text-4xl font-serif text-neutral-900 mb-2 md:mb-3">{product.name}</h1>
              <p className="text-2xl md:text-3xl font-light text-neutral-700">€{product.price?.toFixed(2)}</p>
            </div>

            {/* Product Specifications */}
            <div className="border-t border-b py-4 md:py-6 border-neutral-200">
              <div className="grid grid-cols-2 gap-2 md:gap-4">
                <div>
                  <h3 className="text-xs md:text-sm uppercase tracking-wider text-neutral-400 mb-1 md:mb-2">Fabric</h3>
                  <p className="text-neutral-700">Premium Wool Blend</p>
                </div>
                <div>
                  <h3 className="text-xs md:text-sm uppercase tracking-wider text-neutral-400 mb-1 md:mb-2">Color</h3>
                  <p className="text-neutral-700">Italian Craftsmanship</p>
                </div>
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-xs md:text-sm uppercase tracking-wider text-neutral-400 mb-3 md:mb-4">Select Size</h3>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 border rounded-lg text-xs md:text-sm transition-all ${
                      selectedSize === size
                        ? 'border-neutral-900 bg-neutral-900 text-white'
                        : 'border-neutral-200 text-neutral-600 hover:border-neutral-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <p className="text-xs text-neutral-400 mt-2 text-center">Need help with sizing?</p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button 
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className={`w-full py-3 md:py-4 uppercase tracking-wider rounded-full transition-colors ${
                  selectedSize
                    ? 'bg-neutral-900 text-white hover:bg-neutral-700'
                    : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                }`}
              >
                Add to Atelier Collection
              </button>
              <p className="text-center text-neutral-500 text-xs md:text-sm">Custom Tailoring Available</p>
            </div>

            {/* Guarantee & Authenticity */}
            <div className="text-center text-neutral-400 text-xs space-y-2">
              <p>Exclusively Crafted • Lifetime Warranty</p>
              <p>Authenticity Guaranteed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
