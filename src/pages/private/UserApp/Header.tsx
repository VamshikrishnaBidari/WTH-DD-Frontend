import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Bell,
  ChevronDown,
  Sun,
  Moon,
  User,
  Settings,
  HelpCircle,
  LogOut,
  Check,
} from "lucide-react";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import { Fragment } from "react";
import { RootState } from "../../../app/store";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../features/authSlice";
import api from "../../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { toggleTheme } from "../../../features/themeSlice";
import { useSocket } from "../../../context/SocketProvider";

interface Notifications {
  id: string;
  fromUserId: string;
  toUserId: string;
  title: string;
  message: string;
  isRead: boolean;
}

const Header: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [notifications, setNotifications] = useState<Notifications[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const socket = useSocket();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
    dispatch(toggleTheme());
  };

  const handleLogout = async () => {
    try {
      const response = await api.post("/users/logout");
      if (response.data.success) {
        // Clear user data from Redux store
        dispatch(logout());
        toast.success("Logout successful");
        navigate("/");
        // Redirect to login page or perform any other action
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const markNotificationAsRead = async (id: string) => {
    const response = await api.post("/notification/markAsRead", {
      notificationId: id,
    });
    console.log("markNotificationAsRead", response);
    if (!response.data.success) {
      toast.error("Failed to mark notification as read, please login");
      return;
    }
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification,
      ),
    );
  };

  const getNotifications = useCallback(async (userId: string) => {
    try {
      const response = await api.post("/notification", {
        userId: userId,
      });
      console.log("getNotifications", response);
      if (!response.data.success) {
        toast.error("Failed to get notifications, please login");
        return;
      }
      setNotifications(response.data.notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      toast.error("An error occurred while fetching notifications data");
      return;
    }
  }, []);

  useEffect(() => {
    if (!user?.id) return;
    getNotifications(user?.id);
  }, [user?.id]);

  useEffect(() => {
    if (!socket) return;

    const handleNotification = (notification: Notifications) => {
      toast.success("New notification received");
      setNotifications((prev) => [notification, ...prev]);
    };

    socket.on("notification", handleNotification);

    return () => {
      socket.off("notification", handleNotification);
    };
  }, [socket]);

  return (
    <header className="sticky top-0 z-50 h-16 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-700 flex items-center justify-end px-6">
      <div className="flex items-center space-x-4">
        {/* Notifications Popover */}
        <Popover className="relative">
          <PopoverButton className="relative">
            <Bell className="w-5 h-5 text-gray-600 dark:text-gray-200" />
            {notifications.some((n) => !n.isRead) && (
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
                <div className="bg-white dark:bg-gray-900">
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
                      notifications?.map((notification) => (
                        <div
                          key={notification.id}
                          className="p-4 border-b border-gray-200 dark:border-gray-700"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
                                {notification.title}
                                {!notification.isRead && (
                                  <span className="ml-2 w-2 h-2 bg-blue-600 rounded-full"></span>
                                )}
                              </h4>
                              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                {notification.message}
                              </p>
                            </div>
                            {!notification.isRead && (
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
        </Popover>

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
                    <div className="relative bg-white dark:bg-gray-900">
                      <div className="p-2">
                        <Link
                          to="/user/profile"
                          onClick={() => close()}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                        >
                          <User className="w-4 h-4 mr-2" />
                          My Profile
                        </Link>
                        <Link
                          to="/user/account-security"
                          onClick={() => close()}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                        >
                          <Settings className="w-4 h-4 mr-2" />
                          Reset Password
                        </Link>
                        <Link
                          to="/user/support"
                          onClick={() => close()}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                        >
                          <HelpCircle className="w-4 h-4 mr-2" />
                          Support
                        </Link>
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
