import React, { useState, useEffect } from "react";
import { RefreshCw, ArrowLeft, ArrowRight } from "lucide-react";
import { theoryQuestions, Question } from "../../../utils/theoryQuestions";
import { trafficSignQuestions } from "../../../utils/trafficSignQuestions";
import { useNavigate } from "react-router-dom";

const PracticeQuestions: React.FC = () => {
  const [activeSection, setActiveSection] = useState<"theory" | "traffic">(
    "theory",
  );
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, string>
  >({});
  const [showResults, setShowResults] = useState<Record<number, boolean>>({});
  const [stats, setStats] = useState({
    correct: 0,
    mistakes: 0,
    total: 0,
  });

  const questions =
    activeSection === "theory" ? theoryQuestions : trafficSignQuestions;
  const questionsPerPage = 3;
  const totalPages = Math.ceil(questions.length / questionsPerPage);

  useEffect(() => {
    resetQuiz();
  }, [activeSection]);

  const resetQuiz = () => {
    setSelectedAnswers({});
    setShowResults({});
    setStats({ correct: 0, mistakes: 0, total: 0 });
    setCurrentPage(0);
  };

  // Shuffle questions once per quiz reset
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);

  // Shuffle function
  function shuffleArray<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // Shuffle questions on section change or reset
  useEffect(() => {
    setShuffledQuestions(shuffleArray(questions));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSection]);

  const getCurrentQuestions = () => {
    const start = currentPage * questionsPerPage;
    return shuffledQuestions.slice(start, start + questionsPerPage);
  };

  const handleAnswerSelect = (questionId: number, answerId: string) => {
    if (showResults[questionId]) return;

    setSelectedAnswers((prev) => ({ ...prev, [questionId]: answerId }));
    setShowResults((prev) => ({ ...prev, [questionId]: true }));

    const question = questions.find((q) => q.id === questionId);
    if (question?.correctAnswer === answerId) {
      setStats((prev) => ({ ...prev, correct: prev.correct + 1 }));
    } else {
      setStats((prev) => ({ ...prev, mistakes: prev.mistakes + 1 }));
    }
    setStats((prev) => ({ ...prev, total: prev.total + 1 }));
  };

  const getOptionClassName = (questionId: number, optionId: string) => {
    if (!showResults[questionId]) {
      return "border dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700";
    }

    const question = questions.find((q) => q.id === questionId);
    if (question?.correctAnswer === optionId) {
      return "bg-green-100 dark:bg-green-900/30 border-green-500 dark:border-green-400";
    }
    if (selectedAnswers[questionId] === optionId) {
      return "bg-red-100 dark:bg-red-900/30 border-red-500 dark:border-red-400";
    }
    return "border dark:border-gray-700 opacity-50";
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">
              Practice Questions
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Note: These are practice questions. Scores won't be saved if you
              leave or refresh the page.
            </p>
          </div>
          <div className="flex gap-2 items-center">
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
            <button
              onClick={() => {
                resetQuiz();
                setShuffledQuestions(shuffleArray(questions));
              }}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>

        {/* Section Toggle */}
        <div className="flex rounded-lg bg-gray-100 dark:bg-gray-900 p-1">
          <button
            onClick={() => setActiveSection("theory")}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeSection === "theory"
                ? "bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            Theory Questions
          </button>
          <button
            onClick={() => setActiveSection("traffic")}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeSection === "traffic"
                ? "bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            Traffic Signs
          </button>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {getCurrentQuestions().map((question, index) => (
            <div
              key={question.id}
              className="bg-white dark:bg-gray-900 rounded-xl p-4 md:p-6 shadow-sm"
            >
              <div className="flex gap-4 mb-4">
                <span className="font-bold text-gray-900 dark:text-white">
                  Q.{currentPage * questionsPerPage + index + 1}
                </span>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {question.question}
                </h3>
              </div>

              {question.image && (
                <div className="flex justify-center mb-4">
                  <img
                    src={question.image}
                    alt="Question"
                    className="h-32 object-contain"
                  />
                </div>
              )}

              <div className="space-y-3">
                {question.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleAnswerSelect(question.id, option.id)}
                    disabled={showResults[question.id]}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${getOptionClassName(
                      question.id,
                      option.id,
                    )}`}
                  >
                    <span className="font-bold min-w-[20px] text-gray-900 dark:text-gray-100">
                      {option.id}.
                    </span>
                    {option.image ? (
                      <img
                        src={option.image}
                        alt={`Option ${option.id}`}
                        className="h-24 object-contain"
                      />
                    ) : (
                      <span className="text-gray-700 dark:text-gray-200">
                        {option.text}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation and Stats */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
            disabled={currentPage === 0}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </button>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-sm sm:text-base text-gray-900 dark:text-white">
            <div>
              Total attempt: <span className="font-bold">{stats.total}</span>
            </div>
            <div className="text-green-600 dark:text-green-400">
              Correct: <span className="font-bold">{stats.correct}</span>
            </div>
            <div className="text-red-600 dark:text-red-400">
              Mistakes: <span className="font-bold">{stats.mistakes}</span>
            </div>
          </div>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))
            }
            disabled={currentPage === totalPages - 1}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PracticeQuestions;
