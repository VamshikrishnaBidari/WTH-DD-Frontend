import React, { useState } from "react";
import {
  Mail,
  MessageSquare,
  Bell,
  Calendar,
  CreditCard,
  FileText,
} from "lucide-react";

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
}

const NotificationSettings: React.FC = () => {
  const [masterToggle, setMasterToggle] = useState(true);
  const [notifications, setNotifications] = useState<NotificationSetting[]>([
    {
      id: "email",
      title: "Email Notifications",
      description: "Receive updates via email",
      icon: <Mail className="w-6 h-6" />,
      enabled: true,
    },
    {
      id: "sms",
      title: "SMS Notifications",
      description: "Receive updates via SMS",
      icon: <MessageSquare className="w-6 h-6" />,
      enabled: true,
    },
  ]);

  const [categoryNotifications, setCategoryNotifications] = useState<
    NotificationSetting[]
  >([
    {
      id: "class",
      title: "Class Reminders",
      description: "Get notified about upcoming driving classes",
      icon: <Calendar className="w-6 h-6" />,
      enabled: true,
    },
    {
      id: "license",
      title: "License Status Updates",
      description: "Get notified when your LL or RTO test is scheduled",
      icon: <FileText className="w-6 h-6" />,
      enabled: true,
    },
    {
      id: "payment",
      title: "Payment Reminders",
      description: "Receive alerts about pending or completed payments",
      icon: <CreditCard className="w-6 h-6" />,
      enabled: true,
    },
    {
      id: "chat",
      title: "Chat Notifications",
      description: "Receive alerts when an instructor messages you",
      icon: <MessageSquare className="w-6 h-6" />,
      enabled: true,
    },
  ]);

  const handleMasterToggle = () => {
    setMasterToggle(!masterToggle);
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, enabled: !masterToggle })),
    );
    setCategoryNotifications((prev) =>
      prev.map((n) => ({ ...n, enabled: !masterToggle })),
    );
  };

  const handleNotificationToggle = (
    id: string,
    isCategory: boolean = false,
  ) => {
    if (isCategory) {
      setCategoryNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, enabled: !n.enabled } : n)),
      );
    } else {
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, enabled: !n.enabled } : n)),
      );
    }
  };

  const Toggle: React.FC<{ enabled: boolean; onChange: () => void }> = ({
    enabled,
    onChange,
  }) => (
    <button
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
        enabled ? "bg-yellow-400" : "bg-gray-200 dark:bg-gray-700"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );

  const NotificationSection: React.FC<{
    title: string;
    description?: string;
    icon?: React.ReactNode;
    enabled: boolean;
    onToggle: () => void;
    className?: string;
  }> = ({ title, description, icon, enabled, onToggle, className }) => (
    <div className="flex items-center justify-between py-4">
      <div className={`flex items-center space-x-4 ${className}`}>
        {icon && <div className="text-blue-600 dark:text-blue-400">{icon}</div>}
        <div>
          <h3 className="text-base font-medium text-gray-900 dark:text-white">
            {title}
          </h3>
          {description && (
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {description}
            </p>
          )}
        </div>
      </div>
      <Toggle enabled={enabled} onChange={onToggle} />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 font-satoshi">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            Notification Settings
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage how you receive notifications and updates from the driving
            school.
          </p>
        </div>

        <div className="space-y-6">
          {/* Master Toggle */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <NotificationSection
              title="Enable All Notifications"
              description="Toggle all notifications on or off"
              icon={<Bell className="w-6 h-6" />}
              enabled={masterToggle}
              onToggle={handleMasterToggle}
            />
          </div>

          {/* Notification Preferences */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Notification Preferences
            </h2>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {notifications.map((notification) => (
                <NotificationSection
                  key={notification.id}
                  title={notification.title}
                  description={notification.description}
                  icon={notification.icon}
                  enabled={notification.enabled}
                  onToggle={() => handleNotificationToggle(notification.id)}
                />
              ))}
            </div>
          </div>

          {/* Category-Based Notifications */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Category-Based Notifications
            </h2>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {categoryNotifications.map((notification) => (
                <NotificationSection
                  key={notification.id}
                  title={notification.title}
                  description={notification.description}
                  icon={notification.icon}
                  enabled={notification.enabled}
                  onToggle={() =>
                    handleNotificationToggle(notification.id, true)
                  }
                  className="w-4/5"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
