import React, { useCallback, useEffect, useState } from "react";
import { Search } from "lucide-react";
import { toast } from "sonner";
import api from "../../../utils/axiosInstance";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { DrivingSchool } from "../../../interfaces/models";
import { useNavigate } from "react-router-dom";

interface Coordinator {
  id: string;
  name: string;
  image: string;
  phone: string;
  stats: {
    totalStudentAssigned: number;
    totalLLProcessed: number;
    totalDLProcessed: number;
  };
  phoneNumber?: string;
  studentsCount?: number;
  LLcount?: number;
  DLcount?: number;
}

const CoordinatorsList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const school =
    (useSelector((state: RootState) => state.school.school) as DrivingSchool) ||
    (useSelector((state: RootState) => state.auth.user) as DrivingSchool);
  const schoolId = school?.id;
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [coordinators, setCoordinators] = useState<Coordinator[]>([]);
  const getCoordinators = useCallback(async () => {
    try {
      const response = await api.post("/driving/get-coordinators", {
        schoolId,
      });
      if (!response.data.success) {
        toast.error(response.data.message);
        setLoading(false);
        return;
      }
      const coordinatorsData = response.data.coordinators.map(
        (coordinator: Coordinator) => ({
          id: coordinator.id,
          name: coordinator.name,
          image:
            coordinator.image ||
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop",
          phone: coordinator.phoneNumber,
          stats: {
            totalStudentAssigned: coordinator.studentsCount,
            totalLLProcessed: coordinator.LLcount,
            totalDLProcessed: coordinator.DLcount,
          },
        }),
      );
      setCoordinators(coordinatorsData);
    } catch (error) {
      console.error("Error fetching coordinators:", error);
      toast.error("Error fetching coordinators");
    } finally {
      setLoading(false);
    }
  }, [schoolId]);
  useEffect(() => {
    getCoordinators();
  }, [getCoordinators]);

  const filteredCoordinators = coordinators.filter((coordinator) =>
    coordinator.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Loading Coordinators...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header and Search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              Coordinators Performance
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your coordinator and track their progress
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search coordinators..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-10 py-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>

        {/* Coordinators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredCoordinators.map((coordinator) => (
            <div
              key={coordinator.id}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow"
            >
              {/* Coordinator Info */}
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={coordinator.image}
                  alt={coordinator.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {coordinator.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {coordinator.phone}
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-3 lg:space-y-4 mb-6">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400 text-xs lg:text-sm">
                      Total Students Assigned
                    </span>
                    <span className="text-gray-900 dark:text-white font-medium text-xs lg:text-sm">
                      {coordinator.stats.totalStudentAssigned}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs lg:text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">
                      Total LL Processed
                    </span>
                    <span className="text-gray-900 dark:text-white font-medium text-xs lg:text-sm">
                      {coordinator.stats.totalLLProcessed}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs lg:text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">
                      Total DL Processed
                    </span>
                    <span className="text-gray-900 dark:text-white font-medium text-xs lg:text-sm">
                      {coordinator.stats.totalDLProcessed}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  onClick={() =>
                    navigate(`/school/coordinator-details/${coordinator.id}`)
                  }
                  className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-2 rounded-lg transition-colors text-sm font-medium"
                >
                  View Details
                </button>
                {/* <button className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm font-medium">
                  <MessageSquare className="w-4 h-4" />
                  Chat
                </button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoordinatorsList;
