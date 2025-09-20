import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import api from "../../../utils/axiosInstance";
import { toast } from "sonner";
// import { setUser } from '../../../features/authSlice';
import { User, Course } from "../../../interfaces/models";
import axios from "axios";

interface QueryOption {
  id: string;
  text: string;
}

interface SubmitData {
  userId?: string;
  person?: "new" | "old"; // new means no license, old means has a Driving license
  purpose?: string; // purpose of getting the license
  progress: {
    documentVerification: "done" | "pending" | "excluded";
    dlApplication: "done" | "pending" | "excluded";
    dlTestBooking: "done" | "pending" | "excluded";
    dlTestDay: "done" | "pending" | "excluded";
    llApplication: "done" | "pending" | "excluded";
    llTestBooking: "done" | "pending" | "excluded";
    llTestDay: "done" | "pending" | "excluded";
  };
}

type Step = 1 | 2 | 3 | 4;

interface FirstDayQueriesProps {
  vehicle?: string; // Optional prop to specify vehicle type
  isOpen: boolean;
  onClose: () => void;
  mode: "single" | "multiple"; // Mode to determine if single or multiple vehicle queries
}

const FirstDayQueries: React.FC<FirstDayQueriesProps> = ({
  vehicle = "bike",
  isOpen,
  onClose,
  mode = "single", // Default to single mode
}) => {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user) as User;
  const userCourses = useSelector(
    (state: RootState) => state.course.courses,
  ) as Course[];
  // const dispatch = useDispatch();

  if (!isOpen) return null;

  let vehicleLabel = "";
  if (userCourses.length === 1) {
    if (userCourses[0].type === "two-wheeler") {
      vehicleLabel = "(car)";
    } else if (userCourses[0].type === "four-wheeler") {
      vehicleLabel = "(scooter/bike)";
    }
  }

  // Questions and options based on mode
  const singleQuestions = {
    1: `Do you want a driving license for ${vehicle}?`,
    2: `Do you already have a learning license for ${vehicle}?`,
    3: `Do you know how to drive any other vehicle ${vehicleLabel} and already have a license?`,
    4: `Are you looking to get a driving license for both two-wheeler and four-wheeler?`,
    5: `Do you want to learn both and get a license at once?`,
  };

  const multipleQuestions = {
    1: `Do you have driving license for both ${vehicle}?`,
    2: `Do you have Learning License for ${vehicle}?`,
  };

  const getOptions = (step: number): QueryOption[] => {
    if (mode === "multiple") {
      switch (step) {
        case 1:
          return [
            { id: "opt1", text: `Yes, I have DL for both.` },
            { id: "opt2", text: `No, I don't have DL for both.` },
          ];
        case 2:
          return [
            { id: "opt1", text: `Yes, I have.` },
            { id: "opt2", text: `No, I don't.` },
          ];
        default:
          return [];
      }
    } else {
      switch (step) {
        case 1:
          return [
            {
              id: "opt1",
              text: `Yes, I want a driving license for ${vehicle}.`,
            },
            { id: "opt2", text: "No, not at this time." },
          ];
        case 2:
          return [
            {
              id: "opt1",
              text: `Yes, I have a learning license for ${vehicle}.`,
            },
            { id: "opt2", text: "No, I do not hold any learning license." },
          ];
        case 3:
          return [
            {
              id: "opt1",
              text: "I know how to drive but do not have any license.",
            },
            {
              id: "opt2",
              text: "I know how to drive and already have a license.",
            },
            {
              id: "opt3",
              text: "I do not know how to drive and do not have any license.",
            },
            {
              id: "opt4",
              text: "I do not know how to drive but hold a license.",
            },
          ];
        case 4:
          return [
            { id: "opt1", text: `Yes, I want.` },
            { id: "opt2", text: `No, I'll see later.` },
          ];
        default:
          return [];
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as Step);
      setSelectedOption(answers[currentStep - 1] || "");
    }
  };

  const handleSubmit = async (finalAnswers: Record<number, string>) => {
    console.log("HandleSubmit Final Answers:", finalAnswers); // Line 97
    let submitData: SubmitData;
    if (mode === "multiple") {
      submitData = {
        userId: user.id,
        person: finalAnswers[1] === "opt2" ? "new" : "old",
        purpose:
          finalAnswers[1] === "opt2"
            ? `Learning License for ${vehicle}.`
            : `License assistance not required.`,
        progress: {
          documentVerification: "pending",
          dlApplication: finalAnswers[1] === "opt2" ? "pending" : "excluded",
          dlTestBooking: finalAnswers[1] === "opt2" ? "pending" : "excluded",
          dlTestDay: finalAnswers[1] === "opt2" ? "pending" : "excluded",
          llApplication: finalAnswers[2] === "opt2" ? "pending" : "excluded",
          llTestBooking: finalAnswers[2] === "opt2" ? "pending" : "excluded",
          llTestDay: finalAnswers[2] === "opt2" ? "pending" : "excluded",
        },
      };
    } else {
      submitData = {
        userId: user.id,
        person:
          finalAnswers[3] === "opt2" || finalAnswers[3] === "opt4"
            ? "old"
            : "new",
        purpose:
          finalAnswers[4] === "opt1"
            ? finalAnswers[1] === "opt2"
              ? "Learning License for both two-wheeler and four-wheeler."
              : "License for both two-wheeler and four-wheeler."
            : finalAnswers[1] === "opt2"
              ? `Learning License for ${vehicle} only.`
              : `License for ${vehicle} only.`,
        progress: {
          documentVerification: "pending",
          dlApplication: finalAnswers[1] === "opt1" ? "pending" : "excluded",
          dlTestBooking: finalAnswers[1] === "opt1" ? "pending" : "excluded",
          dlTestDay: finalAnswers[1] === "opt1" ? "pending" : "excluded",
          llApplication: finalAnswers[2] === "opt2" ? "pending" : "excluded",
          llTestBooking: finalAnswers[2] === "opt2" ? "pending" : "excluded",
          llTestDay: finalAnswers[2] === "opt2" ? "pending" : "excluded",
        },
      };
    }
    console.log("Submit Data:", submitData); // Debugging line

    try {
      const response = await api.post("/users/license-preferences", submitData);
      if (response && response.data && response.data.success === true) {
        toast.success("Preferences submitted successfully!");
        // dispatch(setUser(response.data.user));
        console.log(response.data.result);

        if (userCourses && userCourses.length > 0) {
          try {
            for (const data of userCourses) {
              const course = {
                userId: user?.id,
                vehicle: data.vehicle,
                type:
                  data.vehicle === "bike" || data.vehicle === "scooter/activa"
                    ? "two-wheeler"
                    : "four-wheeler",
                amount: data.amount || 100,
                classesTotal: data.classesTotal || 15,
                schoolId: import.meta.env.VITE_SCHOOL_ID, // Ensure this is correct or dynamic if needed
                installments: data.installments, // Ensure this property exists on 'data'
                classStart: data.classStart, // Ensure this property exists on 'data'
                expiresAt: data.expiresAt, // Ensure this property exists on 'data'
                classDuration: data.classDuration || 60,
              };
              const courseResponse = await api.post("/courses/create", course);
              if (
                courseResponse &&
                courseResponse.data &&
                courseResponse.data.success
              ) {
                // Consider dispatching course updates here if needed: dispatch(addCourse(courseResponse.data.data));
                toast.success(
                  `Successfully enrolled in course for ${data.vehicle}.`,
                );
                navigate("/user/licensing");
              } else {
                toast.error(`Failed to enroll in course for ${data.vehicle}.`);
              }
            }
            toast.success("Course(s) enrollment process completed!");
          } catch (courseError) {
            if (axios.isAxiosError(courseError)) {
              console.error(
                "[handleSubmit] Course enrollment Axios error details:",
                {
                  message: courseError.message,
                  code: courseError.code,
                  response: courseError.response?.data,
                },
              );
            }
            toast.error("An error occurred while enrolling in courses.");
          }
        } else {
          console.log("[handleSubmit] No user courses to enroll.");
        }
      } else {
        console.error(
          "[handleSubmit] Preferences API call was not successful or response format is unexpected.",
          response ? response.data : "No response data",
          "Full response object:",
          response,
        );
        toast.error("Failed to submit preferences. Please check console.");
      }
    } catch (error) {
      console.error(
        "[handleSubmit] Caught error during /users/license-preferences API call:",
        error,
      );
      if (axios.isAxiosError(error)) {
        console.error("[handleSubmit] Preferences API Axios error details:", {
          message: error.message,
          name: error.name,
          code: error.code,
          config: error.config
            ? {
                url: error.config.url,
                method: error.config.method,
                headers: error.config.headers,
                data: error.config.data,
              }
            : "No config",
          request: error.request
            ? "Request object present"
            : "No request object",
          response: error.response
            ? {
                status: error.response.status,
                data: error.response.data,
                headers: error.response.headers,
              }
            : "No response object",
        });
        if (error.code === "ERR_NETWORK") {
          toast.error(
            "Network error. Please check your connection and API server.",
          );
        } else if (error.response) {
          toast.error(
            `Failed to submit preferences: Server responded with ${error.response.status}.`,
          );
        } else {
          toast.error("Failed to submit preferences due to a request error.");
        }
      } else {
        toast.error(
          "An unexpected error occurred while submitting preferences.",
        );
      }
    }
  };

  const maxStep = mode === "multiple" ? 2 : 4;

  const handleContinue = async () => {
    if (!selectedOption) return;

    const newAnswers = { ...answers, [currentStep]: selectedOption };
    setAnswers(newAnswers);

    if (mode === "multiple") {
      if (currentStep < 2) {
        setCurrentStep((prev) => (prev + 1) as Step);
        setSelectedOption("");
      } else {
        await handleSubmit(newAnswers);
      }
      return;
    }

    // single mode logic (as before)
    if (currentStep === 3) {
      if (selectedOption === "opt2" || selectedOption === "opt4") {
        await handleSubmit(newAnswers);
        return;
      }
      if (selectedOption === "opt1" || selectedOption === "opt3") {
        setCurrentStep(4);
        setSelectedOption("");
        return;
      }
    }

    if (currentStep < 4) {
      setCurrentStep((prev) => (prev + 1) as Step);
      setSelectedOption("");
    }

    if (currentStep === 4) {
      await handleSubmit(newAnswers);
      return;
    }
  };

  const getProgressWidth = () => {
    return `${(currentStep / maxStep) * 100}%`;
  };

  return (
    <div className="z-50 fixed inset-0 min-h-screen p-4 flex items-center justify-center font-satoshi overflow-y-auto">
      <div className="fixed inset-0 bg-black/50 dark:bg-black/75 backdrop-blur-sm" />
      <div className="z-10 w-full max-w-2xl bg-white dark:bg-gray-900 rounded-lg shadow-lg mt-20">
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-2">
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                Step
              </span>
              <span className="text-blue-600 dark:text-blue-400 font-semibold">
                {currentStep} of {currentStep === 4 ? 4 : 3}
              </span>
            </div>
            <div className="w-32 h-2 bg-gray-100 dark:bg-gray-700 rounded-full">
              <div
                className="h-2 bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-300"
                style={{ width: getProgressWidth() }}
              ></div>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white text-center">
              {mode === "multiple"
                ? multipleQuestions[currentStep as 1 | 2]
                : singleQuestions[currentStep as 1 | 2 | 3 | 4 | 5]}
            </h2>

            <div className="space-y-4">
              {getOptions(currentStep).map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedOption(option.id)}
                  className={`w-full p-4 rounded-lg border-2 transition-colors ${
                    selectedOption === option.id
                      ? "border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      : "border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600"
                  }`}
                >
                  <span className="text-gray-700 dark:text-gray-200 font-medium">
                    {option.text}
                  </span>
                </button>
              ))}
            </div>

            <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
              Please select one option to proceed
            </p>
          </div>
        </div>

        <div className="px-6 md:px-8 py-6 rounded-lg bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
          <button
            onClick={currentStep === 1 ? onClose : handleBack}
            className={`flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{currentStep === 1 ? "Select Course" : "Back"}</span>
          </button>

          <button
            onClick={handleContinue}
            disabled={!selectedOption}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
              selectedOption
                ? "bg-yellow-400 hover:bg-yellow-500 text-gray-900"
                : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
            }`}
          >
            <span>Continue</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FirstDayQueries;
