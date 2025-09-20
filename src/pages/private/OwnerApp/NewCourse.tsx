import React, { useState } from "react";
import api from "../../../utils/axiosInstance";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";

interface SessionInfo {
  classNumber: number;
  classTitle: string;
  keyPoints: string;
  description: string;
}

interface CourseDetails {
  courseName: string;
  courseType: string;
  timePerSession: string;
  totalSessions: number;
  theorySessions: number;
  practicalSessions: number;
  courseFee: number;
  LLamount: number;
  LicenseAmount: number;
}

const NewCourse: React.FC = () => {
  const [showSessions, setShowSessions] = useState(false);
  const [courseDetails, setCourseDetails] = useState<CourseDetails>({
    courseName: "",
    courseType: "",
    timePerSession: "60",
    totalSessions: 0,
    theorySessions: 0,
    practicalSessions: 0,
    courseFee: 0,
    LLamount: 0,
    LicenseAmount: 0,
  });

  const [theorySessionsInfo, setTheorySessionsInfo] = useState<SessionInfo[]>(
    [],
  );
  const [practicalSessionsInfo, setPracticalSessionsInfo] = useState<
    SessionInfo[]
  >([]);

  const courseTypes = [
    { value: "scooty-activa", label: "Scooty/Activa (MCWOG)" },
    { value: "bike", label: "Bike (MCWG)" },
    { value: "car-personal", label: "CAR (LMV) Personal" },
    { value: "car-commercial", label: "CAR (LMV-TR) Commercial" },
  ];

  const handleSessionsChange = (
    type: "theory" | "practical",
    value: number,
  ) => {
    if (value >= 0) {
      setCourseDetails((prev) => ({
        ...prev,
        [type === "theory" ? "theorySessions" : "practicalSessions"]: value,
        totalSessions:
          type === "theory"
            ? value + prev.practicalSessions
            : prev.theorySessions + value,
      }));
    }
  };

  const handleSaveAndProceed = () => {
    setTheorySessionsInfo(
      Array(courseDetails.theorySessions).fill({
        classTitle: "",
        keyPoints: "",
        description: "",
      }),
    );
    setPracticalSessionsInfo(
      Array(courseDetails.practicalSessions).fill({
        classTitle: "",
        keyPoints: "",
        description: "",
      }),
    );
    setShowSessions(true);
  };

  const updateSessionInfo = (
    type: "theory" | "practical",
    index: number,
    field: keyof SessionInfo,
    value: string | number,
  ) => {
    if (type === "theory") {
      const newTheorySessions = [...theorySessionsInfo];
      newTheorySessions[index] = {
        ...newTheorySessions[index],
        [field]: value,
      };
      setTheorySessionsInfo(newTheorySessions);
    } else {
      const newPracticalSessions = [...practicalSessionsInfo];
      newPracticalSessions[index] = {
        ...newPracticalSessions[index],
        [field]: value,
      };
      setPracticalSessionsInfo(newPracticalSessions);
    }
  };

  interface PublishEvent extends React.MouseEvent<HTMLButtonElement> {}
  const { schoolId } = useParams();
  // interface CourseData {
  //   courseName: string;
  //   courseType: string;
  //   timePerSession: number;
  //   totalSessions: number;
  //   theorySessions: number;
  //   practicalSessions: number;
  //   courseFee: number;
  //   LLamount: number;
  //   LicenseAmount: number;
  //   theorySessionsInfo: SessionInfo[];
  //   practicalSessionsInfo: SessionInfo[];
  //   price: number;
  // }
  const navigate = useNavigate();
  const handlePublish = async (e: PublishEvent): Promise<void> => {
    e.preventDefault();

    const confirmed = window.confirm(
      "Are you sure you want to publish this course? You cant make the changes later",
    );
    if (!confirmed) {
      return;
    }
    try {
      const courseData = {
        ...courseDetails,
        price:
          courseDetails.courseFee +
          courseDetails.LLamount +
          courseDetails.LicenseAmount,
        classesAmount: courseDetails.courseFee,
        classes: courseDetails.theorySessions + courseDetails.practicalSessions,
        timePeriod: String(courseDetails.timePerSession),
        theorySessionsInfo,
        practicalSessionsInfo,
      };
      const response = await api.post("/driving/create-syllabus", {
        ...courseData,
        schoolId,
      });
      if (!response.data.success) {
        toast.error("failed to publish course");
        return;
      }
      toast.success("Course published successfully!");
      navigate("/school/course-manager");
    } catch {
      toast.error("Failed to publish course. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
          Create New Course
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Set up your driving course details and structure
        </p>

        {/* Course Basic Details */}
        <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Course Basic Details
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Course Name
              </label>
              <input
                type="text"
                value={courseDetails.courseName}
                onChange={(e) =>
                  setCourseDetails((prev) => ({
                    ...prev,
                    courseName: e.target.value,
                  }))
                }
                className="w-full p-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter course name"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Course Type
                </label>
                <select
                  value={courseDetails.courseType}
                  onChange={(e) =>
                    setCourseDetails((prev) => ({
                      ...prev,
                      courseType: e.target.value,
                    }))
                  }
                  className="w-full p-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Select type</option>
                  {courseTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Time Per Session (minutes)
                </label>
                <div className="flex items-center">
                  <input
                    type="number"
                    value={courseDetails.timePerSession ?? ""}
                    onChange={(e) => {
                      const value = e.target.value; // this is a string
                      setCourseDetails((prev) => ({
                        ...prev,
                        timePerSession: value,
                      }));
                    }}
                    placeholder="Enter minutes"
                    className="w-full p-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    min="0"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Theory Sessions
                </label>
                <input
                  type="number"
                  value={courseDetails.theorySessions ?? ""}
                  onChange={(e) => {
                    const val = e.target.value;

                    if (val === "") {
                      handleSessionsChange("theory", 0); // or you can set it to null if empty is meaningful
                    } else {
                      const parsed = parseInt(val, 10);

                      // Prevent negative input
                      if (!isNaN(parsed) && parsed >= 0) {
                        handleSessionsChange("theory", parsed);
                      }
                    }
                  }}
                  className="w-full p-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Practical Sessions
                </label>
                <input
                  type="number"
                  value={courseDetails.practicalSessions ?? ""}
                  onChange={(e) => {
                    const val = e.target.value;

                    if (val === "") {
                      handleSessionsChange("practical", 0);
                    } else {
                      const parsed = parseInt(val, 10);

                      if (!isNaN(parsed) && parsed >= 0) {
                        handleSessionsChange("practical", parsed);
                      }
                    }
                  }}
                  className="w-full p-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  min="0"
                  placeholder="Enter number of practical sessions"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Total Sessions
                </label>
                <input
                  type="number"
                  value={courseDetails.totalSessions}
                  readOnly
                  className="w-full p-2 border dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Learner's License Amount (INR)
              </label>
              <input
                type="number"
                value={courseDetails.LLamount ?? ""}
                onChange={(e) => {
                  const value = e.target.value;
                  setCourseDetails((prev) => ({
                    ...prev,
                    LLamount: value === "" ? 0 : parseInt(value, 10),
                  }));
                }}
                className="w-full p-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                min="0"
                placeholder="Enter learner's license fee"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                License Amount (INR)
              </label>
              <input
                type="number"
                value={courseDetails.LicenseAmount ?? ""}
                onChange={(e) => {
                  const value = e.target.value;
                  setCourseDetails((prev) => ({
                    ...prev,
                    LicenseAmount: value === "" ? 0 : parseInt(value, 10),
                  }));
                }}
                className="w-full p-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                min="0"
                placeholder="Enter license fee"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Classes Fee (INR)
              </label>
              <input
                type="number"
                value={courseDetails.courseFee ?? ""}
                onChange={(e) => {
                  const value = e.target.value;
                  setCourseDetails((prev) => ({
                    ...prev,
                    courseFee: value === "" ? 0 : parseInt(value, 10),
                  }));
                }}
                className="w-full p-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                min="0"
                placeholder="Enter classes fee"
              />
            </div>

            <button
              onClick={handleSaveAndProceed}
              className="w-full md:w-auto px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium rounded-lg transition-colors"
            >
              Save & proceed
            </button>
          </div>
        </div>

        {/* Sessions */}
        {showSessions && (
          <div className="space-y-8">
            {/* Theory Sessions */}
            {courseDetails.theorySessions > 0 && (
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Theory Sessions
                </h2>
                <div className="space-y-6">
                  {Array.from({ length: courseDetails.theorySessions }).map(
                    (_, index) => (
                      <div
                        key={`theory-${index}`}
                        className="border dark:border-gray-700 rounded-lg p-4"
                      >
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                          Session {index + 1}
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Class Number (including theory and practical)
                            </label>
                            <input
                              type="number"
                              value={
                                theorySessionsInfo[index]?.classNumber ?? ""
                              }
                              onChange={(e) =>
                                updateSessionInfo(
                                  "theory",
                                  index,
                                  "classNumber",
                                  Number(e.target.value),
                                )
                              }
                              className="w-full p-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                              min="1"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Class Title
                            </label>
                            <input
                              type="text"
                              value={
                                theorySessionsInfo[index]?.classTitle || ""
                              }
                              onChange={(e) =>
                                updateSessionInfo(
                                  "theory",
                                  index,
                                  "classTitle",
                                  e.target.value,
                                )
                              }
                              className="w-full p-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Key Points
                            </label>
                            <input
                              type="text"
                              value={theorySessionsInfo[index]?.keyPoints || ""}
                              onChange={(e) =>
                                updateSessionInfo(
                                  "theory",
                                  index,
                                  "keyPoints",
                                  e.target.value,
                                )
                              }
                              className="w-full p-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                              placeholder="Add key points separated by commas"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Description
                            </label>
                            <textarea
                              value={
                                theorySessionsInfo[index]?.description || ""
                              }
                              onChange={(e) =>
                                updateSessionInfo(
                                  "theory",
                                  index,
                                  "description",
                                  e.target.value,
                                )
                              }
                              className="w-full p-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                              rows={3}
                              placeholder="What must be taught in this session"
                            />
                          </div>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}

            {/* Practical Sessions */}
            {courseDetails.practicalSessions > 0 && (
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Practical Sessions
                </h2>
                <div className="space-y-6">
                  {Array.from({ length: courseDetails.practicalSessions }).map(
                    (_, index) => (
                      <div
                        key={`practical-${index}`}
                        className="border dark:border-gray-700 rounded-lg p-4"
                      >
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                          Session {index + 1}
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Class Number (including theory and practical)
                            </label>
                            <input
                              type="number"
                              value={
                                practicalSessionsInfo[index]?.classNumber ?? ""
                              }
                              onChange={(e) =>
                                updateSessionInfo(
                                  "practical",
                                  index,
                                  "classNumber",
                                  Number(e.target.value),
                                )
                              }
                              className="w-full p-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                              min="1"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Class Title
                            </label>
                            <input
                              type="text"
                              value={
                                practicalSessionsInfo[index]?.classTitle || ""
                              }
                              onChange={(e) =>
                                updateSessionInfo(
                                  "practical",
                                  index,
                                  "classTitle",
                                  e.target.value,
                                )
                              }
                              className="w-full p-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Key Points
                            </label>
                            <input
                              type="text"
                              value={
                                practicalSessionsInfo[index]?.keyPoints || ""
                              }
                              onChange={(e) =>
                                updateSessionInfo(
                                  "practical",
                                  index,
                                  "keyPoints",
                                  e.target.value,
                                )
                              }
                              className="w-full p-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                              placeholder="Add key points separated by commas"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Description
                            </label>
                            <textarea
                              value={
                                practicalSessionsInfo[index]?.description || ""
                              }
                              onChange={(e) =>
                                updateSessionInfo(
                                  "practical",
                                  index,
                                  "description",
                                  e.target.value,
                                )
                              }
                              className="w-full p-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                              rows={3}
                              placeholder="What must be taught in this session"
                            />
                          </div>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
              {/* <button className="px-6 py-2 bg-yellow-100 hover:bg-yellow-200 text-gray-900 font-medium rounded-lg transition-colors">
                Save as Draft
              </button> */}
              <button
                className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium rounded-lg transition-colors"
                onClick={handlePublish}
              >
                Publish Course
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewCourse;
