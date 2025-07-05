import { useState } from "react";
import logo from "../../assets/images/logo.png";
import robot from "../../assets/images/robot.png";
import { Link } from "react-router-dom";

export default function ForgetPass() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Forget password attempted with:", { email });
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row font-manrope">
      {/* Logo - Mobile */}
      <Link to="/" className="absolute top-4 left-4">
        <div className="p-4 lg:p-8">
          <img src={logo} alt="logo" className="w-24 sm:w-32 md:w-40 lg:w-48" />
        </div>
      </Link>


      {/* Robot Image - Mobile (below navbar) */}
      <div className="lg:hidden bg-gradient-to-br from-primary to-primary h-64 sm:h-80 flex items-center justify-center relative overflow-hidden">
      <div className="h-80 sm:h-96">
          <img src={robot} alt="robot" className="w-full h-full object-cover" />
        </div>        {/* Background Decorative Elements */}
        <div className="absolute top-8 left-8 w-4 h-4 bg-white bg-opacity-20 rounded-full"></div>
        <div className="absolute bottom-16 right-8 w-6 h-6 bg-white bg-opacity-15 rounded-full"></div>
        <div className="absolute top-1/3 right-16 w-3 h-3 bg-white bg-opacity-25 rounded-full"></div>
      </div>

      {/* Left Side - Forget Password Form */}
      <div className="flex-1 lg:w-1/2 bg-white p-4 sm:p-6 my-10 md:my-0 lg:p-8 flex flex-col justify-center">
      
        <div className="w-full max-w-md mx-auto">
          <div className="mb-6 xl:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Forget your password
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Enter your email address and we'll send you a verification code.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm sm:text-base mb-4"
                required
              />
            </div>

            <Link to="/verify-otp">
              <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary transition-colors text-sm sm:text-base"
              >
                Send OTP
              </button>
            </Link>

            <div className="text-center">
              <Link
                to="/login"
                className="text-primary hover:text-primary text-sm sm:text-base"
              >
                Back to Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Robot Illustration - Desktop Only */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-primary items-center justify-center relative overflow-hidden">
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
