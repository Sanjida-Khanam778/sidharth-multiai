import { useState } from "react";
import logo from "../../assets/images/logo.png";
import robot from "../../assets/images/robot.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useVerifyOtpMutation } from "../../Api/authapi";
import toast from "react-hot-toast";

export default function VarifyOTP() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Email not found. Please go back and enter your email.");
      return;
    }
    const otpValue = otp.join("");
    try {
      await verifyOtp({ email, otp: otpValue }).unwrap();
      toast.success("OTP verified successfully");
      navigate("/reset-password", { state: { email } });
    } catch (error) {
      const errorMsg =
        error?.data?.message || error?.error || "OTP verification failed.";
      toast.error(errorMsg);
    }
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

      {/* Left Side - OTP Verification Form */}
      <div className="flex-1 lg:w-1/2 bg-white p-4 sm:p-6 my-10 md:my-0 lg:p-8 flex flex-col justify-center">
        <div className="w-full max-w-sm mx-auto">
          <div className="mb-6 lg:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Verify Your Identity
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Please input the verification code sent to your email
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex justify-center space-x-2 sm:space-x-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  className="w-10 h-10 sm:w-12 sm:h-12 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-lg font-medium sm:text-base"
                  maxLength="1"
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-3 mt-4 rounded-lg font-medium hover:bg-primary transition-colors text-sm sm:text-base"
              disabled={isLoading}
            >
              {isLoading ? "Verifying..." : "Verify Code"}
            </button>

            <div className="text-center">
              <Link
                to="/forget-password"
                className="text-primary text-sm sm:text-base"
              >
                Resend Code
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
