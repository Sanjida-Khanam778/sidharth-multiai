import { useState } from "react";
import logo from "../../assets/images/logo.png";
import robot from "../../assets/images/robot.png";
import { Link } from "react-router-dom";

export default function VarifyOTP() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign in attempted with:", { email, password, rememberMe });
  };

  return (
    <div className="h-screen flex font-manrope  ">
      {/* Left Side - Sign In Form */}
      <Link to="/">
        <div className="mb-8 p-8 absolute">
          <img src={logo} alt="logo" className="w-32 md:w-48 lg:w-64" />
        </div>
      </Link>
      <div className="w-1/2 bg-white p-8 flex flex-col border justify-center">
      <div className="max-w-lg mx-auto">
      <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Forget your password
          </h1>
          <p className="text-gray-600">
            Enter your email address and we'll send you a verification code.
          </p>
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <button
            type="submit"
            onClick={() => onNavigate("verify")}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Send OTP
          </button>
        </form>
      </div>
      </div>

      {/* Right Side - Robot Illustration */}
      <div className="w-1/2 bg-gradient-to-br from-blue-400 to-primary flex items-center justify-center relative overflow-hidden">
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
