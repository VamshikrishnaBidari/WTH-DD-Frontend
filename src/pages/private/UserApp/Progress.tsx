import api from "../../../utils/axiosInstance";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../app/store";
import { toast } from "sonner";
import { User } from "../../../interfaces/models";

interface Class {
  id: number;
  date: string;
  title: string;
  instructorFeedback: string;
  description: string;
  instructor: string;
  completed: boolean;
  performance: string;
}
interface Course {
  id: string;
  type: string;
  teacher: {
    name: string;
    school: {
      id: string;
      name: string;
    };
    [key: string]: any;
  };
  classesTotal: number;
  classStart: Date;
  classesTaken: number;
  [key: string]: any;
}

const PerformanceBadge: React.FC<{
  performance: "Excellent" | "Poor" | "Average" | "Good" | "Moderate";
}> = ({ performance }) => {
  const colors: Record<
    "Excellent" | "Poor" | "Average" | "Good" | "Moderate",
    string
  > = {
    Excellent:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    Good: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    Moderate:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    Average:
      "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
    Poor: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[performance] || "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"}`}
    >
      {performance}
    </span>
  );
};

const Progress: React.FC = () => {
  const [completedClasses, setCompletedClasses] = useState(0);
  const [remainingClasses, setRemainingClasses] = useState(0);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [totalClasses, setTotalClasses] = useState(1);
  const [course, setCourse] = useState<Course | null>(null);

  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);

  const user = useSelector((state: RootState) => state.auth.user) as User;

  const getVehicleSyllabus = useCallback(
    async (
      id: string,
      vehicle: string,
      courseId: string,
      totalClasses: number,
    ) => {
      if (!id || !vehicle || !courseId) {
        toast.error("Invalid course or vehicle data");
        return;
      }
      try {
        const response = await api.post("/vehicleSyllabus/get", {
          id,
        });
        console.log("getVehicleSyllabus", response);
        if (response.data.success) {
          const syllabus = response.data.syllabusData;
          console.log("vehicle", vehicle);
          const matchedSyllabus = syllabus.find(
            (item: { vehicle: string }) =>
              item?.vehicle?.toLowerCase() === vehicle.toLowerCase(),
          );

          const vehicleSyllabus = matchedSyllabus?.vehicleSyllabus || [];

          const res = await api.post("/progress/get", {
            id: courseId,
          });
          if (res.data.success) {
            const progress = res.data.progress;
            console.log("progress", progress);
            console.log("totalClasses", totalClasses);

            // FIXED: Create classes array and set it to state
            const newClasses = Array.from({ length: totalClasses }, (_, i) => {
              const progressItem = progress?.[i];
              const syllabusItem = vehicleSyllabus?.[i];

              return {
                id: i + 1,
                date: progressItem?.createdAt || "",
                title: syllabusItem?.title || "",
                description: syllabusItem?.description || "",
                instructorFeedback: progressItem?.feedback || "",
                instructor: course?.teacher?.name || "",
                completed: !!progressItem,
                performance: progressItem?.rating || "",
              };
            });

            console.log("classes", newClasses);
            // FIXED: Update state instead of local variable
            setClasses(newClasses);
          } else {
            toast.error("failed to fetch progress history");
          }
        } else {
          toast.error("Failed to fetch vehicle syllabus");
        }
      } catch (error) {
        console.error("Error fetching vehicle syllabus:", error);
        toast.error("An error occurred while fetching the vehicle syllabus");
      } finally {
        setLoading(false);
      }
    },
    [course?.teacher?.name],
  );

  const getLatestCourse = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.post("/users/latest-course", {
        id: user?.id,
      });
      console.log("getLatestCourse", response);
      if (response.data.success) {
        setCourse(response.data.course);
        setCompletedClasses(response.data.course.classesTaken);
        setRemainingClasses(
          response.data.course.classesTotal - response.data.course.classesTaken,
        );
        setTotalClasses(response.data.course.classesTotal);
        setProgressPercentage(
          (response.data.course.classesTaken /
            response.data.course.classesTotal) *
            100,
        );

        // Call getVehicleSyllabus after course is set
        await getVehicleSyllabus(
          import.meta.env.VITE_SCHOOL_ID ||
            user.schoolId ||
            response.data.course.teacher.school.id,
          response.data.course.vehicle,
          response.data.course.id,
          response.data.course.classesTotal,
        );
      } else {
        toast.error("Failed to start course");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching latest course:", error);
      toast.error("An error occurred while fetching the latest course");
      setLoading(false);
    }
  }, [user?.id, getVehicleSyllabus]);

  useEffect(() => {
    getLatestCourse();
  }, [user?.id]); // Only depend on user.id to prevent infinite loops

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Loading your progress...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 px-2 py-6 lg:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            Your Progress
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Keep going! Every session brings you closer to perfection.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Learning History
              </h2>

              {/* Progress Bar */}
              <div className="w-[230px] lg:w-[620px] my-4 mx-auto">
                <div className="h-4 bg-gray-200 dark:bg-gray-900 rounded-full">
                  <div
                    className="h-4 bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  >
                    <span className="absolute ml-3 text-xs font-semibold text-gray-50 dark:text-gray-800">
                      {progressPercentage.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Class List */}
              <div className="space-y-4">
                {classes.length > 0 ? (
                  classes.map((classItem) => (
                    <div
                      key={classItem.id}
                      className="bg-gray-100/70 dark:bg-gray-900/80 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {classItem.date
                              ? new Date(classItem.date).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  },
                                )
                              : `Class ${classItem.id}`}
                          </span>
                        </div>
                        <span className="text-sm text-blue-600 dark:text-blue-400">
                          {classItem.completed ? "Completed" : "Pending"}
                        </span>
                      </div>

                      <h3 className="text-base font-medium text-gray-900 dark:text-white mb-1">
                        {classItem.title || `Class ${classItem.id}`}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {classItem.description || "No description available"}
                      </p>
                      {classItem.instructorFeedback && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          feedback: {classItem.instructorFeedback}
                        </p>
                      )}

                      <div className="flex items-center space-x-4">
                        {[
                          "Poor",
                          "Average",
                          "Good",
                          "Moderate",
                          "Excellent",
                        ].includes(classItem.performance) ? (
                          <PerformanceBadge
                            performance={
                              classItem.performance as
                                | "Poor"
                                | "Average"
                                | "Good"
                                | "Moderate"
                                | "Excellent"
                            }
                          />
                        ) : classItem.completed ? (
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            No rating
                          </span>
                        ) : (
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Not completed
                          </span>
                        )}

                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          by {course?.teacher?.name || "Instructor"}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-600 dark:text-gray-400">
                      No classes found
                    </p>
                  </div>
                )}
              </div>

              <div className="flex justify-center space-x-4 mt-8">
                <Link
                  to="/user/bookings"
                  className="px-6 py-2 border-2 border-yellow-400 text-gray-900 dark:text-white rounded-lg hover:bg-yellow-400/10 transition-colors"
                >
                  Go to Calendar
                </Link>
                <Link
                  to="/user"
                  className="px-6 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition-colors"
                >
                  Home
                </Link>
              </div>
            </div>
          </div>

          {/* Stats and Next Session */}
          <div className="lg:col-span-1 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total Classes
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {totalClasses}
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Completed
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {completedClasses}
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Remaining
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {remainingClasses}
                </p>
              </div>
            </div>

            {/* Next Session Card */}
            {/* <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Your Next Session:
                  </span>
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    Monday, 3-4 pm
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Instructor:
                  </span>
                  <span className="text-sm text-gray-900 dark:text-white">
                    {course?.teacher?.name || "Instructor Name"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Progress:
                  </span>
                  <span className="text-sm text-gray-900 dark:text-white">
                    {completedClasses}/{totalClasses} completed
                  </span>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
