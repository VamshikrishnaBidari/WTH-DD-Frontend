import React, { useCallback, useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { toast } from "sonner";
import api from "../../../utils/axiosInstance";
import { useSocket } from "../../../context/SocketProvider";

interface ClassDetails {
  studentName: string;
  studentImage: string;
  time: string;
  topic: string;
  lastClass: string;
  progress: {
    completed: number;
    total: number;
  };
  nextClass: string;
  userId: string;
  courseId: string;
}

interface Teacher {
  id: string;
  schoolId: string;
  expertise:string[];
  [key: string]: any;
}

const TeacherCalendar: React.FC = () => {
  const socket = useSocket();
  const [selectedClass, setSelectedClass] = useState<ClassDetails>({
    studentName: "",
    studentImage: "",
    time: "",
    topic: "",
    lastClass: "",
    progress: {
      completed: 12,
      total: 15,
    },
    nextClass: "",
    userId: "XXX",
    courseId: "XXX",
  });

  const [bookingsDataMap, setBookingsDataMap] = useState<{
    [slot: string]: { userId: string; courseId: string };
  }>({});

  const [weeklySlotDataMap, setWeeklySlotDataMap] = useState<{
    [slot: string]: { userId: string; courseId: string };
  }>({});

  const [slotNumberMap, setSlotNumberMap] = useState<SlotNumberMap>({});
  const [dayMap, setDayMap] = useState<DayMap>({});
  const [startTimes, setStartTimes] = useState<string[]>([]);
  const [teacherSchedule, setTeacherSchedule] = useState<Schedule[]>([]);
  const [teacherAvailable, setTeacherAvailable] = useState<Schedule[]>([]);
  // const [rescheduledSlots, setRescheduledSlots] = useState<string[]>([]);
  const [cancelledSlots, setCancelledSlots] = useState<string[]>([]);
  const [addClassSlot, setAddClassSlot] = useState<string[]>([]);
  // const [rescheduleInfo, setRescheduleInfo] = useState<string>("week");
  const [isHoliday, setIsHoliday] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // const [fromDay, setFromDay] = useState("");
  // const [fromTime, setFromTime] = useState("");
  // const [toDay, setToDay] = useState("");
  // const [toTime, setToTime] = useState("");

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

  const ScooterImg: React.FC<{ className?: string;fill:string }> = ({ className,fill }) => (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      width="50"
      height="30"
      viewBox="0 0 256 256"
    >
      <g
        fill={fill}
        className="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;"
        transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
      >
        <path
          d="M 57.412 20.601 c -0.284 0 -0.57 -0.08 -0.824 -0.248 c -2.996 -1.975 -6.797 -2.098 -11.618 -0.378 c -0.781 0.28 -1.638 -0.128 -1.917 -0.909 s 0.128 -1.639 0.909 -1.917 c 5.769 -2.056 10.439 -1.829 14.276 0.699 c 0.691 0.456 0.883 1.386 0.428 2.078 C 58.377 20.364 57.899 20.601 57.412 20.601 z"
          className="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(173,196,229); fill-rule: nonzero; opacity: 1;"
          transform=" matrix(1 0 0 1 0 0) "
          strokeLinecap="round"
        />
        <path
          d="M 64.544 25.451 l 3.271 -0.971 c 0.442 -0.131 0.745 -0.537 0.745 -0.998 v -5.698 c 0 -0.589 -0.494 -1.062 -1.083 -1.047 c -3.179 0.082 -5.184 1.631 -5.918 4.768 C 61.983 23.24 62.906 24.609 64.544 25.451 z"
          className="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(173,196,229); fill-rule: nonzero; opacity: 1;"
          transform=" matrix(1 0 0 1 0 0) "
          strokeLinecap="round"
        />
        <path
          d="M 20.261 28.954 h 9.335 c 4.904 0 8.88 3.976 8.88 8.88 v 0.35 H 11.381 v -0.35 C 11.38 32.929 15.356 28.954 20.261 28.954 z"
          className="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(173,196,229); fill-rule: nonzero; opacity: 1;"
          transform=" matrix(1 0 0 1 0 0) "
          strokeLinecap="round"
        />
        <path
          d="M 57.283 17.563 l -0.911 0.719 c -0.588 0.464 -0.719 1.298 -0.317 1.931 C 81.017 59.515 26.962 58.688 39.04 38.314 c 0.577 -0.974 -0.104 -2.208 -1.236 -2.208 H 11.926 c -0.119 0 -0.241 0.013 -0.357 0.039 C 4.155 37.833 1.516 46.108 0.022 54.671 c -0.156 0.892 0.528 1.71 1.433 1.71 H 4.72 c 0.059 0 0.118 -0.004 0.176 -0.011 l 22.254 -2.721 c 0.112 -0.014 0.225 -0.014 0.337 -0.002 l 3.693 0.41 c 0.539 0.06 1 0.415 1.196 0.921 L 34.315 60 c 0.216 0.56 0.755 0.93 1.356 0.93 H 64.53 c 0.498 0 0.962 -0.255 1.228 -0.676 l 5.552 -8.772 c 0.098 -0.155 0.166 -0.326 0.2 -0.506 l 1.62 -8.535 c 0.044 -0.23 0.033 -0.469 -0.033 -0.694 c -2.638 -9.016 -7.401 -17.456 -13.877 -24.073 C 58.702 17.146 57.863 17.105 57.283 17.563 z"
          className="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(87,134,204); fill-rule: nonzero; opacity: 1;"
          transform=" matrix(1 0 0 1 0 0) "
          strokeLinecap="round"
        />
        <path
          d="M 87.007 51.142 l 2.232 -2.151 c 1.096 -1.057 0.998 -2.866 -0.235 -3.758 c -3.187 -2.306 -7.105 -3.666 -11.34 -3.666 c -9.735 0 -17.792 7.184 -19.159 16.54 c -0.217 1.488 0.945 2.824 2.449 2.824 l 5.878 0 c 1.173 0 2.193 -0.829 2.412 -1.981 c 1.246 -6.536 7.077 -8.291 15.695 -7.143 C 85.695 51.907 86.458 51.671 87.007 51.142 z"
          className="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(173,196,229); fill-rule: nonzero; opacity: 1;"
          transform=" matrix(1 0 0 1 0 0) "
          strokeLinecap="round"
        />
        <path
          d="M 22.574 48.595 c -6.812 0 -12.335 5.522 -12.335 12.335 c 0 6.812 5.522 12.334 12.335 12.334 s 12.335 -5.522 12.335 -12.334 C 34.908 54.118 29.386 48.595 22.574 48.595 z M 22.574 65.909 c -2.75 0 -4.979 -2.229 -4.979 -4.979 c 0 -2.75 2.229 -4.979 4.979 -4.979 s 4.979 2.229 4.979 4.979 C 27.553 63.68 25.324 65.909 22.574 65.909 z"
          className="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(42,70,111); fill-rule: nonzero; opacity: 1;"
          transform=" matrix(1 0 0 1 0 0) "
          strokeLinecap="round"
        />
        <path
          d="M 36.232 58.973 c 0.941 0 1.697 -0.813 1.598 -1.748 c -0.791 -7.509 -6.752 -13.068 -14.856 -13.068 c -7.917 0 -15.369 5.307 -18.531 12.554 c -0.465 1.066 0.297 2.263 1.46 2.263 h 3.298 H 36.232 z"
          className="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(173,196,229); fill-rule: nonzero; opacity: 1;"
          transform=" matrix(1 0 0 1 0 0) "
          strokeLinecap="round"
        />
        <path
          d="M 77.664 48.595 c -6.812 0 -12.335 5.522 -12.335 12.335 c 0 6.812 5.522 12.334 12.335 12.334 c 6.812 0 12.335 -5.522 12.335 -12.334 C 89.999 54.118 84.477 48.595 77.664 48.595 z M 77.664 65.909 c -2.75 0 -4.979 -2.229 -4.979 -4.979 c 0 -2.75 2.229 -4.979 4.979 -4.979 c 2.75 0 4.979 2.229 4.979 4.979 C 82.644 63.68 80.414 65.909 77.664 65.909 z"
          className="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(42,70,111); fill-rule: nonzero; opacity: 1;"
          transform=" matrix(1 0 0 1 0 0) "
          strokeLinecap="round"
        />
      </g>
    </svg>
  );

  const [teacher, setTeacher] = useState<Teacher | null>(null);
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
    [key: string]: any;
  }

  const getTeacher = useCallback(async () => {
    try {
      const response = await api.get("/teachers/current-teacher");
      if (!response.data.success) {
        toast.error("failed to get teacher details");
        return;
      }
      setTeacher(response.data.user);
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
        return;
      }
    } catch {
      toast.error("failed to fetch teacher details");
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
        const newStartTimes: string[] = [];

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

        // Set all states at once
        const uniqueStartTimes = [...new Set(newStartTimes)];
        setSlotNumberMap(newSlotNumberMap);
        setDayMap(newDayMap);
        setStartTimes(uniqueStartTimes);
      } else {
        toast.error("Failed to get slots, please login");
      }
    } catch (error) {
      console.error("Error fetching slots:", error);
      toast.error("An error occurred while fetching slots data");
    }
  }, [teacher?.schoolId]);

  const getTeacherCalendar = useCallback(async () => {
    try {
      if (!teacher?.id || Object.keys(slotNumberMap).length === 0) {
        return;
      }
      console.log("teacher", teacher);

      const response = await api.post("/calendar/getCalendar", {
        teacherId: teacher.id,
      });
      if (!response.data.success) {
        toast.error("Error fetching teacher calendar data");
        return;
      }

      const calendar = response.data.calendar;

      type Booking = {
        slot: string;
        userId: string;
        courseId: string;
      };

      const bookedDatesList =
        calendar.bookedDates?.map((slot: Booking) => ({
          slot: slot.slot,
          userId: slot.userId,
          courseId: slot.courseId,
        })) || [];

      const addClassSlotsList =
        calendar.addClassSlots?.map((slot: AddClassSlot) => ({
          slot: slot.slot,
          userId: slot.userId,
          courseId: slot.courseId,
        })) || [];
      console.log("addClassSlotsList", addClassSlotsList);

      interface BookingsMap {
        [slot: string]: {
          userId: string;
          courseId: string;
        };
      }

      const bookingsMap: BookingsMap = {};
      const weeklySlotMap: {
        [slot: string]: { userId: string; courseId: string };
      } = {};
      const addClassSlotMap: {
        [slot: string]: { userId: string; courseId: string };
      } = {};
      const canceledSlotMap: {
        [slot: string]: { userId: string; courseId: string };
      } = {};
      const canceledArray: string[] = [];
      (calendar.bookedDates as Booking[]).forEach((booking: Booking) => {
        bookingsMap[booking.slot] = {
          userId: booking.userId,
          courseId: booking.courseId,
        };
      });

      interface WeeklySlot {
        slot: string;
        userId?: string;
        courseId?: string;
      }

      (calendar.weeklySlots as WeeklySlot[]).forEach(
        (weeklySlot: WeeklySlot) => {
          weeklySlotMap[weeklySlot.slot] = {
            userId: weeklySlot.userId || "",
            courseId: weeklySlot.courseId || "",
          };
        },
      );
      interface AddClassSlot {
        slot: string;
        userId?: string;
        courseId?: string;
      }
      (calendar.addClassSlots as AddClassSlot[])?.forEach(
        (addClassSlot: AddClassSlot) => {
          addClassSlotMap[addClassSlot?.slot] = {
            userId: addClassSlot.userId || "",
            courseId: addClassSlot.courseId || "",
          };
          setAddClassSlot((prev) => [...prev, addClassSlot?.slot]);
        },
      );
      console.log("addClassSlotMap", addClassSlotMap);

      interface CanceledSlot {
        slot: string;
        userId?: string;
        courseId?: string;
      }

      (calendar.canceledSlots as CanceledSlot[])?.forEach(
        (canceledSlot: CanceledSlot) => {
          canceledSlotMap[canceledSlot?.slot] = {
            userId: canceledSlot.userId || "",
            courseId: canceledSlot.courseId || "",
          };
          canceledArray.push(canceledSlot.slot);
        },
      );
      console.log("calendar", calendar);

      console.log("weeklySlotMap1", weeklySlotMap);
      console.log("bookingsMap1", bookingsMap);

      setBookingsDataMap({ ...bookingsMap, ...addClassSlotMap });
      setWeeklySlotDataMap(weeklySlotMap);

      // Extract available dates directly from the slots
      const availableDatesList = calendar.availableDates;
      const newTeacherAvailable: Schedule[] = [];

      // Process available slots
      availableDatesList.forEach((slot: string) => {
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

      // Extract weekly slot identifiers
      const weekDatesList = calendar.weeklySlots.map(
        (ws: WeeklySlot) => ws.slot,
      );

      // Extract booked slot identifiers
      interface BookedSlot {
        slot: string;
        userId: string;
        courseId: string;
      }
      const bookedSlotStrings: string[] = [
        ...(bookedDatesList || []),
        ...(addClassSlotsList || []),
      ].map((booking: BookedSlot) => booking.slot);

      // Combine weekly slots and booked slots for schedule display
      const slots = [...weekDatesList, ...(bookedSlotStrings || [])];
      const newTeacherSchedule: Schedule[] = [];

      // Process schedule slots
      slots.forEach((slot: string) => {
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

          newTeacherSchedule.push({
            ...slotData,
            isActive:
              slotData.day === currentDay &&
              currentTimeString >= startTime &&
              currentTimeString <= endTime,
          });
        }
      });

      // const newRescheduledSlots = [
      //   ...bookedSlotStrings.filter(
      //     (slot: string) => !weekDatesList.includes(slot),
      //   ),
      //   ...weekDatesList.filter(
      //     (slot: string) => !bookedSlotStrings.includes(slot),
      //   ),
      // ];

      // Set all states at once
      setTeacherAvailable(newTeacherAvailable);
      setTeacherSchedule(newTeacherSchedule);
      // setRescheduledSlots(newRescheduledSlots);
      console.log("canceledArray", canceledArray);
      setCancelledSlots(canceledArray);
    } catch (error) {
      console.error("Error in getTeacherCalendar:", error);
      toast.error("Error fetching teacher calendar data");
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

  const isSlotAvailable = useCallback(
    (day: string, time: string) => {
      const slot = dayMap[day].find((slot) => slot.time.startsWith(`${time}`));
      return (
        slot &&
        teacherAvailable.some(
          (s) => s.day === day && s.time.startsWith(`${time}`),
        )
      );
    },
    [dayMap, teacherAvailable],
  );

  const isSlotBooked = useCallback(
    (day: string, time: string) => {
      const slot = dayMap[day]?.find((slot) => slot.time.startsWith(`${time}`));
      return (
        slot &&
        teacherSchedule.some(
          (s) => s.day === day && s.time.startsWith(`${time}`),
        )
      );
    },
    [dayMap, teacherSchedule],
  );

  // const isRescheduledFn = useCallback(
  //   (day: string, time: string) => {
  //     const slot = dayMap[day]?.find((slot) => slot.time.startsWith(`${time}`));
  //     return slot && rescheduledSlots.includes(slot.slotNumber);
  //   },
  //   [dayMap, rescheduledSlots],
  // );

  const isCancelledFn = useCallback(
    (day: string, time: string) => {
      const slot = dayMap[day]?.find((slot) => slot.time.startsWith(`${time}`));
      return slot && cancelledSlots.includes(slot.slotNumber);
    },
    [dayMap, cancelledSlots],
  );

  const isAddSlotFn = useCallback(
    (day: string, time: string) => {
      const slot = dayMap[day]?.find((slot) => slot.time.startsWith(`${time}`));
      return slot && addClassSlot.includes(slot.slotNumber);
    },
    [dayMap, addClassSlot],
  );

  // const handleReschedule = async (
  //   event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  // ): Promise<void> => {
  //   event.preventDefault();

  //   if (!fromDay || !fromTime || !toDay || !toTime) {
  //     toast.error("Please select both 'From' and 'To' day and time.");
  //     return;
  //   }

  //   const fromSlot = dayMap[fromDay]?.find((slot) =>
  //     slot.time.startsWith(`${fromTime}`),
  //   );
  //   const toSlot = dayMap[toDay]?.find((slot) =>
  //     slot.time.startsWith(`${toTime}`),
  //   );

  //   if (!fromSlot || !toSlot) {
  //     toast.error("Invalid 'From' or 'To' slot selected.");
  //     return;
  //   }

  //   if (
  //     teacherSchedule.some(
  //       (s) => s.day === toDay && s.time.startsWith(`${toTime}`),
  //     )
  //   ) {
  //     toast.error("Selected time is already booked by instructor.");
  //     return;
  //   }

  //   if(rescheduleInfo === "week"){
  //     if(Number(fromSlot.slotNumber[fromSlot.slotNumber.length-1]) >= Number(toSlot.slotNumber[toSlot.slotNumber.length-1])){
  //       toast.error("Invalid dates selected.");
  //       return;
  //     }
  //   }
  //   const bookingData = fromSlot
  //     ? bookingsDataMap[fromSlot.slotNumber] ||
  //       weeklySlotDataMap[fromSlot.slotNumber] || {
  //         userId: "",
  //         courseId: "",
  //       }
  //     : { userId: "", courseId: "" };

  //     if(!bookingData.userId || !bookingData.courseId){
  //       toast.error("Invalid dates selected.");
  //       return;
  //     }

  //   try {
  //     const response = await api.post("/calendar/rescheduleUser", {
  //       userId: bookingData.userId,
  //       courseId: bookingData.courseId,
  //       teacherId: teacher?.id,
  //       from: fromSlot.slotNumber,
  //       to: toSlot.slotNumber,
  //       type: rescheduleInfo,
  //     });

  //     if (response.data.success) {
  //       toast.success("Reschedule successful!");
  //       socket?.emit("send:notification", {
  //         toUserId: selectedClass.userId,
  //         payload: {
  //           fromUserId: teacher?.id,
  //           title: "Rescheduled",
  //           message: `Your class of ${fromDay}, ${fromTime} has been rescheduled to ${toDay}, ${toTime}`,
  //         },
  //       });
  //       setFromDay("");
  //       setFromTime("");
  //       setToDay("");
  //       setToTime("");
  //       getTeacherCalendar();
  //     } else {
  //       toast.error(response.data.message || "Failed to reschedule.");
  //     }
  //   } catch (error) {
  //     console.error("Error during rescheduling:", error);
  //     toast.error("An error occurred while rescheduling.");
  //   }
  // };
  const fetchUser = async (userId: string) => {
    const response = await api.post("/users/get-user", {
      id: userId,
    });
    if (!response.data.success) {
      toast.error("failed to fetch the user details");
      return null;
    }
    return response.data.user;
  };
  const fetchCourse = async (courseId: string) => {
    const response = await api.post("/courses/get", {
      id: courseId,
    });
    if (!response.data.success) {
      toast.error("failed to fetch the course details");
      return null;
    }
    return response.data.data;
  };

  const getNextClass = (
    currentSlot: string,
    userId: string,
    courseId: string,
  ): string => {
    const allSlots = Object.entries({
      ...bookingsDataMap,
      ...weeklySlotDataMap,
    })
      .filter(
        ([, data]) => data.userId === userId && data.courseId === courseId,
      )
      .map(([slotNum]) => slotNum);

    const sortedSlots = allSlots.sort();

    const idx = sortedSlots.indexOf(currentSlot);

    if (idx !== -1 && idx + 1 < sortedSlots.length) {
      const nextSlotNum = sortedSlots[idx + 1];
      const slotInfo = slotNumberMap[nextSlotNum];
      if (slotInfo) {
        return `${slotInfo.day}, ${slotInfo.time}`;
      }
    }
    return "No upcoming class";
  };

  async function handleCancel(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): Promise<void> {
    event.preventDefault();

    if (
      !selectedClass.userId ||
      !selectedClass.courseId ||
      !selectedClass.time
    ) {
      toast.error("No class selected to cancel.");
      return;
    }
    console.log("time", selectedClass.time);
    const [day, timeRange] = selectedClass.time.split(", ");
    console.log("day", dayMap);
    const slot =
      day && timeRange
        ? dayMap[day]?.find((slot) => slot.time === timeRange)
        : undefined;
    const time = dayMap[day]?.find((slot) => slot.time === timeRange)?.time;

    if (!slot) {
      toast.error("Could not determine the slot to cancel.");
      return;
    }
    if (!teacher || !teacher.id) {
      toast.error("Please select a teacher to cancel the class");
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

    const currentDate = new Date();
    const currentDayIndex = currentDate.getDay();
    const currentTimeMinutes =
      currentDate.getHours() * 60 + currentDate.getMinutes();

    const fromDay = day;
    const fromDayIndex = daysOfWeek.indexOf(fromDay);
    const fromTimeMinutes = getTimeInMinutes(timeRange);
    console.log("fromDayIndex", fromDayIndex);
    console.log("currentDayIndex", currentDayIndex);
    console.log("fromTimeMinutes", fromTimeMinutes);
    console.log("currentTimeMinutes", currentTimeMinutes);
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
    const response = window.confirm(
      "Are you sure you want to cancel this class?",
    );
    if (!response) {
      return;
    }
    setLoading(true);
    try {
      const response = await api.post("/calendar/cancelUserClass", {
        userId: selectedClass.userId,
        courseId: selectedClass.courseId,
        teacherId: teacher.id,
        slot: slot.slotNumber,
        type: "week",
        isTeacher: true,
      });

      if (response.data.success) {
        toast.success("Class cancelled successfully!");
        socket?.emit("send:notification", {
          toUserId: selectedClass.userId,
          payload: {
            fromUserId: teacher?.id,
            title: "Cancelled",
            message: `Your class of ${day}, ${time} has been cancelled`,
          },
        });
        getTeacherCalendar();
        setLoading(false);
      } else {
        toast.error(response.data.message || "Failed to cancel class.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error during cancellation:", error);
      toast.error("An error occurred while cancelling the class.");
      setLoading(false);
    }
  }

  function formatTimeSlot(startTime: string): string {
    const [time, modifier] = startTime.split(" ");
    const [hoursStr, minutesStr] = time.split(":");
    const minutes = Number(minutesStr);
    let hours = Number(hoursStr);

    if (modifier === "PM" && hours !== 12) {
      hours += 12;
    } else if (modifier === "AM" && hours === 12) {
      hours = 0;
    }

    const startDate = new Date();
    startDate.setHours(hours, minutes, 0);

    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);

    const formatOptions: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };

    const startFormatted = startDate.toLocaleTimeString("en-US", formatOptions);
    const endFormatted = endDate.toLocaleTimeString("en-US", formatOptions);

    return `${startFormatted} - ${endFormatted}`;
  }

  if (isHoliday) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-6 font-satoshi flex items-center justify-center">
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            🥺It's a Holiday Today!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Holiday is declared by owner.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-6 font-satoshi">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">
          Your Calendar
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Calendar Section */}
          <div className="lg:col-span-8 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Weekly Schedule
            </h2>

            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                {startTimes.length === 0 || Object.keys(dayMap).length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    Loading schedule...
                  </div>
                ) : (
                  <div
                    className="grid gap-2"
                    style={{
                      gridTemplateColumns: `100px repeat(${startTimes.length}, 1fr)`,
                    }}
                  >
                    <div></div>
                    {startTimes.map((time) => (
                      <div
                        key={time}
                        className="text-center text-sm text-gray-500 dark:text-gray-200"
                      >
                        {time}
                      </div>
                    ))}

                    {Object.entries(dayMap).map(([day]) => (
                      <React.Fragment key={day}>
                        <div className="text-gray-700 dark:text-gray-300 font-medium capitalize">
                          {day}
                        </div>
                        {startTimes.map((time) => {
                          // const isRescheduled = isRescheduledFn(day, time);
                          const isAvailable = isSlotAvailable(day, time);
                          const isBooked = isSlotBooked(day, time);
                          const isCancelled = isCancelledFn(day, time);
                          const slot = dayMap[day]?.find((slot) =>
                            slot.time.startsWith(`${time}`),
                          );
                          const isAddSlot = isAddSlotFn(day, time);
                          console.log(
                            "day,time,isaddslot",
                            day,
                            time,
                            isAddSlot,
                          );
                          const bookingData = slot
                            ? bookingsDataMap[slot.slotNumber] ||
                              weeklySlotDataMap[slot.slotNumber] || {
                                userId: "N/A",
                                courseId: "N/A",
                              }
                            : { userId: "N/A", courseId: "N/A" };
                          return (
                            <button
                              key={`${day}-${time}`}
                              onClick={async () => {
                                setIsLoading(true);
                                let user = {
                                  name: "",
                                  image: "",
                                };
                                if (bookingData.userId !== "N/A") {
                                  const fetchedUser = await fetchUser(
                                    bookingData.userId,
                                  );
                                  if (fetchedUser) user = fetchedUser;
                                }
                                let course = {
                                  classesTaken: 0,
                                  classesTotal: 0,
                                };
                                if (bookingData.courseId !== "N/A") {
                                  const fetchedCourse = await fetchCourse(
                                    bookingData.courseId,
                                  );
                                  if (fetchedCourse) course = fetchedCourse;
                                }
                                // Find the next class for this user/course

                                const slotNumber = slot?.slotNumber || "";
                                const nextClass = getNextClass(
                                  slotNumber,
                                  bookingData.userId,
                                  bookingData.courseId,
                                );

                                setSelectedClass({
                                  studentName: user.name,
                                  studentImage: user.image,
                                  time: `${day}, ${formatTimeSlot(time)}`,
                                  topic: "Brakes and clutch",
                                  lastClass: "Basics of accelerator",
                                  progress: {
                                    completed: course.classesTaken,
                                    total: course.classesTotal,
                                  },
                                  nextClass: nextClass,
                                  userId: bookingData.userId,
                                  courseId: bookingData.courseId,
                                });
                                setIsLoading(false);
                              }}
                              className={`h-10 rounded-lg border dark:border-gray-700 transition-colors ${
                                isCancelled
                                  ? "bg-red-400 dark:bg-red-700 cursor-not-allowed"
                                  : // : isRescheduled
                                    //   ? "bg-yellow-300 dark:bg-yellow-700"
                                    isBooked
                                    ? "bg-blue-400 dark:bg-blue-700 cursor-not-allowed"
                                    : isAvailable
                                      ? "hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                      : "cursor-not-allowed bg-gray-200 dark:bg-gray-700"
                              }`}
                            >
                              {
                                teacher?.expertise[0]?.toLowerCase() === "scooter"?
                                <ScooterImg
                                  className="mx-auto " 
                                  fill={
                                    isAddSlot
                                      ? "#aaa"
                                      : isAvailable
                                        ? "#727DFF"
                                        : "#aaa"
                                  }
                                />:
                                <CarImg
                                  className="mx-auto"
                                  fill={
                                    isAddSlot
                                      ? "#aaa"
                                      : isAvailable
                                        ? "#727DFF"
                                        : "#aaa"
                                  }
                                />
                              }
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
              {/* <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-300 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">
                  Rescheduled
                </span>
              </div> */}
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-400 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">
                  Canceled
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border bg-gray-200 dark:bg-gray-700 dark:border-gray-700 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">
                  Available
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-400 dark:bg-blue-700 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">
                  Occupied
                </span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-4 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Class Details
            </h2>
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400">
                  Loading class details...
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {selectedClass.studentName === "" ? (
                  <div className="text-gray-600 dark:text-gray-400 text-center">
                    Select the class from calendar to view details
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-4">
                      <img
                        src={selectedClass.studentImage}
                        alt={selectedClass.studentName}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {selectedClass.studentName}
                        </h3>
                        <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                          <Clock className="w-4 h-4 mr-2" />
                          <span>{selectedClass.time}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-gray-600 dark:text-gray-400 mb-1">
                        Progress
                      </p>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                        <div
                          className="h-2 bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-300"
                          style={{
                            width: `${(selectedClass.progress.completed / selectedClass.progress.total) * 100}%`,
                          }}
                        />
                      </div>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {selectedClass.progress.completed} classes completed
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-600 dark:text-gray-400 mb-1">
                        Next class:
                      </p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {selectedClass.nextClass}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2">
                      {/* <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-2 rounded-lg transition-colors">
                            View all classes
                          </button> */}
                      <button
                        className={`w-full bg-red-400 hover:bg-red-500 text-white font-medium py-2 rounded-lg transition-colors ${isCancelledFn(selectedClass.time.split(", ")[0], selectedClass.time.split(", ")[1]) ? "cursor-not-allowed" : ""}`}
                        disabled={
                          isCancelledFn(
                            selectedClass.time.split(", ")[0],
                            selectedClass.time.split(", ")[1],
                          ) || loading
                        }
                        onClick={handleCancel}
                      >
                        {loading ? "Cancelling..." : "Cancel class"}
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Reschedule Section */}
        {/* <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Reschedule
          </h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <select
                  className="w-full p-3 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  value={rescheduleInfo}
                  onChange={(e) => setRescheduleInfo(e.target.value)}
                >
                  <option value="week">Reschedule for this week only</option>
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
                  className="w-1/3 p-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  {Object.entries(dayMap).map(([day]) => (
                    <option key={day}>{day}</option>
                  ))}
                </select>
                <select
                  value={fromTime}
                  onChange={(e) => setFromTime(e.target.value)}
                  className="w-2/3 p-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  {startTimes.map((time) => (
                    <option key={time}>{time}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-gray-600 dark:text-gray-400">To:</label>
                <br />
                <select
                  value={toDay}
                  onChange={(e) => setToDay(e.target.value)}
                  className="w-1/3 p-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  {Object.entries(dayMap).map(([day]) => (
                    <option key={day}>{day}</option>
                  ))}
                </select>
                <select
                  value={toTime}
                  onChange={(e) => setToTime(e.target.value)}
                  className="w-2/3 p-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  {startTimes.map((time) => (
                    <option key={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default TeacherCalendar;
