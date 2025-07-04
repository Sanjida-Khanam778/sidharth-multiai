import React from "react";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
const Nav = () => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 py-3 sticky top-0 z-50">
      <div className="w-10/12 mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/">
            <div className="flex items-center">
              <img src={logo} alt="logo" className="w-32 md:w-48 lg:w-64" />
            </div>
          </Link>

       

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
         
          </div>

       
        </div>
      </div>
    </nav>
  );
};

export default Nav;
