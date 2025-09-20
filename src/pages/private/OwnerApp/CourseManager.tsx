import React, { useCallback, useEffect, useState } from "react";
import { Bike, Car, Clock, Plus, Truck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import api from "../../../utils/axiosInstance";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { DrivingSchool } from "../../../interfaces/models";

type CourseType = "all" | "two-wheeler" | "four-wheeler";

interface Course {
  id: string;
  title: string;
  type: "two-wheeler" | "four-wheeler";
  vehicleType: string;
  sessions: number;
  hoursPerSession: number;
  price: number;
  icon: React.ReactNode;
  description?: string;
  vehicle?: string;
  classes?: number;
  timePeriod?: string;
}

const courseIcons = {
  "scooty-activa": <Bike className="w-6 h-6" />,
  "car-personal": <Car className="w-6 h-6" />,
  "car-commercial": <Truck className="w-6 h-6" />,
  bike: <Bike className="w-6 h-6" />,
};

const courseTypes = {
  "scooty-activa": "two-wheeler",
  "car-personal": "four-wheeler",
  "car-commercial": "four-wheeler",
  bike: "two-wheeler",
};

const CourseManager: React.FC = () => {
  const [selectedType, setSelectedType] = useState<CourseType>("all");
  const navigate = useNavigate();
  const school =
    (useSelector((state: RootState) => state.school.school) as DrivingSchool) ||
    (useSelector((state: RootState) => state.auth.user) as DrivingSchool);
  const schoolId = school?.id;
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const getCourse = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.post(`/driving/get-syllabus`, { schoolId });
      // console.log("response", response);
      if (!response.data.success) {
        toast.error("Error fetching courses");
        setLoading(false);
        return;
      }
      const syllabusData = response.data.syllabus?.syllabus?.map(
        (course: Course) => ({
          id: course.id,
          title: course.description,
          type:
            courseTypes[course.vehicle as keyof typeof courseTypes] ||
            "four-wheeler",
          vehicleType: course.vehicle,
          sessions: course.classes,
          hoursPerSession: course.timePeriod,
          price: course.price,
          icon: courseIcons[course.vehicle as keyof typeof courseIcons] || (
            <Car className="w-6 h-6" />
          ),
        }),
      );
      setCourses(syllabusData);
    } catch (error) {
      console.error("Error fetching courses:", error);
      toast.error("Error fetching courses");
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    getCourse();
  }, [getCourse]);

  const filteredCourses = courses.filter((course) =>
    selectedType === "all" ? true : course.type === selectedType,
  );
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Loading Courses...
          </p>
        </div>
      </div>
    );
  }

  const CourseCard = ({ course }: { course: Course }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <div className="w-12 h-12 bg-blue-50 dark:bg-blue-400/70 rounded-full flex items-center justify-center mb-6">
        {course.icon}
      </div>

      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {course.title}
      </h3>

      <div className="space-y-2 mb-6">
        <p className="text-gray-600 dark:text-gray-300 flex items-center gap-2">
          <Car className="w-4 h-4" />
          {course.vehicleType}
        </p>
        <p className="text-gray-600 dark:text-gray-300 flex items-center gap-2">
          <Clock className="w-4 h-4" />
          {course.sessions} Sessions
        </p>
        <p className="text-gray-600 dark:text-gray-300 flex items-center gap-2">
          <Clock className="w-4 h-4" />
          {course.hoursPerSession} Minutes/Session
        </p>
      </div>

      <div className="flex justify-between flex-col items-start">
        <span className="text-xs text-gray-500 dark:text-gray-400 mb-1">
          Total Fee:
        </span>
        <span className="text-lg font-semibold text-gray-900 dark:text-white">
          Rs.{course.price}
        </span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-6 font-satoshi">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">
          Course Overview
        </h1>

        {/* Filter Buttons */}
        <div className="flex gap-2 bg-white dark:bg-gray-800 p-1 rounded-lg w-fit">
          <button
            onClick={() => setSelectedType("all")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedType === "all"
                ? "bg-blue-600 text-white"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedType("two-wheeler")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedType === "two-wheeler"
                ? "bg-blue-600 text-white"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            Two-Wheeler
          </button>
          <button
            onClick={() => setSelectedType("four-wheeler")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedType === "four-wheeler"
                ? "bg-blue-600 text-white"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            Four-Wheeler
          </button>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Course Cards */}
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}

          {/* Create New Course Card */}
          <div
            className="bg-gray-100 dark:bg-gray-800/50 rounded-xl p-6 flex flex-col items-center justify-center text-center border-2 border-dashed border-gray-300 dark:border-gray-700 cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
            onClick={() => navigate(`/school/new-course/${schoolId}`)}
          >
            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
              <Plus className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Create New Course
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Click to add a new training program
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseManager;
