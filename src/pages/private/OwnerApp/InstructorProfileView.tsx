import React, {
  useState,
  useRef,
  ChangeEvent,
  useCallback,
  useEffect,
} from "react";
import { Star, Clock, Users, Search, ArrowLeft } from "lucide-react";
import api from "../../../utils/axiosInstance";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";

interface Instructor {
  name: string;
  id: string;
  expertise: string[];
  mobile: string;
  email: string;
  experience: string;
  rating: number;
  totalHours: number;
  totalStudents: number;
  activeStudents: number;
  vehicle: {
    model: string;
    license: string;
    registration: string;
  };
  availability: {
    workingDays: string;
    workingHours: string;
    onLeave: string;
  };
  performance: {
    completionRate: number;
    cancelRate: number;
    rescheduleRate: number;
  };
  profileImage: string;
}

interface Course {
  userId: string;
  completed: boolean;
  classesRescheduled: number;
  classesCancelled: number;
  classesTotal: number;
  classesTaken: number;
  classDuration?: number;
  [key: string]: any;
}

interface Student {
  id: string;
  name: string;
  image: string;
  courses: string[]; // Just array of course types
}

// StudentCard Component
const StudentCard: React.FC<{
  student: Student;
  onClick: () => void;
}> = ({ student, onClick }) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow">
      {/* Student Info */}
      <div className="flex items-center gap-4 mb-4">
        <img
          src={student.image}
          alt={student.name}
          className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
        />
        <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
          {student.name}
        </h3>
      </div>

      {/* Course Info */}
      <div className="mt-2">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Courses:
        </span>
        <span className="text-gray-900 dark:text-white ml-1">
          {student.courses.join(", ")}
        </span>
      </div>
      {/* <div className="space-y-4 mb-4">
        <div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Course:{" "}
          </span>
          <span className="font-medium text-gray-900 dark:text-white">
            {student.course}
          </span>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600 dark:text-gray-400">Progress</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {student.progress.completed}/{student.progress.total} Classes
            </span>
          </div>
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded-full">
            <div
              className="h-3 bg-blue-500 dark:bg-blue-400 rounded-full transition-all duration-300"
              style={{
                width: `${(student.progress.completed / student.progress.total) * 100}%`,
              }}
            />
          </div>
        </div>
      </div> */}

      {/* Actions */}
      <button
        onClick={onClick}
        className="w-full mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors"
      >
        View Details
      </button>
    </div>
  );
};

const InstructorProfileView: React.FC = () => {
  const { teacherId } = useParams<{ teacherId: string }>();

  // Add debug logging
  console.log("teacherId from useParams:", teacherId);

  // State management
  const [instructorData, setInstructorData] = useState<Instructor | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [profileImage, setProfileImage] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper function to calculate student statistics
  const calculateStudentStats = useCallback((courses: Course[]) => {
    const studentCourseMap = new Map<string, boolean[]>();
    let classesRescheduled = 0;
    let classesCancelled = 0;
    let totalClasses = 0;
    let classesTaken = 0;

    for (const course of courses) {
      if (!course.userId) continue;

      classesRescheduled += course.classesRescheduled || 0;
      classesCancelled += course.classesCancelled || 0;
      totalClasses += course.classesTotal || 0;
      classesTaken += course.classesTaken || 0;

      if (!studentCourseMap.has(course.userId)) {
        studentCourseMap.set(course.userId, []);
      }
      studentCourseMap.get(course.userId)!.push(course.completed);
    }

    const totalUniqueStudents = studentCourseMap.size;
    let activeStudents = 0;

    for (const completions of studentCourseMap.values()) {
      if (completions.some((c) => !c)) {
        activeStudents++;
      }
    }

    return {
      totalUniqueStudents,
      activeStudents,
      classesRescheduled,
      totalClasses,
      classesCancelled,
      classesTaken,
    };
  }, []);

  const getTeacher = useCallback(async () => {
    console.log("getTeacher called with teacherId:", teacherId);

    if (!teacherId) {
      console.log("No teacherId found, setting loading to false");
      setLoading(false);
      return;
    }

    try {
      console.log("Making API call to /teachers/get");
      const response = await api.post("/teachers/get", { id: teacherId });
      // console.log("API response:", response.data);

      if (!response.data.success) {
        console.log("API returned success: false");
        toast.error("Error fetching teacher data");
        setLoading(false);
        return;
      }

      const teacher = response.data.data;
      // console.log("Teacher data:", teacher);

      if (!teacher) {
        console.log("No teacher data found");
        setLoading(false);
        return;
      }

      let rating = 0;
      const reviews = teacher.reviews || [];
      if (reviews.length > 0) {
        rating =
          reviews.reduce(
            (sum: number, review: { rating: number; length: number }) =>
              sum + (review.rating || 0),
            0,
          ) / reviews.length;
      }

      // Calculate working hours safely
      let workingHours = 0;
      const courses = teacher.courses || [];
      courses.forEach(
        (course: { classDuration: number; classesTaken: number }) => {
          workingHours +=
            (course.classDuration || 0) * (course.classesTaken || 0);
        },
      );

      // Calculate student statistics
      const {
        totalUniqueStudents,
        activeStudents,
        classesCancelled,
        classesRescheduled,
        totalClasses,
        classesTaken,
      } = calculateStudentStats(courses);

      // console.log("teacher", teacher);

      // Create instructor data object
      const newInstructorData: Instructor = {
        name: teacher.name || "Unknown",
        id: teacher.teacherId || teacher.id || "N/A",
        experience: teacher.experience || "No experience data",
        mobile: teacher.phoneNumber || "No phone number",
        email: teacher.email || "No email",
        expertise: Array.isArray(teacher.expertise) ? teacher.expertise : [],
        availability: {
          workingDays: teacher.availability[0].workingDays || "Not specified",
          workingHours: teacher.availability[0].workingHours || "Not specified",
          onLeave: teacher.onLeave || "Not on leave",
        },
        vehicle: {
          model: Array.isArray(teacher.vehicle)
            ? teacher.vehicle.join(", ")
            : teacher.vehicle || "Not specified",
          license: teacher.licenseNumber || "Not specified",
          registration: Array.isArray(teacher.registrationNumber)
            ? teacher.registrationNumber.join(", ")
            : teacher.registrationNumber || "Not specified",
        },
        profileImage: teacher.image || "",
        rating: rating,
        totalHours: workingHours,
        totalStudents: totalUniqueStudents,
        activeStudents: activeStudents,
        performance: {
          completionRate:
            totalClasses > 0
              ? Math.round((classesTaken / totalClasses) * 100)
              : 0,
          cancelRate:
            totalClasses > 0
              ? Math.round((classesCancelled / totalClasses) * 100)
              : 0,
          rescheduleRate:
            totalClasses > 0
              ? Math.round((classesRescheduled / totalClasses) * 100)
              : 0,
        },
      };

      // console.log("Setting instructor data:", newInstructorData);
      setInstructorData(newInstructorData);
      setProfileImage(newInstructorData.profileImage);
      getStudents();
    } catch (error) {
      console.error("Error fetching teacher:", error);
      toast.error("Error fetching teacher data");
    }
  }, [teacherId, calculateStudentStats]);

  // Fetch students data
  const getStudents = useCallback(async () => {
    console.log("getStudents called with teacherId:", teacherId);

    if (!teacherId) {
      console.log("No teacherId for getStudents");
      return;
    }

    try {
      console.log("Making API call to /teachers/get-students");
      const response = await api.post("/teachers/get-students", {
        id: teacherId,
      });
      // console.log("Students API response:", response.data);

      if (!response.data.success) {
        console.log("Students API returned success: false");
        toast.error("Error fetching students data");
        return;
      }

      const studentsData = response.data.data || [];
      // Group courses by student
      const studentMap = new Map<string, Student>();

      studentsData.forEach(
        (student: {
          id: string;
          name: string;
          image: string;
          courses: Array<{
            id: string;
            type: string;
            classesTaken: number;
            classesTotal: number;
            completed: boolean;
          }>;
        }) => {
          if (!studentMap.has(student.id)) {
            studentMap.set(student.id, {
              id: student.id,
              name: student.name || "Unknown Student",
              image: student.image || "",
              courses: [],
            });
          }

          const studentRecord = studentMap.get(student.id)!;

          // Add course types to the courses array (avoid duplicates)
          student.courses.forEach((course) => {
            const courseType = course.type || "Unknown Course";
            if (!studentRecord.courses.includes(courseType)) {
              studentRecord.courses.push(courseType);
            }
          });
        },
      );

      const formattedStudents = Array.from(studentMap.values());

      // console.log("Formatted students:", formattedStudents);
      setStudents(formattedStudents);
    } catch (error) {
      console.error("Error fetching students:", error);
      toast.error("Error fetching students data");
    } finally {
      console.log("Setting loading to false");
      setLoading(false);
    }
  }, [teacherId]);

  // Load data on component mount
  useEffect(() => {
    console.log("useEffect triggered, calling getTeacher");
    getTeacher();
  }, [getTeacher]);

  // Handle profile picture change
  const handleProfilePictureChange = async (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);

      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setProfileImage(previewUrl);

      // Prepare form data for upload
      const formData = new FormData();
      if (!teacherId) {
        toast.error("Teacher ID is required for profile picture upload");
        setIsUploading(false);
        return;
      }
      formData.append("profileImage", file);
      formData.append("userId", teacherId);

      // TODO: Implement actual API call for uploading profile picture
      const response = await api.post(
        "/teachers/update-profile-image",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      if (!response.data.success) {
        toast.error("Error updating profile picture");
        setIsUploading(false);
        return;
      }

      console.log("Profile picture ready for upload:", file.name);
      toast.success("Profile picture updated successfully");
    } catch (error) {
      console.error("Error handling profile picture:", error);
      toast.error("Failed to update profile picture");

      // Revert to original image on error
      if (instructorData) {
        setProfileImage(instructorData?.profileImage);
      }
    } finally {
      setIsUploading(false);
    }
  };

  // Filter students based on search query
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="min-h-screen max-w-5xl mx-auto bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Loading instructor data...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-6 font-satoshi">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">
          Instructor's Profile
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="hidden sm:inline">Back</span>
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="">
            <div className="flex justify-end">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
                Active
              </span>
            </div>

            <div className="flex flex-col items-center">
              <div className=" mb-4">
                <img
                  src={profileImage}
                  alt="Profile"
                  className={`w-32 h-32 rounded-xl object-cover ${isUploading ? "opacity-50" : ""}`}
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleProfilePictureChange}
                  accept="image/*"
                  className="hidden"
                />
                {/* <button 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="p-2 ml-24 bg-white dark:bg-gray-700 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <Edit className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </button> */}
              </div>

              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                {instructorData?.name}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                ID: {instructorData?.id}
              </p>

              <div className="text-sm text-gray-600 dark:text-gray-300 mb-4 text-center">
                <p>Expertise in:</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {instructorData?.expertise.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t dark:border-gray-700 pt-4 space-y-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Mobile number
              </p>
              <p className="font-medium text-gray-900 dark:text-white">
                {instructorData?.mobile}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {instructorData?.email}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Years of experience
              </p>
              <p className="font-medium text-gray-900 dark:text-white">
                {instructorData?.experience}
              </p>
            </div>
          </div>
        </div>

        {/* Stats and Info */}
        <div className="lg:col-span-8 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Star, label: "Rating", value: instructorData?.rating },
              {
                icon: Clock,
                label: "Total hours worked",
                value: instructorData?.totalHours,
              },
              {
                icon: Users,
                label: "Total student teached",
                value: instructorData?.totalStudents,
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-2">
                  <stat.icon className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {stat.label}
                  </p>
                </div>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* Vehicle Information */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Vehicle Information
              </h3>
              {/* <button className="flex items-center gap-2 px-4 py-2 bg-yellow-400/80 hover:bg-yellow-400 rounded-lg transition-colors text-gray-900">
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </button> */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Vehicle
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {instructorData?.vehicle.model}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  License Number
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {instructorData?.vehicle.license}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Registration
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {instructorData?.vehicle.registration}
                </p>
              </div>
            </div>
          </div>

          {/* Availability */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Availability
              </h3>
              {/* <button className="px-4 py-2 bg-yellow-400/80 hover:bg-yellow-400 rounded-lg transition-colors text-gray-900">
                Apply for leave
              </button> */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Working Days
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {instructorData?.availability.workingDays}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Working Hours
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {instructorData?.availability.workingHours}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  On leave
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {instructorData?.availability.onLeave}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Section */}
        <div className="lg:col-span-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Performance & Analytics
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Completion Rate",
                value: instructorData?.performance.completionRate,
                color: "blue",
              },
              {
                title: "Cancel Rate",
                value: instructorData?.performance.cancelRate,
                color: "red",
              },
              {
                title: "Reshedule Rate",
                value: instructorData?.performance.rescheduleRate,
                color: "blue",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-8">
                  {stat.title}
                </h3>
                <div className=" w-32 h-32 mx-auto">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#E5E7EB"
                      strokeWidth="3"
                      className="dark:stroke-gray-700"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke={stat.color === "blue" ? "#3B82F6" : "#EF4444"}
                      strokeWidth="3"
                      strokeDasharray={`${stat.value}, 100`}
                      className={`${stat.color === "blue" ? "dark:stroke-blue-500" : "dark:stroke-red-500"}`}
                    />
                    <text
                      x="18"
                      y="22"
                      className="text-xs font-bold fill-gray-900 dark:fill-white"
                      textAnchor="middle"
                    >
                      {stat.value}%
                    </text>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 my-8">
        <div>
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            Students
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your students and track their progress
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full lg:w-80">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 pr-10 py-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredStudents.map((student, index) => (
            <StudentCard
              key={`${student.id}-${index}`}
              student={student}
              onClick={() => navigate(`/school/student-profile/${student.id}`)}
            />
          ))}
        </div>
      )}

      {/* <div className="grid grid-cols-1 gap-6">
        {students.map((student, index) => (
          <StudentCard
            key={`${student.id}-${index}`}
            student={student}
            onClick={() => navigate(`/school/student-profile/${student.id}`)}
          />
        ))}
      </div> */}
    </div>
  );
};

export default InstructorProfileView;
