import React from 'react';
import CollectionItem2 from '../components/CollectionItem2';

const CollectionPage2 = () => {
  const products = [
    {
      image: "/Col 1.png",
      title: "Custom Suits",
      price: "from 219€",
      mainCategory: "/Suits",
      categories: [
        // "Custom Suits",
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
      image: "/Col 3.png",
      title: "Custom Dress Shirts",
      price: "from 49€",
      mainCategory: "/Shirts",
      categories: [
        // "Custom Dress Shirts",
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
      image: "/Col 2.png",
      title: "Custom Blazers",
      price: "from 149€",
      mainCategory: "/Blazers",
      categories: [
        // "Custom Blazers",
        "Linen Clothing",
        "Dinner Jacket",
        "Nehru Jackets",
        "Seersucker Jackets",
        "Red Blazers",
        "Linen Blazers",
        "Cotton Blazers",
        "Velvet Blazers"
      ]
    },
    {
      image: "/Wool 1.webp",
      title: "Wool Overcoats",
      price: "from 219€",
      mainCategory: "/Overcoats",
      categories: [
        // "Custom Suits",
        "Men's Wool Overcoats",
        "Double Breasted Overcoats",
        "Pea Coats",
        "Duffle Coats",
        "Funnel Neck Coats",
        "Alpaca Coats",
        "Big and Tall Coats",
        "Trench Coats",
        "Big and Tall Trench Coats"
      ]
    },
    {
      image: "/Tuxedo.webp",
      title: "Tuxedos",
      price: "from 49€",
      mainCategory: "/Tuxedos",
      categories: [
        // "Custom Dress Shirts",
        "Velvet Tuxedos",
        "Double Breasted Tuxedos",
        "Burgundy Tuxedos",
        "White Tuxedos",
        "Gray Tuxedos",
        "Tuxedo Shirts",
        "Tuxedo vests",
      ]
    },
    {
      image: "/Trench.webp",
      title: "Trench Coats",
      price: "from 149€",
      mainCategory: "/Trench",
      categories: [
        // "Custom Blazers",
        "Trench Coats",
        "Big and Tall Trench Coats",
        "Field Jackets",
        "Double Breasted Trench Coats",
        "Single Breasted Trench Coats",
        "Short Trench Coats",
        "Long Trench Coats",
        "Military Trench Coats",
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-12">
      <div className="max-w-[1440px] mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif text-gray-900 mb-3">Bespoke Collection</h1>
          <div className="w-24 h-0.5 bg-gray-200 mx-auto mb-3"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover excellence in every stitch
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {products.map((product, index) => (
            <CollectionItem2
              key={index}
              image={product.image}
              title={product.title}
              price={product.price}
              mainCategory={product.mainCategory}
              categories={product.categories}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollectionPage2;