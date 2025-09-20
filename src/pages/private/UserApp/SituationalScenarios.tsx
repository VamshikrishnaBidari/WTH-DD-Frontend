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
    question:
      "What should you do if your vehicle is involved in an accident causing injury or property damage?",
    answer:
      "a) If a person is injured in an accident?\nStop, provide first aid if possible, ensure medical attention for the injured, and report to the nearest police station within 24 hours.\n\nb) If third-party property is damaged?\nReport the damage to the nearest police station within 24 hours.\n\nc) If you hit a parked vehicle and the owner is absent?\nInform the police station with jurisdiction over the area within 24 hours.",
  },
  {
    id: "2",
    question: "Who can treat an accident victim?",
    answer:
      "Any registered medical practitioner or doctor can treat an accident victim.",
  },
  {
    id: "3",
    question: "What is the main aim of first aid in an accident?",
    answer:
      "First aid aims to prevent worsening of injuries and their effects.",
  },
  {
    id: "4",
    question: "Which vehicles should be given free passage on the road?",
    answer:
      "Allow free passage for ambulances and fire service vehicles by pulling to the side of the road.",
  },
  {
    id: "5",
    question:
      "What should you do when an emergency vehicle with flashing red or blue lights approaches?",
    answer:
      "Keep to the left of the road and slow down to allow the emergency vehicle to pass safely.",
  },
  {
    id: "6",
    question:
      "How should you respond when a blind person with a white cane is crossing the road?",
    answer:
      "Treat the white cane as a stop signal and halt your vehicle until the person crosses safely.",
  },
  {
    id: "7",
    question:
      "What should you do if a person managing an animal requests you to stop your vehicle?",
    answer:
      "Stop your vehicle to prevent the animal from becoming unmanageable.",
  },
  {
    id: "8",
    question:
      "How should you proceed when a school bus is stopped to pick up or drop off students?",
    answer:
      "Proceed slowly and cautiously, as students may suddenly cross the road.",
  },
  {
    id: "9",
    question: "Where is parking prohibited to avoid emergencies?",
    answer:
      "Do not park at hospital entrances or where it blocks a fire hydrant, as this hinders emergency access.",
  },
  {
    id: "10",
    question:
      "What precautions should be taken when parking a vehicle at night?",
    answer:
      "a) General parking precautions at night?\nPark outside the carriageway, use parking lights, and apply the hand brake.\n\nb) Before leaving a parked vehicle?\nStop the engine, remove the key, and engage the hand brake.",
  },
  {
    id: "11",
    question:
      "What checks should be performed before starting a vehicle's engine?",
    answer:
      "Check the radiator water level and engine oil level to ensure the vehicle is safe to operate.",
  },
  {
    id: "12",
    question: "When should fog lamps be used?",
    answer:
      "Use fog lamps when driving in misty conditions to improve visibility.",
  },
  {
    id: "13",
    question: "How should you manage headlights in adverse conditions?",
    answer:
      "a) In foggy conditions?\nAvoid high beam headlights, as they reflect back and dazzle, reducing visibility.\n\nb) On a well-lit motorway at night?\nUse low beam headlights, especially with vehicles ahead, to avoid dazzling others.\n\nc) When blinded by an oncoming vehicle's headlights?\nSlow down and stop until the headlights no longer impair your vision.\n\nd) In low visibility during daytime rain?\nTurn on headlights to enhance visibility.",
  },
  {
    id: "14",
    question: "What should you do when overtaking a car at night?",
    answer: "Flash your headlamps to signal your intent to overtake safely.",
  },
  {
    id: "15",
    question:
      "What should you do if a vehicle behind you flashes its headlights to overtake?",
    answer: "Allow the vehicle to overtake if it is safe to do so.",
  },
  {
    id: "16",
    question:
      "Why should you maintain distance from the vehicle in front while driving in rain?",
    answer:
      "Keep a safe distance to avoid collisions if the vehicle stops suddenly.",
  },
  {
    id: "17",
    question: "What causes hard steering in a vehicle?",
    answer:
      "Under-inflated tires can cause hard steering, making vehicle control difficult.",
  },
  {
    id: "18",
    question: "Why are motorcyclists hazardous on the road?",
    answer:
      "Motorcyclists often speed excessively or drive in a zig-zag manner, creating hazards.",
  },
  {
    id: "19",
    question:
      "How should you proceed at a T-junction when a vehicle from the left signals a right turn?",
    answer:
      "Wait until the vehicle completes its right turn before proceeding.",
  },
  {
    id: "20",
    question: "What should you do at a junction with limited visibility?",
    answer: "Look both ways and move carefully to ensure safety.",
  },
  {
    id: "21",
    question: "When should hazard warning lights be used?",
    answer:
      "a) When parked and causing inconvenience?\nSwitch on hazard warning lights if your parked vehicle obstructs other road users.\n\nb) In emergency parking situations?\nUse hazard warning lights for emergency parking, especially on highways or busy roads.",
  },
  {
    id: "22",
    question: "When must you stop on a motorway?",
    answer:
      "Stop on a motorway only in emergencies, during breakdowns, or when signaled by a red light.",
  },
  {
    id: "23",
    question: "Why is the rear-view mirror slightly curved?",
    answer:
      "The rear-view mirror's curve provides a wider field of vision for better traffic monitoring.",
  },
  {
    id: "24",
    question: "What is a blind spot in a vehicle?",
    answer:
      "A blind spot is an area not visible in your rear-view mirrors, requiring extra caution.",
  },
  {
    id: "25",
    question: "What causes a vehicle to slide?",
    answer: "Sliding is caused by poor tire conditions or bad road surfaces.",
  },
  {
    id: "26",
    question: "Where is overtaking prohibited to avoid accidents?",
    answer:
      "Do not overtake on narrow bridges, as it poses a significant risk.",
  },
  {
    id: "27",
    question:
      "What should you do if you drive the wrong way on a one-way road?",
    answer: "Carefully reverse or turn back to correct your direction.",
  },
  {
    id: "28",
    question:
      "How should you respond to a vehicle reversing from a side road onto a main road?",
    answer: "Sound your horn and be prepared to stop to avoid a collision.",
  },
  {
    id: "29",
    question:
      "What should you do when a long vehicle signals a right turn but moves left at a crossroad?",
    answer: "Wait behind the vehicle, as it may need extra space to turn.",
  },
  {
    id: "30",
    question: "How should you handle an obstruction on your side of the road?",
    answer: "Give way to oncoming traffic to safely navigate the obstruction.",
  },
  {
    id: "31",
    question: "Why is driving at high speed dangerous?",
    answer:
      "High-speed driving reduces your reaction time to hazards, increasing accident risks.",
  },
  {
    id: "32",
    question: "How should you drive through a flooded road?",
    answer:
      "Drive in a high torque gear with high acceleration, monitoring the flood level.",
  },
  {
    id: "33",
    question: "What is the benefit of power-assisted steering?",
    answer:
      "Power-assisted steering reduces the effort needed to steer the vehicle.",
  },
  {
    id: "34",
    question: "When should you brake in wet conditions?",
    answer:
      "Brake slowly in a straight line to maintain control in wet conditions.",
  },
  {
    id: "35",
    question: "What does an anti-lock braking system (ABS) do?",
    answer:
      "ABS prevents wheel lock-up during braking, reducing tire skidding.",
  },
  {
    id: "36",
    question: "What is brake fade, and how can it be prevented?",
    answer:
      "a) What is brake fade?\nBrake fade is a reduction in braking effectiveness due to overuse.\n\nb) How to prevent brake fade on a descent?\nUse a higher power gear and apply brakes only when necessary.",
  },
  {
    id: "37",
    question: "What should you do if a front tire bursts on a motorway?",
    answer: "Hold the steering wheel firmly and stop safely using the brakes.",
  },
  {
    id: "38",
    question: "What clothing should motorcyclists wear at night?",
    answer: "Wear bright clothing at night to be visible to other road users.",
  },
  {
    id: "39",
    question:
      "What should you do before opening the right-side door when parked?",
    answer: "Ensure no vehicles are passing by to avoid collisions.",
  },
  {
    id: "40",
    question: "Why is it important to load a vehicle evenly?",
    answer:
      "Spreading the load evenly ensures vehicle stability and safe handling.",
  },
  {
    id: "41",
    question: "What should you do if your vehicle skids while driving?",
    answer: "Apply the brakes first to regain control.",
  },
  {
    id: "42",
    question: "Why are bald tires dangerous?",
    answer: "Bald tires have poor road grip, increasing the risk of skidding.",
  },
  {
    id: "43",
    question: "How can you restore braking action after driving through water?",
    answer: "Operate the brakes several times at a slow speed to dry them.",
  },
  {
    id: "44",
    question: "What should you do if you feel tired or ill while driving?",
    answer:
      "a) If feeling tired?\nStop safely and rest to regain alertness.\n\nb) If feeling ill?\nStop in a safe place and seek medical attention if needed.",
  },
  {
    id: "45",
    question: "How can you stay alert while driving at night?",
    answer:
      "Take regular rest breaks and walk in fresh air to maintain alertness.",
  },
];

const SituationalScenarios: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header with back button */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Concise Guide to Situational Scenarios and Emergency Conditions
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
            Navigating situational scenarios and emergencies while driving
            requires quick thinking and adherence to safety protocols. This
            guide outlines key actions for handling various road situations and
            emergencies effectively.
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

export default SituationalScenarios;
