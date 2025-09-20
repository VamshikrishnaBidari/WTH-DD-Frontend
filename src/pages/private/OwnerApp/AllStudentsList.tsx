import React, { useCallback, useEffect, useState } from "react";
import { Search, Star } from "lucide-react";
import { toast } from "sonner";
import api from "../../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { DrivingSchool } from "../../../interfaces/models";

interface Student {
  id: string;
  name: string;
  image: string;
  course: string;
  courses: [
    {
      id: string;
      type: string;
      classesTotal: number;
      classesTaken: number;
      stars: number;
      avgRating: number | null;
    },
  ];
}

// StudentCard Component
const StudentCard: React.FC<{
  student: Student;
  onClick: () => void;
}> = ({ student, onClick }) => {
  const averageStars = student.courses.reduce(
    (sum, course) => sum + (course.avgRating || 0),
    0,
  );
  const totalClassesTaken = student.courses.reduce(
    (sum, course) => sum + course.classesTaken,
    0,
  );
  const totalClassesTotal = student.courses.reduce(
    (sum, course) => sum + course.classesTotal,
    0,
  );
  const courseTypes = student.courses.map((course) => course.type).join(", ");

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm px-2 py-4 md:p-6 hover:shadow-md transition-shadow">
      {/* Student Info */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={student.image}
          alt={student.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <h3 className="font-semibold text-gray-900 dark:text-white">
          {student.name}
        </h3>
      </div>

      {/* Course Info */}
      <div className="space-y-2 md:space-y-3 mb-6">
        <div className="text-xs text-gray-600 dark:text-gray-400">
          <span>Courses: </span>
          <span className="text-gray-900 dark:text-white">{courseTypes}</span>
        </div>

        <div>
          <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
            Average Learning Reviews:
          </div>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.round(averageStars)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300 dark:text-gray-600"
                }`}
              />
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-600 dark:text-gray-400">
              Overall Progress
            </span>
            <span className="text-gray-900 dark:text-white">
              {totalClassesTaken}/{totalClassesTotal} Classes
            </span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
            <div
              className="h-2 bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-300"
              style={{
                width: `${(totalClassesTaken / totalClassesTotal) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* <div className="flex justify-between text-xs">
            <span className="text-gray-600 dark:text-gray-400">Class frequency :</span>
            <span className="text-gray-900 dark:text-white">
              {student.classFrequency} per week
            </span>
          </div> */}
      </div>

      {/* Actions */}
      <div className="flex gap-2 md:gap-4">
        <button
          onClick={onClick}
          className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-blue-950 py-2 rounded-lg transition-colors text-xs"
        >
          View Details
        </button>
        {/* <button className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-blue-950 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 text-xs">
            <MessageSquare className="w-4 h-4" />
            Chat
          </button> */}
      </div>
    </div>
  );
};

const AllStudentsList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const school =
    (useSelector((state: RootState) => state.school.school) as DrivingSchool) ||
    (useSelector((state: RootState) => state.auth.user) as DrivingSchool);
  const schoolId = school?.id;
  const navigate = useNavigate();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const getStudents = useCallback(async () => {
    try {
      const response = await api.post("/driving/get-students", { schoolId });
      if (!response.data.success) {
        toast.error(response.data.message);
        setLoading(false);
        return;
      }
      // console.log("students", response.data.students);
      const students = response.data.students;
      setStudents(students);
    } catch (error) {
      console.error("Error fetching students:", error);
      toast.error("Failed to fetch students. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    getStudents();
  }, [getStudents]);

  // Filter students based on search query
  const filteredStudents = students.filter(
    (student) =>
      (student.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (student.course || "").toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Loading Students...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 px-1 py-4 lg:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-4 md:mb-8">
          <div className="mb-5 md:mb-0">
            <h1 className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              Students
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your students and track their progress
            </p>
          </div>

          {/* Search */}
          <div className="">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-80 pl-4 pr-10 py-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className=" -translate-y-8 translate-x-72 text-gray-400 w-5 h-5" />
          </div>
        </div>

        {/* Students Grid */}

        {filteredStudents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              {students.length === 0
                ? "No students found."
                : "No students match your search."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredStudents.map((student, index) => (
              <StudentCard
                key={`${student.id}-${index}`}
                student={student}
                onClick={() =>
                  navigate(`/school/student-profile/${student.id}`)
                }
              />
            ))}
          </div>
        )}

        {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {students.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              onClick={() => navigate(`/school/student-profile/${student.id}`)}
            />
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default AllStudentsList;
