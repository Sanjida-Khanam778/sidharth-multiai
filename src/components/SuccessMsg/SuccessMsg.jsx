import { useState } from "react";
import logo from "../../assets/images/logo.png";
import robot from "../../assets/images/robot.png";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import congo from "../../assets/images/congo.png";
export default function SuccessMsg() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row font-manrope">
      {/* Logo - Mobile */}
      <Link to="/" className="absolute top-4 left-4">
        <div className="p-4 lg:p-8">
          <img src={logo} alt="logo" className="w-24 sm:w-32 md:w-40 lg:w-48" />
        </div>
      </Link>

      {/* Robot Image - Mobile (below navbar) */}
      <div className="md:hidden bg-gradient-to-br from-primary to-primary h-64 sm:h-80 flex items-center justify-center relative overflow-hidden">
        <div className="h-80 sm:h-96">
          <img src={robot} alt="robot" className="w-full h-full object-cover" />
        </div>
        {/* Background Decorative Elements */}
        <div className="absolute top-8 left-8 w-4 h-4 bg-white bg-opacity-20 rounded-full"></div>
        <div className="absolute bottom-16 right-8 w-6 h-6 bg-white bg-opacity-15 rounded-full"></div>
        <div className="absolute top-1/3 right-16 w-3 h-3 bg-white bg-opacity-25 rounded-full"></div>
      </div>

      {/* Left Side - Reset Password Form */}
      <div className="flex-1 md:w-1/2 bg-white p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
        <div className="max-w-md mx-auto">
          <div className="w-full flex items-center justify-center mb-8 mx-auto">
            <img src={congo} className="w-24 md:w-36" alt="" />
          </div>
          <div>
            {/* Congratulations text */}
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Congratulations!
            </h2>
            <p className="text-gray-600 mb-8">Your all are set successfully</p>

            {/* Sign in button */}
            <Link to={"/login"}>
              <button className="w-full bg-primary text-white font-semibold py-3 px-6 rounded-lg transition duration-200">
                Go to sign in
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side - Robot Illustration - Desktop Only */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-primary to-primary items-center justify-center relative overflow-hidden">
        <div className="relative"></div>
        <div className="">
          <img src={robot} alt="robot" className="w-full h-full object-cover" />
        </div>
        {/* Background Decorative Elements */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-white bg-opacity-20 rounded-full"></div>
        <div className="absolute bottom-32 right-16 w-6 h-6 bg-white bg-opacity-15 rounded-full"></div>
        <div className="absolute top-1/3 right-32 w-3 h-3 bg-white bg-opacity-25 rounded-full"></div>
      </div>
    </div>
  );
}
