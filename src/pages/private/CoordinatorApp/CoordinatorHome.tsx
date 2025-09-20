import React, { useState, useCallback, useEffect } from "react";
import api from "../../../utils/axiosInstance";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { Operator } from "../../../interfaces/models";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setUser } from "../../../features/authSlice";

// Utility to format time difference
function timeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000); // in seconds
  if (diff < 60) return `${diff} seconds ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  return `${Math.floor(diff / 86400)} days ago`;
}

interface Task {
  customerName: string;
  contactNo: string;
  testType: string;
  time: string;
}

interface ScheduledTest {
  day: string;
  tests: Task[];
}

// Match Issue model from backend
interface CustomerQuery {
  id: string;
  userId: string;
  schoolId: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt?: string;
  user: { name: string };
}

const CoordinatorHome: React.FC = () => {
  const operator = useSelector(
    (state: RootState) => state.auth.user as Operator | null,
  );
  const [fetchedOperator, setFetchedOperator] = useState<Operator | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [tasks, setTasks] = useState<Task[]>([]);

  const [scheduledTests, setScheduledTests] = useState<ScheduledTest[]>([]);

  const [customerQueries, setCustomerQueries] = React.useState<CustomerQuery[]>(
    [],
  );

  const getCurrentOperator = useCallback(async () => {
    try {
      const response = await api.get("/users/current-user");
      if (response.data.success) {
        // console.log("Current operator:", response.data.user);
        dispatch(setUser(response.data.user));
        setFetchedOperator(response.data.user as Operator);
      } else {
        console.error(
          "Failed to fetch current operator:",
          response.data.message,
        );
      }
    } catch (error) {
      console.error("Error fetching current operator:", error);
    }
  }, [fetchedOperator?.schoolId]);

  useEffect(() => {
    getCurrentOperator();
  }, [getCurrentOperator]);

  const getAllQueries = useCallback(async () => {
    try {
      console.log(
        "Fetching customer queries for school ID:",
        fetchedOperator?.schoolId,
      );
      const response = await api.get(
        `/operator/get-all-issues/${fetchedOperator?.schoolId}`,
      );
      if (
        response.data.success ||
        response.data.message === "No issues found for the given school"
      ) {
        setCustomerQueries(response.data.issues);
        toast.success("Customer queries fetched successfully");
      } else {
        console.error(
          "Failed to fetch customer queries:",
          response.data.message,
        );
      }
    } catch (error) {
      console.error("Error fetching customer queries:", error);
    }
  }, [fetchedOperator?.schoolId]);

  const resolveIssue = async (issueId: string) => {
    try {
      setLoading(true);
      const response = await api.patch(`/operator/resolve-issue/${issueId}`);
      if (response.data.success) {
        getAllQueries();
        window.location.reload(); // Reload to reflect changes
        toast.success("Issue resolved successfully");
      }
    } catch {
      toast.error("Error resolving issue");
    } finally {
      setLoading(false);
    }
  };

  const fetchTodaysTasks = useCallback(async () => {
    if (!fetchedOperator?.schoolId) return;
    try {
      const response = await api.get(
        `/operator/get-todays-tasks/${fetchedOperator?.schoolId}`,
      );
      if (response.data.success && Array.isArray(response.data.tasks)) {
        setTasks(
          response.data.tasks.map(
            (task: {
              customerName: string;
              contactNo: string;
              testType: string;
              time: string;
            }) => ({
              customerName: task.customerName,
              contactNo: task.contactNo,
              testType: task.testType,
              time: task.time,
            }),
          ),
        );
        toast.success("Today's tasks fetched successfully");
      } else {
        toast.error("Failed to fetch today's tasks");
        setTasks([]);
      }
    } catch {
      toast.error("Error fetching today's tasks");
      setTasks([]);
    }
  }, [fetchedOperator?.schoolId]);

  const fetchWeeksTasks = useCallback(async () => {
    if (!fetchedOperator?.schoolId) return;
    try {
      const response = await api.get(
        `/operator/get-weeks-tasks/${fetchedOperator?.schoolId}`,
      );
      if (
        response.data.success &&
        Array.isArray(response.data.scheduledTests)
      ) {
        setScheduledTests(
          response.data.scheduledTests.map(
            (day: {
              day: string;
              tests: {
                customerName: string;
                contactNo: string;
                testType: string;
                time: string;
              }[];
            }) => ({
              day: day.day,
              tests: day.tests.map(
                (test: {
                  customerName: string;
                  contactNo: string;
                  testType: string;
                  time: string;
                }) => ({
                  customerName: test.customerName,
                  contactNo: test.contactNo,
                  testType: test.testType,
                  time: test.time,
                }),
              ),
            }),
          ),
        );
        toast.success("This week's scheduled tests fetched successfully");
      } else {
        toast.error("Failed to fetch this week's scheduled tests");
        setScheduledTests([]);
      }
    } catch {
      toast.error("Error fetching this week's scheduled tests");
      setScheduledTests([]);
    }
  }, [fetchedOperator?.schoolId]);

  useEffect(() => {
    if (fetchedOperator) {
      setLoading(true);
      Promise.all([
        getAllQueries(),
        fetchTodaysTasks(),
        fetchWeeksTasks(),
      ]).finally(() => setLoading(false));
    } else {
      toast.error("You are not authorized to view this page");
    }
  }, [operator, getAllQueries, fetchTodaysTasks, fetchWeeksTasks]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950/50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            Your Day at a Glance,
          </h1>
          <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400">
            Be energetic to complete today's work
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Important Tasks */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Today's Important tasks
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-blue-500 dark:text-blue-400">
                      <th className="pb-4">Customer name</th>
                      <th className="pb-4">Contact no.</th>
                      <th className="pb-4">LL test/DL test</th>
                      <th className="pb-4">Time</th>
                    </tr>
                  </thead>{" "}
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {tasks.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="py-8 text-center">
                          <div className="text-gray-500 dark:text-gray-400">
                            <p className="text-lg font-medium mb-2">
                              No tasks scheduled for today
                            </p>
                            <p className="text-sm">
                              Enjoy your lighter workload! 🎉
                            </p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      tasks.map((task, index) => (
                        <tr
                          key={index}
                          className="text-gray-900 dark:text-white text-xs md:text-sm"
                        >
                          <td className="py-4">{task.customerName}</td>
                          <td className="py-4">{task.contactNo}</td>
                          <td className="py-4">{task.testType}</td>
                          <td className="py-4">{task.time}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Weekly Schedule */}
            <div className="mt-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                This Week's tests
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-blue-500 dark:text-blue-400">
                      <th className="pb-4">Customer name</th>
                      <th className="pb-4">Contact no.</th>
                      <th className="pb-4">LL test/DL test</th>
                      <th className="pb-4">Time</th>
                    </tr>
                  </thead>{" "}
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {scheduledTests.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="py-8 text-center">
                          <div className="text-gray-500 dark:text-gray-400">
                            <p className="text-lg font-medium mb-2">
                              No tests scheduled for this week
                            </p>
                            <p className="text-sm">
                              Perfect time to catch up on other tasks! 📅
                            </p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      scheduledTests.map((day, index) => (
                        <React.Fragment key={index}>
                          <tr>
                            <td
                              colSpan={4}
                              className="pt-4 pb-1 font-medium text-sm md:text-md text-gray-900 dark:text-white/60"
                            >
                              {day.day}
                            </td>
                          </tr>
                          {day.tests.map((test, testIndex) => (
                            <tr
                              key={testIndex}
                              className="text-gray-900 dark:text-white text-xs md:text-sm"
                            >
                              <td className="py-4">{test.customerName}</td>
                              <td className="py-4">{test.contactNo}</td>
                              <td className="py-4">{test.testType}</td>
                              <td className="py-4">{test.time}</td>
                            </tr>
                          ))}
                        </React.Fragment>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Customer Queries */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                Customer Queries
              </h2>
            </div>
            <div className="p-6">
              {customerQueries.length === 0 ? (
                <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-6 text-center text-blue-700 dark:text-blue-200 font-medium">
                  🎉 There are no customer issues at the moment — everything is
                  running smoothly!
                </div>
              ) : (
                customerQueries.map((query) => (
                  <div
                    key={query.id}
                    className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 mb-4 last:mb-0"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {query.user?.name || "User"}
                      </h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {timeAgo(query.createdAt)}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      {query.description}
                    </p>
                    <button
                      onClick={() => resolveIssue(query.id)}
                      disabled={query.status === "resolved"}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        query.status === "resolved"
                          ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 cursor-not-allowed"
                          : "bg-yellow-400 hover:bg-yellow-500 text-gray-900"
                      }`}
                    >
                      {query.status === "resolved"
                        ? "Resolved"
                        : "Mark as Resolved"}
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoordinatorHome;
