import React from 'react';
import { Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';

const ContactUsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Decorative Coat/Suit Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Top left coat sketch */}
        <svg className="absolute top-10 left-10 w-48 h-48 text-yellow-600/10" viewBox="0 0 100 100">
          <path d="M50,10 L70,20 L70,80 L50,90 L30,80 L30,20 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
          <path d="M50,10 L50,90" fill="none" stroke="currentColor" strokeWidth="2"/>
          <path d="M40,25 L60,25" fill="none" stroke="currentColor" strokeWidth="2"/>
          <path d="M35,40 L65,40" fill="none" stroke="currentColor" strokeWidth="2"/>
        </svg>

        {/* Bottom right suit sketch */}
        <svg className="absolute bottom-10 right-10 w-56 h-56 text-yellow-600/10" viewBox="0 0 100 100">
          <path d="M30,20 L70,20 L65,80 L35,80 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
          <path d="M50,20 L50,80" fill="none" stroke="currentColor" strokeWidth="2"/>
          <path d="M40,30 L60,30" fill="none" stroke="currentColor" strokeWidth="2"/>
          <path d="M38,40 L62,40" fill="none" stroke="currentColor" strokeWidth="2"/>
          <path d="M35,25 L40,20" fill="none" stroke="currentColor" strokeWidth="2"/>
          <path d="M65,25 L60,20" fill="none" stroke="currentColor" strokeWidth="2"/>
        </svg>

        {/* Middle left button sketch */}
        <svg className="absolute top-1/2 left-20 w-24 h-24 text-yellow-600/10" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="2"/>
          <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="1"/>
          <path d="M45,45 L55,55 M45,55 L55,45" stroke="currentColor" strokeWidth="1"/>
        </svg>

        {/* Middle right needle sketch */}
        <svg className="absolute top-1/3 right-20 w-32 h-32 text-yellow-600/10" viewBox="0 0 100 100">
          <path d="M30,70 L70,30" fill="none" stroke="currentColor" strokeWidth="2"/>
          <circle cx="35" cy="65" r="5" fill="none" stroke="currentColor" strokeWidth="1"/>
          <path d="M65,35 L67,33 L70,30" fill="none" stroke="currentColor" strokeWidth="1"/>
        </svg>
      </div>

      {/* Hero Section with Background Image */}
      <div className="relative h-[32rem]">
        <div className="absolute inset-0">
          <img
            src="/Groom 1.jpg"
            alt="Luxury Wedding Coat Showroom"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70"></div>
        </div>
        <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-6xl font-light mb-6 tracking-wider">Get in Touch</h1>
          <p className="text-xl font-light max-w-2xl leading-relaxed">
            Experience the epitome of bridal luxury. Schedule your private consultation
            in our exclusive atelier.
          </p>
        </div>
      </div>

      {/* Rest of the component remains the same... */}
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 -mt-32 relative z-10 pb-24">
        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/95 backdrop-blur-sm shadow-xl rounded-lg border border-yellow-600/20">
            <div className="p-8 text-center">
              <Phone className="h-8 w-8 mx-auto mb-6 text-yellow-600" />
              <h3 className="text-xl font-light mb-4 text-gray-800">Private Consultation</h3>
              <p className="text-gray-600 mb-2">+1 (555) 123-4567</p>
              <p className="text-sm text-gray-500">By Appointment Only</p>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-sm shadow-xl rounded-lg border border-yellow-600/20">
            <div className="p-8 text-center">
              <Mail className="h-8 w-8 mx-auto mb-6 text-yellow-600" />
              <h3 className="text-xl font-light mb-4 text-gray-800">Inquiries</h3>
              <p className="text-gray-600 mb-2">atelier@luxurycoats.com</p>
              <p className="text-sm text-gray-500">Response within 24 hours</p>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-sm shadow-xl rounded-lg border border-yellow-600/20">
            <div className="p-8 text-center">
              <MapPin className="h-8 w-8 mx-auto mb-6 text-yellow-600" />
              <h3 className="text-xl font-light mb-4 text-gray-800">The Atelier</h3>
              <p className="text-gray-600 mb-2">789 Madison Avenue</p>
              <p className="text-gray-600">New York, NY 10065</p>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm shadow-2xl rounded-lg border border-yellow-600/20">
          {/* Form content remains the same... */}
          <div className="p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light mb-4 text-gray-800">Schedule Your Private Fitting</h2>
              <p className="text-gray-600">
                Begin your journey to finding the perfect wedding coat. Our expert consultants
                are ready to create your memorable experience.
              </p>
            </div>

            <form className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    className="w-full p-3 border-b border-gray-300 focus:border-yellow-600 focus:outline-none bg-transparent"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    className="w-full p-3 border-b border-gray-300 focus:border-yellow-600 focus:outline-none bg-transparent"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full p-3 border-b border-gray-300 focus:border-yellow-600 focus:outline-none bg-transparent"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    className="w-full p-3 border-b border-gray-300 focus:border-yellow-600 focus:outline-none bg-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Wedding Date</label>
                <input
                  type="date"
                  className="w-full p-3 border-b border-gray-300 focus:border-yellow-600 focus:outline-none bg-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Vision</label>
                <textarea
                  className="w-full p-3 border-b border-gray-300 focus:border-yellow-600 focus:outline-none bg-transparent resize-none h-32"
                  placeholder="Tell us about your dream wedding coat..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-yellow-600 text-white py-4 px-8 rounded-full hover:bg-yellow-700 transition-colors text-lg font-light"
              >
                Request Appointment
              </button>
            </form>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-8 mt-16">
          <a href="#" className="text-gray-600 hover:text-yellow-600 transition-colors">
            <Instagram className="h-6 w-6" />
          </a>
          <a href="#" className="text-gray-600 hover:text-yellow-600 transition-colors">
            <Facebook className="h-6 w-6" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;