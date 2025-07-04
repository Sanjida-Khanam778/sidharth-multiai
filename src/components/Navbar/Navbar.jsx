import React from 'react';
import logo from '../../assets/images/logo.png'
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 py-3">
      <div className="w-10/12 mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
           <img src={logo} alt="logo" className='w-32 md:w-48 lg:w-64' />
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a
                href="#"
                className="text-gray-700 hover:text-primary px-3 py-2 font-medium transition-colors duration-200"
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-primary px-3 py-2 font-medium transition-colors duration-200"
              >
                Features
              </a>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Link to="/login">
            <button className="text-gray-700 hover:text-primary px-4 py-2 font-semibold transition-colors duration-200">
              Sign In
            </button>
            </Link>
            <Link to="/register">
            <button className="bg-primary text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200 shadow-sm">
              Sign up
            </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-primary p-2">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;