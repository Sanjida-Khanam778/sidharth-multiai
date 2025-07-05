import React from "react";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import profile from "../../assets/images/profile.png";
const Nav = () => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 py-3 sticky top-0 z-50">
      <div className="w-11/12 mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/">
            <div className="flex items-center">
              <img src={logo} alt="logo" className="w-32 md:w-48 lg:w-64" />
            </div>
          </Link>
          <div className=" w-12 h-12 my-auto rounded-full ml-3">
                    <img src={profile} alt="profile" className="w-full h-full rounded-full" />
                  </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
