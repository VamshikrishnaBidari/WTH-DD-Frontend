import React, { useEffect, useState } from "react";
import {
  // FileCheck,
  FileText,
  // UserCheck,
  Clock,
  CheckCircle2,
  Circle,
  // MapPin,
  // Download,
  // AlertCircle,
  CheckCircle,
  Laptop,
  Car,
  // FastForward,
  // ChevronRight,
  // ChevronDown,
  // CheckCircle,
  // Car,
  // Award,
} from "lucide-react";
import { Link } from "react-router-dom";
import { User } from "../../../interfaces/models";
import api from "../../../utils/axiosInstance";
import { toast } from "sonner";

// interface Document {
//   type: string;
//   name: string;
//   isUtilityBill?: boolean;
//   isPending?: boolean;
// }

// interface DownloadableFile {
//   name: string;
//   type: string;
//   url: string;
//   size: string;
//   date: string;
// }

interface StatusStep {
  id: number;
  title: string;
  status: "completed" | "in_progress" | "pending";
}

interface Step {
  id: string;
  title: string;
  icon: React.ReactNode;
  completed: boolean;
  isActive?: boolean;
  showGap?: boolean;
}

const LicenseStatus: React.FC = () => {
  const [showFlagIssue, setShowFlagIssue] = useState(false);
  const [issueText, setIssueText] = useState("");
  // const dispatch = useDispatch();
  const [isLLPassed, setIsLLPassed] = useState(false);
  const [isDLPassed, setIsDLPassed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [switchState, setSwitchState] = useState(false);
  const [showLLResult, setShowLLResult] = useState(false);
  const [showDLResult, setShowDLResult] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  // console.log("user in LicenseStatus", user);

  const getCurrentUser = async () => {
    try {
      setLoading(true);
      const response = await api.get("/users/current-user");
      if (response.data.success) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error("Error fetching current user:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const handleSubmitIssue = async () => {
    if (!issueText.trim()) {
      toast.error("Please describe the issue before submitting.");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/users/issue", {
        userId: user?.id,
        schoolId: user?.schoolId,
        description: issueText,
      });

      if (response.data.success) {
        toast.success(response.data.message || "Issue submitted successfully!");
        setIssueText("");
        setShowFlagIssue(false);
      } else {
        toast.error(
          response.data.message || "Failed to submit issue. Please try again.",
        );
      }
    } catch (error) {
      console.error("Error submitting issue:", error);
      toast.error("An error occurred while submitting the issue.");
    } finally {
      setLoading(false);
    }
  };

  const steps: Step[] = user?.progress
    ? ([
        user?.progress?.documentVerification !== "excluded" && {
          id: "doc-verify",
          title: "Document Verification",
          icon: <FileText className="w-5 h-5" />,
          completed: user?.progress?.documentVerification === "done" || false,
        },
        user?.progress?.llApplication !== "excluded" && {
          id: "ll-app",
          title: "LL Application",
          icon: <FileText className="w-5 h-5" />,
          completed: user?.progress?.llApplication === "done" || false,
        },
        user?.progress?.llTestBooking !== "excluded" && {
          id: "ll-book",
          title: "LL Test Booking",
          icon: <CheckCircle className="w-5 h-5" />,
          completed: user?.progress?.llTestBooking === "done" || false,
        },
        user?.progress?.llTestDay !== "excluded" && {
          id: "ll-test",
          title: "LL Test Day",
          icon: <Laptop className="w-5 h-5" />,
          completed: user?.progress?.llTestDay === "done" || false,
          showGap: true,
        },
        user?.progress?.dlApplication !== "excluded" && {
          id: "dl-app",
          title: "DL Application",
          icon: <FileText className="w-5 h-5" />,
          completed: user?.progress?.dlApplication === "done" || false,
        },
        user?.progress?.dlTestBooking !== "excluded" && {
          id: "dl-book",
          title: "DL Test Booking",
          icon: <CheckCircle className="w-5 h-5" />,
          completed: user?.progress?.dlTestBooking === "done" || false,
        },
        user?.progress?.dlTestDay !== "excluded" && {
          id: "dl-test",
          title: "DL Test Day",
          icon: <Car className="w-5 h-5" />,
          completed: user?.progress?.dlTestDay === "done" || false,
        },
      ].filter(Boolean) as Step[])
    : [];

  // Dummy data setup
  // const [documents] = useState<Document[]>([
  //   { type: 'ID Proof', name: 'Aadhaar card' },
  //   { type: 'Age Proof', name: '10th marks card' },
  //   { type: 'Photo', name: 'Passport Photo' },
  //   {
  //     type: 'Address Proof',
  //     name: 'Utility Bill',
  //     isUtilityBill: true,
  //     isPending: true
  //   }
  // ]);

  // const [downloadableFiles] = useState<DownloadableFile[]>([
  //   {
  //     name: 'Learning License',
  //     type: 'PDF',
  //     url: '#',
  //     size: '2.5 MB',
  //     date: 'Mar 15, 2024'
  //   }
  // ]);

  // Dynamically generate statusSteps based on user.progress
  type ProgressKey = keyof NonNullable<User["progress"]>;
  const progressFields: { key: ProgressKey; title: string }[] = [
    { key: "documentVerification", title: "Document Verification" },
    { key: "llApplication", title: "LL Application" },
    { key: "llTestBooking", title: "LL Test Booking" },
    { key: "llTestDay", title: "LL Test" },
    { key: "dlApplication", title: "DL Application" },
    { key: "dlTestBooking", title: "DL Test Booking" },
    { key: "dlTestDay", title: "DL Test" },
  ];

  let foundInProgress = false;
  const statusSteps: StatusStep[] =
    user && user.progress
      ? progressFields
          .filter(
            (field) => user.progress && user.progress[field.key] !== "excluded",
          )
          .map((field, idx) => {
            const completed =
              user.progress && user.progress[field.key] === "done";
            let status: "completed" | "in_progress" | "pending" = "pending";
            if (completed) {
              status = "completed";
            } else if (!foundInProgress) {
              status = "in_progress";
              foundInProgress = true;
            }
            return {
              id: idx + 1,
              title: field.title,
              status,
            };
          })
      : [];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-6 h-6 text-green-500" />;
      case "in_progress":
        return <Clock className="w-6 h-6 text-blue-500" />;
      default:
        return <Circle className="w-6 h-6 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-500";
      case "in_progress":
        return "text-blue-500";
      default:
        return "text-gray-500";
    }
  };

  const { llAppn, dlAppn } = user || {};
  useEffect(() => {
    if (!switchState && user?.progress?.llTestDay === "done" && user?.llAppn?.testResult === "pass") {
      setIsLLPassed(true);
    }
    if (switchState && user?.progress?.dlTestDay === "done" && user?.dlAppn?.testResult === "pass") {
      setIsDLPassed(true);
    }
    if (user?.progress?.dlApplication === "done") {
      setSwitchState(true);
    }
    if (user?.llAppn?.testResult && !user?.dlAppn?.testResult && user?.progress?.llTestDay === "done") {
      setShowLLResult(true);
      setShowDLResult(false);
    }
    if (user?.dlAppn?.testResult && user?.progress?.dlTestDay === "done") {
      setShowDLResult(true);
      setShowLLResult(false);
    }
  }, [user, switchState]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Loading your progress...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 px-2 py-6 lg:p-6">
      {!loading && (!user?.progress || user.progress === null) && (
        <div className="fixed inset-0 z-30 flex items-center justify-center min-h-screen bg-white/70 dark:bg-black/70 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl p-8 max-w-md w-full text-center">
            <svg
              className="mx-auto mb-4 h-12 w-12 text-yellow-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Action Required!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Please enroll in a course and submit your required license
              services to track your license status.
            </p>
            <button
              onClick={() => window.history.back()}
              className="flex mx-auto mt-4 items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span>Back</span>
            </button>
          </div>
        </div>
      )}
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-main dark:text-blue-400 mb-2">
            License Status
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track the progress of your license application and stay updated on
            its status.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm mb-6">
          <div className="flex justify-between items-start">
            <div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">
                  Requirements :{" "}
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {user?.purpose || "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Current Status Section */}
        <div className="hidden lg:block bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              License Progress
            </h2>
            <span className="px-3 py-1 text-sm font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-full">
              On Track
            </span>
          </div>

          <div className="text-xs md:text-sm ">
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
              <div
                className="h-2 bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-500"
                style={{
                  width: `${Math.round(
                    (steps.filter((step) => step.completed).length /
                      steps.length) *
                      100,
                  )}%`,
                }}
              />
            </div>
          </div>

          <div className="flex justify-evenly gap-4 -mt-4">
            {steps.map((step) => (
              <div key={step.id} className="text-center">
                <div
                  className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${
                    step.completed
                      ? "bg-blue-600 dark:bg-blue-600 text-white"
                      : step.isActive
                        ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-400"
                  }`}
                >
                  {step.icon}
                </div>
                <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                  {step.title}
                </p>
                {/* {step.showGap && (
                    <span className="text-[10px] text-gray-400 dark:text-gray-500">
                      30 days Gap
                    </span>)
                  } */}
              </div>
            ))}
          </div>
        </div>

        <div className="block lg:hidden bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 w-full">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Current Status
          </h2>
          <div className="space-y-8">
            {statusSteps.map((step, index) => (
              <div key={step.id} className="relative">
                <div className="flex items-center gap-4">
                  {getStatusIcon(step.status)}
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {step.title}
                    </h3>
                    <p className={`text-sm ${getStatusColor(step.status)}`}>
                      {step.status === "completed"
                        ? "Completed"
                        : step.status === "in_progress"
                          ? "In Progress"
                          : "Pending"}
                    </p>
                  </div>
                </div>
                {index < statusSteps.length - 1 && (
                  <div className="absolute left-3 top-8 w-px h-12 bg-gray-200 dark:bg-gray-700" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* <div className='flex gap-3 flex-col lg:flex-row'> */}
        {/* Test Schedule Section */}

        {/* <div className='w-full lg:w-2/5 flex flex-col gap-4'> */}
        {/* Documents Submitted Section */}
        {/* <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Documents Submitted
              </h2>
              <div className="grid grid-rows-1 md:grid-rows-2 lg:grid-rows-4 gap-y-3">
                {documents.map((doc, index) => (
                  <div 
                    key={index}
                    className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {doc.type}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {doc.name}
                          </p>
                        </div>
                      </div>
                      {doc.isUtilityBill && doc.isPending && (
                        <button className="px-3 py-1 text-sm bg-yellow-400 hover:bg-yellow-500 text-blue-800 font-medium rounded-lg transition-colors">
                          Pay
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div> */}

        {/* Downloads Section */}
        {/* <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Downloads
              </h2>
              {downloadableFiles.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <AlertCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No results to download</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {downloadableFiles.map((file, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl"
                    >
                      <div className="flex items-center gap-3">
                        <FileCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {file.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {file.size} • {file.date}
                          </p>
                        </div>
                      </div>
                      <button className="flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div> */}
        {/* </div> */}

        {/* </div> */}

        <div className="w-full mx-auto space-y-6">
          {/* Learning License Manager Section */}
          {!switchState && llAppn && !llAppn.testResult && (
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm">
              <div className="border-b border-gray-200 dark:border-gray-700 p-6">
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Learning License Manager
                </h1>
              </div>

              <div className="p-6 space-y-6">
                {/* Application Form */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Your Application Number*
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      value={llAppn.applicationNumber || ""}
                      readOnly
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      value={llAppn.dateOfBirth || ""}
                      readOnly
                    />
                  </div>
                </div>

                {/* Alerts */}
                <div className="space-y-3">
                  <div className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-4 rounded-lg">
                    Our coordinator will connect to you to enquire about your
                    convenient Date and time for test.
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 p-4 rounded-lg">
                    Hey! Your LL test is coming up. Take a quick glance at our
                    test portal and try a short practice test to boost your
                    confidence!
                  </div>
                </div>

                {/* Test Details */}
                <div className="space-y-4">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                    Your booked test details
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Test Date
                      </label>
                      <input
                        type="date"
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        value={llAppn.testDate || ""}
                        readOnly
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Test Time
                      </label>
                      <input
                        type="time"
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        value={llAppn.testTime || ""}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Driving License Manager */}
          {switchState && dlAppn && !dlAppn.testResult && (
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm">
              <div className="border-b border-gray-200 dark:border-gray-700 p-6">
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Driving License Manager
                </h1>
              </div>

              <div className="p-6 space-y-6">
                {/* Application Form */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Your DL Application Number*
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      value={dlAppn.applicationNumber || ""}
                      readOnly
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      value={dlAppn.dateOfBirth || ""}
                      readOnly
                    />
                  </div>
                </div>

                {/* Alerts */}
                <div className="space-y-3">
                  <div className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-4 rounded-lg">
                    Our coordinator will reach out to confirm your Driving
                    License test schedule and provide further instructions.
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 p-4 rounded-lg">
                    Your DL test is approaching! Review our practice resources
                    and ensure you are ready for the big day.
                  </div>
                </div>

                {/* Test Details */}
                <div className="space-y-4">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                    Your booked DL test details
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Test Date
                      </label>
                      <input
                        type="date"
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        value={dlAppn.testDate || ""}
                        readOnly
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Test Time
                      </label>
                      <input
                        type="time"
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        value={dlAppn.testTime || ""}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Result Section */}
          {(showLLResult || showDLResult) && (
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm">
              <div className="border-b border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Result
                </h2>
              </div>

              <div className="p-6 text-center space-y-6">
                {isDLPassed || isLLPassed ? (
                  <>
                    <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      Congratulations!!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      You have successfully completed your{" "}
                      {switchState ? "DL" : "LL"} test.
                    </p>
                    {/* <div className="max-w-lg mx-auto">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Download Learning License
                      </label>
                      <div className="flex gap-4">
                        <div className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                          Document
                        </div>
                        <button className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg">
                          Download
                        </button>
                      </div>
                    </div>
                  </div> */}
                  </>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Hey, mate it's ok! Let's try again.
                    </h3>
                    <div className="bg-yellow-50 dark:bg-yellow-900/30 p-6 rounded-lg space-y-2">
                      <p className="text-blue-600 dark:text-blue-400 font-semibold">
                        It's okay to fall once — champions rise stronger.
                      </p>
                      {!switchState && (
                        <p className="text-blue-600 dark:text-blue-400">
                          This time, go through our test module and practice
                          questions... and go win it!
                        </p>
                      )}
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">
                      We will update you about re-test.
                    </p>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Flag Issue Section */}
          <div className="space-y-4">
            {showFlagIssue && (
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 space-y-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Raise an issue
                </h3>
                <textarea
                  value={issueText}
                  onChange={(e) => setIssueText(e.target.value)}
                  className="w-full h-32 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="Describe the issue..."
                />
                <button
                  onClick={handleSubmitIssue}
                  className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 rounded-lg"
                >
                  Submit Issue
                </button>
              </div>
            )}

            <div className="flex justify-between">
              <button
                onClick={() => setShowFlagIssue(!showFlagIssue)}
                className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg"
              >
                Flag a Mistake
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        {(!user?.courses || user.courses.length === 0) && (
          <div className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-4 rounded-lg text-sm md:text-base">
            Booking slots for courses will be available only after enrolling in
            course(s).
          </div>
        )}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/user/bookings"
            className={`flex-1 px-6 py-2 text-center rounded-lg transition-colors ${
              !user?.courses || user.courses.length === 0
                ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
            }`}
            onClick={(e) => {
              if (!user?.courses || user.courses.length === 0) {
                e.preventDefault();
              }
            }}
          >
            Book Slots
          </Link>
          <Link
            to="/user"
            className="flex-1 px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-blue-800 font-bold text-center rounded-lg transition-colors"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LicenseStatus;
