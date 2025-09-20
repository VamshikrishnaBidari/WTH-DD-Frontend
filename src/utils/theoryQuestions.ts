export interface Question {
  id: number;
  question: string;
  options: {
    id: string;
    text?: string;
    image?: string;
  }[];
  correctAnswer: string;
  image?: string;
  typeofQ?: string;
}

export const theoryQuestions: Question[] = [
  {
    id: 1,
    question:
      "Near a pedestrian crossing, when the pedestrians are waiting to cross the road, you should",
    options: [
      { id: "a", text: "Sound horn and proceed" },
      { id: "b", text: "Slow down, sound horn and pass" },
      {
        id: "c",
        text: "Stop the vehicle and wait till the pedestrians cross the road and then proceed",
      },
    ],
    correctAnswer: "c",
    typeofQ: "Driving Ethics and Etiquettes",
  },
  {
    id: 3,
    question:
      "You are approaching a narrow bridge, another vehicle is about to enter the bridge from opposite side you should",
    options: [
      {
        id: "a",
        text: "Increase the speed and try to cross the bridge as fast as possible",
      },
      { id: "b", text: "Put on the head light and pass the bridge" },
      {
        id: "c",
        text: "Wait till the other vehicle crosses the bridge and then proceed",
      },
    ],
    correctAnswer: "c",
    typeofQ: "Road Rules",
  },
  {
    id: 5,
    question:
      "When a vehicle is involved in an accident causing injury to any person",
    options: [
      {
        id: "a",
        text: "Take the vehicle to the nearest police station and report the accident",
      },
      { id: "b", text: "Stop the vehicle and report to the police station" },
      {
        id: "c",
        text: "Take all reasonable steps to secure medical attention to the injured and report to the nearest police station within 24 hours",
      },
    ],
    correctAnswer: "c",
    typeofQ: "situational scenarios and emergency conditions",
  },
  {
    id: 7,
    question: "On a road designated as one way",
    options: [
      { id: "a", text: "Parking is prohibited" },
      { id: "b", text: "Should not drive in reverse gear" },
      { id: "c", text: "Overtaking is prohibited" },
    ],
    correctAnswer: "c",
    typeofQ: "Road Rules",
  },
  {
    id: 9,
    question: "You can overtake a vehicle in front",
    options: [
      { id: "a", text: "Through the right side of that vehicle" },
      { id: "b", text: "Through the left side, if the road is wide" },
      { id: "c", text: "Through the left side" },
    ],
    correctAnswer: "a",
    typeofQ: "Road Rules",
  },
  {
    id: 11,
    question:
      "When a vehicle approaches an unguarded railway level crossing, before crossing it, the driver shall",
    options: [
      {
        id: "a",
        text: "Stop the vehicle on the left side of the road, get down from the vehicle, go to the railway track, and ensure that no train or trolley is coming from either side",
      },
      { id: "b", text: "Sound horn and cross the track as fast as possible" },
      { id: "c", text: "Wait till the train passes" },
    ],
    correctAnswer: "a",
    typeofQ: "Road Rules",
  },
  {
    id: 17,
    question: "In a road without footpath, the pedestrians.",
    options: [
      { id: "a", text: "Should walk on the left side of the road" },
      { id: "b", text: "Should walk on the right side of the road" },
      { id: "c", text: "May walk on either side of the road" },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 21,
    question:
      "Vehicles proceeding from opposite direction should be allowed to pass through.",
    options: [
      { id: "a", text: "Your right side" },
      { id: "b", text: "Your left side" },
      { id: "c", text: "The convenient side" },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 23,
    question: "Driver of a vehicle may overtake.",
    options: [
      { id: "a", text: "while driving down hill" },
      { id: "b", text: "If the road is sufficiently wide" },
      {
        id: "c",
        text: "When the driver of the vehicle in front shows the signal to overtake",
      },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 31,
    question: "Zebra lines are meant for.",
    options: [
      { id: "a", text: "stopping vehicle." },
      { id: "b", text: "pedestrians crossing" },
      { id: "c", text: "for giving preference to vehicle" },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 39,
    question:
      "Where the slippery road sign is seen on the road, the driver shall.",
    options: [
      { id: "a", text: "apply brake" },
      { id: "b", text: "reduce the speed by changing the gear" },
      { id: "c", text: "proceed in the same speed" },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 41,
    question: "Overtaking is prohibited in following circumstances.",
    options: [
      { id: "a", text: "during night" },
      {
        id: "b",
        text: "when it is likely to cause inconvenience or danger to other traffic",
      },
      { id: "c", text: "when the vehicle in front is reducing speed" },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 43,
    question: "Overtaking when approaching a bend.",
    options: [
      { id: "a", text: "is permissible" },
      { id: "b", text: "not permissible" },
      { id: "c", text: "is permissible with care" },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 45,
    question: "Drunken driving.",
    options: [
      { id: "a", text: "allowed during night time" },
      { id: "b", text: "allowed in private vehicles" },
      { id: "c", text: "prohibited in all vehicles." },
    ],
    correctAnswer: "c",
    typeofQ: "Driving Ethics and Etiquettes",
  },
  {
    id: 47,
    question: "Use of horn prohibited.",
    options: [
      { id: "a", text: "Near Police Station" },
      { id: "b", text: "Near Hospital, Courts of Law" },
      { id: "c", text: "Prohibited in both direction" },
    ],
    correctAnswer: "b",
    typeofQ: "Driving Ethics and Etiquettes",
  },
  {
    id: 55,
    question: "When fuel is filled in a vehicle.",
    options: [
      { id: "a", text: "shall not smoke" },
      { id: "b", text: "shall not check air pressure" },
      { id: "c", text: "shall not use any light of the vehicle" },
    ],
    correctAnswer: "a",
    typeofQ: "Driving Ethics and Etiquettes",
  },
  {
    id: 57,
    question: "Mobile phones shall not be used.",
    options: [
      { id: "a", text: "in Government offices" },
      { id: "b", text: "in Police Stations" },
      { id: "c", text: "While driving a vehicle" },
    ],
    correctAnswer: "c",
    typeofQ: "Driving Ethics and Etiquettes",
  },
  {
    id: 59,
    question: "Overtaking is prohibited.",
    options: [
      { id: "a", text: "When the road ahead is not clearly visible" },
      { id: "b", text: "when the road ahead is wide enough" },
      {
        id: "c",
        text: "when the road center is marked with white broken lines",
      },
    ],
    correctAnswer: "a",
    typeofQ: "Road Rules",
  },
  {
    id: 61,
    question:
      "The pedestrians shall not cross the road at sharp bends or very near to a stopped vehicle. Why?",
    options: [
      { id: "a", text: "Inconvenience to other vehicles." },
      { id: "b", text: "Inconvenience to other road users." },
      {
        id: "c",
        text: "Drivers of other vehicles coming at a distance may not see persons crossing the road.",
      },
    ],
    correctAnswer: "c",
    typeofQ: "Road Rules",
  },
  {
    id: 63,
    question: "Records of a private vehicle are.",
    options: [
      {
        id: "a",
        text: "Registration Certificate, G.C.R., Insurance Certificate",
      },
      {
        id: "b",
        text: "Registration certificate, Insurance Certificate, Tax Token, Driving Licence",
      },
      { id: "c", text: "Registration Certificate, Permit, Trip Sheet" },
    ],
    correctAnswer: "b",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 65,
    question:
      "While turning to a road to the left of the road in which you are going, you should.",
    options: [
      {
        id: "a",
        text: "Show the left turn signal, drive to the center and turn to the left",
      },
      { id: "b", text: "Sound horn and turn to the left" },
      {
        id: "c",
        text: "Show the left turn signal, keep to the left side of the road and turn to the left.",
      },
    ],
    correctAnswer: "c",
    typeofQ: "Road Rules",
  },
  {
    id: 67,
    question: "Validity of P.U.C.C. Pollution Under Control Certificate.",
    options: [
      { id: "a", text: "6 months" },
      { id: "b", text: "One Year" },
      { id: "c", text: "Two years" },
    ],
    correctAnswer: "a",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 69,
    question:
      "While you are driving with the head light in high beam during night, a vehicle approaches from opposite direction, you will.",
    options: [
      { id: "a", text: "Proceed keeping to the left" },
      {
        id: "b",
        text: "Put the head light in dim and bright alternatively several times",
      },
      { id: "c", text: "Dim the head light till the vehicle passes" },
    ],
    correctAnswer: "c",
    typeofQ: "Road Rules",
  },
  {
    id: 71,
    question:
      "The Driver of a vehicle extends his right arm with the palm downward and moves the main upward and downward several times. You will understand that.",
    options: [
      { id: "a", text: "He is turning to the left." },
      { id: "b", text: "He is slowing down the vehicle." },
      { id: "c", text: "Allowing to overtake." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 75,
    question: "When you see the traffic sign School, you should.",
    options: [
      { id: "a", text: "Stop the vehicle, sound horn and proceed." },
      { id: "b", text: "Slow down and proceed with caution." },
      { id: "c", text: "Sound horn continuously and proceed." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 79,
    question: "The Signal while taking U-turn.",
    options: [
      { id: "a", text: "Left turn signal." },
      { id: "b", text: "Right turn signal." },
      { id: "c", text: "Slow down signal." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 81,
    question: "The driver of a vehicle shall not take U-turn.",
    options: [
      { id: "a", text: "In a road where there is no traffic restrictions." },
      { id: "b", text: "In a busy road." },
      { id: "c", text: "When there are vehicles passing through the left." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 85,
    question: "Before overtaking a vehicle, it should be ensured that ....",
    options: [
      { id: "a", text: "no vehicle is approaching from behind." },
      {
        id: "b",
        text: "the road ahead is clearly visible and it is safe to overtake.",
      },
      { id: "c", text: "the vehicle in front is turning left." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 89,
    question: "When your vehicle is being overtaken, should you.",
    options: [
      { id: "a", text: "stop your vehicle and let the vehicle to overtake." },
      { id: "b", text: "increase the speed of your vehicle from overtaking." },
      { id: "c", text: "not obstruct the other vehicle." },
    ],
    correctAnswer: "c",
    typeofQ: "Road Rules",
  },
  {
    id: 93,
    question: "The hand brake is to be used.",
    options: [
      { id: "a", text: "to reduce the speed." },
      { id: "b", text: "to apply sudden brake." },
      { id: "c", text: "to park a vehicle." },
    ],
    correctAnswer: "c",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 95,
    question: "More than two persons on a two-wheeler is.",
    options: [
      { id: "a", text: "allowed in unavoidable circumstances." },
      { id: "b", text: "violation of law." },
      { id: "c", text: "allowed when the traffic is less." },
    ],
    correctAnswer: "b",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 97,
    question: "You want to overtake a vehicle near a hospital. You will.",
    options: [
      { id: "a", text: "blow the horn continuously." },
      { id: "b", text: "not blow horn." },
      { id: "c", text: "blow the horn only intermittently." },
    ],
    correctAnswer: "b",
    typeofQ: "Driving Ethics and Etiquettes",
  },
  {
    id: 99,
    question: "Using an unregistered vehicle in a public place is.",
    options: [
      { id: "a", text: "illegal." },
      { id: "b", text: "legal." },
      { id: "c", text: "legal if there is urgency." },
    ],
    correctAnswer: "a",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 101,
    question:
      "Minimum age for obtaining driving licence for transport vehicles.",
    options: [
      { id: "a", text: "25 years." },
      { id: "b", text: "18 years." },
      { id: "c", text: "20 years." },
    ],
    correctAnswer: "c",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 109,
    question: "Over speeding.",
    options: [
      {
        id: "a",
        text: "Is an offence leading to suspension or cancellation of driving licence.",
      },
      { id: "b", text: "Is an offence leading to punishment by fine only." },
      { id: "c", text: "Is not an offence." },
    ],
    correctAnswer: "a",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 131,
    question: "Smoking while driving public service vehicle.",
    options: [
      { id: "a", text: "Can attract suspension of driving licence." },
      { id: "b", text: "Can attract fine only." },
      { id: "c", text: "None of the above." },
    ],
    correctAnswer: "a",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 133,
    question:
      "Abandoning vehicle in a public place causing inconvenience to others or passengers.",
    options: [
      {
        id: "a",
        text: "The driving licence is liable to be suspended or cancelled.",
      },
      { id: "b", text: "Only fine is attracted." },
      { id: "c", text: "None of the above." },
    ],
    correctAnswer: "a",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 135,
    question:
      "Abandoning a transport vehicle as a mark of protest or opinion on any kind of strike, in a public place or in any other place causing obstruction or inconvenience to the public or passengers or on the use of such places.",
    options: [
      {
        id: "a",
        text: "The driving licence is liable to be suspended or cancelled.",
      },
      { id: "b", text: "Only fine is attracted." },
      { id: "c", text: "Legitimate right of driver." },
    ],
    correctAnswer: "a",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 137,
    question: "Carrying overload in goods carriages.",
    options: [
      { id: "a", text: "Legally not punishable." },
      { id: "b", text: "Only fine is attracted." },
      {
        id: "c",
        text: "Can attract suspension or cancellation of driving licence.",
      },
    ],
    correctAnswer: "c",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 19,
    question:
      "Free passage should be given to the following types of vehicles.",
    options: [
      { id: "a", text: "Ambulance and fire service vehicles" },
      { id: "b", text: "Police vehicles." },
      { id: "c", text: "Express, Super Express buses" },
    ],
    correctAnswer: "a",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  {
    id: 27,
    question: "When a Vehicle is parked on the road side during night.",
    options: [
      { id: "a", text: "The vehicle should be locked" },
      {
        id: "b",
        text: "The person having licence to drive such a vehicle should be in the drivers seat",
      },
      { id: "c", text: "The park light shall remain lit" },
    ],
    correctAnswer: "c",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  {
    id: 29,
    question: "Fog lamps are used.",
    options: [
      { id: "a", text: "During night." },
      { id: "b", text: "When there is mist." },
      { id: "c", text: "When the opposite vehicle is not using dim light" },
    ],
    correctAnswer: "b",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  {
    id: 33,
    question: "When an ambulance is approaching.",
    options: [
      {
        id: "a",
        text: "allow passage if there are no vehicles from front side.",
      },
      { id: "b", text: "no preference need be given." },
      {
        id: "c",
        text: "the driver shall allow free passage by drawing to the side of the road",
      },
    ],
    correctAnswer: "c",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  {
    id: 49,
    question: "Rear view mirror is used.",
    options: [
      { id: "a", text: "for seeing face" },
      { id: "b", text: "for watching the traffic approaching from behind" },
      { id: "c", text: "for seeing the back seat passenger" },
    ],
    correctAnswer: "b",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  {
    id: 103,
    question: "Overtaking is prohibited in the following case.",
    options: [
      { id: "a", text: "State highway." },
      { id: "b", text: "Panchayath roads." },
      { id: "c", text: "Narrow bridge." },
    ],
    correctAnswer: "c",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  {
    id: 105,
    question:
      "If a person in charge of an animal apprehending that the animal may become unmanned to request to stop a vehicle.",
    options: [
      { id: "a", text: "The driver shall stop the vehicle." },
      { id: "b", text: "The driver shall proceed, blowing the horns." },
      { id: "c", text: "The driver shall reduce the speed." },
    ],
    correctAnswer: "a",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  {
    id: 111,
    question:
      "When school buses are stopped for picking up or setting down students.",
    options: [
      { id: "a", text: "Blow horn and proceed." },
      {
        id: "b",
        text: "Proceed slowly and cautiously since there is chance of students suddenly crossing the road.",
      },
      { id: "c", text: "No special case is required." },
    ],
    correctAnswer: "b",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  {
    id: 113,
    question: "When a blind person crosses the road holding White Cane.",
    options: [
      {
        id: "a",
        text: "The driver of a vehicle shall consider the white cane as a traffic sign to stop the vehicle.",
      },
      { id: "b", text: "Blow the horn and proceed." },
      { id: "c", text: "Slow down and proceed with caution." },
    ],
    correctAnswer: "a",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  {
    id: 115,
    question: "When a motor vehicle is involved in an accident ....",
    options: [
      {
        id: "a",
        text: "shall report to the nearest police station within 24 hours.",
      },
      {
        id: "b",
        text: "shall report to the nearest police station within 12 hours.",
      },
      {
        id: "c",
        text: "shall report to the nearest police station within 48 hours.",
      },
    ],
    correctAnswer: "a",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  {
    id: 117,
    question:
      "When any property of a third party is damaged due to an accident ....",
    options: [
      {
        id: "a",
        text: "driver shall report to the nearest police station within 24 hours.",
      },
      {
        id: "b",
        text: "driver shall report to the nearest police station within 7 days.",
      },
      { id: "c", text: "need not report to any police station." },
    ],
    correctAnswer: "a",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  {
    id: 125,
    question: "Parking is prohibited in the following place ....",
    options: [
      { id: "a", text: "entrance of hospital." },
      { id: "b", text: "left side of the road." },
      { id: "c", text: "market area." },
    ],
    correctAnswer: "a",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  {
    id: 127,
    question: "Parking is prohibited in the following place ....",
    options: [
      { id: "a", text: "blocking a fire hydrant." },
      { id: "b", text: "near a public well." },
      { id: "c", text: "left side of the road." },
    ],
    correctAnswer: "a",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  {
    id: 173,
    question: "Before starting the engine of a vehicle ....",
    options: [
      { id: "a", text: "check radiator water level and engine oil level." },
      { id: "b", text: "check headlight." },
      { id: "c", text: "check brake." },
    ],
    correctAnswer: "a",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  {
    id: 9991,
    question: "You are overtaking a car at night. You must ensure that.",
    options: [
      { id: "a", text: "You do not dazzle other road users." },
      { id: "b", text: "You flash headlamps before overtaking." },
      { id: "c", text: "Your rear fog lights are switched on." },
    ],
    correctAnswer: "b",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  {
    id: 225,
    question: "A high beam in foggy conditions.",
    options: [
      { id: "a", text: "Is good because you can be more." },
      { id: "b", text: "Is bad because it reflects back and can dazzle." },
      { id: "c", text: "Make sure others can see you." },
    ],
    correctAnswer: "b",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  {
    id: 228,
    question:
      "You are driving. A vehicle comes up quickly behind, flashing head lamps. You should.",
    options: [
      { id: "a", text: "Accelerate to maintain gap behind you." },
      { id: "b", text: "Touch the breaks to show your brake lights." },
      { id: "c", text: "Allow the vehicle to over take, if safe." },
    ],
    correctAnswer: "c",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  {
    id: 230,
    question:
      "You are driving in rain. Why should you keep distance from the vehicle in front?",
    options: [
      { id: "a", text: "In case it change direction suddenly." },
      { id: "b", text: "In case its fog lights dazzle you." },
      { id: "c", text: "In case it stop suddenly." },
    ],
    correctAnswer: "c",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  {
    id: 231,
    question: "What can cause hard steering.",
    options: [
      { id: "a", text: "Badly worn tyre." },
      { id: "b", text: "Over inflated tyre." },
      { id: "c", text: "Under inflated tyre." },
    ],
    correctAnswer: "c",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  {
    id: 232,
    question: "Motor cyclists usually cause hazard by.",
    options: [
      { id: "a", text: "Speed more than permitted." },
      {
        id: "b",
        text: "Passing very close to you by driving in the zig zag manner.",
      },
      { id: "c", text: "All of the above." },
    ],
    correctAnswer: "c",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  {
    id: 233,
    question:
      "You are waiting at a T. Junction. A vehicle is coming from the left with right signal flashing. you should.",
    options: [
      { id: "a", text: "Accelerate hard and move forward." },
      { id: "b", text: "Move forward slowly." },
      { id: "c", text: "Wait until the vehicle turn to right side." },
    ],
    correctAnswer: "c",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  {
    id: 234,
    question: "While you reach a junction with limited visibility you should.",
    options: [
      { id: "a", text: "Look both ways and move carefully." },
      { id: "b", text: "Look at right and move slowly." },
      { id: "c", text: "Move quickly." },
    ],
    correctAnswer: "a",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  {
    id: 235,
    question: "You should switch on your hazard warning lights.",
    options: [
      { id: "a", text: "When you are moving straight." },
      {
        id: "b",
        text: "When your vehicle is parked and the same is causing inconvenience to other road users.",
      },
      { id: "c", text: "When your vehicle parked at a no parking area." },
    ],
    correctAnswer: "b",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  {
    id: 236,
    question: "You are driving on a well-lit motor way at night, you must.",
    options: [
      { id: "a", text: "Use your head light on high beam." },
      { id: "b", text: "Always use your head lights in low beam." },
      { id: "c", text: "Always use hazard light." },
    ],
    correctAnswer: "b",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  {
    id: 237,
    question:
      "Anti lock braking system prevents wheels from locking. This avoid tyres to.",
    options: [
      { id: "a", text: "Puncture." },
      { id: "b", text: "Skid." },
      { id: "c", text: "Wear." },
    ],
    correctAnswer: "b",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  {
    id: 238,
    question:
      "While traveling oves motor way at night with other vehicles just ahead, better the switched on lights should be.",
    options: [
      { id: "a", text: "Hazard warning light." },
      { id: "b", text: "Low beam head light." },
      { id: "c", text: "High beam head light." },
    ],
    correctAnswer: "b",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  {
    id: 240,
    question: "Driving at high speed ...",
    options: [
      { id: "a", text: "gives you better fuel efficiency." },
      { id: "b", text: "takes less time for your journey." },
      { id: "c", text: "reduces time to react to hazard." },
    ],
    correctAnswer: "c",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  {
    id: 248,
    question:
      "You entered a one-way in the opposite direction unknowingly, you should ...",
    options: [
      { id: "a", text: "reverse out or turn back carefully and drive away." },
      { id: "b", text: "continue to the end of the road." },
      { id: "c", text: "can break rule in emergency" },
    ],
    correctAnswer: "a",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  {
    id: 249,
    question:
      "While driving through a main road, another vehicle is reversing from a side road, you should ...",
    options: [
      { id: "a", text: "move to the opposite side of the road." },
      { id: "b", text: "speed up and drive through quickly." },
      { id: "c", text: "sound your horn and be prepared to stop." },
    ],
    correctAnswer: "c",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  {
    id: 250,
    question:
      "Approaching a crossroad, the driver of the long vehicle ahead of you signals right and moves to the left, you should ...",
    options: [
      { id: "a", text: "sound horn and warn the driver." },
      { id: "b", text: "wait behind the vehicle." },
      { id: "c", text: "overtake on the right-hand side." },
    ],
    correctAnswer: "b",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  {
    id: 252,
    question:
      "You meet an obstruction on your side of the road, you should ...",
    options: [
      { id: "a", text: "move on as you have priority." },
      { id: "b", text: "accelerate to move quickly." },
      { id: "c", text: "give way to oncoming traffic." },
    ],
    correctAnswer: "c",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  {
    id: 260,
    question: "When do you stop on a motor way.",
    options: [
      { id: "a", text: "When ordered by longer and the signal is red." },
      { id: "b", text: "In an emergency or brake down." },
      { id: "c", text: "All of the above." },
    ],
    correctAnswer: "c",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  {
    id: 267,
    question: "Rear Mirror is slightly curved to.",
    options: [
      { id: "a", text: "Give a wider field of vision." },
      { id: "b", text: "Cover the blind spot totally." },
      { id: "c", text: "Judge the speed of following vehicle." },
    ],
    correctAnswer: "a",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  {
    id: 272,
    question: "What is the common cause of sliding.",
    options: [
      { id: "a", text: "Bad condition of tyres and road." },
      { id: "b", text: "Once of driver." },
      { id: "c", text: "Both of the above." },
    ],
    correctAnswer: "c",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  {
    id: 273,
    question:
      "While traveling you are dwarfed by head lights of on coming vehicle, you should.",
    options: [
      { id: "a", text: "Pull down your sun visor." },
      { id: "b", text: "Slow down and stop." },
      { id: "c", text: "Switch on your main beam." },
    ],
    correctAnswer: "b",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  {
    id: 274,
    question: "What is blind spot.",
    options: [
      { id: "a", text: "An area not seen in your rear view mirrors." },
      { id: "b", text: "An area not covered by head lights." },
      {
        id: "c",
        text: "An area not covered by the rear view mirror inside your vehicle.",
      },
    ],
    correctAnswer: "a",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  {
    id: 279,
    question:
      "An accident has just happened and the injured person is lying on the road, you should ...",
    options: [
      { id: "a", text: "protect the area and inform the authorities." },
      { id: "b", text: "protect the area and give first aid to the injured." },
      {
        id: "c",
        text: "protect the area, give first aid, take the injured to the hospital and inform the authorities.",
      },
    ],
    correctAnswer: "c",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  {
    id: 280,
    question: "What is the main aim of first aid?",
    options: [
      { id: "a", text: "to treat the injury." },
      { id: "b", text: "to prevent aggravating the injury and its effects." },
      { id: "c", text: "all of the above." },
    ],
    correctAnswer: "b",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  {
    id: 283,
    question:
      "While driving you start feeling tired or unable to concentrate, you should ...",
    options: [
      { id: "a", text: "stop as soon as it is safe to do so and take rest." },
      { id: "b", text: "switch on the stereo to help you concentrate." },
      { id: "c", text: "speed up to get to your destination sooner." },
    ],
    correctAnswer: "a",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  {
    id: 284,
    question:
      "You are driving at night, what can you do to help you keep alert?",
    options: [
      { id: "a", text: "take proper rest periods at correct intervals." },
      { id: "b", text: "walk around in fresh air after a rest stop." },
      { id: "c", text: "both of the above." },
    ],
    correctAnswer: "c",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  {
    id: 285,
    question:
      "You are driving a car during a journey and you are feeling ill and unable to concentrate, what should you do?",
    options: [
      { id: "a", text: "increase your speed to finish your work earlier." },
      { id: "b", text: "continue your journey and keep your windows open." },
      {
        id: "c",
        text: "stop in a safe place and if possible seek medical attention.",
      },
    ],
    correctAnswer: "c",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  {
    id: 286,
    question: "Anti-lock braking system is designed to ...",
    options: [
      { id: "a", text: "prevent the driving wheel from spinning." },
      {
        id: "b",
        text: "prevent moisture from building up inside the braking system.",
      },
      {
        id: "c",
        text: "prevent wheels from locking up on braking and avoid skidding of the tyres.",
      },
    ],
    correctAnswer: "c",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  {
    id: 287,
    question: 'What is "brake fade"?',
    options: [
      { id: "a", text: "a reduction of air smooth progressive pressure." },
      { id: "b", text: "braking." },
      { id: "c", text: "reduction of braking effectiveness." },
    ],
    correctAnswer: "c",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  {
    id: 288,
    question: "To prevent brake fade while descending you should ...",
    options: [
      { id: "a", text: "select neutral for a short distance." },
      { id: "b", text: "repeatedly pump the brake pedal." },
      {
        id: "c",
        text: "select a suitable higher power gear and apply brakes only when necessary.",
      },
    ],
    correctAnswer: "c",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  {
    id: 291,
    question: "While driving through a flooded road, what should you do?",
    options: [
      { id: "a", text: "stop the vehicle until the flood stops." },
      {
        id: "b",
        text: "watch the flood level gauge, drive in high torque gear with high acceleration.",
      },
      { id: "c", text: "drive in high torque gear with low acceleration." },
    ],
    correctAnswer: "b",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  {
    id: 293,
    question: "What is the benefit of power-assisted steering?",
    options: [
      { id: "a", text: "reduces tyre wear, assists with braking." },
      { id: "b", text: "reduces driving effort." },
    ],
    correctAnswer: "b",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  {
    id: 297,
    question: "Hazard warning lamps may only be used at certain times ...",
    options: [
      { id: "a", text: "for going ahead at a junction." },
      { id: "b", text: "for slowing down the rear vehicle." },
      {
        id: "c",
        text: "for emergency parking, especially on highways and busy roads.",
      },
    ],
    correctAnswer: "c",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  {
    id: 299,
    question: "What must you do if your vehicle is involved in an accident?",
    options: [
      {
        id: "a",
        text: "Stop at the scene of the accident, give First Aid to the victim if possible and help him to get medical attention.",
      },
      { id: "b", text: "Drive the vehicle to the nearest police station." },
      { id: "c", text: "Inform the insurance authorities at the earliest." },
    ],
    correctAnswer: "a",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  {
    id: 300,
    question:
      "Your vehicle has hit a parked vehicle. The owner of that vehicle is out at the time, you must.",
    options: [
      {
        id: "a",
        text: "Drive away from the accident spot and clear the damage at the earliest.",
      },
      {
        id: "b",
        text: "Inform the insurance authorities as soon as possible.",
      },
      {
        id: "c",
        text: "Inform the police station having jurisdiction over the place in which the accident occurred within 24 hours.",
      },
    ],
    correctAnswer: "c",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  {
    id: 301,
    question:
      "While driving your vehicle on a motor way a front tyre gets burst. You should.",
    options: [
      { id: "a", text: "Loosen the grip on the steering wheel." },
      { id: "b", text: "Brake family for a stop." },
      {
        id: "c",
        text: "Hold the steesing wheel firmly and stop safely by using brake.",
      },
    ],
    correctAnswer: "c",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  {
    id: 302,
    question:
      "Motor cyclist are advised to wear type of clothing at night to make them visible to other road users.",
    options: [
      { id: "a", text: "Bright clothing." },
      { id: "b", text: "Dark clothing." },
      { id: "c", text: "None of this." },
    ],
    correctAnswer: "a",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  {
    id: 303,
    question: "Before you open the right side doors on parking, you should.",
    options: [
      { id: "a", text: "Ensure that no vehicle is passing by." },
      { id: "b", text: "Quickly open the door and get down." },
      {
        id: "c",
        text: "Do not open the right doors and get down through the left only.",
      },
    ],
    correctAnswer: "a",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  {
    id: 304,
    question:
      "Which of the following is most important when loading a vehicle?",
    options: [
      { id: "a", text: "Loading it towards the rear." },
      { id: "b", text: "Loading it towards the front." },
      { id: "c", text: "Spreading the load evenly." },
    ],
    correctAnswer: "c",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  {
    id: 311,
    question:
      "Before braking in wet condition you should make sure as far as possible that.",
    options: [
      { id: "a", text: "The gear lever is in neural." },
      { id: "b", text: "There is no mist or water in your rear view mirror." },
      { id: "c", text: "Your vehicle is traveling slowly in a straight line." },
    ],
    correctAnswer: "c",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  {
    id: 327,
    question: "Precautions to be followed during parking at night ...",
    options: [
      {
        id: "a",
        text: "park outside of the carriageway and use park light and hand brake.",
      },
      { id: "b", text: "park the vehicle on the footpath away from traffic." },
      { id: "c", text: "use tyre jack to prevent rolling." },
    ],
    correctAnswer: "a",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  {
    id: 338,
    question: "If your vehicle hits a pedestrian you should.",
    options: [
      { id: "a", text: "Identify yourself and leave." },
      { id: "b", text: "Help the person, and call an ambulance." },
      {
        id: "c",
        text: "Help the injured for medical and then report to police.",
      },
    ],
    correctAnswer: "c",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  {
    id: 341,
    question: "While driving on wet or slippery road.",
    options: [
      { id: "a", text: "Tyre pressure must be reduced." },
      { id: "b", text: "Avoid sudden braking and acceleration." },
      { id: "c", text: "Vehicle should be driven at high speed." },
    ],
    correctAnswer: "b",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  {
    id: 348,
    question: "Before leaving your parked vehicle, you should ...",
    options: [
      { id: "a", text: "turn ignition key off." },
      { id: "b", text: "stop the engine, remove key and engage hand brake." },
      { id: "c", text: "lock the car." },
    ],
    correctAnswer: "b",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  {
    id: 364,
    question: "It is dangerous to drive with bald (worn-out) tyres, since ...",
    options: [
      { id: "a", text: "the vehicle picks up speed quickly." },
      { id: "b", text: "it has little road grip." },
      { id: "c", text: "it has too much road grip." },
    ],
    correctAnswer: "b",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  {
    id: 368,
    question:
      "When a vehicle is approaching with flashing red or blue light you should.",
    options: [
      { id: "a", text: "Keep to the left of the road and slow down." },
      { id: "b", text: "Stop where you are." },
      { id: "c", text: "Ignore the vehicle." },
    ],
    correctAnswer: "a",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  {
    id: 370,
    question:
      "To park in a space where the main way to any one car. You should.",
    options: [
      { id: "a", text: "Pull slowly into the public space." },
      { id: "b", text: "Park carefully into the parking space." },
      { id: "c", text: "Park in front of the space." },
    ],
    correctAnswer: "b",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  {
    id: 371,
    question: "When you vehicle skid while driving. You should.",
    options: [
      { id: "a", text: "Turn steesing both the left and right." },
      { id: "b", text: "Put on the brakes first." },
      { id: "c", text: "Turn the steering wheel in the main way." },
    ],
    correctAnswer: "b",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  {
    id: 378,
    question: "Emergency vehicles means.",
    options: [
      { id: "a", text: "Road rollers and cranes." },
      { id: "b", text: "Mobile automobile work shop." },
      { id: "c", text: "Ambulance and fire service vehicles." },
    ],
    correctAnswer: "c",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  {
    id: 389,
    question: "If your vehicle breaks down during the night, you should ...",
    options: [
      {
        id: "a",
        text: "stop, use hand brake and exhibit hazardous warning light.",
      },
      { id: "b", text: "stop and exhibit red light." },
      { id: "c", text: "leave the vehicle." },
    ],
    correctAnswer: "a",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  {
    id: 395,
    question: "An accident victim can be treated by ...",
    options: [
      { id: "a", text: "only a government hospital doctor." },
      { id: "b", text: "any registered medical practitioner or doctor." },
      { id: "c", text: "by the driver." },
    ],
    correctAnswer: "b",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  {
    id: 422,
    question:
      "How can we overcome the reduction of braking action after water servicing?",
    options: [
      { id: "a", text: "brakes shall be adjusted by a mechanic." },
      {
        id: "b",
        text: "the vehicle should be withdrawn from traffic at once.",
      },
      {
        id: "c",
        text: "by operating the brake several times at a slow driving speed.",
      },
    ],
    correctAnswer: "c",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  {
    id: 428,
    question:
      "When the visibility becomes very low during the daytime in rainy season, the driver shall ...",
    options: [
      { id: "a", text: "use headlight." },
      { id: "b", text: "make sure that wiper blades are not old." },
      { id: "c", text: "none of the above." },
    ],
    correctAnswer: "a",
    typeofQ: "Situational Scenarios and Emergency Conditions",
  },
  // ...existing code...
  {
    id: 141,
    question:
      "When you reach an intersection where there is no signal light or policeman, you will ...",
    options: [
      {
        id: "a",
        text: "give way to traffic approaching the intersection from other roads.",
      },
      { id: "b", text: "give proper signal, sound the horn, and proceed." },
      {
        id: "c",
        text: "give way to the traffic approaching the intersection on your right side and proceed after giving necessary signals.",
      },
    ],
    correctAnswer: "c",
    typeofQ: "Road Rules",
  },
  {
    id: 143,
    question:
      "While you are approaching an intersection where the yellow signal light is blinking, you should ....",
    options: [
      {
        id: "a",
        text: "as there is no restriction, proceed at the same speed.",
      },
      {
        id: "b",
        text: "stop the vehicle and wait for the green light to appear.",
      },
      {
        id: "c",
        text: "slow down the vehicle and proceed only after ensuring that it is safe to do so.",
      },
    ],
    correctAnswer: "c",
    typeofQ: "Road Rules",
  },
  {
    id: 145,
    question:
      "Where the road is marked with a continuous yellow line the vehicle should ...",
    options: [
      { id: "a", text: "not touch or cross the yellow line." },
      {
        id: "b",
        text: "allow overtaking only through the right side of the yellow line.",
      },
      {
        id: "c",
        text: "cross the line only when overtaking a vehicle in front.",
      },
    ],
    correctAnswer: "a",
    typeofQ: "Road Rules",
  },
  {
    id: 147,
    question: "While you are driving on gradient roads, you should ....",
    options: [
      {
        id: "a",
        text: "give precedence to the vehicles coming down the hill.",
      },
      { id: "b", text: "give precedence to the vehicles going up the hill." },
      { id: "c", text: "give precedence to the vehicles carrying heavy load." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 151,
    question:
      "While a vehicle is entering a main road from a branch road, the driver shall give preference ...",
    options: [
      { id: "a", text: "to the vehicles coming from the left." },
      { id: "b", text: "to the vehicles coming from the right." },
      { id: "c", text: "to all vehicles proceeding along the main road." },
    ],
    correctAnswer: "c",
    typeofQ: "Road Rules",
  },
  {
    id: 153,
    question: "You can overtake a vehicle through the left side if.",
    options: [
      {
        id: "a",
        text: "The driver of that vehicle indicates this intention to turn right and proceeds to the center of the road.",
      },
      { id: "b", text: "There is sufficient space on the left side." },
      { id: "c", text: "That vehicle moves slowly." },
    ],
    correctAnswer: "a",
    typeofQ: "Road Rules",
  },
  {
    id: 157,
    question: "A vehicle can be seized by authorised officers, if.",
    options: [
      {
        id: "a",
        text: "The vehicle is not covered by a valid registration or permit.",
      },
      { id: "b", text: "The vehicle is not covered by a valid insurance." },
      { id: "c", text: "The vehicle exceeds the speed limit." },
    ],
    correctAnswer: "a",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 159,
    question: "Type of horn permitted.",
    options: [
      { id: "a", text: "Air-horn." },
      { id: "b", text: "Multi-toned horn." },
      { id: "c", text: "Electric horn." },
    ],
    correctAnswer: "c",
    typeofQ: "Driving Ethics and Etiquettes",
  },
  {
    id: 160,
    question: "Road on which driving in reverse gear is prohibited.",
    options: [
      { id: "a", text: "One-way road." },
      { id: "b", text: "Steep descending road." },
      { id: "c", text: "Steep ascending road." },
    ],
    correctAnswer: "a",
    typeofQ: "Road Rules",
  },
  {
    id: 161,
    question:
      "If drunken driving is detected, the driver is liable to be punished with.",
    options: [
      {
        id: "a",
        text: "Imprisonment which may extent to 6 months or its 2000 - as fine or both.",
      },
      {
        id: "b",
        text: "Imprisonment which may extent to 1 year or fine up to 800 - or both.",
      },
      { id: "c", text: "2 years rigorous imprisonment." },
    ],
    correctAnswer: "a",
    typeofQ: "Driving Ethics and Etiquettes",
  },
  {
    id: 162,
    question: "You hold a learners licence for motor cycle.",
    options: [
      { id: "a", text: "You will drive when the traffic is less." },
      {
        id: "b",
        text: "You will drive the vehicle holding driving licence to drive motor cycle accompanies.",
      },
      {
        id: "c",
        text: "You will not carry any other person on the motor cycle except for the purpose of getting instructions from an instructor who holds a valid driving licence to drive motor cycle.",
      },
    ],
    correctAnswer: "c",
    typeofQ: "Driving Ethics and Etiquettes",
  },
  {
    id: 163,
    question:
      "When the yellow light at an intersection appear on the signal light, the driver of a approaching vehicle should.",
    options: [
      { id: "a", text: "Ensure safety and drive away." },
      { id: "b", text: "Slaw down to stop." },
      { id: "c", text: "Sound horn and proceed." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 164,
    question: "All motor vehicles must be covered by.",
    options: [
      { id: "a", text: "Life insurance." },
      { id: "b", text: "Third party insurance." },
      { id: "c", text: "Comprehensive Insurance." },
    ],
    correctAnswer: "b",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 166,
    question:
      "The number of passengers permitted to be taken in a private vehicle is recorded in the ...",
    options: [
      { id: "a", text: "registration certificate." },
      { id: "b", text: "tax token." },
      { id: "c", text: "permit." },
    ],
    correctAnswer: "a",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 171,
    question: "What is defensive driving?",
    options: [
      {
        id: "a",
        text: "driving cautiously anticipating violation of traffic rules and road signs both by drivers and other road users.",
      },
      {
        id: "b",
        text: "driving with sole aim of reaching the destination with no regards to road signs.",
      },
      {
        id: "c",
        text: "driving on the assumption that other road users will be cautious about their safety.",
      },
    ],
    correctAnswer: "a",
    typeofQ: "Driving Ethics and Etiquettes",
  },
  {
    id: 172,
    question: "Zig-zag driving is ....",
    options: [
      { id: "a", text: "dangerous to two-wheelers only." },
      { id: "b", text: "dangerous to all at all times." },
      { id: "c", text: "dangerous to four-wheeler vehicles." },
    ],
    correctAnswer: "b",
    typeofQ: "Driving Ethics and Etiquettes",
  },
  {
    id: 179,
    question:
      "Projection of load up to one metre (100 cms) towards the back is permitted ...",
    options: [
      { id: "a", text: "in a tractor." },
      { id: "b", text: "in a station wagon." },
      { id: "c", text: "in goods carriages." },
    ],
    correctAnswer: "c",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 191,
    question: "The minimum fine for over - loading in goods carriage.",
    options: [
      { id: "a", text: "Rs- 1000/-." },
      { id: "b", text: "Rs- 2000/-." },
      { id: "c", text: "Rs- 3000/-." },
    ],
    correctAnswer: "b",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 200,
    question:
      "Section 113 of the Motor Vehicles Act 1988 stipulates that the driver should not drive a vehicle ....",
    options: [
      { id: "a", text: "after consuming alcohol." },
      { id: "b", text: "exceeding the speed limit." },
      { id: "c", text: "exceeding the weight permitted to carry." },
    ],
    correctAnswer: "c",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 202,
    question:
      "The height limit of load on goods vehicle from ground level ....",
    options: [
      { id: "a", text: "3.8 meters." },
      { id: "b", text: "3 meters." },
      { id: "c", text: "no limit." },
    ],
    correctAnswer: "a",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 205,
    question:
      "According to section 129 of the Motor Vehicles Act 1988 a person driving a motorcycle shall ....",
    options: [
      { id: "a", text: "wear jerkins." },
      { id: "b", text: "wear helmet." },
      { id: "c", text: "wear shoes." },
    ],
    correctAnswer: "b",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 215,
    question: "To supervise a learner driver, you MUST ....",
    options: [
      { id: "a", text: "be an approved driving instructor." },
      { id: "b", text: "hold a driving licence." },
      { id: "c", text: "hold a learner's licence." },
    ],
    correctAnswer: "b",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 217,
    question:
      "It is essential to wear a helmet while driving a two-wheeler because ....",
    options: [
      { id: "a", text: "it is for your individual safety." },
      { id: "b", text: "otherwise, you will be caught by the traffic police." },
      { id: "c", text: "it is necessary for uniformity on the road." },
    ],
    correctAnswer: "a",
    typeofQ: "Driving Ethics and Etiquettes",
  },
  {
    id: 219,
    question:
      "You are behind a bus that has stopped to pickup of drop off passengers you should.",
    options: [
      { id: "a", text: "Wait behind patiently." },
      { id: "b", text: "Overtake from the left." },
      { id: "c", text: "Overtake from the pedestrians." },
    ],
    correctAnswer: "a",
    typeofQ: "Driving Ethics and Etiquettes",
  },
  {
    id: 241,
    question: "While driving, avoid ...",
    options: [
      { id: "a", text: "observing traffic rules." },
      { id: "b", text: "reacting to wrong behavior of other drivers." },
      { id: "c", text: "observing the dashboard gauges." },
    ],
    correctAnswer: "b",
    typeofQ: "Driving Ethics and Etiquettes",
  },
  {
    id: 268,
    question: "Noise pollution may result in.",
    options: [
      { id: "a", text: "Disturbing mental equilibrium." },
      { id: "b", text: "Disturbing the concentration of the driver." },
      { id: "c", text: "All of the above." },
    ],
    correctAnswer: "c",
    typeofQ: "Driving Ethics and Etiquettes",
  },
  {
    id: 270,
    question: "Fitment of multi toned horns on a motor vehicle is.",
    options: [
      { id: "a", text: "Permitted only in emergency." },
      {
        id: "b",
        text: "An offence under the law as it causes noise pollution.",
      },
      { id: "c", text: "For avoiding accident." },
    ],
    correctAnswer: "b",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 281,
    question: "How does alcohol affect your driving?",
    options: [
      { id: "a", text: "it increases your awareness." },
      { id: "b", text: "it reduces your concentration and attention." },
      { id: "c", text: "it increases your confidence." },
    ],
    correctAnswer: "b",
    typeofQ: "Driving Ethics and Etiquettes",
  },
  {
    id: 317,
    question:
      "Which of the following is a legal requirement for every vehicle?",
    options: [
      { id: "a", text: "first aid box." },
      { id: "b", text: "spare wheel." },
      { id: "c", text: "audio system." },
    ],
    correctAnswer: "a",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 320,
    question:
      "What are the dangerous substances that can be carried on a public service vehicle?",
    options: [
      { id: "a", text: "explosives." },
      { id: "b", text: "fuel and lubricant of the vehicles." },
      { id: "c", text: "safely packed cartridges of small arms." },
    ],
    correctAnswer: "b",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 321,
    question: "No driver of a motor vehicle shall sound the horn on ...",
    options: [
      { id: "a", text: "highways." },
      { id: "b", text: "prohibited areas by notification of the authority." },
      { id: "c", text: "rural roads." },
    ],
    correctAnswer: "b",
    typeofQ: "Driving Ethics and Etiquettes",
  },
  {
    id: 322,
    question: "If you are fined for any traffic violation, you must feel ...",
    options: [
      { id: "a", text: "proud." },
      { id: "b", text: "humiliated." },
      { id: "c", text: "to correct your attitude in future." },
    ],
    correctAnswer: "c",
    typeofQ: "Driving Ethics and Etiquettes",
  },
  {
    id: 322,
    question:
      "Which safety device fitted in a light motor vehicle protects the driver from injury?",
    options: [
      { id: "a", text: "helmet." },
      { id: "b", text: "seat belt." },
      { id: "c", text: "none of the above." },
    ],
    correctAnswer: "b",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 323,
    question: "Basic safety requirements of a two-wheeler ...",
    options: [
      { id: "a", text: "rear wheel cover/sari guard." },
      { id: "b", text: "crash guard." },
      { id: "c", text: "both of the above." },
    ],
    correctAnswer: "c",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 328,
    question: "Use of LPG as fuel in a vehicle ...",
    options: [
      { id: "a", text: "is prohibited by law." },
      { id: "b", text: "can be used after certification from authorities." },
      {
        id: "c",
        text: "cannot be used even in case of modern LPG inbuilt models.",
      },
    ],
    correctAnswer: "b",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 329,
    question: "Using LPG ...",
    options: [
      { id: "a", text: "reduces pollution." },
      { id: "b", text: "is cost-effective." },
      { id: "c", text: "all of the above." },
    ],
    correctAnswer: "c",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 331,
    question: "Towing is permitted only for ...",
    options: [
      {
        id: "a",
        text: "mechanically disabled or incompletely assembled motor vehicles.",
      },
      { id: "b", text: "registered travellers and sidecars." },
      { id: "c", text: "all of the above." },
    ],
    correctAnswer: "a",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 345,
    question: "To drive a vehicle with exposed insurance, one.",
    options: [
      {
        id: "a",
        text: "Should drive cautiously to avoid any accident or loss to third party.",
      },
      { id: "b", text: "Should not drive." },
      {
        id: "c",
        text: "May drive if the driver has a valid personal life insurance policy.",
      },
    ],
    correctAnswer: "b",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 346,
    question:
      "A person affected by a motor vehicle accident can apply for compensation before.",
    options: [
      { id: "a", text: "RTO." },
      { id: "b", text: "Motor Accident Claims Tribunal." },
      { id: "c", text: "Banker of the driver or owner." },
    ],
    correctAnswer: "b",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 349,
    question: "A motor driving licence issued in a State is valid ...",
    options: [
      { id: "a", text: "throughout India." },
      { id: "b", text: "throughout the World." },
      { id: "c", text: "only in the State of issue." },
    ],
    correctAnswer: "a",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 351,
    question:
      "Can you give a motor vehicle for driving to a person who does not have a valid licence?",
    options: [
      { id: "a", text: "yes, since the driver solely is responsible." },
      { id: "b", text: "No, since it is a serious offence." },
      {
        id: "c",
        text: "an offence only if the vehicle is involved in an accident.",
      },
    ],
    correctAnswer: "b",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 353,
    question:
      "Driving a vehicle with pollution values exceeding the limits ...",
    options: [
      { id: "a", text: "is permitted in emergency." },
      { id: "b", text: "is an offence under law." },
      { id: "c", text: "is liable for a strict warning from authorities." },
    ],
    correctAnswer: "b",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 355,
    question: "Attaching or hanging something on the rear-view mirror is ...",
    options: [
      { id: "a", text: "against regulation." },
      { id: "b", text: "permitted, depending upon its size." },
      {
        id: "c",
        text: "permitted if the object does not obstruct the view of the driver.",
      },
    ],
    correctAnswer: "a",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 362,
    question:
      "Failing to produce the P.U.C Certificate within 7 days of detection by the inspecting officer will attract ...",
    options: [
      { id: "a", text: "cancellation of driving licence." },
      { id: "b", text: "suspension of registration certificates." },
      { id: "c", text: "cancellation of insurance certificates." },
    ],
    correctAnswer: "b",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 366,
    question: "Over speeding or dangerous driving may.",
    options: [
      { id: "a", text: "Attracts a strict warning for the authorities." },
      { id: "b", text: "Is an offence and is punishable." },
      { id: "c", text: "Attract other road users." },
    ],
    correctAnswer: "b",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 372,
    question: "Fitment of a multi toned horn in a vehicle is.",
    options: [
      { id: "a", text: "Allowed." },
      { id: "b", text: "Not recommended since it is a costly alternative." },
      { id: "c", text: "Is against law." },
    ],
    correctAnswer: "c",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 384,
    question: "A school bus can be identified by.",
    options: [
      { id: "a", text: "Creame yellow paint." },
      { id: "b", text: "Red paint." },
      { id: "c", text: "Green paint." },
    ],
    correctAnswer: "a",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 391,
    question: "Painting olive green in a private motor car is ...",
    options: [
      { id: "a", text: "not permitted." },
      { id: "b", text: "permitted." },
      { id: "c", text: "special permission is required." },
    ],
    correctAnswer: "a",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 409,
    question: "Using mobile phone while driving can be punished with ...",
    options: [
      { id: "a", text: "a fine" },
      {
        id: "b",
        text: "disqualify from holding the driving licence under CMVR 21(25).",
      },
      { id: "c", text: "a court case" },
    ],
    correctAnswer: "b",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 414,
    question: "Seat belts have to be used by ...",
    options: [
      { id: "a", text: "driver only." },
      { id: "b", text: "front seat passengers only." },
      { id: "c", text: "both." },
    ],
    correctAnswer: "c",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 416,
    question: "Not using a seat belt can lead to a ...",
    options: [
      { id: "a", text: "Penalty or fine." },
      { id: "b", text: "Disabling of driving license" },
      { id: "c", text: "Punishable crime" },
    ],
    correctAnswer: "c",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 424,
    question:
      "A driver driving a vehicle in a public place without a licence is liable for ...",
    options: [
      { id: "a", text: "penalty only." },
      {
        id: "b",
        text: "penalty for the driver and the owner and/or seizure of vehicle.",
      },
      { id: "c", text: "warning." },
    ],
    correctAnswer: "b",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 165,
    question: "Minimum distance to be kept from the vehicle going in front ...",
    options: [
      { id: "a", text: "10 meter." },
      { id: "b", text: "5 meter." },
      { id: "c", text: "safe distance according to speed." },
    ],
    correctAnswer: "c",
    typeofQ: "Road Rules",
  },
  {
    id: 168,
    question: "If the road is marked with broken white lines, you ...",
    options: [
      { id: "a", text: "shall not change track." },
      { id: "b", text: "can change track if required." },
      { id: "c", text: "shall stop the vehicle." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 169,
    question: "Blinking red traffic light means ...",
    options: [
      { id: "a", text: "stop the vehicle till green light glows." },
      { id: "b", text: "stop the vehicle and proceed if safe." },
      { id: "c", text: "reduce speed and proceed." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 170,
    question:
      "Maximum permitted speed of a motor car on a national highway in the state ...",
    options: [
      { id: "a", text: "60 km/hour." },
      { id: "b", text: "70 km/hour." },
      { id: "c", text: "80 km/hour." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 172,
    question: "What is meant by stop line?",
    options: [
      {
        id: "a",
        text: "a line with 5 centimeters width in white or yellow colour at the approach of a road junction or pedestrian crossing.",
      },
      {
        id: "b",
        text: "a line drawn through the center of the road in yellow colour.",
      },
      { id: "c", text: "a broken white line through the center of the road." },
    ],
    correctAnswer: "a",
    typeofQ: "Road Rules",
  },
  {
    id: 174,
    question: "Maximum permissible speed of a motorcycle ...",
    options: [
      { id: "a", text: "no limit." },
      { id: "b", text: "50 km/hr." },
      { id: "c", text: "60 km/hr." },
    ],
    correctAnswer: "c",
    typeofQ: "Road Rules",
  },
  {
    id: 175,
    question:
      "The only vehicle which is permitted to be driven at a speed exceeding 60 km/hr ...",
    options: [
      { id: "a", text: "motorcycle." },
      { id: "b", text: "motor car." },
      { id: "c", text: "stage carriage." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 177,
    question:
      "Maximum permitted speed of trucks on a national highway in the state ...",
    options: [
      { id: "a", text: "50 km/hour." },
      { id: "b", text: "60 km/hour." },
      { id: "c", text: "70 km/hour." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 178,
    question:
      "Maximum permissible speed of a two-wheeler near an educational institution ...",
    options: [
      { id: "a", text: "25 km/hour." },
      { id: "b", text: "30 km/hour." },
      { id: "c", text: "40 km/hour." },
    ],
    correctAnswer: "a",
    typeofQ: "Road Rules",
  },
  {
    id: 182,
    question:
      "Maximum permissible speed of heavy motor vehicles in the cities.",
    options: [
      { id: "a", text: "35 Km/hr." },
      { id: "b", text: "45 Km/hr." },
      { id: "c", text: "60 Km/hr." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 183,
    question: "Maximum distance allowed between towing and towed vehicles.",
    options: [
      { id: "a", text: "15 meters." },
      { id: "b", text: "5 meters." },
      { id: "c", text: "10 meters." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 185,
    question:
      "You are driving on a two-lane street, vehicle in front of the road, and the road of the road ahead is clear for the road ahead is clear for overtaking, you should.",
    options: [
      { id: "a", text: "Pass the vehicle side." },
      { id: "b", text: "Pass the vehicle from the right hand side." },
      { id: "c", text: "Pass the vehicle from any convenient side." },
    ],
    correctAnswer: "a",
    typeofQ: "Road Rules",
  },
  {
    id: 186,
    question: "Maximum speed permitted for vehicles towing another vehicle.",
    options: [
      { id: "a", text: "20 km/hour." },
      { id: "b", text: "24 km/hour." },
      { id: "c", text: "32 km/hour." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 188,
    question:
      "Circumstances in which a motor cycle can be driven at the speed of 60 km/hour.",
    options: [
      { id: "a", text: "During night." },
      { id: "b", text: "During day time." },
      { id: "c", text: "Under no circumstances." },
    ],
    correctAnswer: "c",
    typeofQ: "Road Rules",
  },
  {
    id: 189,
    question:
      "The maximum speed permitted to motor cycles in city during night time.",
    options: [
      { id: "a", text: "25 Km/hr." },
      { id: "b", text: "30 Km/hr." },
      { id: "c", text: "40 Km/hr." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 194,
    question: "Maximum permissible speed of motor cycle on ghat roads.",
    options: [
      { id: "a", text: "40 km/hour." },
      { id: "b", text: "30 km/hour." },
      { id: "c", text: "20 km/hour." },
    ],
    correctAnswer: "a",
    typeofQ: "Road Rules",
  },
  {
    id: 196,
    question: "Maximum permissible speed of an autorickshaw.",
    options: [
      { id: "a", text: "50 Km/hr." },
      { id: "b", text: "30 Km/hr." },
      { id: "c", text: "40 Km/hr." },
    ],
    correctAnswer: "c",
    typeofQ: "Road Rules",
  },
  {
    id: 197,
    question: "Maximum permissible speed of a light motor vehicle.",
    options: [
      { id: "a", text: "60 Km/hr." },
      { id: "b", text: "70 Km/hr." },
      { id: "c", text: "No limit." },
    ],
    correctAnswer: "a",
    typeofQ: "Road Rules",
  },
  {
    id: 199,
    question: "According to section 112 of the Motor Vehicles Act 1988 ...",
    options: [
      { id: "a", text: "speed limit shall not be exceeded." },
      { id: "b", text: "shall not drive after consuming alcohol." },
      { id: "c", text: "shall not use vehicle on road without paying tax." },
    ],
    correctAnswer: "a",
    typeofQ: "Road Rules",
  },
  {
    id: 209,
    question:
      "Maximum permissible speed of an auto rickshaw in cities and municipal towns ....",
    options: [
      { id: "a", text: "40 km/hour." },
      { id: "b", text: "30 km/hour." },
      { id: "c", text: "20 km/hour." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 212,
    question:
      'You wish to take a "U" turn at an intersection controlled by a traffic light, you should ....',
    options: [
      {
        id: "a",
        text: "drive to another intersection that has no traffic light.",
      },
      {
        id: "b",
        text: 'wait until the light turns green before making the "U" turn.',
      },
      {
        id: "c",
        text: 'make the "U" turn if there is a policeman at the intersection.',
      },
    ],
    correctAnswer: "c",
    typeofQ: "Road Rules",
  },
  {
    id: 214,
    question:
      "You are on a long downhill slope. What should you do to help control the speed of your vehicle?",
    options: [
      { id: "a", text: "stop the engine." },
      { id: "b", text: "select neutral." },
      { id: "c", text: "select low gear." },
    ],
    correctAnswer: "c",
    typeofQ: "Road Rules",
  },
  {
    id: 216,
    question: "While on a roundabout ....",
    options: [
      { id: "a", text: "traffic entering has the right of way." },
      { id: "b", text: "traffic exiting has the right of way." },
      { id: "c", text: "traffic on the roundabout has the right of way." },
    ],
    correctAnswer: "c",
    typeofQ: "Road Rules",
  },
  {
    id: 221,
    question: "The middle lane is for.",
    options: [
      { id: "a", text: "Overtaking." },
      { id: "b", text: "Two wheelers." },
      { id: "c", text: "Traffic at 40 km/h." },
    ],
    correctAnswer: "c",
    typeofQ: "Road Rules",
  },
  {
    id: 222,
    question: "A flashing yellow signal is used when.",
    options: [
      { id: "a", text: "Traffic lights aren't working." },
      { id: "b", text: "You should slow down & proceed with caution." },
      { id: "c", text: "Men are at work." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 227,
    question: "When approaching a crossing where you are to go straight.",
    options: [
      { id: "a", text: "Change lanes to the right lane." },
      { id: "b", text: "Change lanes at least 50 the middle lane." },
      { id: "c", text: "Change lanes to the middle lane at the crossing." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 229,
    question: "When must you use a dipped high beam headlight during the day?",
    options: [
      { id: "a", text: "In pace visibility and highways." },
      { id: "b", text: "On country roads." },
      { id: "c", text: "Along narrow streets." },
    ],
    correctAnswer: "a",
    typeofQ: "Road Rules",
  },
  {
    id: 242,
    question: "The continuous yellow line in the center of the road means ...",
    options: [
      { id: "a", text: "no parking." },
      { id: "b", text: "do not overtake." },
      { id: "c", text: "stop." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 245,
    question:
      "When approaching a right-hand curve, you should keep well to the left to ...",
    options: [
      { id: "a", text: "improve your view of the road." },
      { id: "b", text: "avoid skid." },
      { id: "c", text: "pass the vehicle from behind." },
    ],
    correctAnswer: "a",
    typeofQ: "Road Rules",
  },
  {
    id: 246,
    question: "While you are approaching a staggered junction, you should ...",
    options: [
      { id: "a", text: "slow the vehicle." },
      { id: "b", text: "maintain your speed and sound the horn." },
      { id: "c", text: "use hazard warning light." },
    ],
    correctAnswer: "a",
    typeofQ: "Road Rules",
  },
  {
    id: 247,
    question: "At the blind junction you must stop ...",
    options: [
      { id: "a", text: "only if there is traffic on the main road." },
      {
        id: "b",
        text: "behind the line and move forward slowly as vision improves.",
      },
      { id: "c", text: "only if you are turning to the right." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 254,
    question: "The mandatory signs giving orders are mostly in ...",
    options: [
      { id: "a", text: "red/blue circles." },
      { id: "b", text: "red triangles." },
      { id: "c", text: "base triangles." },
    ],
    correctAnswer: "a",
    typeofQ: "Road Rules",
  },
  {
    id: 258,
    question: "While taking 'U' turn in this road, You should.",
    options: [
      { id: "a", text: "Move forward since prohibited." },
      { id: "b", text: "Look in the metor give signal and turn." },
      { id: "c", text: "Not provided in the document." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 259,
    question: "When you are moving from a parking place, You should.",
    options: [
      {
        id: "a",
        text: "Use the rear view mirrors, check in the third spot and give signal.",
      },
      { id: "b", text: "Sound the vehicle." },
      { id: "c", text: "Not provided in the document." },
    ],
    correctAnswer: "a",
    typeofQ: "Road Rules",
  },
  {
    id: 261,
    question:
      "You are intending to turn left you should position your vehicle at.",
    options: [
      { id: "a", text: "The middle lane." },
      { id: "b", text: "The left hand lane." },
      { id: "c", text: "On the shoulder of the road." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 262,
    question:
      "You are in a wrong lane while approaching a busy Junction you should.",
    options: [
      { id: "a", text: "Continue in that lane." },
      { id: "b", text: "Stop until other lane is cleared." },
      { id: "c", text: "Show signal and cut across." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 263,
    question: "When going straight ahead at a round about.",
    options: [
      { id: "a", text: "Indicate right signal and then left signal." },
      { id: "b", text: "No signals is required." },
      { id: "c", text: "Use hazard warning lamp." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 264,
    question: "You must not reverse your vehicle.",
    options: [
      { id: "a", text: "On a busy road." },
      { id: "b", text: "On a one way road." },
      { id: "c", text: "All of the above." },
    ],
    correctAnswer: "c",
    typeofQ: "Road Rules",
  },
  {
    id: 266,
    question:
      "When approaching from the rear, where two lanes of traffic have stopped at a signal, you should.",
    options: [
      { id: "a", text: "Pass all the vehicle in the in front of them." },
      {
        id: "b",
        text: "Stop behind the last vehicle in the appropriate lane.",
      },
      { id: "c", text: "Stop any where." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 289,
    question: "When stopping on an uphill gradient, one should ...",
    options: [
      { id: "a", text: "hold the vehicle on the clutch." },
      { id: "b", text: "hold the vehicle on the foot brake." },
      {
        id: "c",
        text: "hold the vehicle applying parking brake after stopping.",
      },
    ],
    correctAnswer: "c",
    typeofQ: "Road Rules",
  },
  {
    id: 292,
    question:
      "Driving the vehicle in neutral gear downhill is dangerous because it affects the ...",
    options: [
      { id: "a", text: "cooling system." },
      { id: "b", text: "speed governor." },
      { id: "c", text: "brake system." },
    ],
    correctAnswer: "c",
    typeofQ: "Road Rules",
  },
  {
    id: 294,
    question: "How can you avoid harsh driving?",
    options: [
      { id: "a", text: "gently apply the parking brake." },
      { id: "b", text: "plan and take earlier action in using brakes." },
      { id: "c", text: "slow down by using gears only." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 295,
    question:
      "On which occasions would passengers be most likely to notice weight transfer?",
    options: [
      { id: "a", text: "braking." },
      { id: "b", text: "cornering." },
      { id: "c", text: "both of the above." },
    ],
    correctAnswer: "c",
    typeofQ: "Road Rules",
  },
  {
    id: 296,
    question:
      "Which of the following should you do before a bend, roundabout or corner?",
    options: [
      { id: "a", text: "select the appropriate gear." },
      { id: "b", text: "adjust your speed." },
      { id: "c", text: "both of the above." },
    ],
    correctAnswer: "c",
    typeofQ: "Road Rules",
  },
  {
    id: 307,
    question: "What should be checked first before turning to the left?",
    options: [
      { id: "a", text: "The right side mirror." },
      { id: "b", text: "The left side mirror." },
      { id: "c", text: "Look behind over your right shoulders." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 308,
    question: "You are about to move off you should always.",
    options: [
      {
        id: "a",
        text: "Using your mirrors look behind and give proper signal.",
      },
      { id: "b", text: "Signal left with indicator and move." },
      { id: "c", text: "Use only the off side mirror and move away quickly." },
    ],
    correctAnswer: "a",
    typeofQ: "Road Rules",
  },
  {
    id: 310,
    question: "The turning circle of a vehicle is the.",
    options: [
      {
        id: "a",
        text: "Number of turns of the steering wheels between locked.",
      },
      { id: "b", text: "Amount by which a vehicle cuts corners." },
      { id: "c", text: "Amount of space needed for the vehicle to turn." },
    ],
    correctAnswer: "c",
    typeofQ: "Road Rules",
  },
  {
    id: 314,
    question:
      'A motor cycle rider observes a signboard which indicates "Restrictions ends", can he travel at a speed of.',
    options: [
      { id: "a", text: "More than 50 kmph." },
      { id: "b", text: "Maximum speed of the vehicle." },
      { id: "c", text: "Not more than 50 km/hr." },
    ],
    correctAnswer: "c",
    typeofQ: "Road Rules",
  },
  {
    id: 315,
    question:
      "The correct procedure for stopping a vehicle not equipped with an anti-lock brake system ...",
    options: [
      {
        id: "a",
        text: "apply the foot brake firmly in a pumping action until the vehicle has stopped.",
      },
      {
        id: "b",
        text: "apply the foot brake firmly once until the vehicle has been stopped.",
      },
      {
        id: "c",
        text: "apply the foot brake and hand brake until the vehicle has stopped.",
      },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 316,
    question:
      "You are driving a vehicle fitted with a speed governor. You should be careful when ...",
    options: [
      { id: "a", text: "overtaking another vehicle." },
      { id: "b", text: "cornering." },
      { id: "c", text: "braking." },
    ],
    correctAnswer: "a",
    typeofQ: "Road Rules",
  },
  {
    id: 318,
    question:
      "A driver of a motor car driving behind a long truck can keep ...",
    options: [
      { id: "a", text: "1.2 meters as a braking distance." },
      { id: "b", text: "2.5 meters." },
      { id: "c", text: "safe distance." },
    ],
    correctAnswer: "c",
    typeofQ: "Road Rules",
  },
  {
    id: 330,
    question: "On roads with defined lanes ...",
    options: [
      {
        id: "a",
        text: "use appropriate indicator signals before changing lanes.",
      },
      {
        id: "b",
        text: "lane changing is prohibited, and one must look back before changing lanes.",
      },
      {
        id: "c",
        text: "observe through the front window before changing lanes.",
      },
    ],
    correctAnswer: "a",
    typeofQ: "Road Rules",
  },
  {
    id: 335,
    question:
      "You are moving into the street from a parallel parking space, you should.",
    options: [
      { id: "a", text: "Blow horn and pull out slowly." },
      {
        id: "b",
        text: "Show signal to other traffic and then move carefully.",
      },
      {
        id: "c",
        text: "Proceed with caution after making sure that there is no vehicle in the vicinity that may cause an accident.",
      },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 337,
    question: "In lane traffic, before making a right turn you should be in.",
    options: [
      { id: "a", text: "Any lane." },
      { id: "b", text: "Extreme left lane." },
      { id: "c", text: "Extreme right lane." },
    ],
    correctAnswer: "c",
    typeofQ: "Road Rules",
  },
  {
    id: 342,
    question: "While driving a motor cycle behind a four wheeler, you should.",
    options: [
      {
        id: "a",
        text: "Keep the motor cycle in the centre and behind the vehicle ahead.",
      },
      { id: "b", text: "Stay slightly on the right or belt of the vehicle." },
      { id: "c", text: "None of the above." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 344,
    question: "While parking the vehicle, you should.",
    options: [
      {
        id: "a",
        text: "Peak the vehicle in such a way that it does not obstruct or make inconvenience to other road users.",
      },
      { id: "b", text: "Parellel to the kerb." },
      { id: "c", text: "Right angle to the kerb." },
    ],
    correctAnswer: "a",
    typeofQ: "Road Rules",
  },
  {
    id: 354,
    question: "Abrupt braking shall not be resorted to ...",
    options: [
      { id: "a", text: "unless it is absolutely necessary." },
      { id: "b", text: "on downhill." },
      { id: "c", text: "on main road." },
    ],
    correctAnswer: "a",
    typeofQ: "Road Rules",
  },
  {
    id: 356,
    question:
      "While passing a procession, body of troops or men at work, you should ...",
    options: [
      { id: "a", text: "proceed at regular speed." },
      { id: "b", text: "stop." },
      { id: "c", text: "proceed with not more than 25 Km/hr and carefully." },
    ],
    correctAnswer: "c",
    typeofQ: "Road Rules",
  },
  {
    id: 357,
    question: "To stop a motorcycle, you should ...",
    options: [
      { id: "a", text: "apply rear brake only." },
      { id: "b", text: "apply both front and rear brakes simultaneously." },
      { id: "c", text: "apply front brakes." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 358,
    question:
      "While travelling together (group riding), two or more motorcycles can take the position ...",
    options: [
      { id: "a", text: "side by side." },
      {
        id: "b",
        text: "maintain the lane in a staggered position, keeping a proper distance between motorcycles.",
      },
      { id: "c", text: "travel behind each other in a single line." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 359,
    question:
      "While approaching a section of roadway with loose sand or gravel, you should ...",
    options: [
      { id: "a", text: "hit the area as fast as possible." },
      { id: "b", text: "go as slowly as possible." },
      {
        id: "c",
        text: "slow down and change to high torque gears before entering.",
      },
    ],
    correctAnswer: "c",
    typeofQ: "Road Rules",
  },
  {
    id: 360,
    question: "You can conserve fuel when you drive the vehicle at ...",
    options: [
      { id: "a", text: "high speeds in high torque gears." },
      { id: "b", text: "high speed in low torque gears." },
      { id: "c", text: "a moderate uniform speed of 45-55 KMPH in top gear." },
    ],
    correctAnswer: "c",
    typeofQ: "Road Rules",
  },
  {
    id: 367,
    question: "Clutch riding or Riding on clutch means.",
    options: [
      { id: "a", text: "Using clutch frequently." },
      { id: "b", text: "Keeping a foot on the clutch pedal." },
      { id: "c", text: "Not using clutch at all." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 373,
    question: "Flashing yellow traffic light means.",
    options: [
      { id: "a", text: "Continue at the same speed." },
      { id: "b", text: "Stop, if possible to do so." },
      { id: "c", text: "Slow down and proceed with caution." },
    ],
    correctAnswer: "c",
    typeofQ: "Road Rules",
  },
  {
    id: 376,
    question:
      "When you are approaching a round to which you are about to enter you should.",
    options: [
      { id: "a", text: "Continue into the calculus traffic at slow speed." },
      {
        id: "b",
        text: "Give way to the vehicles coming from the right direction.",
      },
      { id: "c", text: "Use the outside lane only." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 377,
    question:
      "When you approach an intersection and you are in main road without traffic lights, police man and traffic signs, you should.",
    options: [
      {
        id: "a",
        text: "Slow down and be cautious to negotiate the intersection.",
      },
      { id: "b", text: "Came to full stop and proceed with caution." },
      { id: "c", text: "Not change speed if the way is clear." },
    ],
    correctAnswer: "a",
    typeofQ: "Road Rules",
  },
  {
    id: 385,
    question:
      "While you intend to take a right or left turn, the sequence of action which you have to do.",
    options: [
      { id: "a", text: "Gear -minor-signal." },
      { id: "b", text: "Mirror-gear-signal." },
      { id: "c", text: "Signal-gear-minor." },
    ],
    correctAnswer: "a",
    typeofQ: "Road Rules",
  },
  {
    id: 386,
    question:
      "The sequence of operation when your vehicle moves from a stationary position are.",
    options: [
      { id: "a", text: "Mirror-5taut-gear-signal move." },
      { id: "b", text: "Start-gear-minor-signal-move." },
      { id: "c", text: "Start-minor-signal-gear-move." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 387,
    question: "The safe way to stop the vehicle ...",
    options: [
      { id: "a", text: "press clutch and then brake." },
      { id: "b", text: "press brake and then clutch." },
      { id: "c", text: "press clutch and brake simultaneously." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 388,
    question: "The safest way to negotiate a steep descent ...",
    options: [
      { id: "a", text: "use higher torque gear with brake." },
      { id: "b", text: "use top gear with brake." },
      { id: "c", text: "use brake and clutch simultaneously." },
    ],
    correctAnswer: "a",
    typeofQ: "Road Rules",
  },
  {
    id: 392,
    question: "For higher power, the gear to be used is ...",
    options: [
      { id: "a", text: "1st gear." },
      { id: "b", text: "top gear." },
      { id: "c", text: "2nd gear." },
    ],
    correctAnswer: "a",
    typeofQ: "Road Rules",
  },
  {
    id: 393,
    question: "Abrupt braking by the driver ...",
    options: [
      { id: "a", text: "is allowed for safety reasons." },
      { id: "b", text: "is not encouraged." },
      { id: "c", text: "is allowed on busy roads." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 396,
    question:
      "While parking your vehicle on a downward gradient, in addition to applying the hand brake, the gear engaged should be ...",
    options: [
      { id: "a", text: "neutral gear." },
      { id: "b", text: "first gear." },
      { id: "c", text: "reverse gear." },
    ],
    correctAnswer: "c",
    typeofQ: "Road Rules",
  },
  {
    id: 397,
    question: "While turning right or left, it is safer if you ...",
    options: [
      { id: "a", text: "use only indicators." },
      { id: "b", text: "show only a hand signal." },
      { id: "c", text: "use both light indicators and hand signal." },
    ],
    correctAnswer: "c",
    typeofQ: "Road Rules",
  },
  {
    id: 399,
    question:
      "On ghat roads, when vehicles approach from opposite sides, the driver traveling downhill shall ...",
    options: [
      { id: "a", text: "drive fast before the opposite vehicle enters." },
      { id: "b", text: "switch on the headlights and take the way." },
      { id: "c", text: "give preference to the vehicles going up." },
    ],
    correctAnswer: "c",
    typeofQ: "Road Rules",
  },
  {
    id: 406,
    question: "Under which circumstance should you avoid overtaking?",
    options: [
      { id: "a", text: "after a curve." },
      { id: "b", text: "on a curve." },
      { id: "c", text: "when the visibility ahead is clear." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 407,
    question: "Which type of parking is more suitable on wide roads?",
    options: [
      { id: "a", text: "in-line." },
      { id: "b", text: "parallel." },
      { id: "c", text: "inclined." },
    ],
    correctAnswer: "c",
    typeofQ: "Road Rules",
  },
  {
    id: 408,
    question:
      "When a pedestrian steps onto a zebra crossing in front of you to cross the road ...",
    options: [
      {
        id: "a",
        text: "stop before the stop line and treat it as a stop signal.",
      },
      { id: "b", text: "you have to proceed before him." },
      {
        id: "c",
        text: "sound the horn and speed up your vehicle to cross before him.",
      },
    ],
    correctAnswer: "a",
    typeofQ: "Road Rules",
  },
  {
    id: 411,
    question:
      "While driving behind a motorcycle on a badly maintained road, you should ...",
    options: [
      { id: "a", text: "continuously blow horn." },
      { id: "b", text: "overtake immediately." },
      { id: "c", text: "keep safe distance." },
    ],
    correctAnswer: "c",
    typeofQ: "Road Rules",
  },
  {
    id: 413,
    question:
      "If permitted, a free turn can be taken while turning left at a junction ...",
    options: [
      { id: "a", text: "while travelling straight." },
      { id: "b", text: "while taking a right turn." },
    ],
    correctAnswer: "a",
    typeofQ: "Road Rules",
  },
  {
    id: 432,
    question: "A flashing yellow at an intersection means ?",
    options: [
      { id: "a", text: "Proceed with caution" },
      { id: "b", text: "Stop and proceed" },
      { id: "c", text: "Proceed fast" },
    ],
    correctAnswer: "a",
    typeofQ: "Road Rules",
  },
  // Situational Scenarios and Emergencies
  {
    id: 13,
    question: "How can you distinguish a transport vehicle.",
    options: [
      { id: "a", text: "By looking at the tyre size." },
      { id: "b", text: "By looking at the number plate of the vehicle." },
      { id: "c", text: "By colour of the vehicle." },
    ],
    correctAnswer: "b",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 15,
    question: "Validity of learners licence.",
    options: [
      { id: "a", text: "6 months" },
      { id: "b", text: "30 days" },
      { id: "c", text: "Till the driving licence is obtained" },
    ],
    correctAnswer: "a",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 63,
    question: "Records of a private vehicle are.",
    options: [
      {
        id: "a",
        text: "Registration Certificate, G.C.R., Insurance Certificate",
      },
      {
        id: "b",
        text: "Registration certificate, Insurance Certificate, Tax Token, Driving Licence",
      },
      { id: "c", text: "Registration Certificate, Permit, Trip Sheet" },
    ],
    correctAnswer: "b",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 67,
    question: "Validity of P.U.C.C. Pollution Under Control Certificate.",
    options: [
      { id: "a", text: "6 months" },
      { id: "b", text: "One Year" },
      { id: "c", text: "Two years" },
    ],
    correctAnswer: "a",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 93,
    question: "The hand brake is to be used.",
    options: [
      { id: "a", text: "to reduce the speed." },
      { id: "b", text: "to apply sudden brake." },
      { id: "c", text: "to park a vehicle." },
    ],
    correctAnswer: "c",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 95,
    question: "More than two persons on a two-wheeler is.",
    options: [
      { id: "a", text: "allowed in unavoidable circumstances." },
      { id: "b", text: "violation of law." },
      { id: "c", text: "allowed when the traffic is less." },
    ],
    correctAnswer: "b",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 99,
    question: "Using an unregistered vehicle in a public place is.",
    options: [
      { id: "a", text: "illegal." },
      { id: "b", text: "legal." },
      { id: "c", text: "legal if there is urgency." },
    ],
    correctAnswer: "a",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 101,
    question:
      "Minimum age for obtaining driving licence for transport vehicles.",
    options: [
      { id: "a", text: "25 years." },
      { id: "b", text: "18 years." },
      { id: "c", text: "20 years." },
    ],
    correctAnswer: "c",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 109,
    question: "Over speeding.",
    options: [
      {
        id: "a",
        text: "Is an offence leading to suspension or cancellation of driving licence.",
      },
      { id: "b", text: "Is an offence leading to punishment by fine only." },
      { id: "c", text: "Is not an offence." },
    ],
    correctAnswer: "a",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 131,
    question: "Smoking while driving public service vehicle.",
    options: [
      { id: "a", text: "Can attract suspension of driving licence." },
      { id: "b", text: "Can attract fine only." },
      { id: "c", text: "None of the above." },
    ],
    correctAnswer: "a",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 133,
    question:
      "Abandoning vehicle in a public place causing inconvenience to others or passengers.",
    options: [
      {
        id: "a",
        text: "The driving licence is liable to be suspended or cancelled.",
      },
      { id: "b", text: "Only fine is attracted." },
      { id: "c", text: "None of the above." },
    ],
    correctAnswer: "a",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 135,
    question:
      "Abandoning a transport vehicle as a mark of protest or opinion on any kind of strike, in a public place or in any other place causing obstruction or inconvenience to the public or passengers or on the use of such places.",
    options: [
      {
        id: "a",
        text: "The driving licence is liable to be suspended or cancelled.",
      },
      { id: "b", text: "Only fine is attracted." },
      { id: "c", text: "Legitimate right of driver." },
    ],
    correctAnswer: "a",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 137,
    question: "Carrying overload in goods carriages.",
    options: [
      { id: "a", text: "Legally not punishable." },
      { id: "b", text: "Only fine is attracted." },
      {
        id: "c",
        text: "Can attract suspension or cancellation of driving licence.",
      },
    ],
    correctAnswer: "c",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 157,
    question: "A vehicle can be seized by authorised officers, if.",
    options: [
      {
        id: "a",
        text: "The vehicle is not covered by a valid registration or permit.",
      },
      { id: "b", text: "The vehicle is not covered by a valid insurance." },
      { id: "c", text: "The vehicle exceeds the speed limit." },
    ],
    correctAnswer: "a",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 164,
    question: "All motor vehicles must be covered by.",
    options: [
      { id: "a", text: "Life insurance." },
      { id: "b", text: "Third party insurance." },
      { id: "c", text: "Comprehensive Insurance." },
    ],
    correctAnswer: "b",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 166,
    question:
      "The number of passengers permitted to be taken in a private vehicle is recorded in the ...",
    options: [
      { id: "a", text: "registration certificate." },
      { id: "b", text: "tax token." },
      { id: "c", text: "permit." },
    ],
    correctAnswer: "a",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 179,
    question:
      "Projection of load up to one metre (100 cms) towards the back is permitted ...",
    options: [
      { id: "a", text: "in a tractor." },
      { id: "b", text: "in a station wagon." },
      { id: "c", text: "in goods carriages." },
    ],
    correctAnswer: "c",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 191,
    question: "The minimum fine for over - loading in goods carriage.",
    options: [
      { id: "a", text: "Rs- 1000/-." },
      { id: "b", text: "Rs- 2000/-." },
      { id: "c", text: "Rs- 3000/-." },
    ],
    correctAnswer: "b",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 200,
    question:
      "Section 113 of the Motor Vehicles Act 1988 stipulates that the driver should not drive a vehicle ....",
    options: [
      { id: "a", text: "after consuming alcohol." },
      { id: "b", text: "exceeding the speed limit." },
      { id: "c", text: "exceeding the weight permitted to carry." },
    ],
    correctAnswer: "c",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 202,
    question:
      "The height limit of load on goods vehicle from ground level ....",
    options: [
      { id: "a", text: "3.8 meters." },
      { id: "b", text: "3 meters." },
      { id: "c", text: "no limit." },
    ],
    correctAnswer: "a",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 205,
    question:
      "According to section 129 of the Motor Vehicles Act 1988 a person driving a motorcycle shall ....",
    options: [
      { id: "a", text: "wear jerkins." },
      { id: "b", text: "wear helmet." },
      { id: "c", text: "wear shoes." },
    ],
    correctAnswer: "b",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 215,
    question: "To supervise a learner driver, you MUST ....",
    options: [
      { id: "a", text: "be an approved driving instructor." },
      { id: "b", text: "hold a driving licence." },
      { id: "c", text: "hold a learner's licence." },
    ],
    correctAnswer: "b",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 217,
    question:
      "It is essential to wear a helmet while driving a two-wheeler because ....",
    options: [
      { id: "a", text: "it is for your individual safety." },
      { id: "b", text: "otherwise, you will be caught by the traffic police." },
      { id: "c", text: "it is necessary for uniformity on the road." },
    ],
    correctAnswer: "a",
    typeofQ: "Driving Ethics and Etiquettes",
  },
  {
    id: 219,
    question:
      "You are behind a bus that has stopped to pickup of drop off passengers you should.",
    options: [
      { id: "a", text: "Wait behind patiently." },
      { id: "b", text: "Overtake from the left." },
      { id: "c", text: "Overtake from the pedestrians." },
    ],
    correctAnswer: "a",
    typeofQ: "Driving Ethics and Etiquettes",
  },
  {
    id: 241,
    question: "While driving, avoid ...",
    options: [
      { id: "a", text: "observing traffic rules." },
      { id: "b", text: "reacting to wrong behavior of other drivers." },
      { id: "c", text: "observing the dashboard gauges." },
    ],
    correctAnswer: "b",
    typeofQ: "Driving Ethics and Etiquettes",
  },
  {
    id: 268,
    question: "Noise pollution may result in.",
    options: [
      { id: "a", text: "Disturbing mental equilibrium." },
      { id: "b", text: "Disturbing the concentration of the driver." },
      { id: "c", text: "All of the above." },
    ],
    correctAnswer: "c",
    typeofQ: "Driving Ethics and Etiquettes",
  },
  {
    id: 270,
    question: "Fitment of multi toned horns on a motor vehicle is.",
    options: [
      { id: "a", text: "Permitted only in emergency." },
      {
        id: "b",
        text: "An offence under the law as it causes noise pollution.",
      },
      { id: "c", text: "For avoiding accident." },
    ],
    correctAnswer: "b",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 281,
    question: "How does alcohol affect your driving?",
    options: [
      { id: "a", text: "it increases your awareness." },
      { id: "b", text: "it reduces your concentration and attention." },
      { id: "c", text: "it increases your confidence." },
    ],
    correctAnswer: "b",
    typeofQ: "Driving Ethics and Etiquettes",
  },
  {
    id: 317,
    question:
      "Which of the following is a legal requirement for every vehicle?",
    options: [
      { id: "a", text: "first aid box." },
      { id: "b", text: "spare wheel." },
      { id: "c", text: "audio system." },
    ],
    correctAnswer: "a",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 320,
    question:
      "What are the dangerous substances that can be carried on a public service vehicle?",
    options: [
      { id: "a", text: "explosives." },
      { id: "b", text: "fuel and lubricant of the vehicles." },
      { id: "c", text: "safely packed cartridges of small arms." },
    ],
    correctAnswer: "b",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 321,
    question: "No driver of a motor vehicle shall sound the horn on ...",
    options: [
      { id: "a", text: "highways." },
      { id: "b", text: "prohibited areas by notification of the authority." },
      { id: "c", text: "rural roads." },
    ],
    correctAnswer: "b",
    typeofQ: "Driving Ethics and Etiquettes",
  },
  {
    id: 322,
    question: "If you are fined for any traffic violation, you must feel ...",
    options: [
      { id: "a", text: "proud." },
      { id: "b", text: "humiliated." },
      { id: "c", text: "to correct your attitude in future." },
    ],
    correctAnswer: "c",
    typeofQ: "Driving Ethics and Etiquettes",
  },
  {
    id: 322,
    question:
      "Which safety device fitted in a light motor vehicle protects the driver from injury?",
    options: [
      { id: "a", text: "helmet." },
      { id: "b", text: "seat belt." },
      { id: "c", text: "none of the above." },
    ],
    correctAnswer: "b",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 323,
    question: "Basic safety requirements of a two-wheeler ...",
    options: [
      { id: "a", text: "rear wheel cover/sari guard." },
      { id: "b", text: "crash guard." },
      { id: "c", text: "both of the above." },
    ],
    correctAnswer: "c",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 328,
    question: "Use of LPG as fuel in a vehicle ...",
    options: [
      { id: "a", text: "is prohibited by law." },
      { id: "b", text: "can be used after certification from authorities." },
      {
        id: "c",
        text: "cannot be used even in case of modern LPG inbuilt models.",
      },
    ],
    correctAnswer: "b",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 329,
    question: "Using LPG ...",
    options: [
      { id: "a", text: "reduces pollution." },
      { id: "b", text: "is cost-effective." },
      { id: "c", text: "all of the above." },
    ],
    correctAnswer: "c",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 331,
    question: "Towing is permitted only for ...",
    options: [
      {
        id: "a",
        text: "mechanically disabled or incompletely assembled motor vehicles.",
      },
      { id: "b", text: "registered travellers and sidecars." },
      { id: "c", text: "all of the above." },
    ],
    correctAnswer: "a",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 345,
    question: "To drive a vehicle with exposed insurance, one.",
    options: [
      {
        id: "a",
        text: "Should drive cautiously to avoid any accident or loss to third party.",
      },
      { id: "b", text: "Should not drive." },
      {
        id: "c",
        text: "May drive if the driver has a valid personal life insurance policy.",
      },
    ],
    correctAnswer: "b",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 346,
    question:
      "A person affected by a motor vehicle accident can apply for compensation before.",
    options: [
      { id: "a", text: "RTO." },
      { id: "b", text: "Motor Accident Claims Tribunal." },
      { id: "c", text: "Banker of the driver or owner." },
    ],
    correctAnswer: "b",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 349,
    question: "A motor driving licence issued in a State is valid ...",
    options: [
      { id: "a", text: "throughout India." },
      { id: "b", text: "throughout the World." },
      { id: "c", text: "only in the State of issue." },
    ],
    correctAnswer: "a",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 351,
    question:
      "Can you give a motor vehicle for driving to a person who does not have a valid licence?",
    options: [
      { id: "a", text: "yes, since the driver solely is responsible." },
      { id: "b", text: "No, since it is a serious offence." },
      {
        id: "c",
        text: "an offence only if the vehicle is involved in an accident.",
      },
    ],
    correctAnswer: "b",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 353,
    question:
      "Driving a vehicle with pollution values exceeding the limits ...",
    options: [
      { id: "a", text: "is permitted in emergency." },
      { id: "b", text: "is an offence under law." },
      { id: "c", text: "is liable for a strict warning from authorities." },
    ],
    correctAnswer: "b",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 355,
    question: "Attaching or hanging something on the rear-view mirror is ...",
    options: [
      { id: "a", text: "against regulation." },
      { id: "b", text: "permitted, depending upon its size." },
      {
        id: "c",
        text: "permitted if the object does not obstruct the view of the driver.",
      },
    ],
    correctAnswer: "a",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 362,
    question:
      "Failing to produce the P.U.C Certificate within 7 days of detection by the inspecting officer will attract ...",
    options: [
      { id: "a", text: "cancellation of driving licence." },
      { id: "b", text: "suspension of registration certificates." },
      { id: "c", text: "cancellation of insurance certificates." },
    ],
    correctAnswer: "b",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 366,
    question: "Over speeding or dangerous driving may.",
    options: [
      { id: "a", text: "Attracts a strict warning for the authorities." },
      { id: "b", text: "Is an offence and is punishable." },
      { id: "c", text: "Attract other road users." },
    ],
    correctAnswer: "b",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 372,
    question: "Fitment of a multi toned horn in a vehicle is.",
    options: [
      { id: "a", text: "Allowed." },
      { id: "b", text: "Not recommended since it is a costly alternative." },
      { id: "c", text: "Is against law." },
    ],
    correctAnswer: "c",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 384,
    question: "A school bus can be identified by.",
    options: [
      { id: "a", text: "Creame yellow paint." },
      { id: "b", text: "Red paint." },
      { id: "c", text: "Green paint." },
    ],
    correctAnswer: "a",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 391,
    question: "Painting olive green in a private motor car is ...",
    options: [
      { id: "a", text: "not permitted." },
      { id: "b", text: "permitted." },
      { id: "c", text: "special permission is required." },
    ],
    correctAnswer: "a",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 409,
    question: "Using mobile phone while driving can be punished with ...",
    options: [
      { id: "a", text: "a fine" },
      {
        id: "b",
        text: "disqualify from holding the driving licence under CMVR 21(25).",
      },
      { id: "c", text: "a court case" },
    ],
    correctAnswer: "b",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 414,
    question: "Seat belts have to be used by ...",
    options: [
      { id: "a", text: "driver only." },
      { id: "b", text: "front seat passengers only." },
      { id: "c", text: "both." },
    ],
    correctAnswer: "c",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 416,
    question: "Not using a seat belt can lead to a ...",
    options: [
      { id: "a", text: "Penalty or fine." },
      { id: "b", text: "Disabling of driving license" },
      { id: "c", text: "Punishable crime" },
    ],
    correctAnswer: "c",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 424,
    question:
      "A driver driving a vehicle in a public place without a licence is liable for ...",
    options: [
      { id: "a", text: "penalty only." },
      {
        id: "b",
        text: "penalty for the driver and the owner and/or seizure of vehicle.",
      },
      { id: "c", text: "warning." },
    ],
    correctAnswer: "b",
    typeofQ: "Regulations and Documentations",
  },
  {
    id: 165,
    question: "Minimum distance to be kept from the vehicle going in front ...",
    options: [
      { id: "a", text: "10 meter." },
      { id: "b", text: "5 meter." },
      { id: "c", text: "safe distance according to speed." },
    ],
    correctAnswer: "c",
    typeofQ: "Road Rules",
  },
  {
    id: 168,
    question: "If the road is marked with broken white lines, you ...",
    options: [
      { id: "a", text: "shall not change track." },
      { id: "b", text: "can change track if required." },
      { id: "c", text: "shall stop the vehicle." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 169,
    question: "Blinking red traffic light means ...",
    options: [
      { id: "a", text: "stop the vehicle till green light glows." },
      { id: "b", text: "stop the vehicle and proceed if safe." },
      { id: "c", text: "reduce speed and proceed." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 170,
    question:
      "Maximum permitted speed of a motor car on a national highway in the state ...",
    options: [
      { id: "a", text: "60 km/hour." },
      { id: "b", text: "70 km/hour." },
      { id: "c", text: "80 km/hour." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 172,
    question: "What is meant by stop line?",
    options: [
      {
        id: "a",
        text: "a line with 5 centimeters width in white or yellow colour at the approach of a road junction or pedestrian crossing.",
      },
      {
        id: "b",
        text: "a line drawn through the center of the road in yellow colour.",
      },
      { id: "c", text: "a broken white line through the center of the road." },
    ],
    correctAnswer: "a",
    typeofQ: "Road Rules",
  },
  {
    id: 174,
    question: "Maximum permissible speed of a motorcycle ...",
    options: [
      { id: "a", text: "no limit." },
      { id: "b", text: "50 km/hr." },
      { id: "c", text: "60 km/hr." },
    ],
    correctAnswer: "c",
    typeofQ: "Road Rules",
  },
  {
    id: 175,
    question:
      "The only vehicle which is permitted to be driven at a speed exceeding 60 km/hr ...",
    options: [
      { id: "a", text: "motorcycle." },
      { id: "b", text: "motor car." },
      { id: "c", text: "stage carriage." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 177,
    question:
      "Maximum permitted speed of trucks on a national highway in the state ...",
    options: [
      { id: "a", text: "50 km/hour." },
      { id: "b", text: "60 km/hour." },
      { id: "c", text: "70 km/hour." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 178,
    question:
      "Maximum permissible speed of a two-wheeler near an educational institution ...",
    options: [
      { id: "a", text: "25 km/hour." },
      { id: "b", text: "30 km/hour." },
      { id: "c", text: "40 km/hour." },
    ],
    correctAnswer: "a",
    typeofQ: "Road Rules",
  },
  {
    id: 182,
    question:
      "Maximum permissible speed of heavy motor vehicles in the cities.",
    options: [
      { id: "a", text: "35 Km/hr." },
      { id: "b", text: "45 Km/hr." },
      { id: "c", text: "60 Km/hr." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 183,
    question: "Maximum distance allowed between towing and towed vehicles.",
    options: [
      { id: "a", text: "15 meters." },
      { id: "b", text: "5 meters." },
      { id: "c", text: "10 meters." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 185,
    question:
      "You are driving on a two-lane street, vehicle in front of the road, and the road of the road ahead is clear for the road ahead is clear for overtaking, you should.",
    options: [
      { id: "a", text: "Pass the vehicle side." },
      { id: "b", text: "Pass the vehicle from the right hand side." },
      { id: "c", text: "Pass the vehicle from any convenient side." },
    ],
    correctAnswer: "a",
    typeofQ: "Road Rules",
  },
  {
    id: 186,
    question: "Maximum speed permitted for vehicles towing another vehicle.",
    options: [
      { id: "a", text: "20 km/hour." },
      { id: "b", text: "24 km/hour." },
      { id: "c", text: "32 km/hour." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 188,
    question:
      "Circumstances in which a motor cycle can be driven at the speed of 60 km/hour.",
    options: [
      { id: "a", text: "During night." },
      { id: "b", text: "During day time." },
      { id: "c", text: "Under no circumstances." },
    ],
    correctAnswer: "c",
    typeofQ: "Road Rules",
  },
  {
    id: 189,
    question:
      "The maximum speed permitted to motor cycles in city during night time.",
    options: [
      { id: "a", text: "25 Km/hr." },
      { id: "b", text: "30 Km/hr." },
      { id: "c", text: "40 Km/hr." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 194,
    question: "Maximum permissible speed of motor cycle on ghat roads.",
    options: [
      { id: "a", text: "40 km/hour." },
      { id: "b", text: "30 km/hour." },
      { id: "c", text: "20 km/hour." },
    ],
    correctAnswer: "a",
    typeofQ: "Road Rules",
  },
  {
    id: 196,
    question: "Maximum permissible speed of an autorickshaw.",
    options: [
      { id: "a", text: "50 Km/hr." },
      { id: "b", text: "30 Km/hr." },
      { id: "c", text: "40 Km/hr." },
    ],
    correctAnswer: "c",
    typeofQ: "Road Rules",
  },
  {
    id: 197,
    question: "Maximum permissible speed of a light motor vehicle.",
    options: [
      { id: "a", text: "60 Km/hr." },
      { id: "b", text: "70 Km/hr." },
      { id: "c", text: "No limit." },
    ],
    correctAnswer: "a",
    typeofQ: "Road Rules",
  },
  {
    id: 199,
    question: "According to section 112 of the Motor Vehicles Act 1988 ...",
    options: [
      { id: "a", text: "speed limit shall not be exceeded." },
      { id: "b", text: "shall not drive after consuming alcohol." },
      { id: "c", text: "shall not use vehicle on road without paying tax." },
    ],
    correctAnswer: "a",
    typeofQ: "Road Rules",
  },
  {
    id: 209,
    question:
      "Maximum permissible speed of an auto rickshaw in cities and municipal towns ....",
    options: [
      { id: "a", text: "40 km/hour." },
      { id: "b", text: "30 km/hour." },
      { id: "c", text: "20 km/hour." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 212,
    question:
      'You wish to take a "U" turn at an intersection controlled by a traffic light, you should ....',
    options: [
      {
        id: "a",
        text: "drive to another intersection that has no traffic light.",
      },
      {
        id: "b",
        text: 'wait until the light turns green before making the "U" turn.',
      },
      {
        id: "c",
        text: 'make the "U" turn if there is a policeman at the intersection.',
      },
    ],
    correctAnswer: "c",
    typeofQ: "Road Rules",
  },
  {
    id: 214,
    question:
      "You are on a long downhill slope. What should you do to help control the speed of your vehicle?",
    options: [
      { id: "a", text: "stop the engine." },
      { id: "b", text: "select neutral." },
      { id: "c", text: "select low gear." },
    ],
    correctAnswer: "c",
    typeofQ: "Road Rules",
  },
  {
    id: 216,
    question: "While on a roundabout ....",
    options: [
      { id: "a", text: "traffic entering has the right of way." },
      { id: "b", text: "traffic exiting has the right of way." },
      { id: "c", text: "traffic on the roundabout has the right of way." },
    ],
    correctAnswer: "c",
    typeofQ: "Road Rules",
  },
  {
    id: 221,
    question: "The middle lane is for.",
    options: [
      { id: "a", text: "Overtaking." },
      { id: "b", text: "Two wheelers." },
      { id: "c", text: "Traffic at 40 km/h." },
    ],
    correctAnswer: "c",
    typeofQ: "Road Rules",
  },
  {
    id: 222,
    question: "A flashing yellow signal is used when.",
    options: [
      { id: "a", text: "Traffic lights aren't working." },
      { id: "b", text: "You should slow down & proceed with caution." },
      { id: "c", text: "Men are at work." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 227,
    question: "When approaching a crossing where you are to go straight.",
    options: [
      { id: "a", text: "Change lanes to the right lane." },
      { id: "b", text: "Change lanes at least 50 the middle lane." },
      { id: "c", text: "Change lanes to the middle lane at the crossing." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 229,
    question: "When must you use a dipped high beam headlight during the day?",
    options: [
      { id: "a", text: "In pace visibility and highways." },
      { id: "b", text: "On country roads." },
      { id: "c", text: "Along narrow streets." },
    ],
    correctAnswer: "a",
    typeofQ: "Road Rules",
  },
  {
    id: 242,
    question: "The continuous yellow line in the center of the road means ...",
    options: [
      { id: "a", text: "no parking." },
      { id: "b", text: "do not overtake." },
      { id: "c", text: "stop." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 245,
    question:
      "When approaching a right-hand curve, you should keep well to the left to ...",
    options: [
      { id: "a", text: "improve your view of the road." },
      { id: "b", text: "avoid skid." },
      { id: "c", text: "pass the vehicle from behind." },
    ],
    correctAnswer: "a",
    typeofQ: "Road Rules",
  },
  {
    id: 246,
    question: "While you are approaching a staggered junction, you should ...",
    options: [
      { id: "a", text: "slow the vehicle." },
      { id: "b", text: "maintain your speed and sound the horn." },
      { id: "c", text: "use hazard warning light." },
    ],
    correctAnswer: "a",
    typeofQ: "Road Rules",
  },
  {
    id: 247,
    question: "At the blind junction you must stop ...",
    options: [
      { id: "a", text: "only if there is traffic on the main road." },
      {
        id: "b",
        text: "behind the line and move forward slowly as vision improves.",
      },
      { id: "c", text: "only if you are turning to the right." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 254,
    question: "The mandatory signs giving orders are mostly in ...",
    options: [
      { id: "a", text: "red/blue circles." },
      { id: "b", text: "red triangles." },
      { id: "c", text: "base triangles." },
    ],
    correctAnswer: "a",
    typeofQ: "Road Rules",
  },
  {
    id: 258,
    question: "While taking 'U' turn in this road, You should.",
    options: [
      { id: "a", text: "Move forward since prohibited." },
      { id: "b", text: "Look in the metor give signal and turn." },
      { id: "c", text: "Not provided in the document." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 259,
    question: "When you are moving from a parking place, You should.",
    options: [
      {
        id: "a",
        text: "Use the rear view mirrors, check in the third spot and give signal.",
      },
      { id: "b", text: "Sound the vehicle." },
      { id: "c", text: "Not provided in the document." },
    ],
    correctAnswer: "a",
    typeofQ: "Road Rules",
  },
  {
    id: 261,
    question:
      "You are intending to turn left you should position your vehicle at.",
    options: [
      { id: "a", text: "The middle lane." },
      { id: "b", text: "The left hand lane." },
      { id: "c", text: "On the shoulder of the road." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 262,
    question:
      "You are in a wrong lane while approaching a busy Junction you should.",
    options: [
      { id: "a", text: "Continue in that lane." },
      { id: "b", text: "Stop until other lane is cleared." },
      { id: "c", text: "Show signal and cut across." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 263,
    question: "When going straight ahead at a round about.",
    options: [
      { id: "a", text: "Indicate right signal and then left signal." },
      { id: "b", text: "No signals is required." },
      { id: "c", text: "Use hazard warning lamp." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 264,
    question: "You must not reverse your vehicle.",
    options: [
      { id: "a", text: "On a busy road." },
      { id: "b", text: "On a one way road." },
      { id: "c", text: "All of the above." },
    ],
    correctAnswer: "c",
    typeofQ: "Road Rules",
  },
  {
    id: 266,
    question:
      "When approaching from the rear, where two lanes of traffic have stopped at a signal, you should.",
    options: [
      { id: "a", text: "Pass all the vehicle in the in front of them." },
      {
        id: "b",
        text: "Stop behind the last vehicle in the appropriate lane.",
      },
      { id: "c", text: "Stop any where." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 289,
    question: "When stopping on an uphill gradient, one should ...",
    options: [
      { id: "a", text: "hold the vehicle on the clutch." },
      { id: "b", text: "hold the vehicle on the foot brake." },
      {
        id: "c",
        text: "hold the vehicle applying parking brake after stopping.",
      },
    ],
    correctAnswer: "c",
    typeofQ: "Road Rules",
  },
  {
    id: 292,
    question:
      "Driving the vehicle in neutral gear downhill is dangerous because it affects the ...",
    options: [
      { id: "a", text: "cooling system." },
      { id: "b", text: "speed governor." },
      { id: "c", text: "brake system." },
    ],
    correctAnswer: "c",
    typeofQ: "Road Rules",
  },
  {
    id: 294,
    question: "How can you avoid harsh driving?",
    options: [
      { id: "a", text: "gently apply the parking brake." },
      { id: "b", text: "plan and take earlier action in using brakes." },
      { id: "c", text: "slow down by using gears only." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 295,
    question:
      "On which occasions would passengers be most likely to notice weight transfer?",
    options: [
      { id: "a", text: "braking." },
      { id: "b", text: "cornering." },
      { id: "c", text: "both of the above." },
    ],
    correctAnswer: "c",
    typeofQ: "Road Rules",
  },
  {
    id: 296,
    question:
      "Which of the following should you do before a bend, roundabout or corner?",
    options: [
      { id: "a", text: "select the appropriate gear." },
      { id: "b", text: "adjust your speed." },
      { id: "c", text: "both of the above." },
    ],
    correctAnswer: "c",
    typeofQ: "Road Rules",
  },
  {
    id: 307,
    question: "What should be checked first before turning to the left?",
    options: [
      { id: "a", text: "The right side mirror." },
      { id: "b", text: "The left side mirror." },
      { id: "c", text: "Look behind over your right shoulders." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 308,
    question: "You are about to move off you should always.",
    options: [
      {
        id: "a",
        text: "Using your mirrors look behind and give proper signal.",
      },
      { id: "b", text: "Signal left with indicator and move." },
      { id: "c", text: "Use only the off side mirror and move away quickly." },
    ],
    correctAnswer: "a",
    typeofQ: "Road Rules",
  },
  {
    id: 310,
    question: "The turning circle of a vehicle is the.",
    options: [
      {
        id: "a",
        text: "Number of turns of the steering wheels between locked.",
      },
      { id: "b", text: "Amount by which a vehicle cuts corners." },
      { id: "c", text: "Amount of space needed for the vehicle to turn." },
    ],
    correctAnswer: "c",
    typeofQ: "Road Rules",
  },
  {
    id: 314,
    question:
      'A motor cycle rider observes a signboard which indicates "Restrictions ends", can he travel at a speed of.',
    options: [
      { id: "a", text: "More than 50 kmph." },
      { id: "b", text: "Maximum speed of the vehicle." },
      { id: "c", text: "Not more than 50 km/hr." },
    ],
    correctAnswer: "c",
    typeofQ: "Road Rules",
  },
  {
    id: 315,
    question:
      "The correct procedure for stopping a vehicle not equipped with an anti-lock brake system ...",
    options: [
      {
        id: "a",
        text: "apply the foot brake firmly in a pumping action until the vehicle has stopped.",
      },
      {
        id: "b",
        text: "apply the foot brake firmly once until the vehicle has been stopped.",
      },
      {
        id: "c",
        text: "apply the foot brake and hand brake until the vehicle has stopped.",
      },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 316,
    question:
      "You are driving a vehicle fitted with a speed governor. You should be careful when ...",
    options: [
      { id: "a", text: "overtaking another vehicle." },
      { id: "b", text: "cornering." },
      { id: "c", text: "braking." },
    ],
    correctAnswer: "a",
    typeofQ: "Road Rules",
  },
  {
    id: 318,
    question:
      "A driver of a motor car driving behind a long truck can keep ...",
    options: [
      { id: "a", text: "1.2 meters as a braking distance." },
      { id: "b", text: "2.5 meters." },
      { id: "c", text: "safe distance." },
    ],
    correctAnswer: "c",
    typeofQ: "Road Rules",
  },
  {
    id: 330,
    question: "On roads with defined lanes ...",
    options: [
      {
        id: "a",
        text: "use appropriate indicator signals before changing lanes.",
      },
      {
        id: "b",
        text: "lane changing is prohibited, and one must look back before changing lanes.",
      },
      {
        id: "c",
        text: "observe through the front window before changing lanes.",
      },
    ],
    correctAnswer: "a",
    typeofQ: "Road Rules",
  },
  {
    id: 335,
    question:
      "You are moving into the street from a parallel parking space, you should.",
    options: [
      { id: "a", text: "Blow horn and pull out slowly." },
      {
        id: "b",
        text: "Show signal to other traffic and then move carefully.",
      },
      {
        id: "c",
        text: "Proceed with caution after making sure that there is no vehicle in the vicinity that may cause an accident.",
      },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 337,
    question: "In lane traffic, before making a right turn you should be in.",
    options: [
      { id: "a", text: "Any lane." },
      { id: "b", text: "Extreme left lane." },
      { id: "c", text: "Extreme right lane." },
    ],
    correctAnswer: "c",
    typeofQ: "Road Rules",
  },
  {
    id: 342,
    question: "While driving a motor cycle behind a four wheeler, you should.",
    options: [
      {
        id: "a",
        text: "Keep the motor cycle in the centre and behind the vehicle ahead.",
      },
      { id: "b", text: "Stay slightly on the right or belt of the vehicle." },
      { id: "c", text: "None of the above." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 344,
    question: "While parking the vehicle, you should.",
    options: [
      {
        id: "a",
        text: "Peak the vehicle in such a way that it does not obstruct or make inconvenience to other road users.",
      },
      { id: "b", text: "Parellel to the kerb." },
      { id: "c", text: "Right angle to the kerb." },
    ],
    correctAnswer: "a",
    typeofQ: "Road Rules",
  },
  {
    id: 354,
    question: "Abrupt braking shall not be resorted to ...",
    options: [
      { id: "a", text: "unless it is absolutely necessary." },
      { id: "b", text: "on downhill." },
      { id: "c", text: "on main road." },
    ],
    correctAnswer: "a",
    typeofQ: "Road Rules",
  },
  {
    id: 356,
    question:
      "While passing a procession, body of troops or men at work, you should ...",
    options: [
      { id: "a", text: "proceed at regular speed." },
      { id: "b", text: "stop." },
      { id: "c", text: "proceed with not more than 25 Km/hr and carefully." },
    ],
    correctAnswer: "c",
    typeofQ: "Road Rules",
  },
  {
    id: 357,
    question: "To stop a motorcycle, you should ...",
    options: [
      { id: "a", text: "apply rear brake only." },
      { id: "b", text: "apply both front and rear brakes simultaneously." },
      { id: "c", text: "apply front brakes." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 358,
    question:
      "While travelling together (group riding), two or more motorcycles can take the position ...",
    options: [
      { id: "a", text: "side by side." },
      {
        id: "b",
        text: "maintain the lane in a staggered position, keeping a proper distance between motorcycles.",
      },
      { id: "c", text: "travel behind each other in a single line." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 359,
    question:
      "While approaching a section of roadway with loose sand or gravel, you should ...",
    options: [
      { id: "a", text: "hit the area as fast as possible." },
      { id: "b", text: "go as slowly as possible." },
      {
        id: "c",
        text: "slow down and change to high torque gears before entering.",
      },
    ],
    correctAnswer: "c",
    typeofQ: "Road Rules",
  },
  {
    id: 360,
    question: "You can conserve fuel when you drive the vehicle at ...",
    options: [
      { id: "a", text: "high speeds in high torque gears." },
      { id: "b", text: "high speed in low torque gears." },
      { id: "c", text: "a moderate uniform speed of 45-55 KMPH in top gear." },
    ],
    correctAnswer: "c",
    typeofQ: "Road Rules",
  },
  {
    id: 367,
    question: "Clutch riding or Riding on clutch means.",
    options: [
      { id: "a", text: "Using clutch frequently." },
      { id: "b", text: "Keeping a foot on the clutch pedal." },
      { id: "c", text: "Not using clutch at all." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 373,
    question: "Flashing yellow traffic light means.",
    options: [
      { id: "a", text: "Continue at the same speed." },
      { id: "b", text: "Stop, if possible to do so." },
      { id: "c", text: "Slow down and proceed with caution." },
    ],
    correctAnswer: "c",
    typeofQ: "Road Rules",
  },
  {
    id: 376,
    question:
      "When you are approaching a round to which you are about to enter you should.",
    options: [
      { id: "a", text: "Continue into the calculus traffic at slow speed." },
      {
        id: "b",
        text: "Give way to the vehicles coming from the right direction.",
      },
      { id: "c", text: "Use the outside lane only." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 377,
    question:
      "When you approach an intersection and you are in main road without traffic lights, police man and traffic signs, you should.",
    options: [
      {
        id: "a",
        text: "Slow down and be cautious to negotiate the intersection.",
      },
      { id: "b", text: "Came to full stop and proceed with caution." },
      { id: "c", text: "Not change speed if the way is clear." },
    ],
    correctAnswer: "a",
    typeofQ: "Road Rules",
  },
  {
    id: 385,
    question:
      "While you intend to take a right or left turn, the sequence of action which you have to do.",
    options: [
      { id: "a", text: "Gear -minor-signal." },
      { id: "b", text: "Mirror-gear-signal." },
      { id: "c", text: "Signal-gear-minor." },
    ],
    correctAnswer: "a",
    typeofQ: "Road Rules",
  },
  {
    id: 386,
    question:
      "The sequence of operation when your vehicle moves from a stationary position are.",
    options: [
      { id: "a", text: "Mirror-5taut-gear-signal move." },
      { id: "b", text: "Start-gear-minor-signal-move." },
      { id: "c", text: "Start-minor-signal-gear-move." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 387,
    question: "The safe way to stop the vehicle ...",
    options: [
      { id: "a", text: "press clutch and then brake." },
      { id: "b", text: "press brake and then clutch." },
      { id: "c", text: "press clutch and brake simultaneously." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 388,
    question: "The safest way to negotiate a steep descent ...",
    options: [
      { id: "a", text: "use higher torque gear with brake." },
      { id: "b", text: "use top gear with brake." },
      { id: "c", text: "use brake and clutch simultaneously." },
    ],
    correctAnswer: "a",
    typeofQ: "Road Rules",
  },
  {
    id: 392,
    question: "For higher power, the gear to be used is ...",
    options: [
      { id: "a", text: "1st gear." },
      { id: "b", text: "top gear." },
      { id: "c", text: "2nd gear." },
    ],
    correctAnswer: "a",
    typeofQ: "Road Rules",
  },
  {
    id: 393,
    question: "Abrupt braking by the driver ...",
    options: [
      { id: "a", text: "is allowed for safety reasons." },
      { id: "b", text: "is not encouraged." },
      { id: "c", text: "is allowed on busy roads." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 396,
    question:
      "While parking your vehicle on a downward gradient, in addition to applying the hand brake, the gear engaged should be ...",
    options: [
      { id: "a", text: "neutral gear." },
      { id: "b", text: "first gear." },
      { id: "c", text: "reverse gear." },
    ],
    correctAnswer: "c",
    typeofQ: "Road Rules",
  },
  {
    id: 397,
    question: "While turning right or left, it is safer if you ...",
    options: [
      { id: "a", text: "use only indicators." },
      { id: "b", text: "show only a hand signal." },
      { id: "c", text: "use both light indicators and hand signal." },
    ],
    correctAnswer: "c",
    typeofQ: "Road Rules",
  },
  {
    id: 399,
    question:
      "On ghat roads, when vehicles approach from opposite sides, the driver traveling downhill shall ...",
    options: [
      { id: "a", text: "drive fast before the opposite vehicle enters." },
      { id: "b", text: "switch on the headlights and take the way." },
      { id: "c", text: "give preference to the vehicles going up." },
    ],
    correctAnswer: "c",
    typeofQ: "Road Rules",
  },
  {
    id: 406,
    question: "Under which circumstance should you avoid overtaking?",
    options: [
      { id: "a", text: "after a curve." },
      { id: "b", text: "on a curve." },
      { id: "c", text: "when the visibility ahead is clear." },
    ],
    correctAnswer: "b",
    typeofQ: "Road Rules",
  },
  {
    id: 407,
    question: "Which type of parking is more suitable on wide roads?",
    options: [
      { id: "a", text: "in-line." },
      { id: "b", text: "parallel." },
      { id: "c", text: "inclined." },
    ],
    correctAnswer: "c",
    typeofQ: "Road Rules",
  },
  {
    id: 408,
    question:
      "When a pedestrian steps onto a zebra crossing in front of you to cross the road ...",
    options: [
      {
        id: "a",
        text: "stop before the stop line and treat it as a stop signal.",
      },
      { id: "b", text: "you have to proceed before him." },
      {
        id: "c",
        text: "sound the horn and speed up your vehicle to cross before him.",
      },
    ],
    correctAnswer: "a",
    typeofQ: "Road Rules",
  },
  {
    id: 411,
    question:
      "While driving behind a motorcycle on a badly maintained road, you should ...",
    options: [
      { id: "a", text: "continuously blow horn." },
      { id: "b", text: "overtake immediately." },
      { id: "c", text: "keep safe distance." },
    ],
    correctAnswer: "c",
    typeofQ: "Road Rules",
  },
  {
    id: 413,
    question:
      "If permitted, a free turn can be taken while turning left at a junction ...",
    options: [
      { id: "a", text: "while travelling straight." },
      { id: "b", text: "while taking a right turn." },
    ],
    correctAnswer: "a",
    typeofQ: "Road Rules",
  },
  {
    id: 432,
    question: "A flashing yellow at an intersection means ?",
    options: [
      { id: "a", text: "Proceed with caution" },
      { id: "b", text: "Stop and proceed" },
      { id: "c", text: "Proceed fast" },
    ],
    correctAnswer: "a",
    typeofQ: "Road Rules",
  },
];
