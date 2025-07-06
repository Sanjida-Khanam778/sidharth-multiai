import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 py-2 sm:py-3 sticky w-full top-0 z-50">
      <div className="w-11/12 sm:w-10/12 mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" onClick={closeMobileMenu}>
            <div className="flex items-center">
              <img
                src={logo}
                alt="logo"
                className="w-24 sm:w-32 md:w-40 lg:w-48 xl:w-56"
              />
            </div>
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-6 xl:space-x-8">
              <a
                href="#"
                className="text-gray-700 hover:text-primary px-3 py-2 font-medium transition-colors duration-200 text-sm xl:text-base"
              >
                Home
              </a>
              <a
                href="#features"
                className="text-gray-700 hover:text-primary px-3 py-2 font-medium transition-colors duration-200 text-sm xl:text-base"
              >
                Features
              </a>
            </div>
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
            <Link to="/login">
              <button className="text-gray-700 hover:text-primary px-3 xl:px-4 py-2 font-semibold transition-colors duration-200 text-sm xl:text-base">
                Sign In
              </button>
            </Link>
            <Link to="/register">
              <button className="bg-primary text-white px-4 xl:px-6 py-2 rounded-lg font-semibold transition-colors duration-200 shadow-sm text-sm xl:text-base">
                Sign up
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-primary p-2 focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-100 mt-3">
              {/* Mobile Navigation Links */}
              <div className="space-y-2">
                <a
                  href="#"
                  className="block text-gray-700 hover:text-primary px-3 py-2 font-medium transition-colors duration-200 text-base"
                  onClick={closeMobileMenu}
                >
                  Home
                </a>
                <a
                  href="#features"
                  className="block text-gray-700 hover:text-primary px-3 py-2 font-medium transition-colors duration-200 text-base"
                  onClick={closeMobileMenu}
                >
                  Features
                </a>
              </div>

              {/* Mobile Auth Buttons */}
              <div className="pt-4 pb-2 space-y-3">
                <Link to="/login" onClick={closeMobileMenu}>
                  <button className="w-full text-center border rounded text-gray-700 mb-2 hover:text-primary px-3 py-2 font-semibold transition-colors duration-200 text-base">
                    Sign In
                  </button>
                </Link>
                <Link to="/register" onClick={closeMobileMenu}>
                  <button className="w-full bg-primary text-white px-3 py-2 rounded-lg font-semibold transition-colors duration-200 shadow-sm text-base">
                    Sign up
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
