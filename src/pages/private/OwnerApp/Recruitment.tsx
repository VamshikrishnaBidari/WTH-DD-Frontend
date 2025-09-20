import React, { useState, useRef } from "react";
import { Eye, EyeOff, CircleUserRound, X } from "lucide-react";
import { useParams } from "react-router-dom";
import api from "../../../utils/axiosInstance";
import { toast } from "sonner";

interface TeamMember {
  fullName: string;
  phoneNumber: string;
  email: string;
  password: string;
  role: "Driving Instructor" | "Coordinator";
  photo: string | null;
  expertise?: "Bike" | "Car" | "Both";
  yearsOfExperience: string;
  workingHours: {
    startTime: string;
    endTime: string;
  };
  weeklyAvailability: string[];
  vehicleDetails?: {
    car?: {
      name: string;
      number?: string;
    };
    bike?: {
      name: string;
      number: string;
    };
  };
  licenseNumber?: string;
  teacherId?: string;
  gender?: string;
  expertiseIn?: string;
}

const Recruitment: React.FC = () => {
  const { schoolId } = useParams();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [member, setMember] = useState<TeamMember>({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    role: "Driving Instructor",
    photo: null,
    yearsOfExperience: "",
    workingHours: {
      startTime: "",
      endTime: "",
    },
    weeklyAvailability: [],
    licenseNumber: "",
    teacherId: "",
    gender: "male",
    expertiseIn: "",
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log("hello", file);
    if (file) {
      setPhotoFile(file);
      setMember((prev) => ({ ...prev, photo: URL.createObjectURL(file) }));
    }
  };

  const handleWeeklyAvailability = (day: string) => {
    setMember((prev) => ({
      ...prev,
      weeklyAvailability: prev.weeklyAvailability.includes(day)
        ? prev.weeklyAvailability.filter((d) => d !== day)
        : [...prev.weeklyAvailability, day],
    }));
  };

  const handleExpertiseChange = (expertise: "Bike" | "Car" | "Both") => {
    setMember((prev) => ({
      ...prev,
      expertise,
      vehicleDetails: {
        ...(expertise === "Car" || expertise === "Both"
          ? { car: { name: "", number: "" } }
          : {}),
        ...(expertise === "Bike" || expertise === "Both"
          ? { bike: { name: "", number: "" } }
          : {}),
      },
    }));
  };

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  async function handleSave(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    event.preventDefault();

    try {
      // Validate required fields
      if (
        !member.fullName ||
        !member.phoneNumber ||
        !member.email ||
        !member.password
      ) {
        alert("Please fill in all required fields.");
        return;
      }

      if (
        member.role === "Driving Instructor" &&
        (!member.expertise || !member.licenseNumber)
      ) {
        alert(
          "Please provide expertise and license number for Driving Instructor.",
        );
        return;
      }

      if (
        member.role === "Driving Instructor" &&
        member.expertise &&
        (member.expertise === "Car" || member.expertise === "Both") &&
        (!member.vehicleDetails?.car?.name ||
          !member.vehicleDetails?.car?.number)
      ) {
        alert("Please provide car details for Driving Instructor.");
        return;
      }

      if (
        member.role === "Driving Instructor" &&
        member.expertise &&
        (member.expertise === "Bike" || member.expertise === "Both") &&
        (!member.vehicleDetails?.bike?.name ||
          !member.vehicleDetails?.bike?.number)
      ) {
        alert("Please provide bike details for Driving Instructor.");
        return;
      }

      // Simulate saving the data
      console.log("Saving member data:", member);
      if (member.role === "Driving Instructor") {
        const response = await api.post("/teachers/sign-up2", {
          name: member.fullName,
          email: member.email,
          password: member.password,
          phoneNumber: member.phoneNumber,
          gender: member.gender,
          schoolId: schoolId,
          expertise: member.expertise,
          licenseNumber: member.licenseNumber,
          vehicleDetails: [
            member.vehicleDetails?.bike?.name,
            member.vehicleDetails?.car?.name,
          ],
          registrationNumber: [
            member.vehicleDetails?.bike?.number,
            member.vehicleDetails?.car?.number,
          ],
          workingHours: `${member.workingHours.startTime} - ${member.workingHours.endTime}`,
          workingDays: member.weeklyAvailability?.join(","),
          yearsOfExperience: member.yearsOfExperience,
          teacherId: member.teacherId,
        });
        // console.log("response", response);
        if (!response.data.success) {
          toast.error("failed to create a teacher");
          return;
        }
        const formdata = new FormData();
        if (photoFile) {
          formdata.append("profileImage", photoFile);
          formdata.append("userId", response.data.logedInTeacher.id);
          const res2 = await api.post(
            "/teachers/update-profile-image",
            formdata,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            },
          );
          if (!res2.data.success) {
            toast.error("failed to upload profile photo");
          }
          toast.success("Successfully created a teacher");
        }
      } else {
        const response = await api.post("/operator/signup", {
          name: member.fullName,
          email: member.email,
          password: member.password,
          phoneNumber: member.phoneNumber,
          operatorId: member.teacherId,
          schoolId: schoolId,
          expertiseIn: member.expertiseIn,
          workingDays: member.weeklyAvailability.join(","),
          workingHours: `${member.workingHours.startTime} - ${member.workingHours.endTime}`,
          experience: member.yearsOfExperience,
        });
        // console.log("response", response);
        if (!response.data.success) {
          toast.error("failed to create a operator");
          return;
        }
        const formdata = new FormData();
        if (photoFile) {
          formdata.append("profileImage", photoFile);
          formdata.append("userId", response.data.logedInUser.id);
          const res2 = await api.patch(
            "/operator/update-profile-image",
            formdata,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            },
          );
          if (!res2.data.success) {
            toast.error("failed to upload profile photo");
          }
          toast.success("Successfully created a operator");
        }
      }

      setMember({
        fullName: "",
        phoneNumber: "",
        email: "",
        password: "",
        role: "Driving Instructor",
        photo: null,
        yearsOfExperience: "",
        workingHours: {
          startTime: "",
          endTime: "",
        },
        weeklyAvailability: [],
        licenseNumber: "",
        teacherId: "",
        gender: "male",
      });
    } catch (error) {
      toast.error(`failed to create ${member.role} `);
      console.error("Error saving member data:", error);
    }
  }

  interface ConvertTo12Hour {
    (time24: string): string;
  }

  const convertTo12Hour: ConvertTo12Hour = (time24) => {
    if (!time24) return "";

    const [hours, minutes] = time24.split(":");
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;

    return `${hour12}:${minutes} ${ampm}`;
  };

  // Helper function to convert 12-hour to 24-hour format for input value
  interface ConvertTo24Hour {
    (time12: string): string;
  }

  const convertTo24Hour: ConvertTo24Hour = (time12) => {
    if (!time12) return "";

    const [time, ampm] = time12.split(" ");
    const [hours, minutes] = time.split(":");
    let hour = parseInt(hours, 10);

    if (ampm === "PM" && hour !== 12) hour += 12;
    if (ampm === "AM" && hour === 12) hour = 0;

    return `${hour.toString().padStart(2, "0")}:${minutes}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
          Register New Team Member
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Add a new instructor or coordinator to your driving school team
        </p>

        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Photo Upload */}
            <div className="md:col-span-2 flex items-center gap-4">
              <div className="mx-auto">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handlePhotoUpload}
                  accept="image/*"
                  className="hidden"
                />
                <span
                  onClick={() => fileInputRef.current?.click()}
                  className="w-32 h-32 rounded-full border-2 border-dashed border-blue-400 dark:border-blue-500 flex flex-col items-center justify-center cursor-pointer bg-gray-50 dark:bg-gray-800"
                >
                  {member.photo ? (
                    <div className=" w-full h-full">
                      <img
                        src={member.photo}
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setMember((prev) => ({ ...prev, photo: null }));
                        }}
                        className="absolute top-0 right-0 p-1 bg-blue-500 rounded-full text-white"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <CircleUserRound className="w-8 h-8 text-blue-400 dark:text-blue-500 mb-2" />
                      <span className="text-sm text-blue-400 dark:text-blue-500">
                        Upload Photo
                      </span>
                    </>
                  )}
                </span>
              </div>
            </div>

            {/* Basic Info */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={member.fullName}
                  onChange={(e) =>
                    setMember((prev) => ({ ...prev, fullName: e.target.value }))
                  }
                  className="w-full p-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none ring-0 focus:ring-0 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={member.phoneNumber}
                  onChange={(e) =>
                    setMember((prev) => ({
                      ...prev,
                      phoneNumber: e.target.value,
                    }))
                  }
                  className="w-full p-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none ring-0 focus:ring-0 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={member.email}
                  onChange={(e) =>
                    setMember((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="w-full p-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none ring-0 focus:ring-0 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Password
                </label>
                <div className="flex border dark:border-gray-600 rounded-lg dark:bg-gray-700">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={member.password}
                    onChange={(e) =>
                      setMember((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                    className="p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white w-[90%] outline-none ring-0 focus:ring-0 focus:outline-none"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className=" text-gray-500 dark:text-gray-400"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Role Selection */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Role
              </label>
              <div className="grid grid-cols-2 gap-4 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <button
                  onClick={() =>
                    setMember((prev) => ({
                      ...prev,
                      role: "Driving Instructor",
                    }))
                  }
                  className={`p-2 rounded-lg transition-colors ${
                    member.role === "Driving Instructor"
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-200"
                  }`}
                >
                  Driving Instructor
                </button>
                <button
                  onClick={() =>
                    setMember((prev) => ({ ...prev, role: "Coordinator" }))
                  }
                  className={`p-2 rounded-lg transition-colors ${
                    member.role === "Coordinator"
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-200"
                  }`}
                >
                  Coordinator
                </button>
              </div>
            </div>

            {/* Instructor Specific Fields */}
            {member.role === "Driving Instructor" && (
              <div className="md:col-span-2 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Expert In
                  </label>
                  <div className="flex gap-4">
                    {(["Bike", "Car", "Both"] as const).map((type) => (
                      <label key={type} className="flex items-center gap-2">
                        <input
                          type="radio"
                          checked={member.expertise === type}
                          onChange={() => handleExpertiseChange(type)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-gray-700 dark:text-gray-300">
                          {type}
                        </span>
                      </label>
                    ))}
                  </div>

                  <div className="mt-5">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      License Number
                    </label>
                    <input
                      value={member.licenseNumber}
                      onChange={(e) =>
                        setMember((prev) => ({
                          ...prev,
                          licenseNumber: e.target.value,
                        }))
                      }
                      className="w-full p-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div className="mt-5">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Teacher ID
                    </label>
                    <input
                      value={member.teacherId}
                      onChange={(e) =>
                        setMember((prev) => ({
                          ...prev,
                          teacherId: e.target.value,
                        }))
                      }
                      className="w-full p-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div className="mt-5">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Gender
                    </label>
                    <select
                      value={member.gender}
                      onChange={(e) =>
                        setMember((prev) => ({
                          ...prev,
                          gender: e.target.value,
                        }))
                      }
                      className="w-full p-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="male">male</option>
                      <option value="female">female</option>
                      <option value="other">other</option>
                    </select>
                  </div>
                </div>

                {/* Vehicle Details */}
                {member.expertise && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Assigned Vehicle Details
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {(member.expertise === "Car" ||
                        member.expertise === "Both") && (
                        <div className="space-y-4">
                          <h4 className="font-medium text-gray-700 dark:text-gray-300">
                            Car Details
                          </h4>
                          <div>
                            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                              Vehicle Name
                            </label>
                            <input
                              type="text"
                              placeholder="Enter car name"
                              value={member.vehicleDetails?.car?.name || ""}
                              onChange={(e) =>
                                setMember((prev) => ({
                                  ...prev,
                                  vehicleDetails: {
                                    ...prev.vehicleDetails,
                                    car: {
                                      ...prev.vehicleDetails?.car,
                                      name: e.target.value,
                                    },
                                  },
                                }))
                              }
                              className="w-full p-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                              Vehicle Number
                            </label>
                            <input
                              type="text"
                              placeholder="Enter car number"
                              value={member.vehicleDetails?.car?.number || ""}
                              onChange={(e) =>
                                setMember((prev) => ({
                                  ...prev,
                                  vehicleDetails: {
                                    ...prev.vehicleDetails,
                                    car: {
                                      ...prev.vehicleDetails?.car,
                                      number: e.target.value,
                                      name:
                                        prev.vehicleDetails?.car?.name || "", // Ensure name is defined
                                    },
                                  },
                                }))
                              }
                              className="w-full p-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                          </div>
                        </div>
                      )}

                      {(member.expertise === "Bike" ||
                        member.expertise === "Both") && (
                        <div className="space-y-4">
                          <h4 className="font-medium text-gray-700 dark:text-gray-300">
                            Bike Details
                          </h4>
                          <div>
                            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                              Vehicle Name
                            </label>
                            <input
                              type="text"
                              placeholder="Enter bike name"
                              value={member.vehicleDetails?.bike?.name || ""}
                              onChange={(e) =>
                                setMember((prev) => ({
                                  ...prev,
                                  vehicleDetails: {
                                    ...prev.vehicleDetails,
                                    bike: {
                                      ...prev.vehicleDetails?.bike,
                                      name: e.target.value,
                                      number:
                                        prev.vehicleDetails?.bike?.number || "", // Ensure number is defined
                                    },
                                  },
                                }))
                              }
                              className="w-full p-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                              Vehicle Number
                            </label>
                            <input
                              type="text"
                              placeholder="Enter bike number"
                              value={member.vehicleDetails?.bike?.number || ""}
                              onChange={(e) =>
                                setMember((prev) => ({
                                  ...prev,
                                  vehicleDetails: {
                                    ...prev.vehicleDetails,
                                    bike: {
                                      ...prev.vehicleDetails?.bike,
                                      name:
                                        prev.vehicleDetails?.bike?.name || "", // Ensure name is defined
                                      number: e.target.value,
                                    },
                                  },
                                }))
                              }
                              className="w-full p-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
            {/* Coordinator Specific Fields */}

            {member.role === "Coordinator" && (
              <div className="md:col-span-2 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Coordinator ID
                  </label>
                  <input
                    type="text"
                    value={member.teacherId}
                    onChange={(e) =>
                      setMember((prev) => ({
                        ...prev,
                        teacherId: e.target.value,
                      }))
                    }
                    className="w-full p-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Expertise
                  </label>
                  <input
                    type="text"
                    value={member.expertiseIn}
                    onChange={(e) =>
                      setMember((prev) => ({
                        ...prev,
                        expertiseIn: e.target.value,
                      }))
                    }
                    className="w-full p-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            )}

            {/* Common Fields for Both Roles */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Years of Experience
                </label>
                <input
                  value={member.yearsOfExperience}
                  type="number"
                  onChange={(e) =>
                    setMember((prev) => ({
                      ...prev,
                      yearsOfExperience: e.target.value,
                    }))
                  }
                  className="w-full p-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Working Hours
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                        Start Time
                      </label>
                      <input
                        type="time"
                        value={convertTo24Hour(member.workingHours.startTime)}
                        onChange={(e) => {
                          const time12Hour = convertTo12Hour(e.target.value);
                          setMember((prev) => ({
                            ...prev,
                            workingHours: {
                              ...prev.workingHours,
                              startTime: time12Hour,
                            },
                          }));
                        }}
                        className="w-full p-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                        End Time
                      </label>
                      <input
                        type="time"
                        value={convertTo24Hour(member.workingHours.endTime)}
                        onChange={(e) => {
                          const time12Hour = convertTo12Hour(e.target.value);
                          setMember((prev) => ({
                            ...prev,
                            workingHours: {
                              ...prev.workingHours,
                              endTime: time12Hour,
                            },
                          }));
                        }}
                        className="w-full p-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Weekly Availability
                </label>
                <div className="flex flex-wrap gap-2">
                  {weekDays.map((day) => (
                    <button
                      key={day}
                      onClick={() => handleWeeklyAvailability(day)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        member.weeklyAvailability.includes(day)
                          ? "bg-blue-500 text-white"
                          : "border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200"
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            {/* <button className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              Cancel
            </button> */}
            <button
              className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-lg transition-colors"
              onClick={handleSave}
            >
              Save & Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recruitment;
