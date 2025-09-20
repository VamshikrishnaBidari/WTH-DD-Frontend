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
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_irs1.jpg",
    title: "Destination Sign",
    description:
      "Indicates the direction and distance to various destinations on that road. Generally installed before intersections.",
  },
  {
    id: "2",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_irs2.jpg",
    title: "Destination Sign",
    description:
      "Indicates the direction and distance to various destinations on that road. Generally installed before intersections.",
  },
  {
    id: "3",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_irs3.jpg",
    title: "Direction Sign",
    description:
      "Shows the direction and distance of the destination/place written on it. Helps drivers locate places and saves time and fuel.",
  },
  {
    id: "4",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_irs4.jpg",
    title: "Re-assurance Sign",
    description:
      "Assures the driver that they are on the right path and tells the distance to the places written on it.",
  },
  {
    id: "5",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_irs5.jpg",
    title: "Place Identification Sign",
    description:
      "Identifies the area and tells that the limit of the particular area has started. Common on national highways.",
  },
  {
    id: "6",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_irs6.jpg",
    title: "Public Telephone",
    description: "Indicates the availability of a telephone near the road.",
  },
  {
    id: "7",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_irs7.jpg",
    title: "Petrol Pump",
    description:
      "Indicates that there is a petrol pump ahead. Sometimes the distance is also indicated.",
  },
  {
    id: "8",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_irs8.jpg",
    title: "Hospital",
    description:
      "Indicates that there is a hospital nearby. Drivers should be careful and avoid unnecessary honking.",
  },
  {
    id: "9",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_irs9.jpg",
    title: "First Aid Post",
    description:
      "Shows that there is a first aid facility nearby, useful in case of emergency or accidents. Normally erected on highways and rural roads.",
  },
  {
    id: "10",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_irs10.jpg",
    title: "Eating Place",
    description:
      "Indicates that there is an eating place in the vicinity. Common on highways and long stretches of road.",
  },
  {
    id: "11",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_irs11.jpg",
    title: "Light Refreshment",
    description:
      "Indicates the facility of light refreshment nearby on the road.",
  },
  {
    id: "12",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_irs12.jpg",
    title: "Resting Place",
    description:
      "Erected near motels, lodges, or other facilities for resting on the road. Seen on highways.",
  },
  {
    id: "13",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_irs13.jpg",
    title: "No Thorough Road",
    description:
      "Erected at the entry of roads from which no exit is available.",
  },
  {
    id: "14",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_irs14.jpg",
    title: "No Thorough Side Road",
    description:
      "Indicates that there is no through side road on the main road. Helps drivers in maneuvering the vehicle.",
  },
  {
    id: "15",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_irs15.jpg",
    title: "Park This Side",
    description:
      "Erected at destinations to indicate where to park vehicles. Also indicates the type of vehicles to be parked.",
  },
  {
    id: "16",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_irs16.jpg",
    title: "Parking Both Side",
    description:
      "Erected at destinations to indicate that vehicles can be parked on both sides.",
  },
  {
    id: "17",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_irs17.jpg",
    title: "Parking Scooters and Motorcycles",
    description:
      "Erected at destinations meant for parking scooters and motorcycles.",
  },
  {
    id: "18",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_irs18.jpg",
    title: "Parking Lot Cycles",
    description: "Erected at destinations for parking cycles.",
  },
  {
    id: "19",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_irs19.jpg",
    title: "Parking Lot Taxis",
    description: "Erected at destinations meant for parking taxis only.",
  },
  {
    id: "20",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_irs20.jpg",
    title: "Parking Lot Auto Rickshaws",
    description:
      "Erected at destinations meant for parking auto rickshaws. Helpful for citizens to find auto rickshaws at one place.",
  },
  {
    id: "21",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_irs21.jpg",
    title: "Parking Lot Cycle Rickshaws",
    description: "Erected at destinations meant for parking cycle rickshaws.",
  },
  {
    id: "22",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_irs22.jpg",
    title: "Flood Gauge",
    description:
      "Erected on highways/roads near rivers, canals, lakes, etc. Indicates the level of water and cautions about the danger level.",
  },
];

const InformatorySigns: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header with back button */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Informatory Signs
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
            These signs are meant to provide information on direction,
            destination, roadside facilities, etc. to the road user. Following
            informative road signs helps a driver in saving time and reaching
            the destination without wandering around. These signs are generally
            facilitators to the driver and are normally blue in colour.
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

export default InformatorySigns;
