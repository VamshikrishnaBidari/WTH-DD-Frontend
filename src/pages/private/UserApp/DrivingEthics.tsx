import React from "react";
import { ArrowLeft } from "lucide-react";

interface Question {
  id: string;
  question: string;
  answer: string;
}

const questions: Question[] = [
  {
    id: "1",
    question: "What should you do when pedestrians are waiting at a crossing?",
    answer:
      "Stop your vehicle and wait until pedestrians safely cross the road before proceeding.",
  },
  {
    id: "2",
    question:
      "Is it permissible to drive under the influence of alcohol, and what are the consequences?",
    answer:
      "Driving under the influence is prohibited for all vehicles. If caught, you face up to six months imprisonment, a fine of up to 2000, or both.",
  },
  {
    id: "3",
    question: "How does alcohol affect driving ability?",
    answer:
      "Alcohol reduces concentration and attention, impairing safe driving.",
  },
  {
    id: "4",
    question: "Where should drivers avoid using the vehicle horn?",
    answer:
      "Do not use the horn near hospitals, courts, or other areas designated as no-horn zones by authorities.",
  },
  {
    id: "5",
    question: "What type of horn is allowed for vehicles?",
    answer: "Only electric horns are permitted for vehicle use.",
  },
  {
    id: "6",
    question: "What precautions should be taken when refueling a vehicle?",
    answer: "Avoid smoking while refueling to prevent fire hazards.",
  },
  {
    id: "7",
    question: "Can you use a mobile phone while driving?",
    answer:
      "Using a mobile phone while driving is prohibited to maintain focus.",
  },
  {
    id: "8",
    question: "Should you use the horn when overtaking near a hospital?",
    answer:
      "Avoid using the horn when overtaking near a hospital to maintain a quiet environment.",
  },
  {
    id: "9",
    question:
      "What are the rules for a learner's license holder riding a motorcycle?",
    answer:
      "A learner's license holder must not carry passengers except an instructor with a valid motorcycle license for training.",
  },
  {
    id: "10",
    question: "What is defensive driving?",
    answer:
      "Defensive driving means driving cautiously, anticipating potential rule violations by others.",
  },
  {
    id: "11",
    question: "Why is zig-zag driving hazardous?",
    answer:
      "Zig-zag driving is dangerous for all road users, increasing collision risks.",
  },
  {
    id: "12",
    question: "Why must you wear a helmet when riding a two-wheeler?",
    answer:
      "Wearing a helmet is essential for rider safety, protecting against head injuries.",
  },
  {
    id: "13",
    question:
      "What should you do behind a stopped bus picking up or dropping off passengers?",
    answer:
      "Wait patiently behind a stopped bus until it moves or it's safe to proceed.",
  },
  {
    id: "14",
    question: "How should you respond to reckless driving by others?",
    answer:
      "Avoid reacting to reckless behavior by other drivers to stay safe and focused.",
  },
  {
    id: "15",
    question: "What are the dangers of noise pollution from vehicles?",
    answer:
      "a) How does noise pollution affect mental state?\nNoise pollution disturbs mental equilibrium, reducing driver focus.\n\nb) How does noise pollution impact driving?\nIt disrupts concentration, increasing accident risks.",
  },
  {
    id: "16",
    question: "What mindset should you adopt after a traffic violation fine?",
    answer: "View a traffic fine as a chance to improve your driving behavior.",
  },
];

const DrivingEthics: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header with back button */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Driving Ethics
          </h1>
          <button
            onClick={() => onBack()}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Back</span>
          </button>
        </div>

        {/* Introduction */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 md:p-6 mb-6">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Driving ethically ensures safety and respect on the road. This guide
            addresses key principles for responsible driving behavior.
          </p>
        </div>

        {/* Questions and Answers */}
        <div className="space-y-6">
          {questions.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
            >
              {/* Question */}
              <div className="p-4 md:p-6 border-b border-gray-100 dark:border-gray-700">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white flex gap-2">
                  <span className="text-blue-600 dark:text-blue-400">
                    Q.{item.id}
                  </span>
                  {item.question}
                </h2>
              </div>

              {/* Answer */}
              <div className="p-4 md:p-6 bg-gray-50 dark:bg-gray-800/50">
                <div className="flex gap-2">
                  <span className="text-blue-600 dark:text-blue-400 font-medium">
                    Ans
                  </span>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DrivingEthics;
