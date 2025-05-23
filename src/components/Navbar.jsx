import React, { useState } from 'react';
import { Menu, X, Lock } from 'lucide-react';
import { NavLink } from 'react-router';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Demo state for login status

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLoginStatus = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-gray-800">TaskManager</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {/* {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-1 ${
                    item.protected && !isLoggedIn
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                  onClick={(e) => {
                    if (item.protected && !isLoggedIn) {
                      e.preventDefault();
                      alert('Please login to access this feature');
                    }
                  }}
                >
                  {item.name}
                  {item.protected && <Lock size={14} className="text-gray-400" />}
                </a>
              ))} */}
                <NavLink to={'/'}>Home</NavLink>
                <NavLink to={'/add-tasks'}>Add Task</NavLink>
                <NavLink to={'/browse-tasks'}>Browse Tasks</NavLink>
                <NavLink to={'/my-posted-tasks'}>My Posted Tasks</NavLink>
              {/* Login/Signup Button */}
              <button
                className={`ml-4 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isLoggedIn
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Login
              </button>
              <button
                className={`ml-4 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isLoggedIn
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Signup
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 border-t">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 flex items-center justify-between ${
                  item.protected && !isLoggedIn
                    ? 'text-gray-400 cursor-not-allowed bg-gray-100'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
                onClick={(e) => {
                  if (item.protected && !isLoggedIn) {
                    e.preventDefault();
                    alert('Please login to access this feature');
                  } else {
                    setIsMenuOpen(false);
                  }
                }}
              >
                <span>{item.name}</span>
                {item.protected && <Lock size={16} className="text-gray-400" />}
              </a>
            ))}

            {/* Mobile Login/Signup Button */}
            <button
              onClick={() => {
                toggleLoginStatus();
                setIsMenuOpen(false);
              }}
              className={`w-full text-left block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                isLoggedIn
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isLoggedIn ? 'Logout' : 'Login/Signup'}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
