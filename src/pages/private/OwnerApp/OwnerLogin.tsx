import React, { useEffect, useState } from "react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/logos/LogoDD-removebg.png";
import api from "../../../utils/axiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { login, setUser } from "../../../features/authSlice";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { RootState } from "../../../app/store";
import { DrivingSchool } from "../../../interfaces/models";

const OwnerLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const owner = useSelector(
    (state: RootState) => state.auth.user,
  ) as DrivingSchool | null;
  const userRole = useSelector((state: RootState) => state.auth.role) as
    | string
    | null;

  useEffect(() => {
    // Redirect to school dashboard if already logged in
    if (owner) {
      if (owner.role === "school" || userRole === "school") {
        navigate("/school");
        window.location.reload();
      }
    }
  }, [owner, userRole]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/driving/login", {
        email,
        password,
      });
      if (response.data.success) {
        dispatch(
          login({
            status: true,
            user: response.data.user,
            accessToken: response.data.accessToken,
            role: "school",
          }),
        );
        try {
          const getFullUser = await api.get("/users/current-user");
          if (getFullUser.data.success) {
            dispatch(setUser(getFullUser.data.user));
          } else {
            console.error("Failed to fetch full user details");
          }
        } catch (error) {
          console.error(
            "Failed to fetch full user details, something is wrong in sending request:",
            error,
          );
        }
        navigate("/school");
        window.location.reload();
      } else {
        console.error(
          response.data.message ||
            "Login failed. Please check your credentials.",
        );
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login attempt failed:", error); // Log the full error for debugging
      if (
        error instanceof AxiosError &&
        error.response &&
        error.response.data
      ) {
        // If the server provides a specific message in error.response.data.message
        if (error.response.data.message) {
          toast.error(String(error.response.data.message).toLocaleUpperCase());
        } else {
          // Fallback if error.response.data is present but no .message field
          toast.error(
            `Login failed: ${error.response.statusText || "Server error"} (Status: ${error.response.status})`,
          );
        }
      } else {
        // For non-Axios errors or Axios errors without a response (e.g., network error)
        toast.error(
          "Login failed due to a network or server issue. Please try again later.",
        );
      }
    }
  };

  // const handleGoogleSignIn = () => {
  //   // TODO: Add Google sign-in functionality
  //   console.log("Google sign-in attempted");
  // };

  const handleForgotPassword = () => {
    // TODO: Add forgot password functionality
    console.log("Forgot password clicked");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {/* Back Button */}
        <div className="flex justify-start mt-4">
          <Link
            to="/"
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Header */}
        <div className="text-center">
          <div className="mx-auto w-28 h-28 mb-6 bg-gray-50 rounded-full flex items-center justify-center">
            <img src={logo} alt="Logo" className="w-28 h-28" />
          </div>
          <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            Driving School Login Page
          </h2>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Sign in to access your school dashboard
          </p>
        </div>

        {/* Login Form Container */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 md:p-8 space-y-6">
          {/* Google Sign In */}
          {/* <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button> */}
          {/* Divider */}
          {/* <div className="flex items-center gap-4">
            <div className="flex-1 border-t border-gray-200 dark:border-gray-700"></div>
            <span className="text-sm text-gray-500">Or</span>
            <div className="flex-1 border-t border-gray-200 dark:border-gray-700"></div>
          </div> */}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 px-4 py-3 text-gray-700 dark:text-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition-colors"
                placeholder="Enter your email"
                required
              />
            </div>
            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Password
              </label>
              <div className="flex items-center">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-1 rounded-l-lg border border-r-0 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 px-4 py-3 text-gray-700 dark:text-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition-colors"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="rounded-r-lg border border-l-0 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 px-3 py-3 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              {/* <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 text-sm text-gray-600 dark:text-gray-400"
                >
                  Remember me
                </label>
              </div> */}
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full rounded-lg bg-yellow-400 hover:bg-yellow-500 px-4 py-3 font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-colors"
            >
              Sign In
            </button>
          </form>

          {/* Additional Info */}
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have a driving school account?{" "}
              <Link
                to="/contact"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Contact us
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Info */}
        {/* <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            By signing in, you agree to our{' '}
            <Link to="/terms" className="text-blue-600 dark:text-blue-400 hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default OwnerLogin;
