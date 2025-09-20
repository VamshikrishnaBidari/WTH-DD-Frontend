import React from "react";
import { ArrowLeft } from "lucide-react";

interface SignInfo {
  id: string;
  image: string;
  title: string;
  description: string;
}

// Complete list of mandatory signs with content from the source
const signsList: SignInfo[] = [
  {
    id: "1",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs1.jpg",
    title: "Stop",
    description:
      "This is one of the most important and prominent Road Signs. This sign indicates that the driver should immediately stop. Usually used by Police, traffic, and toll authorities at check posts.",
  },
  {
    id: "2",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs2.jpg",
    title: "Give Way",
    description:
      "This sign is used at roundabouts where a specific lane discipline is to be followed. It directs traffic to give way to the fellow traffic on your right side.",
  },
  {
    id: "3",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs3.jpg",
    title: "No Entry",
    description:
      "Certain pockets of an area or road are demarcated as no entry zones for traffic. This could be entry to a restricted area or no traffic zone. Drivers should obey it and divert their route.",
  },
  {
    id: "4",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs4.jpg",
    title: "One Way",
    description:
      "This indicates that the traffic flow is allowed in only one direction. The way beyond this sign restricts entry of traffic; however, the oncoming traffic flow remains normal.",
  },
  {
    id: "5",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs5.jpg",
    title: "One Way",
    description:
      "This indicates that the traffic flow is allowed in only one direction. The way beyond this sign restricts entry of the traffic; however, the oncoming traffic flow remains normal.",
  },
  {
    id: "6",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs6.jpg",
    title: "Vehicles Prohibited in Both Directions",
    description:
      "This sign directs that the demarcated area beyond it is prohibited for traffic flow from both sides. Reasons could include pedestrian-only areas, areas under repair, or security reasons.",
  },
  {
    id: "7",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs7.jpg",
    title: "All Motor Vehicles Prohibited",
    description:
      "This sign signifies that there should be no movement of traffic in the designated area either from outside or within. It is used to decongest areas or at pedestrian zones.",
  },
  {
    id: "8",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs8.jpg",
    title: "Truck Prohibited",
    description:
      "This sign designates a no-entry zone for Trucks or HMV. These could be narrow lanes or congested areas where entry of heavy transport vehicles could obstruct smooth traffic flow.",
  },
  {
    id: "9",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs9.jpg",
    title: "Bullock & Hand Cart Prohibited",
    description:
      "This sign indicates that the road has been prohibited for plying of Bullock & Hand Carts. These slow-moving carts often hinder the smooth flow of traffic.",
  },
  {
    id: "10",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs10.jpg",
    title: "Bullock Cart Prohibited",
    description:
      "The slowest form of transport often becomes an obstruction to the free flow of traffic. Certain zones are demarcated where bullock carts are not allowed to ply.",
  },
  {
    id: "11",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs11.jpg",
    title: "Tongas Prohibited",
    description:
      "Tongas or horse carts were extensively used in the past. With the advent of faster transport, they have become a hurdle in smooth traffic flow. Many areas/roads are now prohibited for Tongas.",
  },
  {
    id: "12",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs12.jpg",
    title: "Hand Cart Prohibited",
    description:
      "This sign indicates that hand carts are prohibited on the demarcated road as they hinder the flow of fast-moving traffic.",
  },
  {
    id: "13",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs13.jpg",
    title: "Cycle Prohibited",
    description:
      "In order to ensure the safety of cyclists, certain roads meant for fast-moving vehicles are prohibited for cyclists. Cyclists should not use roads where this sign is installed.",
  },
  {
    id: "14",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs14.jpg",
    title: "Pedestrians Prohibited",
    description:
      "This sign restricts the movement of pedestrians on roads or adjoining areas. It is often installed on highways or intersections with alternate crossing arrangements like underpasses or foot over bridges.",
  },
  {
    id: "15",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs15.jpg",
    title: "Right Turn Prohibited",
    description:
      "This sign directs drivers not to turn towards the right side under any circumstances.",
  },
  {
    id: "16",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs16.jpg",
    title: "Left Turn Prohibited",
    description:
      "This sign directs drivers not to turn towards the left side under any circumstances.",
  },
  {
    id: "17",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs17.jpg",
    title: "U-Turn Prohibited",
    description:
      "This sign is often seen at busy intersections. U-turns at these intersections could result in major accidents or traffic jams. Drivers should not violate this sign to avoid fines or incidents.",
  },
  {
    id: "18",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs18.jpg",
    title: "Overtaking Prohibited",
    description:
      "This sign is installed at places where overtaking is dangerous, such as narrow roads, bridges, or turns. It ensures safety by prohibiting overtaking in such areas.",
  },
  {
    id: "19",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs19.jpg",
    title: "Horn Prohibited",
    description:
      "This sign is used in silence zones like near hospitals or schools. It directs drivers to respect the silence zone and not use the horn.",
  },
  {
    id: "20",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs20.jpg",
    title: "No Parking",
    description:
      "This sign prohibits parking of vehicles in the designated area. Vehicles parked here are towed away, and the driver is liable to penal action.",
  },
  {
    id: "21",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs21.jpg",
    title: "No Stopping or Standing",
    description:
      "This sign is installed on roads that demand continuous traffic flow. Stopping a vehicle here disrupts traffic and could result in accidents or penal action.",
  },
  {
    id: "22",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs22.jpg",
    title: "Speed Limit",
    description:
      "This sign designates the speed limit for traffic on the road. The specified limit must be followed to avoid penal action and accidents.",
  },
  {
    id: "23",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs23.jpg",
    title: "Width Limit",
    description:
      "This sign indicates the maximum width of vehicles allowed to enter the zone. Vehicles exceeding the width limit are restricted.",
  },
  {
    id: "24",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs24.jpg",
    title: "Height Limit",
    description:
      "This sign indicates the maximum height of vehicles allowed to pass under bridges or other structures. Vehicles exceeding the height limit are restricted.",
  },
  {
    id: "25",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs25.jpg",
    title: "Length Limit",
    description:
      "This sign indicates the maximum length of vehicles allowed to maneuver through the passage. It is often installed at sharp turns or hairpin bends.",
  },
  {
    id: "26",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs26.jpg",
    title: "Load Limit",
    description:
      "This sign limits the load of vehicles allowed to ply on the road. It is often installed before bridges or soft roads that cannot bear heavy loads.",
  },
  {
    id: "27",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs27.jpg",
    title: "Axle Load Limit",
    description:
      "This sign is usually installed before a bridge. It indicates the maximum axle load a bridge can bear.",
  },
  {
    id: "28",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs28.jpg",
    title: "Restriction Ends",
    description:
      "This sign indicates that any restriction conveyed through previous signs ends here. Drivers should still exercise caution.",
  },
  {
    id: "29",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs29.jpg",
    title: "Compulsory Turn Left",
    description:
      "One has to turn towards left after seeing this sign. This may have been installed due to diversion.",
  },
  {
    id: "30",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs30.jpg",
    title: "Compulsory Ahead",
    description:
      "This sign indicates the traffic should move in straight direction and turning to either side would lead to penal action and safety hazard.",
  },
  {
    id: "31",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs31.jpg",
    title: "Compulsory Turn Right",
    description:
      "This sign directs the driver to turn right only. Obeying this signal leads to safety and hassle-free drive.",
  },
  {
    id: "32",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs32.jpg",
    title: "Compulsory Ahead or Turn Right",
    description:
      "This sign directs the traffic to either move straight or take right turn. Turning towards left is prohibited.",
  },
  {
    id: "33",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs33.jpg",
    title: "Compulsory Ahead or Turn Left",
    description:
      "This sign directs the traffic to either move straight or take left turn. Turning towards right is prohibited. Violation may jeopardize your safety and lead to penal action.",
  },
  {
    id: "34",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs34.jpg",
    title: "Compulsory Keep Left",
    description:
      "This sign indicates that the driver should drive in left lane for smooth traffic flow. Mainly installed on roads without a divider and with two-way traffic.",
  },
  {
    id: "35",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs35.jpg",
    title: "Compulsory Cycle Track",
    description:
      "This sign directs that the cyclist should use this lane compulsorily and no other motorized vehicle should enter it. To be a safe cyclist and to avoid fines always follow this sign.",
  },
  {
    id: "36",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs36.jpg",
    title: "Compulsory Sound Horn",
    description:
      "There are some conditions when blowing horn becomes compulsory, such as blind turns in hilly roads. Blow horn to let oncoming traffic know your presence.",
  },
  {
    id: "37",
    image:
      "https://jhpolice.gov.in/sites/default/files/page/sign-language/jhpolice_sl_mrs37.jpg",
    title: "Compulsory Bus Stop",
    description:
      "This sign shows that all buses (public transport) will compulsorily stop at this place.",
  },
];

const MandatorySigns: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header with back button */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Mandatory Signs
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
            These signs are obligatory on the traffic which uses a specific area
            of road. They indicate what must be done rather than what must not
            be done. Mandatory Road signs are generally round in shape with a
            red border, while some are blue. 'Stop' and 'Give Way' are octagon
            and triangular, respectively. Violation of these signs attracts
            heavy fines and punishments and could lead to major accidents.
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

export default MandatorySigns;
