import React, {
  useState,
  useRef,
  ChangeEvent,
  useCallback,
  useEffect,
} from "react";
import { Star, FileText, Users, Edit, Car, ArrowLeft } from "lucide-react";
import { Operator } from "../../../interfaces/models";
import api from "../../../utils/axiosInstance";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";

const coordinatorData: Operator = {
  id: "N/A",
  name: "N/A",
  phoneNumber: "N/A",
  email: "N/A",
  image: "N/A",
  password: "N/A",
  schoolId: "N/A",
  refreshToken: "N/A",
  operatorId: "N/A",
  expertiseIn: "N/A",
  workingDays: "N/A",
  workingHours: "N/A",
  experience: 0,
  rating: 0,
  LLcount: 0,
  DLcount: 0,
  studentsCount: 0,
  createdAt: "N/A",
  updatedAt: "N/A",
};

const Profile: React.FC = () => {
  const [profileImage, setProfileImage] = useState(coordinatorData.image || "");
  const [isUploading, setIsUploading] = useState(false);
  const [coordinator, setCoordinator] = useState<Operator>(coordinatorData);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const { operatorId } = useParams<{ operatorId: string }>();
  const navigate = useNavigate();

  const getOperatorData = useCallback(async () => {
    if (!operatorId) {
      toast.error("Operator ID is missing");
      return;
    }
    setLoading(true);
    try {
      const response = await api.post(`/operator/get`, {
        id: operatorId,
      });
      if (response.data.success) {
        setCoordinator(response.data.operator);
      }
    } catch (error) {
      console.error("Error fetching operator data:", error);
    } finally {
      setLoading(false);
    }
  }, [operatorId]);

  useEffect(() => {
    getOperatorData();
  }, [getOperatorData]);

  const handleProfilePictureChange = async (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("File selected:", file.name, file.size, file.type);

      try {
        setIsUploading(true);
        const formData = new FormData();
        formData.append("profileImage", file);
        formData.append("userId", (coordinator.id || operatorId) as string);
        setProfileImage(URL.createObjectURL(file));

        console.log("Making API call to update profile image...");
        const response = await api.patch(
          "/operator/update-profile-image",
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
          setProfileImage(coordinator.image as string); // Revert to previous image on error
          return;
        }

        toast.success("Profile picture updated successfully");
        if (response.data.imageUrl) {
          setCoordinator((prev) => ({
            ...prev,
            image: response.data.imageUrl,
          }));
          setProfileImage(response.data.imageUrl);
        }
      } catch (error) {
        console.error("Error uploading profile picture:", error);
        toast.error("Failed to upload profile picture");
        setProfileImage(coordinator.image as string); // Revert on error
      } finally {
        setIsUploading(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Loading Coordinator's Profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-5xl mx-auto bg-gray-50 dark:bg-gray-950 p-4 md:p-6 font-satoshi">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">
          Coordinator's Profile
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
        <div className="lg:col-span-4 bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6">
          <div className="">
            <div className="flex justify-end">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
                Active
              </span>
            </div>

            <div className="flex flex-col items-center">
              <div className="mb-4">
                <img
                  src={coordinator.image || profileImage}
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
                  className="p-2 ml-24 bg-white dark:bg-gray-900 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <Edit className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </button>
              </div>

              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                {coordinator.name}
              </h2>

              <div className="text-sm text-gray-600 dark:text-gray-300 mb-4 text-center">
                <p>Expertise in:</p>
                <div className="flex flex-wrap gap-2 mt-1 justify-center">
                  {(
                    coordinator.expertiseIn?.split(",").map((s) => s.trim()) ??
                    []
                  ).map((skill, index) => (
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
                {coordinator.phoneNumber}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {coordinator.email}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Years of experience
              </p>
              <p className="font-medium text-gray-900 dark:text-white">
                {coordinator.experience} years
              </p>
            </div>
          </div>
        </div>

        {/* Stats and Info */}
        <div className="lg:col-span-8 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Star, label: "Rating", value: coordinator.rating },
              {
                icon: FileText,
                label: "LL Assistance",
                value: coordinator.LLcount,
              },
              { icon: Car, label: "DL Assistance", value: coordinator.DLcount },
              {
                icon: Users,
                label: "Total student Assisted",
                value: coordinator.studentsCount,
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

          {/* Work Information */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                WORK
              </h3>
              <div className="flex gap-4">
                {/* <button className="px-8 py-2 border-2 border-yellow-400 text-gray-900 dark:text-white rounded-lg hover:bg-yellow-400/10 transition-colors">
                  EDIT
                </button>
                <button className="px-8 py-2 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 transition-colors">
                  Apply for leave
                </button> */}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* <div className="space-y-6">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Office</p>
                  <p className="font-medium text-gray-900 dark:text-white">{coordinator.work.address}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">RTO Office</p>
                  <p className="font-medium text-gray-900 dark:text-white">{coordinator.work.rtoAddress}</p>
                </div>
              </div> */}

              <div className="space-y-6">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Working Days
                  </p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {coordinator.workingDays}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Working Hours
                  </p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {coordinator.workingHours}
                  </p>
                </div>
                {/* <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">On leave</p>
                  <p className="font-medium text-gray-900 dark:text-white">{coordinator.availability.onLeave}</p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
