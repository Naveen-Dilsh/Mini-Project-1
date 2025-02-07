import React, { useState } from 'react';
import { Ruler, Info, ChevronDown } from 'lucide-react';
import Steps from '../components/Steps';
import ContactUsPage from './ContactUs';

const SizeGuidePage = () => {
  const [activeSection, setActiveSection] = useState('how-to-measure');

  const sizeChart = {
    chest: [
      { size: '36', chest: '36', waist: '30', hip: '37', sleeve: '32' },
      { size: '38', chest: '38', waist: '32', hip: '39', sleeve: '32.5' },
      { size: '40', chest: '40', waist: '34', hip: '41', sleeve: '33' },
      { size: '42', chest: '42', waist: '36', hip: '43', sleeve: '33.5' },
      { size: '44', chest: '44', waist: '38', hip: '45', sleeve: '34' },
      { size: '46', chest: '46', waist: '40', hip: '47', sleeve: '34.5' }
    ]
  };

  return (
    <div>
      {/* Hero Section with Image and Gradient */}
      <div className="relative h-72 md:h-80 lg:h-[500px] mb-16">
        <img
          src="/Groom 2.jpg"
          alt="Suit Measuring"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-serif mb-4 hover:scale-105 transition-transform duration-300">Perfect Fit Guide</h1>
          <p className="text-lg md:text-xl max-w-2xl text-amber-50">
            Discover how to achieve the perfect fit for your wedding attire
          </p>
        </div>
      </div>

      <Steps />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <div className="text-center mb-12 mt-12">
          <h2 className="text-3xl font-serif mb-4 hover:text-amber-600 transition-colors">Find Your Perfect Size</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Finding your perfect fit is essential for your special day. Use our comprehensive guide to ensure your wedding suit fits impeccably.
          </p>
        </div>

         {/* Main Content */}
         <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* How to Measure Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:border-amber-200 border-2 border-transparent">
              <h2 className="text-2xl font-serif mb-8 text-amber-800">How to Measure</h2>
              
              <div className="space-y-8">
                <div className="flex gap-6 items-start pb-6 border-b border-gray-100 group hover:bg-amber-50/50 p-4 rounded-lg transition-colors">
                  <Ruler className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                  <div>
                    <h3 className="font-medium text-lg mb-2 group-hover:text-amber-700">Chest Measurement</h3>
                    <p className="text-gray-600">
                      Measure around the fullest part of your chest, keeping the tape horizontal and snug but not tight.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 items-start pb-6 border-b border-gray-100 group hover:bg-amber-50/50 p-4 rounded-lg transition-colors">
                  <Ruler className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                  <div>
                    <h3 className="font-medium text-lg mb-2 group-hover:text-amber-700">Waist Measurement</h3>
                    <p className="text-gray-600">
                      Measure around your natural waistline, typically the narrowest part of your torso.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 items-start pb-6 border-b border-gray-100 group hover:bg-amber-50/50 p-4 rounded-lg transition-colors">
                  <Ruler className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                  <div>
                    <h3 className="font-medium text-lg mb-2 group-hover:text-amber-700">Sleeve Length</h3>
                    <p className="text-gray-600">
                      Measure from the shoulder seam to just below your wrist bone, with your arm slightly bent.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 items-start group hover:bg-amber-50/50 p-4 rounded-lg transition-colors">
                  <Ruler className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                  <div>
                    <h3 className="font-medium text-lg mb-2 group-hover:text-amber-700">Hip Measurement</h3>
                    <p className="text-gray-600">
                      Measure around the fullest part of your hips, keeping the tape level.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Size Chart */}
          <div className="lg:row-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:border-amber-200 border-2 border-transparent">
              <h2 className="text-2xl font-serif mb-8 text-amber-800">Size Chart</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-amber-100">
                      <th className="py-3 px-4 text-left text-sm font-medium text-amber-900">Size</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-amber-900">Chest</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-amber-900">Waist</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-amber-900">Hip</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-amber-900">Sleeve</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizeChart.chest.map((row) => (
                      <tr key={row.size} className="border-b border-gray-100 hover:bg-amber-50 transition-colors">
                        <td className="py-4 px-4 text-sm font-medium">{row.size}</td>
                        <td className="py-4 px-4 text-sm">{row.chest}"</td>
                        <td className="py-4 px-4 text-sm">{row.waist}"</td>
                        <td className="py-4 px-4 text-sm">{row.hip}"</td>
                        <td className="py-4 px-4 text-sm">{row.sleeve}"</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Tips Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:border-amber-200 border-2 border-transparent">
              <h2 className="text-2xl font-serif mb-8 text-amber-800">Fitting Tips</h2>
              <div className="space-y-6">
                <div className="flex gap-4 items-start group hover:bg-amber-50/50 p-4 rounded-lg transition-colors">
                  <Info className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                  <p className="text-gray-600 group-hover:text-amber-700">
                    When in doubt, opt for a slightly larger size as alterations can be made to make a suit smaller but not larger.
                  </p>
                </div>
                <div className="flex gap-4 items-start group hover:bg-amber-50/50 p-4 rounded-lg transition-colors">
                  <Info className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                  <p className="text-gray-600 group-hover:text-amber-700">
                    The shoulder seams should align with your natural shoulders for the best fit.
                  </p>
                </div>
                <div className="flex gap-4 items-start group hover:bg-amber-50/50 p-4 rounded-lg transition-colors">
                  <Info className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                  <p className="text-gray-600 group-hover:text-amber-700">
                    Your suit jacket should button smoothly without pulling or creating an 'X' shape.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-serif mb-8 text-amber-800">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="border-2 border-gray-200 rounded-lg hover:border-amber-300 transition-all duration-300">
              <button 
                className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-amber-50/50"
                onClick={() => setActiveSection(activeSection === 'faq-1' ? '' : 'faq-1')}
              >
                <span className="font-medium text-lg">What if I'm between sizes?</span>
                <ChevronDown className={`w-6 h-6 text-amber-600 transition-transform duration-300 ${activeSection === 'faq-1' ? 'rotate-180' : ''}`} />
              </button>
              {activeSection === 'faq-1' && (
                <div className="px-8 py-6 border-t border-gray-200 bg-amber-50/30">
                  <p className="text-gray-600">
                    If you're between sizes, we recommend choosing the larger size. Our expert tailors can then make alterations to achieve the perfect fit.
                  </p>
                </div>
              )}
            </div>
            
            <div className="border-2 border-gray-200 rounded-lg hover:border-amber-300 transition-all duration-300">
              <button 
                className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-amber-50/50"
                onClick={() => setActiveSection(activeSection === 'faq-2' ? '' : 'faq-2')}
              >
                <span className="font-medium text-lg">How long before the wedding should I get measured?</span>
                <ChevronDown className={`w-6 h-6 text-amber-600 transition-transform duration-300 ${activeSection === 'faq-2' ? 'rotate-180' : ''}`} />
              </button>
              {activeSection === 'faq-2' && (
                <div className="px-8 py-6 border-t border-gray-200 bg-amber-50/30">
                  <p className="text-gray-600">
                    We recommend getting measured 2-3 months before your wedding. This allows time for ordering, alterations, and any final adjustments.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
   
  );
};

export default SizeGuidePage;
