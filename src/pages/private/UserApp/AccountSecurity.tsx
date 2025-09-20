import React, { useState, useEffect } from "react";
import { Eye, EyeOff, Check, X } from "lucide-react";
import api from "../../../utils/axiosInstance";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { logout } from "../../../features/authSlice";
import { useNavigate } from "react-router-dom";

interface PasswordRequirement {
  regex: RegExp;
  text: string;
  met: boolean;
}

interface AccountSecurityProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const AccountSecurity: React.FC<AccountSecurityProps> = ({ isOpen = true }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const handleUpdatePassword = async () => {
    try {
      if (requirements.every((req) => req.met)) {
        if (!oldPassword || !newPassword) {
          toast.error("Please fill all the fields");
          return;
        }
        setLoading(true);
        const response = await api.post("/users/change-password", {
          oldPassword: oldPassword,
          newPassword: newPassword,
        });
        if (!response.data.success) {
          toast.error("failed to update password ");
          setLoading(false);
          return;
        }
        setNewPassword("");
        setOldPassword("");
        toast.success("Password updated successfully");
        const response2 = await api.post("/users/logout");
        if (response2.data.success) {
          dispatch(logout());
          toast.success("Logout successful");
          navigate("/");
        } else {
          toast.error("failed to logout , please logout from header");
        }
        console.log("Password updated successfully");
      }
    } catch (error: any) {
      console.error(error);
      const message =
        error?.response?.data?.message ||
        "passoword change failed. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  if (isOpen) {
    return (
      <div className="bg-gray-50 dark:bg-gray-950 z-50 rounded-lg py-8 px-4 sm:px-6 lg:px-8 font-satoshi">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              Account Security
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Secure your account by following these steps
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                New Password
              </h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Old Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white pr-10"
                    placeholder="Enter old password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
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
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white pr-10"
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password requirements:
                </p>
                <ul className="space-y-2">
                  {requirements.map((req, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      {req.met ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <X className="w-4 h-4 text-red-500" />
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
                disabled={!requirements.every((req) => req.met) || loading}
                className={`w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white font-medium py-2 rounded-lg transition-colors ${loading ? "cursor-not-allowed bg-yellow-200" : ""}`}
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default AccountSecurity;
