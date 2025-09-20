import React, { useState, useEffect } from "react";
import {
  Search,
  ArrowLeft,
  FileText,
  CheckCircle,
  Laptop,
  Car,
  Copy,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { Operator, User } from "../../../interfaces/models.ts";
import api from "../../../utils/axiosInstance.ts";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store.ts";

// license progress bar will be of 3 types:
/*
  1. LL + DL (both)
  2. LL only
  3. DL only
*/

// todo: useEffect api for updating DL status of other vehicle of a selected student.
// todo : all api calls

interface Step {
  id: string;
  title: string;
  icon: React.ReactNode;
  completed: boolean;
  isActive?: boolean;
  showGap?: boolean;
}

// const dummyStudents: User[] = [
//   {
//     id: '1',
//     name: 'John Smith',
//     image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop',
//     phoneNumber: '1234567890',
//     purpose: 'Need lisence for both',
//     progress: {
//       documentVerification: true,
//       llApplication: true,
//       llTestBooking: true,
//       llTestDay: false,
//       dlApplication: false,
//       dlTestBooking: false,
//       dlTestDay: false
//     }
//   },
//   {
//     id: '2',
//     name: 'Cooper ross',
//     image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop',
//     phoneNumber: '9876543210',
//     purpose: 'Car license only',
//     progress: {
//       documentVerification: true,
//       llApplication: false,
//       llTestBooking: false,
//       llTestDay: false,
//       dlApplication: false,
//       dlTestBooking: false,
//       dlTestDay: false
//     }
//   },
//   {
//     id: '3',
//     name: 'Kavin clane',
//     image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop',
//     phoneNumber: '5432167890',
//     purpose: 'Need lisence for both',
//     progress: {
//       documentVerification: true,
//       llApplication: true,
//       llTestBooking: false,
//       llTestDay: false,
//     }
//   },
//   {
//     id: '4',
//     name: 'Clara peter',
//     image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop',
//     phoneNumber: '9876543210',
//     purpose: 'Bike license only',
//     progress: {
//       documentVerification: true,
//       dlApplication: false,
//       dlTestBooking: false,
//       dlTestDay: false
//     }
//   },
//   {
//     id: '5',
//     name: 'Smith',
//     image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop',
//     phoneNumber: '6789054321',
//     purpose: 'Need lisence for both',
//     progress: {
//       documentVerification: false,
//       llApplication: false,
//       llTestBooking: false,
//       llTestDay: false,
//       dlApplication: false,
//       dlTestBooking: false,
//       dlTestDay: false
//     }
//   }
// ];

interface LLFormData {
  applicationNumber: string;
  dateOfBirth: string;
  testDate: string;
  testTime: string;
  testResult: "pass" | "fail" | null;
  // llPdf: File | null;
}
interface DLFormData {
  applicationNumber: string;
  llnumber: string;
  dlnumber?: string;
  dateOfBirth: string;
  testDate: string;
  testTime: string;
  testResult: "pass" | "fail" | null;
  // dlPdf: File | null;
}

const LicenseProcess: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<User | null>(null);
  const [showMobileDetails, setShowMobileDetails] = useState(false);

  // State for checkboxes
  const [aadharCard, setAadharCard] = useState<boolean>(false);
  const [passportPhoto, setPassportPhoto] = useState<boolean>(false);
  const [proofOfAge, setProofOfAge] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [addressProof, setAddressProof] = useState<string>("Electricity bill");
  const [qualification, setQualification] = useState<string>("10+2");
  const [lldoc, setLLdoc] = useState<boolean>(false);
  const [dlDoc, setDLdoc] = useState<boolean>(false);
  const [oldDl, setOldDL] = useState<boolean>(false);

  const [showDocVerification, setShowDocVerification] = useState<boolean>(true);
  const [showLLApplication, setShowLLApplication] = useState<boolean>(false);
  const [showDLApplication, setShowDLApplication] = useState<boolean>(false);
  const [showCongrats, setShowCongrats] = useState<boolean>(false);

  const operator = useSelector(
    (state: RootState) => state.auth.user,
  ) as Operator;
  const [students, setStudents] = useState<User[]>([]);

  // const [docSubmission, setDocSubmission] = useState<boolean>(false);

  const getStudents = async () => {
    try {
      const response = await api.post("/operator/get-licensing-students", {
        schoolId: operator?.schoolId,
      });
      setStudents(response.data.filteredStudents);
    } catch (error) {
      console.error("Error fetching students:", error);
      toast.error("Failed to fetch students. Please try again later.");
    }
  };

  const filteredStudents = students.filter((student) =>
    student.name?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleStudentClick = (student: User) => {
    setSelectedStudent(student);
    setShowMobileDetails(true);
  };

  const handleBack = () => {
    setShowMobileDetails(false);
  };

  // Function to handle document verification
  const handleVerifyDoc = async (): Promise<void> => {
    try {
      if (
        !aadharCard ||
        !passportPhoto ||
        !proofOfAge ||
        !addressProof ||
        !qualification
      ) {
        toast.error("Please receive & verify all the documents!");
        return;
      } else {
        //TODO:  check this
        // setDocSubmission(true);
      }

      // Make API call
      const response = await api.post("/operator/verify-doc", {
        userId: selectedStudent?.id,
        docSubmission: true,
      });

      // If successful, lock the form
      if (response.data.success) {
        setIsVerified(true);
        setShowDocVerification(false);
        setShowLLApplication(true);
        console.log("Documents verified successfully!", response.data.message);

        await getStudents();
        await getLicenseAppnDetails();
      }
    } catch (error) {
      console.error("Error verifying documents:", error);
    }
  };

  // Function to handle LL application submission
  const [showForm, setShowForm] = useState(false);
  const [llFormData, setllFormData] = useState<LLFormData>({
    applicationNumber: "",
    dateOfBirth: "",
    testDate: "",
    testTime: "",
    testResult: null,
    // llPdf: null
  });

  const [sectionStatus, setSectionStatus] = useState({
    applicationFilling: false,
    testBooking: false,
    testDay: false,
    result: false,
  });

  const [editMode, setEditMode] = useState({
    applicationFilling: false,
    testBooking: false,
    testDay: false,
    result: false,
  });

  const [showEdit, setShowEdit] = useState({
    applicationFilling: false,
    testBooking: false,
    testDay: false,
    result: false,
  });

  // const fileInputRef = useRef<HTMLInputElement>(null);

  const handleRTOClick = () => {
    window.open(
      "https://sarathi.parivahan.gov.in/sarathiservice/stateSelection.do",
      "_blank",
    );
    setShowForm(true);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to Clipboard");
  };

  const handleSaveSection = (section: keyof typeof sectionStatus) => {
    setSectionStatus((prev) => ({ ...prev, [section]: true }));
    setEditMode((prev) => ({ ...prev, [section]: false }));
    setShowEdit((prev) => ({ ...prev, [section]: true }));
  };

  const handleEditSection = (section: keyof typeof sectionStatus) => {
    setEditMode((prev) => ({ ...prev, [section]: true }));
    setShowEdit((prev) => ({ ...prev, [section]: false }));
  };

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     setllFormData(prev => ({ ...prev, llPdf: file }));
  //   }
  // };

  // const handleDrop = (event: React.DragEvent) => {
  //   event.preventDefault();
  //   const file = event.dataTransfer.files[0];
  //   if (file) {
  //     setllFormData(prev => ({ ...prev, llPdf: file }));
  //   }
  // };

  // const handleDragOver = (event: React.DragEvent) => {
  //   event.preventDefault();
  // };

  const handleReTest = () => {
    setShowForm(false);
    setllFormData((prev) => ({
      ...prev,
      testDate: "",
      testTime: "",
      testResult: null,
      // llPdf: null
    }));
    setSectionStatus({
      applicationFilling: false,
      testBooking: false,
      testDay: false,
      result: false,
    });
    setEditMode({
      applicationFilling: false,
      testBooking: false,
      testDay: false,
      result: false,
    });
    setShowEdit({
      applicationFilling: false,
      testBooking: false,
      testDay: false,
      result: false,
    });
  };

  const handleLLappSubmit = async (llAppnData: any): Promise<boolean> => {
    try {
      const response = await api.post("/operator/ll-appn", {
        userId: selectedStudent?.id,
        llAppnData,
      });

      if (response.data.success) {
        toast.success("LL Application updated successfully!");
        await getStudents();
        await getLicenseAppnDetails();
        return true; // Indicate success
      }
      return false; // Indicate failure
    } catch (error) {
      toast.error("Error submitting LL Application. Please try again later.");
      console.error("Error submitting LL Application:", error);
      return false; // Indicate failure
    }
  };

  const handleNext = async () => {
    // this is after results of LL;
    try {
      if (!llFormData.testResult) {
        toast.error("Please provide the test result!");
        return;
      }

      const response = await api.patch("/operator/ll-result", {
        userId: selectedStudent?.id,
        llTestResult: llFormData.testResult,
        operatorId: operator?.id,
      });

      if (response.data.success) {
        setShowForm(false);
        if (selectedStudent?.progress?.dlApplication === "excluded") {
          setShowCongrats(true);
        }
        setShowLLApplication(false);
        setShowDLApplication(true);
        setllFormData({
          applicationNumber: "",
          dateOfBirth: "",
          testDate: "",
          testTime: "",
          testResult: null,
          // llPdf: null
        });
        setSectionStatus({
          applicationFilling: false,
          testBooking: false,
          testDay: false,
          result: false,
        });
        setEditMode({
          applicationFilling: false,
          testBooking: false,
          testDay: false,
          result: false,
        });
        setShowEdit({
          applicationFilling: false,
          testBooking: false,
          testDay: false,
          result: false,
        });
        toast.success("LL Application submitted successfully!");
        await getStudents();
        await getLicenseAppnDetails();
      }
    } catch (error) {
      toast.error("Error submitting LL Application. Please try again later.");
      console.error("Error submitting LL Application:", error);
    }
  };

  //----------//

  // handling DL application
  const [showDLForm, setShowDLForm] = useState(false);
  const [dlFormData, setdlFormData] = useState<DLFormData>({
    applicationNumber: "",
    llnumber: "",
    dateOfBirth: llFormData?.dateOfBirth || "",
    testDate: "",
    testTime: "",
    testResult: null,
    // dlPdf: null
  });
  const handleDLReTest = () => {
    setShowDLForm(false);
    setdlFormData((prev) => ({
      ...prev,
      testDate: "",
      testTime: "",
      testResult: null,
      // dlPdf: null
    }));
    setSectionStatus({
      applicationFilling: false,
      testBooking: false,
      testDay: false,
      result: false,
    });
    setEditMode({
      applicationFilling: false,
      testBooking: false,
      testDay: false,
      result: false,
    });
    setShowEdit({
      applicationFilling: false,
      testBooking: false,
      testDay: false,
      result: false,
    });
  };

  const handleDLRTOClick = () => {
    window.open(
      "https://sarathi.parivahan.gov.in/sarathiservice/stateSelection.do",
      "_blank",
    );
    setShowDLForm(true);
  };

  const handleDlAppnSubmit = async (dlAppnData: any): Promise<boolean> => {
    try {
      const response = await api.post("/operator/dl-appn", {
        userId: selectedStudent?.id,
        dlAppnData,
        // dlPdf: dlFormData.dlPdf
      });
      if (response.data.success) {
        toast.success("DL Application submitted successfully!");
        await getStudents();
        await getLicenseAppnDetails();
        return true; // Indicate success
      }
      return false; // Indicate failure
    } catch (error) {
      toast.error("Error submitting DL Application. Please try again later.");
      console.error("Error submitting DL Application:", error);
      return false; // Indicate failure
    }
  };

  const handleDLNext = async () => {
    // this is after results of DL;
    try {
      if (!dlFormData.testResult) {
        toast.error("Please fill all the fields!");
        return;
      }
      const response = await api.patch("/operator/dl-result", {
        userId: selectedStudent?.id,
        dlTestResult: dlFormData.testResult,
        operatorId: operator?.id,
      });

      if (response.data.success) {
        setShowDLForm(false);
        setShowDLApplication(false);
        setShowCongrats(true);
        setSectionStatus({
          applicationFilling: false,
          testBooking: false,
          testDay: false,
          result: false,
        });
        setEditMode({
          applicationFilling: false,
          testBooking: false,
          testDay: false,
          result: false,
        });
        setShowEdit({
          applicationFilling: false,
          testBooking: false,
          testDay: false,
          result: false,
        });
        toast.success("DL Application submitted successfully!");
        await getStudents();
        await getLicenseAppnDetails();
      }
    } catch (error) {
      toast.error("Error submitting DL Application. Please try again later.");
      console.error("Error submitting DL Application:", error);
    }
  };

  const steps: Step[] = selectedStudent
    ? ([
        selectedStudent.progress?.documentVerification !== "excluded" && {
          id: "doc-verify",
          title: "Document Verification",
          icon: <FileText className="w-5 h-5" />,
          completed:
            selectedStudent.progress?.documentVerification === "done" || false,
        },
        selectedStudent.progress?.llApplication !== "excluded" && {
          id: "ll-app",
          title: "LL Application",
          icon: <FileText className="w-5 h-5" />,
          completed:
            selectedStudent.progress?.llApplication === "done" || false,
        },
        selectedStudent.progress?.llTestBooking !== "excluded" && {
          id: "ll-book",
          title: "LL Test Booking",
          icon: <CheckCircle className="w-5 h-5" />,
          completed:
            selectedStudent.progress?.llTestBooking === "done" || false,
        },
        selectedStudent.progress?.llTestDay !== "excluded" && {
          id: "ll-test",
          title: "LL Test Day",
          icon: <Laptop className="w-5 h-5" />,
          completed: selectedStudent.progress?.llTestDay === "done" || false,
          isActive: !selectedStudent.progress?.llTestDay,
          showGap: true,
        },
        selectedStudent.progress?.dlApplication !== "excluded" && {
          id: "dl-app",
          title: "DL Application",
          icon: <FileText className="w-5 h-5" />,
          completed:
            selectedStudent.progress?.dlApplication === "done" || false,
        },
        selectedStudent.progress?.dlTestBooking !== "excluded" && {
          id: "dl-book",
          title: "DL Test Booking",
          icon: <CheckCircle className="w-5 h-5" />,
          completed:
            selectedStudent.progress?.dlTestBooking === "done" || false,
        },
        selectedStudent.progress?.dlTestDay !== "excluded" && {
          id: "dl-test",
          title: "DL Test Day",
          icon: <Car className="w-5 h-5" />,
          completed: selectedStudent.progress?.dlTestDay === "done" || false,
        },
      ].filter(Boolean) as Step[])
    : [];

  const getLicenseAppnDetails = async () => {
    try {
      const response = await api.post("/operator/get-licensing-details", {
        userId: selectedStudent?.id,
      });
      if (response.data.success) {
        // Resetting the document states
        setAadharCard(false);
        setPassportPhoto(false);
        setProofOfAge(false);
        setAddressProof(""); // Assuming "" is your default/unselected state for the dropdown
        setQualification(""); // Assuming "" is your default/unselected state for the dropdown
        // Reset other related document states if necessary
        setLLdoc(false);
        setDLdoc(false);
        setllFormData({
          applicationNumber:
            response.data.licenseAppnDetails?.llAppn?.applicationNumber,
          dateOfBirth: response.data.licenseAppnDetails?.llAppn?.dateOfBirth,
          testDate: response.data.licenseAppnDetails?.llAppn?.testDate,
          testTime: response.data.licenseAppnDetails?.llAppn?.testTime,
          testResult: response.data.licenseAppnDetails?.llAppn?.testResult,
        });
        setdlFormData({
          applicationNumber:
            response.data.licenseAppnDetails?.dlAppn?.applicationNumber,
          llnumber: response.data.licenseAppnDetails?.dlAppn?.llnumber,
          dlnumber: response.data.licenseAppnDetails?.dlAppn?.oldDlnumber,
          dateOfBirth: response.data.licenseAppnDetails?.dlAppn?.dateOfBirth,
          testDate: response.data.licenseAppnDetails?.dlAppn?.testDate,
          testTime: response.data.licenseAppnDetails?.dlAppn?.testTime,
          testResult: response.data.licenseAppnDetails?.dlAppn?.testResult,
        });
      }
    } catch (error) {
      toast.error(
        "Error fetching license application details. Please try again later.",
      );
      console.error("Error fetching license application details:", error);
    }
  };

  const handleReset = () => {
    // Reset document verification states
    setAadharCard(false);
    setPassportPhoto(false);
    setProofOfAge(false);
    setIsVerified(false);
    setAddressProof("Electricity bill");
    setQualification("10+2");
    setLLdoc(false);
    setDLdoc(false);
    setOldDL(false);

    // Reset view states
    setShowDocVerification(true);
    setShowLLApplication(false);
    setShowDLApplication(false);
    setShowCongrats(false);

    // Reset form states
    setShowForm(false);
    setShowDLForm(false);

    // Reset LL form data
    setllFormData({
      applicationNumber: "",
      dateOfBirth: "",
      testDate: "",
      testTime: "",
      testResult: null,
    });

    // Reset DL form data
    setdlFormData({
      applicationNumber: "",
      llnumber: "",
      dlnumber: "",
      dateOfBirth: "",
      testDate: "",
      testTime: "",
      testResult: null,
    });

    // Reset section status
    setSectionStatus({
      applicationFilling: false,
      testBooking: false,
      testDay: false,
      result: false,
    });

    // Reset edit mode
    setEditMode({
      applicationFilling: false,
      testBooking: false,
      testDay: false,
      result: false,
    });

    // Reset show edit
    setShowEdit({
      applicationFilling: false,
      testBooking: false,
      testDay: false,
      result: false,
    });

    // Reset mobile view
    setShowMobileDetails(true);
  };

  useEffect(() => {
    getStudents();
  }, [isVerified, showLLApplication, showDLApplication]);

  useEffect(() => {
    // console.log("Selected Student:", selectedStudent);
    // if (selectedStudent !== null) {
    //   getLicenseAppnDetails();
    // }
    if (selectedStudent) {
      // Reset all states first
      handleReset();

      // Then set student-specific states
      setOldDL(selectedStudent?.studentType === "old");

      // Set view states based on progress
      if (selectedStudent?.progress?.documentVerification === "done") {
        setShowDocVerification(false);
        setShowLLApplication(true);
        setShowForm(true);
        setIsVerified(true);

        if (
          selectedStudent?.progress?.llTestDay === "done" &&
          selectedStudent?.progress?.dlApplication !== "excluded"
        ) {
          setShowDLApplication(true);
          setShowLLApplication(false);
          setShowDLForm(true);
        }
      }

      // Handle LL specific states
      if (
        selectedStudent.progress?.llTestBooking === "done" &&
        selectedStudent.progress?.llTestDay !== "done"
      ) {
        setShowLLApplication(true);
        setShowForm(true);
      }

      // Handle completion states
      if (
        selectedStudent.progress?.llTestDay === "done" &&
        selectedStudent.progress?.dlApplication === "excluded"
      ) {
        setShowCongrats(true);
        setShowLLApplication(false);
        setShowDLApplication(false);
      }

      // Handle DL only case
      if (
        selectedStudent.progress?.llApplication === "excluded" &&
        selectedStudent.progress?.dlApplication !== "excluded"
      ) {
        setShowLLApplication(false);
        setShowDLApplication(true);
        setShowDLForm(true);
        setShowCongrats(false);
      }

      // Fetch license details after reset
      getLicenseAppnDetails().then(() => {
        // For DL view updating:
        if (dlFormData.testResult) {
          setSectionStatus((prev) => ({ ...prev, ["result"]: true }));
          setEditMode((prev) => ({ ...prev, ["result"]: false }));
          setShowEdit((prev) => ({ ...prev, ["result"]: true }));
        } else if (dlFormData.testDate && dlFormData.testTime) {
          setSectionStatus((prev) => ({ ...prev, ["testBooking"]: true }));
          setEditMode((prev) => ({ ...prev, ["testBooking"]: false }));
          setShowEdit((prev) => ({ ...prev, ["testBooking"]: true }));
        } else if (dlFormData.dateOfBirth) {
          setSectionStatus((prev) => ({
            ...prev,
            ["applicationFilling"]: true,
          }));
          setEditMode((prev) => ({ ...prev, ["applicationFilling"]: false }));
          setShowEdit((prev) => ({ ...prev, ["applicationFilling"]: true }));
        }

        // For LL view updating:
        if (llFormData.testResult) {
          setSectionStatus((prev) => ({ ...prev, ["result"]: true }));
          setEditMode((prev) => ({ ...prev, ["result"]: false }));
          setShowEdit((prev) => ({ ...prev, ["result"]: true }));
        } else if (llFormData.testDate && llFormData.testTime) {
          setSectionStatus((prev) => ({ ...prev, ["testBooking"]: true }));
          setEditMode((prev) => ({ ...prev, ["testBooking"]: false }));
          setShowEdit((prev) => ({ ...prev, ["testBooking"]: true }));
        } else if (llFormData.dateOfBirth) {
          setSectionStatus((prev) => ({
            ...prev,
            ["applicationFilling"]: true,
          }));
          setEditMode((prev) => ({ ...prev, ["applicationFilling"]: false }));
          setShowEdit((prev) => ({ ...prev, ["applicationFilling"]: true }));
        }
      });
    } else {
      // If no student selected, reset everything
      handleReset();
      setShowMobileDetails(false);
    }
  }, [selectedStudent]);

  // useEffect(() => {
  //   setOldDL(selectedStudent?.studentType === "old" ? true : false);
  //   if (selectedStudent?.progress?.documentVerification === "done") {
  //     setShowDocVerification(false);
  //     setShowLLApplication(true);
  //     setShowForm(true);
  //     if (
  //       selectedStudent?.progress?.llTestDay === "done" &&
  //       selectedStudent?.progress?.dlApplication !== "excluded"
  //     ) {
  //       setShowDLApplication(true);
  //       setShowLLApplication(false);
  //       setShowDLForm(true);
  //     }
  //     setIsVerified(true);
  //   } else {
  //     setShowDocVerification(true);
  //     setShowLLApplication(false);
  //     setIsVerified(false);
  //   }
  // }, [selectedStudent]);

  // useEffect(() => {
  //   if (
  //     selectedStudent &&
  //     selectedStudent.progress?.llTestBooking === "done" &&
  //     selectedStudent.progress?.llTestDay !== "done"
  //   ) {
  //     setShowLLApplication(true);
  //     setShowForm(true);
  //   }
  //   if (
  //     selectedStudent &&
  //     selectedStudent.progress?.llTestDay === "done" &&
  //     selectedStudent.progress?.dlApplication === "excluded"
  //   ) {
  //     setShowCongrats(true);
  //     setShowLLApplication(false);
  //     setShowDLApplication(false);
  //   }
  //   if (
  //     selectedStudent &&
  //     selectedStudent.progress?.llApplication === "excluded" &&
  //     selectedStudent.progress?.dlApplication !== "excluded"
  //   ) {
  //     setShowLLApplication(false);
  //     setShowDLApplication(true);
  //     setShowDLForm(true);
  //     setShowCongrats(false);
  //   }
  // }, [selectedStudent]);

  // useEffect(() => {
  //   if (showDLApplication || showLLApplication) {
  //     setShowCongrats(false);
  //   }
  // }, [showLLApplication, showDLApplication, showCongrats]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="flex flex-col lg:flex-row">
        {/* Students List */}
        <div
          className={`w-full lg:w-80 bg-white dark:bg-gray-900 lg:min-h-screen border-r border-gray-200 dark:border-gray-700 ${
            showMobileDetails ? "hidden lg:block" : "block"
          }`}
        >
          <div className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-4 rounded-lg text-sm md:text-base lg:hidden">
            For the best experience, please use a desktop or larger screen.
          </div>
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              My Students
            </h2>
            <div className="relative mb-2">
              <input
                type="text"
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-2 border dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>
          </div>

          <div className="overflow-y-auto h-[calc(100vh-120px)]">
            {filteredStudents.map((student) => (
              <div
                key={student.id}
                onClick={() => handleStudentClick(student)}
                className={`p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                  selectedStudent?.id === student.id
                    ? "bg-blue-50 dark:bg-blue-900/20"
                    : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={student.image}
                    alt={student.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {student.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {student.phoneNumber}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div
          className={`order-first flex-1 ${!showMobileDetails ? "hidden lg:block" : "block"}`}
        >
          {/* Mobile Back Button */}
          {showMobileDetails && (
            <button
              onClick={handleBack}
              className="lg:hidden flex items-center gap-2 p-4 text-gray-600 dark:text-gray-300"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Students</span>
            </button>
          )}

          {selectedStudent ? (
            selectedStudent.progress ? (
              // Case 1: Student selected AND has progress data
              <div className="p-6">
                {/* Student Info */}
                <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm mb-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="mb-4">
                        <span className="text-gray-500 dark:text-gray-400">
                          Name :{" "}
                        </span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {selectedStudent.name}
                        </span>
                      </div>
                      <div className="mb-4">
                        <span className="text-gray-500 dark:text-gray-400">
                          PhoneNumber :{" "}
                        </span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {selectedStudent.phoneNumber}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">
                          Applicant Purpose :{" "}
                        </span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {selectedStudent.purpose}
                        </span>
                      </div>
                    </div>
                    {/* <button className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-lg flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Chat
                  </button> */}
                  </div>
                </div>

                {/* License Progress */}
                <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm">
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

                {/* Masterpiece */}
                <div className="bg-white dark:bg-gray-900 mt-4 rounded-xl">
                  {/* Document Verification Div */}
                  {showDocVerification && (
                    <div className=" mx-6 p-1 h-fit">
                      <div className="w-full h-auto bg-white dark:bg-gray-900 rounded-lg shadow-sm mb-24">
                        <h1 className="mt-4 text-xl font-semibold text-black dark:text-white">
                          Document Verification
                        </h1>

                        <div className="">
                          <div className="mt-6 border border-gray-200 dark:border-gray-700 rounded-xl p-4 space-y-6">
                            <label className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="checkbox"
                                className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-yellow-600 focus:ring-yellow-500 dark:bg-gray-700"
                                checked={aadharCard}
                                onChange={(e) =>
                                  setAadharCard(e.target.checked)
                                }
                                disabled={isVerified}
                              />
                              <span className="text-gray-700 dark:text-gray-300">
                                Aadhar card
                              </span>
                            </label>

                            <label className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="checkbox"
                                className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-yellow-600 focus:ring-yellow-500 dark:bg-gray-700"
                                checked={passportPhoto}
                                onChange={(e) =>
                                  setPassportPhoto(e.target.checked)
                                }
                                disabled={isVerified}
                              />
                              <span className="text-gray-700 dark:text-gray-300">
                                Passport-size photo and signature
                              </span>
                            </label>

                            {!selectedStudent?.progress?.llApplication && (
                              <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-yellow-600 focus:ring-yellow-500 dark:bg-gray-700"
                                  checked={lldoc}
                                  onChange={(e) => setLLdoc(e.target.checked)}
                                  disabled={isVerified}
                                />
                                <span className="text-gray-700 dark:text-gray-300">
                                  Learning License
                                </span>
                              </label>
                            )}

                            {oldDl && (
                              <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-yellow-600 focus:ring-yellow-500 dark:bg-gray-700"
                                  checked={dlDoc}
                                  onChange={(e) => setDLdoc(e.target.checked)}
                                  disabled={isVerified}
                                />
                                <span className="text-gray-700 dark:text-gray-300">
                                  Driving License
                                </span>
                              </label>
                            )}

                            <label className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="checkbox"
                                className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-yellow-600 focus:ring-yellow-500 dark:bg-gray-700"
                                checked={proofOfAge}
                                onChange={(e) =>
                                  setProofOfAge(e.target.checked)
                                }
                                disabled={isVerified}
                              />
                              <span className="text-gray-700 dark:text-gray-300">
                                Proof of age and birth place: Birth certificate
                                / 10th marks card
                              </span>
                            </label>

                            <div className="space-y-2">
                              <label className="block text-gray-700 dark:text-gray-300">
                                Proof of address (if permanent address and
                                present address are different)
                              </label>
                              <select
                                className="w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                                value={addressProof}
                                onChange={(e) =>
                                  setAddressProof(e.target.value)
                                }
                                disabled={isVerified}
                              >
                                <option value="">Select</option>
                                <option value="Same as present address">
                                  Same as present address
                                </option>
                                <option value="Water bill">Water bill</option>
                                <option value="Electricity bill">
                                  Electricity bill
                                </option>
                                <option value="Other">Other</option>
                              </select>
                            </div>

                            <div className="space-y-2">
                              <label className="block text-gray-700 dark:text-gray-300">
                                Qualification*
                              </label>
                              <select
                                className="w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                                value={qualification}
                                onChange={(e) =>
                                  setQualification(e.target.value)
                                }
                                disabled={isVerified}
                              >
                                <option value="">Select</option>
                                <option value="8th Passed">8th Passed</option>
                                <option value="10+2 or Equivalent">
                                  10+2 or Equivalent
                                </option>
                                <option value="10th Standard or Equivalent">
                                  10th Standard or Equivalent
                                </option>
                                <option value="Below 8th">Below 8th</option>
                                <option value="Diploma in any Discipline">
                                  Diploma in any Discipline
                                </option>
                                <option value="Doctorate in any Discipline">
                                  Doctorate in any Discipline
                                </option>
                                <option value="Graduate in Non Medical Sciences">
                                  Graduate in Non Medical Sciences
                                </option>
                                <option value="Graduate in any Medical Sciences">
                                  Graduate in any Medical Sciences
                                </option>
                                <option value="ITI/Certificate Course">
                                  ITI/Certificate Course
                                </option>
                                <option value="Illiterate">Illiterate</option>
                                <option value="M.Phil. in any Discipline">
                                  M.Phil. in any Discipline
                                </option>
                                <option value="Not Specified / NA">
                                  Not Specified / NA
                                </option>
                                <option value="Post Graduate Diploma in any Discipline">
                                  Post Graduate Diploma in any Discipline
                                </option>
                                <option value="Post Graduate in Non Medical Sciences">
                                  Post Graduate in Non Medical Sciences
                                </option>
                                <option value="Post Graduate in any Medical Science">
                                  Post Graduate in any Medical Science
                                </option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {!showCongrats && (
                    <div className="bottom-0 w-full flex justify-end p-4 sm:p-6">
                      <button
                        className="w-48 sm:w-52 h-10 rounded-lg flex items-center justify-center bg-yellow-400 dark:bg-yellow-500 hover:bg-yellow-500 dark:hover:bg-yellow-600 transition-colors disabled:opacity-70"
                        onClick={handleVerifyDoc}
                        disabled={isVerified}
                      >
                        {isVerified == false
                          ? `Verify Documents`
                          : `Documents Verified`}
                        {isVerified == false ? (
                          ""
                        ) : (
                          <CheckCircle className="w-4 h-4 ml-2" />
                        )}
                      </button>
                    </div>
                  )}

                  {/* LL Application Div */}
                  {showLLApplication && (
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
                      <div className="mx-auto space-y-4">
                        {/* Header */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Learning License Manager
                          </h1>
                          <div className="w-full md:w-auto">
                            <button
                              onClick={handleRTOClick}
                              className="w-full md:w-auto px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg flex items-center justify-center gap-2"
                            >
                              RTO website
                            </button>
                            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
                              Click here to reach RTO website
                            </p>
                          </div>
                        </div>

                        {showForm && (
                          <div className="space-y-6">
                            {/* Application Filling Section */}
                            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm">
                              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                                Application Details
                              </h2>

                              <div className="space-y-4 flex flex-wrap">
                                <div className="w-1/2">
                                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Application Number*
                                  </label>
                                  <div className="flex gap-2">
                                    <input
                                      type="text"
                                      value={llFormData.applicationNumber}
                                      onChange={(e) =>
                                        setllFormData((prev) => ({
                                          ...prev,
                                          applicationNumber: e.target.value,
                                        }))
                                      }
                                      disabled={
                                        sectionStatus.applicationFilling &&
                                        !editMode.applicationFilling
                                      }
                                      className="text-gray-900 dark:text-white flex-1 p-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
                                      placeholder="Enter application number"
                                    />
                                    <button
                                      onClick={() =>
                                        copyToClipboard(
                                          llFormData.applicationNumber,
                                        )
                                      }
                                      className="p-2 mr-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                    >
                                      <Copy className="w-5 h-5" />
                                    </button>
                                  </div>
                                </div>

                                <div className="w-1/2">
                                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Date of Birth*
                                  </label>
                                  <input
                                    type="date"
                                    value={llFormData.dateOfBirth}
                                    onChange={(e) =>
                                      setllFormData((prev) => ({
                                        ...prev,
                                        dateOfBirth: e.target.value,
                                      }))
                                    }
                                    disabled={
                                      sectionStatus.applicationFilling &&
                                      !editMode.applicationFilling
                                    }
                                    className="w-full p-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white"
                                  />
                                </div>

                                {!showEdit.applicationFilling ? (
                                  <button
                                    onClick={async () => {
                                      // Validate FIRST, then only proceed if validation passes
                                      if (
                                        llFormData.applicationNumber &&
                                        llFormData.dateOfBirth
                                      ) {
                                        // Only update UI state after successful API call
                                        const success = await handleLLappSubmit(
                                          {
                                            applicationNumber:
                                              llFormData.applicationNumber,
                                            dateOfBirth: llFormData.dateOfBirth,
                                          },
                                        );

                                        // Only update section status if API call was successful
                                        if (success) {
                                          handleSaveSection(
                                            "applicationFilling",
                                          );
                                        }
                                      } else {
                                        toast.error(
                                          "Please fill all required fields before saving.",
                                        );
                                        // Don't call handleSaveSection() here - this was the bug!
                                      }
                                    }}
                                    className="w-48 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg"
                                  >
                                    Save & Continue
                                  </button>
                                ) : (
                                  <button
                                    onClick={() =>
                                      handleEditSection("applicationFilling")
                                    }
                                    className="w-48 px-4 py-2 border border-yellow-500 text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-lg"
                                  >
                                    Edit
                                  </button>
                                )}
                              </div>
                            </div>

                            {/* Test Booking Section */}
                            {sectionStatus.applicationFilling && (
                              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                                  LL Test Booking
                                </h2>

                                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg mb-6">
                                  <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
                                    <AlertCircle className="w-5 h-5" />
                                    <p>
                                      Call the customer to enquire about their
                                      preferred test date and time.
                                    </p>
                                  </div>
                                </div>

                                <div className="space-y-4 flex flex-wrap items-center justify-between">
                                  <div className="w-[45%]">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                      Test Date
                                    </label>
                                    <input
                                      type="date"
                                      value={llFormData.testDate}
                                      onChange={(e) =>
                                        setllFormData((prev) => ({
                                          ...prev,
                                          testDate: e.target.value,
                                        }))
                                      }
                                      disabled={
                                        sectionStatus.testBooking &&
                                        !editMode.testBooking
                                      }
                                      className="text-gray-900 dark:text-white w-full p-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 "
                                    />
                                  </div>

                                  <div className="w-[45%]">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                      Test Time
                                    </label>
                                    <input
                                      type="time"
                                      value={llFormData.testTime}
                                      onChange={(e) =>
                                        setllFormData((prev) => ({
                                          ...prev,
                                          testTime: e.target.value,
                                        }))
                                      }
                                      disabled={
                                        sectionStatus.testBooking &&
                                        !editMode.testBooking
                                      }
                                      className="text-gray-900 dark:text-white w-full p-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
                                    />
                                  </div>

                                  {!showEdit.testBooking ? (
                                    <button
                                      onClick={async () => {
                                        if (
                                          llFormData.testDate &&
                                          llFormData.testTime
                                        ) {
                                          const success =
                                            await handleLLappSubmit({
                                              testDate: llFormData.testDate,
                                              testTime: llFormData.testTime,
                                            });

                                          if (success) {
                                            handleSaveSection("testBooking");
                                          }
                                        } else {
                                          toast.error(
                                            "Please fill all required fields before saving.",
                                          );
                                        }
                                      }}
                                      className="w-48 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg"
                                    >
                                      Save & Continue
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() =>
                                        handleEditSection("testBooking")
                                      }
                                      className="w-48 px-4 py-2 border border-yellow-500 text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-lg"
                                    >
                                      Edit
                                    </button>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Test Day Section */}
                            {sectionStatus.testBooking && (
                              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                                  LL Test Day
                                </h2>

                                <div className="space-y-6">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Test Date:
                                      </label>
                                      <p className="text-gray-900 dark:text-white">
                                        {llFormData.testDate}
                                      </p>
                                    </div>
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Test Time:
                                      </label>
                                      <p className="text-gray-900 dark:text-white">
                                        {llFormData.testTime}
                                      </p>
                                    </div>
                                  </div>

                                  <div>
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                      Update test result after completion
                                    </h3>

                                    <div className="flex gap-4">
                                      <button
                                        onClick={() =>
                                          setllFormData((prev) => ({
                                            ...prev,
                                            testResult: "pass",
                                          }))
                                        }
                                        className={`flex-1 p-3 rounded-lg ${
                                          llFormData.testResult === "pass"
                                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 border-2 border-blue-500"
                                            : "bg-gray-100 dark:bg-green-800/30 text-gray-700 dark:text-gray-300"
                                        }`}
                                      >
                                        Pass
                                      </button>
                                      <button
                                        onClick={() =>
                                          setllFormData((prev) => ({
                                            ...prev,
                                            testResult: "fail",
                                          }))
                                        }
                                        className={`flex-1 p-3 rounded-lg ${
                                          llFormData.testResult === "fail"
                                            ? "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 border-2 border-red-500"
                                            : "bg-gray-100 dark:bg-red-800/25 text-gray-700 dark:text-gray-300"
                                        }`}
                                      >
                                        Fail
                                      </button>
                                    </div>
                                  </div>

                                  {!showEdit.testDay ? (
                                    <button
                                      onClick={() =>
                                        handleSaveSection("testDay")
                                      }
                                      className="w-full px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg"
                                      disabled={!llFormData.testResult}
                                    >
                                      Save & Continue
                                    </button>
                                  ) : (
                                    <button
                                      disabled={true}
                                      className="w-full px-4 py-2 border border-yellow-500 text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-lg"
                                    >
                                      Saved
                                    </button>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Result Section */}
                            {sectionStatus.testDay && (
                              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                                  Result
                                </h2>

                                <div
                                  className={`p-4 rounded-lg mb-6 ${
                                    llFormData.testResult === "pass"
                                      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200"
                                      : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200"
                                  }`}
                                >
                                  {llFormData.testResult === "pass"
                                    ? "Pass"
                                    : "Fail"}
                                </div>

                                {/* {llFormData.testResult === 'pass' && (
                              <div
                                className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6"
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                              >
                                <div className="text-center">
                                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                    Upload LL PDF or drag and drop
                                  </p>
                                  <input
                                    ref={fileInputRef}
                                    type="file"
                                    onChange={handleFileChange}
                                    accept=".pdf"
                                    className="hidden"
                                  />
                                  <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg"
                                  >
                                    Choose File
                                  </button>
                                </div>
                                {llFormData.llPdf && (
                                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 text-center">
                                    Selected file: {llFormData.llPdf.name}
                                  </p>
                                )}
                              </div>
                            )} */}

                                {llFormData.testResult === "fail" && (
                                  <div className="space-y-4">
                                    <p className="text-yellow-600 dark:text-yellow-400">
                                      You'll be able to book your next test
                                      after 10 days.
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-400">
                                      We will notify you on that day.
                                    </p>
                                    <button
                                      className="w-48 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg"
                                      onClick={handleReTest}
                                    >
                                      Re-Test
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Next Button */}
                            {/* {sectionStatus.testDay && (
                          <button
                            onClick={handleNext}
                            className={`w-48 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg ${
                              (!llFormData.llPdf && llFormData.testResult === 'pass') ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                            disabled={!llFormData.llPdf && llFormData.testResult === 'pass'}
                          >
                            Next
                          </button>
                        )} */}
                            {sectionStatus.testDay &&
                              llFormData.testResult !== "fail" && (
                                <button
                                  onClick={handleNext}
                                  className={`w-48 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg`}
                                  disabled={llFormData.testResult !== "pass"}
                                >
                                  Next
                                </button>
                              )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  {/* {llFormData.llPdf && (
                  <>
                  <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-gray-200 dark:bg-gray-600 rounded">
                          <Upload className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{llFormData.llPdf.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {(llFormData.llPdf.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => setllFormData(prev => ({ ...prev, llPdf: null }))}
                        className="text-red-500 hover:text-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                   <div>
                   <iframe src="https://www.orimi.com/pdf-test.pdf" title={llFormData.llPdf.name} width="100%" height="500px" />
                   </div>
                  </>
                )} */}

                  {/* DL application */}
                  {showDLApplication && (
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
                      <div className="mx-auto space-y-4">
                        {/* Header */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Driving License Manager
                          </h1>
                          <div className="w-full md:w-auto">
                            <button
                              onClick={handleDLRTOClick}
                              className="w-full md:w-auto px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg flex items-center justify-center gap-2"
                            >
                              RTO website
                            </button>
                            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
                              Click here to reach RTO website
                            </p>
                          </div>
                        </div>

                        {showDLForm && (
                          <div className="space-y-6">
                            {/* Application Filling Section */}
                            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm">
                              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                                Application Details
                              </h2>

                              <div className="space-y-4 flex flex-wrap items-center gap-1">
                                <div className="w-[45%]">
                                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Application Number*
                                  </label>
                                  <div className="flex gap-2">
                                    <input
                                      type="text"
                                      value={dlFormData.applicationNumber}
                                      onChange={(e) =>
                                        setdlFormData((prev) => ({
                                          ...prev,
                                          applicationNumber: e.target.value,
                                        }))
                                      }
                                      disabled={
                                        sectionStatus.applicationFilling &&
                                        !editMode.applicationFilling
                                      }
                                      className="text-gray-900 dark:text-white flex-1 p-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
                                      placeholder="Enter application number"
                                    />
                                    <button
                                      onClick={() =>
                                        copyToClipboard(
                                          dlFormData.applicationNumber,
                                        )
                                      }
                                      className="p-2 mr-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                    >
                                      <Copy className="w-5 h-5" />
                                    </button>
                                  </div>
                                </div>
                                <div className="w-[45%]">
                                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Learning License Number*
                                  </label>
                                  <div className="flex gap-2">
                                    <input
                                      type="text"
                                      value={dlFormData.llnumber}
                                      onChange={(e) =>
                                        setdlFormData((prev) => ({
                                          ...prev,
                                          llnumber: e.target.value,
                                        }))
                                      }
                                      disabled={
                                        sectionStatus.applicationFilling &&
                                        !editMode.applicationFilling
                                      }
                                      className="text-gray-900 dark:text-white flex-1 p-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
                                      placeholder="Enter learning License Number"
                                    />
                                    <button
                                      onClick={() =>
                                        copyToClipboard(dlFormData.llnumber)
                                      }
                                      className="p-2 mr-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                    >
                                      <Copy className="w-5 h-5" />
                                    </button>
                                  </div>
                                </div>

                                {oldDl && (
                                  <div className="w-[45%]">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                      Driving License Number*
                                    </label>
                                    <div className="flex gap-2">
                                      <input
                                        type="text"
                                        value={dlFormData.dlnumber}
                                        onChange={(e) =>
                                          setdlFormData((prev) => ({
                                            ...prev,
                                            dlnumber: e.target.value,
                                          }))
                                        }
                                        disabled={
                                          sectionStatus.applicationFilling &&
                                          !editMode.applicationFilling
                                        }
                                        className="text-gray-900 dark:text-white flex-1 p-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
                                        placeholder="Enter driving License Number"
                                      />
                                    </div>
                                  </div>
                                )}

                                <div className="w-[45%]">
                                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Date of Birth*
                                  </label>
                                  <input
                                    type="date"
                                    value={dlFormData.dateOfBirth}
                                    onChange={(e) =>
                                      setdlFormData((prev) => ({
                                        ...prev,
                                        dateOfBirth: e.target.value,
                                      }))
                                    }
                                    disabled={
                                      sectionStatus.applicationFilling &&
                                      !editMode.applicationFilling
                                    }
                                    className="w-full p-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white"
                                  />
                                </div>

                                {!showEdit.applicationFilling ? (
                                  <button
                                    onClick={async () => {
                                      if (
                                        dlFormData.applicationNumber &&
                                        dlFormData.dateOfBirth &&
                                        dlFormData.llnumber
                                      ) {
                                        const success =
                                          await handleDlAppnSubmit({
                                            applicationNumber:
                                              dlFormData.applicationNumber,
                                            llnumber: dlFormData.llnumber,
                                            dlnumber: dlFormData.dlnumber
                                              ? dlFormData.dlnumber
                                              : undefined,
                                            dateOfBirth: dlFormData.dateOfBirth,
                                          });

                                        if (success) {
                                          handleSaveSection(
                                            "applicationFilling",
                                          );
                                        }
                                      } else {
                                        toast.error(
                                          "Please fill all required fields before saving.",
                                        );
                                      }
                                    }}
                                    className="w-48 px-4 ml-auto py-2 h-fit bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg"
                                  >
                                    Save & Continue
                                  </button>
                                ) : (
                                  <button
                                    onClick={() =>
                                      handleEditSection("applicationFilling")
                                    }
                                    className="w-48 px-4 ml-auto py-2 h-fit border border-yellow-500 text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-lg"
                                  >
                                    Edit
                                  </button>
                                )}
                              </div>
                            </div>

                            {/* Test Booking Section */}
                            {sectionStatus.applicationFilling && (
                              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                                  DL Test Booking
                                </h2>

                                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg mb-6">
                                  <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
                                    <AlertCircle className="w-5 h-5" />
                                    <p>
                                      Call the customer to enquire about their
                                      preferred test date and time.
                                    </p>
                                  </div>
                                </div>

                                <div className="space-y-4 flex flex-wrap items-center justify-between">
                                  <div className="w-[45%]">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                      Test Date
                                    </label>
                                    <input
                                      type="date"
                                      value={dlFormData.testDate}
                                      onChange={(e) =>
                                        setdlFormData((prev) => ({
                                          ...prev,
                                          testDate: e.target.value,
                                        }))
                                      }
                                      disabled={
                                        sectionStatus.testBooking &&
                                        !editMode.testBooking
                                      }
                                      className="text-gray-900 dark:text-white w-full p-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 "
                                    />
                                  </div>

                                  <div className="w-[45%]">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                      Test Time
                                    </label>
                                    <input
                                      type="time"
                                      value={dlFormData.testTime}
                                      onChange={(e) =>
                                        setdlFormData((prev) => ({
                                          ...prev,
                                          testTime: e.target.value,
                                        }))
                                      }
                                      disabled={
                                        sectionStatus.testBooking &&
                                        !editMode.testBooking
                                      }
                                      className="text-gray-900 dark:text-white w-full p-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
                                    />
                                  </div>

                                  {!showEdit.testBooking ? (
                                    <button
                                      onClick={async () => {
                                        if (
                                          dlFormData.testDate &&
                                          dlFormData.testTime
                                        ) {
                                          const success =
                                            await handleDlAppnSubmit({
                                              testDate: dlFormData.testDate,
                                              testTime: dlFormData.testTime,
                                            });

                                          if (success) {
                                            handleSaveSection("testBooking");
                                          }
                                        } else {
                                          toast.error(
                                            "Please fill all required fields before saving.",
                                          );
                                        }
                                      }}
                                      className="w-48 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg"
                                    >
                                      Save & Continue
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() =>
                                        handleEditSection("testBooking")
                                      }
                                      className="w-48 px-4 py-2 border border-yellow-500 text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-lg"
                                    >
                                      Edit
                                    </button>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Test Day Section */}
                            {sectionStatus.testBooking && (
                              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                                  DL Test Day
                                </h2>

                                <div className="space-y-6">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Test Date:
                                      </label>
                                      <p className="text-gray-900 dark:text-white">
                                        {dlFormData.testDate}
                                      </p>
                                    </div>
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Test Time:
                                      </label>
                                      <p className="text-gray-900 dark:text-white">
                                        {dlFormData.testTime}
                                      </p>
                                    </div>
                                  </div>

                                  <div>
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                      Update test result after completion
                                    </h3>

                                    <div className="flex gap-4">
                                      <button
                                        onClick={() =>
                                          setdlFormData((prev) => ({
                                            ...prev,
                                            testResult: "pass",
                                          }))
                                        }
                                        className={`flex-1 p-3 rounded-lg ${
                                          dlFormData.testResult === "pass"
                                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 border-2 border-blue-500"
                                            : "bg-gray-100 dark:bg-green-800/30 text-gray-700 dark:text-gray-300"
                                        }`}
                                      >
                                        Pass
                                      </button>
                                      <button
                                        onClick={() =>
                                          setdlFormData((prev) => ({
                                            ...prev,
                                            testResult: "fail",
                                          }))
                                        }
                                        className={`flex-1 p-3 rounded-lg ${
                                          dlFormData.testResult === "fail"
                                            ? "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 border-2 border-red-500"
                                            : "bg-gray-100 dark:bg-red-800/30 text-gray-700 dark:text-gray-300"
                                        }`}
                                      >
                                        Fail
                                      </button>
                                    </div>
                                  </div>

                                  {!showEdit.testDay ? (
                                    <button
                                      onClick={() =>
                                        handleSaveSection("testDay")
                                      }
                                      className="w-full px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg"
                                      disabled={!dlFormData.testResult}
                                    >
                                      Save & Continue
                                    </button>
                                  ) : (
                                    <button
                                      disabled={true}
                                      className="w-full px-4 py-2 border border-yellow-500 text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-lg"
                                    >
                                      Saved
                                    </button>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Result Section */}
                            {sectionStatus.testDay && (
                              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                                  Result
                                </h2>

                                <div
                                  className={`p-4 rounded-lg mb-6 ${
                                    dlFormData.testResult === "pass"
                                      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200"
                                      : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200"
                                  }`}
                                >
                                  {dlFormData.testResult === "pass"
                                    ? "Pass"
                                    : "Fail"}
                                </div>

                                {/* {dlFormData.testResult === 'pass' && (
                                <div
                                  className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6"
                                  onDrop={handleDrop}
                                  onDragOver={handleDragOver}
                                >
                                  <div className="text-center">
                                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                      Upload DL PDF or drag and drop (Optional)
                                    </p>
                                    <input
                                      ref={fileInputRef}
                                      type="file"
                                      onChange={handleFileChange}
                                      accept=".pdf"
                                      className="hidden"
                                    />
                                    <button
                                      onClick={() => fileInputRef.current?.click()}
                                      className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg"
                                    >
                                      Choose File
                                    </button>
                                  </div>
                                  {dlFormData.dlPdf && (
                                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 text-center">
                                      Selected file: {dlFormData.dlPdf.name}
                                    </p>
                                  )}
                                </div>
                              )} */}

                                {dlFormData.testResult === "fail" && (
                                  <div className="space-y-4">
                                    <p className="text-yellow-600 dark:text-yellow-400">
                                      You'll be able to book your next test
                                      after 10 days.
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-400">
                                      We will notify you on that day.
                                    </p>
                                    <button
                                      className="w-48 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg"
                                      onClick={handleDLReTest}
                                    >
                                      Re-Test
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Next Button */}
                            {sectionStatus.testDay &&
                              dlFormData.testResult !== "fail" && (
                                <button
                                  onClick={handleDLNext}
                                  className={`w-48 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg`}
                                  disabled={dlFormData.testResult === null}
                                >
                                  Submit Application
                                </button>
                              )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {showCongrats && (
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 md:p-6 text-center">
                      <h2 className="text-2xl font-bold text-main dark:text-mainLightest">
                        Congratulations!
                      </h2>
                      <p className="mt-2 text-md text-black dark:text-white font-medium">
                        License process completed successfully.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // Case 2: Student selected BUT no progress data (null/undefined)
              <div className="flex flex-col items-center justify-center p-8 bg-white dark:bg-gray-950">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                    <FileText className="w-10 h-10 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="text-center max-w-md">
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
                </div>
                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 w-full max-w-md">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-white text-xs font-bold">i</span>
                    </div>
                    <div className="text-sm text-blue-800 dark:text-blue-200">
                      <p className="font-medium mb-1">Next Steps:</p>
                      <ul className="space-y-1 text-xs">
                        <li>• Contact student via phone or message</li>
                        <li>• Guide them through course enrollment</li>
                        <li>• Ensure license preferences are submitted</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )
          ) : (
            // Case 3: No student selected
            <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
              Select a student to view license progress
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LicenseProcess;
