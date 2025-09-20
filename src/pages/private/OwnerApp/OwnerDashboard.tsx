import React, { useCallback, useEffect, useState, useMemo } from "react";
import { Users, GraduationCap, LayoutGrid, XCircle } from "lucide-react";
import { toast } from "sonner";
import api from "../../../utils/axiosInstance";
import { useDispatch } from "react-redux";
// import { RootState } from '../../../app/store';
import { setUser } from "../../../features/authSlice";
import { setSchool } from "../../../features/schoolSlice";
// import { DrivingSchool } from '../../../interfaces/models';

interface Stats {
  newStudents: {
    count: number;
  };
  completedCourse: {
    count: number;
  };
  classesCount: {
    count: number;
  };
  missedClasses: {
    count: number;
  };
}

interface Feedback {
  id: string;
  comment: string;
  rating: number;
  teacher: {
    id: string;
    name: string;
  };
  user: {
    id: string;
    name: string;
    image: string;
  };
  createdAt: string;
  date: string;
  [key: string]: any;
}

const StatCard = React.memo(
  ({
    icon: Icon,
    count,
    label,
  }: {
    icon: typeof Users;
    count: number;
    label: string;
  }) => (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
          <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        {count}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
    </div>
  ),
);

const FeedbackCard = React.memo(({ feedback }: { feedback: Feedback }) => (
  <div className="rounded-xl p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center gap-3">
        <img
          src={feedback.user.image}
          alt={feedback.user.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white">
            {feedback.user.name}
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {feedback.date}
          </p>
        </div>
      </div>
    </div>
    <p className="text-gray-600 dark:text-gray-300 mb-3">{feedback.comment}</p>
    <p className="text-sm text-gray-500 dark:text-gray-400">
      Instructor: {feedback.teacher.name}
    </p>
  </div>
));

const OwnerDashboard: React.FC = () => {
  // All hooks declared at the top level - no conditional usage
  const [timeframe, setTimeframe] = useState<"week" | "month">("week");
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [weeklyStats, setWeeklyStats] = useState<Stats>({
    newStudents: { count: 0 },
    completedCourse: { count: 0 },
    classesCount: { count: 0 },
    missedClasses: { count: 0 },
  });

  const [monthlyStats, setMonthlyStats] = useState<Stats>({
    newStudents: { count: 0 },
    completedCourse: { count: 0 },
    classesCount: { count: 0 },
    missedClasses: { count: 0 },
  });

  const dispatch = useDispatch();
  // const schoolFromSchoolSlice = useSelector((state: RootState) => state.school.school) as DrivingSchool;

  // Memoize the current stats to prevent unnecessary re-renders
  const stats = useMemo(() => {
    return timeframe === "week" ? weeklyStats : monthlyStats;
  }, [timeframe, weeklyStats, monthlyStats]);

  const getStats = useCallback(async (schoolId?: string) => {
    if (!schoolId) {
      console.warn("No school ID provided for stats");
      return;
    }

    try {
      setError(null);

      const [res1, res2, res3, res4, res5, res6, res7, res8, res9] =
        await Promise.all([
          api.post("/driving/get-teacher-classes-this-week", { schoolId }),
          api.post("/driving/get-teacher-classes-this-month", { schoolId }),
          api.post("/driving/get-teacher-canceled-classes-this-week", {
            schoolId,
          }),
          api.post("/driving/get-teacher-canceled-classes-this-month", {
            schoolId,
          }),
          api.post("/driving/get-students-enrolled-this-week", { schoolId }),
          api.post("/driving/get-students-enrolled-this-month", { schoolId }),
          api.post("/driving/get-completed-course-this-week", { schoolId }),
          api.post("/driving/get-completed-course-this-month", { schoolId }),
          api.post("/driving/get-feedback", { schoolId }),
        ]);

      console.log("API responses:", {
        res1,
        res2,
        res3,
        res4,
        res5,
        res6,
        res7,
        res8,
        res9,
      });

      // Check if all requests were successful
      const allSuccessful = [
        res1,
        res2,
        res3,
        res4,
        res5,
        res6,
        res7,
        res8,
        res9,
      ].every((res) => res.data.success);

      if (!allSuccessful) {
        throw new Error("One or more API requests failed");
      }

      setWeeklyStats({
        newStudents: { count: res5.data.studentsEnrolledThisWeek || 0 },
        completedCourse: {
          count: res7.data.totalCompletedCoursesThisWeek || 0,
        },
        classesCount: { count: res1.data.totalClassesTakenThisWeek || 0 },
        missedClasses: { count: res3.data.totalCanceledClassesThisWeek || 0 },
      });

      setMonthlyStats({
        newStudents: { count: res6.data.studentsEnrolledThisMonth || 0 },
        completedCourse: {
          count: res8.data.totalCompletedCoursesThisMonth || 0,
        },
        classesCount: { count: res2.data.totalClassesTakenThisMonth || 0 },
        missedClasses: { count: res4.data.totalCanceledClassesThisMonth || 0 },
      });

      const processedFeedbacks =
        res9.data.feedbacks?.map((feedback: Feedback) => ({
          ...feedback,
          date: new Date(feedback.createdAt).toLocaleDateString(),
        })) || [];

      setFeedbacks(processedFeedbacks);
    } catch (error) {
      console.error("Error fetching stats:", error);
      const errorMessage = "Failed to fetch stats. Please try again later.";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  }, []); // Remove school?.id dependency to prevent circular dependency

  const getSchool = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await api.get("/driving/get-school");

      if (res.data.success && res.data.user) {
        // console.log("school", res);
        dispatch(setSchool(res.data.user));
        dispatch(setUser(res.data.user));

        // Fetch stats after school data is loaded
        await getStats(res.data.user.id);
      } else {
        throw new Error("Invalid school data received");
      }
    } catch (error) {
      console.error("Error fetching school data:", error);
      const errorMessage =
        "Failed to fetch school data. Please try again later.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [dispatch, getStats]);

  // Single useEffect for initialization
  useEffect(() => {
    getSchool();
  }, [getSchool]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-6 font-satoshi flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-6 font-satoshi flex items-center justify-center">
        <div className="text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <button
            onClick={getSchool}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-6 font-satoshi">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">
            Your Driving Academy Dashboard
          </h1>
        </div>

        {/* Time Toggle & Update Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 md:p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
              {timeframe === "week" ? "Weekly" : "Monthly"} Update
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Here's your performance overview for this {timeframe}
            </p>
          </div>

          <div className="flex gap-2 bg-white dark:bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setTimeframe("week")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                timeframe === "week"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              This Week
            </button>
            <button
              onClick={() => setTimeframe("month")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                timeframe === "month"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              This Month
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={Users}
            count={stats.newStudents.count}
            label="Total number of new student"
          />
          <StatCard
            icon={GraduationCap}
            count={stats.completedCourse.count}
            label="Total number Students Completed Course"
          />
          <StatCard
            icon={LayoutGrid}
            count={stats.classesCount.count}
            label="Total Classes Conducted"
          />
          <StatCard
            icon={XCircle}
            count={stats.missedClasses.count}
            label="Missed/Canceled Classes"
          />
        </div>

        {/* Feedback Section */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Real Insight
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {feedbacks.length > 0 ? (
              feedbacks.map((feedback) => (
                <FeedbackCard key={feedback.id} feedback={feedback} />
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">
                  No feedback available yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
