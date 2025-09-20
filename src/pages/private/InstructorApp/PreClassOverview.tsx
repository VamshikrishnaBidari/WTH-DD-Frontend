import React, { useCallback, useEffect, useState } from "react";
import { Phone, BookOpen, Clock, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import api from "../../../utils/axiosInstance";

interface Course {
  id: string;
  user: {
    id: string;
    name: string;
    image: string;
    phoneNumber: string;
  };
  type: string;
  classesTaken: number;
  classesTotal: number;
  classDuration: number;
  teacher: {
    school: {
      location: string;
      name: string;
      id: string;
    };
  };
}

interface ClassData {
  title: string;
  day: number;
  description: string;
  [key: string]: any;
}
const PreClassOverview: React.FC = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [currentClassData, setCurrentClassData] = useState<ClassData | null>(
    null,
  );
  const [previousClassData, setPreviousClassData] = useState<ClassData | null>(
    null,
  );
  const [course, setCourse] = useState<Course>({
    id: "",
    user: {
      id: "",
      name: "",
      image: "",
      phoneNumber: "",
    },
    type: "4 wheel driving",
    classesTaken: 0,
    classesTotal: 1,
    classDuration: 0,
    teacher: {
      school: {
        location: "",
        name: "",
        id: "",
      },
    },
  });

  const getCourse = useCallback(async () => {
    try {
      const response = await api.post("/courses/get", { id: courseId });
      console.log(response);
      if (!response.data.success) {
        toast.error("Error fetching course data");
        return;
      }
      const courseData = response.data.data;
      setCourse(courseData);
      const syllabusres = await api.post(`/vehicleSyllabus/get`, {
        id: courseData.teacher.schoolId,
      });
      if (!syllabusres.data.success) {
        toast.error("Error fetching syllabus data");
        return;
      }

      const syllabus = syllabusres.data.syllabusData;
      console.log("syllabus", syllabus);
      console.log("courseData", courseData);
      const syllabusData = syllabus.find(
        (s: { vehicle: string }) =>
          s.vehicle.toLowerCase() === courseData.vehicle.toLowerCase(),
      );
      console.log("syllabusData", syllabusData);
      if (!syllabusData) {
        console.error("Syllabus data not found for the vehicle", syllabusData);
        toast.error("Error fetching syllabus data");
        return;
      }
      const currentClass = syllabusData?.vehicleSyllabus.find(
        (s: { day: number }) => s.day === courseData.classesTaken + 1,
      );
      const previousClass = syllabusData?.vehicleSyllabus.find(
        (s: { day: number }) => s.day === courseData.classesTaken,
      );
      if (!currentClass || !previousClass) {
        toast.error("Error fetching syllabus data");
        return;
      }
      setCurrentClassData(currentClass);
      setPreviousClassData(previousClass);
    } catch (error) {
      console.log("Error fetching course data", error);
      toast.error("Error fetching course data");
    }
  }, [courseId]);
  useEffect(() => {
    getCourse();
  }, [getCourse]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6 font-satoshi">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 ml-2">
            Pre-Class Overview
          </h1>
          <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-sm font-medium rounded-full border border-green-500 dark:border-green-600 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full"></span>
            Active
          </span>
        </div>

        {/* Student Info Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={
                  course.user.image ||
                  "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop"
                }
                alt={course.user.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {course.user.name}
                </h2>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Phone className="w-4 h-4" />
                  <span>{course.user.phoneNumber}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => navigate(-1)}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              Back
            </button>
          </div>

          <div className="mt-6">
            <p className="text-gray-600 dark:text-gray-400">{course.type}</p>

            <div className="mt-6">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Course Progress
              </h3>
              <div className="flex justify-between items-center mb-2 gap-4">
                <span className="text-gray-900 dark:text-white font-medium">
                  {course.classesTaken}/{course.classesTotal} class completed
                </span>
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Progress:{" "}
                  {((course.classesTaken / course.classesTotal) * 100).toFixed(
                    1,
                  )}
                  %
                </span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                <div
                  className="h-2 bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-300"
                  style={{
                    width: `${((course.classesTaken / course.classesTotal) * 100).toFixed(1)}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Today's Class */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Today's Class
          </h3>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <BookOpen className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-1" />
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {currentClassData?.title || "No title available"}
                </h4>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Clock className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-1" />
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {/* TODO:  from calendar */}
                  {/* {currentClass.time} */}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {course.classDuration} minutes
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-1" />
              <p className="font-medium text-gray-900 dark:text-white">
                {course.teacher.school.location}
              </p>
            </div>
          </div>
        </div>

        {/* Previous Class Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Previous Class Summary
          </h3>

          <div className="space-y-4">
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-200">
                Topic:{" "}
              </span>
              <span className="text-gray-600 dark:text-gray-300">
                {previousClassData?.title}
              </span>
            </div>

            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-200 mb-2">
                Key Points Covered:
              </h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {previousClassData?.description ||
                  "No description available for the previous class."}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-blue-800 py-3 rounded-lg transition-colors text-center font-medium"
            onClick={() => navigate(`/instructor/live-class/${courseId}`)}
          >
            Start Class
          </button>
          <button
            className="flex-1 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 py-3 rounded-lg transition-colors text-center font-medium"
            onClick={() => navigate(`/instructor/`)}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreClassOverview;
