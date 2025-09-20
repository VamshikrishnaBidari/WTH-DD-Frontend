// NO USE NOW.

import React from "react";
import { CheckCircle, FileText, Car, Award } from "lucide-react";

interface StatusStep {
  id: string;
  title: string;
  status: "completed" | "in-progress" | "pending";
  icon: React.ReactNode;
}

const Status: React.FC = () => {
  const steps: StatusStep[] = [
    {
      id: "documents",
      title: "Documents Received",
      status: "completed",
      icon: <CheckCircle className="w-6 h-6" />,
    },
    {
      id: "learning",
      title: "Learning License",
      status: "in-progress",
      icon: <FileText className="w-6 h-6" />,
    },
    {
      id: "rto",
      title: "RTO Test",
      status: "pending",
      icon: <Car className="w-6 h-6" />,
    },
    {
      id: "approval",
      title: "License Approval",
      status: "pending",
      icon: <Award className="w-6 h-6" />,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-blue-500 dark:text-blue-400";
      case "in-progress":
        return "text-yellow-500 dark:text-yellow-400";
      default:
        return "text-gray-400 dark:text-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "in-progress":
        return "In Progress";
      default:
        return "Pending";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  return (
    <div className="hidden lg:block w-full bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Current Status
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Last updated: March 15, 2024 at 10:30 AM
          </p>
        </div>
        <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded-full">
          In Progress
        </span>
      </div>

      {/* Progress Bar */}
      <div className="relative mb-12">
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
          <div
            className="h-2 bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-500"
            style={{ width: "35%" }}
          />
        </div>
      </div>

      {/* Status Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step) => (
          <div key={step.id} className="flex flex-col items-center text-center">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors ${
                step.status === "completed"
                  ? "bg-blue-100 dark:bg-blue-900/30"
                  : step.status === "in-progress"
                    ? "bg-yellow-100 dark:bg-yellow-900/30"
                    : "bg-gray-100 dark:bg-gray-800"
              }`}
            >
              <div className={getStatusColor(step.status)}>{step.icon}</div>
            </div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              {step.title}
            </h4>
            <span
              className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(step.status)}`}
            >
              {getStatusText(step.status)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Status;
