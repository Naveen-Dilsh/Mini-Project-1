import React from 'react';
import { ChevronRight } from 'lucide-react';

const ProductShowcase = () => {
  const products = [
    {
      image: "Col 1.png",
      title: "Custom Suits",
      price: "from 219€",
      categories: [
        "Custom Suits",
        "Peaky Blinders Suits",
        "Cocktail Suit",
        "Big and Tall Suits",
        "Blue Suits",
        "Gray Suits"
      ]
    },
    {
      image: "/Col 2.png",
      title: "Custom Dress Shirts",
      price: "from 49€",
      categories: [
        "Custom Dress Shirts",
        "Grandad Collar Shirt",
        "White Tie Shirts",
        "Oxford Shirts",
        "Mao Shirts",
        "Linen Shirts"
      ]
    },
    {
      image: "/Col 3.png",
      title: "Custom Blazers",
      price: "from 149€",
      categories: [
        "Custom Blazers",
        "Linen Clothing",
        "Dinner Jacket",
        "Nehru Jackets",
        "Seersucker Jackets",
        "Velvet Blazers"
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
        {products.map((product, index) => (
          <React.Fragment key={index}>
            {/* Image Column */}
            <div className="lg:col-span-1 relative group">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-[600px] object-cover object-center rounded-lg"
              />
            </div>

            {/* Content Column */}
            <div className="lg:col-span-1 space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-gray-800">{product.title}</h2>
                <p className="text-lg text-gray-600">{product.price}</p>
                <button className="px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors duration-300">
                  START DESIGNING
                </button>
              </div>

              <div className="space-y-3">
                {product.categories.map((category, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 cursor-pointer group">
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-orange-500" />
                    <span>{category}</span>
                  </div>
                ))}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProductShowcase;