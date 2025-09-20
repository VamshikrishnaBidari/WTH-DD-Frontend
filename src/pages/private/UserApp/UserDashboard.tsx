import React, { useState, useEffect, useCallback, useRef } from "react";
import { Calendar } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../app/store";
import api from "../../../utils/axiosInstance"; // For API calls
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../../features/authSlice";
import { useSocket } from "../../../context/SocketProvider";

interface ProgressData {
  coursesCompleted: number;
  totalCourses: number;
  progressPercentage: number;
}

interface Notifications {
  id: string;
  fromUserId: string;
  toUserId: string;
  title: string;
  message: string;
  isRead: boolean;
  [key: string]: any;
}

const UserDashboard: React.FC = () => {
  const [notifications, setNotifications] = useState<Notifications[]>([]);
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const socket = useSocket();

  interface User {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    [key: string]: any;
  }
  interface Course {
    id: string;
    type: string;
    teacher: {
      name: string;
      [key: string]: any;
    };
    classesTotal: number;
    classStart: Date;
    classesTaken: number;
    [key: string]: any;
  }

  interface SlotNumberMap {
    [slotNumber: string]: {
      day: string;
      time: string;
    };
  }

  interface DayMap {
    [day: string]: {
      slotNumber: string;
      time: string;
    }[];
  }
  interface Schedule {
    day: string;
    time: string;
    isActive?: boolean;
    isHoliday?: boolean;
    [key: string]: any;
  }

  const [fetchedUser, setFetchedUser] = useState<User | null>(null);
  // const [fetchedSchool, setFetchedSchool] = useState<DrivingSchool | null>(useSelector((state:RootState)=>state.school.school) as DrivingSchool | null);
  // const dispatch = useDispatch();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  const [progressData, setProgressData] = useState<ProgressData>({
    coursesCompleted: 0,
    totalCourses: 18,
    progressPercentage: 0,
  });

  const slotNumberMapRef = useRef<SlotNumberMap>({});
  const dayMapRef = useRef<DayMap>({});
  const startTimesRef = useRef<string[]>([]);
  const scheduleRef = useRef<Schedule[]>([]);

  // Optional: Create state if you need to trigger re-renders when these change
  // const [slotNumberMap, setSlotNumberMap] = useState<SlotNumberMap>({});
  // const [dayMap, setDayMap] = useState<DayMap>({});
  // const [startTimes, setStartTimes] = useState<string[]>([]);
  const [schedule, setSchedule] = useState<Schedule[]>([]);

  const getLatestCourse = useCallback(async () => {
    try {
      const response = await api.post("/users/latest-course", {
        id: user?.id,
      });
      console.log("getLatestCourse", response);

      if (response.data.success) {
        setCourse(response.data.course);
        setProgressData({
          coursesCompleted: response.data.course.classesTaken,
          totalCourses: response.data.course.classesTotal,
          progressPercentage: Math.round(
            (response.data.course.classesTaken /
              response.data.course.classesTotal) *
              100,
          ),
        });
      }
    } catch (error) {
      console.error("Error fetching latest course:", error);
      // // toast.error("An error occurred while fetching the latest course");
    }
  }, [user?.id]);

  const getUser = useCallback(async () => {
    try {
      if (!user?.id) return;
      const response = await api.post(`/users/get-user`, {
        id: user?.id,
      });
      // console.log("getuser", response);
      if (response.data.success) {
        setFetchedUser(response.data.user);
        dispatch(setUser(response.data.user)); // Update Redux store
        return response.data.user; // Return user data for chaining
      } else {
        // // toast.error("Failed to get user, please login");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      // // toast.error("An error occurred while fetching user data");
      return null;
    }
  }, [user?.id]);

  const getSlots = useCallback(
    async (userData: {
      id: string;
      courses: { teacher: { schoolId: string } }[];
    }): Promise<SlotNumberMap> => {
      try {
        // console.log("fetchedUser", userData);
        if (!userData || !userData.courses || userData.courses.length === 0) {
          // // toast.error("No courses found for the user");
          return {};
        }

        const response = await api.post(
          `/drivingSlots/${userData?.courses[0]?.teacher?.schoolId || import.meta.env.VITE_SCHOOL_ID}`,
        );
        console.log("getSlots", response);

        if (response.data.success) {
          const slots = response.data.slots;
          const newSlotNumberMap: SlotNumberMap = {};
          const newDayMap: DayMap = {};
          const newStartTimes: string[] = [];

          slots.forEach(
            (slot: { slotNumber: string; day: string; time: string }) => {
              newSlotNumberMap[slot.slotNumber] = {
                day: slot.day,
                time: slot.time,
              };

              if (!newDayMap[slot.day]) {
                newDayMap[slot.day] = [];
              }
              newDayMap[slot.day].push({
                slotNumber: slot.slotNumber,
                time: slot.time,
              });

              // Extract start time
              const startTime = slot.time.split(" - ")[0];
              newStartTimes.push(startTime);
            },
          );

          // Update refs
          slotNumberMapRef.current = newSlotNumberMap;
          dayMapRef.current = newDayMap;
          startTimesRef.current = newStartTimes;

          // Update state if needed for re-renders
          // setSlotNumberMap(newSlotNumberMap);
          // setDayMap(newDayMap);
          // setStartTimes(newStartTimes);

          return newSlotNumberMap;
        } else {
          // // toast.error("Failed to get slots, please login");
          return {};
        }
      } catch (error) {
        console.error("Error fetching slots:", error);
        // // toast.error("An error occurred while fetching slots data");
        return {};
      }
    },
    [],
  );
  //TODO:  show cancel if needed
  const getCalendar = useCallback(
    async (slotMap: SlotNumberMap): Promise<void> => {
      try {
        if (!user?.id) return;
        const response = await api.post(`/userCalendar/get-week`, {
          userId: user?.id,
        });
        console.log("getCalendar", response);

        if (!response.data.success) {
          // toast.error("Failed to get calendar, please login");
          return;
        }

        const successfulCalendars = response.data.userCalendar;
        const dayOrder = [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ];
        const tempSchedule: Schedule[] = [];
        if (successfulCalendars.length > 0) {
          successfulCalendars.forEach(
            (calendar: {
              slots: string[];
              holidaySlots: string[];
              addClassSlots: string[];
            }) => {
              const holidaySlots = calendar.holidaySlots;
              const { slots: slotsArr, addClassSlots } = calendar;
              const slots = [...slotsArr, ...addClassSlots];
              slots.forEach((slot: string) => {
                const slotData = slotMap[slot];
                if (slotData) {
                  const [startTime, endTime] = slotData.time.split(" - ");
                  const currentTime = new Date();
                  const currentDay = currentTime.toLocaleString("en-US", {
                    weekday: "long",
                  });
                  const currentTimeString = currentTime.toLocaleTimeString(
                    "en-US",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    },
                  );

                  tempSchedule.push({
                    ...slotData,
                    isActive:
                      slotData.day === currentDay &&
                      currentTimeString >= startTime &&
                      currentTimeString <= endTime,
                    isHoliday: holidaySlots.includes(slot),
                  });
                }
              });
            },
          );
          const newSchedule: Schedule[] = tempSchedule.sort((a, b) => {
            const dayIndexA = dayOrder.indexOf(a.day);
            const dayIndexB = dayOrder.indexOf(b.day);

            // If days are the same, sort by time
            if (dayIndexA === dayIndexB) {
              // Convert time to comparable format for sorting
              const timeA = convertTo24Hour(a.time.split(" - ")[0]);
              const timeB = convertTo24Hour(b.time.split(" - ")[0]);
              return timeA.localeCompare(timeB);
            }

            return dayIndexA - dayIndexB;
          });
          function convertTo24Hour(time12h: string): string {
            const [time, modifier] = time12h.split(" ");
            let [hours, minutes] = time.split(":");

            if (hours === "12") {
              hours = "00";
            }

            if (modifier === "PM") {
              hours = (parseInt(hours, 10) + 12).toString();
            }

            return `${hours.padStart(2, "0")}:${minutes}`;
          }

          // Update refs and state
          scheduleRef.current = newSchedule;
          setSchedule(newSchedule);
        } else {
          // toast.error("Failed to get calendar, please login");
        }
      } catch (error) {
        console.error("Error fetching calendar:", error);
        // toast.error("An error occurred while fetching calendar data");
      }
    },
    [user?.id],
  );

  const getNotifications = useCallback(async (userId: string) => {
    try {
      const response = await api.post("/notification", {
        userId: userId,
      });
      console.log("getNotifications", response);
      if (!response.data.success) {
        // toast.error("Failed to get notifications, please login");
        return;
      }
      setNotifications(response.data.notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      // toast.error("An error occurred while fetching notifications data");
      return;
    }
  }, []);

  const markAsRead = async (notificationId: string) => {
    try {
      const response = await api.post("/notification/read", {
        id: notificationId,
      });
      if (!response.data.success) {
        // toast.error("Failed to mark notification as read, please login");
        return;
      }
      // getNotifications(user?.id);
      toast.success("Notification marked as read");
    } catch (error) {
      console.error("Error marking notification as read:", error);
      // toast.error("An error occurred while marking notification as read");
    }
  };

  const fetchAllData = useCallback(async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    try {
      // Step 1: Get user data
      const userData = await getUser();
      if (!userData) {
        setLoading(false);
        return;
      }

      // Step 2: Get slots and wait for completion
      const slotMap = await getSlots(userData);

      // Step 3: Get calendar using the fresh slot map
      await getCalendar(slotMap);

      // Step 4: Get latest course (independent)
      await getLatestCourse();

      // Step 5: Get notifications
      await getNotifications(userData.id);
    } catch (error) {
      console.error("Error in fetchAllData:", error);
      // toast.error("An error occurred while fetching data");
    } finally {
      setLoading(false);
    }
  }, [user?.id, getUser, getSlots, getCalendar, getLatestCourse]);

  useEffect(() => {
    fetchAllData();
  }, [user?.id]);

  useEffect(() => {
    // Fetch progress data
    const fetchProgressData = async () => {
      try {
        // Simulated API call
        const dummyProgress: ProgressData = {
          coursesCompleted: 0,
          totalCourses: 18,
          progressPercentage: 0,
        };
        setProgressData(dummyProgress);
      } catch (error) {
        console.error("Error fetching progress data:", error);
      }
    };
    fetchProgressData();
  }, []);

  useEffect(() => {
    if (!socket) return;

    const handleNotification = (notification: Notifications) => {
      toast.success("New notification received");
      markAsRead(notification.id);
      setNotifications([notification, ...notifications]);
    };

    socket?.on("notification", handleNotification);
    return () => {
      socket?.off("notification", handleNotification);
    };
  }, [socket]);

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

  return (
    <div
      className={`max-w-5xl mx-auto min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200`}
    >
      {/* Mobile menu button */}

      {/* Sidebar */}

      {/* Main Content */}
      <div className={`transition-all duration-200`}>
        {/* Header */}

        {/* Main Content */}
        <main className="py-6 lg:p-5">
          <div className="mb-6 mx-3">
            <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              Dashboard Overview
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Welcome back! Here’s your latest driving course progress and
              schedule updates.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-6 lg:gap-x-6">
            {/* Personal Information */}
            <div className="lg:col-span-8 bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Name
                  </p>
                  {/* <p className="font-medium text-gray-900 dark:text-white">Sarah Williams</p> */}
                  <p className="font-medium text-gray-900 dark:text-white">
                    {fetchedUser?.name || ""}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Mobile Number
                  </p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {fetchedUser?.phoneNumber}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Course Selected
                  </p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {course?.type} - {course?.vehicle}
                  </p>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Instructor
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {course?.teacher?.name}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Started Date
                  </p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {course?.classStart
                      ? new Date(course.classStart).toLocaleDateString()
                      : ""}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Total Number of classes
                  </p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {course?.classesTotal}
                  </p>
                </div>
              </div>
            </div>

            {/* Progress Overview */}
            <div className="lg:col-span-4 bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Progress Overview
              </h2>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-semibold px-2 py-1 rounded-full">
                      Course Progress
                    </span>
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                      {progressData.progressPercentage}%
                    </span>
                  </div>
                  <div className="h-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                    <div
                      className="h-2 bg-blue-600 dark:bg-blue-400 rounded-full transition-all duration-500"
                      style={{ width: `${progressData.progressPercentage}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Classes Attended
                  </p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {progressData.coursesCompleted} of{" "}
                    {progressData.totalCourses}
                  </p>
                </div>
              </div>
            </div>

            {/* Schedule */}
            <div className="lg:col-span-8 bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Schedule
                </h2>
                <span className="text-blue-600 dark:text-blue-400 font-semibold">
                  {new Date().toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6 justify-items-center">
                {schedule.map((slot, index) => (
                  <div
                    key={index}
                    className={`w-full p-4 rounded-lg border text-center shadow-sm transition-all ${
                      slot.isHoliday
                        ? "bg-red-500/30 dark:bg-red-600/40 border border-red-500 dark:text-gray-200  cursor-not-allowed"
                        : slot.isActive
                          ? "bg-blue-500 text-white border-blue-600 dark:bg-blue-600 dark:border-blue-700"
                          : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700"
                    }`}
                    onClick={() => {
                      if (slot.isHoliday) {
                        toast.info("this slot is holiday");
                        return;
                      }
                    }}
                  >
                    <p
                      className={`text-sm ${slot.isActive ? "font-bold" : ""}`}
                    >
                      {slot.day}
                    </p>
                    <p
                      className={`text-sm ${slot.isActive ? "font-semibold" : ""}`}
                    >
                      {slot.time}
                    </p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate("/user/bookings")}
                className="bg-yellow-100/50 dark:bg-yellow-400/20 text-black dark:text-yellow-200 font-medium px-4 py-2 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-400/30 transition-colors"
              >
                Reschedule / Cancel
              </button>

              <div className="mt-6">
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                  Next class
                </p>
                <div className="mt-2 bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg flex items-center justify-between">
                  <div>
                    {schedule.length > 0 ? (
                      (() => {
                        const now = new Date();
                        const today = now.toLocaleString("en-US", {
                          weekday: "long",
                        });
                        const currentTime = now.toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        });
                        const daysOfWeek = [
                          "Sunday",
                          "Monday",
                          "Tuesday",
                          "Wednesday",
                          "Thursday",
                          "Friday",
                          "Saturday",
                        ];
                        const todayIndex = daysOfWeek.indexOf(today);

                        // Fixed time parsing function
                        // interface ParsedTime {
                        //   hour24: number;
                        //   minutes: number;
                        //   totalMinutes: number;
                        // }

                        const parseTime = (timeStr: string): number => {
                          const cleanTime: string = timeStr.trim();
                          const [time, period] = cleanTime.split(" ");
                          const [hours, minutes] = time.split(":").map(Number);

                          let hour24: number = hours;
                          if (period === "PM" && hours !== 12) {
                            hour24 = hours + 12;
                          } else if (period === "AM" && hours === 12) {
                            hour24 = 0;
                          }

                          return hour24 * 60 + minutes;
                        };

                        const isTimeAfter = (
                          time1: string,
                          time2: string,
                        ): boolean => {
                          return parseTime(time1) > parseTime(time2);
                        };

                        let nextClass = null;

                        // Check today's classes first
                        const todayClasses = schedule
                          .filter((slot) => slot.day === today)
                          .filter((slot) => {
                            const startTime = slot.time.split(" - ")[0];
                            return isTimeAfter(startTime, currentTime);
                          })
                          .sort((a, b) => {
                            const aStart = a.time.split(" - ")[0];
                            const bStart = b.time.split(" - ")[0];
                            return parseTime(aStart) - parseTime(bStart); // Sort by earliest time first
                          });

                        if (todayClasses.length > 0) {
                          nextClass = todayClasses[0];
                        } else {
                          // Look for next day's classes
                          for (let i = 1; i <= 7; i++) {
                            const nextDayIndex = (todayIndex + i) % 7;
                            const nextDay = daysOfWeek[nextDayIndex];

                            const nextDayClasses = schedule
                              .filter((slot) => slot.day === nextDay)
                              .sort((a, b) => {
                                const aStart = a.time.split(" - ")[0];
                                const bStart = b.time.split(" - ")[0];
                                return parseTime(aStart) - parseTime(bStart); // Sort by earliest time first
                              });

                            if (nextDayClasses.length > 0) {
                              nextClass = nextDayClasses[0];
                              break;
                            }
                          }
                        }

                        return nextClass?.isHoliday ? (
                          <>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {`${nextClass.day}, ${nextClass.time}`} -{" "}
                              {nextClass.isHoliday ? "Holiday" : ""}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Instructor: {course?.teacher?.name || "N/A"}
                            </p>
                          </>
                        ) : nextClass ? (
                          <>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {`${nextClass.day}, ${nextClass.time}`}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Instructor: {course?.teacher?.name || "N/A"}
                            </p>
                          </>
                        ) : (
                          <p className="font-medium text-gray-900 dark:text-white">
                            No upcoming classes
                          </p>
                        );
                      })()
                    ) : (
                      <p className="font-medium text-gray-900 dark:text-white">
                        No upcoming classes
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Notes */}
            <div className="lg:col-span-4 bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Quick note
              </h2>
              <div className="space-y-4 max-h-80 overflow-y-auto pr-2 scrollbar-thin">
                {notifications.length === 0 ? (
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    No Notifications available
                  </p>
                ) : (
                  notifications.map((notification) => (
                    <div key={notification.id} className="flex gap-4">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center 'bg-blue-100 dark:bg-blue-900">
                        <Calendar
                          className={`w-4 h-4 text-blue-600 dark:text-blue-400`}
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {notification.title}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {notification.message}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
