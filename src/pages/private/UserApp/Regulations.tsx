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
    question: "How do you identify a transport vehicle?",
    answer: "A transport vehicle can be identified by its number plate.",
  },
  {
    id: "2",
    question: "How long is a learner's license valid?",
    answer: "A learner's license is valid for 6 months.",
  },
  {
    id: "3",
    question: "What documents are required for a private vehicle?",
    answer:
      "A private vehicle must have a Registration Certificate, Insurance Certificate, and Tax Token.",
  },
  {
    id: "4",
    question: "How long is a Pollution Under Control Certificate (PUCC) valid?",
    answer: "A PUCC is valid for 6 months.",
  },
  {
    id: "5",
    question: "When should the hand brake be used?",
    answer: "The hand brake is used to park a vehicle.",
  },
  {
    id: "6",
    question: "Is it legal to carry more than two people on a two-wheeler?",
    answer: "Carrying more than two people on a two-wheeler is illegal.",
  },
  {
    id: "7",
    question: "Is it legal to use an unregistered vehicle in public?",
    answer: "Using an unregistered vehicle in public is illegal.",
  },
  {
    id: "8",
    question:
      "What is the minimum age for a transport vehicle driving license?",
    answer:
      "The minimum age for a transport vehicle driving license is 20 years.",
  },
  {
    id: "9",
    question: "What happens if you drive over the speed limit?",
    answer:
      "Over-speeding can lead to suspension or cancellation of your driving license.",
  },
  {
    id: "10",
    question:
      "Can smoking while driving a public service vehicle lead to penalties?",
    answer:
      "Smoking while driving a public service vehicle can lead to suspension of your driving license.",
  },
  {
    id: "11",
    question:
      "What are the consequences of abandoning a vehicle in a public place?",
    answer:
      "Abandoning a vehicle in a public place can lead to suspension or cancellation of your driving license.",
  },
  {
    id: "12",
    question: "Is it legal to overload a goods carriage?",
    answer:
      "Overloading a goods carriage can lead to suspension or cancellation of your driving license.",
  },
  {
    id: "13",
    question: "When can a vehicle be seized by authorities?",
    answer:
      "A vehicle can be seized if it lacks valid registration or a permit.",
  },
  {
    id: "14",
    question: "What type of insurance is mandatory for motor vehicles?",
    answer: "All motor vehicles must have third-party insurance.",
  },
  {
    id: "15",
    question:
      "Where is the number of passengers for a private vehicle recorded?",
    answer:
      "The number of passengers permitted is recorded in the vehicle's registration certificate.",
  },
  {
    id: "16",
    question:
      "Is it allowed to have a load projecting up to one meter at the back?",
    answer:
      "A load projecting up to one meter at the back is allowed in goods carriages.",
  },
  {
    id: "17",
    question: "What is the minimum fine for overloading a goods carriage?",
    answer: "The minimum fine for overloading a goods carriage is Rs. 2000.",
  },
  {
    id: "18",
    question:
      "What does the Motor Vehicles Act say about driving with excess weight?",
    answer:
      "Drivers should not drive a vehicle carrying weight beyond the permitted limit.",
  },
  {
    id: "19",
    question: "What is the maximum height for a load on a goods vehicle?",
    answer:
      "The maximum height for a load on a goods vehicle is 3.8 meters from ground level.",
  },
  {
    id: "20",
    question: "What safety gear must a motorcycle driver wear?",
    answer: "A motorcycle driver must wear a helmet.",
  },
  {
    id: "21",
    question: "Who can supervise a learner driver?",
    answer:
      "A learner driver must be supervised by someone with a valid driving license.",
  },
  {
    id: "22",
    question: "Are multi-toned horns allowed on vehicles?",
    answer: "Multi-toned horns are illegal as they cause noise pollution.",
  },
  {
    id: "23",
    question: "What is a mandatory item for every vehicle?",
    answer: "Every vehicle must have a first aid box.",
  },
  {
    id: "24",
    question: "What substances can be carried on a public service vehicle?",
    answer:
      "Only fuel and lubricants for the vehicle can be carried on a public service vehicle.",
  },
  {
    id: "25",
    question: "What safety device protects a light motor vehicle driver?",
    answer: "A seat belt protects the driver of a light motor vehicle.",
  },
  {
    id: "26",
    question: "What are the basic safety requirements for a two-wheeler?",
    answer:
      "A two-wheeler must have a rear wheel cover/sari guard and a crash guard.",
  },
  {
    id: "27",
    question: "Can LPG be used as fuel in a vehicle?",
    answer: "LPG can be used as fuel after certification from authorities.",
  },
  {
    id: "28",
    question: "What are the benefits of using LPG as fuel?",
    answer: "LPG reduces pollution and is cost-effective.",
  },
  {
    id: "29",
    question: "What vehicles can be towed?",
    answer:
      "Only mechanically disabled or incompletely assembled motor vehicles can be towed.",
  },
  {
    id: "30",
    question: "Can you drive a vehicle with expired insurance?",
    answer: "You should not drive a vehicle with expired insurance.",
  },
  {
    id: "31",
    question:
      "Where can someone claim compensation after a motor vehicle accident?",
    answer:
      "Compensation claims can be filed with the Motor Accident Claims Tribunal.",
  },
  {
    id: "32",
    question: "Is a driving license valid across India?",
    answer: "A driving license issued in one state is valid throughout India.",
  },
  {
    id: "33",
    question: "Can you lend a vehicle to someone without a valid license?",
    answer:
      "Lending a vehicle to someone without a valid license is a serious offense.",
  },
  {
    id: "34",
    question: "Is driving a vehicle with high pollution levels allowed?",
    answer:
      "Driving a vehicle with pollution levels exceeding the limit is illegal.",
  },
  {
    id: "35",
    question: "Can you hang objects on the rear-view mirror?",
    answer: "Hanging objects on the rear-view mirror is against regulations.",
  },
  {
    id: "36",
    question:
      "What happens if you fail to produce a PUCC within 7 days of inspection?",
    answer:
      "Failing to produce a PUCC within 7 days can lead to suspension of the vehicle's registration certificate.",
  },
  {
    id: "37",
    question: "Is dangerous driving or over-speeding punishable?",
    answer:
      "Dangerous driving or over-speeding is an offense and is punishable.",
  },
  {
    id: "38",
    question: "How can a school bus be identified?",
    answer: "A school bus is identified by its cream yellow paint.",
  },
  {
    id: "39",
    question: "Can a private car be painted olive green?",
    answer: "Painting a private car olive green is not permitted.",
  },
  {
    id: "40",
    question:
      "What are the consequences of using a mobile phone while driving?",
    answer:
      "Using a mobile phone while driving can lead to disqualification from holding a driving license.",
  },
  {
    id: "41",
    question: "Who must wear seat belts in a vehicle?",
    answer: "Both the driver and front-seat passengers must wear seat belts.",
  },
  {
    id: "42",
    question: "Is not wearing a seat belt a punishable offense?",
    answer: "Not wearing a seat belt is a punishable offense.",
  },
  {
    id: "43",
    question:
      "What happens if a driver operates a vehicle without a license in public?",
    answer:
      "Driving without a license can result in penalties for both the driver and owner, and the vehicle may be seized.",
  },
  {
    id: "44",
    question: "What is the general speed limit for cars in cities?",
    answer: "Usually 50 km/h, but varies by state.",
  },
  {
    id: "45",
    question: "When are you allowed to overtake another vehicle?",
    answer:
      "Only when there is a clear view ahead and overtaking is not prohibited.",
  },
  {
    id: "46",
    question: "Who has the right of way at an uncontrolled intersection?",
    answer: "The vehicle approaching from the right side.",
  },
  {
    id: "47",
    question: "What should you do if an ambulance is approaching from behind?",
    answer: "Move to the side of the road and let it pass.",
  },
  {
    id: "48",
    question: "What is the minimum age to drive a two-wheeler without gears?",
    answer: "16 years, with parental consent.",
  },
  {
    id: "49",
    question: "What safety gear is compulsory for two-wheeler riders?",
    answer: "Helmet for both rider and pillion.",
  },
  {
    id: "50",
    question: "Which mirror setting is best for reducing blind spots?",
    answer: "Adjusting side mirrors slightly outward to cover more area.",
  },
  {
    id: "51",
    question: "What should you check before starting a long drive?",
    answer: "Brakes, fuel, tire pressure, headlights, and indicators.",
  },
  {
    id: "52",
    question: "What is the penalty for using a mobile phone while driving?",
    answer: "₹5,000 fine for the first offense, as per the latest rules.",
  },
  {
    id: "53",
    question: "What happens if you drive without a valid license?",
    answer: "Fine of up to ₹5,000 and possible disqualification.",
  },
  {
    id: "54",
    question:
      "Can you drink and drive if your blood alcohol level is under 30 mg/100 ml?",
    answer: "No, any amount of alcohol can impair driving.",
  },
  {
    id: "55",
    question: "Is it legal to drive without wearing a seatbelt?",
    answer: "No, the driver and all passengers must wear seatbelts.",
  },
];

const Regulations: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header with back button */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Vehicle Regulations and Safety
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

export default Regulations;
