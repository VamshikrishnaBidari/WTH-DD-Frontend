import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { DrivingSchool } from "../../../interfaces/models";
import { Outlet, Navigate } from "react-router-dom";

const OwnerApp: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const drivingSchool = useSelector(
    (state: RootState) => state.auth.user,
  ) as DrivingSchool | null;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Add a 500ms delay before removing the loading state
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);

  if (loading) {
    // Show a loading spinner while loading
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }
  if (!drivingSchool) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div
        className={`transition-all duration-200 ${sidebarOpen ? "lg:ml-64" : "ml-0"}`}
      >
        <Header />
        <main className="mx-2 lg:mx-0">
          {drivingSchool ? <Outlet /> : <Navigate to="/" />}
        </main>
      </div>

      {/* Mobile menu button */}
      <button
        className="fixed top-4 left-4 z-50 text-gray-600 dark:text-gray-200"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={sidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>
    </div>
  );
};

export default OwnerApp;
