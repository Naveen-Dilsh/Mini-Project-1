import React, { useState } from 'react';
import { Mail, Lock, User, LogIn, Loader, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUserStore } from '../stores/useUserStore';

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signup, loading } = useUserStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F8F9FA] to-[#E5E5E5] px-4 animate-fadeIn pt-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center animate-slideDown">
          <h1 className="text-4xl font-serif font-bold text-stone-800 hover:scale-105 transition-transform duration-300">
            Join Our Family
          </h1>
          <p className="mt-2 text-sm text-stone-600 animate-fadeIn delay-200">
            Create an account to start your wedding suit journey
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm border border-stone-200 rounded-lg shadow-lg p-8 
            hover:shadow-xl transition-all duration-300 ease-in-out 
            hover:border-stone-300 animate-slideUp">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div className="space-y-2 group">
              <label htmlFor="name" className="block text-sm font-medium text-stone-700 group-hover:text-stone-900">
                Full Name
              </label>
              <div className="relative transform transition-all duration-300 hover:translate-x-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-stone-400 group-hover:text-stone-600 transition-colors duration-200" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full pl-10 px-3 py-2.5 border border-stone-200 rounded-md 
                    text-stone-900 placeholder-stone-400 bg-white/50
                    focus:ring-2 focus:ring-stone-300 focus:border-stone-400 
                    hover:border-stone-400 hover:shadow-sm
                    transition-all duration-200 ease-in-out"
                  placeholder="John Smith"
                  required
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-2 group">
              <label htmlFor="email" className="block text-sm font-medium text-stone-700 group-hover:text-stone-900">
                Email Address
              </label>
              <div className="relative transform transition-all duration-300 hover:translate-x-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-stone-400 group-hover:text-stone-600 transition-colors duration-200" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 px-3 py-2.5 border border-stone-200 rounded-md 
                    text-stone-900 placeholder-stone-400 bg-white/50
                    focus:ring-2 focus:ring-stone-300 focus:border-stone-400 
                    hover:border-stone-400 hover:shadow-sm
                    transition-all duration-200 ease-in-out"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2 group">
              <label htmlFor="password" className="block text-sm font-medium text-stone-700 group-hover:text-stone-900">
                Password
              </label>
              <div className="relative transform transition-all duration-300 hover:translate-x-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-stone-400 group-hover:text-stone-600 transition-colors duration-200" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-10 px-3 py-2.5 border border-stone-200 rounded-md 
                    text-stone-900 placeholder-stone-400 bg-white/50
                    focus:ring-2 focus:ring-stone-300 focus:border-stone-400 
                    hover:border-stone-400 hover:shadow-sm
                    transition-all duration-200 ease-in-out"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 
                    hover:text-stone-600 transition-colors duration-200"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-center group">
              <input
                id="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-stone-600 focus:ring-stone-500 border-stone-300 rounded
                  transition-colors duration-200"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-stone-600 group-hover:text-stone-800">
                I agree to the{' '}
                <Link to="/terms" className="text-stone-800 hover:underline">
                  Terms and Conditions
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center px-4 py-2.5 
                bg-stone-900 hover:bg-stone-800 text-white rounded-md
                text-sm font-medium transition-all duration-300 ease-in-out
                hover:shadow-lg hover:scale-[1.02]
                disabled:opacity-50 disabled:cursor-not-allowed
                transform active:scale-95"
            >
              {loading ? (
                <>
                  <Loader className="mr-2 h-5 w-5 animate-spin" />
                  Please wait
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-5 w-5" />
                  Create Account
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-stone-600">
              Already have an account?{" "}
              <Link 
                to="/login" 
                className="font-medium text-stone-800 hover:text-stone-900 inline-flex items-center
                  hover:underline underline-offset-4 transition-all duration-200
                  group"
              >
                Sign in
                <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;