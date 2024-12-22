import { useState } from "react";
import { Mail, Lock, LogIn, Loader, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading } = useUserStore();

  const handleSubmit = (e) => {
    console.log("Login form submitted");
    e.preventDefault();
    login({email, password});
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F8F9FA] to-[#E5E5E5] px-4 animate-fadeIn">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center animate-slideDown">
          <h1 className="text-4xl font-serif font-bold text-stone-800 hover:scale-105 transition-transform duration-300">
            Welcome Back
          </h1>
          <p className="mt-2 text-sm text-stone-600 animate-fadeIn delay-200">
            Enter your credentials to access your account
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm border border-stone-200 rounded-lg shadow-lg p-8 
            hover:shadow-xl transition-all duration-300 ease-in-out 
            hover:border-stone-300 animate-slideUp">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2 group">
              <label htmlFor="email" className="block text-sm font-medium text-stone-700 group-hover:text-stone-900">
                Email Address
              </label>
              <div className="relative transform transition-all duration-300 hover:translate-x-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-stone-400 group-hover:text-stone-600 transition-colors duration-200" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 px-3 py-2.5 border border-stone-200 rounded-md 
                  text-stone-900 placeholder-stone-400 bg-white/50
                  focus:ring-2 focus:ring-stone-300 focus:border-stone-400 
                  hover:border-stone-400 hover:shadow-sm
                  transition-all duration-200 ease-in-out"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="space-y-2 group">
              <label htmlFor="password" className="block text-sm font-medium text-stone-700 group-hover:text-stone-900">
                Password
              </label>
              <div className="relative transform transition-all duration-300 hover:translate-x-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-stone-400 group-hover:text-stone-600 transition-colors duration-200" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 px-3 py-2.5 border border-stone-200 rounded-md 
                  text-stone-900 placeholder-stone-400 bg-white/50
                  focus:ring-2 focus:ring-stone-300 focus:border-stone-400 
                  hover:border-stone-400 hover:shadow-sm
                  transition-all duration-200 ease-in-out"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center group">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-stone-600 focus:ring-stone-500 border-stone-300 rounded
                  transition-colors duration-200"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-stone-600 group-hover:text-stone-800">
                  Remember me
                </label>
              </div>
              <Link 
                to="/forgot-password" 
                className="text-sm font-medium text-stone-600 hover:text-stone-800
                hover:underline underline-offset-4 transition-all duration-200">
                Forgot password?
              </Link>
            </div>

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
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-stone-600">
              Don't have an account?{" "}
              <Link 
                to="/register" 
                className="font-medium text-stone-800 hover:text-stone-900 inline-flex items-center
                hover:underline underline-offset-4 transition-all duration-200
                group"
              >
                Create one
                <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;