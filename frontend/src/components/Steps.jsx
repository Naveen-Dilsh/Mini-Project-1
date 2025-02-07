import React from 'react';
import { Ruler, Scissors, ScrollText } from 'lucide-react';

const Steps = () => {
  const steps = [
    {
      icon: <ScrollText />,
      title: "SELECT THE SUIT FABRIC",
      description: "Choose from a wide range of wedding suit fabrics the one that matches best for your special day."
    },
    {
      icon: <Scissors />,
      title: "DESIGN YOUR WEDDING SUIT",
      description: "Personalize all details so you make your new suit a personal attire for your special occasion."
    },
    {
      icon: <Ruler />,
      title: "ENTER YOUR MEASUREMENTS",
      description: "Get measured at home. You don't need a tailor, just some help from your fiancé, best man, or a friend."
    }
  ];

  return (
    <div className="w-full bg-gradient-to-b from-stone-50 to-stone-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-stone-800 mb-4">
          How to Choose Your Wedding Suit
        </h2>
        <p className="text-center text-stone-600 mb-12 max-w-2xl mx-auto">
          Create your perfect wedding suit in three simple steps
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="group relative bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-stone-100"
            >
              {/* Connecting lines between cards (visible on md+ screens) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 w-8 h-0.5 bg-amber-200 -mr-4 z-0 transform translate-x-1/2">
                  <div className="absolute right-0 top-1/2 w-2 h-2 rounded-full bg-amber-300 transform translate-x-1/2 -translate-y-1/2" />
                </div>
              )}

              {/* Step number */}
              <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-stone-50 group-hover:bg-amber-50 flex items-center justify-center text-stone-400 group-hover:text-amber-600 transition-colors duration-300 border border-stone-200 group-hover:border-amber-200">
                {index + 1}
              </div>

              {/* Icon container */}
              <div className="mb-8 relative">
                <div className="w-16 h-16 rounded-full bg-stone-50 group-hover:bg-amber-50 flex items-center justify-center transition-all duration-300 mb-4 border border-stone-200 group-hover:border-amber-200">
                  <div className="text-stone-600 group-hover:text-amber-600 transform group-hover:scale-110 transition-transform duration-300">
                    {React.cloneElement(step.icon, { size: 32 })}
                  </div>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-stone-800 mb-4 group-hover:text-amber-700 transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-stone-600 text-sm md:text-base leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Steps;