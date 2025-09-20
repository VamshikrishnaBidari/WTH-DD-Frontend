import { Question } from "./theoryQuestions";

export const trafficSignQuestions: Question[] = [
  // Q4: 21_Compulsory_Left_Turn.png
  {
    id: 4,
    question: "What does the following traffic sign indicate?",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs29.jpg", // Compulsory Turn Left
    options: [
      { id: "a", text: "Keep left." },
      { id: "b", text: "There is no road to the left." },
      { id: "c", text: "Compulsory turn left." },
    ],
    correctAnswer: "c",
  },
  // Q6: 39_Give_Way.png
  {
    id: 6,
    question: "What does the following traffic sign indicate?",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs2.jpg", // Give Way
    options: [
      { id: "a", text: "Give way." },
      { id: "b", text: "Hospital ahead." },
      { id: "c", text: "Traffic island ahead." },
    ],
    correctAnswer: "a",
  },
  // Q8: 03_One_Way.png
  {
    id: 8,
    question: "What does the following traffic sign indicate?",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs4.jpg", // One Way
    options: [
      { id: "a", text: "No entry." },
      { id: "b", text: "One way." },
      { id: "c", text: "Speed limit ends." },
    ],
    correctAnswer: "b",
  },
  // Q10: 12_No_U_Turn.png
  {
    id: 10,
    question: "What does the following traffic sign indicate?",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs17.jpg", // U-Turn Prohibited
    options: [
      { id: "a", text: "Right turn prohibited." },
      { id: "b", text: "Sharp curve to the right." },
      { id: "c", text: "U-turn prohibited." },
    ],
    correctAnswer: "c",
  },
  // Q12: 08_Pedestrians_Prohibited.png
  {
    id: 12,
    question: "What does the following traffic sign indicate?",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs14.jpg", // Pedestrians Prohibited
    options: [
      { id: "a", text: "Pedestrians may enter." },
      { id: "b", text: "Pedestrians prohibited." },
      { id: "c", text: "Pedestrian crossing" },
    ],
    correctAnswer: "b",
  },
  // Q14: 02_Parking _on_this_side .png
  {
    id: 14,
    question: "What does the following traffic sign indicate?",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_irs15.jpg", // Park This Side
    options: [
      { id: "a", text: "Keep right side." },
      { id: "b", text: "Compulsory turn to right." },
      { id: "c", text: "Parking on right side allowed" },
    ],
    correctAnswer: "c",
  },
  // Q16: 11_No_Right_Turn.png
  {
    id: 16,
    question: "What does the following traffic sign indicate?",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs15.jpg", // Right Turn Prohibited
    options: [
      { id: "a", text: "U-Turn prohibited." },
      { id: "b", text: "Right turn prohibited." },
      { id: "c", text: "Overtaking through left prohibited." },
    ],
    correctAnswer: "b",
  },
  // Q18: 14_No_Horn.png
  {
    id: 18,
    question: "What does the following traffic sign indicate?",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs19.jpg", // Horn Prohibited
    options: [
      { id: "a", text: "Horn prohibited." },
      { id: "b", text: "Compulsory sound horn." },
      { id: "c", text: "May sound horn." },
    ],
    correctAnswer: "a",
  },
  // Q20: 19_Narrow_Bridge.png
  {
    id: 20,
    question: "What does the following traffic sign indicate?",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs11.jpg", // Narrow Bridge
    options: [
      { id: "a", text: "Narrow bridge ahead." },
      { id: "b", text: "Narrow road ahead." },
      { id: "c", text: "Road on both side front" },
    ],
    correctAnswer: "a",
  },
  // Q22: 13_Hospital.png
  {
    id: 22,
    question: "What does the following traffic sign indicate?",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_irs8.jpg", // Hospital
    options: [
      { id: "a", text: "First aid post." },
      { id: "b", text: "Resting place." },
      { id: "c", text: "Hospital." },
    ],
    correctAnswer: "c",
  },
  // Q24: 24_First_aid_post.png
  {
    id: 24,
    question: "What does the following traffic sign indicate?",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_irs9.jpg", // First Aid Post
    options: [
      { id: "a", text: "First aid post." },
      { id: "b", text: "Resting place." },
      { id: "c", text: "Hospital." },
    ],
    correctAnswer: "a",
  },
  // Q26: 10_Resting_Place.png
  {
    id: 26,
    question: "What does the following traffic sign indicate?",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_irs12.jpg", // Resting Place
    options: [
      { id: "a", text: "Hospital." },
      { id: "b", text: "Resting place." },
      { id: "c", text: "First aid post." },
    ],
    correctAnswer: "b",
  },
  // Q28: 40_end_of_restrictions.png
  {
    id: 28,
    question: "The following sign represents..",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs28.jpg", // Restriction Ends
    options: [
      { id: "a", text: "Road closed." },
      { id: "b", text: "No parking." },
      { id: "c", text: "End of speed restriction." },
    ],
    correctAnswer: "c",
  },
  // Q30: 17_Narrow_Road.png
  {
    id: 30,
    question: "The following sign represents..",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs9.jpg", // Narrow Road Ahead
    options: [
      { id: "a", text: "Narrow road ahead." },
      { id: "b", text: "Narrow bridge ahead." },
      { id: "c", text: "Roads on both sides ahead." },
    ],
    correctAnswer: "a",
  },
  // Q32: 33_Unguarded_Level_Crossing_50_100m.png
  {
    id: 32,
    question: "The following sign represents..",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs37.jpg", // Unguarded Level Crossing (50-100 meters)
    options: [
      { id: "a", text: "Railway station near." },
      { id: "b", text: "Level crossing unguarded." },
      { id: "c", text: "Level crossing Guarded." },
    ],
    correctAnswer: "b",
  },
  // Q34: 13_Overtaking_Prohibited.png
  {
    id: 34,
    question: "The following sign represents..",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs18.jpg", // Overtaking Prohibited
    options: [
      { id: "a", text: "Entry through right side prohibited." },
      { id: "b", text: "Entry through left prohibited." },
      { id: "c", text: "Overtaking." },
    ],
    correctAnswer: "c",
  },
  // Q36: 04_Cross_Road.png
  {
    id: 36,
    question: "The following sign represents..",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs21.jpg", // Cross Road
    options: [
      { id: "a", text: "Cross road." },
      { id: "b", text: "No entry." },
      { id: "c", text: "Hospital." },
    ],
    correctAnswer: "a",
  },
  // Q38: 02_No_Entry.jpg
  {
    id: 38,
    question: "The following sign represents..",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs3.jpg", // No Entry
    options: [
      { id: "a", text: "Restriction ends." },
      { id: "b", text: "No entry." },
      { id: "c", text: "No overtaking." },
    ],
    correctAnswer: "b",
  },
  // Q40: 06_Side_Road_Left.png
  {
    id: 40,
    question: "The following sign represents..",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs24.jpg", // Side Road Left
    options: [
      { id: "a", text: "May turn to left." },
      { id: "b", text: "Compulsory go ahead or turn left." },
      { id: "c", text: "Side road left." },
    ],
    correctAnswer: "c",
  },
  // Q41: 24_Compulsory_Ahead_Or_Turn_Left.png
  {
    id: 41,
    question: "What does the following traffic sign indicate?",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs33.jpg", // Compulsory Ahead or Turn Left
    options: [
      { id: "a", text: "May turn to left." },
      { id: "b", text: "Side road left." },
      { id: "c", text: "Compulsory go ahead or turn left." },
    ],
    correctAnswer: "c",
  },
  // Q42: 30_Sound_Horn.png
  {
    id: 42,
    question: "What does the following traffic sign indicate?",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs36.jpg", // Compulsory Sound Horn
    options: [
      { id: "a", text: "Sound horn continuously." },
      { id: "b", text: "Sound horn compulsory." },
      { id: "c", text: "Horn prohibited." },
    ],
    correctAnswer: "b",
  },
  // Q44: 11_No_Right_Turn.png
  {
    id: 44,
    question: "What does the following traffic sign indicate?",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs15.jpg", // Right Turn Prohibited
    options: [
      { id: "a", text: "Compulsory turn right." },
      { id: "b", text: "Turn to right prohibited." },
      { id: "c", text: "Road to the right in front." },
    ],
    correctAnswer: "b",
  },
  // Q46: 36_No_Parking.png
  {
    id: 46,
    question: "What does the following traffic sign indicate?",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs20.jpg", // No Parking
    options: [
      { id: "a", text: "End of restriction." },
      { id: "b", text: "Do not stop." },
      { id: "c", text: "No parking." },
    ],
    correctAnswer: "c",
  },
  // Q48: 03_One_Way.png
  {
    id: 48,
    question: "What does the following traffic sign indicate?",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs4.jpg", // One Way
    options: [
      { id: "a", text: "Go straight." },
      { id: "b", text: "One-way." },
      { id: "c", text: "Prohibited in both directions" },
    ],
    correctAnswer: "b",
  },
  // Q50: 05_All_motor_vehicles_prohibithed.png
  {
    id: 50,
    question: "What does the following traffic sign indicate?",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs7.jpg", // All Motor Vehicles Prohibited
    options: [
      { id: "a", text: "No entry for motor vehicles." },
      { id: "b", text: "No entry for cars and motor cycles." },
      { id: "c", text: "Entry allowed for cars and motor vehicles." },
    ],
    correctAnswer: "b",
  },
  // Q52: 06_Truck_Prohibited.png
  {
    id: 52,
    question: "What does the following traffic sign indicate?",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs8.jpg", // Truck Prohibited
    options: [
      { id: "a", text: "Trucks Prohibited." },
      { id: "b", text: "Bus Prohibited." },
      { id: "c", text: "Heavy vehicles Prohibited." },
    ],
    correctAnswer: "a",
  },
  // Q54: 31_bullock_carts_prohibited.png
  {
    id: 54,
    question: "What does the following traffic sign indicate?",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs10.jpg", // Bullock Cart Prohibited
    options: [
      { id: "a", text: "Cycle prohibited." },
      { id: "b", text: "All vehicles prohibited." },
      { id: "c", text: "Bullock cart prohibited." },
    ],
    correctAnswer: "c",
  },
  // Q56: 28_Pedestrians_Only.png
  {
    id: 56,
    question: "What does the following traffic sign indicate?",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_irs14.jpg", // No Thorough Side Road (closest to Pedestrians Only)
    options: [
      { id: "a", text: "Pedestrians permitted." },
      { id: "b", text: "Students prohibited." },
      { id: "c", text: "Pedestrians prohibited." },
    ],
    correctAnswer: "a",
  },
  // Q58: 10_No_Left_Turn.png
  {
    id: 58,
    question: "What does the following traffic sign indicate?",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs16.jpg", // Left Turn Prohibited
    options: [
      { id: "a", text: "Turn left." },
      { id: "b", text: "Left turn Prohibited." },
      { id: "c", text: "overtaking prohibited through the right side" },
    ],
    correctAnswer: "b",
  },
  // Q60: 20_Speed_Limit.png
  {
    id: 60,
    question: "What does the following traffic sign indicate?",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs22.jpg", // Speed Limit
    options: [
      { id: "a", text: "Drive the vehicle not exceeding 50 km/hr." },
      { id: "b", text: "Drive the vehicle at 50 km/hr." },
      { id: "c", text: "Drive the vehicle exceeding 50km/hr." },
    ],
    correctAnswer: "a",
  },
  // Q62: 18_Width_Limit_2m.png
  {
    id: 62,
    question: "What does the following traffic sign indicate?",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs23.jpg", // Width Limit
    options: [
      {
        id: "a",
        text: "No entry for vehicles having more than 2 meters width.",
      },
      {
        id: "b",
        text: "No entry for vehicles having more than 2 meters height.",
      },
      { id: "c", text: "Speed limit 2km/hr." },
    ],
    correctAnswer: "a",
  },
  // Q64: 17_Height_Limit_3.5m.png
  {
    id: 64,
    question: "What does the following traffic sign indicate?",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs24.jpg", // Height Limit
    options: [
      {
        id: "a",
        text: "Entry only for vehicles with height above 3.5 meters.",
      },
      { id: "b", text: "Entry only for vehicles with width above 3.5 meters." },
      {
        id: "c",
        text: "Entry for vehicles having height not exceeding 3.5 meters.",
      },
    ],
    correctAnswer: "c",
  },
  // Q66: 16_No_Stopping_Or_Standing.png
  {
    id: 66,
    question: "What does the following traffic sign indicate?",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs21.jpg", // No Stopping or Standing
    options: [
      { id: "a", text: "Stop." },
      { id: "b", text: "No Stopping or standing." },
      { id: "c", text: "Junction." },
    ],
    correctAnswer: "b",
  },
  // Q68: 23_Compulsory_Ahead_Straight.png
  {
    id: 68,
    question: "What does the following traffic sign indicate?",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs30.jpg", // Compulsory Ahead
    options: [
      { id: "a", text: "No entry." },
      { id: "b", text: "Ahead only." },
      { id: "c", text: "Entry in both direction." },
    ],
    correctAnswer: "b",
  },
  // Q70: 25_Compulsory_Ahead_Or_Turn_Right.png
  {
    id: 70,
    question: "What does the following traffic sign indicate?",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs32.jpg", // Compulsory Ahead or Turn Right
    options: [
      { id: "a", text: "Side road ahead." },
      { id: "b", text: "Compulsory ahead or turn right." },
      { id: "c", text: "Compulsory ahead or turn left." },
    ],
    correctAnswer: "b",
  },
  // Q72: 26_Compulsory_Keep_Left.png
  {
    id: 72,
    question: "What does the following traffic sign indicate?",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs34.jpg", // Compulsory Keep Left
    options: [
      { id: "a", text: "Compulsory keep left." },
      { id: "b", text: "Turn left." },
      { id: "c", text: "stop on left side" },
    ],
    correctAnswer: "a",
  },
  // Q74: 12_Right_Curve.png
  {
    id: 74,
    question: "What does the following traffic sign indicate?",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs1.jpg", // Right Hand Curve
    options: [
      { id: "a", text: "Right ascend." },
      { id: "b", text: "Right hand curve." },
      { id: "c", text: "Keep right." },
    ],
    correctAnswer: "b",
  },
  // Q76: 11_Left_Curve.png
  {
    id: 76,
    question: "What does the following traffic sign indicate?",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs2.jpg", // Left Hand Curve
    options: [
      { id: "a", text: "Left hand curve." },
      { id: "b", text: "Left ascend." },
      { id: "c", text: "Keep left." },
    ],
    correctAnswer: "a",
  },
  // Q78: 14_right_Hairpin_bend.png
  {
    id: 78,
    question: "What does the following traffic sign indicate?",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs3.jpg", // Right Hair Pin Bend
    options: [
      { id: "a", text: "Right ascend and descend." },
      { id: "b", text: "Right descend." },
      { id: "c", text: "Right hair pin bend" },
    ],
    correctAnswer: "c",
  },
  // Q80: 13_Left_Hairpin_Bend.png
  {
    id: 80,
    question: "What does the following traffic sign indicate?",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs4.jpg", // Left Hair Pin Bend
    options: [
      { id: "a", text: "Left descend." },
      { id: "b", text: "Left hair pin bend." },
      { id: "c", text: "Keep left." },
    ],
    correctAnswer: "b",
  },
  // Q82: 15_Left_Reverse_Bend.png
  {
    id: 82,
    question: "What does the following traffic sign indicate?",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs6.jpg", // Left Reverse Bend
    options: [
      { id: "a", text: "Left reverse bend." },
      { id: "b", text: "Turn left and go ahead." },
      { id: "c", text: "Right reverse bend" },
    ],
    correctAnswer: "a",
  },
  // Q84: 16_Right_Reverse_Bend.png
  {
    id: 84,
    question: "What does the following traffic sign indicate?",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs5.jpg", // Right Reverse Bend
    options: [
      { id: "a", text: "Left reverse bend." },
      { id: "b", text: "Turn right and go ahead." },
      { id: "c", text: "Right reverse bend" },
    ],
    correctAnswer: "c",
  },
  // Q88: 07_Side_Road_Right.png
  {
    id: 88,
    question: "What does the following traffic sign indicate?",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs23.jpg", // Side Road Right
    options: [
      { id: "a", text: "Turn right." },
      { id: "b", text: "Side road right." },
      { id: "c", text: "Keep right." },
    ],
    correctAnswer: "b",
  },
  // Q90: 01_Major_Road_ahead.png
  {
    id: 90,
    question: "What does the following traffic sign indicate?",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs31.jpg", // Major Road Ahead
    options: [
      { id: "a", text: "Cross Road ahead." },
      { id: "b", text: "Narrow road ahead." },
      { id: "c", text: "Major Road ahead." },
    ],
    correctAnswer: "c",
  },
  // Q92: 09_Roundabout.png
  {
    id: 92,
    question: "What does the following traffic sign indicate?",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs32.jpg", // Round About
    options: [
      { id: "a", text: "Turn right." },
      { id: "b", text: "Turn left." },
      { id: "c", text: "Round about." },
    ],
    correctAnswer: "c",
  },
  // Q94: 26_Dip.png
  {
    id: 94,
    question: "What does the following traffic sign indicate?",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs33.jpg", // Dangerous Dip
    options: [
      { id: "a", text: "Dangerous dip." },
      { id: "b", text: "Ferry." },
      { id: "c", text: "Narrow road ahead." },
    ],
    correctAnswer: "a",
  },
  // Q96: 32_Guarded_Level_Crossing_200m.png
  {
    id: 96,
    question: "What does the following traffic sign indicate?",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs38.jpg", // Guarded Level Crossing (200 meters)
    options: [
      { id: "a", text: "Unguarded level cross." },
      { id: "b", text: "Barrier ahead." },
      { id: "c", text: "Guarded level cross." },
    ],
    correctAnswer: "c",
  },
  // Q98: 40_Y_Intersection.png
  {
    id: 98,
    question: "What does the following traffic sign indicate?",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs26.jpg", // Y-Intersection (Right)
    options: [
      { id: "a", text: "Y-inter section right." },
      { id: "b", text: "Side road left." },
      { id: "c", text: "Y-inter section left." },
    ],
    correctAnswer: "a",
  },
  // Q100: 41_Y_Intersection.png
  {
    id: 100,
    question: "What does the following traffic sign indicate?",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs25.jpg", // Y-Intersection (Left)
    options: [
      { id: "a", text: "Y-inter section left." },
      { id: "b", text: "Y-inter section right." },
      { id: "c", text: "Side road right." },
    ],
    correctAnswer: "b",
  },
  // Q102: 05_Y_Intersection.png
  {
    id: 102,
    question: "What does the following traffic sign indicate?",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs27.jpg", // Y-Intersection (Straight)
    options: [
      { id: "a", text: "Turn left." },
      { id: "b", text: "Turn right." },
      { id: "c", text: "Y-inter section." },
    ],
    correctAnswer: "c",
  },
  // Q104: 25_Compulsory_Ahead_Or_Turn_Right.png
  {
    id: 104,
    question: "What does the following traffic sign indicate?",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs32.jpg", // Compulsory Ahead or Turn Right
    options: [
      { id: "a", text: "Road to the right in front." },
      { id: "b", text: "There are roads ahead and to the right." },
      { id: "c", text: "Compulsory go ahead or turn to right." },
    ],
    correctAnswer: "c",
  },
  // Q106: 25_Slippery_Road.png
  {
    id: 106,
    question: "What does the following traffic sign indicate?",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs12.jpg", // Slippery Road
    options: [
      { id: "a", text: "Slippery road." },
      { id: "b", text: "Gravel road." },
      { id: "c", text: "No entry for motor car." },
    ],
    correctAnswer: "a",
  },
  // Q108: 48_Loose_gravel
  {
    id: 108,
    question: "What does the following traffic sign indicate?",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs13.jpg", // Loose Gravel
    options: [
      { id: "a", text: "Loose gravel." },
      { id: "b", text: "Slippery road." },
      { id: "c", text: "No entry for motor car." },
    ],
    correctAnswer: "a",
  },
  // Q110: 36_Cycle_Crossing.png
  {
    id: 110,
    question: "What does the following traffic sign indicate?",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs14.jpg", // Cycle Crossing
    options: [
      { id: "a", text: "Cycle crossing." },
      { id: "b", text: "Cycle crossing prohibited." },
      { id: "c", text: "No entry for cycles." },
    ],
    correctAnswer: "a",
  },
  // Q114: 22_School_Zone.png
  {
    id: 114,
    question: "What does the following traffic sign indicate?",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs16.jpg", // School Ahead
    options: [
      { id: "a", text: "School ahead." },
      { id: "b", text: "Pedestrians crossing." },
      { id: "c", text: "Pedestians crossing prohibited." },
    ],
    correctAnswer: "a",
  },
  // Q116: 23_Men_At_Work.png
  {
    id: 116,
    question: "What does the following traffic sign indicate?",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs17.jpg", // Men at Work
    options: [
      { id: "a", text: "Men at work." },
      { id: "b", text: "Children playing." },
      { id: "c", text: "Pedestrian crossing." },
    ],
    correctAnswer: "a",
  },
  // Q118: 30_Falling_Rocks.png
  {
    id: 118,
    question: "What does the following traffic sign indicate?",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs19.jpg", // Falling Rocks
    options: [
      { id: "a", text: "Rough road." },
      { id: "b", text: "Slippery road." },
      { id: "c", text: "Falling rocks." },
    ],
    correctAnswer: "c",
  },
  // Q122: 28_Steep_Ascent.png
  {
    id: 122,
    question: "What does the following traffic sign indicate?",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs7.jpg", // Steep Ascent
    options: [
      { id: "a", text: "Steep ascend." },
      { id: "b", text: "Steep descend." },
      { id: "c", text: "Slippery road." },
    ],
    correctAnswer: "a",
  },
  // Q124: 29_Steep_Descent.png
  {
    id: 124,
    question: "What does the following traffic sign indicate?",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs8.jpg", // Steep Descent
    options: [
      { id: "a", text: "Steep ascend." },
      { id: "b", text: "Steep descend." },
      { id: "c", text: "Slippery road." },
    ],
    correctAnswer: "b",
  },
  // Q126: 18_Road_Widens.png
  {
    id: 126,
    question: "What does the following traffic sign indicate?",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs10.jpg", // Road Widens Ahead
    options: [
      { id: "a", text: "Narrow road ahead." },
      { id: "b", text: "Y-intersection." },
      { id: "c", text: "Road widens ahead." },
    ],
    correctAnswer: "c",
  },
  // Q128: 10_Gap_In_Median.png
  {
    id: 128,
    question: "What does the following traffic sign indicate?",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs22.jpg", // Gap in Median
    options: [
      { id: "a", text: "Drainage in middle." },
      { id: "b", text: "Bridge ahead." },
      { id: "c", text: "Gap in median." },
    ],
    correctAnswer: "c",
  },
  // Q130: 27_Uneven_Road.png
  {
    id: 130,
    question: "What does the following traffic sign indicate?",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs34.jpg", // Hump or Rough Road
    options: [
      { id: "a", text: "Hump or rough road." },
      { id: "b", text: "Zigzag road." },
      { id: "c", text: "Ghat road." },
    ],
    correctAnswer: "a",
  },
  // Q134: 08_No_Through_Side_Road.png
  {
    id: 134,
    question: "What does the following traffic sign indicate?",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_irs14.jpg", // No Thorough Side Road
    options: [
      { id: "a", text: "No thorough side road." },
      { id: "b", text: "Left turn." },
      { id: "c", text: "Bridge ahead." },
    ],
    correctAnswer: "a",
  },
  // Q136: 07_No_Through_Road.png
  {
    id: 136,
    question: "What does the following traffic sign indicate?",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_irs13.jpg", // No Thorough Road
    options: [
      { id: "a", text: "Ferry ahead." },
      { id: "b", text: "Main road ahead." },
      { id: "c", text: "No thorough road." },
    ],
    correctAnswer: "c",
  },
  // Q138: 01_Parking_Both_Sides.png
  {
    id: 138,
    question: "What does the following traffic sign indicate?",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_irs16.jpg", // Parking Both Side
    options: [
      { id: "a", text: "Parking prohibited." },
      { id: "b", text: "Parking both sides." },
      { id: "c", text: "Police aid post." },
    ],
    correctAnswer: "b",
  },
  // Q140: 03_Parking_Scooter_And_Motorcycle.png
  {
    id: 140,
    question: "What does the following traffic sign indicate?",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_irs17.jpg", // Parking Lot Scooters and Motorcycles
    options: [
      { id: "a", text: "Parking lot - scooters and motor cycles." },
      { id: "b", text: "Scooters and motor cycles prohibited." },
      { id: "c", text: "Scooters and motor cycles repairing." },
    ],
    correctAnswer: "a",
  },
  // Q142: 06_Parking_taxi.png
  {
    id: 142,
    question: "What does the following traffic sign indicate?",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_irs19.jpg", // Parking Lot Taxis
    options: [
      { id: "a", text: "No entry for private cars." },
      { id: "b", text: "Parking-taxis." },
      { id: "c", text: "Parking police vehicles." },
    ],
    correctAnswer: "b",
  },
  // Q144: 05_Parking_auto_Rickshaw.png
  {
    id: 144,
    question: "What does the following traffic sign indicate?",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_irs20.jpg", // Parking Lot Auto Rickshaws
    options: [
      { id: "a", text: "Petrol pump." },
      { id: "b", text: "Parking-Autorikshaw." },
      { id: "c", text: "Autorikshaw-parking prohibited." },
    ],
    correctAnswer: "b",
  },
  // Q145: 05_Left_Turn.jpg (Hand Sign)
  {
    id: 145,
    question: "What does the following hand sign represent?",
    image: "https://chandigarhtrafficpolice.gov.in/images/signals-2.jpg", // Intend to move out to the right or turn right
    options: [
      { id: "a", text: "Intends to turn left" },
      { id: "b", text: "Intends to turn right" },
      { id: "c", text: "Request to stop the vehicle from opposite direction" },
    ],
    correctAnswer: "b",
  },
  // Q148: 06_right_turn.jpg (Hand Sign)
  {
    id: 148,
    question: "What does the following hand sign represent?",
    image: "https://chandigarhtrafficpolice.gov.in/images/signals-2.jpg", // Intend to move out to the right or turn right
    options: [
      { id: "a", text: "Intends to turn left" },
      { id: "b", text: "Intends to turn right" },
      { id: "c", text: "Request to stop the vehicle" },
    ],
    correctAnswer: "b",
  },
  // Q150: 07_Slow_Down.jpg (Hand Sign)
  {
    id: 150,
    question: "What does the following hand sign represent?",
    image: "https://chandigarhtrafficpolice.gov.in/images/signals-4.jpg", // Intend to slow down
    options: [
      { id: "a", text: "Intends to slow down the vehicle" },
      { id: "b", text: "Intends to turn right" },
      { id: "c", text: "Request to stop the vehicle from opposite direction" },
    ],
    correctAnswer: "a",
  },
  // Q152: 04_Stop_hand_signal.jpg (Hand Sign)
  {
    id: 152,
    question: "What does the following hand sign represent?",
    image: "https://chandigarhtrafficpolice.gov.in/images/signals-3.jpg", // Intend to stop
    options: [
      { id: "a", text: "Intends to go straight" },
      { id: "b", text: "Intends to stop the vehicle" },
      { id: "c", text: "intends to turn right" },
    ],
    correctAnswer: "b",
  },
  // Q154: 02_stop_behind.png (Hand Sign)
  {
    id: 154,
    question: "What does the following hand sign represent?",
    image: "https://www.indiandrivingschools.com/images/traffic-sign3.jpg", // To stop vehicles approaching from behind
    options: [
      { id: "a", text: "Request to stop the vehicle from behind" },
      { id: "b", text: "Request to pass the vehicle from behind" },
      { id: "c", text: "Request to stop the vehicle from front" },
    ],
    correctAnswer: "a",
  },
  // Q156: 03_stop_Front_and_back.png (Hand Sign)
  {
    id: 156,
    question: "What does the following hand sign represent?",
    image: "https://www.indiandrivingschools.com/images/traffic-sign4.jpg", // To stop vehicles approaching simultaneously from front and behind
    options: [
      { id: "a", text: "Request to stop the vehicle from behind and front" },
      {
        id: "b",
        text: "Request to pass the vehicle coming in opposite direction",
      },
      { id: "c", text: "Request to pass the vehicles coming from the left" },
    ],
    correctAnswer: "a",
  },
  // Q158: (Hand Sign, Request to stop the vehicle from front)
  {
    id: 158,
    question: "What does the following hand sign represent?",
    image: "https://www.indiandrivingschools.com/images/traffic-sign2.jpg", // To stop vehicles coming from front
    options: [
      { id: "a", text: "Request to stop the vehicle from front" },
      { id: "b", text: "Request to pass the vehicle from front" },
      { id: "c", text: "Request to stop the vehicle from behind" },
    ],
    correctAnswer: "a",
  },
  // Q201: Which of the following signs indicates 'Stop'?
  {
    id: 201,
    question: "Which of the following signs indicates 'Stop'?",
    options: [
      {
        id: "a",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs1.jpg",
      }, // 01_Stop.jpg
      {
        id: "b",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs3.jpg",
      }, // 02_No_Entry.jpg
      {
        id: "c",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs2.jpg",
      }, // 39_Give_Way.png
      {
        id: "d",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs21.jpg",
      }, // 16_No_Stopping_Or_Standing.png
    ],
    correctAnswer: "a",
  },
  // Q202: Which of these signs is used to indicate 'No Entry'?
  {
    id: 202,
    question: "Which of these signs is used to indicate 'No Entry'?",
    options: [
      {
        id: "a",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs4.jpg",
      }, // 03_One_Way.png
      {
        id: "b",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs3.jpg",
      }, // 02_No_Entry.jpg
      {
        id: "c",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs6.jpg",
      }, // 04_Vehicles_Prohibited_Both_Directions.png
      {
        id: "d",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs7.jpg",
      }, // 05_All_Motor_Vehicles_Prohibited.png
    ],
    correctAnswer: "b",
  },
  // Q203: Which traffic sign below represents 'Pedestrian Crossing'?
  {
    id: 203,
    question: "Which traffic sign below represents 'Pedestrian Crossing'?",
    options: [
      {
        id: "a",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs15.jpg",
      }, // 21_Pedestrian_Crossing.png
      {
        id: "b",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs14.jpg",
      }, // 08_Pedestrians_Prohibited.png
      {
        id: "c",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_irs14.jpg",
      }, // 28_Pedestrians_Only.png
      {
        id: "d",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs16.jpg",
      }, // 22_School_Zone.png
    ],
    correctAnswer: "a",
  },
  // Q204: Identify the sign that means 'Speed Limit'?
  {
    id: 204,
    question: "Identify the sign that means 'Speed Limit'?",
    options: [
      {
        id: "a",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs22.jpg",
      }, // 20_Speed_Limit.png
      {
        id: "b",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs24.jpg",
      }, // 17_Height_Limit_3.5m.png
      {
        id: "c",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs23.jpg",
      }, // 18_Width_Limit_2m.png
      {
        id: "d",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs26.jpg",
      }, // 19_Load_Limit_5t.png
    ],
    correctAnswer: "a",
  },
  // Q205: Which of these signs indicates 'School Zone'?
  {
    id: 205,
    question: "Which of these signs indicates 'School Zone'?",
    options: [
      {
        id: "a",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs16.jpg",
      }, // 22_School_Zone.png
      {
        id: "b",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs18.jpg",
      }, // 24_Speed_Breaker.png (actually Cattle, but assuming as per your list)
      {
        id: "c",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs12.jpg",
      }, // 25_Slippery_Road.png
      {
        id: "d",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs34.jpg",
      }, // 27_Uneven_Road.png
    ],
    correctAnswer: "a",
  },
  // Q206: Which hand signal indicates a request to slow down?
  {
    id: 206,
    question: "Which hand signal indicates a request to slow down?",
    options: [
      {
        id: "a",
        image: "https://chandigarhtrafficpolice.gov.in/images/signals-4.jpg",
      }, // 07_Slow_Down.jpg
      {
        id: "b",
        image: "https://chandigarhtrafficpolice.gov.in/images/signals-2.jpg",
      }, // 05_Left_Turn.jpg
      {
        id: "c",
        image: "https://chandigarhtrafficpolice.gov.in/images/signals-2.jpg",
      }, // 06_Right_Turn.jpg
      {
        id: "d",
        image: "https://chandigarhtrafficpolice.gov.in/images/signals-3.jpg",
      }, // 04_Stop_Hand_Signal.jpg
    ],
    correctAnswer: "a",
  },
  // Q207: Which of the following signs indicates 'No Parking'?
  {
    id: 207,
    question: "Which of the following signs indicates 'No Parking'?",
    options: [
      {
        id: "a",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs20.jpg",
      }, // 36_No_Parking.png
      {
        id: "b",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs21.jpg",
      }, // 15_No_Standing.png (assuming as No Stopping or Standing)
      {
        id: "c",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_irs16.jpg",
      }, // 01_Parking_Both_Sides.png
      {
        id: "d",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_irs17.jpg",
      }, // 03_Parking_Scooter_And_Motorcycle.png
    ],
    correctAnswer: "a",
  },
  // Q208: Which traffic sign below represents 'No Horn'?
  {
    id: 208,
    question: "Which traffic sign below represents 'No Horn'?",
    options: [
      {
        id: "a",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs19.jpg",
      }, // 14_No_Horn.png
      {
        id: "b",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs36.jpg",
      }, // 30_Sound_Horn.png
      {
        id: "c",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs15.jpg",
      }, // 11_No_Right_Turn.png
      {
        id: "d",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs18.jpg",
      }, // 13_Overtaking_Prohibited.png
    ],
    correctAnswer: "a",
  },
  // Q209: Identify the sign that means 'Compulsory Keep Left'?
  // {
  //   id: 209,
  //   question: "Identify the sign that means 'Compulsory Keep Left'?",
  //   options: [
  //     {
  //       id: "a",
  //       image:
  //         "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs34.jpg",
  //     }, // 26_Compulsory_Keep_Left.png
  //     { id: "b", image: "" }, // 37_Compulsory_Keep_Right.png (not present in your context, leave blank or update if available)
  //     {
  //       id: "c",
  //       image:
  //         "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs29.jpg",
  //     }, // 21_Compulsory_Left_Turn.png
  //     { id: "d", image: "" }, // 22_Compulsory_Right_Turn.png (not present in your context, leave blank or update if available)
  //   ],
  //   correctAnswer: "a",
  // },
  // Q210: Which of these signs warns drivers of a narrow bridge?
  {
    id: 210,
    question: "Which of these signs warns drivers of a narrow bridge?",
    options: [
      {
        id: "a",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs11.jpg",
      }, // 19_Narrow_Bridge.png
      {
        id: "b",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs9.jpg",
      }, // 17_Narrow_Road.png
      {
        id: "c",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs10.jpg",
      }, // 18_Road_Widens.png
      {
        id: "d",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs22.jpg",
      }, // 10_Gap_In_Median.png
    ],
    correctAnswer: "a",
  },
  // Q211: Which of the following signs indicates 'No U-Turn'?
  {
    id: 211,
    question: "Which of the following signs indicates 'No U-Turn'?",
    options: [
      {
        id: "a",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs17.jpg",
      }, // 12_No_U_Turn.png
      {
        id: "b",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs16.jpg",
      }, // 10_No_Left_Turn.png
      {
        id: "c",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs15.jpg",
      }, // 11_No_Right_Turn.png
      {
        id: "d",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs33.jpg",
      }, // 24_Compulsory_Ahead_Or_Turn_Left.png
    ],
    correctAnswer: "a",
  },
  // Q212: Which hand signal indicates a request to stop from behind?
  {
    id: 212,
    question: "Which hand signal indicates a request to stop from behind?",
    options: [
      {
        id: "a",
        image: "https://www.indiandrivingschools.com/images/traffic-sign3.jpg",
      }, // To stop vehicles approaching from behind
      {
        id: "b",
        image: "https://www.indiandrivingschools.com/images/traffic-sign4.jpg",
      }, // To stop vehicles approaching simultaneously from front and behind
      {
        id: "c",
        image: "https://chandigarhtrafficpolice.gov.in/images/signals-3.jpg",
      }, // 04_Stop_Hand_Signal.jpg
      {
        id: "d",
        image: "https://chandigarhtrafficpolice.gov.in/images/signals-2.jpg",
      }, // 05_Left_Turn.jpg
    ],
    correctAnswer: "a",
  },
  // Q213: Which traffic sign below represents 'Hospital'?
  {
    id: 213,
    question: "Which traffic sign below represents 'Hospital'?",
    options: [
      {
        id: "a",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_irs8.jpg",
      }, // 13_Hospital.png
      {
        id: "b",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_irs9.jpg",
      }, // 24_First_Aid_Post.png
      {
        id: "c",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_irs12.jpg",
      }, // 10_Resting_Place.png
      {
        id: "d",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_irs11.jpg",
      }, // 15_Light_Refreshment.png
    ],
    correctAnswer: "a",
  },
  // Q214: Identify the sign that means 'Compulsory Ahead Only'?
  {
    id: 214,
    question: "Identify the sign that means 'Compulsory Ahead Only'?",
    options: [
      {
        id: "a",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs30.jpg",
      }, // 23_Compulsory_Ahead_Straight.png
      {
        id: "b",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs33.jpg",
      }, // 24_Compulsory_Ahead_Or_Turn_Left.png
      {
        id: "c",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs32.jpg",
      }, // 25_Compulsory_Ahead_Or_Turn_Right.png
      {
        id: "d",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs34.jpg",
      }, // 26_Compulsory_Keep_Left.png
    ],
    correctAnswer: "a",
  },
  // Q215: Which of these signs warns drivers of a right hairpin bend?
  {
    id: 215,
    question: "Which of these signs warns drivers of a right hairpin bend?",
    options: [
      {
        id: "a",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs3.jpg",
      }, // 14_Right_Hairpin_Bend.png
      {
        id: "b",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs1.jpg",
      }, // 12_Right_Curve.png
      {
        id: "c",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs5.jpg",
      }, // 16_Right_Reverse_Bend.png
      {
        id: "d",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs23.jpg",
      }, // 07_Side_Road_Right.png
    ],
    correctAnswer: "a",
  },
  // Q216: Which of the following signs indicates 'Parking Both Sides'?
  {
    id: 216,
    question: "Which of the following signs indicates 'Parking Both Sides'?",
    options: [
      {
        id: "a",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_irs16.jpg",
      }, // 01_Parking_Both_Sides.png
      {
        id: "b",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_irs19.jpg",
      }, // 06_Parking_Taxi.png
      {
        id: "c",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_irs20.jpg",
      }, // 05_Parking_Auto_Rickshaw.png
      {
        id: "d",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs20.jpg",
      }, // 36_No_Parking.png
    ],
    correctAnswer: "a",
  },
  // Q217: Which traffic sign below represents 'No Overtaking'?
  {
    id: 217,
    question: "Which traffic sign below represents 'No Overtaking'?",
    options: [
      {
        id: "a",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs18.jpg",
      }, // 13_Overtaking_Prohibited.png
      {
        id: "b",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs7.jpg",
      }, // 05_All_Motor_Vehicles_Prohibited.png
      {
        id: "c",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs8.jpg",
      }, // 06_Truck_Prohibited.png
      {
        id: "d",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs6.jpg",
      }, // 04_Vehicles_Prohibited_Both_Directions.png
    ],
    correctAnswer: "a",
  },
  // Q218: Identify the sign that means 'Cross Road'?
  {
    id: 218,
    question: "Identify the sign that means 'Cross Road'?",
    options: [
      {
        id: "a",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs21.jpg",
      }, // 04_Cross_Road.png
      {
        id: "b",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs30.jpg",
      }, // 03_T_Intersection.png
      {
        id: "c",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs27.jpg",
      }, // 05_Y_Intersection.png
      {
        id: "d",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs32.jpg",
      }, // 09_Roundabout.png
    ],
    correctAnswer: "a",
  },
  // Q219: Which hand signal indicates an intention to turn left?
  {
    id: 219,
    question: "Which hand signal indicates an intention to turn left?",
    options: [
      {
        id: "a",
        image: "https://chandigarhtrafficpolice.gov.in/images/signals-1.jpg",
      }, // 05_Left_Turn.jpg
      {
        id: "b",
        image: "https://chandigarhtrafficpolice.gov.in/images/signals-2.jpg",
      }, // 06_Right_Turn.jpg
      {
        id: "c",
        image: "https://chandigarhtrafficpolice.gov.in/images/signals-4.jpg",
      }, // 07_Slow_Down.jpg
      {
        id: "d",
        image: "https://www.indiandrivingschools.com/images/traffic-sign3.jpg",
      }, // 02_Stop_Behind.png
    ],
    correctAnswer: "a",
  },
  // Q220: Which of these signs indicates 'Petrol Pump'?
  {
    id: 220,
    question: "Which of these signs indicates 'Petrol Pump'?",
    options: [
      {
        id: "a",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_irs7.jpg",
      }, // 12_Petrol_Bunk.png
      {
        id: "b",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_irs6.jpg",
      }, // 11_Public_Telephone.png
      {
        id: "c",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_irs10.jpg",
      }, // 14_Restaurant.png
      {
        id: "d",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_irs20.jpg",
      }, // 20_Toilet.png
    ],
    correctAnswer: "a",
  },
  // Q221: Which of the following signs indicates 'No Left Turn'?
  {
    id: 221,
    question: "Which of the following signs indicates 'No Left Turn'?",
    options: [
      {
        id: "a",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs16.jpg",
      }, // 10_No_Left_Turn.png
      {
        id: "b",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs17.jpg",
      }, // 12_No_U_Turn.png
      {
        id: "c",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs15.jpg",
      }, // 11_No_Right_Turn.png
      {
        id: "d",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs29.jpg",
      }, // 21_Compulsory_Left_Turn.png
    ],
    correctAnswer: "a",
  },
  // Q222: Which traffic sign below warns of a slippery road?
  {
    id: 222,
    question: "Which traffic sign below warns of a slippery road?",
    options: [
      {
        id: "a",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs12.jpg",
      }, // 25_Slippery_Road.png
      {
        id: "b",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs34.jpg",
      }, // 27_Uneven_Road.png
      {
        id: "c",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs19.jpg",
      }, // 30_Falling_Rocks.png
      {
        id: "d",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs33.jpg",
      }, // 26_Dip.png
    ],
    correctAnswer: "a",
  },
  // Q223: Identify the sign that means 'Compulsory Right Turn'?
  {
    id: 223,
    question: "Identify the sign that means 'Compulsory Right Turn'?",
    options: [
      {
        id: "a",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs31.jpg",
      }, // 22_Compulsory_Right_Turn.png
      {
        id: "b",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs32.jpg",
      }, // 25_Compulsory_Ahead_Or_Turn_Right.png
      {
        id: "c",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs15.jpg",
      }, // 11_No_Right_Turn.png
      {
        id: "d",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs30.jpg",
      }, // 23_Compulsory_Ahead_Straight.png
    ],
    correctAnswer: "a",
  },
  // Q224: Which of these signs indicates 'No Stopping or Standing'?
  {
    id: 224,
    question: "Which of these signs indicates 'No Stopping or Standing'?",
    options: [
      {
        id: "a",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs21.jpg",
      }, // 16_No_Stopping_Or_Standing.png
      {
        id: "b",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs20.jpg",
      }, // 36_No_Parking.png
      {
        id: "c",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs21.jpg",
      }, // 15_No_Standing.png (same as No Stopping or Standing)
      {
        id: "d",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs1.jpg",
      }, // 01_Stop.jpg
    ],
    correctAnswer: "a",
  },
  // Q225: Which hand signal indicates a request to stop from front and behind?
  {
    id: 225,
    question:
      "Which hand signal indicates a request to stop from front and behind?",
    options: [
      {
        id: "a",
        image: "https://www.indiandrivingschools.com/images/traffic-sign4.jpg",
      }, // To stop vehicles approaching simultaneously from front and behind
      {
        id: "b",
        image: "https://www.indiandrivingschools.com/images/traffic-sign3.jpg",
      }, // To stop vehicles approaching from behind
      {
        id: "c",
        image: "https://chandigarhtrafficpolice.gov.in/images/signals-3.jpg",
      }, // 04_Stop_Hand_Signal.jpg
      {
        id: "d",
        image: "https://chandigarhtrafficpolice.gov.in/images/signals-2.jpg",
      }, // 06_Right_Turn.jpg
    ],
    correctAnswer: "a",
  },
  // Q226: Which traffic sign below represents 'Load Limit 5t'?
  {
    id: 226,
    question: "Which traffic sign below represents 'Load Limit 5t'?",
    options: [
      {
        id: "a",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs26.jpg",
      }, // 19_Load_Limit_5t.png
      {
        id: "b",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs24.jpg",
      }, // 17_Height_Limit_3.5m.png
      {
        id: "c",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs23.jpg",
      }, // 18_Width_Limit_2m.png
      {
        id: "d",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs22.jpg",
      }, // 20_Speed_Limit.png
    ],
    correctAnswer: "a",
  },
  // Q227: Identify the sign that means 'No Through Road'?
  {
    id: 227,
    question: "Identify the sign that means 'No Through Road'?",
    options: [
      {
        id: "a",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_irs13.jpg",
      }, // 07_No_Through_Road.png
      {
        id: "b",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_irs14.jpg",
      }, // 08_No_Through_Side_Road.png
      {
        id: "c",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs24.jpg",
      }, // 06_Side_Road_Left.png
      {
        id: "d",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs21.jpg",
      }, // 04_Cross_Road.png
    ],
    correctAnswer: "a",
  },
  // Q228: Which of these signs warns of a guarded level crossing within 200 meters?
  {
    id: 228,
    question:
      "Which of these signs warns of a guarded level crossing within 200 meters?",
    options: [
      {
        id: "a",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs38.jpg",
      }, // 32_Guarded_Level_Crossing_200m.png
      {
        id: "b",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs37.jpg",
      }, // 33_Unguarded_Level_Crossing_50_100m.png
      {
        id: "c",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs35.jpg",
      }, // 35_Guarded_Railway_Crossing.png
      {
        id: "d",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs11.jpg",
      }, // 19_Narrow_Bridge.png
    ],
    correctAnswer: "a",
  },
  // Q229: Which traffic sign below indicates 'Cycle Crossing'?
  {
    id: 229,
    question: "Which traffic sign below indicates 'Cycle Crossing'?",
    options: [
      {
        id: "a",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs14.jpg",
      }, // 36_Cycle_Crossing.png
      {
        id: "b",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs13.jpg",
      }, // 09_Bicycles_Prohibited.png
      {
        id: "c",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs35.jpg",
      }, // 38_Compulsory_Cycle.png
      {
        id: "d",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_irs18.jpg",
      }, // 04_Parking_Cycle.png
    ],
    correctAnswer: "a",
  },
  // Q230: Identify the sign that means 'Men at Work'?
  {
    id: 230,
    question: "Identify the sign that means 'Men at Work'?",
    options: [
      {
        id: "a",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs17.jpg",
      }, // 23_Men_At_Work.png
      {
        id: "b",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs16.jpg",
      }, // 22_School_Zone.png
      {
        id: "c",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs18.jpg",
      }, // 24_Speed_Breaker.png
      {
        id: "d",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs19.jpg",
      }, // 30_Falling_Rocks.png
    ],
    correctAnswer: "a",
  },
  // Q231: Which of the following signs indicates 'Give Way'?
  {
    id: 231,
    question: "Which of the following signs indicates 'Give Way'?",
    options: [
      {
        id: "a",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs2.jpg",
      }, // 39_Give_Way.png
      {
        id: "b",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs1.jpg",
      }, // 01_Stop.jpg
      {
        id: "c",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs3.jpg",
      }, // 02_No_Entry.jpg
      {
        id: "d",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs30.jpg",
      }, // 23_Compulsory_Ahead_Straight.png
    ],
    correctAnswer: "a",
  },
  // Q232: Which of these signs is used to indicate a 'Roundabout'?
  {
    id: 232,
    question: "Which of these signs is used to indicate a 'Roundabout'?",
    options: [
      {
        id: "a",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs32.jpg",
      }, // 09_Roundabout.png
      {
        id: "b",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs21.jpg",
      }, // 04_Cross_Road.png
      {
        id: "c",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs27.jpg",
      }, // 05_Y_Intersection.png
      {
        id: "d",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs30.jpg",
      }, // 03_T_Intersection.png
    ],
    correctAnswer: "a",
  },
  // Q233: Which traffic sign below represents 'First Aid Post'?
  {
    id: 233,
    question: "Which traffic sign below represents 'First Aid Post'?",
    options: [
      {
        id: "a",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_irs9.jpg",
      }, // 24_First_Aid_Post.png
      {
        id: "b",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_irs8.jpg",
      }, // 13_Hospital.png
      {
        id: "c",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_irs12.jpg",
      }, // 10_Resting_Place.png
      {
        id: "d",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_irs6.jpg",
      }, // 11_Public_Telephone.png
    ],
    correctAnswer: "a",
  },
  // Q234: Identify the sign that means 'Compulsory Sound Horn'?
  {
    id: 234,
    question: "Identify the sign that means 'Compulsory Sound Horn'?",
    options: [
      {
        id: "a",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs36.jpg",
      }, // 30_Sound_Horn.png
      {
        id: "b",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs19.jpg",
      }, // 14_No_Horn.png
      {
        id: "c",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs18.jpg",
      }, // 13_Overtaking_Prohibited.png
      {
        id: "d",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs20.jpg",
      }, // 36_No_Parking.png
    ],
    correctAnswer: "a",
  },
  // Q235: Which of these signs warns drivers of a steep ascent?
  {
    id: 235,
    question: "Which of these signs warns drivers of a steep ascent?",
    options: [
      {
        id: "a",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs7.jpg",
      }, // 28_Steep_Ascent.png
      {
        id: "b",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs8.jpg",
      }, // 29_Steep_Descent.png
      {
        id: "c",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs12.jpg",
      }, // 25_Slippery_Road.png
      {
        id: "d",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs33.jpg",
      }, // 26_Dip.png
    ],
    correctAnswer: "a",
  },
  // Q236: Which hand signal indicates a request to stop from the front?
  {
    id: 236,
    question: "Which hand signal indicates a request to stop from the front?",
    options: [
      {
        id: "a",
        image: "https://www.indiandrivingschools.com/images/traffic-sign2.jpg",
      }, // To stop vehicles coming from front
      {
        id: "b",
        image: "https://www.indiandrivingschools.com/images/traffic-sign3.jpg",
      }, // To stop vehicles approaching from behind
      {
        id: "c",
        image: "https://chandigarhtrafficpolice.gov.in/images/signals-1.jpg",
      }, // 05_Left_Turn.jpg
      {
        id: "d",
        image: "https://www.indiandrivingschools.com/images/traffic-sign4.jpg",
      }, // To stop vehicles approaching simultaneously from front and behind
    ],
    correctAnswer: "a",
  },
  // Q237: Which of the following signs indicates 'Parking for Scooters and Motorcycles'?
  {
    id: 237,
    question:
      "Which of the following signs indicates 'Parking for Scooters and Motorcycles'?",
    options: [
      {
        id: "a",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_irs17.jpg",
      }, // 03_Parking_Scooter_And_Motorcycle.png
      {
        id: "b",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_irs16.jpg",
      }, // 01_Parking_Both_Sides.png
      {
        id: "c",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_irs19.jpg",
      }, // 06_Parking_Taxi.png
      {
        id: "d",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_irs20.jpg",
      }, // 05_Parking_Auto_Rickshaw.png
    ],
    correctAnswer: "a",
  },
  // Q238: Which traffic sign below represents 'Width Limit 2m'?
  {
    id: 238,
    question: "Which traffic sign below represents 'Width Limit 2m'?",
    options: [
      {
        id: "a",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs23.jpg",
      }, // 18_Width_Limit_2m.png
      {
        id: "b",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs24.jpg",
      }, // 17_Height_Limit_3.5m.png
      {
        id: "c",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs26.jpg",
      }, // 19_Load_Limit_5t.png
      {
        id: "d",
        image:
          "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs22.jpg",
      }, // 20_Speed_Limit.png
    ],
    correctAnswer: "a",
  },
];
