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
      "What should you do when approaching a narrow bridge with an oncoming vehicle?",
    answer:
      "Wait until the other vehicle crosses the bridge before proceeding.",
  },
  {
    id: "2",
    question: "What is prohibited on a one-way road?",
    answer: "Overtaking is prohibited on a one-way road.",
  },
  {
    id: "3",
    question: "How should you overtake a vehicle in front?",
    answer: "Overtake the vehicle from its right side.",
  },
  {
    id: "4",
    question:
      "What must a driver do before crossing an unguarded railway level crossing?",
    answer:
      "Stop, get out, check the tracks for trains or trolleys, and ensure it's safe to cross.",
  },
  {
    id: "5",
    question: "Where should pedestrians walk on a road without a footpath?",
    answer: "Pedestrians should walk on the right side of the road.",
  },
  {
    id: "6",
    question: "Which side should you allow oncoming vehicles to pass through?",
    answer: "Allow oncoming vehicles to pass on your left side.",
  },
  {
    id: "7",
    question: "When is it safe to overtake another vehicle?",
    answer: "Overtake only when the road is wide enough and safe.",
  },
  {
    id: "8",
    question: "What is the purpose of zebra lines on the road?",
    answer: "Zebra lines are for pedestrian crossings.",
  },
  {
    id: "9",
    question: "What should you do when you see a slippery road sign?",
    answer: "Reduce speed by changing to a lower gear.",
  },
  {
    id: "10",
    question: "When is overtaking prohibited?",
    answer:
      "Overtaking is prohibited if it causes inconvenience or danger to other traffic.",
  },
  {
    id: "11",
    question: "Is overtaking allowed when approaching a bend?",
    answer: "Overtaking is not allowed when approaching a bend.",
  },
  {
    id: "12",
    question:
      "Why should pedestrians avoid crossing at sharp bends or near stopped vehicles?",
    answer:
      "Drivers at a distance may not see pedestrians crossing, posing a risk.",
  },
  {
    id: "13",
    question: "How should you turn left on a road?",
    answer: "Show the left turn signal, stay on the left side, and turn left.",
  },
  {
    id: "14",
    question:
      "What should you do when an oncoming vehicle approaches at night with your headlights on high beam?",
    answer: "Dim your headlights until the vehicle passes.",
  },
  {
    id: "15",
    question:
      "What does it mean when a driver extends their right arm with the palm down and moves it up and down?",
    answer: "The driver is slowing down the vehicle.",
  },
  {
    id: "16",
    question: 'What should you do when you see a "School" traffic sign?',
    answer: "Slow down and proceed with caution.",
  },
  {
    id: "17",
    question: "What signal should you use when making a U-turn?",
    answer: "Use the right turn signal for a U-turn.",
  },
  {
    id: "18",
    question: "Where should you avoid making a U-turn?",
    answer: "Avoid making a U-turn on a busy road.",
  },
  {
    id: "19",
    question: "What should you check before overtaking a vehicle?",
    answer:
      "Ensure the road ahead is clear and no vehicles are approaching from behind.",
  },
  {
    id: "20",
    question: "What should you do when another vehicle is overtaking you?",
    answer: "Do not obstruct the overtaking vehicle.",
  },
  {
    id: "21",
    question:
      "What should you do at an intersection without signals or police?",
    answer: "Give way to traffic on your right and proceed after signaling.",
  },
  {
    id: "22",
    question: "What should you do when approaching a blinking yellow signal?",
    answer: "Slow down and proceed only after ensuring it's safe.",
  },
  {
    id: "23",
    question: "What does a continuous yellow line on the road mean?",
    answer: "Do not touch or cross the continuous yellow line.",
  },
  {
    id: "24",
    question: "Which vehicles have priority on gradient roads?",
    answer: "Give priority to vehicles going up the hill.",
  },
  {
    id: "25",
    question:
      "Which vehicles have priority when entering a main road from a branch road?",
    answer: "Give priority to vehicles on the main road.",
  },
  {
    id: "26",
    question: "When can you overtake a vehicle from the left side?",
    answer:
      "Overtake from the left if the vehicle ahead signals to turn right and moves to the center.",
  },
  {
    id: "27",
    question: "Is driving in reverse gear allowed on a one-way road?",
    answer: "Driving in reverse gear is prohibited on a one-way road.",
  },
  {
    id: "28",
    question:
      "What should you do when a yellow light appears at an intersection?",
    answer: "Slow down and stop.",
  },
  {
    id: "29",
    question:
      "What is the safe distance to maintain from the vehicle in front?",
    answer: "Keep a safe distance based on your speed.",
  },
  {
    id: "30",
    question: "Can you change lanes if the road has broken white lines?",
    answer:
      "You can change lanes if needed when the road has broken white lines.",
  },
  {
    id: "31",
    question: "What does a blinking red traffic light mean?",
    answer: "Stop and proceed only if it's safe.",
  },
  {
    id: "32",
    question:
      "What is the maximum speed for a motor car on a national highway?",
    answer:
      "The maximum speed for a motor car on a national highway is 70 km/hr.",
  },
  {
    id: "33",
    question: "What is a stop line on the road?",
    answer:
      "A stop line is a 5 cm wide white or yellow line at a road junction or pedestrian crossing.",
  },
  {
    id: "34",
    question: "What is the maximum speed for a motorcycle?",
    answer: "The maximum speed for a motorcycle is 60 km/hr.",
  },
  {
    id: "35",
    question: "Which vehicle can exceed 60 km/hr?",
    answer: "Only a motor car can exceed 60 km/hr.",
  },
  {
    id: "36",
    question: "What is the maximum speed for trucks on a national highway?",
    answer: "The maximum speed for trucks on a national highway is 70 km/hr.",
  },
  {
    id: "37",
    question:
      "What is the maximum speed for a two-wheeler near an educational institution?",
    answer:
      "The maximum speed for a two-wheeler near an educational institution is 25 km/hr.",
  },
  {
    id: "38",
    question: "What is the maximum speed for heavy motor vehicles in cities?",
    answer: "The maximum speed for heavy motor vehicles in cities is 45 km/hr.",
  },
  {
    id: "39",
    question:
      "What is the maximum distance allowed between a towing and towed vehicle?",
    answer:
      "The maximum distance between a towing and towed vehicle is 5 meters.",
  },
  {
    id: "40",
    question: "How should you overtake on a two-lane street with a clear road?",
    answer: "Overtake the vehicle from its left side.",
  },
  {
    id: "41",
    question: "What is the maximum speed for a vehicle towing another vehicle?",
    answer: "The maximum speed for a vehicle towing another is 24 km/hr.",
  },
  {
    id: "42",
    question: "Can a motorcycle be driven at 60 km/hr under any circumstances?",
    answer:
      "A motorcycle cannot be driven at 60 km/hr under any circumstances.",
  },
  {
    id: "43",
    question: "What is the maximum speed for a motorcycle in a city at night?",
    answer:
      "The maximum speed for a motorcycle in a city at night is 30 km/hr.",
  },
  {
    id: "44",
    question: "What is the maximum speed for a motorcycle on ghat roads?",
    answer: "The maximum speed for a motorcycle on ghat roads is 40 km/hr.",
  },
  {
    id: "45",
    question: "What is the maximum speed for an autorickshaw?",
    answer: "The maximum speed for an autorickshaw is 40 km/hr.",
  },
  {
    id: "46",
    question: "What is the maximum speed for a light motor vehicle?",
    answer: "The maximum speed for a light motor vehicle is 60 km/hr.",
  },
  {
    id: "47",
    question:
      "What does Section 112 of the Motor Vehicles Act state about speed?",
    answer: "Speed limits must not be exceeded.",
  },
  {
    id: "48",
    question:
      "What is the maximum speed for an autorickshaw in cities and municipal towns?",
    answer:
      "The maximum speed for an autorickshaw in cities and municipal towns is 30 km/hr.",
  },
  {
    id: "49",
    question:
      "How should you make a U-turn at a traffic light-controlled intersection?",
    answer: "Wait for a policeman's guidance to make the U-turn.",
  },
  {
    id: "50",
    question: "How should you control speed on a long downhill slope?",
    answer: "Select a low gear to control speed.",
  },
  {
    id: "51",
    question: "Who has the right of way on a roundabout?",
    answer: "Traffic already on the roundabout has the right of way.",
  },
  {
    id: "52",
    question: "What is the middle lane used for?",
    answer: "The middle lane is for traffic moving at 40 km/hr.",
  },
  {
    id: "53",
    question: "What does a flashing yellow signal indicate?",
    answer: "Slow down and proceed with caution.",
  },
  {
    id: "54",
    question: "Which lane should you use when going straight at a crossing?",
    answer: "Use the middle lane when going straight at a crossing.",
  },
  {
    id: "55",
    question:
      "When should you use a dipped high beam headlight during the day?",
    answer: "Use a dipped high beam in poor visibility and on highways.",
  },
  {
    id: "56",
    question:
      "What does a continuous yellow line in the center of the road mean?",
    answer: "Do not overtake when there is a continuous yellow line.",
  },
  {
    id: "57",
    question:
      "Why should you keep to the left when approaching a right-hand curve?",
    answer: "Keeping to the left improves your view of the road.",
  },
  {
    id: "58",
    question: "What should you do when approaching a staggered junction?",
    answer: "Slow down the vehicle.",
  },
  {
    id: "59",
    question: "What should you do at a blind junction?",
    answer:
      "Stop behind the line and move forward slowly as visibility improves.",
  },
  {
    id: "60",
    question: "What shape and color are mandatory traffic signs giving orders?",
    answer: "Mandatory signs are mostly in red or blue circles.",
  },
  {
    id: "61",
    question: "How should you make a U-turn on a road?",
    answer: "Check the mirrors, give a signal, and turn.",
  },
  {
    id: "62",
    question: "What should you do when moving from a parking place?",
    answer: "Use mirrors, check blind spots, signal, and move carefully.",
  },
  {
    id: "63",
    question:
      "Where should you position your vehicle when intending to turn left?",
    answer: "Position the vehicle in the left-hand lane.",
  },
  {
    id: "64",
    question:
      "What should you do if you're in the wrong lane at a busy junction?",
    answer: "Stop until the correct lane is clear.",
  },
  {
    id: "65",
    question: "What signal is needed when going straight at a roundabout?",
    answer: "No signal is required when going straight at a roundabout.",
  },
  {
    id: "66",
    question: "Where should you avoid reversing your vehicle?",
    answer: "Avoid reversing on a busy road or one-way road.",
  },
  {
    id: "67",
    question:
      "What should you do when two lanes of traffic are stopped at a signal?",
    answer: "Stop behind the last vehicle in the appropriate lane.",
  },
  {
    id: "68",
    question: "How should you stop a vehicle on an uphill gradient?",
    answer: "Apply the parking brake after stopping.",
  },
  {
    id: "69",
    question: "Why is driving in neutral gear downhill dangerous?",
    answer: "It affects the brake system, reducing control.",
  },
  {
    id: "70",
    question: "How can you avoid harsh driving?",
    answer: "Plan ahead and brake earlier.",
  },
  {
    id: "71",
    question: "When do passengers notice weight transfer in a vehicle?",
    answer: "Passengers notice weight transfer during braking and cornering.",
  },
  {
    id: "72",
    question: "What should you do before a bend, roundabout, or corner?",
    answer: "Select the appropriate gear and adjust your speed.",
  },
  {
    id: "73",
    question: "What should you check first before turning left?",
    answer: "Check the left side mirror.",
  },
  {
    id: "74",
    question: "What should you do before moving off from a stop?",
    answer: "Check mirrors, look behind, and give the proper signal.",
  },
  {
    id: "75",
    question: "What is the turning circle of a vehicle?",
    answer: "The turning circle is the space needed for the vehicle to turn.",
  },
  {
    id: "76",
    question:
      'What is the maximum speed for a motorcycle after a "Restrictions End" sign?',
    answer: "The maximum speed is 50 km/hr.",
  },
  {
    id: "77",
    question:
      "How should you stop a vehicle without an anti-lock brake system?",
    answer: "Apply the foot brake firmly once until the vehicle stops.",
  },
  {
    id: "78",
    question:
      "When should you be cautious with a vehicle fitted with a speed governor?",
    answer: "Be cautious when overtaking another vehicle.",
  },
  {
    id: "79",
    question:
      "What is a safe distance to keep when driving behind a long truck?",
    answer: "Maintain a safe distance based on speed.",
  },
  {
    id: "80",
    question:
      "What should you do before changing lanes on roads with defined lanes?",
    answer: "Use the appropriate indicator signal.",
  },
  {
    id: "81",
    question:
      "How should you move into the street from a parallel parking space?",
    answer: "Signal to other traffic and move carefully.",
  },
  {
    id: "82",
    question:
      "Which lane should you be in before making a right turn in lane traffic?",
    answer: "Be in the extreme right lane.",
  },
  {
    id: "83",
    question: "How should a motorcycle follow a four-wheeler?",
    answer: "Stay slightly to the right or left of the vehicle ahead.",
  },
  {
    id: "84",
    question: "How should you park a vehicle?",
    answer: "Park without obstructing or inconveniencing other road users.",
  },
  {
    id: "85",
    question: "When should you avoid abrupt braking?",
    answer: "Avoid abrupt braking unless absolutely necessary.",
  },
  {
    id: "86",
    question:
      "How should you pass a procession, troops, or workers on the road?",
    answer: "Proceed carefully at no more than 25 km/hr.",
  },
  {
    id: "87",
    question: "How should you stop a motorcycle?",
    answer: "Apply both front and rear brakes simultaneously.",
  },
  {
    id: "88",
    question:
      "How should motorcycles position themselves when riding in a group?",
    answer:
      "Maintain a staggered position with proper distance between motorcycles.",
  },
  {
    id: "89",
    question: "How should you approach a road with loose sand or gravel?",
    answer: "Slow down and shift to high-torque gears before entering.",
  },
  {
    id: "90",
    question: "What is the most fuel-efficient way to drive?",
    answer: "Drive at a moderate speed of 45–55 km/hr in top gear.",
  },
  {
    id: "91",
    question: 'What does "clutch riding" mean?',
    answer: "Clutch riding means keeping a foot on the clutch pedal.",
  },
  {
    id: "92",
    question: "What should you do at a roundabout when entering?",
    answer: "Give way to vehicles coming from the right.",
  },
  {
    id: "93",
    question:
      "What should you do at an intersection on a main road without signals or police?",
    answer: "Slow down and negotiate the intersection cautiously.",
  },
  {
    id: "94",
    question:
      "What is the correct sequence of actions when turning right or left?",
    answer: "Gear, mirror, signal.",
  },
  {
    id: "95",
    question:
      "What is the correct sequence to move a vehicle from a stationary position?",
    answer: "Start, gear, mirror, signal, move.",
  },
  {
    id: "96",
    question: "What is the safest way to stop a vehicle?",
    answer: "Press the brake first, then the clutch.",
  },
  {
    id: "97",
    question: "What is the safest way to negotiate a steep descent?",
    answer: "Use a higher-torque gear with the brake.",
  },
  {
    id: "98",
    question: "Which gear provides the highest power?",
    answer: "The first gear provides the highest power.",
  },
  {
    id: "99",
    question: "Is abrupt braking encouraged?",
    answer: "Abrupt braking is not encouraged.",
  },
  {
    id: "100",
    question:
      "What gear should be engaged when parking on a downward gradient?",
    answer: "Engage reverse gear in addition to the hand brake.",
  },
  {
    id: "101",
    question: "What is the safest way to signal a turn?",
    answer: "Use both light indicators and hand signals.",
  },
  {
    id: "102",
    question:
      "Who has priority on ghat roads when vehicles approach from opposite sides?",
    answer: "Vehicles going uphill have priority.",
  },
  {
    id: "103",
    question: "When should you avoid overtaking?",
    answer: "Avoid overtaking on a curve.",
  },
  {
    id: "104",
    question: "What type of parking is best for wide roads?",
    answer: "Inclined parking is best for wide roads.",
  },
  {
    id: "105",
    question:
      "What should you do when a pedestrian steps onto a zebra crossing?",
    answer: "Stop before the stop line and treat it as a stop signal.",
  },
  {
    id: "106",
    question:
      "How should you drive behind a motorcycle on a badly maintained road?",
    answer: "Keep a safe distance.",
  },
  {
    id: "107",
    question: "When can you take a free turn at a junction?",
    answer:
      "A free turn can be taken when turning left while traveling straight.",
  },
  {
    id: "108",
    question: "What does a circular red-bordered sign indicate?",
    answer: 'A mandatory rule, such as "Speed Limit" or "No Entry."',
  },
  {
    id: "109",
    question: "What should you do if you see a blinking yellow traffic light?",
    answer: "Slow down and proceed with caution.",
  },
  {
    id: "110",
    question: "What does a blue sign with a white arrow pointing left mean?",
    answer: "Compulsory left turn.",
  },
  {
    id: "111",
    question: "What does a red triangle with a car skidding symbol indicate?",
    answer: "Slippery road ahead.",
  },
];

const RulesMaterial: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header with back button */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Road Rules and Safety
          </h1>
          <button
            onClick={() => onBack()}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Back</span>
          </button>
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

export default RulesMaterial;
