import React from "react";
import { ArrowLeft } from "lucide-react";

interface SignInfo {
  id: string;
  image: string;
  title: string;
  description: string;
}

const signsList: SignInfo[] = [
  {
    id: "1",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs1.jpg",
    title: "Right Hand Curve",
    description:
      "This sign cautions you about a right hand curve on the road ahead. It helps you maneuver your vehicle accordingly and reduces the possibility of accidents due to sudden turns.",
  },
  {
    id: "2",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs2.jpg",
    title: "Left Hand Curve",
    description:
      "This sign cautions you about a left hand curve on the road ahead. It gives you time to slow down and set your eyes on the curve, reducing accident risk.",
  },
  {
    id: "3",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs3.jpg",
    title: "Right Hair Pin Bend",
    description:
      "Hair pin bends are sharp turns, especially on hilly roads. This sign warns of a sharp right turn ahead, giving you time to reduce speed and focus on the turn.",
  },
  {
    id: "4",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs4.jpg",
    title: "Left Hair Pin Bend",
    description:
      "This sign warns of a sharp left turn ahead, usually on hilly roads. It gives you time to slow down and manage the turn safely.",
  },
  {
    id: "5",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs5.jpg",
    title: "Right Reverse Bend",
    description:
      "This sign indicates a zigzag or Z-shaped turn towards the right ahead. Reduce speed and maneuver the vehicle cautiously.",
  },
  {
    id: "6",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs6.jpg",
    title: "Left Reverse Bend",
    description:
      "This sign indicates a zigzag or Z-shaped turn towards the left ahead. Reduce speed and maneuver the vehicle cautiously.",
  },
  {
    id: "7",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs7.jpg",
    title: "Steep Ascent",
    description:
      "This sign indicates a steep ascent ahead. Prepare to climb and shift to the relevant gear, especially on hilly roads.",
  },
  {
    id: "8",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs8.jpg",
    title: "Steep Descent",
    description:
      "This sign indicates a steep descent ahead. Prepare to descend by shifting to the relevant gear. Avoid speeding on descents.",
  },
  {
    id: "9",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs9.jpg",
    title: "Narrow Road Ahead",
    description:
      "This sign warns that the road ahead narrows. Be careful as the reduced width increases the risk of collision with oncoming traffic.",
  },
  {
    id: "10",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs10.jpg",
    title: "Road Widens Ahead",
    description:
      "This sign indicates that the road ahead becomes wider. Adjust your driving accordingly.",
  },
  {
    id: "11",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs11.jpg",
    title: "Narrow Bridge",
    description:
      "This sign is placed before bridges that are narrower than the road. Reduce speed and watch for oncoming traffic.",
  },
  {
    id: "12",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs12.jpg",
    title: "Slippery Road",
    description:
      "This sign warns of slippery road conditions ahead, possibly due to water or oil. Slow down to avoid accidents.",
  },
  {
    id: "13",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs13.jpg",
    title: "Loose Gravel",
    description:
      "Usually found on hilly roads, this sign warns of loose earth or gravel. Drive slowly and carefully to avoid accidents.",
  },
  {
    id: "14",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs14.jpg",
    title: "Cycle Crossing",
    description:
      "This sign indicates a cycle path crossing the main road. Watch for cyclists and cross carefully.",
  },
  {
    id: "15",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs15.jpg",
    title: "Pedestrian Crossing",
    description:
      "This sign warns of a pedestrian crossing ahead. Slow down or stop to allow pedestrians to cross safely.",
  },
  {
    id: "16",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs16.jpg",
    title: "School Ahead",
    description:
      "This sign indicates a school nearby. Slow down and drive carefully as children may cross the road unexpectedly.",
  },
  {
    id: "17",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs17.jpg",
    title: "Men at Work",
    description:
      "This sign indicates road work ahead. Drive slowly and carefully to ensure the safety of workers.",
  },
  {
    id: "18",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs18.jpg",
    title: "Cattle",
    description:
      "This sign warns of the possibility of cattle straying onto the road. Drive carefully as animals can behave unpredictably.",
  },
  {
    id: "19",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs19.jpg",
    title: "Falling Rocks",
    description:
      "This sign is used on hilly roads prone to landslides. Watch for falling rocks and drive carefully.",
  },
  {
    id: "20",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs20.jpg",
    title: "Ferry",
    description:
      "This sign indicates a ferry service ahead, usually where a river is crossed without a bridge.",
  },
  {
    id: "21",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs21.jpg",
    title: "Cross Road",
    description:
      "This sign warns of a road crossing ahead. Slow down and cross the intersection cautiously.",
  },
  {
    id: "22",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs22.jpg",
    title: "Gap in Median",
    description:
      "This sign indicates a gap in the road divider, often used for U-turns. Slow down and take the relevant lane.",
  },
  {
    id: "23",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs23.jpg",
    title: "Side Road Right",
    description:
      "This sign indicates a right side road joining the main road. Plan your route and watch for merging traffic.",
  },
  {
    id: "24",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs24.jpg",
    title: "Side Road Left",
    description:
      "This sign indicates a left side road joining the main road. Plan your route and watch for merging traffic.",
  },
  {
    id: "25",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs25.jpg",
    title: "Y-Intersection (Left)",
    description:
      "This sign depicts a Y-shaped intersection ahead, where the road splits. Manage the intersection carefully.",
  },
  {
    id: "26",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs26.jpg",
    title: "Y-Intersection (Right)",
    description:
      "This sign depicts a Y-shaped intersection ahead, where the road splits. Manage the intersection carefully.",
  },
  {
    id: "27",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs27.jpg",
    title: "Y-Intersection (Straight)",
    description:
      "This sign depicts a Y-shaped intersection ahead, where the road splits. Manage the intersection carefully.",
  },
  {
    id: "28",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs28.jpg",
    title: "Staggered Intersection (Left-Right)",
    description:
      "This sign indicates left and right turns available on the straight road with a small distance between them. Crossing is not allowed.",
  },
  {
    id: "29",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs29.jpg",
    title: "Staggered Intersection (Right-Left)",
    description:
      "This sign indicates right and left turns available on the straight road with a small distance between them. Crossing is not allowed.",
  },
  {
    id: "30",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs30.jpg",
    title: "T-Intersection",
    description:
      "This sign warns of a T-intersection ahead. There is no forward movement; traffic must turn left or right.",
  },
  {
    id: "31",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs31.jpg",
    title: "Major Road Ahead",
    description:
      "This sign is placed before crossing a major road. Slow down and maneuver the intersection safely.",
  },
  {
    id: "32",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs32.jpg",
    title: "Round About",
    description:
      "This sign indicates a roundabout ahead. Take the relevant lane before entering the roundabout for smooth traffic flow.",
  },
  {
    id: "33",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs33.jpg",
    title: "Dangerous Dip",
    description:
      "This sign warns of a dip in the road ahead. Reduce speed to cross safely.",
  },
  {
    id: "34",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs34.jpg",
    title: "Hump or Rough Road",
    description:
      "This sign warns of a hump or rough patch on the road. Reduce speed to cross comfortably.",
  },
  {
    id: "35",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs35.jpg",
    title: "Barrier Ahead",
    description:
      "This sign indicates a barrier ahead, such as a toll or check post. Prepare to stop.",
  },
  {
    id: "36",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs36.jpg",
    title: "Unguarded Level Crossing (200 meters)",
    description:
      "This sign indicates an unguarded railway crossing 200 meters ahead. Cross cautiously after ensuring no train is nearby.",
  },
  {
    id: "37",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs37.jpg",
    title: "Unguarded Level Crossing (50-100 meters)",
    description:
      "This sign indicates an unguarded railway crossing 50-100 meters ahead. Cross cautiously after ensuring no train is nearby.",
  },
  {
    id: "38",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs38.jpg",
    title: "Guarded Level Crossing (200 meters)",
    description:
      "This sign indicates a guarded railway crossing 200 meters ahead. Take extra precautions and act accordingly.",
  },
  {
    id: "39",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_crs39.jpg",
    title: "Guarded Level Crossing (50-100 meters)",
    description:
      "This sign indicates a guarded railway crossing 50-100 meters ahead. Take extra precautions and act accordingly.",
  },
];

const CautionarySigns: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header with back button */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Cautionary Signs
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
            These signs are meant to warn the driver about the hazards or
            situations lying ahead on the road. The driver should obey these for
            their safety. Though violation of these road signs does not attract
            legal action, they are very important as avoiding them could result
            in major accidents. Cautionary signs are triangular in shape with a
            red border.
          </p>
        </div>

        {/* Grid of Signs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
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

export default CautionarySigns;
