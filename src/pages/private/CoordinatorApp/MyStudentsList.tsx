import React, { useState, useEffect, useCallback } from "react";
import { Search } from "lucide-react";
import { User, Course, Operator } from "../../../interfaces/models.ts";
import api from "../../../utils/axiosInstance.ts";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store.ts";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

// StudentCard Component
const StudentCard: React.FC<{
  student: User;
  onClick: () => void;
}> = ({ student, onClick }) => {
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

      {/* Contact Info */}
      <div className="space-y-2 md:space-y-3 mb-6">
        <div className="text-xs text-gray-600 dark:text-gray-400">
          <span>Email: </span>
          <span className="text-gray-900 dark:text-white">{student.email}</span>
        </div>
        {student.phoneNumber && (
          <div className="text-xs text-gray-600 dark:text-gray-400">
            <span>Phone: </span>
            <span className="text-gray-900 dark:text-white">
              {student.phoneNumber}
            </span>
          </div>
        )}
      </div>

      {/* Course Info */}
      <div className="space-y-2 md:space-y-3 mb-6">
        <div className="text-xs text-gray-600 dark:text-gray-400">
          <span>Courses: </span>
          <span className="text-gray-900 dark:text-white">
            {student.courses?.map((course: Course, index: number) => (
              <span key={course.id}>
                {course.type} ({course.vehicle})
                {index < student.courses!.length - 1 && ", "}
              </span>
            )) || "No courses"}
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
      </div>
    </div>
  );
};

const MyStudentsList: React.FC = () => {
  const operator = useSelector(
    (state: RootState) => state.auth.user,
  ) as Operator;
  const [searchQuery, setSearchQuery] = useState("");
  const [students, setStudents] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  // Dummy data
  // const students: User[] = Array.from({ length: 9 }, (_, i) => ({
  //   id: `st00${i + 1}`,
  //   name: `Student ${i + 1}`,
  //   image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop',
  //   email: `student${i + 1}@example.com`,
  //   phoneNumber: `123-456-78${i + 1}`,
  //   courses: [
  //     {
  //       id: `course${i + 1}`,
  //       vehicle: 'Car',
  //       type: '4 wheel driving',
  //       classesTaken: 8,
  //       classesTotal: 12,
  //       stars: 4,
  //     },
  //   ],
  //   learnersLicense: `LL${i + 1}`,
  //   drivingLicense: i % 2 === 0 ? `DL${i + 1}` : undefined,
  // }));
  const getAllStudents = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.post("/operator/get-all-students", {
        schoolId: operator?.schoolId,
      });
      if (response.data.success) {
        setStudents(response.data.students);
      }
    } catch (error) {
      toast.error("Failed to fetch students");
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getAllStudents();
  }, [getAllStudents]);

  // Filter students based on search query
  const filteredStudents = students.filter(
    (student) =>
      (student.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (student.email || "").toLowerCase().includes(searchQuery.toLowerCase()),
  );
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 px-1 py-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
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

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                Loading students...
              </p>
            </div>
          </div>
        ) : (
          <>
            {" "}
            {/* Students Grid */}
            {filteredStudents.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">
                  {students.length === 0
                    ? "No students found in your school."
                    : "No students found matching your search criteria."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredStudents.map((student) => (
                  <StudentCard
                    key={student.id}
                    student={student}
                    onClick={() =>
                      navigate(`/coordinator/student-profile/${student.id}`)
                    }
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyStudentsList;
