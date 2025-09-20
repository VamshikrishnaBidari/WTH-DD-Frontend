import React, { useCallback, useEffect, useState } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import api from "../../../utils/axiosInstance";
import { Course } from "../../../interfaces/models";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logos/LogoDD-removebg.png";

interface Rating {
  timeManagement: number;
  explanation: number;
  doubtHandling: number;
  supportiveness: number;
}

const Reviews: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [ratings, setRatings] = useState<Rating>({
    timeManagement: 0,
    explanation: 0,
    doubtHandling: 0,
    supportiveness: 0,
  });
  const [review, setReview] = useState<string>("");
  const [schoolRating, setSchoolRating] = useState<number>(0);
  const user = useSelector((state: RootState) => state.auth.user);
  const [course, setCourse] = useState<Course>();
  const [loading, setLoading] = useState(false);
  const [studentCount, setStudentCount] = useState(0);
  const navigate = useNavigate();

  const getLatestCourse = useCallback(async () => {
    if (!user) {
      return;
    }
    try {
      setLoading(true);
      const response = await api.post("/users/all-courses", {
        id: user.id,
      });
      if (!response.data.success) {
        toast.error("Failed to fetch courses");
        setLoading(false);
        return;
      }
      const latestCompletedCourse = response.data.courses.find(
        (course: Course) =>
          course.completed === true && course.isReviewed === false,
      );
      console.log("latest", latestCompletedCourse);
      setCourse(latestCompletedCourse);
      setStudentCount(response.data.studentCount);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching latest course:", error);
      toast.error("Failed to fetch latest course");
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    getLatestCourse();
  }, [getLatestCourse]);

  const calculateAverage = (): number => {
    const values = Object.values(ratings);
    return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
  };

  const handleRatingChange = (key: keyof Rating, value: number) => {
    setRatings((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (step === 2 && !review.trim()) {
      toast.error("Please provide a review before proceeding", {
        position: "top-center",
      });
      return;
    }
    setStep((prev) => prev + 1);
  };

  const renderStars = (rating: number, onRate: (value: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            onClick={() => onRate(value)}
            className="focus:outline-none"
          >
            <Star
              className={`w-6 h-6 ${
                value <= rating
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300 dark:text-gray-600"
              }`}
            />
          </button>
        ))}
      </div>
    );
  };
  const handleReview = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): Promise<void> => {
    event.preventDefault();
    // if (schoolRating === 0) {
    //   toast.error("Please rate the driving school before proceeding");
    //   return;
    // }

    try {
      setLoading(true);
      const response = await api.post("/users/review", {
        userId: user?.id,
        teacherId: course?.teacher?.id,
        courseId: course?.id,
        rating: calculateAverage(),
        comment: review,
      });

      if (response.data.success) {
        toast.success("Review submitted successfully");
        navigate("/user");
        // setStep(3);
      } else {
        toast.error(response.data.message || "Failed to submit review");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-6 font-satoshi flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading ...</p>
        </div>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 flex flex-col items-center justify-center">
        <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 space-y-6">
          <div className="w-24 h-24 mx-auto bg-gray-200 dark:bg-gray-50 rounded-full">
            <img
              src={logo}
              alt="Logo"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400 text-center">
            Thank you for learning with us!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-center">
            We wish you a safe, and confident journey ahead.
          </p>
          <button
            onClick={handleNext}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-3 rounded-lg transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
        <div className="max-w-md mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 space-y-6">
          {/* Instructor Info */}
          <div className="flex items-center gap-4">
            <img
              src={course?.teacher?.image || ""}
              alt={course?.teacher?.name}
              className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full"
            />
            <div>
              <h2 className="font-semibold text-gray-900 dark:text-white">
                {course?.teacher?.name}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {course?.teacher?.experience || 0} years of experience
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {course?.vehicle} / {course?.teacher?.school?.name}
              </p>
            </div>
          </div>

          {/* Ratings */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Ratings
            </h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-gray-700 dark:text-gray-300">
                  Did instructor manage time and schedule?
                </p>
                {renderStars(ratings.timeManagement, (value) =>
                  handleRatingChange("timeManagement", value),
                )}
              </div>

              <div className="space-y-2">
                <p className="text-gray-700 dark:text-gray-300">
                  Did instructor explain everything promised?
                </p>
                {renderStars(ratings.explanation, (value) =>
                  handleRatingChange("explanation", value),
                )}
              </div>

              <div className="space-y-2">
                <p className="text-gray-700 dark:text-gray-300">
                  How well did instructor handle your doubts and mistakes?
                </p>
                {renderStars(ratings.doubtHandling, (value) =>
                  handleRatingChange("doubtHandling", value),
                )}
              </div>

              <div className="space-y-2">
                <p className="text-gray-700 dark:text-gray-300">
                  How respectful and supportive was your instructor?
                </p>
                {renderStars(ratings.supportiveness, (value) =>
                  handleRatingChange("supportiveness", value),
                )}
              </div>

              <div className="pt-4 border-t dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <p className="text-gray-900 dark:text-white font-semibold">
                    Overall Rating
                  </p>
                  {renderStars(calculateAverage(), () => {})}
                </div>
              </div>
            </div>
          </div>

          {/* Review */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Review*
            </h3>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              maxLength={100}
              placeholder="Write your review here..."
              className="w-full h-32 p-3 border dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              required
            />
            <p className="text-right text-sm text-gray-500 dark:text-gray-400">
              {review.length}/100 characters
            </p>
          </div>

          <button
            onClick={handleReview}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-3 rounded-lg transition-colors"
          >
            Submit
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400 text-center">
          Please rate our partner on google!
        </h1>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 space-y-4">
          <div className="w-24 h-24 mx-auto bg-gray-200 dark:bg-gray-700 rounded-lg" />

          <div className="text-center space-y-2">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {course?.teacher?.school?.name || "School Name"}
            </h2>
            <div className="flex justify-center">
              {renderStars(schoolRating, setSchoolRating)}
            </div>
            <p className="text-gray-500 dark:text-gray-400">since 2000</p>
          </div>

          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Total number of student completed:{" "}
              <span className="font-semibold">{studentCount}</span>
            </p>
            <p className="text-green-600 dark:text-green-400">+1</p>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => {}}
            className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium py-3 rounded-lg transition-colors"
          >
            Not now
          </button>
          <button
            onClick={handleReview}
            className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-3 rounded-lg transition-colors"
          >
            Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
