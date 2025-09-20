import React from "react";
import { useNavigate } from "react-router-dom";

interface ReviewDialogProps {
  isOpen: boolean;
  onClose?: () => void;
}

const ReviewDialog: React.FC<ReviewDialogProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleSubmitReview = () => {
    // Close the dialog if onClose is provided
    if (onClose) {
      onClose();
    }

    // Navigate to the reviews page
    navigate("/user/reviews");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 pb-4">
          <div className="text-center mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Course Completed! 🎉
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Help us improve by sharing your experience
            </p>
          </div>

          {/* Important Points */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3 text-sm">
              Your feedback helps us:
            </h3>
            <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5">•</span>
                <span>
                  Maintain high-quality instruction standards and improve our
                  teaching methods
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5">•</span>
                <span>
                  Recognize outstanding instructors and provide additional
                  training where needed
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5">•</span>
                <span>
                  Enhance course content and delivery to better serve future
                  students
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          {/* Call to Action Text */}
          <div className="mb-6 text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Ready to Share Your Experience?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Your review will help future students make informed decisions and
              help us continuously improve our services.
            </p>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmitReview}
            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] text-base"
          >
            Go to Reviews
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewDialog;
