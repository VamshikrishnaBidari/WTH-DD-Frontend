import React, { useCallback, useEffect, useState } from "react";
import { Search, Star } from "lucide-react";
import { toast } from "sonner";
import api from "../../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

interface Student {
  name: string;
  id: string;
  image: string;
  courses: [
    {
      type: string;
      id: string;
      completed: boolean;
      avgRating: number | null;
      classesTaken: number;
      classesTotal: number;
      stars: number;
    },
  ];
}

interface Teacher {
  id: string;
  schoolId: string;
  [key: string]: any;
}

// StudentCard Component
const StudentCard: React.FC<{
  student: Student;
  onClick: () => void;
}> = ({ student, onClick }) => {
  // console.log("student", student);
  const averageStars = student.courses[student.courses.length - 1].avgRating;
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
          <span>Course : </span>
          <span className="text-gray-900 dark:text-white">
            {student.courses[student.courses.length - 1].type}
          </span>
        </div>

        <div>
          <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
            Learning Reviews:
          </div>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < (averageStars || 0)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300 dark:text-gray-600"
                }`}
              />
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-600 dark:text-gray-400">Progress</span>
            <span className="text-gray-900 dark:text-white">
              {student.courses[student.courses.length - 1].classesTaken}/
              {student.courses[student.courses.length - 1].classesTotal} Classes
            </span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
            <div
              className="h-2 bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-300"
              style={{
                width: `${(student.courses[student.courses.length - 1].classesTaken / student.courses[student.courses.length - 1].classesTotal) * 100}%`,
              }}
            />
          </div>
        </div>

        <div className="flex justify-between text-xs">
          <span className="text-gray-600 dark:text-gray-400">Completed :</span>
          <span className="text-gray-900 dark:text-white">
            {student.courses[student.courses.length - 1].completed
              ? "Yes"
              : "No"}
          </span>
        </div>
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

const StudentsList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [teacher, setTeacher] = useState<Teacher | null>(null);

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
    }
  }, []);

  useEffect(() => {
    getTeacher();
  }, []);

  const getStudents = useCallback(async () => {
    if (!teacher?.id) return;
    const response = await api.post("/teachers/get-students", {
      id: teacher?.id,
    });
    // console.log("students", response.data);

    if (!response.data.success) {
      toast.error("Error fetching students");
    } else {
      setStudents(response.data.data);
    }
  }, [teacher]);

  useEffect(() => {
    setLoading(true);
    getStudents().finally(() => {
      setLoading(false);
    });
  }, [getStudents]);

  // Filter students based on search query
  const filteredStudents = students.filter(
    (student) =>
      (student.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (student.courses[student.courses.length - 1].type || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
  );

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 px-1 py-4 lg:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex mx-5 flex-col md:flex-row justify-between items-start mb-4 md:mb-8">
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
              className="w-80 pl-4 pr-10 py-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className=" -translate-y-8 translate-x-72 text-gray-400 w-5 h-5" />
          </div>
        </div>

        {/* Students Grid */}

        {filteredStudents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              No students found matching your search criteria.
            </p>
          </div>
        ) : (
          <div className="mx-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
            {filteredStudents.map((student) => (
              <StudentCard
                key={student.id}
                student={student}
                onClick={() =>
                  navigate(`/instructor/student-profile/${student.id}`)
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
              onClick={() =>
                navigate(`/instructor/student-profile/${student.user.id}`)
              }
            />
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default StudentsList;
