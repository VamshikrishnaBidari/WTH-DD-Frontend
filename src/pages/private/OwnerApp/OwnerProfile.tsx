import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { logout } from "../../../features/authSlice";
import api from "../../../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { setUser } from "../../../features/authSlice";
import {
  Camera,
  Edit2,
  LogOut,
  KeyRound,
  Save,
  Building,
  Mail,
  MapPin,
  Briefcase,
  CalendarDays,
  Phone,
  UserCircle,
  Star,
  Pencil,
} from "lucide-react";

interface OwnerDetails {
  id: string; // Assuming you have an ID for the owner
  name: string;
  role: string;
  dateOfJoining: string;
  expertiseIn: string;
  mobileNumber: string;
  email: string;
  yearsOfExperience: number | string; // Allow string for input, parse to number on save
  profileImageUrl?: string;
}

interface SchoolDetails {
  name: string;
  email?: string;
  location: string;
  logoUrl?: string;
}

const OwnerProfile: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  // Personal Information State
  const [personalInfo, setPersonalInfo] = useState<OwnerDetails>({
    name: "",
    id: "",
    role: "Owner", // Typically fixed
    dateOfJoining: "",
    expertiseIn: "",
    mobileNumber: "",
    email: "",
    yearsOfExperience: "",
    profileImageUrl: "",
  });
  const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(false);
  //TODO:  check this
  // const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(
    null,
  );

  // Driving School Information State
  const [schoolInfo, setSchoolInfo] = useState<SchoolDetails>({
    name: "",
    email: "",
    location: "",
    logoUrl: "",
  });
  const [isEditingSchoolInfo, setIsEditingSchoolInfo] = useState(false);
  //TODO:  check this
  // const [schoolLogoFile, setSchoolLogoFile] = useState<File | null>(null);
  const [schoolLogoPreview, setSchoolLogoPreview] = useState<string | null>(
    null,
  );

  // Image dialog state (reusing for simplicity, could be separate)
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [currentImageType, setCurrentImageType] = useState<
    "profile" | "schoolLogo" | null
  >(null);

  const formatDateForInput = (dateString?: string) => {
    if (!dateString) return "";
    try {
      return new Date(dateString).toISOString().split("T")[0];
    } catch {
      return "";
    }
  };

  const fetchOwnerAndSchoolDetails = async () => {
    setLoading(true);
    try {
      const response = await api.get("/driving/get-school");
      if (response.data.success) {
        const data = response.data.user;
        dispatch(setUser(data));
        setPersonalInfo({
          id: data.id || "",
          name: data.name || "Michael Anderson (Dummy)", // Assuming 'name' is owner's name
          role: "Owner",
          dateOfJoining: formatDateForInput(data.dateJoined) || "2020-01-15",
          expertiseIn:
            data.expertiseIn || "License Assistance, RTO Services (Dummy)",
          mobileNumber: data.phoneNumber || "555-123-4567 (Dummy)",
          email: data.email || "m.anderson@drivingschool.com (Dummy)",
          yearsOfExperience: data.yearsOfExperience || 5,
          profileImageUrl: data.image || "", // data.image is from old Coordinator profile
        });
        setProfileImagePreview(data.image || "");

        // Assuming school details might be nested or top-level in 'data'
        // If not, these will use dummy values or be empty.
        setSchoolInfo({
          name: data.schoolName || "DriveWell School (Dummy)", // Placeholder if not in API
          email: data.schoolEmail || "contact@drivewell.com (Dummy)", // Placeholder
          location: data.location || "123 Main St, Anytown (Dummy)", // Placeholder
          logoUrl: data.schoolLogo || "", // Placeholder
        });
        setSchoolLogoPreview(data.schoolLogo || "");
      } else {
        toast.error("Failed to fetch owner details. Displaying dummy data.");
        // Set dummy data if API fails or data is incomplete
        setPersonalInfo({
          id: "dummy-id", // Dummy
          name: "Michael Anderson (Dummy)",
          role: "Owner",
          dateOfJoining: "2020-01-15",
          expertiseIn: "License Assistance, RTO Services (Dummy)",
          mobileNumber: "555-123-4567 (Dummy)",
          email: "m.anderson@drivingschool.com (Dummy)",
          yearsOfExperience: 5,
          profileImageUrl: "",
        });
        setSchoolInfo({
          name: "DriveWell School (Dummy)",
          email: "contact@drivewell.com (Dummy)",
          location: "123 Main St, Anytown (Dummy)",
          logoUrl: "",
        });
      }
    } catch {
      toast.error(
        "An error occurred while fetching details. Displaying dummy data.",
      );
      // Set dummy data on error
      setPersonalInfo({
        id: "dummy-id", // Dummy
        name: "Michael Anderson (Dummy)",
        role: "Owner",
        dateOfJoining: "2020-01-15",
        expertiseIn: "License Assistance, RTO Services (Dummy)",
        mobileNumber: "555-123-4567 (Dummy)",
        email: "m.anderson@drivingschool.com (Dummy)",
        yearsOfExperience: 5,
        profileImageUrl: "",
      });
      setSchoolInfo({
        name: "DriveWell School (Dummy)",
        email: "contact@drivewell.com (Dummy)",
        location: "123 Main St, Anytown (Dummy)",
        logoUrl: "",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOwnerAndSchoolDetails();
  }, []);

  const handlePersonalInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({
      ...prev,
      [name]:
        name === "yearsOfExperience"
          ? value === ""
            ? ""
            : parseInt(value) || 0
          : value,
    }));
  };

  const handleSchoolInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setSchoolInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      if (currentImageType === "profile") {
        try {
          // setProfileImageFile(file);
          const formData = new FormData();
          formData.append("userId", personalInfo.id);
          formData.append("profileImage", file);
          setLoading(true);
          const response = await api.post(
            "/driving/update-profile-image",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            },
          );
          if (response.data.success) {
            // Update profileImageUrl in personalInfo state
            fetchOwnerAndSchoolDetails(); // Refresh data
            toast.success("Profile image updated successfully!");
          } else {
            toast.error("Failed to update profile image.");
          }
        } catch (error) {
          console.error("Error uploading profile image:", error);
          toast.error(
            "An error occurred while uploading the profile image. Please try again later.",
          );
        } finally {
          setLoading(false);
        }
      } else if (currentImageType === "schoolLogo") {
        // setSchoolLogoFile(file);
        const formData = new FormData();
        formData.append("userId", personalInfo.id);
        formData.append("profileImage", file);
        try {
          setLoading(true);
          const response = await api.post("/driving/update-logo", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (response.data.success) {
            // Update logoUrl in schoolInfo state
            fetchOwnerAndSchoolDetails(); // Refresh data
            toast.success("School logo updated successfully!");
          } else {
            toast.error("Failed to update school logo.");
          }
        } catch (error) {
          console.error("Error uploading school logo:", error);
          toast.error(
            "An error occurred while uploading the school logo. Please try again later.",
          );
        } finally {
          setLoading(false);
        }
      }
      setShowImageDialog(false); // Close dialog after selection
    }
  };

  const openImageDialog = (type: "profile" | "schoolLogo") => {
    setCurrentImageType(type);
    setShowImageDialog(true);
  };

  const handleSavePersonalInfo = async () => {
    try {
      const response = await api.post("/driving/update", {
        id: personalInfo.id,
        data: {
          name: personalInfo.name,
          dateJoined: personalInfo.dateOfJoining,
          expertiseIn: personalInfo.expertiseIn,
          phoneNumber: personalInfo.mobileNumber,
          email: personalInfo.email,
          yearsOfExperience: personalInfo.yearsOfExperience,
        },
      });
      if (response.data.success) {
        // Handle successful save, e.g., update profileImageUrl from response
        fetchOwnerAndSchoolDetails(); // Refresh data
        toast.success("Personal information saved successfully!");
      } else {
        toast.error("Failed to save personal information.");
      }
    } catch (error) {
      console.error(
        "Error from server while saving personal information:",
        error,
      );
      toast.error(
        "An error occurred while saving personal information. Please try again later.",
      );
    }
    setIsEditingPersonalInfo(false);
  };

  const handleSaveSchoolInfo = async () => {
    try {
      const response = await api.post("/driving/update", {
        id: personalInfo.id,
        data: {
          schoolName: schoolInfo.name,
          schoolEmail: schoolInfo.email,
          location: schoolInfo.location,
        },
      });
      if (response.data.success) {
        // Handle successful save, e.g., update logoUrl from response
        fetchOwnerAndSchoolDetails(); // Refresh data
        toast.success("Driving school information saved successfully!");
      } else {
        toast.error("Failed to save driving school information.");
      }
    } catch (error) {
      console.error(
        "Error from server while saving driving school information:",
        error,
      );
      toast.error(
        "An error occurred while saving driving school information. Please try again later.",
      );
    }

    setIsEditingSchoolInfo(false);
  };

  const handleLogout = async () => {
    try {
      const response = await api.post("/driving/logout");
      if (response.data.success) {
        // Clear user data from Redux store
        dispatch(logout());
        toast.success("Logout successful");
        navigate("/school-login");
      }
    } catch (error) {
      console.error("School Logout failed:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-24 w-24 border-b-4 border-blue-600 dark:border-blue-400"></div>
          <p className="mt-6 text-lg text-gray-700 dark:text-gray-300">
            Loading Owner Profile...
          </p>
        </div>
      </div>
    );
  }

  const renderInputField = (
    label: string,
    name: string,
    value: string | number,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    isEditing: boolean,
    type: string = "text",
    Icon?: React.ElementType,
    placeholder?: string,
    isOptional?: boolean,
  ) => (
    <div className="space-y-1">
      <label
        htmlFor={name}
        className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center"
      >
        {Icon && (
          <Icon className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
        )}
        {label}{" "}
        {isOptional && (
          <span className="text-xs text-gray-400 dark:text-gray-500 ml-1">
            (optional)
          </span>
        )}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        readOnly={!isEditing}
        placeholder={placeholder || `Enter ${label.toLowerCase()}`}
        className={`w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors
                    ${
                      isEditing
                        ? "border-yellow-500 dark:border-yellow-400 focus:ring-2 focus:ring-yellow-300 dark:focus:ring-yellow-500"
                        : "border-gray-300 dark:border-gray-600 cursor-default"
                    }`}
      />
    </div>
  );

  const renderImageUpload = (
    currentImagePreview: string | null,
    altText: string,
    onEditClick: () => void,
    isSquare: boolean = false,
  ) => (
    <div
      className={`relative group ${isSquare ? "w-40 h-40 md:w-48 md:h-48" : "w-32 h-32 md:w-40 md:h-40"} rounded-lg overflow-hidden shadow-md mx-auto md:mx-0`}
    >
      <img
        src={currentImagePreview || ""}
        alt={altText}
        className="w-full h-full object-cover"
      />
      <button
        onClick={onEditClick}
        className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100 cursor-pointer"
      >
        <Pencil className="w-8 h-8 text-white" />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-700 dark:text-blue-400 mb-8 text-center sm:text-left">
          Owner Profile
        </h1>

        {/* Personal Information Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
              Personal Information
            </h2>
            <button
              onClick={() =>
                isEditingPersonalInfo
                  ? handleSavePersonalInfo()
                  : setIsEditingPersonalInfo(true)
              }
              className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center
                          ${
                            isEditingPersonalInfo
                              ? "bg-green-500 hover:bg-green-600 text-white"
                              : "bg-yellow-400 hover:bg-yellow-500 text-gray-900"
                          }`}
            >
              {isEditingPersonalInfo ? (
                <Save className="w-5 h-5 mr-2" />
              ) : (
                <Edit2 className="w-5 h-5 mr-2" />
              )}
              {isEditingPersonalInfo ? "Save" : "Edit"}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            <div className="md:col-span-1 flex justify-center md:justify-start">
              {renderImageUpload(profileImagePreview, "Owner's Profile", () =>
                openImageDialog("profile"),
              )}
            </div>
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              {renderInputField(
                "Full Name",
                "name",
                personalInfo.name,
                handlePersonalInfoChange,
                isEditingPersonalInfo,
                "text",
                UserCircle,
              )}
              {renderInputField(
                "Role",
                "role",
                personalInfo.role,
                () => {},
                false,
                "text",
                Briefcase,
              )}{" "}
              {/* Role is not editable */}
              {renderInputField(
                "Mobile Number",
                "mobileNumber",
                personalInfo.mobileNumber,
                handlePersonalInfoChange,
                isEditingPersonalInfo,
                "tel",
                Phone,
              )}
              {renderInputField(
                "Email Address",
                "email",
                personalInfo.email,
                handlePersonalInfoChange,
                isEditingPersonalInfo,
                "email",
                Mail,
              )}
              {renderInputField(
                "Date of Joining",
                "dateOfJoining",
                personalInfo.dateOfJoining,
                handlePersonalInfoChange,
                isEditingPersonalInfo,
                "date",
                CalendarDays,
              )}
              {renderInputField(
                "Years of Experience",
                "yearsOfExperience",
                String(personalInfo.yearsOfExperience),
                handlePersonalInfoChange,
                isEditingPersonalInfo,
                "number",
                Star,
              )}
              <div className="sm:col-span-2">
                {renderInputField(
                  "Expertise In",
                  "expertiseIn",
                  personalInfo.expertiseIn,
                  handlePersonalInfoChange,
                  isEditingPersonalInfo,
                  "text",
                  Briefcase,
                  "e.g., License assistance, Advanced driving",
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-start gap-4 py-4">
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center sm:justify-start"
          >
            <LogOut className="w-5 h-5 mr-2" /> Log Out
          </button>
          <button
            onClick={() => navigate("/school/account-security")}
            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 rounded-lg font-medium transition-colors flex items-center justify-center sm:justify-start"
          >
            <KeyRound className="w-5 h-5 mr-2" /> Reset Password
          </button>
        </div>

        {/* Driving School Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
              Driving School
            </h2>
            <button
              onClick={() =>
                isEditingSchoolInfo
                  ? handleSaveSchoolInfo()
                  : setIsEditingSchoolInfo(true)
              }
              className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center
                          ${
                            isEditingSchoolInfo
                              ? "bg-green-500 hover:bg-green-600 text-white"
                              : "bg-yellow-400 hover:bg-yellow-500 text-gray-900"
                          }`}
            >
              {isEditingSchoolInfo ? (
                <Save className="w-5 h-5 mr-2" />
              ) : (
                <Edit2 className="w-5 h-5 mr-2" />
              )}
              {isEditingSchoolInfo ? "Save" : "Edit"}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            <div className="md:col-span-1 flex justify-center md:justify-start">
              {renderImageUpload(
                schoolLogoPreview,
                "School Logo",
                () => openImageDialog("schoolLogo"),
                true,
              )}
            </div>
            <div className="md:col-span-2 grid grid-cols-1 gap-y-4">
              {renderInputField(
                "Name of School",
                "name",
                schoolInfo.name,
                handleSchoolInfoChange,
                isEditingSchoolInfo,
                "text",
                Building,
              )}
              {renderInputField(
                "Email Address of School",
                "email",
                schoolInfo.email || "",
                handleSchoolInfoChange,
                isEditingSchoolInfo,
                "email",
                Mail,
                "Enter school's email",
                true,
              )}
              <div className="space-y-1">
                <label
                  htmlFor="location"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center"
                >
                  <MapPin className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />{" "}
                  Location
                </label>
                <textarea
                  id="location"
                  name="location"
                  value={schoolInfo.location}
                  onChange={handleSchoolInfoChange}
                  readOnly={!isEditingSchoolInfo}
                  rows={3}
                  placeholder="Enter school's full address"
                  className={`w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors
                                ${
                                  isEditingSchoolInfo
                                    ? "border-yellow-500 dark:border-yellow-400 focus:ring-2 focus:ring-yellow-300 dark:focus:ring-yellow-500"
                                    : "border-gray-300 dark:border-gray-600 cursor-default"
                                }`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Upload Dialog */}
      {showImageDialog && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Upload{" "}
              {currentImageType === "profile"
                ? "Profile Picture"
                : "School Logo"}
            </h3>
            <div className="aspect-square rounded-lg overflow-hidden mb-6 border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center bg-gray-50 dark:bg-gray-700">
              {(currentImageType === "profile" && profileImagePreview) ||
              (currentImageType === "schoolLogo" && schoolLogoPreview) ? (
                <img
                  src={
                    currentImageType === "profile"
                      ? profileImagePreview!
                      : schoolLogoPreview!
                  }
                  alt="Preview"
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="text-center text-gray-500 dark:text-gray-400 p-4">
                  <Camera className="w-16 h-16 mx-auto mb-2 text-gray-400 dark:text-gray-500" />
                  <p>No image selected. Click below to upload.</p>
                </div>
              )}
            </div>
            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <button
                onClick={() => setShowImageDialog(false)}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <label className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-lg cursor-pointer font-medium transition-colors text-center">
                Choose Image
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageFileChange}
                />
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerProfile;
