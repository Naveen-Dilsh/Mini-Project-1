import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, ChevronRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300">
      {/* Top section with logo and newsletter */}
      <div className="w-full max-w-7xl mx-auto pt-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-gray-800">
          {/* Brand Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-serif text-white">LUXE SUITS</h2>
            <p className="text-sm leading-relaxed">
              Crafting timeless elegance for your perfect day. Each suit tells a unique story of sophistication and style.
            </p>
            <div className="flex space-x-4 pt-4">
              <a href="#" className="hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-medium mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {['Collections', 'Appointments', 'Size Guide', 'Wedding Tips', 'FAQs'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm flex items-center group">
                    <ChevronRight className="w-4 h-4 mr-2 transition-transform group-hover:translate-x-1" />
                    <span className="group-hover:text-white transition-colors">{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-white font-medium mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-sm">123 Luxury Avenue, Fashion District, NY 10001</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3" />
                <span className="text-sm">contact@luxesuits.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-medium mb-4">Newsletter</h3>
            <p className="text-sm mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2.5 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-gray-600 text-sm"
              />
              <button className="w-full bg-white text-black py-2.5 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom section */}
        <div className="py-8 text-center md:flex md:justify-between md:items-center text-sm">
          <div className="mb-4 md:mb-0">
            <span>&copy; 2025 Luxe Suits. All rights reserved.</span>
          </div>
          <div className="flex justify-center space-x-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;