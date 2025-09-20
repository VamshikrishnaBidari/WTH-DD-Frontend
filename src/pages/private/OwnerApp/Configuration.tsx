import React, { useState } from "react";
import { Settings, Save, Edit } from "lucide-react";

interface TimeConfig {
  schoolStart: string;
  schoolEnd: string;
  officeStart: string;
  officeEnd: string;
  breakStart: string;
  breakEnd: string;
}

interface WorkingDays {
  [key: string]: boolean;
}

interface SessionConfig {
  timePerSession: string;
  breakBetweenSessions: string;
}

const Configuration: React.FC = () => {
  const [times, setTimes] = useState<TimeConfig>({
    schoolStart: "",
    schoolEnd: "",
    officeStart: "",
    officeEnd: "",
    breakStart: "",
    breakEnd: "",
  });

  const [workingDays, setWorkingDays] = useState<WorkingDays>({
    Mon: true,
    Tue: true,
    Wed: true,
    Thu: true,
    Fri: true,
    Sat: false,
    Sun: false,
  });

  const [sessionConfig, setSessionConfig] = useState<SessionConfig>({
    timePerSession: "15 minutes",
    breakBetweenSessions: "5 minutes",
  });

  const [isEditing, setIsEditing] = useState(true);

  const handleTimeChange =
    (field: keyof TimeConfig) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setTimes((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const toggleWorkingDay = (day: string) => {
    if (!isEditing) return;
    setWorkingDays((prev) => ({ ...prev, [day]: !prev[day] }));
  };

  const handleSessionConfigChange =
    (field: keyof SessionConfig) =>
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSessionConfig((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSave = () => {
    setIsEditing(false);
    // Add your save logic here
    console.log("Saving configuration:", { times, workingDays, sessionConfig });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Settings className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          <h1 className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">
            Driving School Configuration
          </h1>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm">
          {/* School Operating Timings */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              School Operating Timings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  School Start Time
                </label>
                <input
                  type="time"
                  value={times.schoolStart}
                  onChange={handleTimeChange("schoolStart")}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  School End Time
                </label>
                <input
                  type="time"
                  value={times.schoolEnd}
                  onChange={handleTimeChange("schoolEnd")}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Office Timings */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Office Timings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Office Opening Time
                </label>
                <input
                  type="time"
                  value={times.officeStart}
                  onChange={handleTimeChange("officeStart")}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Office Closing Time
                </label>
                <input
                  type="time"
                  value={times.officeEnd}
                  onChange={handleTimeChange("officeEnd")}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Working Days */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Working Days
            </h2>
            <div className="flex flex-wrap gap-3">
              {Object.entries(workingDays).map(([day, isActive]) => (
                <button
                  key={day}
                  onClick={() => toggleWorkingDay(day)}
                  disabled={!isEditing}
                  className={`w-24 h-10 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  } ${isEditing ? "hover:bg-blue-700" : ""}`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Break Hours */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Break Hours
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Break Start Time
                </label>
                <input
                  type="time"
                  value={times.breakStart}
                  onChange={handleTimeChange("breakStart")}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Break End Time
                </label>
                <input
                  type="time"
                  value={times.breakEnd}
                  onChange={handleTimeChange("breakEnd")}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Session Configuration */}
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Session Configuration
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Time Per Session
                </label>
                <select
                  value={sessionConfig.timePerSession}
                  onChange={handleSessionConfigChange("timePerSession")}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="15 minutes">15 minutes</option>
                  <option value="30 minutes">30 minutes</option>
                  <option value="45 minutes">45 minutes</option>
                  <option value="60 minutes">60 minutes</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Break Time Between Sessions
                </label>
                <select
                  value={sessionConfig.breakBetweenSessions}
                  onChange={handleSessionConfigChange("breakBetweenSessions")}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="5 minutes">5 minutes</option>
                  <option value="10 minutes">10 minutes</option>
                  <option value="15 minutes">15 minutes</option>
                  <option value="20 minutes">20 minutes</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 border-2 border-yellow-400 text-gray-900 dark:text-white rounded-lg hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-colors flex items-center gap-2"
            >
              <Edit className="w-5 h-5" />
              Edit
            </button>
          )}
          {isEditing && (
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-lg transition-colors flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              Save Configuration
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Configuration;
