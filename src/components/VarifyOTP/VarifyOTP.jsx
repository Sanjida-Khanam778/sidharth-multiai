import { useState } from "react";
import logo from "../../assets/images/logo.png";
import robot from "../../assets/images/robot.png";
import { Link } from "react-router-dom";

export default function VarifyOTP() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleOtpChange = (index, value) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
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
              Verify Your indentity
            </h1>
            <p className="text-gray-600">
              Please input the verification code sent to your email
            </p>
          </div>

          <form className="space-y-6">
            <div className="flex justify-center space-x-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  className="w-12 h-12 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-lg font-medium"
                  maxLength="1"
                />
              ))}
            </div>

            <Link to="/reset-password">
              <button
                type="submit"
                className="w-full bg-primary text-white py-3 mt-6 rounded-lg font-medium hover:bg-primary transition-colors"
              >
                Verify Code
              </button>
            </Link>
          </form>
        </div>
      </div>

      {/* Right Side - Robot Illustration */}
      <div className="w-1/2 bg-gradient-to-br from-primary to-primary flex items-center justify-center relative overflow-hidden">
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
