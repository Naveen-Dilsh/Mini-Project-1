import React, { useState, useEffect } from 'react';
import { 
  Crown,
  Menu,
  X,
  Phone,
  Calendar,
  Shirt,
  Ruler,
  UserCircle2,
  LogIn,
  LogOut,
  ShoppingBag,
  User
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUserStore } from '../stores/useUserStore';
import { useCartStore } from '../stores/useCartStore';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const { user, logout } = useUserStore();
  const { cart } = useCartStore();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <nav className={`bg-white/95 backdrop-blur-sm shadow-lg fixed w-full z-20 left-0 transition-transform duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-2">
            <Crown className="h-6 w-6 text-rose-600" strokeWidth={1.5} />
            <span className="text-2xl font-serif text-gray-800">
              Elegance
            </span>
          </Link>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/collection" className="text-gray-600 hover:text-rose-600 transition-colors flex items-center space-x-2">
              <Shirt size={18} />
              <span className="font-light">Collection</span>
            </Link>
            
            <Link to="/appointments" className="text-gray-600 hover:text-rose-600 transition-colors flex items-center space-x-2">
              <Calendar size={18} />
              <span className="font-light">Book Fitting</span>
            </Link>
            
            <Link to="/measurements" className="text-gray-600 hover:text-rose-600 transition-colors flex items-center space-x-2">
              <Ruler size={18} />
              <span className="font-light">Size Guide</span>
            </Link>
            
            <Link to="/contact" className="text-gray-600 hover:text-rose-600 transition-colors flex items-center space-x-2">
              <Phone size={18} />
              <span className="font-light">Contact</span>
            </Link>

            {user && (
              <Link
                to="/cart"
                className="relative text-gray-600 hover:text-rose-600 transition-colors flex items-center space-x-2"
              >
                <ShoppingBag size={18} />
                <span className="font-light">Cart</span>
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-rose-600 text-white rounded-full px-2 py-0.5 text-xs">
                    {cart.length}
                  </span>
                )}
              </Link>
            )}

            {user ? (
              <div className="flex items-center space-x-4">
                {user.role === 'customer' && 
                        <Link 
                        to="/account" 
                        className="px-4 py-2 text-gray-600 hover:text-rose-600 transition-colors flex items-center space-x-2"
                      >
                        <UserCircle2 size={18} />
                        <span className="font-light">{user.name}</span>
                      </Link>
                }

                {user.role === 'admin' && 
                        <Link 
                        to="/secret-dashboard"
                        className="px-4 py-2 text-gray-600 hover:text-rose-600 transition-colors flex items-center space-x-2"
                      >
                        <UserCircle2 size={18} />
                        <span className="font-light">{user.name}</span>
                      </Link>
                }
                <button 
                  onClick={logout}
                  className="px-4 py-2 border border-rose-600 text-rose-600 hover:bg-rose-600 hover:text-white rounded-md transition-colors flex items-center space-x-2"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="px-4 py-2 text-gray-600 hover:text-rose-600 transition-colors flex items-center space-x-2"
                >
                  <LogIn size={18} />
                  <span>Login</span>
                </Link>
                <Link 
                  to="/signup" 
                  className="px-4 py-2 border border-rose-600 text-rose-600 hover:bg-rose-600 hover:text-white rounded-md transition-colors flex items-center space-x-2"
                >
                  <User size={18} />
                  <span>Register</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Dropdown */}
          {isMenuOpen && (
            <div className="absolute top-20 left-0 w-full bg-white/95 backdrop-blur-sm md:hidden shadow-lg">
              <div className="px-4 py-3 space-y-3">
                <Link 
                  to="/collection" 
                  className="text-gray-600 hover:text-rose-600 block py-2 flex items-center space-x-3"
                >
                  <Shirt size={18} />
                  <span>Collection</span>
                </Link>
                
                <Link 
                  to="/appointments" 
                  className="text-gray-600 hover:text-rose-600 block py-2 flex items-center space-x-3"
                >
                  <Calendar size={18} />
                  <span>Book Fitting</span>
                </Link>
                
                <Link 
                  to="/measurements" 
                  className="text-gray-600 hover:text-rose-600 block py-2 flex items-center space-x-3"
                >
                  <Ruler size={18} />
                  <span>Size Guide</span>
                </Link>
                
                <Link 
                  to="/contact" 
                  className="text-gray-600 hover:text-rose-600 block py-2 flex items-center space-x-3"
                >
                  <Phone size={18} />
                  <span>Contact</span>
                </Link>

                {user && (
                  <Link 
                    to="/cart" 
                    className="text-gray-600 hover:text-rose-600 block py-2 flex items-center space-x-3"
                  >
                    <ShoppingBag size={18} />
                    <span>Cart ({cart.length})</span>
                  </Link>
                )}

                {user ? (
                  <>
                    <Link 
                      to="/account" 
                      className="text-gray-600 hover:text-rose-600 block py-2 flex items-center space-x-3"
                    >
                      <UserCircle2 size={18} />
                      <span>My Account</span>
                    </Link>
                    <button 
                      onClick={logout}
                      className="text-gray-600 hover:text-rose-600 block py-2 w-full flex items-center space-x-3"
                    >
                      <LogOut size={18} />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/login" 
                      className="text-gray-600 hover:text-rose-600 block py-2 flex items-center space-x-3"
                    >
                      <LogIn size={18} />
                      <span>Login</span>
                    </Link>
                    <Link 
                      to="/register" 
                      className="text-gray-600 hover:text-rose-600 block py-2 flex items-center space-x-3"
                    >
                      <User size={18} />
                      <span>Register</span>
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;