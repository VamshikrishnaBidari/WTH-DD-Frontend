import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Search,
  ArrowLeft,
  FileText,
  CheckCircle,
  Laptop,
  Car,
  Copy,
  AlertCircle,
  Clock,
  // MapPin,
  Phone,
  User as UserIcon,
  ChevronRight,
  CheckCircle2,
  // Circle,
  Edit,
  Save,
  X,
  ArrowRight,
  Home,
  // Download,
  RefreshCw,
  Globe,
} from "lucide-react";
import { toast } from "sonner";
import { Operator, User } from "../../../interfaces/models.ts";
import api from "../../../utils/axiosInstance.ts";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { RootState } from "../../../app/store.ts";

// Enhanced interfaces for better type safety
interface Step {
  id: string;
  title: string;
  icon: React.ReactNode;
  completed: boolean;
  isActive?: boolean;
  showGap?: boolean;
  onClick?: () => void;
}

interface OutletContextType {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

interface LLFormData {
  applicationNumber: string;
  dateOfBirth: string;
  testDate: string;
  testTime: string;
  testResult: "pass" | "fail" | null;
}

interface DLFormData {
  applicationNumber: string;
  llnumber: string;
  dlnumber?: string;
  dateOfBirth: string;
  testDate: string;
  testTime: string;
  testResult: "pass" | "fail" | null;
}

interface DocumentVerificationState {
  aadharCard: boolean;
  passportPhoto: boolean;
  proofOfAge: boolean;
  addressProof: string;
  qualification: string;
  lldoc: boolean;
  dlDoc: boolean;
  oldDl: boolean;
  isVerified: boolean;
}

interface SectionStatus {
  applicationFilling: boolean;
  testBooking: boolean;
  testDay: boolean;
  result: boolean;
}

interface LoadingState {
  students: boolean;
  infoHeader: boolean;
  verification: boolean;
  llSubmission: boolean;
  dlSubmission: boolean;
  details: boolean;
}

// Custom hooks for better organization
const useStudents = (schoolId: string) => {
  const [students, setStudents] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchStudents = useCallback(async () => {
    if (!schoolId) return;

    setLoading(true);
    try {
      const response = await api.post("/operator/get-licensing-students", {
        schoolId,
      });
      setStudents(response.data.filteredStudents || []);
    } catch (error) {
      console.error("Error fetching students:", error);
      toast.error("Failed to fetch students. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { students, loading, fetchStudents };
};

const useLicenseDetails = () => {
  const [loading, setLoading] = useState(false);

  const fetchLicenseDetails = useCallback(async (userId: string) => {
    if (!userId) return null;

    setLoading(true);
    try {
      const response = await api.post("/operator/get-licensing-details", {
        userId,
      });
      return response.data.success ? response.data.licenseAppnDetails : null;
    } catch (error) {
      console.error("Error fetching license details:", error);
      toast.error("Error fetching license application details.");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { fetchLicenseDetails, loading };
};

// Loading component
const LoadingSpinner = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div
      className={`animate-spin rounded-full border-2 border-blue-600 border-t-transparent ${sizeClasses[size]}`}
    />
  );
};

// Main component
const LicenseProcess02: React.FC = () => {
  const { setSidebarOpen } = useOutletContext<OutletContextType>();
  // Basic state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<User | null>(null);
  const [currentSection, setCurrentSection] = useState<
    "doc" | "ll" | "dl" | "congrats"
  >("doc");
  const [showMobileDetails, setShowMobileDetails] = useState(false);
  const [showStudentList, setShowStudentList] = useState(true);
  // Loading states
  const [loadingState, setLoadingState] = useState<LoadingState>({
    students: false,
    infoHeader: false,
    verification: false,
    llSubmission: false,
    dlSubmission: false,
    details: false,
  });

  // Document verification state
  const [docState, setDocState] = useState<DocumentVerificationState>({
    aadharCard: false,
    passportPhoto: false,
    proofOfAge: false,
    addressProof: "Electricity bill",
    qualification: "10+2",
    lldoc: false,
    dlDoc: false,
    oldDl: false,
    isVerified: false,
  });

  // Form data states
  const [llFormData, setLlFormData] = useState<LLFormData>({
    applicationNumber: "",
    dateOfBirth: "",
    testDate: "",
    testTime: "",
    testResult: null,
  });

  const [dlFormData, setDlFormData] = useState<DLFormData>({
    applicationNumber: "",
    llnumber: "",
    dlnumber: "",
    dateOfBirth: "",
    testDate: "",
    testTime: "",
    testResult: null,
  });

  // Section status states
  const [llSectionStatus, setLlSectionStatus] = useState<SectionStatus>({
    applicationFilling: false,
    testBooking: false,
    testDay: false,
    result: false,
  });

  const [dlSectionStatus, setDlSectionStatus] = useState<SectionStatus>({
    applicationFilling: false,
    testBooking: false,
    testDay: false,
    result: false,
  });

  // Edit mode states
  const [llEditMode, setLlEditMode] = useState<SectionStatus>({
    applicationFilling: false,
    testBooking: false,
    testDay: false,
    result: false,
  });

  const [dlEditMode, setDlEditMode] = useState<SectionStatus>({
    applicationFilling: false,
    testBooking: false,
    testDay: false,
    result: false,
  });

  // Redux state
  const operator = useSelector(
    (state: RootState) => state.auth.user,
  ) as Operator;

  // Custom hooks
  const {
    students,
    loading: studentsLoading,
    fetchStudents,
  } = useStudents(operator?.schoolId || "");
  const { fetchLicenseDetails } = useLicenseDetails();

  // Computed values
  const filteredStudents = useMemo(
    () =>
      students.filter((student) =>
        student.name?.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [students, searchQuery],
  );

  const refreshSelectedStudent = useCallback(async () => {
    if (!selectedStudent?.id) return;

    try {
      // Fetch the updated student data from the backend
      const response = await api.post(`/users/get-user`, {
        id: selectedStudent.id,
      });
      if (response.data.success && response.data.user) {
        setSelectedStudent(response.data.user);
      }
    } catch (error) {
      console.error("Error refreshing student data:", error);
    }
  }, [selectedStudent?.id]);

  // Progress calculation for stepper
  const steps: Step[] = useMemo(() => {
    if (!selectedStudent?.progress) return [];
    console.log("Student Progress:", selectedStudent.progress);
    const allSteps = [
      {
        id: "doc-verify",
        title: "Document Verification",
        icon: <FileText className="w-5 h-5" />,
        completed: selectedStudent.progress?.documentVerification === "done",
        excluded: selectedStudent.progress?.documentVerification === "excluded",
        onClick: () => setCurrentSection("doc"),
      },
      {
        id: "ll-app",
        title: "LL Application",
        icon: <FileText className="w-5 h-5" />,
        completed: selectedStudent.progress?.llApplication === "done",
        excluded: selectedStudent.progress?.llApplication === "excluded",
        onClick: () => setCurrentSection("ll"),
      },
      {
        id: "ll-book",
        title: "LL Test Booking",
        icon: <CheckCircle className="w-5 h-5" />,
        completed: selectedStudent.progress?.llTestBooking === "done",
        excluded: selectedStudent.progress?.llTestBooking === "excluded",
      },
      {
        id: "ll-test",
        title: "LL Test Day",
        icon: <Laptop className="w-5 h-5" />,
        completed: selectedStudent.progress?.llTestDay === "done",
        excluded: selectedStudent.progress?.llTestDay === "excluded",
        showGap: true,
      },
      {
        id: "dl-app",
        title: "DL Application",
        icon: <FileText className="w-5 h-5" />,
        completed: selectedStudent.progress?.dlApplication === "done",
        excluded: selectedStudent.progress?.dlApplication === "excluded",
        onClick: () => setCurrentSection("dl"),
      },
      {
        id: "dl-book",
        title: "DL Test Booking",
        icon: <CheckCircle className="w-5 h-5" />,
        completed: selectedStudent.progress?.dlTestBooking === "done",
        excluded: selectedStudent.progress?.dlTestBooking === "excluded",
      },
      {
        id: "dl-test",
        title: "DL Test Day",
        icon: <Car className="w-5 h-5" />,
        completed: selectedStudent.progress?.dlTestDay === "done",
        excluded: selectedStudent.progress?.dlTestDay === "excluded",
      },
    ];

    return allSteps
      .filter((step) => !step.excluded)
      .map((step, index, filteredArray) => ({
        ...step,
        isActive:
          index === filteredArray.findIndex((s) => !s.completed) &&
          filteredArray.findIndex((s) => !s.completed) !== -1,
      }));
  }, [selectedStudent?.progress, currentSection, selectedStudent?.id]);

  // Determine current section based on progress
  const determineCurrentSection = useCallback((student: User) => {
    if (!student?.progress) return "doc";

    if (student.progress.documentVerification !== "done") return "doc";
    if (
      student.progress.llApplication !== "excluded" &&
      student.progress.llTestDay !== "done"
    )
      return "ll";
    if (
      student.progress.dlApplication !== "excluded" &&
      student.progress.dlTestDay !== "done"
    )
      return "dl";

    return "congrats";
  }, []);

  // Reset all states
  const resetAllStates = useCallback(() => {
    setDocState({
      aadharCard: false,
      passportPhoto: false,
      proofOfAge: false,
      addressProof: "Electricity bill",
      qualification: "10+2",
      lldoc: false,
      dlDoc: false,
      oldDl: false,
      isVerified: false,
    });

    setLlFormData({
      applicationNumber: "",
      dateOfBirth: "",
      testDate: "",
      testTime: "",
      testResult: null,
    });

    setDlFormData({
      applicationNumber: "",
      llnumber: "",
      dlnumber: "",
      dateOfBirth: "",
      testDate: "",
      testTime: "",
      testResult: null,
    });

    setLlSectionStatus({
      applicationFilling: false,
      testBooking: false,
      testDay: false,
      result: false,
    });

    setDlSectionStatus({
      applicationFilling: false,
      testBooking: false,
      testDay: false,
      result: false,
    });

    setLlEditMode({
      applicationFilling: false,
      testBooking: false,
      testDay: false,
      result: false,
    });

    setDlEditMode({
      applicationFilling: false,
      testBooking: false,
      testDay: false,
      result: false,
    });
  }, []);

  // Utility functions
  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  }, []);

  // API handlers
  const handleVerifyDocuments = useCallback(async () => {
    if (!selectedStudent?.id) return;

    const {
      aadharCard,
      passportPhoto,
      proofOfAge,
      addressProof,
      qualification,
    } = docState;

    if (
      !aadharCard ||
      !passportPhoto ||
      !proofOfAge ||
      !addressProof ||
      !qualification
    ) {
      toast.error("Please receive & verify all the documents!");
      return;
    }

    setLoadingState((prev) => ({
      ...prev,
      verification: true,
      infoHeader: true,
    }));

    try {
      const response = await api.post("/operator/verify-doc", {
        userId: selectedStudent.id,
        docSubmission: true,
      });

      if (response.data.success) {
        setDocState((prev) => ({ ...prev, isVerified: true }));
        // Update selected student's progress immediately
        setSelectedStudent((prev) =>
          prev
            ? {
                ...prev,
                progress: {
                  ...prev.progress,
                  documentVerification: "done",
                },
              }
            : null,
        );

        await Promise.all([
          fetchStudents(), // Updates student list
          refreshSelectedStudent(), // Updates selected student with fresh data
          fetchLicenseDetails(selectedStudent.id), // Updates license details
        ]);

        // Determine next section after data refresh
        if (selectedStudent.progress?.llApplication === "excluded") {
          setCurrentSection("dl");
          if (selectedStudent.progress?.dlApplication === "excluded") {
            setCurrentSection("congrats");
          }
        } else {
          setCurrentSection("ll");
        }

        toast.success("Documents verified successfully!");
      }
    } catch (error) {
      console.error("Error verifying documents:", error);
      toast.error("Failed to verify documents. Please try again.");
    } finally {
      setLoadingState((prev) => ({
        ...prev,
        verification: false,
        infoHeader: false,
      }));
    }
  }, [selectedStudent?.id, docState, fetchStudents]);

  const handleLLApplicationSubmit = useCallback(
    async (data: Partial<LLFormData>) => {
      if (!selectedStudent?.id) return false;

      setLoadingState((prev) => ({
        ...prev,
        llSubmission: true,
        infoHeader: true,
      }));

      try {
        const response = await api.post("/operator/ll-appn", {
          userId: selectedStudent.id,
          llAppnData: data,
        });

        if (response.data.success) {
          setSelectedStudent((prev) => {
            if (!prev) return null;

            const updatedProgress = { ...prev.progress };

            // If submitting application details
            if (data.applicationNumber && data.dateOfBirth) {
              updatedProgress.llApplication = "done";
            }

            // If submitting test booking
            if (data.testDate && data.testTime) {
              updatedProgress.llTestBooking = "done";
            }

            return {
              ...prev,
              progress: updatedProgress,
            };
          });
          await Promise.all([
            fetchStudents(),
            refreshSelectedStudent(),
            fetchLicenseDetails(selectedStudent.id),
          ]);

          toast.success("LL Application updated successfully!");
          return true;
        }
        return false;
      } catch (error) {
        console.error("Error submitting LL Application:", error);
        toast.error("Error submitting LL Application. Please try again.");
        return false;
      } finally {
        setLoadingState((prev) => ({
          ...prev,
          llSubmission: false,
          infoHeader: false,
        }));
      }
    },
    [selectedStudent?.id, fetchStudents],
  );

  const handleLLResultSubmit = useCallback(async () => {
    if (!selectedStudent?.id || !llFormData.testResult) {
      toast.error("Please provide the test result!");
      return;
    }

    setLoadingState((prev) => ({
      ...prev,
      llSubmission: true,
      infoHeader: true,
    }));

    try {
      const response = await api.patch("/operator/ll-result", {
        userId: selectedStudent.id,
        llTestResult: llFormData.testResult,
        operatorId: operator?.id,
      });

      if (response.data.success) {
        // Update selected student's progress immediately
        setSelectedStudent((prev) =>
          prev
            ? {
                ...prev,
                progress: {
                  ...prev.progress,
                  llTestDay: "done",
                },
              }
            : null,
        );
        await Promise.all([
          fetchStudents(),
          refreshSelectedStudent(),
          fetchLicenseDetails(selectedStudent.id),
        ]);

        toast.success("LL Result submitted successfully!");

        // Update section after data refresh
        if (selectedStudent.progress?.dlApplication === "excluded") {
          setCurrentSection("congrats");
        } else {
          setCurrentSection("dl");
        }
      }
    } catch (error) {
      console.error("Error submitting LL result:", error);
      toast.error("Error submitting LL result. Please try again.");
    } finally {
      setLoadingState((prev) => ({
        ...prev,
        llSubmission: false,
        infoHeader: false,
      }));
    }
  }, [selectedStudent, llFormData.testResult, operator?.id, fetchStudents]);

  const handleDLApplicationSubmit = useCallback(
    async (data: Partial<DLFormData>) => {
      if (!selectedStudent?.id) return false;

      setLoadingState((prev) => ({
        ...prev,
        dlSubmission: true,
        infoHeader: true,
      }));

      try {
        const response = await api.post("/operator/dl-appn", {
          userId: selectedStudent.id,
          dlAppnData: data,
        });

        if (response.data.success) {
          // Update selected student's progress based on what was submitted
          setSelectedStudent((prev) => {
            if (!prev) return null;

            const updatedProgress = { ...prev.progress };

            // If submitting application details
            if (data.applicationNumber && data.llnumber && data.dateOfBirth) {
              updatedProgress.dlApplication = "done";
            }

            // If submitting test booking
            if (data.testDate && data.testTime) {
              updatedProgress.dlTestBooking = "done";
            }

            return {
              ...prev,
              progress: updatedProgress,
            };
          });

          await Promise.all([
            fetchStudents(),
            refreshSelectedStudent(),
            fetchLicenseDetails(selectedStudent.id),
          ]);

          toast.success("DL Application updated successfully!");
          return true;
        }
        return false;
      } catch (error) {
        console.error("Error submitting DL Application:", error);
        toast.error("Error submitting DL Application. Please try again.");
        return false;
      } finally {
        setLoadingState((prev) => ({
          ...prev,
          dlSubmission: false,
          infoHeader: false,
        }));
      }
    },
    [selectedStudent?.id, fetchStudents],
  );

  const handleDLResultSubmit = useCallback(async () => {
    if (!selectedStudent?.id || !dlFormData.testResult) {
      toast.error("Please provide the test result!");
      return;
    }

    setLoadingState((prev) => ({
      ...prev,
      dlSubmission: true,
      infoHeader: true,
    }));

    try {
      const response = await api.patch("/operator/dl-result", {
        userId: selectedStudent.id,
        dlTestResult: dlFormData.testResult,
        operatorId: operator?.id,
      });

      if (response.data.success) {
        setSelectedStudent((prev) =>
          prev
            ? {
                ...prev,
                progress: {
                  ...prev.progress,
                  dlTestDay: "done",
                },
              }
            : null,
        );

        await Promise.all([
          fetchStudents(),
          refreshSelectedStudent(),
          fetchLicenseDetails(selectedStudent.id),
        ]);

        toast.success("DL Result submitted successfully!");
        setCurrentSection("congrats");
      }
    } catch (error) {
      console.error("Error submitting DL result:", error);
      toast.error("Error submitting DL result. Please try again.");
    } finally {
      setLoadingState((prev) => ({ ...prev, dlSubmission: false }));
    }
  }, [selectedStudent, dlFormData.testResult, operator?.id, fetchStudents]);

  // Event handlers
  const handleStudentSelect = useCallback(
    async (student: User) => {
      setSelectedStudent(student);
      setShowMobileDetails(true);
      resetAllStates();

      // Set basic states based on student
      setDocState((prev) => ({
        ...prev,
        oldDl: student.studentType === "old",
        isVerified: student.progress?.documentVerification === "done",
      }));

      // Determine and set current section
      const section = determineCurrentSection(student);
      setCurrentSection(section);

      // Fetch and populate license details
      if (student.id) {
        const details = await fetchLicenseDetails(student.id);
        if (details) {
          // Populate LL form data
          if (details.llAppn) {
            setLlFormData({
              applicationNumber: details.llAppn.applicationNumber || "",
              dateOfBirth: details.llAppn.dateOfBirth || "",
              testDate: details.llAppn.testDate || "",
              testTime: details.llAppn.testTime || "",
              testResult:
                (details.llAppn.testResult as "pass" | "fail" | null) || null,
            });

            // Set LL section status based on data
            if (details.llAppn.testResult) {
              setLlSectionStatus({
                applicationFilling: true,
                testBooking: true,
                testDay: true,
                result: true,
              });
            } else if (details.llAppn.testDate && details.llAppn.testTime) {
              setLlSectionStatus({
                applicationFilling: true,
                testBooking: true,
                testDay: false,
                result: false,
              });
            } else if (details.llAppn.dateOfBirth) {
              setLlSectionStatus({
                applicationFilling: true,
                testBooking: false,
                testDay: false,
                result: false,
              });
            }
          }

          // Populate DL form data
          if (details.dlAppn) {
            setDlFormData({
              applicationNumber: details.dlAppn.applicationNumber || "",
              llnumber: details.dlAppn.llnumber || "",
              dlnumber: details.dlAppn.oldDlnumber || "",
              dateOfBirth:
                details.dlAppn.dateOfBirth || details.llAppn.dateOfBirth || "",
              testDate: details.dlAppn.testDate || "",
              testTime: details.dlAppn.testTime || "",
              testResult:
                (details.dlAppn.testResult as "pass" | "fail" | null) || null,
            });

            // Set DL section status based on data
            if (details.dlAppn.testResult) {
              setDlSectionStatus({
                applicationFilling: true,
                testBooking: true,
                testDay: true,
                result: true,
              });
            } else if (details.dlAppn.testDate && details.dlAppn.testTime) {
              setDlSectionStatus({
                applicationFilling: true,
                testBooking: true,
                testDay: false,
                result: false,
              });
            } else if (details.dlAppn.dateOfBirth) {
              setDlSectionStatus({
                applicationFilling: true,
                testBooking: false,
                testDay: false,
                result: false,
              });
            }
          }
        }
      }
    },
    [determineCurrentSection, fetchLicenseDetails, resetAllStates],
  );

  const handleBack = useCallback(() => {
    setShowMobileDetails(false);
    setSelectedStudent(null);
    resetAllStates();
  }, [resetAllStates]);

  const handleReturnToStudentList = useCallback(() => {
    setCurrentSection("doc");
    handleBack();
  }, [handleBack]);

  const handleReTest = useCallback((type: "ll" | "dl") => {
    if (type === "ll") {
      setLlFormData((prev) => ({
        ...prev,
        testDate: "",
        testTime: "",
        testResult: null,
      }));
      setLlSectionStatus({
        applicationFilling: true,
        testBooking: false,
        testDay: false,
        result: false,
      });
      setLlEditMode({
        applicationFilling: false,
        testBooking: false,
        testDay: false,
        result: false,
      });
    } else {
      setDlFormData((prev) => ({
        ...prev,
        testDate: "",
        testTime: "",
        testResult: null,
      }));
      setDlSectionStatus({
        applicationFilling: true,
        testBooking: false,
        testDay: false,
        result: false,
      });
      setDlEditMode({
        applicationFilling: false,
        testBooking: false,
        testDay: false,
        result: false,
      });
    }
    toast.info("Test booking reset. You can now schedule a new test.");
  }, []);

  // Section management helpers
  const handleSectionComplete = useCallback(
    (type: "ll" | "dl", section: keyof SectionStatus) => {
      if (type === "ll") {
        setLlSectionStatus((prev) => ({ ...prev, [section]: true }));
        setLlEditMode((prev) => ({ ...prev, [section]: false }));
      } else {
        setDlSectionStatus((prev) => ({ ...prev, [section]: true }));
        setDlEditMode((prev) => ({ ...prev, [section]: false }));
      }
    },
    [],
  );

  const handleSectionEdit = useCallback(
    (type: "ll" | "dl", section: keyof SectionStatus) => {
      if (type === "ll") {
        setLlEditMode((prev) => ({ ...prev, [section]: true }));
      } else {
        setDlEditMode((prev) => ({ ...prev, [section]: true }));
      }
    },
    [],
  );

  // Effects
  useEffect(() => {
    if (operator?.schoolId) {
      fetchStudents();
    }
  }, [operator?.schoolId, fetchStudents]);

  useEffect(() => {
    // If sidebar opens, close student list only if there's a selected student
    // If I click on a student in the list, it should close the sidebar

    // if window width is less than 1200px, hide student list when sidebar is open and student is selected
    if (window.innerWidth < 1200) {
      if (selectedStudent) {
        setShowStudentList(false);
        setSidebarOpen(false);
      } else {
        setShowStudentList(true);
        setSidebarOpen(true);
      }
    }

    if (window.innerWidth >= 1200) {
      setSidebarOpen(true);
    }
  }, [showStudentList, selectedStudent, window.innerWidth]);

  // Keyboard shortcuts
  // useEffect(() => {
  //   const handleKeyDown = (event: KeyboardEvent) => {
  //     if (!selectedStudent) return;

  //     if (event.ctrlKey || event.metaKey) {
  //       switch (event.key) {
  //         case "1":
  //           event.preventDefault();
  //           setCurrentSection("doc");
  //           break;
  //         case "2":
  //           if (steps.some(s => s.id.includes("ll"))) {
  //             event.preventDefault();
  //             setCurrentSection("ll");
  //           }
  //           break;
  //         case "3":
  //           if (steps.some(s => s.id.includes("dl"))) {
  //             event.preventDefault();
  //             setCurrentSection("dl");
  //           }
  //           break;
  //         case "Escape":
  //           event.preventDefault();
  //           handleBack();
  //           break;
  //       }
  //     }
  //   };

  //   window.addEventListener("keydown", handleKeyDown);
  //   return () => window.removeEventListener("keydown", handleKeyDown);
  // }, [selectedStudent, steps, handleBack]);

  // Main render
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="flex flex-col lg:flex-row h-screen">
        {/* Enhanced Students List Sidebar */}
        {showStudentList && (
          <div
            className={`w-full lg:w-80 lg:order-2 bg-white dark:bg-gray-900 lg:min-h-screen border-r border-gray-200 dark:border-gray-700 ${
              showMobileDetails ? "hidden lg:block" : "block"
            } ${!showStudentList && selectedStudent ? "hidden" : "block"}`}
          >
            {/* Mobile notice */}
            <div className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-4 rounded-lg text-sm md:text-base lg:hidden">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                <span>
                  For the best experience, please use a desktop or larger
                  screen.
                </span>
              </div>
            </div>

            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  My Students
                </h2>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <UserIcon className="w-4 h-4" />
                  <span>{filteredStudents.length}</span>
                </div>
              </div>

              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-10 py-2 border dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              </div>

              {/* Quick stats */}
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                {/* <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-2 py-1 rounded text-center">
                <div className="font-semibold">
                  {students.filter(s => s.progress?.dlTestDay === "done").length}
                </div>
                <div>Completed</div>
              </div> */}
                <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-center">
                  <div className="font-semibold">
                    {
                      students.filter(
                        (s) =>
                          s.progress &&
                          s.progress.documentVerification === "done" &&
                          s.progress.dlTestDay !== "done",
                      ).length
                    }
                  </div>
                  <div>In Progress</div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-center">
                  <div className="font-semibold">
                    {
                      students.filter(
                        (s) =>
                          !s.progress ||
                          s.progress.documentVerification !== "done",
                      ).length
                    }
                  </div>
                  <div>Pending</div>
                </div>
              </div>
            </div>

            {/* Students List */}
            <div className="overflow-y-auto h-[calc(100vh-200px)]">
              {studentsLoading ? (
                <div className="flex items-center justify-center p-8">
                  <LoadingSpinner size="md" />
                </div>
              ) : filteredStudents.length === 0 ? (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                  {searchQuery
                    ? "No students found matching your search."
                    : "No students available."}
                </div>
              ) : (
                filteredStudents.map((student) => {
                  // Calculate progress percentage
                  const progressSteps = [
                    student.progress?.documentVerification === "done",
                    student.progress?.llApplication === "done",
                    student.progress?.llTestBooking === "done",
                    student.progress?.llTestDay === "done",
                    student.progress?.dlApplication === "done",
                    student.progress?.dlTestBooking === "done",
                    student.progress?.dlTestDay === "done",
                  ].filter(Boolean);
                  const totalRelevantSteps = [
                    student.progress?.documentVerification !== "excluded",
                    student.progress?.llApplication !== "excluded",
                    student.progress?.llTestBooking !== "excluded",
                    student.progress?.llTestDay !== "excluded",
                    student.progress?.dlApplication !== "excluded",
                    student.progress?.dlTestBooking !== "excluded",
                    student.progress?.dlTestDay !== "excluded",
                  ].filter(Boolean).length;
                  const progressPercentage =
                    totalRelevantSteps > 0
                      ? Math.round(
                          (progressSteps.length / totalRelevantSteps) * 100,
                        )
                      : 0;

                  return (
                    <div
                      key={student.id}
                      onClick={() => handleStudentSelect(student)}
                      className={`p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all ${
                        selectedStudent?.id === student.id
                          ? "bg-blue-50 dark:bg-blue-900/20 border-r-4 border-r-blue-500"
                          : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          <img
                            src={
                              student.image ||
                              `https://api.dicebear.com/7.x/avataaars/svg?seed=${student.name}`
                            }
                            alt={student.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-sm"
                          />
                          {/* Status indicator */}
                          <div
                            className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-gray-700 ${
                              progressPercentage === 100
                                ? "bg-green-500"
                                : progressPercentage > 0
                                  ? "bg-blue-500"
                                  : "bg-gray-400"
                            }`}
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-gray-900 dark:text-white truncate">
                              {student.name}
                            </h3>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                          </div>

                          <div className="flex items-center gap-1 mt-1">
                            <Phone className="w-3 h-3 text-gray-400" />
                            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                              {student.phoneNumber}
                            </p>
                          </div>

                          <div className="mt-2">
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span className="text-gray-500 dark:text-gray-400">
                                Progress
                              </span>
                              <span className="text-gray-600 dark:text-gray-300 font-medium">
                                {progressPercentage}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                              <div
                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                  progressPercentage === 100
                                    ? "bg-green-500"
                                    : progressPercentage > 0
                                      ? "bg-blue-500"
                                      : "bg-gray-400"
                                }`}
                                style={{ width: `${progressPercentage}%` }}
                              />
                            </div>
                          </div>

                          {student.purpose && (
                            <div className="mt-2">
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                                {student.purpose}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div
          className={`flex-1 lg:order-1 overflow-y-auto ${
            !showMobileDetails ? "hidden lg:block" : "block"
          } ${showStudentList ? "lg:mr-0" : "lg:mr-0"}`}
        >
          {/* Mobile Back Button */}
          {showMobileDetails && (
            <div className="lg:hidden flex items-center gap-2 p-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Students</span>
              </button>
            </div>
          )}

          {selectedStudent ? (
            selectedStudent.progress ? (
              <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
                {/* Enhanced Student Header */}
                <div className="bg-white dark:bg-gray-950 max-w-5xl mx-auto border-b border-gray-200 dark:border-gray-700">
                  <div className="p-4">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={
                            selectedStudent.image ||
                            `https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedStudent.name}`
                          }
                          alt={selectedStudent.name}
                          className="w-16 h-16 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
                        />
                        <div>
                          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                            {selectedStudent.name}
                          </h1>
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              <span>{selectedStudent.phoneNumber}</span>
                            </div>
                            {selectedStudent.purpose && (
                              <div className="flex items-center gap-1">
                                <FileText className="w-4 h-4" />
                                <span>{selectedStudent.purpose}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 text-sm font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-full">
                          On Track
                        </span>
                        <button
                          onClick={handleReturnToStudentList}
                          className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                          <Home className="w-4 h-4" />
                          <span className="hidden sm:inline">Student List</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Progress Stepper */}
                  <div className="px-6 pb-4">
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 max-w-4xl mx-auto">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          License Progress
                        </h3>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {steps.filter((s) => s.completed).length} of{" "}
                          {steps.length} completed
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="mb-6">
                        <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-4">
                          <span>Progress</span>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {Math.round(
                              (steps.filter((s) => s.completed).length /
                                steps.length) *
                                100,
                            )}
                            %
                          </span>
                        </div>
                        {/* Progress Steps with connecting line */}
                        <div className="relative">
                          {/* Progress line background */}
                          <div
                            className="absolute top-3.5 left-4 right-4 h-1.5 bg-gray-200 dark:bg-gray-700"
                            style={{
                              left: "2.5rem", // Center of first step (half of w-20)
                              right: "2.5rem", // Center of last step (half of w-20)
                            }}
                          ></div>

                          {/* Active progress line */}
                          <div
                            className={`absolute top-3.5 left-4 right-4 h-1.5 bg-gradient-to-r ${
                              steps.filter((s) => s.completed).length ===
                              steps.length
                                ? "to-green-500"
                                : "to-blue-500"
                            } from-green-500 transition-all duration-700 ease-out`}
                            style={{
                              left: "2.5rem", // Start from center of first step
                              width: (() => {
                                if (steps.length <= 1) return "0px";

                                const completedCount = steps.filter(
                                  (s) => s.completed,
                                ).length;
                                const activeStepIndex = steps.findIndex(
                                  (s) => s.isActive,
                                );

                                // Determine target step
                                let targetStep = 0;
                                if (activeStepIndex >= 0) {
                                  targetStep = activeStepIndex;
                                } else if (completedCount > 0) {
                                  targetStep = completedCount - 1;
                                }

                                if (targetStep === 0) return "0px";

                                // Calculate width as percentage of available space between step centers
                                const availableWidth = `calc(100% - 5rem)`; // Total width minus both end margins
                                const progressRatio =
                                  targetStep / (steps.length - 1);

                                return `calc(${availableWidth} * ${progressRatio})`;
                              })(),
                            }}
                          ></div>

                          {/* Steps flex */}
                          <div className="sm:flex justify-between items-start flex-wrap hidden">
                            {steps.map((step) => (
                              <div
                                key={step.id}
                                className="flex flex-col items-center text-center w-20"
                              >
                                {/* Step icon */}
                                <button
                                  onClick={step.onClick}
                                  disabled={!step.onClick}
                                  className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 z-10 ${
                                    step.completed
                                      ? "bg-green-500 text-white shadow-lg scale-110"
                                      : step.isActive
                                        ? "bg-blue-500 text-white shadow-lg scale-110"
                                        : "bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400"
                                  } ${
                                    step.onClick
                                      ? "cursor-pointer hover:scale-125"
                                      : "cursor-not-allowed"
                                  }`}
                                >
                                  {step.completed ? (
                                    <CheckCircle2 className="w-4 h-4" />
                                  ) : step.isActive ? (
                                    <div className="w-2 h-2 bg-white rounded-full" />
                                  ) : (
                                    step.icon
                                  )}

                                  {/* Active step pulse effect */}
                                  {step.isActive && (
                                    <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-25"></div>
                                  )}
                                </button>

                                {/* Step title */}
                                <div className="mt-2 px-1">
                                  <p
                                    className={`text-xs leading-tight ${
                                      step.completed
                                        ? "text-green-600 dark:text-green-400"
                                        : step.isActive
                                          ? "text-blue-600 dark:text-blue-400"
                                          : "text-gray-500 dark:text-gray-400"
                                    }`}
                                  >
                                    {step.title}
                                  </p>

                                  {/* Status indicator */}
                                  {step.completed && (
                                    <p className="text-xs text-green-500 dark:text-green-400 mt-1">
                                      ✓
                                    </p>
                                  )}
                                  {step.isActive && (
                                    <p className="text-xs text-blue-500 dark:text-blue-400 mt-1">
                                      • In Progress
                                    </p>
                                  )}
                                </div>

                                {/* Gap indicator for LL to DL transition */}
                                {step.showGap && (
                                  <div className="mt-1">
                                    <span className="text-xs text-orange-500 dark:text-orange-400 font-medium">
                                      30 days gap
                                    </span>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Mobile optimized version for smaller screens */}
                        <div className="block sm:hidden mt-16">
                          <div className="space-y-3">
                            {steps.map((step, index) => (
                              <button
                                key={step.id}
                                onClick={step.onClick}
                                disabled={!step.onClick}
                                className={`w-full flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-all ${
                                  step.completed
                                    ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200"
                                    : step.isActive
                                      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200"
                                      : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 cursor-not-allowed"
                                } ${step.onClick ? "cursor-pointer" : ""}`}
                              >
                                <div
                                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                    step.completed
                                      ? "bg-green-500 text-white"
                                      : step.isActive
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-300 dark:bg-gray-600"
                                  }`}
                                >
                                  {step.completed ? (
                                    <CheckCircle2 className="w-4 h-4" />
                                  ) : (
                                    <span className="text-xs font-bold">
                                      {index + 1}
                                    </span>
                                  )}
                                </div>

                                <div className="flex-1 text-left">
                                  <span className="block">{step.title}</span>
                                  {step.completed && (
                                    <span className="text-xs opacity-75">
                                      Complete
                                    </span>
                                  )}
                                  {step.isActive && (
                                    <span className="text-xs opacity-75">
                                      In Progress
                                    </span>
                                  )}
                                </div>

                                {step.onClick && (
                                  <ChevronRight className="w-4 h-4" />
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Interactive steps */}
                      {/* <div className="flex flex-wrap gap-2">
                        {steps.map((step, index) => (
                          <button
                            key={step.id}
                            onClick={step.onClick}
                            disabled={!step.onClick}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                              step.completed
                                ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-900/50"
                                : step.isActive
                                ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-900/50"
                                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 cursor-not-allowed"
                            } ${step.onClick ? "cursor-pointer" : ""}`}
                          >
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                              step.completed ? "bg-green-500 text-white" :
                              step.isActive ? "bg-blue-500 text-white" :
                              "bg-gray-300 dark:bg-gray-600"
                            }`}>
                              {step.completed ? (
                                <CheckCircle2 className="w-3 h-3" />
                              ) : (
                                <span className="text-xs font-bold">{index + 1}</span>
                              )}
                            </div>
                            <span className="hidden sm:inline">{step.title}</span>
                          </button>
                        ))}
                      </div> */}

                      {/* Keyboard shortcuts hint */}
                      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                        <div className="flex items-center gap-2 text-blue-800 dark:text-blue-200 text-sm">
                          {/* <kbd className="px-2 py-1 bg-white dark:bg-gray-800 rounded border text-xs">Ctrl</kbd>
                          <span>+ 1/2/3 to navigate sections</span>
                          <span className="mx-2">•</span>
                          <kbd className="px-2 py-1 bg-white dark:bg-gray-800 rounded border text-xs">Esc</kbd>
                          <span>to go back</span> */}
                          Click on a section to proceed or edit details.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section Content */}
                <div className="p-6">
                  {/* Document Verification Section */}
                  {currentSection === "doc" && (
                    <div className="max-w-4xl mx-auto">
                      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm">
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                          <div className="flex items-center justify-between">
                            <div>
                              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Document Verification
                              </h2>
                              <p className="text-gray-600 dark:text-gray-400 mt-1">
                                Verify all required documents before proceeding
                              </p>
                            </div>
                            {docState.isVerified && (
                              <div className="flex items-center gap-2 px-3 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-lg">
                                <CheckCircle2 className="w-5 h-5" />
                                <span className="font-medium">Verified</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="p-6">
                          <div className="grid gap-6">
                            {/* Required Documents */}
                            <div className="space-y-4">
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Required Documents
                              </h3>

                              <div className="grid sm:grid-cols-2 gap-4">
                                {/* Aadhar Card */}
                                <label className="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors">
                                  <input
                                    type="checkbox"
                                    className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:bg-gray-700"
                                    checked={docState.aadharCard}
                                    onChange={(e) =>
                                      setDocState((prev) => ({
                                        ...prev,
                                        aadharCard: e.target.checked,
                                      }))
                                    }
                                    disabled={docState.isVerified}
                                  />
                                  <div className="ml-3">
                                    <span className="text-gray-900 dark:text-white font-medium">
                                      Aadhar Card
                                    </span>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                      Government issued ID proof
                                    </p>
                                  </div>
                                </label>

                                {/* Passport Photo */}
                                <label className="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors">
                                  <input
                                    type="checkbox"
                                    className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:bg-gray-700"
                                    checked={docState.passportPhoto}
                                    onChange={(e) =>
                                      setDocState((prev) => ({
                                        ...prev,
                                        passportPhoto: e.target.checked,
                                      }))
                                    }
                                    disabled={docState.isVerified}
                                  />
                                  <div className="ml-3">
                                    <span className="text-gray-900 dark:text-white font-medium">
                                      Passport-size Photo & Signature
                                    </span>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                      Recent photographs and signature
                                    </p>
                                  </div>
                                </label>

                                {/* Proof of Age */}
                                <label className="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors">
                                  <input
                                    type="checkbox"
                                    className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:bg-gray-700"
                                    checked={docState.proofOfAge}
                                    onChange={(e) =>
                                      setDocState((prev) => ({
                                        ...prev,
                                        proofOfAge: e.target.checked,
                                      }))
                                    }
                                    disabled={docState.isVerified}
                                  />
                                  <div className="ml-3">
                                    <span className="text-gray-900 dark:text-white font-medium">
                                      Proof of Age & Birth Place
                                    </span>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                      Birth certificate / 10th marks card
                                    </p>
                                  </div>
                                </label>

                                {/* Learning License (conditional) */}
                                {selectedStudent.progress?.llApplication !==
                                  "excluded" && (
                                  <label className="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors">
                                    <input
                                      type="checkbox"
                                      className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:bg-gray-700"
                                      checked={docState.lldoc}
                                      onChange={(e) =>
                                        setDocState((prev) => ({
                                          ...prev,
                                          lldoc: e.target.checked,
                                        }))
                                      }
                                      disabled={docState.isVerified}
                                    />
                                    <div className="ml-3">
                                      <span className="text-gray-900 dark:text-white font-medium">
                                        Learning License
                                      </span>
                                      <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Valid learning license document
                                      </p>
                                    </div>
                                  </label>
                                )}

                                {/* Old DL (conditional) */}
                                {docState.oldDl && (
                                  <label className="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors">
                                    <input
                                      type="checkbox"
                                      className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:bg-gray-700"
                                      checked={docState.dlDoc}
                                      onChange={(e) =>
                                        setDocState((prev) => ({
                                          ...prev,
                                          dlDoc: e.target.checked,
                                        }))
                                      }
                                      disabled={docState.isVerified}
                                    />
                                    <div className="ml-3">
                                      <span className="text-gray-900 dark:text-white font-medium">
                                        Existing Driving License
                                      </span>
                                      <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Previous driving license
                                      </p>
                                    </div>
                                  </label>
                                )}
                              </div>
                            </div>

                            {/* Additional Information */}
                            <div className="grid sm:grid-cols-2 gap-6">
                              {/* Address Proof */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                  Proof of Address{" "}
                                  <span className="text-red-500">*</span>
                                </label>
                                <select
                                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                                  value={docState.addressProof}
                                  onChange={(e) =>
                                    setDocState((prev) => ({
                                      ...prev,
                                      addressProof: e.target.value,
                                    }))
                                  }
                                  disabled={docState.isVerified}
                                >
                                  <option value="">
                                    Select proof of address
                                  </option>
                                  <option value="Same as present address">
                                    Same as present address
                                  </option>
                                  <option value="Electricity bill">
                                    Electricity bill
                                  </option>
                                  <option value="Water bill">Water bill</option>
                                  <option value="Telephone bill">
                                    Telephone bill
                                  </option>
                                  <option value="Bank statement">
                                    Bank statement
                                  </option>
                                  <option value="Other">Other</option>
                                </select>
                              </div>

                              {/* Qualification */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                  Educational Qualification{" "}
                                  <span className="text-red-500">*</span>
                                </label>
                                <select
                                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                                  value={docState.qualification}
                                  onChange={(e) =>
                                    setDocState((prev) => ({
                                      ...prev,
                                      qualification: e.target.value,
                                    }))
                                  }
                                  disabled={docState.isVerified}
                                >
                                  <option value="">Select qualification</option>
                                  <option value="Below 8th">Below 8th</option>
                                  <option value="8th Passed">8th Passed</option>
                                  <option value="10th Standard or Equivalent">
                                    10th Standard or Equivalent
                                  </option>
                                  <option value="10+2 or Equivalent">
                                    10+2 or Equivalent
                                  </option>
                                  <option value="ITI/Certificate Course">
                                    ITI/Certificate Course
                                  </option>
                                  <option value="Diploma in any Discipline">
                                    Diploma in any Discipline
                                  </option>
                                  <option value="Graduate in Non Medical Sciences">
                                    Graduate in Non Medical Sciences
                                  </option>
                                  <option value="Graduate in any Medical Sciences">
                                    Graduate in any Medical Sciences
                                  </option>
                                  <option value="Post Graduate in Non Medical Sciences">
                                    Post Graduate in Non Medical Sciences
                                  </option>
                                  <option value="Post Graduate in any Medical Science">
                                    Post Graduate in any Medical Science
                                  </option>
                                  <option value="Post Graduate Diploma in any Discipline">
                                    Post Graduate Diploma in any Discipline
                                  </option>
                                  <option value="M.Phil. in any Discipline">
                                    M.Phil. in any Discipline
                                  </option>
                                  <option value="Doctorate in any Discipline">
                                    Doctorate in any Discipline
                                  </option>
                                  <option value="Illiterate">Illiterate</option>
                                  <option value="Not Specified / NA">
                                    Not Specified / NA
                                  </option>
                                </select>
                              </div>
                            </div>

                            {/* Action Button */}
                            <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
                              <button
                                onClick={handleVerifyDocuments}
                                disabled={
                                  docState.isVerified ||
                                  loadingState.verification
                                }
                                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors disabled:cursor-not-allowed"
                              >
                                {loadingState.verification ? (
                                  <LoadingSpinner size="sm" />
                                ) : docState.isVerified ? (
                                  <CheckCircle2 className="w-5 h-5" />
                                ) : (
                                  <CheckCircle className="w-5 h-5" />
                                )}
                                {docState.isVerified
                                  ? "Documents Verified"
                                  : "Verify Documents"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* LL Application Section */}
                  {currentSection === "ll" && (
                    <div className="max-w-4xl mx-auto">
                      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm">
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Learning License Application
                              </h2>
                              <p className="text-gray-600 dark:text-gray-400 mt-1">
                                Complete the LL application process step by step
                              </p>
                            </div>
                            <button
                              onClick={() =>
                                window.open(
                                  "https://sarathi.parivahan.gov.in/sarathiservice/stateSelection.do",
                                  "_blank",
                                )
                              }
                              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                            >
                              <Globe className="w-4 h-4" />
                              RTO Website
                            </button>
                          </div>
                        </div>

                        <div className="p-6 space-y-6">
                          {/* Application Details Section */}
                          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                            <div className="flex items-center justify-between mb-6">
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Application Details
                              </h3>
                              {llSectionStatus.applicationFilling &&
                                !llEditMode.applicationFilling && (
                                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                                    <CheckCircle2 className="w-5 h-5" />
                                    <span className="text-sm font-medium">
                                      Completed
                                    </span>
                                  </div>
                                )}
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                  Application Number{" "}
                                  <span className="text-red-500">*</span>
                                </label>
                                <div className="flex gap-2">
                                  <input
                                    type="text"
                                    value={llFormData.applicationNumber}
                                    onChange={(e) =>
                                      setLlFormData((prev) => ({
                                        ...prev,
                                        applicationNumber: e.target.value,
                                      }))
                                    }
                                    disabled={
                                      llSectionStatus.applicationFilling &&
                                      !llEditMode.applicationFilling
                                    }
                                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                                    placeholder="Enter application number"
                                  />
                                  <button
                                    onClick={() =>
                                      copyToClipboard(
                                        llFormData.applicationNumber,
                                      )
                                    }
                                    className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                  >
                                    <Copy className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                  Date of Birth{" "}
                                  <span className="text-red-500">*</span>
                                </label>
                                <input
                                  type="date"
                                  value={llFormData.dateOfBirth}
                                  onChange={(e) =>
                                    setLlFormData((prev) => ({
                                      ...prev,
                                      dateOfBirth: e.target.value,
                                    }))
                                  }
                                  disabled={
                                    llSectionStatus.applicationFilling &&
                                    !llEditMode.applicationFilling
                                  }
                                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                                />
                              </div>
                            </div>

                            <div className="flex justify-end mt-6">
                              {!llSectionStatus.applicationFilling ? (
                                <button
                                  onClick={async () => {
                                    if (
                                      llFormData.applicationNumber &&
                                      llFormData.dateOfBirth
                                    ) {
                                      const success =
                                        await handleLLApplicationSubmit({
                                          applicationNumber:
                                            llFormData.applicationNumber,
                                          dateOfBirth: llFormData.dateOfBirth,
                                        });
                                      if (success) {
                                        handleSectionComplete(
                                          "ll",
                                          "applicationFilling",
                                        );
                                      }
                                    } else {
                                      toast.error(
                                        "Please fill all required fields",
                                      );
                                    }
                                  }}
                                  disabled={loadingState.llSubmission}
                                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors disabled:cursor-not-allowed"
                                >
                                  {loadingState.llSubmission ? (
                                    <LoadingSpinner size="sm" />
                                  ) : (
                                    <Save className="w-4 h-4" />
                                  )}
                                  Save & Continue
                                </button>
                              ) : !llEditMode.applicationFilling ? (
                                <button
                                  onClick={() =>
                                    handleSectionEdit(
                                      "ll",
                                      "applicationFilling",
                                    )
                                  }
                                  className="flex items-center gap-2 px-6 py-2 border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg font-medium transition-colors"
                                >
                                  <Edit className="w-4 h-4" />
                                  Edit
                                </button>
                              ) : (
                                <button
                                  onClick={async () => {
                                    if (
                                      llFormData.applicationNumber &&
                                      llFormData.dateOfBirth
                                    ) {
                                      const success =
                                        await handleLLApplicationSubmit({
                                          applicationNumber:
                                            llFormData.applicationNumber,
                                          dateOfBirth: llFormData.dateOfBirth,
                                        });
                                      if (success) {
                                        setLlEditMode((prev) => ({
                                          ...prev,
                                          applicationFilling: false,
                                        }));
                                      }
                                    } else {
                                      toast.error(
                                        "Please fill all required fields",
                                      );
                                    }
                                  }}
                                  disabled={loadingState.llSubmission}
                                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors disabled:cursor-not-allowed"
                                >
                                  {loadingState.llSubmission ? (
                                    <LoadingSpinner size="sm" />
                                  ) : (
                                    <Save className="w-4 h-4" />
                                  )}
                                  Update
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Test Booking Section */}
                          {llSectionStatus.applicationFilling && (
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                              <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                  LL Test Booking
                                </h3>
                                {llSectionStatus.testBooking &&
                                  !llEditMode.testBooking && (
                                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                                      <CheckCircle2 className="w-5 h-5" />
                                      <span className="text-sm font-medium">
                                        Completed
                                      </span>
                                    </div>
                                  )}
                              </div>

                              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
                                <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
                                  <AlertCircle className="w-5 h-5" />
                                  <span className="text-sm">
                                    Contact the student to schedule their
                                    preferred test date and time
                                  </span>
                                </div>
                              </div>

                              <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Test Date{" "}
                                    <span className="text-red-500">*</span>
                                  </label>
                                  <input
                                    type="date"
                                    value={llFormData.testDate}
                                    onChange={(e) =>
                                      setLlFormData((prev) => ({
                                        ...prev,
                                        testDate: e.target.value,
                                      }))
                                    }
                                    disabled={
                                      llSectionStatus.testBooking &&
                                      !llEditMode.testBooking
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                                  />
                                </div>

                                <div>
                                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Test Time{" "}
                                    <span className="text-red-500">*</span>
                                  </label>
                                  <input
                                    type="time"
                                    value={llFormData.testTime}
                                    onChange={(e) =>
                                      setLlFormData((prev) => ({
                                        ...prev,
                                        testTime: e.target.value,
                                      }))
                                    }
                                    disabled={
                                      llSectionStatus.testBooking &&
                                      !llEditMode.testBooking
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                                  />
                                </div>
                              </div>

                              <div className="flex justify-end mt-6">
                                {!llSectionStatus.testBooking ? (
                                  <button
                                    onClick={async () => {
                                      if (
                                        llFormData.testDate &&
                                        llFormData.testTime
                                      ) {
                                        const success =
                                          await handleLLApplicationSubmit({
                                            testDate: llFormData.testDate,
                                            testTime: llFormData.testTime,
                                          });
                                        if (success) {
                                          handleSectionComplete(
                                            "ll",
                                            "testBooking",
                                          );
                                        }
                                      } else {
                                        toast.error(
                                          "Please fill all required fields",
                                        );
                                      }
                                    }}
                                    disabled={loadingState.llSubmission}
                                    className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors disabled:cursor-not-allowed"
                                  >
                                    {loadingState.llSubmission ? (
                                      <LoadingSpinner size="sm" />
                                    ) : (
                                      <Save className="w-4 h-4" />
                                    )}
                                    Save & Continue
                                  </button>
                                ) : !llEditMode.testBooking ? (
                                  <button
                                    onClick={() =>
                                      handleSectionEdit("ll", "testBooking")
                                    }
                                    className="flex items-center gap-2 px-6 py-2 border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg font-medium transition-colors"
                                  >
                                    <Edit className="w-4 h-4" />
                                    Edit
                                  </button>
                                ) : (
                                  <button
                                    onClick={async () => {
                                      if (
                                        llFormData.testDate &&
                                        llFormData.testTime
                                      ) {
                                        const success =
                                          await handleLLApplicationSubmit({
                                            testDate: llFormData.testDate,
                                            testTime: llFormData.testTime,
                                          });
                                        if (success) {
                                          setLlEditMode((prev) => ({
                                            ...prev,
                                            testBooking: false,
                                          }));
                                        }
                                      } else {
                                        toast.error(
                                          "Please fill all required fields",
                                        );
                                      }
                                    }}
                                    disabled={loadingState.llSubmission}
                                    className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors disabled:cursor-not-allowed"
                                  >
                                    {loadingState.llSubmission ? (
                                      <LoadingSpinner size="sm" />
                                    ) : (
                                      <Save className="w-4 h-4" />
                                    )}
                                    Update
                                  </button>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Test Day Section */}
                          {llSectionStatus.testBooking && (
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                              <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                  LL Test Day
                                </h3>
                                {llSectionStatus.testDay && (
                                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                                    <CheckCircle2 className="w-5 h-5" />
                                    <span className="text-sm font-medium">
                                      Completed
                                    </span>
                                  </div>
                                )}
                              </div>

                              <div className="grid md:grid-cols-2 gap-6 mb-6">
                                <div className="bg-white dark:bg-gray-900 rounded-lg p-4">
                                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                                    <Clock className="w-4 h-4" />
                                    <span className="text-sm font-medium">
                                      Test Date
                                    </span>
                                  </div>
                                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {new Date(
                                      llFormData.testDate,
                                    ).toLocaleDateString()}
                                  </p>
                                </div>

                                <div className="bg-white dark:bg-gray-900 rounded-lg p-4">
                                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                                    <Clock className="w-4 h-4" />
                                    <span className="text-sm font-medium">
                                      Test Time
                                    </span>
                                  </div>
                                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {llFormData.testTime}
                                  </p>
                                </div>
                              </div>

                              <div className="mb-6">
                                <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
                                  Update Test Result
                                </h4>
                                <div className="grid grid-cols-2 gap-4">
                                  <button
                                    onClick={() =>
                                      setLlFormData((prev) => ({
                                        ...prev,
                                        testResult: "pass",
                                      }))
                                    }
                                    className={`p-4 rounded-lg border-2 transition-all ${
                                      llFormData.testResult === "pass"
                                        ? "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300"
                                        : "border-gray-300 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-500 text-gray-700 dark:text-gray-300"
                                    }`}
                                  >
                                    <div className="flex items-center justify-center gap-2">
                                      <CheckCircle className="w-5 h-5" />
                                      <span className="font-medium">Pass</span>
                                    </div>
                                  </button>

                                  <button
                                    onClick={() =>
                                      setLlFormData((prev) => ({
                                        ...prev,
                                        testResult: "fail",
                                      }))
                                    }
                                    className={`p-4 rounded-lg border-2 transition-all ${
                                      llFormData.testResult === "fail"
                                        ? "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300"
                                        : "border-gray-300 dark:border-gray-600 hover:border-red-300 dark:hover:border-red-500 text-gray-700 dark:text-gray-300"
                                    }`}
                                  >
                                    <div className="flex items-center justify-center gap-2">
                                      <X className="w-5 h-5" />
                                      <span className="font-medium">Fail</span>
                                    </div>
                                  </button>
                                </div>
                              </div>

                              {llFormData.testResult === "fail" && (
                                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
                                  <div className="flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                                    <div>
                                      <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-1">
                                        Test Failed
                                      </h4>
                                      <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-3">
                                        The student can rebook the test after 10
                                        days. You can schedule a new test when
                                        eligible.
                                      </p>
                                      <button
                                        onClick={() => handleReTest("ll")}
                                        className="flex items-center gap-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg text-sm font-medium transition-colors"
                                      >
                                        <RefreshCw className="w-4 h-4" />
                                        Reset for Re-Test
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {!llSectionStatus.testDay &&
                                llFormData.testResult && (
                                  <div className="flex justify-end">
                                    <button
                                      onClick={() =>
                                        handleSectionComplete("ll", "testDay")
                                      }
                                      className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                                    >
                                      <Save className="w-4 h-4" />
                                      Save & Continue
                                    </button>
                                  </div>
                                )}
                            </div>
                          )}

                          {/* Submit Section */}
                          {llSectionStatus.testDay &&
                            llFormData.testResult === "pass" && (
                              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
                                <div className="flex items-center gap-3 mb-4">
                                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                                    <CheckCircle className="w-6 h-6 text-white" />
                                  </div>
                                  <div>
                                    <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
                                      LL Test Passed!
                                    </h3>
                                    <p className="text-sm text-green-600 dark:text-green-300">
                                      Ready to submit the final result
                                    </p>
                                  </div>
                                </div>

                                <div className="flex justify-end">
                                  <button
                                    onClick={handleLLResultSubmit}
                                    disabled={loadingState.llSubmission}
                                    className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors disabled:cursor-not-allowed"
                                  >
                                    {loadingState.llSubmission ? (
                                      <LoadingSpinner size="sm" />
                                    ) : (
                                      <ArrowRight className="w-4 h-4" />
                                    )}
                                    Complete LL Process
                                  </button>
                                </div>
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* DL Application Section */}
                  {currentSection === "dl" && (
                    <div className="max-w-4xl mx-auto">
                      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm">
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Driving License Application
                              </h2>
                              <p className="text-gray-600 dark:text-gray-400 mt-1">
                                Complete the DL application process step by step
                              </p>
                            </div>
                            <button
                              onClick={() =>
                                window.open(
                                  "https://sarathi.parivahan.gov.in/sarathiservice/stateSelection.do",
                                  "_blank",
                                )
                              }
                              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                            >
                              <Globe className="w-4 h-4" />
                              RTO Website
                            </button>
                          </div>
                        </div>

                        <div className="p-6 space-y-6">
                          {/* Application Details Section */}
                          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                            <div className="flex items-center justify-between mb-6">
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Application Details
                              </h3>
                              {dlSectionStatus.applicationFilling &&
                                !dlEditMode.applicationFilling && (
                                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                                    <CheckCircle2 className="w-5 h-5" />
                                    <span className="text-sm font-medium">
                                      Completed
                                    </span>
                                  </div>
                                )}
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                  Application Number{" "}
                                  <span className="text-red-500">*</span>
                                </label>
                                <div className="flex gap-2">
                                  <input
                                    type="text"
                                    value={dlFormData.applicationNumber}
                                    onChange={(e) =>
                                      setDlFormData((prev) => ({
                                        ...prev,
                                        applicationNumber: e.target.value,
                                      }))
                                    }
                                    disabled={
                                      dlSectionStatus.applicationFilling &&
                                      !dlEditMode.applicationFilling
                                    }
                                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                                    placeholder="Enter application number"
                                  />
                                  <button
                                    onClick={() =>
                                      copyToClipboard(
                                        dlFormData.applicationNumber,
                                      )
                                    }
                                    className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                  >
                                    <Copy className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                  Learning License Number{" "}
                                  <span className="text-red-500">*</span>
                                </label>
                                <div className="flex gap-2">
                                  <input
                                    type="text"
                                    value={dlFormData.llnumber}
                                    onChange={(e) =>
                                      setDlFormData((prev) => ({
                                        ...prev,
                                        llnumber: e.target.value,
                                      }))
                                    }
                                    disabled={
                                      dlSectionStatus.applicationFilling &&
                                      !dlEditMode.applicationFilling
                                    }
                                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                                    placeholder="Enter LL number"
                                  />
                                  <button
                                    onClick={() =>
                                      copyToClipboard(dlFormData.llnumber)
                                    }
                                    className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                  >
                                    <Copy className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>

                              {/* Conditional DL Number field for old DL holders */}
                              {selectedStudent?.studentType === "old" && (
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Existing DL Number{" "}
                                    <span className="text-red-500">*</span>
                                  </label>
                                  <div className="flex gap-2">
                                    <input
                                      type="text"
                                      value={dlFormData.dlnumber || ""}
                                      onChange={(e) =>
                                        setDlFormData((prev) => ({
                                          ...prev,
                                          dlnumber: e.target.value,
                                        }))
                                      }
                                      disabled={
                                        dlSectionStatus.applicationFilling &&
                                        !dlEditMode.applicationFilling
                                      }
                                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                                      placeholder="Enter existing DL number"
                                    />
                                    <button
                                      onClick={() =>
                                        copyToClipboard(
                                          dlFormData.dlnumber || "",
                                        )
                                      }
                                      className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                    >
                                      <Copy className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              )}

                              <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                  Date of Birth{" "}
                                  <span className="text-red-500">*</span>
                                </label>
                                <input
                                  type="date"
                                  value={dlFormData.dateOfBirth}
                                  onChange={(e) =>
                                    setDlFormData((prev) => ({
                                      ...prev,
                                      dateOfBirth: e.target.value,
                                    }))
                                  }
                                  disabled={
                                    dlSectionStatus.applicationFilling &&
                                    !dlEditMode.applicationFilling
                                  }
                                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                                />
                              </div>
                            </div>

                            <div className="flex justify-end mt-6">
                              {!dlSectionStatus.applicationFilling ? (
                                <button
                                  onClick={async () => {
                                    const requiredFields = [
                                      dlFormData.applicationNumber,
                                      dlFormData.llnumber,
                                      dlFormData.dateOfBirth,
                                    ];

                                    // Add DL number validation for old DL holders
                                    if (
                                      selectedStudent?.studentType === "old"
                                    ) {
                                      requiredFields.push(
                                        dlFormData.dlnumber || "",
                                      );
                                    }

                                    if (
                                      requiredFields.every((field) => field)
                                    ) {
                                      const submitData: any = {
                                        applicationNumber:
                                          dlFormData.applicationNumber,
                                        llnumber: dlFormData.llnumber,
                                        dateOfBirth: dlFormData.dateOfBirth,
                                      };

                                      if (
                                        selectedStudent?.studentType ===
                                          "old" &&
                                        dlFormData.dlnumber
                                      ) {
                                        submitData.dlnumber =
                                          dlFormData.dlnumber;
                                      }

                                      const success =
                                        await handleDLApplicationSubmit(
                                          submitData,
                                        );
                                      if (success) {
                                        handleSectionComplete(
                                          "dl",
                                          "applicationFilling",
                                        );
                                      }
                                    } else {
                                      toast.error(
                                        "Please fill all required fields",
                                      );
                                    }
                                  }}
                                  disabled={loadingState.dlSubmission}
                                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors disabled:cursor-not-allowed"
                                >
                                  {loadingState.dlSubmission ? (
                                    <LoadingSpinner size="sm" />
                                  ) : (
                                    <Save className="w-4 h-4" />
                                  )}
                                  Save & Continue
                                </button>
                              ) : !dlEditMode.applicationFilling ? (
                                <button
                                  onClick={() =>
                                    handleSectionEdit(
                                      "dl",
                                      "applicationFilling",
                                    )
                                  }
                                  className="flex items-center gap-2 px-6 py-2 border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg font-medium transition-colors"
                                >
                                  <Edit className="w-4 h-4" />
                                  Edit
                                </button>
                              ) : (
                                <button
                                  onClick={async () => {
                                    const requiredFields = [
                                      dlFormData.applicationNumber,
                                      dlFormData.llnumber,
                                      dlFormData.dateOfBirth,
                                    ];

                                    if (
                                      selectedStudent?.studentType === "old"
                                    ) {
                                      requiredFields.push(
                                        dlFormData.dlnumber || "",
                                      );
                                    }

                                    if (
                                      requiredFields.every((field) => field)
                                    ) {
                                      const submitData: any = {
                                        applicationNumber:
                                          dlFormData.applicationNumber,
                                        llnumber: dlFormData.llnumber,
                                        dateOfBirth: dlFormData.dateOfBirth,
                                      };

                                      if (
                                        selectedStudent?.studentType ===
                                          "old" &&
                                        dlFormData.dlnumber
                                      ) {
                                        submitData.dlnumber =
                                          dlFormData.dlnumber;
                                      }

                                      const success =
                                        await handleDLApplicationSubmit(
                                          submitData,
                                        );
                                      if (success) {
                                        setDlEditMode((prev) => ({
                                          ...prev,
                                          applicationFilling: false,
                                        }));
                                      }
                                    } else {
                                      toast.error(
                                        "Please fill all required fields",
                                      );
                                    }
                                  }}
                                  disabled={loadingState.dlSubmission}
                                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors disabled:cursor-not-allowed"
                                >
                                  {loadingState.dlSubmission ? (
                                    <LoadingSpinner size="sm" />
                                  ) : (
                                    <Save className="w-4 h-4" />
                                  )}
                                  Update
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Test Booking Section */}
                          {dlSectionStatus.applicationFilling && (
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                              <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                  DL Test Booking
                                </h3>
                                {dlSectionStatus.testBooking &&
                                  !dlEditMode.testBooking && (
                                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                                      <CheckCircle2 className="w-5 h-5" />
                                      <span className="text-sm font-medium">
                                        Completed
                                      </span>
                                    </div>
                                  )}
                              </div>

                              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
                                <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
                                  <AlertCircle className="w-5 h-5" />
                                  <span className="text-sm">
                                    Contact the student to schedule their
                                    preferred test date and time
                                  </span>
                                </div>
                              </div>

                              <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Test Date{" "}
                                    <span className="text-red-500">*</span>
                                  </label>
                                  <input
                                    type="date"
                                    value={dlFormData.testDate}
                                    onChange={(e) =>
                                      setDlFormData((prev) => ({
                                        ...prev,
                                        testDate: e.target.value,
                                      }))
                                    }
                                    disabled={
                                      dlSectionStatus.testBooking &&
                                      !dlEditMode.testBooking
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                                  />
                                </div>

                                <div>
                                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Test Time{" "}
                                    <span className="text-red-500">*</span>
                                  </label>
                                  <input
                                    type="time"
                                    value={dlFormData.testTime}
                                    onChange={(e) =>
                                      setDlFormData((prev) => ({
                                        ...prev,
                                        testTime: e.target.value,
                                      }))
                                    }
                                    disabled={
                                      dlSectionStatus.testBooking &&
                                      !dlEditMode.testBooking
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                                  />
                                </div>
                              </div>

                              <div className="flex justify-end mt-6">
                                {!dlSectionStatus.testBooking ? (
                                  <button
                                    onClick={async () => {
                                      if (
                                        dlFormData.testDate &&
                                        dlFormData.testTime
                                      ) {
                                        const success =
                                          await handleDLApplicationSubmit({
                                            testDate: dlFormData.testDate,
                                            testTime: dlFormData.testTime,
                                          });
                                        if (success) {
                                          handleSectionComplete(
                                            "dl",
                                            "testBooking",
                                          );
                                        }
                                      } else {
                                        toast.error(
                                          "Please fill all required fields",
                                        );
                                      }
                                    }}
                                    disabled={loadingState.dlSubmission}
                                    className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors disabled:cursor-not-allowed"
                                  >
                                    {loadingState.dlSubmission ? (
                                      <LoadingSpinner size="sm" />
                                    ) : (
                                      <Save className="w-4 h-4" />
                                    )}
                                    Save & Continue
                                  </button>
                                ) : !dlEditMode.testBooking ? (
                                  <button
                                    onClick={() =>
                                      handleSectionEdit("dl", "testBooking")
                                    }
                                    className="flex items-center gap-2 px-6 py-2 border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg font-medium transition-colors"
                                  >
                                    <Edit className="w-4 h-4" />
                                    Edit
                                  </button>
                                ) : (
                                  <button
                                    onClick={async () => {
                                      if (
                                        dlFormData.testDate &&
                                        dlFormData.testTime
                                      ) {
                                        const success =
                                          await handleDLApplicationSubmit({
                                            testDate: dlFormData.testDate,
                                            testTime: dlFormData.testTime,
                                          });
                                        if (success) {
                                          setDlEditMode((prev) => ({
                                            ...prev,
                                            testBooking: false,
                                          }));
                                        }
                                      } else {
                                        toast.error(
                                          "Please fill all required fields",
                                        );
                                      }
                                    }}
                                    disabled={loadingState.dlSubmission}
                                    className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors disabled:cursor-not-allowed"
                                  >
                                    {loadingState.dlSubmission ? (
                                      <LoadingSpinner size="sm" />
                                    ) : (
                                      <Save className="w-4 h-4" />
                                    )}
                                    Update
                                  </button>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Test Day Section */}
                          {dlSectionStatus.testBooking && (
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                              <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                  DL Test Day
                                </h3>
                                {dlSectionStatus.testDay && (
                                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                                    <CheckCircle2 className="w-5 h-5" />
                                    <span className="text-sm font-medium">
                                      Completed
                                    </span>
                                  </div>
                                )}
                              </div>

                              <div className="grid md:grid-cols-2 gap-6 mb-6">
                                <div className="bg-white dark:bg-gray-900 rounded-lg p-4">
                                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                                    <Clock className="w-4 h-4" />
                                    <span className="text-sm font-medium">
                                      Test Date
                                    </span>
                                  </div>
                                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {new Date(
                                      dlFormData.testDate,
                                    ).toLocaleDateString()}
                                  </p>
                                </div>

                                <div className="bg-white dark:bg-gray-900 rounded-lg p-4">
                                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                                    <Clock className="w-4 h-4" />
                                    <span className="text-sm font-medium">
                                      Test Time
                                    </span>
                                  </div>
                                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {dlFormData.testTime}
                                  </p>
                                </div>
                              </div>

                              <div className="mb-6">
                                <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
                                  Update Test Result
                                </h4>
                                <div className="grid grid-cols-2 gap-4">
                                  <button
                                    onClick={() =>
                                      setDlFormData((prev) => ({
                                        ...prev,
                                        testResult: "pass",
                                      }))
                                    }
                                    className={`p-4 rounded-lg border-2 transition-all ${
                                      dlFormData.testResult === "pass"
                                        ? "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300"
                                        : "border-gray-300 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-500 text-gray-700 dark:text-gray-300"
                                    }`}
                                  >
                                    <div className="flex items-center justify-center gap-2">
                                      <CheckCircle className="w-5 h-5" />
                                      <span className="font-medium">Pass</span>
                                    </div>
                                  </button>

                                  <button
                                    onClick={() =>
                                      setDlFormData((prev) => ({
                                        ...prev,
                                        testResult: "fail",
                                      }))
                                    }
                                    className={`p-4 rounded-lg border-2 transition-all ${
                                      dlFormData.testResult === "fail"
                                        ? "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300"
                                        : "border-gray-300 dark:border-gray-600 hover:border-red-300 dark:hover:border-red-500 text-gray-700 dark:text-gray-300"
                                    }`}
                                  >
                                    <div className="flex items-center justify-center gap-2">
                                      <X className="w-5 h-5" />
                                      <span className="font-medium">Fail</span>
                                    </div>
                                  </button>
                                </div>
                              </div>

                              {dlFormData.testResult === "fail" && (
                                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
                                  <div className="flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                                    <div>
                                      <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-1">
                                        Test Failed
                                      </h4>
                                      <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-3">
                                        The student can rebook the test after 10
                                        days. You can schedule a new test when
                                        eligible.
                                      </p>
                                      <button
                                        onClick={() => handleReTest("dl")}
                                        className="flex items-center gap-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg text-sm font-medium transition-colors"
                                      >
                                        <RefreshCw className="w-4 h-4" />
                                        Reset for Re-Test
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {!dlSectionStatus.testDay &&
                                dlFormData.testResult && (
                                  <div className="flex justify-end">
                                    <button
                                      onClick={() =>
                                        handleSectionComplete("dl", "testDay")
                                      }
                                      className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                                    >
                                      <Save className="w-4 h-4" />
                                      Save & Continue
                                    </button>
                                  </div>
                                )}
                            </div>
                          )}

                          {/* Submit Section */}
                          {dlSectionStatus.testDay &&
                            dlFormData.testResult === "pass" && (
                              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
                                <div className="flex items-center gap-3 mb-4">
                                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                                    <CheckCircle className="w-6 h-6 text-white" />
                                  </div>
                                  <div>
                                    <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
                                      DL Test Passed!
                                    </h3>
                                    <p className="text-sm text-green-600 dark:text-green-300">
                                      Ready to submit the final result
                                    </p>
                                  </div>
                                </div>

                                <div className="flex justify-end">
                                  <button
                                    onClick={handleDLResultSubmit}
                                    disabled={loadingState.dlSubmission}
                                    className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors disabled:cursor-not-allowed"
                                  >
                                    {loadingState.dlSubmission ? (
                                      <LoadingSpinner size="sm" />
                                    ) : (
                                      <ArrowRight className="w-4 h-4" />
                                    )}
                                    Complete DL Process
                                  </button>
                                </div>
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Congratulations Section */}
                  {currentSection === "congrats" && (
                    <div className="max-w-4xl mx-auto">
                      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-8 text-center">
                        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                          <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                          Congratulations!
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                          License process completed successfully.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                          <button
                            onClick={handleReturnToStudentList}
                            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                          >
                            <ArrowLeft className="w-5 h-5" />
                            Return to Student List
                          </button>
                          {/* <button className="flex items-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors">
                            <Download className="w-5 h-5" />
                            Download Summary
                          </button> */}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // Student selected but no progress data
              <div className="min-h-screen flex items-center justify-center p-8 bg-gray-50 dark:bg-gray-950">
                <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-xl shadow-sm p-8 text-center">
                  <div className="w-20 h-20 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertCircle className="w-10 h-10 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    License Preferences Required
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                    The student has not submitted their license preferences yet.
                    Please contact them to
                    <span className="font-medium text-blue-600 dark:text-blue-400">
                      {" "}
                      enroll into course(s)
                    </span>{" "}
                    and
                    <span className="font-medium text-blue-600 dark:text-blue-400">
                      {" "}
                      submit the preferences
                    </span>
                    .
                  </p>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-white text-xs font-bold">i</span>
                      </div>
                      <div className="text-sm text-blue-800 dark:text-blue-200">
                        <p className="font-medium mb-2">Next Steps:</p>
                        <ul className="space-y-1 text-xs">
                          <li>• Contact student via phone or message</li>
                          <li>• Guide them through course enrollment</li>
                          <li>• Ensure license preferences are submitted</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleReturnToStudentList}
                    className="mt-6 flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors mx-auto"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Student List
                  </button>
                </div>
              </div>
            )
          ) : (
            // No student selected
            <div className="min-h-screen flex items-center justify-center p-8 bg-gray-50 dark:bg-gray-950">
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                  <UserIcon className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Select a Student
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Choose a student from the list to view their license progress
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LicenseProcess02;
