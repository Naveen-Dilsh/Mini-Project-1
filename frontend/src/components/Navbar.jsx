import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Menu, 
  X, 
  Home, 
  User, 
  LogIn, 
  LayoutDashboard, 
  LogOut
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user=false;
  const isAdmin=false;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-20 top-0 left-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <Link to="/">
          <div className="flex items-center">
            <ShoppingCart 
              className="h-8 w-8 text-blue-600 mr-2" 
              strokeWidth={2}
            />
            <span className="text-xl font-bold text-gray-800">
              MyShop
            </span>
          </div>
          </Link>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={toggleMenu}
              className="text-gray-600 hover:text-gray-800"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4 items-center">
            {user ? (
                <>
                     <button className="text-gray-600 hover:text-blue-600 flex items-center space-x-1">
                        <LogOut size={18} />
                        <span>Logout</span>
                    </button>
                </>
            ):(
                <>
                    <Link to="/login" className="text-gray-600 hover:text-blue-600 flex items-center space-x-1">
                        <LogIn size={18} />
                        <span>Login</span>
                    </Link>
                    <Link to ="/signup" className="text-gray-600 hover:text-blue-600 flex items-center space-x-1">
                        <User size={18} />
                        <span>Register</span>
                    </Link>
                </>
            )}
           
            
            {isAdmin && 
                <Link to="/dash"
                className="text-gray-600 hover:text-blue-600 flex items-center space-x-1"
              >
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </Link>
            }
            
            {user && 
                <Link to="/cart"
                className="text-gray-600 hover:text-blue-600 flex items-center space-x-1"
              >
                <ShoppingCart size={18} />
                <span>Cart</span>
              </Link>
            }
          </div>

          {/* Mobile Menu Dropdown */}
          {isMenuOpen && (
            <div className="absolute top-16 left-0 w-full bg-white md:hidden shadow-lg">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <a 
                  href="/" 
                  className="text-gray-600 hover:bg-gray-100 block px-3 py-2 rounded-md flex items-center space-x-2"
                >
                  <Home size={18} />
                  <span>Home</span>
                </a>
                <a 
                  href="/login" 
                  className="text-gray-600 hover:bg-gray-100 block px-3 py-2 rounded-md flex items-center space-x-2"
                >
                  <LogIn size={18} />
                  <span>Login</span>
                </a>
                <a 
                  href="/register" 
                  className="text-gray-600 hover:bg-gray-100 block px-3 py-2 rounded-md flex items-center space-x-2"
                >
                  <User size={18} />
                  <span>Register</span>
                </a>
                <a 
                  href="/dashboard" 
                  className="text-gray-600 hover:bg-gray-100 block px-3 py-2 rounded-md flex items-center space-x-2"
                >
                  <LayoutDashboard size={18} />
                  <span>Dashboard</span>
                </a>
                <a 
                  href="/cart" 
                  className="text-gray-600 hover:bg-gray-100 block px-3 py-2 rounded-md flex items-center space-x-2"
                >
                  <ShoppingCart size={18} />
                  <span>Cart</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;