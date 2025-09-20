import React, { useState, useEffect } from "react";
import { Eye, EyeOff, ArrowLeft, Check, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import api from "../../../utils/axiosInstance";

interface PasswordRequirement {
  regex: RegExp;
  text: string;
  met: boolean;
}

interface SetNewPasswordProps {
  isOpen?: boolean;
  onClose?: () => void;
  onPasswordUpdate?: (password: string) => void;
  title?: string;
  subtitle?: string;
}

const SetNewPassword: React.FC<SetNewPasswordProps> = ({
  isOpen = true,
  onClose,
  onPasswordUpdate,
  title = "Set New Password",
  subtitle = "Create a secure password for your account",
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Form fields
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Password requirements
  const [requirements, setRequirements] = useState<PasswordRequirement[]>([
    { regex: /.{8,}/, text: "At least 8 characters", met: false },
    {
      regex: /(?=.*[a-z])(?=.*[A-Z])/,
      text: "Include uppercase & lowercase letters",
      met: false,
    },
    { regex: /\d/, text: "Include at least one number", met: false },
    {
      regex: /[!@#$%^&*(),.?":{}|<>]/,
      text: "Include at least one special character",
      met: false,
    },
  ]);

  // Password validation
  useEffect(() => {
    setRequirements((prev) =>
      prev.map((req) => ({
        ...req,
        met: req.regex.test(newPassword),
      })),
    );
  }, [newPassword]);

  const isPasswordValid = requirements.every((req) => req.met);
  const isConfirmPasswordValid =
    newPassword === confirmPassword && confirmPassword.length > 0;
  const isFormValid = isPasswordValid && isConfirmPasswordValid;

  const handleUpdatePassword = async () => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (!token) {
      toast.error("Invalid token");
      return;
    }
    if (!isFormValid) return;

    setIsLoading(true);
    try {
      // Add password update logic here
      if (onPasswordUpdate) {
        onPasswordUpdate(newPassword);
      }
      const response = await api.post("/users/reset-password", {
        token: token,
        newPassword: newPassword,
      });
      if (!response.data.success) {
        toast.error("Failed to update password");
        setIsLoading(false);
        return;
      }
      toast.success("Password updated successfully");
      console.log("Password updated successfully");

      // You can add success notification here
    } catch (error) {
      console.error("Password update failed:", error);
      // You can add error notification here
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    if (onClose) {
      onClose(); // Call the onClose function if provided
    } else {
      // Check the current URL and navigate accordingly
      if (location.pathname.includes("/instructor")) {
        navigate("/instructor-login");
      } else if (location.pathname.includes("/coordinator")) {
        navigate("/coordinator-login");
      } else if (location.pathname.includes("/school")) {
        navigate("/school-login");
      } else {
        navigate("/"); // Default fallback
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 z-50 rounded-lg py-8 px-4 sm:px-6 lg:px-8 font-satoshi min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {title}
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">{subtitle}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 space-y-6">
          {/* New Password Step */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Create Password
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white pr-10 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
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
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white pr-10 focus:ring-2 focus:border-transparent ${
                    confirmPassword.length > 0
                      ? isConfirmPasswordValid
                        ? "border-green-300 dark:border-green-600 focus:ring-green-500 dark:focus:ring-green-400"
                        : "border-red-300 dark:border-red-600 focus:ring-red-500 dark:focus:ring-red-400"
                      : "border-gray-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-blue-400"
                  }`}
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {confirmPassword.length > 0 && !isConfirmPasswordValid && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  Passwords do not match
                </p>
              )}
              {confirmPassword.length > 0 && isConfirmPasswordValid && (
                <p className="mt-1 text-sm text-green-600 dark:text-green-400">
                  Passwords match
                </p>
              )}
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Password requirements:
              </p>
              <ul className="space-y-2">
                {requirements.map((req, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    {req.met ? (
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    ) : (
                      <X className="w-4 h-4 text-red-500 flex-shrink-0" />
                    )}
                    <span
                      className={
                        req.met
                          ? "text-green-700 dark:text-green-400"
                          : "text-gray-600 dark:text-gray-400"
                      }
                    >
                      {req.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={handleUpdatePassword}
              disabled={!isFormValid || isLoading}
              className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Updating Password...
                </div>
              ) : (
                "Update Password"
              )}
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={handleBackToLogin}
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 rounded-md px-2 py-1"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetNewPassword;
