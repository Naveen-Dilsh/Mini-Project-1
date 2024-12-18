import React, { useState } from 'react';
import { Package, DollarSign, AlignLeft, List, ImagePlus, Loader, Check } from 'lucide-react';
import { useProductStore } from '../stores/useProductStore';

const CreateProduct = () => {
    const { createProducts, loading } = useProductStore();
    
    // Feature mapping based on category
    const featuresByCategory = {
        'LapTop': [
            "High-Performance Processor",
            "Full HD Display", 
            "Lightweight Design", 
            "Long Battery Life",
            "Advanced Cooling System"
        ],
        'Phone': [
            "5G Connectivity",
            "Multiple Camera Lenses", 
            "OLED Display", 
            "AI-Powered Photography",
            "Fast Charging"
        ],
        'Watch': [
            "Heart Rate Monitoring",
            "GPS Tracking", 
            "Waterproof Design", 
            "Long Battery Life",
            "Sleep Tracking"
        ],
        'Monitor': [
            "4K Resolution",
            "Ultra-Wide Screen", 
            "High Refresh Rate", 
            "HDR Support",
            "Ergonomic Stand"
        ]
    };

    const [productData, setProductData] = useState({
        name: '',
        price: '',
        description: '',
        category: '',
        image: '',
        specialFeatures: [] // New array to store selected features
    });

    const categories = [
        { value: '', label: 'Select Category' },
        { value: 'LapTop', label: 'Laptop' },
        { value: 'Phone', label: 'Phone' },
        { value: 'Watch', label: 'Watch' },
        { value: 'Monitor', label: 'Monitor' }
    ];

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        setProductData(prev => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setProductData({ ...productData, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFeatureToggle = (feature) => {
        setProductData(prev => {
            const currentFeatures = prev.specialFeatures || [];
            const updatedFeatures = currentFeatures.includes(feature)
                ? currentFeatures.filter(f => f !== feature)
                : [...currentFeatures, feature];
            
            return { ...prev, specialFeatures: updatedFeatures };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validate form
        if (!productData.name || !productData.price || !productData.category) {
            alert('Please fill in all required fields');
            return;
        }
        try {
            console.log('Product Data:', productData);
            await createProducts(productData);
            setProductData({ 
                name: "", 
                description: "", 
                price: "", 
                category: "", 
                image: "",
                specialFeatures: [] 
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen bg-white/70 backdrop-blur-md flex items-center justify-center px-4 py-8 rounded-xl p-8 shadow-xl">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-[750px] space-y-6">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-3">
                        <Package className="text-blue-500" size={36} />
                        Create Product
                    </h2>
                    <p className="text-gray-500 mt-2">Fill in the details for your new product</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-2">
                    {/* Product Name Input */}
                    <div className="relative">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Product Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={productData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                          placeholder="Enter product name"
                        />
                        <Package className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      </div>
                    </div>

                    {/* Price Input */}
                    <div className="relative">
                      <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                        Price
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          id="price"
                          name="price"
                          value={productData.price}
                          onChange={handleInputChange}
                          required
                          min="0"
                          step="0.01"
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                          placeholder="Enter price"
                        />
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      </div>
                    </div>

                    {/* Description Input */}
                    <div className="relative">
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <div className="relative">
                        <textarea
                          id="description"
                          name="description"
                          value={productData.description}
                          onChange={handleInputChange}
                          rows={3}
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                          placeholder="Enter product description"
                        />
                        <AlignLeft className="absolute left-3 top-3 text-gray-400" size={20} />
                      </div>
                    </div>

                    {/* Category Dropdown */}
                    <div className="relative">
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <div className="relative">
                        <select
                          id="category"
                          name="category"
                          value={productData.category}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                        >
                          {categories.map((cat) => (
                            <option key={cat.value} value={cat.value}>
                              {cat.label}
                            </option>
                          ))}
                        </select>
                        <List className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      </div>
                    </div>
                    
                    {/* Special Features Section */}
                    {productData.category && (
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Special Features
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {featuresByCategory[productData.category]?.map((feature) => (
                                    <button
                                        type="button"
                                        key={feature}
                                        onClick={() => handleFeatureToggle(feature)}
                                        className={`flex items-center justify-between p-2 rounded-lg border transition duration-300 ${
                                            productData.specialFeatures.includes(feature)
                                                ? 'bg-blue-100 border-blue-500 text-blue-700'
                                                : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        <span className="text-sm">{feature}</span>
                                        {productData.specialFeatures.includes(feature) && (
                                            <Check size={16} className="text-blue-500" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    {/* Image Upload */}
                    <div className="relative">
                      <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                        Product Image
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          id="image"
                          name="image"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        <ImagePlus className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      </div>
                      {productData.image && (
                        <p className="text-sm text-gray-500 mt-2">
                          Image Uploaded
                        </p>
                      )}
                    </div>


                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300 flex items-center justify-center gap-2 font-semibold"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
                                Uploading...
                            </>
                        ) : (
                            <>
                                <Package size={20} />
                                Create Product
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateProduct;