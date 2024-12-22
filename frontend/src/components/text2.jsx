import React from 'react';
import { ChevronRight } from 'lucide-react';

const ProductShowcase = () => {
  const products = [
    {
      image: "/Col 1.png",
      title: "Custom Suits",
      price: "from 219€",
      categories: [
        "Custom Suits",
        "Peaky Blinders Suits",
        "Cocktail Suit",
        "Big and Tall Suits",
        "Blue Suits",
        "Gray Suits",
        "Pinstripe Suit",
        "Business Suits",
        "Prince of Wales Suits",
        "Nehru Suits"
      ]
    },
    {
      image: "Col 3.png",
      title: "Custom Dress Shirts",
      price: "from 49€",
      categories: [
        "Custom Dress Shirts",
        "Grandad Collar Shirt",
        "White Tie Shirts",
        "Oxford Shirts",
        "Mao Shirts",
        "Checkered Shirts",
        "Linen Shirts",
        "Short Sleeve Dress Shirts",
        "Tuxedo Shirts"
      ]
    },
    {
      image: "Col 2.png",	
      title: "Custom Blazers",
      price: "from 149€",
      categories: [
        "Custom Blazers",
        "Linen Clothing",
        "Dinner Jacket",
        "Nehru Jackets",
        "Seersucker Jackets",
        "Red Blazers",
        "Linen Blazers",
        "Cotton Blazers",
        "Velvet Blazers"
      ]
    }
  ];

  return (
    <div className="max-w-[1440px] mx-auto px-4 py-8">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {products.map((product, index) => (
          <React.Fragment key={index}>
            {/* Image Column */}
            <div className="col-span-1 md:col-span-2 lg:col-span-1">
              <div className="relative group overflow-hidden rounded-lg">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-[400px] md:h-[400px] lg:h-[600px] object-contain object-center transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Content Column */}
            <div className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col justify-center space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl lg:text-3xl font-light text-gray-800">{product.title}</h2>
                <p className="text-lg text-gray-600">{product.price}</p>
                <button className="w-full px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-all duration-300">
                  START DESIGNING
                </button>
              </div>

              <div className="space-y-2">
                {product.categories.map((category, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 cursor-pointer group transition-all duration-200"
                  >
                    <ChevronRight 
                      className="w-4 h-4 text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" 
                    />
                    <span className="text-sm lg:text-base group-hover:translate-x-1 transition-transform duration-200">
                      {category}
                    </span>
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