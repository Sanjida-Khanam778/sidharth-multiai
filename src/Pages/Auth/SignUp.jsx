import { useContext, useState } from "react";
import logo from "../../assets/images/logo.png";
import robot from "../../assets/images/robot.png";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "../../Api/authapi";
import { setCredentials } from "../../Stores/authSlice";
import toast from "react-hot-toast";
import { AuthContext } from "../../Provider/AuthProvider";

export default function SignUp() {
  const { handleGoogleLogin } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await register({
        full_name: fullName,
        email,
        password,
      }).unwrap();
      toast.success(result.message || "Registration successful!");
      navigate("/login");
    } catch (error) {
      const errorMsg =
        error?.data?.message ||
        error?.error ||
        "Registration failed. Please try again.";
      if (errorMsg === "User with this email already exists.") {
        toast.error(errorMsg);
      }
    }
  };

  const handleSocialLogin = () => {
    handleGoogleLogin()
      .then(async (res) => {
        try {
          const result = await register({
            full_name: res.user.displayName,
            email: res.user.email,
            password: res.user.uid,
          }).unwrap();
          // dispatch(
          //   setCredentials({
          //     access: result.access,
          //     refresh: result.refresh,
          //     user: { email: res.user.email, fullName: res.user.displayName },
          //     profilePicture: res.user.photoURL,
          //   })
          // );

          navigate("/login");
        } catch (error) {
          const errorMsg =
            error?.data?.message ||
            error?.error ||
            "Registration failed. Please try again.";
          toast.error(errorMsg);
        }
      })
      .catch((err) => {
        toast.error("Google login failed. Please try again.");
      });
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row font-manrope">
      {/* Robot Image - Mobile (below navbar) */}
      <div className="lg:hidden bg-gradient-to-br from-blue-400 to-primary h-64 sm:h-80 flex items-center justify-center relative overflow-hidden">
        <div className="h-80 sm:h-96">
          <img src={robot} alt="robot" className="w-full h-full object-cover" />
        </div>
        {/* Background Decorative Elements */}
        <div className="absolute top-8 left-8 w-4 h-4 bg-white bg-opacity-20 rounded-full"></div>
        <div className="absolute bottom-16 right-8 w-6 h-6 bg-white bg-opacity-15 rounded-full"></div>
        <div className="absolute top-1/3 right-16 w-3 h-3 bg-white bg-opacity-25 rounded-full"></div>
      </div>

      {/* Left Side - Sign Up Form */}
      <div className="flex-1 lg:w-1/2 bg-white justify-center p-4 sm:p-6 flex flex-col items-center">
        {/* Logo - Mobile */}
        <Link to="/" className="">
          <div className="p-4 lg:p-8">
            <img src={logo} alt="logo" className="w-24 md:w-40" />
          </div>
        </Link>
        <div className="w-full max-w-md mx-auto">
          <div className="mb-6 md:mb-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 md:mb-1">
              Welcome to BioQuery AI
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Already have an account?
              <Link
                to="/login"
                className="text-primary hover:text-primary font-medium ml-1"
              >
                Sign In
              </Link>
            </p>
          </div>

          <div className="mb-6 md:mb-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
              Create your account
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Please enter your details to get started
            </p>
          </div>

          <button
            onClick={handleSocialLogin}
            type="button"
            className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors mb-6 text-sm sm:text-base"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-2 bg-white text-gray-500 text-sm">OR</span>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block font-medium text-gray-700 text-sm sm:text-base">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm sm:text-base"
                required
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-2 text-sm sm:text-base">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm sm:text-base"
                required
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-2 text-sm sm:text-base">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none pr-12 text-sm sm:text-base"
                  required
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

            {/* <div className="flex items-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-600 text-sm sm:text-base">
                Remember me
              </span>
            </div> */}

            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary transition-colors text-sm sm:text-base"
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>

      {/* Right Side - Robot Illustration - Desktop Only */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-400 to-primary items-center justify-center relative overflow-hidden">
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
