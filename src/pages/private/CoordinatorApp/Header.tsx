import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  // Bell,
  ChevronDown,
  Sun,
  Moon,
  User,
  Settings,
  LogOut,
  // Check,
} from "lucide-react";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../app/store";
import { toggleTheme } from "../../../features/themeSlice";
import { Operator } from "../../../interfaces/models";
import { logout } from "../../../features/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import api from "../../../utils/axiosInstance";

// interface Notification {
//   id: string;
//   title: string;
//   message: string;
//   isNew: boolean;
//   timestamp: string;
// }

const Header: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user) as Operator;
  // const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
    dispatch(toggleTheme());
  };

  // const markNotificationAsRead = (id: string) => {
  //   setNotifications(
  //     notifications.map((notification) =>
  //       notification.id === id
  //         ? { ...notification, isNew: false }
  //         : notification,
  //     ),
  //   );
  // };

  useEffect(() => {
    // Fetch notifications
    const fetchNotifications = async () => {
      try {
        // Simulated API call
        // const response = await axios.get('/api/notifications');
        // const dummyNotifications: Notification[] = [
        //   {
        //     id: "1",
        //     title: "New Course Available",
        //     message: "Advanced driving course is now available",
        //     isNew: true,
        //     timestamp: "2 hours ago",
        //   },
        //   {
        //     id: "2",
        //     title: "Schedule Update",
        //     message: "Your next class has been rescheduled",
        //     isNew: true,
        //     timestamp: "1 day ago",
        //   },
        // ];
        // setNotifications(dummyNotifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchNotifications();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await api.post("/operator/logout");
      if (response.data.success) {
        // Clear user data from Redux store
        dispatch(logout());
        toast.success("Logout successful");
        navigate("/coordinator-login");
      }
    } catch (error) {
      console.error("Coordinator Logout failed:", error);
    }
  };

  return (
    <header className="sticky top-0 z-40 h-16 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-700 flex items-center justify-end px-6">
      <div className="flex items-center space-x-4">
        {/* Notifications Popover */}
        {/* <Popover className="relative">
          <PopoverButton className="relative">
            <Bell className="w-5 h-5 text-gray-600 dark:text-gray-200" />
            {notifications.some((n) => n.isNew) && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-600 rounded-full"></span>
            )}
          </PopoverButton>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <PopoverPanel className="absolute right-0 z-10 mt-2 md:w-80 w-48 transform">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="bg-white dark:bg-gray-800">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Notifications
                    </h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                        You're all caught up!
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className="p-4 border-b border-gray-200 dark:border-gray-700"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
                                {notification.title}
                                {notification.isNew && (
                                  <span className="ml-2 w-2 h-2 bg-blue-600 rounded-full"></span>
                                )}
                              </h4>
                              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                {notification.message}
                              </p>
                              <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                                {notification.timestamp}
                              </p>
                            </div>
                            {notification.isNew && (
                              <button
                                onClick={() =>
                                  markNotificationAsRead(notification.id)
                                }
                                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                              >
                                <Check className="w-5 h-5 bg-gray-100 rounded-full p-1" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </PopoverPanel>
          </Transition>
        </Popover> */}

        {/* User Menu */}
        <Popover className="relative">
          {({ close }) => (
            <>
              <PopoverButton className="flex items-center space-x-2">
                <img
                  src={user?.image}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-medium text-gray-700 dark:text-gray-200">
                  {user?.name}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </PopoverButton>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <PopoverPanel className="absolute right-0 z-10 mt-2 w-56 transform">
                  <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="relative bg-white dark:bg-gray-800">
                      <div className="p-2">
                        <Link
                          to="/coordinator/profile"
                          onClick={() => close()}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                        >
                          <User className="w-4 h-4 mr-2" />
                          My Profile
                        </Link>
                        {/* <Link to="/user/notification-settings" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                          <Bell className="w-4 h-4 mr-2" />
                          Notification Settings
                        </Link> */}
                        <Link
                          to="/coordinator/account-security"
                          onClick={() => close()}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                        >
                          <Settings className="w-4 h-4 mr-2" />
                          Reset Password
                        </Link>
                        {/* <Link to="/coordinator/support" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                          <HelpCircle className="w-4 h-4 mr-2" />
                          Support
                        </Link> */}
                        <button
                          onClick={() => {
                            toggleDarkMode();
                            close();
                          }}
                          className="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                        >
                          {isDarkMode ? (
                            <Sun className="w-4 h-4 mr-2" />
                          ) : (
                            <Moon className="w-4 h-4 mr-2" />
                          )}
                          {isDarkMode ? "Light Mode" : "Dark Mode"}
                        </button>
                        <hr className="my-1 border-gray-200 dark:border-gray-700" />
                        <button
                          onClick={() => {
                            handleLogout();
                            close();
                          }}
                          className="w-full flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                </PopoverPanel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </header>
  );
};

export default Header;
