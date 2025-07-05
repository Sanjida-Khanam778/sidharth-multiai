import { useState } from "react";
import logo from "../../assets/images/logo.png";
import robot from "../../assets/images/robot.png";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function ResetPass() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Password reset attempted with:", {
      password,
      confirmPassword,
    });
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
        </div>
        {/* Background Decorative Elements */}
        <div className="absolute top-8 left-8 w-4 h-4 bg-white bg-opacity-20 rounded-full"></div>
        <div className="absolute bottom-16 right-8 w-6 h-6 bg-white bg-opacity-15 rounded-full"></div>
        <div className="absolute top-1/3 right-16 w-3 h-3 bg-white bg-opacity-25 rounded-full"></div>
      </div>

      {/* Left Side - Reset Password Form */}
      <div className="flex-1 lg:w-1/2 bg-white p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
        <div className="w-full max-w-md mx-auto">
          <div className="mb-6 lg:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Reset password
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Create a new password for your account
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none pr-12 text-sm sm:text-base"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none pr-12 text-sm sm:text-base"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <Link to="/success-msg">
              <button
                type="submit"
                className="w-full bg-primary text-white py-3 mt-4 rounded-lg font-medium hover:bg-primary transition-colors text-sm sm:text-base"
              >
                Update Password
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
