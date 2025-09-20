import React, { useState, useEffect } from "react";
import { Timer } from "lucide-react";
import { Question } from "../../../utils/theoryQuestions";
import { theoryQuestions } from "../../../utils/theoryQuestions";
import { trafficSignQuestions } from "../../../utils/trafficSignQuestions";
import api from "../../../utils/axiosInstance";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { User } from "../../../interfaces/models";

function getRandomQuestions<T>(arr: T[], n: number): T[] {
  const shuffled = arr.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

const questions: Question[] = (() => {
  const selectedTheory = getRandomQuestions(theoryQuestions, 7);
  const selectedSigns = getRandomQuestions(trafficSignQuestions, 8);
  const combined = [...selectedTheory, ...selectedSigns];
  // Shuffle the combined array for randomness
  return combined.sort(() => 0.5 - Math.random());
})();

const MockTest: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, string>
  >({});
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [showQuestion, setShowQuestion] = useState<boolean>(false);
  const [isTestComplete, setIsTestComplete] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [showDetailedResults, setShowDetailedResults] = useState(false);
  const [detailedTab, setDetailedTab] = useState<"mistakes" | "correct">(
    "mistakes",
  );
  const user = useSelector(
    (state: RootState) => state.auth.user,
  ) as User | null;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isTestComplete) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === 0) {
            handleNextQuestion();
            return 60;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [currentQuestion, isTestComplete]);

  const handleScoreSubmission = async () => {
    try {
      const response = await api.post("/users/mock-test-score", {
        userId: user?.id,
        score,
      });
      if (response.status === 200) {
        toast.success("Score submitted!");
      }
    } catch (error) {
      console.error("Error submitting score:", error);
    }
  };

  useEffect(() => {
    if (isTestComplete && user?.id) {
      handleScoreSubmission();
    }
  }, [isTestComplete, score]);

  const handleAnswerSelect = (optionId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion]: optionId,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion === questions.length - 1) {
      calculateScore();
      return;
    }
    setCurrentQuestion((prev) => prev + 1);
    setTimeLeft(60);
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    Object.entries(selectedAnswers).forEach(([questionIndex, answer]) => {
      if (questions[Number(questionIndex)].correctAnswer === answer) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
    setIsTestComplete(true);
  };

  const getDetailedResults = () => {
    return questions.map((q, idx) => {
      const userAnswer = selectedAnswers[idx];
      const isCorrect = userAnswer === q.correctAnswer;
      const isAnswered = userAnswer !== undefined;
      return {
        ...q,
        index: idx,
        userAnswer,
        isCorrect,
        isAnswered,
      };
    });
  };

  const answeredQuestions = Object.keys(selectedAnswers).length;
  const unansweredQuestions = questions.length - answeredQuestions;

  if (isTestComplete && showDetailedResults) {
    const detailedResults = getDetailedResults();
    const filteredResults = detailedResults.filter((r) =>
      detailedTab === "mistakes"
        ? !r.isCorrect // mistakes and unanswered
        : r.isCorrect,
    );
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-6">
        <div className="max-w-5xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 relative">
          {/* Headline */}
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Result Analysis
          </h2>
          {/* Toggle Buttons */}
          <div className="flex mb-6">
            <button
              className={`px-6 py-2 rounded-l-lg font-semibold border ${
                detailedTab === "mistakes"
                  ? "bg-red-100 text-red-700 border-red-300"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700"
              }`}
              onClick={() => setDetailedTab("mistakes")}
            >
              Mistakes
            </button>
            <button
              className={`px-6 py-2 rounded-r-lg font-semibold border-t border-b border-r ${
                detailedTab === "correct"
                  ? "bg-blue-100 text-blue-700 border-blue-300"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700"
              }`}
              onClick={() => setDetailedTab("correct")}
            >
              Correct
            </button>
          </div>
          {/* Questions List */}
          <div className="space-y-8">
            {filteredResults.length === 0 && (
              <div className="text-center text-gray-500 dark:text-gray-400 py-12">
                No{" "}
                {detailedTab === "mistakes"
                  ? "mistakes or unanswered"
                  : "correct"}{" "}
                questions.
              </div>
            )}
            {filteredResults.map((q) => (
              <div
                key={q.index}
                className="bg-gray-50 dark:bg-gray-900 rounded-lg shadow p-4"
              >
                {/* Question */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold text-gray-900 dark:text-white">
                    Q.{q.index + 1}
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {q.question}
                  </span>
                </div>
                {q.image && (
                  <div className="flex justify-center mb-2">
                    <img
                      src={q.image}
                      alt="Question"
                      className="h-24 object-contain"
                    />
                  </div>
                )}
                {/* Options */}
                <div className="space-y-2">
                  {q.options.map((option) => {
                    // Option background logic
                    let bg = "bg-white dark:bg-gray-900";
                    if (option.id === q.correctAnswer) {
                      bg = "bg-green-100 dark:bg-green-900/30";
                    }
                    if (q.userAnswer === option.id && !q.isCorrect) {
                      bg = "bg-red-100 dark:bg-red-900/30";
                    }
                    // Unanswered: highlight nothing except correct
                    return (
                      <div
                        key={option.id}
                        className={`flex items-center gap-3 rounded border px-4 py-2 ${bg} ${
                          option.id === q.correctAnswer
                            ? "border-green-500 dark:border-green-400"
                            : q.userAnswer === option.id && !q.isCorrect
                              ? "border-red-500 dark:border-red-400"
                              : "border-gray-200 dark:border-gray-700"
                        }`}
                      >
                        <span className="font-bold min-w-[20px] text-gray-900 dark:text-gray-100">
                          {option.id}.
                        </span>
                        {option.image ? (
                          <img
                            src={option.image}
                            alt={`Option ${option.id}`}
                            className="h-12 object-contain"
                          />
                        ) : (
                          <span className="text-gray-700 dark:text-gray-200">
                            {option.text}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
                {/* Unanswered note */}
                {!q.isAnswered && (
                  <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300 font-medium">
                    You did not answer this question.
                  </div>
                )}
              </div>
            ))}
          </div>
          {/* Back Button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setShowDetailedResults(false)}
              className="px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium rounded-lg transition-colors"
            >
              Back to Results
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isTestComplete) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-6">
        <button
          onClick={() => navigate("/user/signals-quizzes")}
          className="mb-2 flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
          <span className="hidden sm:inline">Back to Knowledge Section</span>
        </button>
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Test Results
          </h2>

          <div className="flex justify-between items-center mb-8">
            <div>
              <p className="text-gray-600 dark:text-gray-400">
                Total Questions: {questions.length}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Correct Answers: {score}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Wrong Answers: {questions.length - score}
              </p>
            </div>
            <div className="w-32 h-32 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {score}/{questions.length}
                </span>
              </div>
              {/* Progress Circle */}
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  className="stroke-current text-gray-200 dark:text-gray-700"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  className="stroke-current text-blue-600 dark:text-blue-400"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${(score / questions.length) * 351.86} 351.86`}
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {score < 10 && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
              <p className="text-red-700 dark:text-red-300">
                "Keep going! Every attempt is a step closer. Learn from your
                errors, keep practicing, and success will follow!"
              </p>
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={() => window.location.reload()}
              className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-3 rounded-lg transition-colors"
            >
              Take Test Again
            </button>
            <button
              onClick={() => setShowDetailedResults(true)}
              className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium py-3 rounded-lg transition-colors"
            >
              View Detailed Results
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!showQuestion) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-6">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Header Section */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between py-0.5">
              <h1 className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">
                Learner's License Mock Test
              </h1>
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  ></path>
                </svg>
                <span className="hidden sm:inline">Back</span>
              </button>
            </div>
          </div>

          {/* Main Content Section */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Test Information */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Test Format
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed">
                    This test is a simulated version of the actual Learner's
                    Licence (LL) test conducted by the RTO. It is designed to
                    help you experience the real exam environment with the same
                    rules and structure.
                  </p>
                </div>

                {/* Test Details */}
                <div className="space-y-4">
                  <div className="flex items-start gap-2">
                    <span className="text-gray-600 dark:text-gray-400">
                      - Total Questions:
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      15
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-gray-600 dark:text-gray-400">
                      - Question Type:
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      Multiple Choice (Text or Image-based)
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-gray-600 dark:text-gray-400">
                      - Time per Question:
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      30 seconds
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-gray-600 dark:text-gray-400">
                      - Passing Criteria:
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      10 correct answers
                    </span>
                  </div>
                </div>

                {/* Tip Section */}
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4 border border-yellow-200 dark:border-yellow-800">
                  <div className="flex items-start gap-2">
                    <span className="font-semibold text-yellow-800 dark:text-yellow-200">
                      💡 Tip:
                    </span>
                    <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                      Read Each Question Carefully: Take your time to understand
                      each question. Misunderstanding them can lead to mistakes,
                      even if you know the answer.
                    </p>
                  </div>
                </div>
              </div>

              {/* Image Section */}
              <div className="relative h-[300px] lg:h-auto">
                <img
                  src="https://image-resource.creatie.ai/155238777211102/155238777211104/8b448b8c65f2d73c52d0208ba8c5dbf2.jpg"
                  alt="Mock Test Illustration"
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Start Button */}
          <div className="flex justify-center md:justify-start">
            <button
              onClick={() => setShowQuestion(true)}
              className="px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium rounded-lg transition-colors shadow-sm hover:shadow-md w-full md:w-auto"
            >
              Start Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-6">
      {/* Headline */}
      <h1 className="text-xl font-bold text-center text-blue-700 dark:text-blue-300 mb-2">
        Learning License Mock Test
      </h1>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="md:hidden fixed bottom-4 right-4 z-50 bg-white dark:bg-gray-900 p-2 rounded-lg shadow-lg text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        {"Show All Questions"}
      </button>

      {/* Overlay for sidebar in mobile view */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}

      <div className="flex flex-col md:flex-row gap-6">
        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 mb-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Question {currentQuestion + 1}
              </h2>
              {/* Show question image if present */}
              {questions[currentQuestion].image && (
                <div className="flex justify-center mb-4">
                  <img
                    src={questions[currentQuestion].image}
                    alt="Question"
                    className="h-32 object-contain"
                  />
                </div>
              )}
              <p className="text-gray-700 dark:text-gray-300">
                {questions[currentQuestion].question}
              </p>
            </div>

            <div className="space-y-4">
              {questions[currentQuestion].options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleAnswerSelect(option.id)}
                  className={`w-full p-4 rounded-lg border-2 transition-colors ${
                    selectedAnswers[currentQuestion] === option.id
                      ? "border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      : "border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600"
                  }`}
                >
                  <span className="text-gray-700 dark:text-gray-200">
                    {option.text}
                  </span>
                  {/* Show option image if present */}
                  {option.image && (
                    <div className="flex justify-center mt-2">
                      <img
                        src={option.image}
                        alt={`Option ${option.id}`}
                        className="h-24 object-contain"
                      />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-gray-600 dark:text-gray-400">
                  Question:
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {currentQuestion + 1} / {questions.length}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full">
                <Timer className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="font-medium text-blue-600 dark:text-blue-400">
                  {timeLeft}s
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              {/* Removed Previous button */}
              <div className="flex-1" />
              <button
                onClick={handleNextQuestion}
                className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-3 rounded-lg transition-colors"
              >
                {currentQuestion === questions.length - 1 ? "Submit" : "Next"}
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div
          className={`fixed md:static top-0 right-0 h-full w-80 bg-white dark:bg-gray-900 shadow-lg md:shadow-none transform transition-transform duration-300 ${
            showSidebar ? "translate-x-0" : "translate-x-full md:translate-x-0"
          } z-40`}
        >
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Questions
            </h3>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Total Questions:
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {questions.length}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Answered:
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {answeredQuestions}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Unanswered:
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {unansweredQuestions}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-colors select-none
                    ${
                      selectedAnswers[index]
                        ? "bg-blue-600 dark:bg-blue-500 text-white"
                        : "bg-[#edcabe] bg-opacity-70 text-white" // reddish brown for unanswered
                    }
                  `}
                  // Not clickable anymore
                >
                  {index + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockTest;
