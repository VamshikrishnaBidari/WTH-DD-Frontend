import React, { useEffect, useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import api from "../utils/axiosInstance";
import { login } from "../features/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import logo from "../assets/logos/LogoDD-removebg.png";
import { countries } from "country-data";
import { registerPush } from "../utils/registerPush";

interface CountryCode {
  code: string;
  name: string;
  dial_code: string;
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoginProp?: boolean;
}

const countryCodes: CountryCode[] = countries.all.map((c) => ({
  code: c.alpha2,
  dial_code: c.countryCallingCodes[0],
  name: c.name,
}));

// ForgotPassword Component
const ForgotPassword: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendResetEmail = async () => {
    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Add actual API call here later
      // await api.post('/users/forgot-password', { email });
      const response = await api.post("/users/reset-password-request2", {
        email: email,
      });
      // console.log(response);
      if (!response.data.success) {
        toast.error("failed to send email try again");
        setIsLoading(false);
        return;
      }
      toast.success(
        "Password reset email has been sent! Please check your inbox.",
      );
      setEmail(""); // Clear the form
      onClose(); // Close the component
    } catch (error) {
      toast.error("Failed to send reset email. Please try again.");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setEmail("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />
      <div className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-xl shadow-xl mx-4 p-6 md:p-8">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
        >
          <X size={24} />
        </button>

        <div className="mb-8">
          <div className="mx-auto w-20 h-20 mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
            <span className="text-2xl">🔐</span>
          </div>
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 text-center">
            Reset Password
          </h2>
          <p className="mt-2 text-gray-500 dark:text-gray-400 text-center text-sm">
            Enter your email address and we'll send you a link to reset your
            password
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-gray-700 dark:text-gray-200 focus:border-blue-500 focus:ring-blue-500"
              autoFocus
            />
          </div>

          <button
            onClick={handleSendResetEmail}
            disabled={isLoading}
            className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-gray-900 disabled:text-gray-500 font-medium py-3 rounded-lg transition-colors"
          >
            {isLoading ? "Sending..." : "Send Reset Email"}
          </button>

          <button
            onClick={handleClose}
            className="w-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 text-sm py-2 transition-colors"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

const SignupOtpVerification: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onVerifySuccess: () => void;
  phoneNumber: string;
  countryCode: string;
  isGoogleFlow?: boolean;
  onBackToCompletion?: () => void;
}> = ({
  isOpen,
  onClose,
  onVerifySuccess,
  phoneNumber,
  countryCode,
  isGoogleFlow = false,
  onBackToCompletion,
}) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState("");

  // Auto-send OTP when component opens
  useEffect(() => {
    if (isOpen && phoneNumber && countryCode) {
      sendOTP();
    }
  }, [isOpen]); // Only trigger when isOpen changes

  // Countdown timer
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isOpen && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOpen, timer]);

  // Handle OTP input change
  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        const nextInput = document.getElementById(`signup-otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  // Real Firebase OTP Verification
  const handleVerifyOtp = async () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }
    if (!sessionId) {
      toast.error("OTP session not initialized. Please wait or resend OTP.");
      return;
    }

    setIsLoading(true);
    try {
      console.log(sessionId);
      console.log(otpString);
      const response = await api.post("/otp/verify-otp", {
        sessionId: sessionId,
        otp: otpString,
      });
      if (!response.data.success) {
        toast.error("failed to verify OTP");
        return;
      }
      toast.success("Phone number verified!");
      onVerifySuccess(); // move to next step
    } catch (error) {
      toast.error("Invalid OTP. Please try again.");
      console.error("OTP verification failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendOTP = async () => {
    try {
      const fullPhone = `${countryCode}${phoneNumber}`;
      // console.log(phoneNumber);
      // console.log(countryCode);
      console.log(fullPhone);
      const response = await api.post("/otp/send-otp", {
        phone: fullPhone,
      });
      // console.log();
      if (!response.data.success) {
        toast.error("failed to send OTP");
        return;
      }
      setSessionId(response.data.sessionId);
      toast.success("OTP sent!");
      setTimer(30);
      setOtp(["", "", "", "", "", ""]);
    } catch (error) {
      toast.error("Failed to send OTP");
      console.error("sendOTP error:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
        <div className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-xl shadow-xl mx-4 p-6 md:p-8">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
          >
            <X size={24} />
          </button>

          <div className="mb-8">
            <div className="mx-auto w-20 h-20 mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <span className="text-gray-400">📱</span>
            </div>
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 text-center">
              Verify Phone Number
            </h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400 text-center text-sm">
              We've sent a 6-digit code to {countryCode} {phoneNumber}
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Enter OTP
              </label>
              <div className="flex justify-between gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`signup-otp-${index}`}
                    type="text"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-blue-500"
                    maxLength={1}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={handleVerifyOtp}
              disabled={isLoading}
              className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 text-white font-medium py-3 rounded-lg transition-colors"
            >
              {isLoading ? "Verifying..." : "Verify OTP"}
            </button>

            {isGoogleFlow && onBackToCompletion && (
              <button
                onClick={() => {
                  onClose();
                  onBackToCompletion();
                }}
                className="w-full text-gray-500 hover:text-gray-700 text-sm py-2"
              >
                ← Back to Profile Completion
              </button>
            )}

            <div className="text-center">
              {timer > 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Resend OTP in {timer}s
                </p>
              ) : (
                <button
                  onClick={sendOTP}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Resend OTP
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  isLoginProp = true,
}) => {
  const [isLogin, setIsLogin] = useState(isLoginProp);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [phNumber, setphNumber] = useState("");
  const [selectedCountryCode, setSelectedCountryCode] = useState(
    countryCodes[124],
  ); // Default to India
  const [gender, setGender] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [showGoogleSignupCompletion, setShowGoogleSignupCompletion] =
    useState(false);
  const [googleUserData, setGoogleUserData] = useState<GoogleUserData | null>(
    null,
  );
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  interface LoginData {
    email: string;
    password: string;
  }

  interface SignUpData {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    gender: string;
  }
  interface GoogleUserData {
    id?: string;
    name?: string;
    email?: string;
    phoneNumber: string;
    gender: string;
    accessToken?: string;
    [key: string]: any;
  }

  const loginData: LoginData = {
    email: email,
    password: password,
  };
  const signUpData: SignUpData = {
    name: name,
    email: email,
    password: password,
    phoneNumber: `${selectedCountryCode.dial_code}${phNumber}`,
    gender: gender,
  };

  if (!isOpen) return null;

  const verifyPassword = (pass: string, confirmPass: string): boolean => {
    if (pass !== confirmPass) {
      setPasswordError("Passwords do not match");
      return false;
    }
    if (pass.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const loginUser = async (data: LoginData) => {
    try {
      const response = await api.post("/users/sign-in", data);
      toast.success("Login successful!");
      return response.data;
    } catch (error: any) {
      // Safely access backend message
      const message =
        error?.response?.data?.message || "An unexpected error occurred.";

      toast.error(message); // Show the message from backend
      console.error("Login error:", error);
      return null;
    }
  };

  const signupUser = async (data: SignUpData) => {
    try {
      const response = await api.post("/users/sign-up2", data);

      toast.success("Signup successful!");
      return response.data;
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Signup failed. Please try again.";

      toast.error(message);
      console.error("Signup error:", error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLogin && !verifyPassword(password, confirmPassword)) {
      return;
    }

    try {
      if (isLogin) {
        const data = await loginUser(loginData);
        // console.log("data", data);
        if (data) {
          dispatch(
            login({
              status: true,
              user: data.user,
              accessToken: data.accessToken,
              role: "user",
            }),
          );

          await registerPush();
          navigate("/user");
        }
      } else {
        // For signup, show OTP verification first
        if (!isPhoneVerified) {
          try {
            setShowOtpVerification(true);
          } catch (error) {
            console.error("OTP setup/send error:", error);
          }
          return;
        }

        // Continue with signup process after OTP verification
        await proceedWithSignup();
      }
    } catch (error) {
      console.error("handleSubmit error:", error);
    }
  };

  // Extract signup logic into separate function
  const proceedWithSignup = async () => {
    try {
      const data = await signupUser(signUpData);
      if (data && data.success) {
        const loginuser = await loginUser(loginData);
        if (loginuser && loginuser.success) {
          dispatch(
            login({
              status: true,
              user: loginuser.user,
              accessToken: loginuser.accessToken,
              role: "user",
            }),
          );
          try {
            const updateUserResponse = await api.post("/users/update-user", {
              id: loginuser.user.id,
              data: {
                schoolId: import.meta.env.VITE_SCHOOL_ID,
              },
            });
            if (updateUserResponse.data.success) {
              console.log("schoolId has been set successfully");
              navigate("/user/courses");            }
          } catch (error) {
            console.error("Error setting schoolId for user:", error);
          }
        } else {
          console.log(loginuser.message);
        }
      } else {
        console.log(data.message);
        navigate("/");
      }
    } catch (error) {
      console.error("proceedWithSignup error:", error);
    }
  };

  const handleOtpVerificationSuccess = () => {
    setIsPhoneVerified(true);
    setShowOtpVerification(false);

    // Check if this is Google signup completion flow
    if (googleUserData) {
      // Complete Google signup after OTP verification
      completeGoogleSignup();
      console.log("complete google");
      setGoogleUserData(null);
    } else {
      // Automatically proceed with regular signup after verification
      console.log("regular signup");
      proceedWithSignup();
    }
  };

  const handleGoogleSignupCompletion = (
    phone: string,
    genderValue: string,
    country: CountryCode,
  ) => {
    // Update Google user data with additional info
    setGoogleUserData({
      ...googleUserData,
      phoneNumber: `${country.dial_code}${phone}`,
      gender: genderValue,
    });

    // Set form state for OTP verification
    setphNumber(phone);
    setSelectedCountryCode(country);
    setGender(genderValue);
    setShowGoogleSignupCompletion(false);
    setShowOtpVerification(true);
  };

  const completeGoogleSignup = async () => {
    try {
      if (!googleUserData) {
        toast.error("Google user data not found");
        return;
      }
      const response = await api.post("/users/update-user", {
        id: googleUserData.id,
        data: {
          phoneNumber: googleUserData.phoneNumber,
          gender: googleUserData.gender,
          schoolId: import.meta.env.VITE_SCHOOL_ID,
        },
      });

      if (response.data.success) {
        toast.success("Account setup completed successfully!");
        if (!googleUserData.accessToken) {
          toast.error("Access token not found");
          return;
        }

        // Log the user in with the completed data
        dispatch(
          login({
            status: true,
            user: response.data.user,
            accessToken: googleUserData.accessToken,
            role: "user",
          }),
        );

        // Reset state
        setGoogleUserData(null);
        setShowGoogleSignupCompletion(false);
        setShowOtpVerification(false);
        setIsPhoneVerified(false);

        navigate("/user/courses");
      } else {
        toast.error(response.data.message || "Failed to complete signup");
      }
    } catch (error) {
      toast.error("Failed to complete Google signup. Please try again.");
      console.error("Google signup completion error:", error);
    }
  };

  // GoogleSignupCompletion Component
  const GoogleSignupCompletion: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onComplete: (phone: string, gender: string, country: CountryCode) => void;
    userName: string;
  }> = ({ isOpen, onClose, onComplete, userName }) => {
    const [phone, setPhone] = useState("");
    const [selectedGender, setSelectedGender] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const india = countryCodes.find((c) => c.code === "IN");
    const [selectedCountry, setSelectedCountry] = useState<CountryCode>(
      india || countryCodes[1],
    );

    const handleComplete = async () => {
      if (!phone.trim() || !selectedGender) {
        toast.error("Please fill all required fields");
        return;
      }

      if (phone.length < 10) {
        toast.error("Please enter a valid phone number");
        return;
      }

      setIsLoading(true);
      try {
        onComplete(phone, selectedGender, selectedCountry);
      } catch (error) {
        toast.error("Something went wrong. Please try again.");
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
        <div className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-xl shadow-xl mx-4 p-6 md:p-8">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
          >
            <X size={24} />
          </button>

          <div className="mb-8">
            <div className="mx-auto w-20 h-20 mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <span className="text-gray-400">👋</span>
            </div>
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 text-center">
              Welcome, {userName}!
            </h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400 text-center text-sm">
              Complete your profile to get started
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Phone Number *
              </label>
              <div className="flex gap-2">
                <select
                  value={selectedCountry.dial_code}
                  onChange={(e) => {
                    const country = countryCodes.find(
                      (c) => c.dial_code === e.target.value,
                    );
                    if (country) setSelectedCountry(country);
                  }}
                  className="w-24 px-2 py-3 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 text-sm"
                >
                  {countryCodes.map((country) => (
                    <option
                      key={`${country.code}-${Math.random()}`}
                      value={country.dial_code}
                    >
                      {country.code} {country.dial_code}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  placeholder="Phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="flex-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-gray-700 dark:text-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Gender *
              </label>
              <select
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
                className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-gray-700 dark:text-gray-200 focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="" disabled>
                  Select gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <button
              onClick={handleComplete}
              disabled={isLoading}
              className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 text-white font-medium py-3 rounded-lg transition-colors mt-6"
            >
              {isLoading ? "Processing..." : "Continue & Verify Phone"}
            </button>

            <button
              onClick={onClose}
              className="w-full text-gray-500 hover:text-gray-700 text-sm py-2"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
        <div
          className={`${showForgotPassword ? "hidden" : ""} relative w-full max-w-md bg-white dark:bg-gray-900 rounded-xl shadow-xl mx-4 mt-auto p-6 md:p-8`}
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
          >
            <X size={24} />
          </button>

          <div className="mb-8">
            <div className="mx-auto w-28 h-28 mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <img src={logo} alt="Logo" className="w-28 h-28" />
            </div>
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 text-center">
              {isLogin ? "Welcome Back" : "Create an account"}
            </h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400 text-center text-sm">
              {isLogin
                ? "Sign in to continue to your account"
                : "Sign up to get started"}
            </p>
          </div>

          <button className="w-full mb-6 flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-gray-700 dark:text-gray-200 transition-colors">
            {/* <img src="https://www.google.com/favicon.ico" alt="Google" className="h-5 w-5" />
          Continue with Google */}
            <GoogleLogin
              text={isLogin ? "signin_with" : "signup_with"}
              width={310}
              theme="filled_blue"
              onSuccess={async (credentialResponse) => {
                try {
                  const res = await api.post("/users/google", {
                    credential: credentialResponse.credential,
                  });

                  if (res.data.success) {
                    // Check if user is new and needs to complete profile
                    if (res.data.isNewUser) {
                      // Store Google user data for completion flow
                      setGoogleUserData({
                        ...res.data.user,
                        accessToken: res.data.accessToken,
                        refreshToken: res.data.refreshToken,
                      });
                      setShowGoogleSignupCompletion(true);
                    } else {
                      // Existing user - proceed with login
                      dispatch(
                        login({
                          status: true,
                          user: res.data.user,
                          accessToken: res.data.accessToken,
                          role: "user",
                        }),
                      );
                      navigate("/user");
                    }
                  } else {
                    toast.error(res.data.message || "Login failed");
                  }
                } catch (error) {
                  if (
                    error &&
                    typeof error === "object" &&
                    "response" in error &&
                    error.response !== null &&
                    typeof (error.response as any).status === "number"
                  ) {
                    if ((error.response as any).status >= 400) {
                      toast.error(
                        (error.response as any).data?.message ||
                          "Invalid credentials",
                      );
                    } else {
                      toast.error("Something went wrong. Please try again.");
                    }
                  } else {
                    toast.error("An unexpected error occurred.");
                  }

                  console.error("Google login error:", error);
                }
              }}
              onError={() => {
                console.log("Login Failed");
                toast.error("Failed to login. Try again.");
              }}
            />
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white dark:bg-gray-900 px-2 text-gray-500">
                Or
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-gray-700 dark:text-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
            )}{" "}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone Number
                </label>
                <div className="flex gap-2">
                  <select
                    value={selectedCountryCode.dial_code}
                    onChange={(e) => {
                      const country = countryCodes.find(
                        (c) => c.dial_code === e.target.value,
                      );
                      if (country) setSelectedCountryCode(country);
                    }}
                    className="w-24 px-2 py-3 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 text-sm"
                  >
                    {countryCodes.map((country) => (
                      <option
                        key={`${country.code}-${Math.random()}`}
                        value={country.dial_code}
                      >
                        {country.code} {country.dial_code}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    placeholder="Phone number"
                    value={phNumber}
                    onChange={(e) => setphNumber(e.target.value)}
                    className="flex-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-gray-700 dark:text-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-gray-700 dark:text-gray-200 focus:border-blue-500 focus:ring-blue-500"
            />{" "}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password (min 8 characters)"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (!isLogin) verifyPassword(e.target.value, confirmPassword);
                }}
                className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 pr-12 text-gray-700 dark:text-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {!isLogin && (
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    verifyPassword(password, e.target.value);
                  }}
                  className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 pr-12 text-gray-700 dark:text-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>{" "}
              </div>
            )}
            {!isLogin && passwordError && (
              <div className="text-red-500 text-sm mt-1">{passwordError}</div>
            )}
            {!isLogin && (
              <>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-gray-700 dark:text-gray-200 focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="" disabled>
                    Select gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </>
            )}
            {/* {!isLogin && (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="terms"
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-400">
                I have read and agree to the{' '}
                <a href="#" className="text-blue-600 hover:underline">
                  privacy policy and terms
                </a>
              </label>
            </div>
          )} */}
            {isLogin && (
              <div className="flex items-center justify-between">
                {/* <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                  Remember me
                </label>
              </div>               */}
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotPassword(true);
                    setPasswordError("");
                    setPassword("");
                    setConfirmPassword("");
                    setShowPassword(false);
                    setShowConfirmPassword(false);
                  }}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
            )}
            <button
              type="submit"
              className="w-full rounded-lg bg-yellow-400 px-4 py-3 font-semibold text-gray-900 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
            >
              {isLogin
                ? "Login"
                : isPhoneVerified
                  ? "Sign up"
                  : "Verify Phone & Sign up"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setPasswordError("");
                setPassword("");
                setConfirmPassword("");
                setShowPassword(false);
                setShowConfirmPassword(false);
                setIsPhoneVerified(false);
                setShowOtpVerification(false);
                setShowGoogleSignupCompletion(false);
                setGoogleUserData(null);
                setphNumber("");
                setGender("");
                setShowForgotPassword(false);
              }}
              className="text-blue-600 hover:underline"
            >
              {isLogin ? "Create account" : "Login"}
            </button>
          </p>
        </div>

        {showForgotPassword &&
          !showOtpVerification &&
          !showGoogleSignupCompletion &&
          !googleUserData && (
            <ForgotPassword
              isOpen={showForgotPassword}
              onClose={() => setShowForgotPassword(false)}
            />
          )}

        {showOtpVerification &&
          !showGoogleSignupCompletion &&
          !showForgotPassword && (
            <SignupOtpVerification
              isOpen={showOtpVerification}
              onClose={() => setShowOtpVerification(false)}
              onVerifySuccess={handleOtpVerificationSuccess}
              phoneNumber={phNumber}
              countryCode={selectedCountryCode.dial_code}
              isGoogleFlow={!!googleUserData}
              onBackToCompletion={() => {
                setShowOtpVerification(false);
                setShowGoogleSignupCompletion(true);
              }}
            />
          )}
        {showGoogleSignupCompletion &&
          googleUserData &&
          !showForgotPassword &&
          !showOtpVerification && (
            <GoogleSignupCompletion
              isOpen={showGoogleSignupCompletion}
              onClose={() => {
                setShowGoogleSignupCompletion(false);
                setGoogleUserData(null);
              }}
              onComplete={handleGoogleSignupCompletion}
              userName={googleUserData.name || "User"}
            />
          )}
      </div>
    </>
  );
};

export default AuthModal;
