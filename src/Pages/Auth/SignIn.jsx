import { useState, useContext } from "react";
import logo from "../../assets/images/logo.png";
import robot from "../../assets/images/robot.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../Stores/authSlice";
import { useLoginMutation } from "../../Api/authapi";
import toast from "react-hot-toast";
import { AuthContext } from "../../Provider/AuthProvider";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const { handleGoogleLogin } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await login({ username: email, password }).unwrap();
      dispatch(
        setCredentials({
          access: result.access,
          refresh: result.refresh,
          user: { email },
        })
      );
     
      navigate("/");
    } catch (error) {
      const errorMsg =
        error?.data?.non_field_errors?.[0] ||
        error?.data?.message ||
        error?.error;
      if (errorMsg) {
        toast.error(errorMsg);
      }
    }
  };
  const handleSocialLogin = () => {
    handleGoogleLogin().then(async (res) => {
      try {
        const result = await login({
          username: res.user.email,
          password: res.user.uid,
        }).unwrap();
        dispatch(
          setCredentials({
            access: result.access,
            refresh: result.refresh,
            user: { email: res.user.email, fullName: res.user.displayName },
            profilePicture: res.user.photoURL,
          })
        );
      
        navigate("/");
      } catch (error) {
        const errorMsg =
          error?.data?.non_field_errors?.[0] ||
          error?.data?.message ||
          error?.error;
        if (errorMsg) {
          toast.error(errorMsg);
        }
      }
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

      {/* Left Side - Sign In Form */}
      <div className="flex-1 lg:w-1/2 bg-white p-4 sm:p-6 my-10 md:my-0 justify-center flex flex-col items-center">
        {/* Logo - Mobile */}
              <Link to="/" className="">
                <div className="p-4 lg:p-8">
                  <img src={logo} alt="logo" className="w-24 md:w-40" />
                </div>
              </Link>
        <div className="w-full max-w-md mx-auto">
          {/* Sign In Header */}
          <div className="mb-6 xl:mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Sign in
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Don't have an account?
              <Link to="/register" className="text-primary underline ml-1">
                Create Now
              </Link>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block font-medium text-gray-700 mb-1 text-sm sm:text-base"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block font-medium text-gray-700 mb-1 text-sm sm:text-base"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent pr-10 text-sm sm:text-base"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {showPassword ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
              {/* <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-gray-700 text-sm sm:text-base"
                >
                  Remember me
                </label>
              </div> */}
              <Link
                to="/forget-password"
                className="text-primary hover:underline text-sm sm:text-base"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full bg-primary text-white py-2 sm:py-3 px-4 rounded-md hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition duration-200 text-sm sm:text-base font-medium"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>

            {/* Google Sign In */}
            <button
              onClick={handleSocialLogin}
              type="button"
              className="w-full bg-white border border-gray-300 text-gray-700 py-2 sm:py-3 px-4 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition duration-200 flex items-center justify-center space-x-2 text-sm sm:text-base"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
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
              <span>Continue with Google</span>
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
