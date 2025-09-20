import React, { useEffect } from "react";
import { HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../../../utils/axiosInstance";
import { RootState } from "../../../app/store";
import { toast } from "sonner";
import { User } from "../../../interfaces/models";

interface QuizResult {
  correct: number;
  total: number;
  mistakes: number;
  hasTakenQuiz: boolean;
}

const LearnAndTest: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user) as User;
  const [quizResult, setQuizResult] = React.useState<QuizResult>({
    correct: 0,
    total: 15,
    mistakes: 0,
    hasTakenQuiz: false, // Set to false if no quiz taken yet
  });
  const [loading, setLoading] = React.useState(false);

  const getScore = async () => {
    if (!user?.id) {
      console.error("User ID is not available");
      return;
    }
    setLoading(true);
    try {
      const response = await api.post("/users/get-score", {
        userId: user?.id,
      });
      if (response.data.success) {
        setQuizResult((prev) => ({
          ...prev,
          correct: response.data.mockTestScore,
          mistakes: prev.total - response.data.mockTestScore,
          hasTakenQuiz:
            response.data.mockTestScore !== null &&
            response.data.mockTestScore !== undefined,
        }));
      }
    } catch (error) {
      toast.error("Error fetching quiz score");
      console.error("Error fetching quiz score:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getScore();
  }, [user?.id]);

  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {quizResult.hasTakenQuiz ? (
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Your Recent Quiz
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Results Section */}
              <div className="md:col-span-8 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Correct
                    </p>
                    <p className="text-lg font-medium text-gray-900 dark:text-white">
                      {quizResult.correct}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Mistakes
                    </p>
                    <p className="text-lg font-medium text-gray-900 dark:text-white">
                      {quizResult.mistakes}
                    </p>
                  </div>
                </div>

                <div
                  className={`${
                    quizResult.correct >= 10
                      ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                      : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
                  } border rounded-lg p-4`}
                >
                  {quizResult.correct >= 10 ? (
                    <p className="text-green-900 dark:text-green-100 font-medium">
                      Congratulations! You have passed the MOCK TEST.
                    </p>
                  ) : (
                    <p className="text-red-900 dark:text-red-100 font-medium">
                      You haven't performed well enough. With this score, you
                      may fail the actual test.
                    </p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  {/* <button className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-lg transition-colors">
                    View Detailed Results
                  </button> */}
                  <button
                    onClick={() => {
                      navigate("/user/mock-test");
                    }}
                    className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-lg transition-colors"
                  >
                    Take Quiz Again
                  </button>
                </div>
              </div>

              {/* Progress Circle */}
              <div className="md:col-span-4 flex justify-center items-center">
                <div className="flex justify-center items-center w-32 h-32 mx-auto">
                  <div className="absolute flex flex-col justify-center items-center w-32 h-32 pointer-events-none">
                    <div className="grid place-items-center w-full h-full pointer-events-none">
                      <div className="flex flex-col items-center">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          {quizResult.correct}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          /{quizResult.total}
                        </div>
                      </div>
                    </div>
                  </div>
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#E5E7EB"
                      strokeWidth="3"
                      className="dark:stroke-gray-700"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="3"
                      strokeDasharray={`${(quizResult.correct / quizResult.total) * 100}, 100`}
                      className="dark:stroke-blue-500"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm text-center">
            <HelpCircle className="w-12 h-12 mx-auto mb-4 text-blue-500" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Ready to Test Your Knowledge?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Check your understanding by attempting a mock test.
            </p>
            <button
              onClick={() => {
                navigate("/user/mock-test");
              }}
              className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-lg transition-colors"
            >
              Take Your First Quiz
            </button>
          </div>
        )}

        {/* Learning Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mock Test */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <img
              src="https://image-resource.creatie.ai/155238777211102/155238777211104/922c799f4cfd7c3bc632d194bb766cd9.png"
              className={"w-12 h-12"}
            />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Mock Test
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Quick quizzes designed to help you crack your Learner's Licence
              exam.
            </p>
            <button
              onClick={() => {
                navigate("/user/mock-test");
              }}
              className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-lg transition-colors"
            >
              Start Now
            </button>
          </div>

          {/* Practice Questions */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <img
              src="https://image-resource.creatie.ai/155238777211102/155238777211104/087dc93ea3ec4f8218c821ee76002d1f.png"
              className={"w-12 h-12"}
            />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Practice Questions
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Practice with instant feedback and clear explanations.
            </p>
            <button
              onClick={() => {
                navigate("/user/practice-questions");
              }}
              className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-lg transition-colors"
            >
              Begin Practice
            </button>
          </div>

          {/* Reading Notes */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <img
              src="https://image-resource.creatie.ai/155238777211102/155238777211104/35d68bf5cc06293274ca4fb246b96335.png"
              className={"w-12 h-12"}
            />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Reading Notes
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Key learning notes for quick reference. Essential concepts at your
              fingertips.
            </p>
            <button
              onClick={() => {
                navigate("/user/reading-material");
              }}
              className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-lg transition-colors"
            >
              Start Now
            </button>
          </div>

          {/* Hints */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <img
              src="https://image-resource.creatie.ai/155238777211102/155238777211104/a054143be8cdc402d26630baf2fecaf6.png"
              className={"w-12 h-12"}
            />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Hints
              <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                (Coming Soon)
              </span>
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Discover the creative process and thinking behind each creation.
              Insights from the makers that reveal how it all came together.
            </p>
            <button
              disabled
              className="px-6 py-2 bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 rounded-lg cursor-not-allowed"
            >
              Coming Soon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnAndTest;
