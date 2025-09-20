import { Outlet, useLocation } from "react-router-dom";
import { Header, Footer, PWAInstallBanner, AuthModal } from "./components";
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./features/authSlice";
import { AppDispatch } from "./app/store";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import { usePWAContext } from "./hooks/usePWAContext";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Building2, UserRoundPen, FileBox } from 'lucide-react';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated = useSelector((state: RootState) => state.auth.status);
  const { isPWA, isInitialized } = usePWAContext();
  const [authLoading, setAuthLoading] = useState(true);
  const hasDispatchedAuth = useRef(false);
  
  // AuthModal state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoginProp, setIsLoginProp] = useState(true);

  useEffect(() => {
    if (!document.getElementById("recaptcha-container")) {
      const div = document.createElement("div");
      div.id = "recaptcha-container";
      document.body.appendChild(div);
    }
  }, []);

  // Initialize auth only ONCE
  useEffect(() => {
    if (!hasDispatchedAuth.current) {
      hasDispatchedAuth.current = true;
      console.log('Dispatching getCurrentUser (ONLY ONCE)');
      
      dispatch(getCurrentUser()).finally(() => {
        setAuthLoading(false);
      });
    }
  }, []);

  // Wait for both PWA detection AND auth to complete
  if (authLoading || !isInitialized) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-blue-200 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  // Portal Selection Data
  const portals = [
    {
      category: "User Portal:",
      items: [
        {
          name: "Learner",
          icon: <GraduationCap className="w-5 h-5" />,
          action: "auth", // This will trigger AuthModal
          description: "Students & License Seekers"
        }
      ]
    },
    {
      category: "Administrative Portal:",
      items: [
        {
          name: "Driving School",
          icon: <Building2 className="w-5 h-5" />,
          action: "navigate",
          route: "/school-login",
          description: "School Management"
        },
        {
          name: "Instructor",
          icon: <UserRoundPen className="w-5 h-5" />,
          action: "navigate",
          route: "/instructor-login",
          description: "Course Instructors"
        },
        {
          name: "Coordinator",
          icon: <FileBox className="w-5 h-5" />,
          action: "navigate",
          route: "/coordinator-login",
          description: "License Coordinators"
        }
      ]
    }
  ];

  const handlePortalSelect = (portal: any) => {
    if (portal.action === "auth") {
      // Check if user is already authenticated
      if (isAuthenticated && user) {
        // Redirect to user dashboard
        navigate("/user");
      } else {
        // Open AuthModal for login/signup
        setIsLoginProp(true); // Default to login
        setIsAuthModalOpen(true);
      }
    } else if (portal.action === "navigate") {
      // Navigate to other login pages
      navigate(portal.route);
    }
  };

  // PWA Logic: Handle authenticated users redirects
  if (isPWA && isAuthenticated && user && location.pathname === '/') {
    console.log('PWA: Redirecting authenticated user to dashboard, role:', user.role);
    const role = user.role;
    const dashboardRoutes = {
      'user': '/user',
      'instructor': '/instructor',
      'operator': '/coordinator',
      'school': '/school'
    };
    
    const dashboardRoute = dashboardRoutes[role as keyof typeof dashboardRoutes];
    if (dashboardRoute) {
        navigate(dashboardRoute, { replace: true });
    }
  }

  // PWA Logic: Show Portal Selection for unauthenticated users
  if (isPWA && !isAuthenticated && location.pathname === '/') {
    console.log('PWA: Showing portal selection for unauthenticated user');
    
    return (
      <>
        <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="text-center mb-10">
              <div className="flex justify-center items-center mb-6">
                <div className="relative">
                  <img 
                    src="/android-launchericon-192-192.png" 
                    alt="DearDriving Logo" 
                    className="w-20 h-20 rounded-lg shadow-lg border-2 border-main/20 dark:border-main/40"
                  />
                  {/* Optional: Add a subtle glow effect */}
                  <div className="absolute inset-0 rounded-lg border border-main/10 dark:border-main/20"></div>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                Welcome to DearDriving
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Choose your portal to continue
              </p>
            </div>

            {/* Portal Categories */}
            <div className="space-y-7">
              {portals.map((category, categoryIndex) => (
                <div key={categoryIndex} className="space-y-4">
                  {/* Category Title */}
                  <h2 className="text-gray-900 dark:text-white text-lg font-semibold text-left">
                    {category.category}
                  </h2>

                  {/* Portal Buttons */}
                  <div className="space-y-3">
                    {category.items.map((portal, index) => (
                      <button
                        key={index}
                        onClick={() => handlePortalSelect(portal)}
                        className="w-full bg-white dark:bg-gray-900 
                                border border-gray-200 dark:border-gray-700 
                                hover:border-main dark:hover:border-main 
                                hover:bg-main/5 dark:hover:bg-main/10
                                shadow-sm hover:shadow-md
                                rounded-lg p-4 transition-all duration-200 
                                transform hover:scale-[1.01] active:scale-[0.99] group"
                      >
                        <div className="flex items-center space-x-4">
                          {/* Icon */}
                          <div className="w-12 h-12 bg-main/10 dark:bg-gray-50 
                                        rounded-lg flex items-center justify-center 
                                        group-hover:bg-main/20 dark:group-hover:bg-gray-100 
                                        transition-colors duration-200">
                            <div className="text-main dark:text-main group-hover:text-main">
                              {portal.icon}
                            </div>
                          </div>
                          
                          {/* Text Content */}
                          <div className="flex-1 text-left">
                            <h3 className="text-gray-900 dark:text-white font-semibold text-lg mb-1 
                                        group-hover:text-main dark:group-hover:text-main 
                                        transition-colors duration-200">
                              {portal.name}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm 
                                        group-hover:text-gray-700 dark:group-hover:text-gray-300
                                        transition-colors duration-200">
                              {portal.description}
                            </p>
                          </div>

                          {/* Arrow Indicator */}
                          <div className="text-gray-400 dark:text-gray-500 
                                        group-hover:text-main dark:group-hover:text-main 
                                        transition-colors duration-200">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="text-center mt-10">
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Complete driving school management platform
              </p>
            </div>
          </div>
        </div>

        {/* AuthModal */}
        {isAuthModalOpen && (
          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
            isLoginProp={isLoginProp}
          />
        )}
      </>
    );
  }

  // Regular app flow for non-PWA or authenticated users
  if (!isPWA) return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <PWAInstallBanner />
    </>
  );
}

export default App;