import React from "react";
import { ArrowLeft } from "lucide-react";

interface SignInfo {
  id: string;
  image: string;
  title: string;
  description: string;
}

// Combined hand signals from both sources
const signsList: SignInfo[] = [
  // Chandigarh Traffic Police - Driver Hand Signals
  {
    id: "1",
    image: "https://chandigarhtrafficpolice.gov.in/images/signals-1.jpg",
    title: "I intend to move in to the left or turn left",
    description:
      "Arm signal for turning or moving left. Used when indicators are not working or to reinforce the signal.",
  },
  {
    id: "2",
    image: "https://chandigarhtrafficpolice.gov.in/images/signals-2.jpg",
    title: "I intend to move out to the right or turn right",
    description:
      "Arm signal for turning or moving right. Used when indicators are not working or to reinforce the signal.",
  },
  {
    id: "3",
    image: "https://chandigarhtrafficpolice.gov.in/images/signals-3.jpg",
    title: "I intend to stop",
    description:
      "Arm signal for stopping the vehicle. Used to alert vehicles behind.",
  },
  {
    id: "4",
    image: "https://chandigarhtrafficpolice.gov.in/images/signals-4.jpg",
    title: "I intend to slow down",
    description:
      "Arm signal for slowing down the vehicle. Used to warn vehicles behind.",
  },
  {
    id: "5",
    image: "https://chandigarhtrafficpolice.gov.in/images/signals-5.jpg",
    title: "Indicating the car following you to overtake",
    description: "Arm signal to indicate the vehicle behind you can overtake.",
  },
  // Indian Driving Schools - Traffic Police Hand Signals (by traffic police)
  {
    id: "6",
    image:
      "https://yamunanagar.haryanapolice.gov.in/Upload/images/traffic-sign1.png",
    title: "To start one sided vehicles",
    description:
      "Hand signal by traffic police to start vehicles from one side only.",
  },
  {
    id: "7",
    image:
      "https://yamunanagar.haryanapolice.gov.in/Upload/images/traffic-sign2.png",
    title: "To stop vehicles coming from front",
    description:
      "Hand signal by traffic police to stop vehicles approaching from the front.",
  },
  {
    id: "8",
    image:
      "https://yamunanagar.haryanapolice.gov.in/Upload/images/traffic-sign3.png",
    title: "To stop vehicles approaching from behind",
    description:
      "Hand signal by traffic police to stop vehicles coming from behind.",
  },
  {
    id: "9",
    image:
      "https://yamunanagar.haryanapolice.gov.in/Upload/images/traffic-sign4.png",
    title: "To stop vehicles approaching simultaneously from front and behind",
    description:
      "Hand signal by traffic police to stop vehicles coming from both front and behind.",
  },
  {
    id: "10",
    image:
      "https://yamunanagar.haryanapolice.gov.in/Upload/images/traffic-sign5.png",
    title: "To stop vehicles approaching simultaneously from right and left",
    description:
      "Hand signal by traffic police to stop vehicles coming from both right and left.",
  },
  {
    id: "11",
    image:
      "https://yamunanagar.haryanapolice.gov.in/Upload/images/traffic-sign6.png",
    title: "To start vehicle approaching from left",
    description:
      "Hand signal by traffic police to start vehicles coming from the left.",
  },
  {
    id: "12",
    image:
      "https://yamunanagar.haryanapolice.gov.in/Upload/images/traffic-sign7.png",
    title: "To start vehicles coming from right",
    description:
      "Hand signal by traffic police to start vehicles coming from the right.",
  },
  {
    id: "13",
    image:
      "https://yamunanagar.haryanapolice.gov.in/Upload/images/traffic-sign8.png",
    title: "To change sign",
    description:
      "Hand signal by traffic police to change the current signal or direction.",
  },
  {
    id: "14",
    image:
      "https://yamunanagar.haryanapolice.gov.in/Upload/images/traffic-sign9.png",
    title: "To start one sided vehicles (alternate)",
    description:
      "Alternate hand signal by traffic police to start vehicles from one side only.",
  },
  {
    id: "15",
    image:
      "https://yamunanagar.haryanapolice.gov.in/Upload/images/traffic-sign10.png",
    title: "To start vehicles on T-Point",
    description:
      "Hand signal by traffic police to start vehicles at a T-junction.",
  },
];

const HandSigns: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header with back button */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Hand Signals
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
            Arm and hand signals are used by drivers and traffic police to
            communicate intentions and manage traffic when indicators or signals
            are not available or to reinforce them. Understanding these signals
            is essential for safe and coordinated road use.
          </p>
        </div>

        {/* Grid of Signs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          {signsList.map((sign) => (
            <div
              key={sign.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden flex flex-col items-center p-4"
            >
              <div className="w-full h-36 sm:h-40 flex items-center justify-center">
                <img
                  src={sign.image}
                  alt={sign.title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="mt-3 text-center">
                <h3 className="text-md font-medium text-gray-900 dark:text-white">
                  {sign.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {sign.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HandSigns;
