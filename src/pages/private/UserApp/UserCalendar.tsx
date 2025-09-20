import React, { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import api from "../../../utils/axiosInstance";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { User as StudentUser } from "../../../interfaces/models";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CarImg: React.FC<{ className: string; fill: string }> = ({
  className,
  fill,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.0"
    width="42pt"
    viewBox="0 0 1588.000000 1027.000000"
    preserveAspectRatio="xMidYMid meet"
    className={className}
  >
    <g
      transform="translate(0.000000,1027.000000) scale(0.100000,-0.100000)"
      fill={fill}
      stroke="none"
    >
      <path d="M8610 7059 c-387 -25 -871 -100 -1225 -190 -851 -217 -1576 -547 -2313 -1055 l-93 -64 -103 0 c-57 0 -201 -7 -322 -15 -616 -43 -1167 -137 -1733 -295 -222 -62 -438 -132 -611 -200 -115 -45 -142 -60 -180 -99 -101 -103 -244 -350 -303 -521 -79 -227 -96 -440 -57 -709 22 -150 22 -161 7 -185 -34 -51 -20 -89 42 -117 81 -36 131 -99 131 -167 0 -26 6 -32 51 -51 115 -50 310 -78 610 -88 192 -6 196 -6 217 15 26 26 27 36 5 132 -23 103 -23 367 0 467 54 235 158 427 321 589 231 230 506 344 833 344 254 0 464 -68 678 -218 247 -173 425 -461 475 -765 13 -84 13 -280 -2 -390 -12 -88 -12 -90 11 -108 23 -18 105 -19 2868 -19 2704 0 2844 1 2839 18 -79 257 -67 537 33 787 123 306 392 563 701 668 137 47 224 60 385 60 161 0 246 -13 385 -60 320 -108 600 -383 714 -704 58 -163 69 -232 69 -437 -1 -248 -31 -234 320 -147 505 125 707 204 816 321 70 74 101 137 136 270 64 243 34 466 -83 636 -16 24 -59 72 -96 108 -66 64 -66 65 -66 120 0 171 -37 428 -81 566 -16 50 -29 105 -29 122 0 70 -50 229 -78 245 -42 27 -357 55 -727 66 l-260 8 -125 72 c-188 110 -482 259 -695 354 -833 369 -1674 578 -2560 637 -175 11 -723 11 -905 -1z m240 -727 l0 -459 -192 -7 c-176 -6 -476 -15 -2013 -61 -275 -8 -639 -20 -808 -26 -170 -6 -311 -8 -313 -6 -11 10 339 207 581 327 766 381 1565 603 2430 674 88 8 195 14 238 15 l77 1 0 -458z m737 443 c498 -40 940 -120 1408 -255 144 -42 418 -131 478 -155 15 -6 17 -26 17 -211 l0 -204 -82 0 c-46 0 -207 -5 -358 -10 -151 -5 -516 -16 -810 -25 -294 -9 -647 -20 -785 -25 -137 -4 -253 -6 -257 -4 -5 3 -8 207 -8 455 l0 449 104 0 c58 0 189 -7 293 -15z" />
      <path d="M11645 4735 c-160 -38 -250 -78 -375 -166 -203 -143 -345 -352 -411 -605 -20 -76 -24 -113 -24 -249 0 -143 3 -171 28 -260 83 -307 296 -559 580 -690 270 -124 602 -122 871 3 458 215 699 725 573 1212 -86 328 -327 597 -642 715 -183 69 -412 84 -600 40z m369 -481 c148 -38 293 -157 359 -295 78 -163 77 -324 -4 -488 -168 -341 -622 -414 -889 -141 -137 139 -191 344 -139 530 29 106 64 164 144 246 76 76 163 127 258 150 73 17 198 17 271 -2z" />
      <path d="M3745 4720 c-249 -40 -447 -142 -617 -318 -129 -135 -209 -275 -260 -462 -20 -74 -23 -107 -23 -260 1 -136 5 -189 18 -240 116 -422 426 -714 836 -785 580 -102 1121 284 1216 866 20 122 19 210 -4 339 -37 213 -131 396 -281 550 -190 196 -436 305 -710 315 -63 2 -142 0 -175 -5z m250 -495 c188 -40 360 -193 414 -369 46 -148 36 -280 -30 -415 -170 -347 -624 -419 -892 -143 -212 221 -211 559 2 771 76 76 166 128 266 152 87 22 150 23 240 4z" />
    </g>
  </svg>
);

// Cancel button dropdown menu:

interface CancelProps {
  date?: string;
  time?: string;
  instructor?: string;
  onCancel: (scope: "week" | "day") => void;
  onBack: () => void;
  showScopeOptions?: boolean; // Allow toggling this feature
}

const Cancel: React.FC<CancelProps> = ({
  date = "Mon 19",
  time = "9:30 AM",
  instructor = "Michael Anderson",
  onCancel,
  onBack,
  showScopeOptions = true,
}) => {
  const [cancelScope, setCancelScope] = useState<"week" | "day">("week");

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6 font-satoshi">
      <div className="flex flex-col items-center space-y-6">
        {/* Session Info */}
        <div className="w-full flex flex-col md:flex-row justify-center items-center gap-4 text-center">
          <h2 className="text-gray-900 dark:text-white text-lg font-medium">
            The session :
          </h2>
          <div className="bg-blue-500 text-white px-6 py-2.5 rounded-lg flex items-center gap-4 shadow-sm">
            <span className="font-bold">{date}</span>
            <span>{time}</span>
          </div>
        </div>

        {/* Instructor Info */}
        <div className="w-full flex flex-col md:flex-row justify-center items-center gap-4 text-center">
          <h2 className="text-gray-900 dark:text-white text-lg font-medium">
            Instructor :
          </h2>
          <span className="text-gray-900 dark:text-white font-medium">
            {instructor}
          </span>
        </div>

        {/* Cancellation Scope Options */}
        {showScopeOptions && (
          <div className="w-full max-w-lg">
            <h3 className="text-gray-900 dark:text-white text-sm font-medium mb-3 text-center">
              What would you like to cancel?
            </h3>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                <input
                  type="radio"
                  name="cancelScope"
                  value="week"
                  checked={cancelScope === "week"}
                  onChange={(e) =>
                    setCancelScope(e.target.value as "week" | "day")
                  }
                  className="text-red-400 focus:ring-red-400"
                />
                <div className="flex-1">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    This week's session
                  </span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Cancel all session for this week
                  </p>
                </div>
              </label>

              <label className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                <input
                  type="radio"
                  name="cancelScope"
                  value="day"
                  checked={cancelScope === "day"}
                  onChange={(e) =>
                    setCancelScope(e.target.value as "week" | "day")
                  }
                  className="text-red-400 focus:ring-red-400"
                />
                <div className="flex-1">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Entire course
                  </span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Cancel all remaining sessions in this course
                  </p>
                </div>
              </label>
            </div>
          </div>
        )}

        {/* Warning Message */}
        <p className="text-gray-500 dark:text-gray-400 text-center max-w-lg">
          {cancelScope === "week" &&
            "This will cancel all sessions for this week. You can reschedule by talking with instructor"}
          {cancelScope === "day" &&
            "This will cancel the entire course. This action cannot be undone easily."}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg">
          <button
            onClick={() => onCancel(cancelScope)}
            className="w-full sm:w-1/2 bg-red-400 hover:bg-red-500 text-white py-2.5 px-4 rounded-lg font-medium transition-colors"
          >
            {cancelScope === "week" && "Cancel this week"}
            {cancelScope === "day" && "Cancel entire course"}
          </button>
          <button
            onClick={onBack}
            className="w-full sm:w-1/2 bg-yellow-100 dark:bg-yellow-400/20 hover:bg-yellow-200 dark:hover:bg-yellow-400/30 text-black dark:text-yellow-200 py-2.5 px-4 rounded-lg font-medium transition-colors"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  image: string;
  [key: string]: any;
}
interface Schedule {
  day: string;
  time: string;
  isActive?: boolean;
  [key: string]: any;
}

const UserCalendar: React.FC = () => {
  const [user, setUser] = useState<StudentUser | null>(
    useSelector((state: RootState) => state.auth.user) as StudentUser,
  );
  const [courseId, setCourseId] = useState<string | null>(null);
  const courseIds =
    user?.courses
      ?.filter((course) => course.completed === false)
      .map((course) => course.id) || [];
  const [additionScope, setAdditionScope] = useState<"week" | "day">("week");

  const [isCourse, setIsCourse] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState<string | null>(
    null,
  );
  const [teachers, setTeachers] = useState<User[]>([]);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [rescheduleOpen, setRescheduleOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(true);
  const navigate = useNavigate();
  const [isHoliday, setIsHoliday] = useState(false);
  interface Course {
    id: string;
    teacher: {
      name: string;
      gender: string;
      image: string;
      id: string;
      vehicle: string[];
      experience: number;
      email: string;
      phoneNumber: string;
    };
    [key: string]: any;
  }

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const [course, setCourse] = useState<Course[] | null>(null);
  const [selectedSlots, setSelectedSlots] = useState<
    { day: string; time: string }[]
  >([]);
  const [fromTime, setFromTime] = useState("9:00 AM");
  const [fromDay, setFromDay] = useState("Monday");
  const [toTime, setToTime] = useState("9:00 AM");
  const [toDay, setToDay] = useState("Monday");
  const [slotSelected, setSlotSelected] = useState<{
    day: string;
    time: string;
  }>({ day: "", time: "" });
  // useState for values that need to trigger re-renders
  // useState for values that need to trigger re-renders
  const [startTimes, setStartTimes] = useState<string[]>([]);
  const [schedule, setSchedule] = useState<Schedule[]>([]);
  const [classLimit, setClassLimit] = useState(8);
  const [currentClassCount, setCurrentClassCount] = useState(0);
  const [teacherSchedule, setTeacherSchedule] = useState<Schedule[]>([]);
  const [teacherAvailable, setTeacherAvailable] = useState<Schedule[]>([]);
  const [addClassSlots, setAddClassSlots] = useState<string[]>([]);
  const [slotNumberMap, setSlotNumberMap] = useState<{
    [key: string]: { day: string; time: string };
  }>({});
  const [dayMap, setDayMap] = useState<{
    [key: string]: { slotNumber: string; time: string }[];
  }>({});
  const [loader2, setLoader2] = useState(false);
  const [canceledSlots, setCanceledSlots] = useState<Schedule[]>([]);
  const [rescheduleOption, setRescheduleOption] = useState<"week" | "day">(
    "week",
  );
  const [cancelSlots, setCancelSlots] = useState<{
    day: string;
    time: string;
  }>();
  const [cancelClassCount, setCancelClassCount] = useState(0);

  // useRef to store latest values without causing re-renders in callbacks
  const startTimesRef = useRef<string[]>([]);
  const scheduleRef = useRef<Schedule[]>([]);
  const teacherScheduleRef = useRef<Schedule[]>([]);
  const teacherAvailableRef = useRef<Schedule[]>([]);
  // const slotNumberMapRef = useRef<{[key: string]: {day: string; time: string}}>({});
  const dayMapRef = useRef<{
    [key: string]: { slotNumber: string; time: string }[];
  }>({});

  // Update refs whenever state changes
  useEffect(() => {
    startTimesRef.current = startTimes;
  }, [startTimes]);

  useEffect(() => {
    scheduleRef.current = schedule;
  }, [schedule]);

  useEffect(() => {
    teacherScheduleRef.current = teacherSchedule;
  }, [teacherSchedule]);

  useEffect(() => {
    teacherAvailableRef.current = teacherAvailable;
  }, [teacherAvailable]);

  // useEffect(() => {
  //   slotNumberMapRef.current = slotNumberMap;
  // }, [slotNumberMap]);

  useEffect(() => {
    dayMapRef.current = dayMap;
  }, [dayMap]);

  const [isInitialized, setIsInitialized] = useState(false);

  const getCurrentUser = useCallback(async () => {
    try {
      const response = await api.get("/users/current-user");
      console.log("getuser", response);
      if (!response.data.success) {
        // toast.error("Error fetching user data");
        return null;
      }
      setUser(response.data.user);
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const today = new Date();
      const dayName = days[today.getDay()];
      if (response.data.user.Holiday === dayName) {
        setIsHoliday(true);
        setInitLoading(false);
        return null;
      }
      return response.data.user;
    } catch {
      // toast.error("Error fetching user data");
      return null;
    }
  }, []);

  const getCourse = useCallback(
    async (userData: {
      id: string;
      LL: "Completed" | "InProgress" | "Pending";
    }) => {
      try {
        if (!userData) {
          // toast.error("User data is not available");
          return null;
        }
        console.log("userDataa", userData);
        const response = await api.post("/users/all-courses", {
          id: userData.id,
        });
        console.log("getCourse", response);
        if (!response.data.success) {
          // toast.error("Error fetching course data");
          return null;
        }
        console.log("userData.LL", userData);
        if (response.data.courses.length > 0) {
          // note:  in future if we allow to add course option make changes here
          const course = response.data.courses.filter(
            (course: { completed: boolean }) => course.completed === false,
          );

          if (userData.LL === "Completed") {
            setClassLimit(course[0].weekClassLimit);
            setIsCourse(true);
            setCourse(course);
            setCourseId(course[0].id);
            if (course[0].teacher) {
              console.log("here");
              setIsCourse(false);
              setSelectedInstructor(course[0].teacher.id);
            }
          }
          return course;
        }
        return null;
      } catch {
        // toast.error("Error fetching course data");
        return null;
      }
    },
    [],
  );

  useEffect(() => {
    console.log("ashu", isCourse);
  }, [isCourse, setIsCourse]);

  const getSlots = useCallback(async (schoolId: string) => {
    try {
      const response = await api.post(`/drivingSlots/${schoolId}`);
      console.log("getSlots", response);
      if (response.data.success) {
        const slots = response.data.slots;

        const newStartTimes: string[] = [];
        const newSlotNumberMap: {
          [key: string]: { day: string; time: string };
        } = {};
        const newDayMap: {
          [key: string]: { slotNumber: string; time: string }[];
        } = {};

        slots.forEach(
          (slot: { slotNumber: string; day: string; time: string }) => {
            // Populate slotNumberMap
            newSlotNumberMap[slot.slotNumber] = {
              day: slot.day,
              time: slot.time,
            };

            // Populate dayMap
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

        console.log("newStartTimes", newStartTimes);
        console.log("newSlotNumberMap", newSlotNumberMap);
        console.log("newDayMap", newDayMap);
        const uniqueStartTimes = [...new Set(newStartTimes)];
        // Update state
        setStartTimes(uniqueStartTimes);
        setSlotNumberMap(newSlotNumberMap);
        console.log("slotNumberMap", newSlotNumberMap);
        setDayMap(newDayMap);

        return { success: true, slotMap: newSlotNumberMap };
      } else {
        // toast.error("Failed to get slots, please login");
        return { success: false, slotMap: {} };
      }
    } catch (error) {
      console.error("Error fetching slots:", error);
      // toast.error("An error occurred while fetching slots data");
      return { success: false, slotMap: {} };
    }
  }, []);

  // TODO:  check the addslot array logic
  const getCalendar = useCallback(
    async (
      userId: string,
      slotNumberMap: { [key: string]: { day: string; time: string } },
    ) => {
      if (isCourse) return;
      console.log("ffffffffffffff");
      try {
        const response = await api.post(`/userCalendar/get-week`, { userId });
        console.log("getCalendar", response);
        if (!response.data.success) {
          toast.error("Failed to get calendar, please select instructor");
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
              canceledSlots: string[];
              addClassSlots: string[];
            }) => {
              const { slots: slotArr, canceledSlots, addClassSlots } = calendar;
              setAddClassSlots((prev) => [...prev, ...addClassSlots]);
              const slots = [...slotArr, ...addClassSlots];
              setCurrentClassCount(slots.length);
              setCancelClassCount(canceledSlots.length || 0);
              canceledSlots?.map((slot: string) => {
                const slotData = slotNumberMap[slot];
                if (slotData) {
                  setCanceledSlots((prev) => [
                    ...prev,
                    { day: slotData.day, time: slotData.time },
                  ]);
                }
              });

              slots.forEach((slot: string) => {
                const slotData = slotNumberMap[slot];
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
          console.log("newSchedule", newSchedule);

          setSchedule(newSchedule);
        } else {
          toast.error("Failed to get calendar, please select instructor");
        }
      } catch (error) {
        console.error("Error fetching calendar:", error);
        // toast.error("An error occurred while fetching calendar data");
      }
    },
    [],
  );

  const getTeacherCalendar = useCallback(
    async (
      teacherId: string,
      slotNumberMap: { [key: string]: { day: string; time: string } },
    ) => {
      try {
        setLoader2(true);
        console.log("teacherId", teacherId);
        const response = await api.post("/calendar/getCalendar", { teacherId });
        console.log("getTeacherCalendar", response);
        if (!response.data.success) {
          // toast.error("Error fetching teacher calendar datas");
          setLoader2(false);
          setSelectedInstructor(null);
          return;
        }

        const calendar = response.data.calendar;
        console.log("calendar", calendar);

        const newTeacherSchedule: Schedule[] = [];
        const newTeacherAvailable: Schedule[] = [];

        // Flatten all booked dates from each slot
        const bookedDatesList = calendar.bookedDates.map(
          (bookDate: { slot: string }) => bookDate.slot,
        );
        const addClassList = calendar.addClassSlots.map(
          (addClassSlot: { slot: string }) => addClassSlot.slot,
        );
        const availableDatesList = calendar.availableDates.filter(
          (slot: string) => !addClassList.includes(slot),
        );
        console.log("bookedDatesList", bookedDatesList);
        console.log("availableDatesList", availableDatesList);
        availableDatesList.forEach((slot: string) => {
          // const slotData = slotNumberMapRef.current[slot];
          const slotData = slotNumberMap[slot];
          if (slotData) {
            const [startTime, endTime] = slotData.time.split(" - ");
            const currentTime = new Date();
            const currentDay = currentTime.toLocaleString("en-US", {
              weekday: "long",
            });
            const currentTimeString = currentTime.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            });

            newTeacherAvailable.push({
              ...slotData,
              isActive:
                slotData.day === currentDay &&
                currentTimeString >= startTime &&
                currentTimeString <= endTime,
            });
          }
        });
        console.log("newTeacherAvailable", newTeacherAvailable);

        // Copy all week dates directly
        const weekDatesList = calendar.weeklySlots.map(
          (weekSlot: { slot: string }) => weekSlot.slot,
        );
        console.log("weekDatesList", weekDatesList);
        const slots = [...weekDatesList, ...bookedDatesList, ...addClassList];
        console.log("slots", slots);
        console.log("slotNumberMap", slotNumberMap);

        slots.forEach((slot: string) => {
          const slotData = slotNumberMap[slot];
          console.log("slotData", slotData);
          if (slotData) {
            const [startTime, endTime] = slotData.time.split(" - ");
            console.log("start time", startTime);
            console.log("end time", endTime);
            const currentTime = new Date();
            const currentDay = currentTime.toLocaleString("en-US", {
              weekday: "long",
            });
            const currentTimeString = currentTime.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            });

            newTeacherSchedule.push({
              ...slotData,
              isActive:
                slotData.day === currentDay &&
                currentTimeString >= startTime &&
                currentTimeString <= endTime,
            });
          }
        });

        setTeacherSchedule(newTeacherSchedule);
        setTeacherAvailable(newTeacherAvailable);
      } catch (error) {
        // toast.error("Error fetching teacher calendar data");
        console.log("error", error);
      } finally {
        setLoader2(false);
      }
    },
    [],
  );

  const getTeachers = useCallback(async (schoolId: string, vehicle: string) => {
    try {
      const response = await api.post("/driving/get-teachers", { schoolId });
      console.log("getTeachers", response);
      if (!response.data.success) {
        // toast.error("failed to fetch teachers");
        return;
      }
      const teachers = response.data.teachers.filter(
        (teacher: { expertise: string[] }) => {
          return (
            Array.isArray(teacher.expertise) &&
            teacher.expertise.some(
              (exp: string) => exp.toLowerCase() === vehicle.toLowerCase(),
            )
          );
        },
      );
      setTeachers(teachers);
    } catch {
      // toast.error("Error fetching teacher details data");
    }
  }, []);

  // Main initialization function
  const initializeData = useCallback(async () => {
    if (isInitialized) {
      setInitLoading(false);
      return;
    }

    try {
      const userData = await getCurrentUser();
      console.log("u", userData);
      if (!userData) {
        setInitLoading(false);
        return;
      }

      const courses = await getCourse(userData);
      console.log("c", courses);
      if (!courses || courses.length === 0) {
        setInitLoading(false);
        return;
      }

      const schoolId = userData.schoolId || import.meta.env.VITE_SCHOOL_ID;
      const teacherId = courses[0]?.teacher?.id;
      console.log("s", schoolId);
      console.log("t", teacherId);

      if (!schoolId) {
        setInitLoading(false);
        return;
      }

      const { success: slotsLoaded, slotMap: slotNumberMap } =
        await getSlots(schoolId);
      console.log("slots", slotsLoaded);
      if (!slotsLoaded) {
        setInitLoading(false);
        return;
      }
      console.log("sss", slotNumberMap);

      await Promise.all([
        console.log("here1"),
        getCalendar(userData.id, slotNumberMap),
        console.log("here2"),
        teacherId
          ? getTeacherCalendar(teacherId, slotNumberMap)
          : Promise.resolve(),
        getTeachers(schoolId, courses[0].vehicle),
      ]);

      setIsInitialized(true);
    } catch (error) {
      console.error("Error during initialization:", error);
      // toast.error("Failed to initialize data");
    } finally {
      setInitLoading(false);
    }
  }, [
    isInitialized,
    getCurrentUser,
    getCourse,
    getSlots,
    getCalendar,
    getTeacherCalendar,
    getTeachers,
  ]);

  useEffect(() => {
    initializeData();
  }, [initializeData]);

  useEffect(() => {
    if (user?.id) {
      setIsInitialized(false);
    }
  }, [user?.id]);

  // const isSlotAvailable = useCallback((day: string, time: string)=> {
  //   const slot = dayMap[day].find((slot) => slot.time.startsWith(`${time}`));
  //   return slot && teacherAvailable.some((s) => s.day === day && s.time.startsWith(`${time}`));
  // },[dayMap, teacherAvailable])

  // const isSlotBooked = useCallback((day: string, time: string)=> {
  //   const slot = dayMap[day]?.find((slot) => slot.time.startsWith(`${time}`));
  //   return slot && teacherSchedule.some((s) => s.day === day && s.time.startsWith(`${time}`));
  // },[dayMap, teacherSchedule])

  const handleSlotSelection = useCallback(
    (day: string, time: string): void => {
      const slot = dayMap[day]?.find((slot) => slot.time.startsWith(`${time}`));
      console.log("slot", slot);
      if (!slot) return;
      if (addClassSlots.includes(slot.slotNumber)) {
        toast.error(
          "This slot is already added for this week by other user , please select another slot",
        );
        return;
      }
      const isSelected = selectedSlots.some(
        (s) => s.day === day && s.time.startsWith(`${time}`),
      );
      if (isSelected) {
        setSelectedSlots((prev) =>
          prev.filter((s) => !(s.day === day && s.time.startsWith(`${time}`))),
        );
      } else {
        setSelectedSlots((prev) => [...prev, { day, time }]);
      }
      console.log(selectedSlots);
    },
    [dayMap, selectedSlots],
  );

  const handleSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): Promise<void> => {
    event.preventDefault();
    console.log("selectedSlots", selectedSlots);
    console.log("courseIds", courseIds);
    if (selectedSlots.length === 0) {
      toast.error("Please select at least one slot before booking.");
      return;
    }
    if (selectedSlots.length > classLimit) {
      toast.error("You can only add slots for a maximum of " + classLimit);
      return;
    }
    const response = window.confirm(
      "Are you sure you want to book these classes?",
    );
    if (!response) {
      return;
    }

    setLoading(true);
    try {
      const slots: string[] = [];
      selectedSlots.forEach((slot) => {
        const currentSlot = dayMap[slot.day]?.find((s) =>
          s.time.startsWith(slot.time),
        );
        console.log("currentSlot", currentSlot);
        if (currentSlot) {
          slots.push(currentSlot.slotNumber);
        }
      });
      if (!slots || slots.length === 0) {
        toast.error("Please select at least one slot");
        setLoading(false);
        return;
      }
      if (!selectedInstructor) {
        toast.error("Please select instructor");
        setLoading(false);
        return;
      }
      if (!course) {
        setLoading(false);
        return;
      }
      console.log("course", course);
      if (course[0]?.weekClassLimit < slots.length) {
        toast.error(
          "You can only book upto " + course[0].weekClassLimit + " slots",
        );
        setLoading(false);
        return;
      }

      const response = await api.post("/calendar/book-slots", {
        userId: user?.id,
        courseIds: courseIds,
        slots,
        teacherId: selectedInstructor,
      });

      if (response.data.success) {
        toast.success("Slots booked successfully!");
        setSelectedSlots([]);
        if (!user?.id || selectedInstructor) {
          window.location.reload();
          return;
        }
        getCalendar(user.id, slotNumberMap);
        getTeacherCalendar(selectedInstructor, slotNumberMap);
      } else {
        toast.error(response.data.message || "Failed to book slots.");
      }
    } catch (error) {
      console.error("Error booking slots:", error);
      toast.error("An error occurred while booking slots.");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (scope: "week" | "day"): Promise<void> => {
    console.log("selectedSlots", selectedSlots);
    console.log("courseIds", courseIds);
    if (selectedSlots.length === 0) {
      toast.error("Please select at least one slot before booking.");
      return;
    }

    if (
      currentClassCount + selectedSlots.length + cancelClassCount >
      classLimit
    ) {
      toast.error(
        "You can only add slots for a maximum of " +
          classLimit +
          " classes " +
          " your current class count (including canceled classes for this week) is " +
          (currentClassCount + cancelClassCount),
      );
      return;
    }
    const res = window.confirm("Are you sure you want to add these classes?");
    if (!res) {
      return;
    }

    setLoading(true);
    try {
      const slots: string[] = [];
      const slotsArr: { day: string; slot: string }[] = [];
      selectedSlots.forEach((slot) => {
        const currentSlot = dayMap[slot.day]?.find((s) =>
          s.time.startsWith(slot.time),
        );
        console.log("currentSlot", currentSlot);
        if (currentSlot) {
          slots.push(currentSlot.slotNumber);
          slotsArr.push({ day: slot.day, slot: currentSlot.slotNumber });
        }
      });
      if (!slots || slots.length === 0) {
        toast.error("Please select at least one slot");
        setLoading(false);
        return;
      }

      if (!selectedInstructor) {
        toast.error("Please select instructor");
        setLoading(false);
        return;
      }
      if (!courseId) {
        setLoading(false);
        console.error("Please select course");
        return;
      }
      let response;
      if (scope === "week") {
        response = await api.post("/calendar/add-weekly-slots", {
          userId: user?.id,
          courseId: courseId,
          slots,
          teacherId: selectedInstructor,
        });
      } else {
        response = await api.post("/calendar/add-slots", {
          userId: user?.id,
          courseId: courseId,
          slots: slotsArr,
          teacherId: selectedInstructor,
        });
      }

      if (response.data.success) {
        toast.success("Slots added successfully!");
        setSelectedSlots([]);
        if (!user?.id || selectedInstructor) {
          window.location.reload();
          return;
        }
        getCalendar(user.id, slotNumberMap);
        getTeacherCalendar(selectedInstructor, slotNumberMap);
      } else {
        toast.error(response.data.message || "Failed to add slots.");
      }
    } catch (error) {
      console.error("Error adding slots:", error);
      toast.error("An error occurred while adding slots.");
    } finally {
      setLoading(false);
    }
  };

  const handleReschedule = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): Promise<void> => {
    event.preventDefault();

    console.log("fromDay", fromDay);
    console.log("fromTime", fromTime);
    console.log("toDay", toDay);
    console.log("toTime", toTime);
    if (!fromDay || !fromTime || !toDay || !toTime) {
      toast.error("Please select both 'From' and 'To' day and time.");
      return;
    }
    console.log("canceledSlots", canceledSlots);
    const isCanceledFrom = canceledSlots.find(
      (slot) => slot.day === fromDay && slot.time.startsWith(fromTime),
    );

    const isCanceledTo = canceledSlots.find(
      (slot) => slot.day === toDay && slot.time.startsWith(toTime),
    );

    const fromSlot = dayMap[fromDay]?.find((slot) =>
      slot.time.startsWith(`${fromTime}`),
    );
    const toSlot = dayMap[toDay]?.find((slot) =>
      slot.time.startsWith(`${toTime}`),
    );
    if (!fromSlot || !toSlot) {
      toast.error("Invalid 'From' or 'To' slot selected.");
      return;
    }
    console.log("teacherSchedule", teacherSchedule);
    teacherSchedule.forEach((s) => {
      console.log("Checking teacherSchedule slot:", s);
    });
    if (
      teacherSchedule.some((s) => {
        const dayMatch = s.day === toDay;
        const timeMatch = s.time.startsWith(`${toTime}`);
        console.log(`[Reschedule] Checking teacherSchedule:`, {
          sDay: s.day,
          sTime: s.time,
          toDay,
          toTime,
          dayMatch,
          timeMatch,
        });
        return dayMatch && timeMatch;
      })
    ) {
      toast.error(
        "Selected time is already booked by instructor so choose other slot to reschedule.",
      );
      return;
    }
    console.log("teacherAvailable", teacherAvailable);
    if (
      teacherAvailable.every((s) => {
        const dayMatch = s.day === toDay;
        const timeMatch = s.time.startsWith(`${toTime}`);
        console.log(`[Reschedule] Checking teacherAvailable:`, {
          sDay: s.day,
          sTime: s.time,
          toDay,
          toTime,
          dayMatch,
          timeMatch,
        });
        return !(dayMatch && timeMatch);
      })
    ) {
      toast.error(
        "Selected slot is not available for instructor so choose other slot to reschedule.",
      );
      return;
    }
    const response = window.confirm(
      "Are you sure you want to reschedule this class?",
    );
    if (!response) {
      return;
    }
    console.log({
      fromDay,
      fromTime,
      toTime,
      toDay,
      isCanceledFrom,
      isCanceledTo,
      fromSlot,
      toSlot,
      rescheduleOption,
    });
    if (rescheduleOption === "week") {
      if (isCanceledFrom || isCanceledTo) {
        toast.error(
          "You cant reschedule a slot that is already canceled for this week",
        );
        return;
      }

      function getTimeInMinutes(timeRange: string): number {
        const [startTime] = timeRange.split(" - ");
        const [time, meridian] = startTime.trim().split(" ");
        let [hours, minutes] = time.split(":").map(Number);

        if (meridian === "PM" && hours !== 12) hours += 12;
        if (meridian === "AM" && hours === 12) hours = 0;

        return hours * 60 + minutes;
      }

      const fromDayIndex = daysOfWeek.indexOf(fromDay);
      const toDayIndex = daysOfWeek.indexOf(toDay);

      const fromTimeMinutes = getTimeInMinutes(fromTime);
      const toTimeMinutes = getTimeInMinutes(toTime);
      console.log({
        fromDayIndex: fromDayIndex,
        toDayIndex: toDayIndex,
        fromTimeMinutes: fromTimeMinutes,
        toTimeMinutes: toTimeMinutes,
        fromTime: fromTime,
        toTime: toTime,
      });
      let isValidRange;

      if (toDayIndex === 0 && fromDayIndex !== toDayIndex) {
        isValidRange = true;
      } else {
        isValidRange =
          toDayIndex > fromDayIndex ||
          (toDayIndex === fromDayIndex && toTimeMinutes > fromTimeMinutes);
      }

      if (!isValidRange) {
        toast.error("Invalid dates selected.");
        return;
      }
    }

    if (!selectedInstructor) {
      toast.error("Please select an instructor to reschedule.");
      return;
    }
    if (!courseId) {
      console.error("courseId is null");
      return;
    }

    setLoading(true);
    try {
      console.log("courseId", courseId);
      const response = await api.post("/calendar/rescheduleUser", {
        userId: user?.id,
        courseId,
        teacherId: selectedInstructor,
        from: fromSlot.slotNumber,
        to: toSlot.slotNumber,
        type: rescheduleOption,
      });

      if (response.data.success) {
        toast.success("Reschedule successful!");
        setFromDay("Monday");
        setFromTime("9:00 AM");
        setToDay("Monday");
        setToTime("9:00 AM");
        setRescheduleOpen(false);
        if (!user?.id || selectedInstructor) {
          window.location.reload();
          return;
        }
        getCalendar(user.id, slotNumberMap);
        getTeacherCalendar(selectedInstructor, slotNumberMap);
      } else {
        toast.error(response.data.message || "Failed to reschedule.");
      }
    } catch (error) {
      console.error("Error during rescheduling:", error);
      toast.error("An error occurred while rescheduling.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (
    scope: "week" | "day" = "week",
  ): Promise<void> => {
    if (!cancelSlots?.day || !cancelSlots?.time) {
      toast.error("Please select a slot from schedule to cancel.");
      return;
    }

    setLoading(true);
    try {
      function getTimeInMinutes(timeRange: string): number {
        const [startTime] = timeRange.split(" - ");
        const [time, meridian] = startTime.trim().split(" ");
        let [hours, minutes] = time.split(":").map(Number);

        if (meridian === "PM" && hours !== 12) hours += 12;
        if (meridian === "AM" && hours === 12) hours = 0;

        return hours * 60 + minutes;
      }

      const currentDate = new Date();
      const currentDayIndex = currentDate.getDay();
      const currentTimeMinutes =
        currentDate.getHours() * 60 + currentDate.getMinutes();

      const fromDay = cancelSlots.day;
      const fromTime = cancelSlots.time;
      const fromDayIndex = daysOfWeek.indexOf(fromDay);
      const fromTimeMinutes = getTimeInMinutes(fromTime);
      console.log("fromDayIndex", fromDayIndex);
      console.log("currentDayIndex", currentDayIndex);
      console.log("fromTimeMinutes", fromTimeMinutes);
      console.log("currentTimeMinutes", currentTimeMinutes);

      if (scope === "week") {
        let isValidRange;

        if (fromDayIndex === 0 && fromDayIndex !== currentDayIndex) {
          isValidRange = true;
        } else {
          isValidRange =
            fromDayIndex > currentDayIndex ||
            (fromDayIndex === currentDayIndex &&
              fromTimeMinutes > currentTimeMinutes);
        }
        if (!isValidRange) {
          toast.error("You can only cancel the next day's slot");
          return;
        }
      }
      const res = window.confirm("Are you sure you want to cancel this class?");
      if (!res) {
        setLoading(false);
        return;
      }
      const slot = dayMap[cancelSlots.day]?.find(
        (s) => s.time === cancelSlots.time,
      )?.slotNumber;
      if (!slot) {
        toast.error("Invalid slot selected for cancellation.");
        setLoading(false);
        return;
      }
      if (scope == "day") {
        if (addClassSlots.includes(slot)) {
          toast.info(
            "You can't cancel a slot for entire course that is added for this week",
          );
          setLoading(false);
          return;
        }
      }
      if (!courseId) {
        console.error("Please select course to cancel the slot");
        setLoading(false);
        return;
      }

      const response = await api.post("/calendar/cancelUserClass", {
        userId: user?.id,
        courseId: courseId,
        teacherId: selectedInstructor ?? "",
        slot: slot,
        type: scope,
        isAddClassCancel: addClassSlots.includes(slot),
      });

      if (response.data.success) {
        toast.success("Slot canceled successfully!");
        setCancelOpen(false);
        setSlotSelected({ day: "", time: "" });
        setAddClassSlots([]);
        if (!user?.id || !selectedInstructor) {
          window.location.reload();
          return;
        }
        getCalendar(user?.id, slotNumberMap);
        getTeacherCalendar(selectedInstructor, slotNumberMap);
      } else {
        toast.error(response.data.message || "Failed to cancel the slot.");
      }
    } catch (error) {
      console.error("Error canceling slot:", error);
      toast.error("An error occurred while canceling the slot.");
    } finally {
      setLoading(false);
    }
  };
  const isSlotAvailableForRender = useCallback(
    (day: string, time: string) => {
      const daySlots = dayMap[day];
      if (!daySlots) return false;

      const slot = daySlots.find((slot) => slot.time.startsWith(`${time}`));
      return (
        slot &&
        teacherAvailable.some(
          (s) => s.day === day && s.time.startsWith(`${time}`),
        )
      );
    },
    [dayMap, teacherAvailable],
  );

  const isSlotBookedForRender = useCallback(
    (day: string, time: string) => {
      const daySlots = dayMap[day];
      if (!daySlots) return false;

      const slot = daySlots.find((slot) => slot.time.startsWith(`${time}`));
      return (
        slot &&
        teacherSchedule.some(
          (s) => s.day === day && s.time.startsWith(`${time}`),
        )
      );
    },
    [dayMap, teacherSchedule],
  );

  const isSlotCanceled = useCallback(
    (day: string, time: string) => {
      const daySlots = dayMap[day];
      if (!daySlots) return false;

      const slot = daySlots.find((slot) => slot.time.startsWith(`${time}`));
      return (
        slot &&
        canceledSlots.some((s) => s.day === day && s.time.startsWith(`${time}`))
      );
    },
    [dayMap, canceledSlots],
  );

  const isUserBookedFn = useCallback(
    (day: string, time: string) => {
      const daySlots = dayMap[day];
      if (!daySlots) return false;

      const slot = daySlots.find((slot) => slot.time.startsWith(`${time}`));
      return (
        slot &&
        schedule.some(
          (s: { day: string; time: string }) =>
            s.day === day && s.time.startsWith(`${time}`),
        )
      );
    },
    [dayMap, teacherSchedule],
  );

  if (isHoliday) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-6 font-satoshi flex items-center justify-center">
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            🥺 It's a Holiday Today!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            No classes or events scheduled.
          </p>
        </div>
      </div>
    );
  }

  if (initLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-6 font-satoshi flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Loading Calendar...
          </p>
        </div>
      </div>
    );
  }

  const isLLcompleted = user && user.LL !== "Completed";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-6">
      {isLLcompleted && (
        <div className="fixed inset-0 bg-white/50 dark:bg-black/50 flex items-center justify-center z-30">
          <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-lg shadow-xl">
            <svg
              className="mx-auto mb-4 h-12 w-12 text-yellow-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Action Required!
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Please qualify your <strong>Learning License Test</strong> to
              access the calendar.
            </p>
            <button
              onClick={() => navigate(-1)}
              className="flex mx-auto mt-4 items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="inline">Back</span>
            </button>
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 text-center mb-8">
          Your Calendar
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Calendar Section */}
          <div className="lg:col-span-8 bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Weekly Schedule
            </h2>

            {!selectedInstructor && isCourse && (
              <div className="text-center text-gray-500 dark:text-gray-400 mb-4">
                Please select an instructor to view available slots
              </div>
            )}
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                {startTimes.length === 0 ||
                Object.keys(dayMap).length === 0 ||
                (!selectedInstructor && isCourse) ? (
                  <div className="text-center py-8 text-gray-500">
                    Please select an instructor to view available slots
                  </div>
                ) : loader2 ? (
                  <div>
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400">
                      Loading Teacher Calendar...
                    </p>
                  </div>
                ) : (
                  <div
                    className="grid gap-2"
                    style={{
                      gridTemplateColumns: `100px repeat(${startTimes.length}, 1fr)`,
                    }}
                  >
                    {/* Header - empty cell + time slots */}
                    <div></div>
                    {startTimes.map((time) => (
                      <div
                        key={`header-${time}`}
                        className="text-center text-sm text-gray-500"
                      >
                        {time}
                      </div>
                    ))}

                    {/* Day rows */}
                    {Object.entries(dayMap).map(([day, daySlots]) => (
                      <React.Fragment key={`day-${day}`}>
                        <div className="text-gray-700 dark:text-gray-300 font-medium capitalize">
                          {day}
                        </div>
                        {startTimes.map((time, timeIndex) => {
                          // Find all slots for this day-time combination
                          const slotsForTime = daySlots.filter(
                            (slot) => slot.time && slot.time.startsWith(time),
                          );

                          // Use the first slot if multiple exist, or create empty state
                          const primarySlot =
                            slotsForTime.length > 0 ? slotsForTime[0] : null;

                          const isAvailable = isSlotAvailableForRender(
                            day,
                            time,
                          );
                          const isBooked = isSlotBookedForRender(day, time);
                          const isSelected = selectedSlots.some(
                            (s) => s.day === day && s.time.startsWith(time),
                          );
                          const isCanceled = isSlotCanceled(day, time);
                          const isUserBooked = isUserBookedFn(day, time);

                          // Create unique key using multiple identifiers
                          const uniqueKey = primarySlot
                            ? `${day}-${time}-${primarySlot.slotNumber || timeIndex}-${primarySlot.time || "default"}`
                            : `${day}-${time}-empty-${timeIndex}`;

                          return (
                            <button
                              key={uniqueKey}
                              onClick={() => handleSlotSelection(day, time)}
                              disabled={
                                !selectedInstructor ||
                                !isAvailable ||
                                isBooked ||
                                isCanceled ||
                                isUserBooked
                              }
                              className={`relative h-10 rounded-md border transition-all duration-200
                              ${
                                isCanceled
                                  ? "bg-red-500/30 dark:bg-red-600/40 border border-red-500 text-red-200 cursor-not-allowed"
                                  : isUserBooked
                                    ? "bg-blue-500/30 dark:bg-blue-600/40 border border-blue-500 text-red-200 cursor-not-allowed"
                                    : isSelected
                                      ? "bg-blue-500/20 dark:bg-blue-900/40 border border-blue-500 text-white"
                                      : isAvailable
                                        ? "hover:bg0-blue-500/10 dark:hover:bg-blue-900/20 border border-transparent text-white"
                                        : isBooked
                                          ? "bg-zinc-300 dark:bg-zinc-700 text-zinc-400 cursor-not-allowed"
                                          : "bg-zinc-300 dark:bg-zinc-700 text-zinc-500 cursor-not-allowed"
                              }`}
                            >
                              <CarImg
                                className="mx-auto"
                                fill={isAvailable ? "#727DFF" : "#aaa"}
                              />
                              {slotsForTime.length > 1 && (
                                <span className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                                  {slotsForTime.length}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end gap-4 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-zinc-300 dark:bg-zinc-700 rounded"></div>
                <span className="text-gray-700 dark:text-gray-400">Booked</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-transparent border border-blue-500 dark:border-blue-400 rounded"></div>
                <span className="text-gray-700 dark:text-gray-300">
                  Available
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-400 dark:bg-red-700 rounded"></div>
                <span className="text-gray-700 dark:text-gray-300">
                  Canceled
                </span>
              </div>
            </div>
          </div>

          {/* Instructors Section */}
          <div className="lg:col-span-4 order-first lg:order-none space-y-4">
            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {isCourse ? "Select an Instructor" : "Instructor"}
              </h2>
              {isCourse && (
                <div className="space-y-2">
                  {teachers?.map((instructor) => (
                    <button
                      key={instructor.id}
                      onClick={() => {
                        setSelectedInstructor(instructor.id);
                        getTeacherCalendar(instructor.id, slotNumberMap);
                      }}
                      className={`w-full flex items-start gap-3 p-3 rounded-md transition-colors ${
                        selectedInstructor === instructor.teacherId
                          ? "bg-blue-50 dark:bg-blue-900/20"
                          : "hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      }`}
                    >
                      <img
                        src={instructor.image}
                        alt={instructor.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1 text-left">
                        <h3 className="font-medium text-gray-900 dark:text-white text-sm">
                          {instructor.name}
                        </h3>
                        <h3 className="font-medium text-gray-900 dark:text-white text-sm">
                          {instructor.vehicle.join(", ")}
                        </h3>
                      </div>
                    </button>
                  ))}
                </div>
              )}
              {!isCourse && (
                <div className="space-y-2">
                  <div
                    key={course?.[0]?.teacher?.id ?? "instructor"}
                    className="w-full flex items-start gap-3 p-3 rounded-md transition-colorsbg-blue-50 dark:bg-blue-900/20"
                  >
                    <img
                      src={course?.[0]?.teacher?.image ?? ""}
                      alt={course?.[0]?.teacher?.name ?? "Instructor"}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1 text-left">
                      <h3 className="font-medium text-gray-900 dark:text-white text-sm">
                        {course?.[0]?.teacher?.name ?? "Instructor"}
                      </h3>
                      <h3 className="font-medium text-gray-900 dark:text-white text-sm">
                        {course?.[0]?.teacher?.vehicle?.join(", ") ??
                          "car/bike"}
                      </h3>
                      <h3 className="font-medium text-gray-900 dark:text-white text-sm">
                        {course?.[0]?.teacher?.phoneNumber ?? ""}
                      </h3>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {selectedSlots.length > 0 && isCourse && (
              <div className=" lg:block bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm">
                <h3 className="font-medium text-gray-900 dark:text-white mb-4">
                  Selected Slots:
                </h3>
                <div className="space-y-2">
                  {selectedSlots.map((slot, index) => (
                    <div
                      key={index}
                      className="text-sm text-gray-600 dark:text-gray-400"
                    >
                      {slot.day.charAt(0).toUpperCase() + slot.day.slice(1)} -{" "}
                      {slot.time}
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full mt-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Booking..." : "Confirm Booking"}
                </button>
              </div>
            )}

            {selectedSlots.length > 0 && !isCourse && (
              <div className=" lg:block bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm">
                <h3 className="font-medium text-gray-900 dark:text-white mb-4">
                  Slots to be added:
                </h3>
                <div className="space-y-2">
                  {selectedSlots.map((slot, index) => (
                    <div
                      key={index}
                      className="text-sm text-gray-600 dark:text-gray-400"
                    >
                      {slot.day.charAt(0).toUpperCase() + slot.day.slice(1)} -{" "}
                      {slot.time}
                    </div>
                  ))}
                </div>

                <div className="mt-4 space-y-3">
                  <select
                    value={additionScope}
                    onChange={(e) =>
                      setAdditionScope(e.target.value as "week" | "day")
                    }
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="week">Add to this week only</option>
                    <option value="day">Add to entire course</option>
                  </select>

                  <button
                    onClick={() => handleAdd(additionScope)}
                    disabled={loading}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading
                      ? "Adding..."
                      : `Add ${additionScope === "week" ? "to this week" : "to entire course"}`}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Schedule */}
          <div className="lg:col-span-8 bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6">
            {!isCourse && (
              <div>
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

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-6">
                  {schedule.map((slot, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border cursor-pointer 
                        ${cancelSlots?.day === slot.day && cancelSlots?.time === slot.time ? "border-red-400 dark:border-red-700 bg-red-400" : ""}
                        ${
                          slot.isActive
                            ? "bg-blue-500 text-white border-blue-600 dark:bg-blue-600 dark:border-blue-700"
                            : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700"
                        } ${slotSelected.day === slot.day && slotSelected.time === slot.time ? "border-blue-600 dark:border-blue-700 bg-red-400" : ""}
                      `}
                      onClick={() =>
                        setCancelSlots({ day: slot.day, time: slot.time })
                      }
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
              </div>
            )}

            {!isCourse && (
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setRescheduleOpen((prev) => !prev);
                    setCancelOpen(false);
                  }}
                  className="bg-yellow-100/50 dark:bg-yellow-400/20 text-black dark:text-yellow-200 font-medium px-4 py-2 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-400/30 transition-colors"
                >
                  Reschedule
                </button>
                <button
                  onClick={() => {
                    console.log("ss", cancelSlots);
                    if (!cancelSlots) {
                      toast.info(
                        "please select the slot from schedule to cancel",
                      );
                      return;
                    }
                    setCancelOpen((prev) => !prev);
                    setRescheduleOpen(false);
                  }}
                  className="bg-red-100/50 dark:bg-red-400/20 text-black dark:text-red-200 font-medium px-4 py-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-400/30 transition-colors"
                >
                  Cancel Class
                </button>
              </div>
            )}

            {cancelOpen && (
              <>
                <Cancel
                  date={cancelSlots?.day ?? ""}
                  time={cancelSlots?.time ?? ""}
                  instructor={course?.[0]?.teacher.name ?? "N/A"}
                  onCancel={(scope) => handleCancel(scope)}
                  onBack={() => {
                    setCancelOpen(false);
                  }}
                />
              </>
            )}

            {rescheduleOpen && (
              <>
                <div className="flex gap-4 my-4">
                  <div className="flex-1">
                    <select
                      className="w-full p-3 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                      value={rescheduleOption}
                      onChange={(e) =>
                        setRescheduleOption(e.target.value as "week" | "day")
                      }
                    >
                      <option value="week">
                        Reschedule for this week only
                      </option>
                      <option value="day">Reschedule for whole course</option>
                    </select>
                  </div>
                  <button
                    className="px-6 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium rounded-lg transition-colors"
                    onClick={handleReschedule}
                  >
                    Confirm
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="space-y-2">
                    <label className="text-gray-600 dark:text-gray-400">
                      From:
                    </label>
                    <br />
                    <select
                      value={fromDay}
                      onChange={(e) => setFromDay(e.target.value)}
                      className="w-1/3 p-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    >
                      {Object.keys(dayMap).map((day) => (
                        <option key={day} value={day}>
                          {day}
                        </option>
                      ))}
                    </select>
                    <select
                      value={fromTime}
                      onChange={(e) => setFromTime(e.target.value)}
                      className="w-2/3 p-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    >
                      {startTimes.map((time) => (
                        <option key={time}>{time}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-gray-600 dark:text-gray-400">
                      To:
                    </label>
                    <br />
                    <select
                      value={toDay}
                      onChange={(e) => setToDay(e.target.value)}
                      className="w-1/3 p-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    >
                      {Object.keys(dayMap).map((day) => (
                        <option key={day} value={day}>
                          {day}
                        </option>
                      ))}
                    </select>
                    <select
                      value={toTime}
                      onChange={(e) => setToTime(e.target.value)}
                      className="w-2/3 p-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    >
                      {startTimes.map((time) => (
                        <option key={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </>
            )}
            {!isCourse && (
              <div className="mt-6">
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
                    const todayIndex = daysOfWeek.indexOf(today);

                    // Fixed time parsing function
                    interface ParseTimeFn {
                      (timeStr: string): number;
                    }

                    const parseTime: ParseTimeFn = (
                      timeStr: string,
                    ): number => {
                      const cleanTime = timeStr.trim();
                      const [time, period] = cleanTime.split(" ");
                      const [hours, minutes] = time.split(":").map(Number);

                      let hour24 = hours;
                      if (period === "PM" && hours !== 12) {
                        hour24 = hours + 12;
                      } else if (period === "AM" && hours === 12) {
                        hour24 = 0;
                      }

                      return hour24 * 60 + minutes;
                    };

                    interface IsTimeAfterFn {
                      (time1: string, time2: string): boolean;
                    }

                    const isTimeAfter: IsTimeAfterFn = (time1, time2) => {
                      return parseTime(time1) > parseTime(time2);
                    };

                    let nextClass = null;

                    // Check today's classes first
                    const todayClasses = schedule
                      .filter((slot) => slot.day === today)
                      .filter((slot) => {
                        const startTime = slot.time.split(" - ")[0];
                        console.log(
                          `Comparing: ${startTime} > ${currentTime}`,
                          isTimeAfter(startTime, currentTime),
                        );
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

                    return nextClass ? (
                      <>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                          Next class
                        </p>
                        <div className="mt-2 bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {`${nextClass.day}, ${nextClass.time}`}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Instructor: {course?.[0]?.teacher.name ?? "N/A"}
                            </p>
                          </div>
                        </div>
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCalendar;
