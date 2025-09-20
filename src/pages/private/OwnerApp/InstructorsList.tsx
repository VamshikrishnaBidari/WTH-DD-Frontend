import React, { useCallback, useEffect, useState } from "react";
import { Search, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import api from "../../../utils/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { DrivingSchool } from "../../../interfaces/models";
import { setSchool } from "../../../features/schoolSlice";
import { setUser } from "../../../features/authSlice";

interface Instructor {
  id: string;
  name: string;
  image: string;
  phoneNumber: string;
  weeklyStats: {
    classesTakenThisWeek: number;
  };
  overallStats: {
    totalClassesTaken: number;
    totalCanceledClasses: number;
    efficiency: number;
    overallRating: number;
  };
}

const InstructorsList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(true);
  const [schoolLoaded, setSchoolLoaded] = useState(false);

  const school = useSelector(
    (state: RootState) => state.school.school,
  ) as DrivingSchool;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getSchool = useCallback(async () => {
    try {
      const res = await api.get("/driving/get-school");
      if (res.data.success) {
        // console.log("school", res);
        dispatch(setSchool(res.data.user));
        dispatch(setUser(res.data.user));
        setSchoolLoaded(true);
      } else {
        toast.error("Failed to fetch school data. Please try again later.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching school data:", error);
      toast.error("Failed to fetch school data. Please try again later.");
      setLoading(false);
    }
  }, [dispatch]);

  const getTeacherStats = useCallback(async () => {
    if (!school?.id) {
      setLoading(false);
      return;
    }

    try {
      const response = await api.post("/driving/get-teachers", {
        schoolId: school.id,
      });
      if (!response.data.success) {
        toast.error(response.data.message);
        return;
      }
      setInstructors(response.data.teachers);
    } catch (error) {
      toast.error("Error fetching instructor stats");
      console.error("Error fetching instructor stats:", error);
    } finally {
      setLoading(false);
    }
  }, [school?.id]);

  // First effect: Load school data
  useEffect(() => {
    getSchool();
  }, [getSchool]);

  // Second effect: Load instructor stats when school is loaded
  useEffect(() => {
    if (schoolLoaded && school?.id) {
      getTeacherStats();
    } else if (schoolLoaded && !school?.id) {
      setLoading(false);
    }
  }, [schoolLoaded, school?.id, getTeacherStats]);

  // Always call all hooks before any conditional returns
  const filteredInstructors = instructors.filter((instructor) =>
    instructor.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <Star
          key={index}
          className={`w-4 h-4 ${
            index < rating
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300 dark:text-gray-600"
          }`}
        />
      ));
  };

  // Loading state UI
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Loading Instructors...
          </p>
        </div>
      </div>
    );
  }

  // Main component UI
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header and Search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              Instructors Performance
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your instructor and track their progress
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search instructors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-10 py-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>

        {/* Instructors Grid */}
        {filteredInstructors.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              {instructors.length === 0
                ? "No instructors found."
                : "No instructors match your search."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredInstructors.map((instructor) => (
              <div
                key={instructor.id}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow"
              >
                {/* Instructor Info */}
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={instructor.image}
                    alt={instructor.name}
                    className="w-12 h-12 rounded-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/default-avatar.png"; // fallback image
                    }}
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {instructor.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {instructor.phoneNumber}
                    </p>
                  </div>
                </div>

                {/* Stats */}
                <div className="space-y-3 lg:space-y-4 mb-6">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-400 text-xs lg:text-sm">
                        Classes This Week
                      </span>
                      <span className="text-gray-900 dark:text-white font-medium text-xs lg:text-sm">
                        {instructor.weeklyStats.classesTakenThisWeek}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs lg:text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-400">
                        Efficiency
                      </span>
                      <span className="text-green-600 dark:text-green-400 font-medium">
                        {instructor.overallStats.efficiency}%
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 mb-1">
                      Reviews
                    </div>
                    <div className="flex gap-1">
                      {renderStars(instructor.overallStats.overallRating)}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                  <button
                    className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-2 rounded-lg transition-colors text-sm font-medium"
                    onClick={() =>
                      navigate(`/school/instructor-details/${instructor.id}`)
                    }
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorsList;
