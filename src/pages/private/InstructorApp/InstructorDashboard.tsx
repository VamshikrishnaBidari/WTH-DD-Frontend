import React, { useCallback, useEffect, useState } from "react";
import {
  // Calendar,
  Clock,
  // AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../../utils/axiosInstance";
import { toast } from "sonner";

interface Schedule {
  time: string;
  type: string;
  isActive?: boolean;
  isHoliday?: boolean;
  userId: string;
  courseId: string;
}

// interface Alert {
//   id: string;
//   title: string;
//   message: string;
//   timestamp: string;
//   type: "info" | "warning" | "success";
// }

interface ClassDetails {
  studentName: string;
  studentImage: string;
  time: string;
  progress: {
    completed: number;
  };
  userId: string;
  courseId: string;
  isCompleted: boolean;
  isHoliday: boolean;
}

interface Teacher {
  id: string;
  schoolId: string;
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

const InstructorDashboard: React.FC = () => {
  // const [alerts] = useState<Alert[]>([
  //   {
  //     id: "1",
  //     title: "Schedule Update",
  //     message: "Your next class has been rescheduled to tomorrow at 10 AM",
  //     timestamp: "2 hours ago",
  //     type: "warning",
  //   },
  //   {
  //     id: "2",
  //     title: "New Student Enrolled",
  //     message: "Sarah Johnson has enrolled in your Car Driving course",
  //     timestamp: "3 hours ago",
  //     type: "success",
  //   },
  // ]);
  const [slotNumberMap, setSlotNumberMap] = useState<SlotNumberMap>({});
  const [dayMap, setDayMap] = useState<DayMap>({});
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [classDetails, setClassDetails] = useState<ClassDetails>({
    studentName: "",
    studentImage: "",
    time: "",
    progress: {
      completed: 0,
    },
    userId: "",
    courseId: "",
    isCompleted: false,
    isHoliday: false,
  });
  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(false);
  const getTeacher = useCallback(async () => {
    try {
      const response = await api.get("/teachers/current-teacher");
      if (!response.data.success) {
        toast.error("failed to get teacher details");
        return;
      }
      setTeacher(response.data.user);
    } catch {
      toast.error("failed to fetch teacher details");
      setLoading(false);
    }
  }, []);

  const getSlots = useCallback(async () => {
    try {
      if (!teacher?.schoolId) {
        toast.error("Teacher details are missing");
        return;
      }
      const response = await api.post(`/drivingSlots/${teacher.schoolId}`);
      if (response.data.success) {
        const slots = response.data.slots;

        const newSlotNumberMap: SlotNumberMap = {};
        const newDayMap: DayMap = {};

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
          },
        );

        setSlotNumberMap(newSlotNumberMap);
        setDayMap(newDayMap);
        console.log("Day Map:", dayMap);
        console.log("Slot Number Map:", slotNumberMap);
      } else {
        toast.error("Failed to get slots, please login");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching slots:", error);
      toast.error("An error occurred while fetching slots data");
    }
  }, [teacher?.schoolId]);

  const getTeacherCalendar = useCallback(async () => {
    try {
      if (!teacher?.id || Object.keys(slotNumberMap).length === 0) {
        setLoading(false);
        return;
      }

      const response = await api.post("/calendar/getCalendar", {
        teacherId: teacher.id,
      });
      if (!response.data.success) {
        toast.error("Error fetching teacher calendar data");
        setLoading(false);
        return;
      }

      const calendar = response.data.calendar;
      console.log("Calendar:", calendar);
      const weeklySlotMap: {
        [slot: string]: { userId: string; courseId: string };
      } = {};
      const canceledSlotMap: {
        [slot: string]: { userId: string; courseId: string };
      } = {};
      const addClassSlotMap: {
        [slot:string]:{userId:string,courseId:string}
      }={}
      interface WeeklySlot {
        slot: string;
        userId?: string;
        courseId?: string;
      }

      interface AddClassSlot {
        slot: string;
        userId?:string;
        courseId?:string;
      }
      if (Array.isArray(calendar.addClassSlots)) {
        (calendar.addClassSlots as AddClassSlot[]).forEach(
          (addClassSlot: AddClassSlot) => {
            addClassSlotMap[addClassSlot.slot] = {
              userId: addClassSlot.userId || "",
              courseId: addClassSlot.courseId || ""
            };
          }
        );
      }

      (calendar.weeklySlots as WeeklySlot[]).forEach(
        (weeklySlot: WeeklySlot) => {
          weeklySlotMap[weeklySlot.slot] = {
            userId: weeklySlot.userId || "",
            courseId: weeklySlot.courseId || "",
          };
        },
      );

      interface CanceledSlot {
        slot: string;
        userId?: string;
        courseId?: string;
      }
      // not needed actually
      (calendar.canceledSlots as CanceledSlot[])?.forEach(
        (canceledSlot: CanceledSlot) => {
          canceledSlotMap[canceledSlot?.slot] = {
            userId: canceledSlot.userId || "",
            courseId: canceledSlot.courseId || "",
          };
        },
      );

      const bookingsData: {
        [slot: string]: { userId: string; courseId: string };
      } = {};
      Object.keys(weeklySlotMap).forEach((slot) => {
        if (!canceledSlotMap[slot]) {
          bookingsData[slot] = weeklySlotMap[slot];
        }
      });
      Object.keys(addClassSlotMap).forEach((slot) => {
        if (!canceledSlotMap[slot]) {
          bookingsData[slot] = addClassSlotMap[slot];
        }
      });
      const schedules: Schedule[] = [];
      const currentTime = new Date();
      const currentDay = currentTime.toLocaleString("en-US", {
        weekday: "long",
      });

      console.log("Current Day:", dayMap);
      console.log("d", bookingsData);
      console.log("canceledSlotMap", canceledSlotMap);
      const todaySlots = (dayMap[currentDay] || []).filter(
        ({ slotNumber }) => bookingsData[slotNumber],
      );
      console.log("Filtered Today Slots (only booked):", todaySlots);

      const currentTimeString = currentTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      const holidaySlots = calendar.holidaySlots;

      todaySlots.forEach(({ slotNumber, time }) => {
        const [startTime, endTime] = time.split(" - ");
        const booking = bookingsData[slotNumber] || {};
        schedules.push({
          ...slotNumberMap[slotNumber],
          time,
          isActive:
            currentTimeString >= startTime && currentTimeString <= endTime,
          type: booking.userId ? "Booked" : "Available",
          userId: booking.userId || "",
          courseId: booking.courseId || "",
          isHoliday: holidaySlots.includes(slotNumber),
        });
      });
      console.log("schedules", schedules);
      setSchedules(schedules);
    } catch (error) {
      console.error("Error in getTeacherCalendar:", error);
      toast.error("Error fetching teacher calendar data");
    } finally {
      setLoading(false);
    }
  }, [teacher?.id, slotNumberMap]);

  useEffect(() => {
    getTeacher();
  }, []);

  useEffect(() => {
    if (teacher?.schoolId) {
      getSlots();
    }
  }, [teacher?.schoolId]);

  useEffect(() => {
    if (teacher?.id && Object.keys(slotNumberMap).length > 0) {
      getTeacherCalendar();
    }
  }, [teacher?.id, slotNumberMap]);

  const getUser = async (userId: string) => {
    const response = await api.post(`/users/get-user`, { id: userId });
    if (!response.data.success) {
      toast.error("failed to fetch the user details");
      setLoader(false);
      return null;
    }
    return response.data.user;
  };
  const getCourse = async (courseId: string) => {
    const response = await api.post(`/courses/get`, { id: courseId });
    if (!response.data.success) {
      toast.error("failed to fetch the course details");
      setLoader(false);
      return null;
    }
    return response.data.data;
  };

  const navigate = useNavigate();
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
            Welcome back! Here's what's happening with your teaching today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Schedule Section */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-xl shadow-sm p-4 md:p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Today's Schedule
            </h2>
            {schedules.length === 0 && (
              <div className="text-center text-gray-500 dark:text-gray-400">
                No upcoming classes
              </div>
            )}
            {/* TODO:   think about it */}
            {schedules.length > 0 && (
              <>
                {/* Schedule Grid */}
                <div className="space-y-4">
                  <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-lg">
                    <span className="font-medium">
                      {new Date().toLocaleString("en-US", { weekday: "short" })}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {schedules?.map((schedule, index) => (
                      <div
                        key={index}
                        className={`p-2 md:p-4 rounded-lg ${
                          schedule.isHoliday
                            ? "bg-red-500/30 dark:bg-red-600/40 border border-red-500 text-red-200 cursor-not-allowed"
                            : schedule.isActive
                              ? "bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500 dark:border-blue-400"
                              : "bg-blue-500 dark:bg-blue-600 text-white"
                        }`}
                        onClick={async () => {
                          setLoader(true);
                          setClassDetails({
                            studentName: "",
                            studentImage: "",
                            time: "",
                            progress: {
                              completed: 0,
                            },
                            userId: "",
                            courseId: "",
                            isCompleted: false,
                            isHoliday: false,
                          });

                          const user = await getUser(schedule.userId);
                          const course = await getCourse(schedule.courseId);
                          console.log("schedule", schedule);

                          const [startStr] = schedule.time.split(" - ");
                          const today = new Date();

                          function parseTimeToDate(
                            timeStr: string,
                            baseDate: Date,
                          ): Date {
                            const [time, modifier] = timeStr.split(" ");
                            const [hoursStr, minutesStr] = time.split(":");
                            let hours = parseInt(hoursStr, 10);
                            const minutes = parseInt(minutesStr, 10);

                            if (modifier === "PM" && hours !== 12) hours += 12;
                            if (modifier === "AM" && hours === 12) hours = 0;

                            const result = new Date(baseDate);
                            result.setHours(hours, minutes, 0, 0);
                            return result;
                          }

                          const classStartTime = parseTimeToDate(
                            startStr,
                            today,
                          );
                          console.log("classStartTime", classStartTime);

                          let isCompleted = false;
                          if (
                            course.history &&
                            Array.isArray(course.history) &&
                            course.history.length > 0
                          ) {
                            const latestHistoryEntry =
                              course.history[course.history.length - 1];
                            console.log(
                              "latestHistoryEntry",
                              latestHistoryEntry,
                            );

                            const historyCreatedAt = new Date(
                              latestHistoryEntry.createdAt,
                            );
                            console.log("historyCreatedAt", historyCreatedAt);

                            const isToday =
                              historyCreatedAt.getFullYear() ===
                                today.getFullYear() &&
                              historyCreatedAt.getMonth() ===
                                today.getMonth() &&
                              historyCreatedAt.getDate() === today.getDate();

                            console.log("isToday", isToday);

                            const isAfterClassStart =
                              historyCreatedAt >= classStartTime;
                            console.log("isAfterClassStart", isAfterClassStart);

                            isCompleted = isToday && isAfterClassStart;
                            console.log("isCompleted", isCompleted);
                          }

                          console.log("course", course);

                          setClassDetails({
                            studentName: user?.name || "",
                            studentImage: user?.image || "",
                            time: schedule.time,
                            progress: {
                              completed: course?.classesTaken || 0,
                            },
                            userId: schedule.userId,
                            courseId: schedule.courseId,
                            isCompleted: isCompleted,
                            isHoliday: schedule.isHoliday || false,
                          });

                          setLoader(false);
                        }}
                      >
                        <p
                          className={`text-center ${schedule.isActive ? "text-blue-900 dark:text-blue-100" : "text-white"}`}
                        >
                          {schedule.time}
                        </p>
                        <p
                          className={`text-center mt-2 ${schedule.isActive ? "text-blue-900 dark:text-blue-100" : "text-white"}`}
                        >
                          {schedule.type}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 md:mt-8 space-y-2 md:space-y-4">
                  <button
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-3 rounded-lg transition-colors"
                    onClick={() => {
                      if (classDetails.isHoliday) {
                        toast.error("This class is on holiday");
                        return;
                      }
                      console.log("classDetails", classDetails);
                      if (!classDetails.courseId) {
                        toast.error("please select a schedule");
                        return;
                      }
                      if (!classDetails.isCompleted) {
                        navigate(
                          `/instructor/pre-class-overview/${classDetails.courseId}`,
                        );
                      }
                    }}
                  >
                    {classDetails.isCompleted
                      ? "Completed"
                      : "Confirm and Take classes"}
                  </button>

                  {/* <div className="flex flex-col sm:flex-row gap-2 md:gap-4">
                      <button className="flex-1 px-6 py-2 bg-orange-200 hover:bg-orange-200 dark:bg-orange-900/20 dark:hover:bg-orange-900/30 text-orange-700 dark:text-orange-300 border border-orange-700 dark:border-orange-300 rounded-lg transition-colors">
                        Reschedule
                      </button>
                      <button className="flex-1 px-6 py-2 bg-red-200 hover:bg-red-200 dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg border border-red-700 dark:border-red-300 transition-colors">
                        Cancel
                      </button>
                    </div> */}
                </div>
              </>
            )}
          </div>

          {/* Class Details */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-4 md:p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Class Details
            </h2>
            {loader && (
              <div className="text-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400">
                  Loading details...
                </p>
              </div>
            )}
            {(schedules.length === 0 || classDetails.courseId === "") &&
              !loader && (
                <div className="text-center text-gray-500 dark:text-gray-400">
                  No upcoming classes , please choose a schedule
                </div>
              )}
            {schedules.length > 0 && classDetails.courseId && (
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <img
                    src={
                      classDetails.studentImage ||
                      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop"
                    }
                    alt={classDetails.studentName || "Student"}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {classDetails.studentName}
                    </h3>
                    <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{classDetails.time}</span>
                    </div>
                  </div>
                </div>
                {/* no need for now will increase db load to fetch */}
                {/* <div>
                    <p className="text-gray-600 dark:text-gray-400 mb-1">Classes topic:</p>
                    <p className="font-medium text-gray-900 dark:text-white">Brakes and clutch</p>
                  </div>

                  <div>
                    <p className="text-gray-600 dark:text-gray-400 mb-1">Last class:</p>
                    <p className="font-medium text-gray-900 dark:text-white">Basics of accelerator</p>
                  </div> */}

                <div>
                  <p className="text-gray-600 dark:text-gray-400 mb-1">
                    Progress
                  </p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {classDetails.progress.completed} classes completed
                  </p>
                </div>
                <div className="mt-4">
                  <p className="text-gray-600 dark:text-gray-400 mb-1">
                    Status
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-1">
                    {classDetails.isCompleted
                      ? "this class is completed"
                      : "this class is not completed"}
                  </p>
                </div>

                {/* <div>
                    <p className="text-gray-600 dark:text-gray-400 mb-1">Next class:</p>
                    <p className="font-medium text-gray-900 dark:text-white">Wed, 9:00 AM - 10:00 AM</p>
                  </div> */}
              </div>
            )}
          </div>
        </div>

        {/* Quick Alerts */}
        {/* <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-4 md:p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Quick Alerts
          </h2>

          {alerts.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <AlertCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>You're all caught up! No new alerts.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-start gap-4 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg"
                >
                  <div
                    className={`
                    p-2 rounded-full
                    ${alert.type === "warning" ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400" : ""}
                    ${alert.type === "success" ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400" : ""}
                    ${alert.type === "info" ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" : ""}
                  `}
                  >
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {alert.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {alert.message}
                    </p>
                    <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
                      {alert.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default InstructorDashboard;
