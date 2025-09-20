import React, {
  useState,
  useRef,
  ChangeEvent,
  useCallback,
  useEffect,
} from "react";
import { Star, Clock, Users, TrendingUp, Edit } from "lucide-react";
import { toast } from "sonner";
import api from "../../../utils/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../features/authSlice";
import { RootState } from "../../../app/store";
import { Teacher } from "../../../interfaces/models";

interface Instructor {
  name: string;
  id: string;
  expertise: string[]; // Keep as array
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
  tId: string;
}

const Personal: React.FC = () => {
  const [profileImage, setProfileImage] = useState(
    "https://image-resource.creatie.ai/155238777211102/155238777211104/f9c19654eb2fbc485e38d217ff8c7b33.png",
  );
  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [instructorData, setInstructorData] = useState<Instructor>({
    name: "Michael Anderson",
    id: "INS-2024-001",
    expertise: ["Car", "Bike", "Advanced skills"],
    mobile: "555 123-4567",
    email: "m.anderson@drivingschool.com",
    experience: "5 years of experience",
    rating: 4.9,
    totalHours: 1247,
    totalStudents: 42,
    activeStudents: 4.9,
    vehicle: {
      model: "Toyota Corolla 2022",
      license: "DL-12345",
      registration: "REG-789012",
    },
    availability: {
      workingDays: "Monday - Saturday",
      workingHours: "6:00 AM - 6:00 PM",
      onLeave: "Tomorrow, 6:00 AM",
    },
    performance: {
      completionRate: 75,
      cancelRate: 5,
      rescheduleRate: 10,
    },
    profileImage:
      "https://image-resource.creatie.ai/155238777211102/155238777211104/f9c19654eb2fbc485e38d217ff8c7b33.png",
    tId: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state: RootState) => state.auth.user,
  ) as Teacher;

  interface Course {
    userId: string;
    completed: boolean;
    classesRescheduled: number;
    canceledClasses: number;
    classesTotal: number;
    classesTaken: number;
    [key: string]: any;
  }
  const calculateStudentStats = (courses: Course[]) => {
    const studentCourseMap = new Map<string, boolean[]>(); // Map<userId, list of completion statuses>
    let classesRescheduled = 0;
    let classesCancelled = 0;
    let totalClasses = 0;
    let classesTaken = 0;
    for (const course of courses) {
      if (!course.userId) continue; // skip nulls
      classesRescheduled += course.classesRescheduled;
      classesCancelled += course.canceledClasses;
      totalClasses += course.classesTotal;
      classesTaken += course.classesTaken;
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
  };

  const getTeacher = useCallback(async () => {
    try {
      const response = await api.get("/teachers/current-teacher");
      // console.log(response.data);
      if (!response.data.success) {
        toast.error("Error fetching teacher data");
        setLoading(false);
        return;
      }
      const teacher = response.data.user;
      let rating = 0;

      teacher.reviews.map((review: { rating: number }) => {
        rating += review.rating;
      });
      let workingHours = 0;
      teacher.courses.map(
        (course: { classDuration: number; classesTaken: number }) => {
          workingHours += course.classDuration * course.classesTaken;
        },
      );
      const {
        totalUniqueStudents,
        activeStudents,
        classesCancelled,
        classesRescheduled,
        totalClasses,
        classesTaken,
      } = calculateStudentStats(teacher.courses);

      setInstructorData({
        name: teacher.name,
        id: teacher.teacherId,
        experience: teacher.experience,
        mobile: teacher.phoneNumber,
        email: teacher.email,
        expertise: Array.isArray(teacher.expertise)
          ? teacher.expertise
          : [teacher.expertise], // Keep as array
        availability: {
          workingDays: teacher.availability[0].workingDays,
          workingHours: teacher.availability[0].workingHours,
          onLeave: teacher.onLeave, // after calendar feature
        },
        vehicle: {
          model: Array.isArray(teacher.vehicle)
            ? teacher.vehicle.join(", ")
            : teacher.vehicle,
          license: teacher.licenseNumber,
          registration: Array.isArray(teacher.registrationNumber)
            ? teacher.registrationNumber.join(", ")
            : teacher.registrationNumber,
        },
        profileImage: teacher.image, // later
        rating:
          teacher.reviews.length > 0 ? rating / teacher.reviews.length : 0,
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
        tId: teacher.id,
      });
      setProfileImage(teacher.image);
    } catch (error) {
      console.error("Error fetching teacher data:", error);
      toast.error("Error fetching teacher data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getTeacher();
  }, [getTeacher]);

  const handleProfilePictureChange = async (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      // console.log("File selected:", file.name, file.size, file.type);

      try {
        setIsUploading(true);
        const formData = new FormData();
        formData.append("profileImage", file);
        formData.append("userId", instructorData.tId);
        setProfileImage(URL.createObjectURL(file));

        console.log("Making API call to update profile image...");
        const response = await api.post(
          "/teachers/update-profile-image",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );

        console.log("API Response:", response.data);

        if (!response.data.success) {
          toast.error("Error updating profile image");
          setProfileImage(instructorData.profileImage);
          return;
        }

        toast.success("Profile picture updated successfully");
        if (response.data.imageUrl) {
          setInstructorData((prev) => ({
            ...prev,
            profileImage: response.data.imageUrl,
          }));
          setProfileImage(response.data.imageUrl);

          // Update Redux store
          if (currentUser) {
            const updatedUser = {
              ...currentUser,
              image: response.data.imageUrl,
            };
            dispatch(setUser(updatedUser as Teacher)); // Dispatch action to update user in Redux
          }
        }
      } catch (error) {
        console.error("Error uploading profile picture:", error);
        toast.error("Failed to upload profile picture");
        setProfileImage(instructorData.profileImage); // Revert on error
      } finally {
        setIsUploading(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-6 font-satoshi flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading Details...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen max-w-5xl mx-auto bg-gray-50 dark:bg-gray-950 p-4 md:p-6 font-satoshi">
      <h1 className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-6">
        Your Profile
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-4 bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6">
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
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="p-2 ml-24 bg-white dark:bg-gray-700 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <Edit className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </button>
              </div>

              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                {instructorData.name}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                ID: {instructorData.id}
              </p>

              <div className="text-sm text-gray-600 dark:text-gray-300 mb-4 text-center">
                <p>Expertise in:</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {instructorData?.expertise?.map((skill, index) => (
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
                {instructorData.mobile}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {instructorData.email}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Years of experience
              </p>
              <p className="font-medium text-gray-900 dark:text-white">
                {instructorData.experience}
              </p>
            </div>
          </div>
        </div>

        {/* Stats and Info */}
        <div className="lg:col-span-8 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Star, label: "Rating", value: instructorData.rating },
              {
                icon: Clock,
                label: "Total hours worked",
                value: instructorData.totalHours,
              },
              {
                icon: Users,
                label: "Total student teached",
                value: instructorData.totalStudents,
              },
              {
                icon: TrendingUp,
                label: "Students currently learning",
                value: instructorData.activeStudents,
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm"
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
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6">
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
                  {instructorData.vehicle.model}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  License Number
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {instructorData.vehicle.license}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Registration
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {instructorData.vehicle.registration}
                </p>
              </div>
            </div>
          </div>

          {/* Availability */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6">
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
                  {instructorData.availability.workingDays}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Working Hours
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {instructorData.availability.workingHours}
                </p>
              </div>
              {/* <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  On leave
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {instructorData.availability.onLeave}
                </p>
              </div> */}
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
                value: instructorData.performance.completionRate,
                color: "blue",
              },
              {
                title: "Cancel Rate",
                value: instructorData.performance.cancelRate,
                color: "red",
              },
              {
                title: "Reshedule Rate",
                value: instructorData.performance.rescheduleRate,
                color: "blue",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6"
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
    </div>
  );
};

export default Personal;
