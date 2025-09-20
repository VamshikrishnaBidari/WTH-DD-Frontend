import React, { useState, useEffect, useCallback } from "react";
import { AlertTriangle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../utils/axiosInstance";
import { toast } from "sonner";

interface Course {
  id: string;
  user: {
    id: string;
    name: string;
    image: string;
    phoneNumber: string;
  };
  type: string;
  classesTaken: number;
  classesTotal: number;
  classDuration: number;
  teacher: {
    id: string;
    school: {
      location: string;
      name: string;
      id: string;
    };
  };
  vehicle: string;
}
interface ClassData {
  title: string;
  day: number;
  description: string;
  [key: string]: any;
}

type Rating = "poor" | "average" | "moderate" | "good" | "excellent";

const LiveClass: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<1 | 2>(1);
  const [timeSpent, setTimeSpent] = useState<number>(0);
  const [finalTime, setFinalTime] = useState<number>(0);
  const totalTime = 3600; // 1 hour in seconds
  const [notes, setNotes] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [selectedRating, setSelectedRating] = useState<Rating>("good");
  const [rating, setRating] = useState(4);
  const { courseId } = useParams();
  const [course, setCourse] = useState<Course>({
    id: "",
    user: {
      id: "",
      name: "",
      image: "",
      phoneNumber: "",
    },
    type: "4 wheel driving",
    classesTaken: 0,
    classesTotal: 1,
    classDuration: 0,
    teacher: {
      id: "",
      school: {
        location: "",
        name: "",
        id: "",
      },
    },
    vehicle: "",
  });
  const [currentClassData, setCurrentClassData] = useState<ClassData | null>(
    null,
  );

  const getCourse = useCallback(async () => {
    try {
      const response = await api.post("/courses/get", { id: courseId });
      if (!response.data.success) {
        toast.error("Error fetching course data");
        return;
      }
      const courseData = response.data.data;
      setCourse(courseData);
      const syllabusres = await api.post(`/vehicleSyllabus/get`, {
        id: courseData.teacher.schoolId,
      });
      if (!syllabusres.data.success) {
        toast.error("Error fetching syllabus data");
        return;
      }

      const syllabus = syllabusres.data.syllabusData;
      console.log("syllabus", syllabus);
      console.log("courseData", courseData);
      const syllabusData = syllabus.find(
        (s: { vehicle: string }) =>
          s.vehicle.toLowerCase() === courseData.vehicle.toLowerCase(),
      );
      console.log("syllabusData", syllabusData);
      if (!syllabusData) {
        toast.error("Error fetching syllabus data");
        return;
      }
      const currentClass = syllabusData?.vehicleSyllabus.find(
        (s: { day: number }) => s.day === courseData.classesTaken + 1,
      );
      if (!currentClass) {
        toast.error("Error fetching syllabus data");
        return;
      }
      setCurrentClassData(currentClass);
    } catch (error) {
      console.log("Error fetching course data", error);
      toast.error("Error fetching course data");
    }
  }, [courseId]);
  useEffect(() => {
    getCourse();
  }, [getCourse]);

  useEffect(() => {
    if (page === 1) {
      const timer = setInterval(() => {
        setTimeSpent((prev) => {
          if (prev >= totalTime) {
            clearInterval(timer);
            return totalTime;
          }
          return prev + 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [page]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleEndClass = () => {
    setFinalTime(timeSpent);
    setPage(2);
  };

  const remainingTime = totalTime - timeSpent;

  const ratings: {
    value: Rating;
    label: string;
    emoji: string;
    num: number;
  }[] = [
    { value: "poor", label: "Poor", emoji: "😔", num: 1 },
    { value: "average", label: "Average", emoji: "😐", num: 2 },
    { value: "moderate", label: "Moderate", emoji: "🙂", num: 3 },
    { value: "good", label: "Good", emoji: "😊", num: 4 },
    { value: "excellent", label: "Excellent", emoji: "😄", num: 5 },
  ];

  const handleSubmit = async (
    e: React.FormEvent<HTMLButtonElement>,
  ): Promise<void> => {
    e.preventDefault();
    try {
      const ratingVal = ratings.find(
        (r: { num: number }) => r.num === rating,
      )?.label;
      if (!ratingVal) {
        toast.error("Please select a rating");
        return;
      }
      const response = await api.post("/courses/ratings", {
        courseId: course.id,
        rating: ratingVal,
        feedback: feedback || " ",
      });
      if (course.classesTaken + 1 == course.classesTotal) {
        const res = await api.post("/users/last-class", {
          courseId: course.id,
          userId: course.user.id,
          teacherId: course.teacher.id,
        });
        if (!res.data.success) {
          toast.error("Error updating last class");
          return;
        }
      }
      if (response.data.success) {
        toast.success("Feedback submitted successfully");
        navigate("/instructor");
      } else {
        toast.error("Error submitting feedback");
      }
    } catch (error) {
      console.log("Error submitting feedback", error);
      toast.error("Error submitting feedback");
    }
  };

  if (page === 2) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Student Info */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={
                  course.user.image ||
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop"
                }
                alt="John Smith"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {course.user.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {course.vehicle}-{course.type}
                </p>
              </div>
              <div className="ml-auto text-right">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatTime(finalTime)}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Completed
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <span className="font-medium">Progress:</span>
              <span>{course.classesTaken} classes completed</span>
            </div>
          </div>

          {/* Performance Rating */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400">
                Performance Rating
              </h3>
            </div>

            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
              Q. Overall learning performance of today
            </h4>

            <div className="grid grid-cols-5 gap-4">
              {ratings.map(({ value, label, emoji, num }) => (
                <button
                  key={value}
                  onClick={() => {
                    setSelectedRating(value);
                    setRating(num);
                  }}
                  className={`flex flex-col items-center p-4 rounded-lg transition-all ${
                    selectedRating === value
                      ? "bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-500 dark:border-blue-400"
                      : "bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-300"
                  }`}
                >
                  <span className="text-xl md:text-3xl mb-2">{emoji}</span>
                  <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                    {label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Feedback */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Quick Feedback
            </h3>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Add optional remarks about the student's performance and engagement during class..."
              className="w-full h-32 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              maxLength={100}
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-gray-500">
                {feedback.length}/100
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-3 rounded-lg transition-colors"
          >
            Submit
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">
            Class live
          </h1>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Active
          </span>
        </div>

        {/* Instructor Info & Timer */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={
                  course.user.image ||
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop"
                }
                alt="John Smith"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {course.user.name}
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                  {course.vehicle}-{course.type}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {formatTime(timeSpent)}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {formatTime(remainingTime)} remaining
              </div>
            </div>
          </div>
        </div>

        {/* Today's Focus */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Today's Focus
            </h2>
            <span className="text-gray-500 dark:text-gray-400">
              Class:{" "}
              <span className="text-gray-900 dark:text-white font-bold">
                {course.classesTaken + 1}
              </span>
            </span>
          </div>

          <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-6">
            {currentClassData?.title}
          </h3>

          <div className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
            {currentClassData?.description ||
              "No description available for the current class."}
          </div>
        </div>

        {/* Real-time Notes */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Real-time Notes
          </h2>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add notes here..."
            className="w-full h-24 p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            Save
          </button>
        </div>

        {/* Warning Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0" />
            <div>
              <h3 className="text-red-500 font-semibold mb-2">Warning</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>
                  Do not use{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    MOBILE Phone
                  </span>{" "}
                  while teaching.
                </li>
                <li>Keep your Mobile in silent mode.</li>
                <li>Check for seat belt before start.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleEndClass}
            className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium rounded-lg transition-colors"
          >
            End Class Session
          </button>
          {/* <button className="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors">
            Emergency session termination
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default LiveClass;
