import React, { useState, useEffect } from "react";
import api from "../../../utils/axiosInstance";
import { DrivingSchool } from "../../../interfaces/models";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { toast } from "sonner";

interface DayInfo {
  name: string;
  date?: string;
  isHoliday: boolean;
  isSelected: boolean;
  isHalfDay?: boolean;
  isPast?: boolean;
  timings?: {
    from: string;
    to: string;
  };
}

const Holiday: React.FC = () => {
  const [festivalDays, setFestivalDays] = useState<DayInfo[]>([]);
  const [selectedDay, setSelectedDay] = useState<DayInfo | null>(null);
  const [holiday, setHoliday] = useState<string>("");
  const [isHalfDay, setIsHalfDay] = useState(false);
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const school = useSelector(
    (state: RootState) => state.auth.user,
  ) as DrivingSchool;
  // console.log("school", school);

  // Initialize festival days with this week's dates
  useEffect(() => {
    const today = new Date();
    const monday = new Date(today);
    monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));

    const thisWeekDates = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      return {
        date: date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        dayName: date.toLocaleDateString("en-US", { weekday: "long" }),
        isPast: date < new Date(today.setHours(0, 0, 0, 0)),
      };
    });
    // console.log("school", school);
    console.log("thisWeekDates", thisWeekDates);
    setFestivalDays(
      thisWeekDates.map((dateInfo) => ({
        name: dateInfo.dayName,
        date: dateInfo.date,
        isPast: dateInfo.isPast,
        isHoliday: dateInfo.dayName === school?.Holiday,
        isSelected: false,
        isHalfDay: false,
        timings: undefined,
      })),
    );
  }, []);

  const handleDayClick = (day: DayInfo) => {
    // Don't allow selecting past days
    if (day.isPast) {
      return;
    }

    // Update selection state
    setFestivalDays(
      festivalDays.map((d) => ({
        ...d,
        isSelected: d.name === day.name && d.date === day.date,
      })),
    );

    setSelectedDay({ ...day });
    setIsHalfDay(day.isHalfDay || false);
    setFromTime(day.timings?.from || "");
    setToTime(day.timings?.to || "");
  };

  const handleConfirmHoliday = async () => {
    try {
      if (!selectedDay) {
        toast.error("please select a day");
        return;
      }
      if (!school?.id) {
        toast.error("school id is required");
        return;
      }
      if (school.Holiday === selectedDay.name) {
        toast.error("Holiday is already declared you cannot declare it again");
        return;
      }
      if (holiday === selectedDay.name) {
        toast.error("Holiday is already declared you cannot declare it again");
        return;
      }
      let isHoliday = false;
      if (school.Holiday !== "None") {
        const res = window.confirm(
          `A holiday is already set as ${school.Holiday}. If you change it to ${selectedDay.name}, the old one will be removed. You can add it again later if needed. Do you want to continue?`,
        );

        if (!res) return;
        isHoliday = true;
      }
      const res = await api.post(`/drivingSlots/${school.id}`);
      if (!res.data.success) {
        toast.error("failed to fetch the slots");
        return;
      }
      const slots = res.data.slots;
      const holidayarr: string[] = [];
      slots.forEach(
        (slot: { day: string; slotNumber: string; time: string }) => {
          if (slot.day === selectedDay.name) {
            holidayarr.push(slot.slotNumber);
          }
        },
      );
      const response = await api.post("/holiday/setHoliday", {
        schoolId: school.id,
        holidaySlots: holidayarr,
        holiday: selectedDay.name,
      });
      if (!response.data.success) {
        toast.error("failed to set the holiday");
        return;
      }
      if (isHoliday) {
        const res1 = await api.post("/notification/sendAll", {
          schoolId: school.id,
          title: "Holiday canceled",
          message: `Holiday on ${school.Holiday} is canceled`,
        });

        if (!res1.data.success) {
          toast.error("failed to send notification");
          return;
        }
      }
      const res2 = await api.post("/notification/sendAll", {
        schoolId: school.id,
        title: "Holiday declared",
        message: `${selectedDay.name} is Declared as Holiday`,
      });
      if (!res2.data.success) {
        toast.error("failed to send notification");
        return;
      }

      toast.success("holiday set successfully");

      setFestivalDays(
        festivalDays.map((d) =>
          d.isHoliday
            ? {
                ...d,
                isHoliday: false,
                isHalfDay: false,
                timings: undefined,
                isSelected: false,
              }
            : d.name === selectedDay.name && d.date === selectedDay.date
              ? {
                  ...d,
                  isHoliday: true,
                  isSelected: false,
                  isHalfDay,
                  timings: isHalfDay
                    ? { from: fromTime, to: toTime }
                    : undefined,
                }
              : { ...d, isSelected: false },
        ),
      );
      setHoliday(selectedDay.name);

      // Reset form
      setSelectedDay(null);
      setIsHalfDay(false);
      setFromTime("");
      setToTime("");
    } catch (error) {
      console.error("Error confirming holiday:", error);
      toast.error("Failed to declare holiday. Please try again.");
    }
  };

  const handleCancelHoliday = () => {
    if (!selectedDay) return;
    if (school.Holiday === selectedDay.name) {
      toast.error("Holiday is already declared you cannot cancel it");
      return;
    }
    if (holiday === selectedDay.name) {
      toast.error("Holiday is already declared you cannot cancel it");
      return;
    }

    setFestivalDays(
      festivalDays.map((d) =>
        d.name === selectedDay.name && d.date === selectedDay.date
          ? {
              ...d,
              isHoliday: false,
              isSelected: false,
              isHalfDay: false,
              timings: undefined,
            }
          : { ...d, isSelected: false },
      ),
    );

    // Reset form
    setSelectedDay(null);
    setIsHalfDay(false);
    setFromTime("");
    setToTime("");
  };

  const renderDayCard = (day: DayInfo) => (
    <div
      key={`${day.name}-${day.date}`}
      onClick={() => handleDayClick(day)}
      className={`
        p-4 rounded-lg transition-all
        ${
          day.isPast
            ? "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed opacity-60"
            : "cursor-pointer"
        }
        ${
          day.isSelected
            ? "bg-yellow-100 dark:bg-yellow-900/20 border-2 border-yellow-400"
            : day.isHoliday
              ? "bg-blue-600 dark:bg-blue-700 text-white"
              : "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
        }
        ${day.isHoliday && !day.isSelected && !day.isPast ? "text-white" : ""}
        ${!day.isPast ? "text-gray-900 dark:text-white" : ""}
      `}
    >
      <div className="text-center">
        <div className="font-medium">{day.name}</div>
        {day.date && <div className="text-sm mt-1">{day.date}</div>}
        {day.isPast && <div className="text-xs mt-1 italic">Past day</div>}
        {day.isHoliday && day.isHalfDay && (
          <div className="text-xs mt-1">
            {day.timings?.from} - {day.timings?.to}
          </div>
        )}
      </div>
    </div>
  );

  const renderHolidayInfo = () => {
    const holidays = festivalDays.filter((d) => d.isHoliday);

    if (holidays.length === 0) return null;

    return (
      <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg">
        <h3 className="font-medium text-gray-900 dark:text-white mb-2">
          Holiday on:
        </h3>
        <div className="flex flex-wrap gap-2">
          {holidays.map((day) => (
            <div
              key={`${day.name}-${day.date}`}
              className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm"
            >
              {day.name} ({day.date})
              {day.isHalfDay && ` (${day.timings?.from} - ${day.timings?.to})`}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
          Declare Holiday
        </h1>

        {/* Festival Holidays Section */}
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Festival Holiday
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">
              (Past days are disabled)
            </span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {festivalDays.map((day) => renderDayCard(day))}
          </div>

          {selectedDay && (
            <div className="mt-6 space-y-4">
              <div className="flex gap-4">
                {/* <button
                  onClick={() => setIsHalfDay(true)}
                  className={`px-6 py-2 rounded-lg transition-colors ${
                    isHalfDay
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                  }`}
                >
                  Half day
                </button> */}
                <button
                  onClick={() => setIsHalfDay(false)}
                  className={`px-6 py-2 rounded-lg transition-colors ${
                    !isHalfDay
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                  }`}
                >
                  Full day
                </button>
              </div>

              {isHalfDay && (
                <div className="space-y-4">
                  <h3 className="text-gray-900 dark:text-white font-medium">
                    Enter Halfday working hours
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                        From
                      </label>
                      <input
                        type="time"
                        value={fromTime}
                        onChange={(e) => setFromTime(e.target.value)}
                        className="w-full p-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                        To
                      </label>
                      <input
                        type="time"
                        value={toTime}
                        onChange={(e) => setToTime(e.target.value)}
                        className="w-full p-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {renderHolidayInfo()}

          {selectedDay && (
            <div className="mt-6 flex gap-4">
              <button
                onClick={handleCancelHoliday}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition-colors"
              >
                Cancel Holiday
              </button>
              <button
                onClick={handleConfirmHoliday}
                className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-2 rounded-lg transition-colors"
              >
                Declare Holiday
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Holiday;
