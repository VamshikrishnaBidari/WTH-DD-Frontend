import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { useState, useEffect } from "react";
import { ChevronDown, Download, X } from "lucide-react";
import { InteractiveHoverButton } from "./magicui/interactive-hover-button";
import { ThemeToggle } from "../utils/ThemeToggle.tsx";
import { NavLink } from "react-router-dom";
import textLogo from "../assets/logos/DD_text-removebg.png";
import onlyLogo from "../assets/logos/only_logo-removebg.png";
import AuthModal from "./AuthModal";
import InstallInstructionDialog from "./InstallInstructionDialog";
import { useNavigate } from "react-router-dom";
import api from "../utils/axiosInstance.ts";
import { usePWA } from "../hooks/usePWA"; 

const coursesAndSupport = [
  {
    name: "4-Wheeler Driving Course",
    description: "Learn four-wheeler driving",
    scrollTo: "scrollToCourse4Wheeler",
  },
  {
    name: "2-Wheeler Driving Course",
    description: "Learn two-wheeler driving",
    scrollTo: "scrollToCourse2Wheeler",
  },
  {
    name: "Advanced Skills",
    description: "Master driving skills and be safe.",
    scrollTo: "scrollToCourseAdvanced",
  },
  {
    name: "Licensing",
    description: "Get your license done",
    scrollTo: "scrollToCourseLicensing",
  },
];

export default function Header() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isLoginProp, setIsLoginProp] = useState<boolean>(true);
  const [switchCTA, setSwitchCTA] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [showInstructionDialog, setShowInstructionDialog] = useState<boolean>(false);
  const navigate = useNavigate();
  const { isInstalled, installApp, isMockPrompt } = usePWA();
  const [isInstalling, setIsInstalling] = useState<boolean>(false);

  const handleInstallApp = async () => {
    if (isInstalled) {
      return;
    }

    setIsInstalling(true);
    try {
      const success = await installApp();
      if (success) {
        console.log('✅ App install triggered from header');
        
        // If it's a mock prompt, show instruction dialog
        if (isMockPrompt) {
          setShowInstructionDialog(true);
        }
        // For real prompts, the native install dialog shows automatically
      } else {
        console.log('❌ Installation cancelled or failed');
      }
    } catch (error) {
      console.error('❌ Installation error:', error);
    } finally {
      setIsInstalling(false);
    }
  };

  const handleCloseInstructionDialog = () => {
    setShowInstructionDialog(false);
  };

  // Function to handle smooth scrolling using global functions
  const scrollToSection = (sectionName: string) => {
    // @ts-ignore
    if (window[sectionName]) {
      // @ts-ignore
      window[sectionName]();
    }
  };

  const getCurrentUser = async () => {
    try {
      const response = await api.get("/users/current-user");
      if (response.data.success) {
        // console.log("Current user:", response.data.user);
        if (response.data.user.role) {
          setSwitchCTA(true);
          setUserRole(response.data.user.role);
        } else {
          setSwitchCTA(false);
        }
      }
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };

  useEffect(() => {
    // Check if user is logged in and set switchCTA accordingly
    getCurrentUser();
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-sm dark:bg-zinc-950">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <Disclosure as="nav">
            {({ open, close }) => (
              <>
                <div className="flex justify-between items-center h-16">
                  {/* Logo */}
                  <NavLink to="/" className="hidden lg:flex">
                    <div className="flex-shrink-0 flex items-center">
                      <img src={onlyLogo} alt="Logo" width={40} />
                      <img src={textLogo} alt="TextLogo" width={110} />
                    </div>
                  </NavLink>
                  <NavLink to="/" className="flex lg:hidden">
                    <div className="flex-shrink-0 flex items-center">
                      <img src={onlyLogo} alt="Logo" width={40} />
                    </div>
                  </NavLink>
                  <NavLink to="/" className="flex lg:hidden">
                    <div className="flex-shrink-0 flex items-center">
                      <img
                        src={textLogo}
                        alt="TextLogo"
                        width={110}
                        className="ml-2 block lg:hidden"
                      />
                    </div>
                  </NavLink>

                  {/* Navigation */}
                  <nav className="hidden lg:flex space-x-8 font-satoshi">
                    <button
                      className="text-gray-700 dark:text-gray-300 hover:text-main dark:hover:text-mainLight"
                      onClick={() => scrollToSection("scrollToHome")}
                    >
                      Home
                    </button>

                    <Popover className="relative">
                      {({ open, close }) => (
                        <>
                          <PopoverButton className="group inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-main dark:hover:text-mainLight">
                            <span>Courses And Support</span>
                            <ChevronDown
                              className={`ml-2 h-4 w-4 transition ${open ? "transform rotate-180" : ""}`}
                            />
                          </PopoverButton>
                          <PopoverPanel className="absolute z-10 w-screen max-w-xs px-2 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0">
                            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                              <div className="relative grid gap-6 bg-white dark:bg-zinc-800 p-6">
                                {coursesAndSupport.map((item) => (
                                  <button
                                    key={item.name}
                                    onClick={() => {
                                      scrollToSection(item.scrollTo);
                                      close();
                                    }}
                                    className="flex items-start p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700 text-left"
                                  >
                                    <div className="ml-4">
                                      <p className="text-sm font-satoshi font-medium text-gray-900 dark:text-gray-100">
                                        {item.name}
                                      </p>
                                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                        {item.description}
                                      </p>
                                    </div>
                                  </button>
                                ))}
                              </div>
                            </div>
                          </PopoverPanel>
                        </>
                      )}
                    </Popover>

                    <button
                      className="text-gray-700 dark:text-gray-300 hover:text-main dark:hover:text-mainLight"
                      onClick={() => scrollToSection("scrollToAbout")}
                    >
                      About
                    </button>
                  </nav>

                  {/* Right section */}
                  <div className="hidden lg:flex items-center space-x-3">
                    {!switchCTA && (
                      <button
                        className="font-satoshi px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-main dark:hover:text-mainLight rounded-lg"
                        onClick={() => {
                          setIsAuthModalOpen(true);
                          setIsLoginProp(true);
                        }}
                      >
                        Login
                      </button>
                    )}
                    <InteractiveHoverButton
                      className="dark:bg-main dark:text-white bg-light font-satoshi"
                      onClick={() => {
                        if (switchCTA && userRole === "user") {
                          navigate("/user");
                          window.location.reload();
                        } else if (switchCTA && userRole === "instructor") {
                          navigate("/instructor");
                          window.location.reload();
                        } else if (switchCTA && userRole === "operator") {
                          navigate("/coordinator");
                          window.location.reload();
                        } else if (switchCTA && userRole === "school") {
                          navigate("/school");
                          window.location.reload();
                        } else {
                          setIsAuthModalOpen(true);
                          setIsLoginProp(false);
                        }
                      }}
                    >
                      {switchCTA ? "Go to Dashboard" : "Enroll Now"}
                    </InteractiveHoverButton>
                    <ThemeToggle />
                  </div>

                  {/* Mobile menu button */}
                  <div className="lg:hidden flex items-center space-x-4">
                    <ThemeToggle />
                    <DisclosureButton className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-main dark:hover:text-mainLight">
                      {open ? (
                        <X className="h-6 w-6" />
                      ) : (
                        <svg
                          className="h-6 w-6"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                          />
                        </svg>
                      )}
                    </DisclosureButton>
                  </div>
                </div>

                {/* Mobile menu panel */}
                <div className={`${open ? "fixed inset-0 z-50" : "hidden"}`}>
                  {/* Dark overlay */}
                  <div
                    className={`fixed inset-0 min-h-screen bg-black/60 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
                  />

                  {/* Menu panel */}
                  <DisclosurePanel
                    className={`fixed right-0 top-0 h-screen w-[80%] max-w-sm bg-light dark:bg-zinc-900 shadow-xl transform transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "translate-x-full"}`}
                  >
                    <div className="flex justify-end p-4">
                      <DisclosureButton className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-main dark:hover:text-mainLight">
                        <X className="h-6 w-6" />
                      </DisclosureButton>
                    </div>
                    <div className="px-4 pt-2 pb-3 space-y-1 overflow-y-auto font-satoshi max-h-[calc(100vh-5rem)]">
                      <button
                        className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-main dark:hover:text-mainLight hover:bg-gray-50 dark:hover:bg-zinc-800"
                        onClick={() => {
                          scrollToSection("scrollToHome");
                          close();
                        }}
                      >
                        Home
                      </button>
                      <Disclosure>
                        {({ open }) => (
                          <>
                            <DisclosureButton className="flex justify-between w-full px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-main dark:hover:text-mainLight hover:bg-gray-50 dark:hover:bg-zinc-800 rounded-md">
                              <span>Courses And Support</span>
                              <ChevronDown
                                className={`${open ? "transform rotate-180" : ""} w-5 h-5`}
                              />
                            </DisclosureButton>
                            <DisclosurePanel className="px-4 pt-2 pb-2 space-y-1">
                              {coursesAndSupport.map((item) => (
                                <button
                                  key={item.name}
                                  onClick={() => {
                                    scrollToSection(item.scrollTo);
                                    close();
                                  }}
                                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-500 dark:text-gray-400 hover:text-main dark:hover:text-mainLight hover:bg-gray-50 dark:hover:bg-zinc-800"
                                >
                                  {item.name}
                                </button>
                              ))}
                            </DisclosurePanel>
                          </>
                        )}
                      </Disclosure>
                      <button
                        className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-main dark:hover:text-mainLight hover:bg-gray-50 dark:hover:bg-zinc-800"
                        onClick={() => {
                          scrollToSection("scrollToAbout");
                          close();
                        }}
                      >
                        About
                      </button>
                      <div className="pt-4 pb-3 border-t border-gray-200 dark:border-zinc-700">
                        <div className="space-y-2">
                          {!switchCTA && (
                            <button
                              className="w-full px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-main dark:hover:text-mainLight hover:bg-gray-50 dark:hover:bg-zinc-800 rounded-md"
                              onClick={() => {
                                setIsAuthModalOpen(true);
                                setIsLoginProp(true);
                              }}
                            >
                              Login
                            </button>
                          )}
                          {(!isInstalled) && (
                            <button
                              className="w-full px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-main dark:hover:text-mainLight hover:bg-gray-50 dark:hover:bg-zinc-800 rounded-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                              onClick={handleInstallApp}
                              disabled={isInstalling}
                            >
                              {isInstalling ? (
                                <>
                                  <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
                                  <span>Installing...</span>
                                </>
                              ) : (
                                <>
                                  <Download className="h-4 w-4" />
                                  <span>Install App</span>
                                </>
                              )}
                            </button>
                          )}
                          <button
                            className="w-full px-3 py-2 text-base font-medium text-white bg-main dark:bg-mainDark hover:bg-mainDarkest dark:hover:bg-mainDarkest rounded-md transition-colors duration-200"
                            onClick={() => {
                              if (switchCTA && userRole === "user") {
                                navigate("/user");
                                window.location.reload();
                              } else if (
                                switchCTA &&
                                userRole === "instructor"
                              ) {
                                navigate("/instructor");
                                window.location.reload();
                              } else if (switchCTA && userRole === "operator") {
                                navigate("/coordinator");
                                window.location.reload();
                              } else if (switchCTA && userRole === "school") {
                                navigate("/school");
                                window.location.reload();
                              } else {
                                setIsAuthModalOpen(true);
                                setIsLoginProp(false);
                              }
                            }}
                          >
                            {switchCTA ? "Go to Dashboard" : "Enroll Now"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </DisclosurePanel>
                </div>
              </>
            )}
          </Disclosure>
        </div>
      </header>

      {isAuthModalOpen && (
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          isLoginProp={isLoginProp}
        />
      )}

      {showInstructionDialog && (
        <InstallInstructionDialog
          isOpen={showInstructionDialog}
          onClose={handleCloseInstructionDialog}
        />
      )}
    </>
  );
}
