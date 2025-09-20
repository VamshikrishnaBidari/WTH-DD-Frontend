import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import { toast } from "sonner";
import api from "../../../utils/axiosInstance";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

interface Staff {
  name: string;
  role: string;
  image: string;
}

interface UserDetails {
  fullName: string;
  phone: string;
  email: string;
}

const StudentProfile: React.FC = () => {
  const { userId } = useParams();
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [profileImage, setProfileImage] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  interface Course {
    type: string;
    vehicle: string;
    classesTaken: number;
    classesTotal: number;
    amount: number;
    pendingAmount: number;
    [key: string]: any;
  }

  interface Schedule {
    day: string;
    time: string;
    isActive?: boolean;
    [key: string]: any;
  }

  interface SlotNumberMap {
    [slotNumber: string]: {
      day: string;
      time: string;
    };
  }

  const [slotNumberMap, setSlotNumberMap] = useState<SlotNumberMap>({});
  const [schedule, setSchedule] = useState<Schedule[]>([]);

  const [courses, setCourses] = useState<Course[]>([
    {
      type: "",
      vehicle: "",
      classesTaken: 0,
      classesTotal: 0,
      amount: 0,
      pendingAmount: 0,
    },
  ]);

  const [userDetails, setUserDetails] = useState<UserDetails>({
    fullName: "Sarah Johnson",
    phone: "+1 (555) 123-4567",
    email: "sarah.j@example.com",
  });

  const [fetchedUser, setFetchedUser] = useState<any>(null);
  const [staff, setStaff] = useState<Staff[]>([
    {
      name: "John Smith",
      role: "Primary Instructor",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop",
    },
    {
      name: "Emma Davis",
      role: "Course Coordinator",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
    },
  ]);

  const getUserAndDetails = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.post("/users/get-user", { id: userId });
      if (!response.data.success) {
        toast.error("Error fetching user details");
        return;
      }
      const user = response.data.user;
      const userDetails = {
        fullName: user.name,
        phone: user.phoneNumber,
        email: user.email,
      };
      setUserDetails(userDetails);
      setProfileImage(user.image || "");
      setFetchedUser(user);

      const allCourse = await api.post("/users/all-courses", { id: user.id });
      console.log("latestCourse", allCourse);
      if (!allCourse.data.success) {
        toast.error("Error fetching latest course");
        return;
      }
      const courses = allCourse.data.courses;
      if (Array.isArray(courses) && courses.length > 0) {
        const staffMap = new Map<string, Staff>();
        courses.forEach(
          (c: { teacher: { name: string; id: string; image: string } }) => {
            const teacher = c.teacher;
            // console.log("teacher", teacher);
            if (teacher && !staffMap.has(teacher.id)) {
              staffMap.set(teacher.id, {
                name: teacher.name,
                role: "Instructor",
                image: teacher.image,
              });
            }
          },
        );

        const staff: Staff[] = Array.from(staffMap.values());

        setStaff(staff);
        setCourses(courses);
      } else {
        toast.error("No course found");
      }
    } catch {
      toast.error("Error fetching user details");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    getUserAndDetails();
  }, [getUserAndDetails]);

  const slotsInitialized = useRef(false);
  const schoolId = fetchedUser?.courses[0]?.teacher?.schoolId;

  const getSlots = useCallback(async () => {
    if (!schoolId || slotsInitialized.current) return;

    try {
      slotsInitialized.current = true;
      const response = await api.post(`/drivingSlots/${schoolId}`);
      console.log("response slots", response);
      if (response.data.success) {
        const slots = response.data.slots;
        const newSlotNumberMap: SlotNumberMap = {};
        // const newDayMap: DayMap = {};

        slots.forEach(
          (slot: { slotNumber: string; day: string; time: string }) => {
            // Populate slotNumberMap
            newSlotNumberMap[slot.slotNumber] = {
              day: slot.day,
              time: slot.time,
            };

            // // Populate dayMap
            // if (!newDayMap[slot.day]) {
            //     newDayMap[slot.day] = [];
            // }
            // newDayMap[slot.day].push({
            //     slotNumber: slot.slotNumber,
            //     time: slot.time,
            // });
          },
        );

        // Update state with new objects
        setSlotNumberMap(newSlotNumberMap);
        // setDayMap(newDayMap);

        console.log("newSlotNumberMap", newSlotNumberMap);
      } else {
        slotsInitialized.current = false; // Reset on failure
        toast.error("Failed to get slots, please login");
      }
    } catch (error) {
      slotsInitialized.current = false; // Reset on error
      console.error("Error fetching slots:", error);
      toast.error("An error occurred while fetching slots data");
    }
  }, [schoolId]);

  const getCalendar = useCallback(async () => {
    // Don't run if slotNumberMap is empty
    if (Object.keys(slotNumberMap).length === 0) return;

    try {
      const response = await api.post(`/userCalendar/get-week`, {
        userId: userId,
      });
      console.log("response", response);
      if (!response.data.success) {
        toast.error("Failed to get calendar, please login");
        return;
      }

      const successfulCalendars = response.data.userCalendar;
      console.log("successfulCalendars", successfulCalendars);

      if (successfulCalendars.length > 0) {
        const newSchedule: Schedule[] = [];

        successfulCalendars.forEach((calendar: { slots: string[] }) => {
          const { slots } = calendar;
          console.log("slots", slots);
          console.log("slotNumberMap", slotNumberMap);

          slots.forEach((slot: string) => {
            const slotData = slotNumberMap[slot];
            console.log("slotData", slotData);

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

              newSchedule.push({
                ...slotData,
                isActive:
                  slotData.day === currentDay &&
                  currentTimeString >= startTime &&
                  currentTimeString <= endTime,
              });
            }
          });
        });

        // Update schedule state
        setSchedule(newSchedule);
      } else {
        toast.error("Failed to get calendar, please login");
      }

      console.log("newSchedule will be set");
    } catch (error) {
      console.error("Error fetching calendar:", error);
      toast.error("An error occurred while fetching calendar data");
    }
  }, [userId, slotNumberMap]);

  const {
    licensingProgressPercentage,
    completedLicensingStages,
    totalRelevantLicensingStages,
  } = useMemo(() => {
    let percentage = 0;
    let completedStages = 0;
    let relevantStages = 0;

    if (fetchedUser && fetchedUser.progress) {
      const progressFields: string[] = [
        "documentVerification",
        "llApplication",
        "llTestBooking",
        "llTestDay",
        "dlApplication",
        "dlTestBooking",
        "dlTestDay",
      ];

      progressFields.forEach((field) => {
        const status = fetchedUser.progress[field] as string | undefined;
        // A stage is relevant if it exists and is not 'excluded'
        if (status && status !== "excluded") {
          relevantStages++;
          // A stage is completed if its status is 'completed'
          if (status === "done") {
            completedStages++;
          }
        }
      });

      if (relevantStages > 0) {
        percentage = Math.round((completedStages / relevantStages) * 100);
      }
    }
    return {
      licensingProgressPercentage: percentage,
      completedLicensingStages: completedStages,
      totalRelevantLicensingStages: relevantStages,
    };
  }, [fetchedUser]);

  useEffect(() => {
    if (fetchedUser && schoolId) {
      getSlots();
    }
  }, [fetchedUser, schoolId, getSlots]);

  useEffect(() => {
    if (Object.keys(slotNumberMap).length > 0) {
      getCalendar();
    }
  }, [slotNumberMap, getCalendar]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    // console.log("Saving user details:", userDetails);
    const data = {
      name: userDetails.fullName,
      phoneNumber: userDetails.phone,
      email: userDetails.email,
    };
    const response = await api.post("/users/update-user", {
      id: userId,
      data: data,
    });
    if (!response.data.success) {
      toast.error("Error updating user details");
      return;
    }
    toast.success("User details updated successfully");
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-6 font-satoshi">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Section */}
        <div className="bg-white dark:bg-gray-900 rounded-xl p-4 md:p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
            <div className="space-y-6 flex-1">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Back</span>
              </button>

              <div className="flex justify-between items-center">
                <h1 className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {userDetails.fullName}'s Profile
                </h1>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={userDetails.fullName}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                    className={`w-full p-3 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 dark:text-gray-50 ${
                      isEditing ? "focus:ring-2 focus:ring-yellow-400" : ""
                    }`}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    Phone Number*
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={userDetails.phone}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                    className={`w-full p-3 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 dark:text-gray-50 ${
                      isEditing ? "focus:ring-2 focus:ring-yellow-400" : ""
                    }`}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={userDetails.email}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                    className={`w-full p-3 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 dark:text-gray-50 ${
                      isEditing ? "focus:ring-2 focus:ring-yellow-400" : ""
                    }`}
                  />
                </div>
              </div>

              <div className="flex justify-start">
                <button
                  onClick={() =>
                    isEditing ? handleSave() : setIsEditing(true)
                  }
                  className="px-6 py-2 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 transition-colors"
                >
                  {isEditing ? "Save" : "Edit"}
                </button>
              </div>
            </div>

            <div className="flex justify-center md:justify-end">
              <div
                onClick={() => setShowProfileDialog(true)}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-200 dark:bg-gray-700 cursor-pointer flex items-center justify-center overflow-hidden"
              >
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center text-xs md:text-sm text-gray-500 dark:text-gray-400 px-2">
                    Click Here
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {courses?.map((course, index) => (
          <div key={course.id || index} className="space-y-6 mb-8">
            {/* Course Enrollment */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Course Enrollment
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-400">
                    Course Name
                  </label>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {course?.type || ""}
                  </h3>
                </div>

                {/* <div className="flex gap-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20">
                            <Car className="w-4 h-4 mr-2" />
                            Four-wheeler
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20">
                            <Bike className="w-4 h-4 mr-2" />
                            Two-wheeler
                        </span>
                        </div> */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400">
                      Learning Path
                    </label>
                    <p className="text-gray-900 dark:text-white">
                      {course.vehicle}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400">
                      Licensing Path
                    </label>
                    <p className="text-gray-900 dark:text-white">
                      Full License ({course.vehicle})
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Overview */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Progress Overview
              </h2>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 dark:text-gray-400">
                      Training Progress
                    </span>
                    <span className="text-gray-900 dark:text-white">
                      {course
                        ? `${course.classesTaken}/${course.classesTotal} Sessions`
                        : "No course data available"}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                    <div
                      className="h-2 bg-blue-600 dark:bg-blue-500 rounded-full"
                      style={{
                        width: `${course.classesTaken && course.classesTotal ? (course.classesTaken / course.classesTotal) * 100 : 0}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 dark:text-gray-400">
                      Licensing Progress
                    </span>
                    <span className="text-gray-900 dark:text-white">
                      Stage {completedLicensingStages} of{" "}
                      {totalRelevantLicensingStages > 0
                        ? totalRelevantLicensingStages
                        : "N/A"}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                    <div
                      className="h-2 bg-blue-600 dark:bg-blue-500 rounded-full"
                      style={{ width: `${licensingProgressPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Chosen Staff */}
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Choosen Staff
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {staff.map((member) => (
              <div
                key={member.name}
                className="flex items-center gap-4 p-4 border dark:border-gray-700 rounded-lg"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Session Schedule */}
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Your Session every week :
          </h2>

          <div className="flex gap-4 overflow-x-auto pb-4">
            {schedule.map((session, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-44 h-25 border dark:border-gray-700 rounded-lg p-4 text-center"
              >
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  {session.day}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {session.time}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Information */}
        {/* <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Payment Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <p className="text-gray-600 dark:text-gray-400 mb-2">Total Course Fee</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{course.amount} Rs</p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-green-600 dark:text-green-400 mb-2">Amount Paid</p>
                <p className="text-2xl font-semibold text-green-600 dark:text-green-400">{course.amount - course.pendingAmount} Rs</p>
                </div>
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <p className="text-yellow-600 dark:text-yellow-400 mb-2">Amount Pending</p>
                <p className="text-2xl font-semibold text-yellow-600 dark:text-yellow-400">{course.pendingAmount} Rs</p>
                </div>
            </div>

            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <CreditCard className="w-4 h-4" />
                <span>Payment Method:</span>
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm">
                EMI (3 installments)
                </span>
            </div>
            </div> */}

        {/* Action Buttons */}
        {/* <div className="flex justify-between">
            <button className="px-8 py-2 border border-yellow-400 text-gray-900 dark:text-white rounded-lg">
                Log out
            </button>
            <button className="px-8 py-2 bg-yellow-400 text-gray-900 rounded-lg">
                Home
            </button>
            </div> */}
      </div>

      {/* Profile Image Dialog */}
      {showProfileDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl max-w-lg w-full mx-4">
            <div className="aspect-square rounded-lg overflow-hidden mb-4">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <span className="text-gray-500 dark:text-gray-400">
                    No image selected
                  </span>
                </div>
              )}
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => setShowProfileDialog(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400"
              >
                Close
              </button>
              <label className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg cursor-pointer">
                Edit
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentProfile;
