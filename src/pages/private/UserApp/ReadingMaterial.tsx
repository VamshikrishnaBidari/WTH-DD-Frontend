import React, { useState } from "react";
import DrivingEthics from "./DrivingEthics";
import Regulations from "./Regulations";
import RulesMaterial from "./RulesMaterial";
import SituationalScenarios from "./SituationalScenarios";
import MandatorySigns from "./MandatorySigns";
import CautionarySigns from "./CautionarySigns";
import InformatorySigns from "./InformatorySigns";
import HandSigns from "./HandSigns";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Module {
  id: string;
  title: string;
  image: string;
}

const ReadingMaterial: React.FC = () => {
  const [activeSection, setActiveSection] = useState<"theory" | "signs">(
    "theory",
  );
  const [showModule, setShowModule] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState<string>("");

  const theoryModules: Module[] = [
    {
      id: "ethics",
      title: "Driving Ethics and Etiquette",
      image:
        "https://image-resource.creatie.ai/155238777211102/155238777211104/9ec5fef62cd7d0fc44ec80c54a8ee327.png",
    },
    {
      id: "regulation",
      title: "Regulation and documentation",
      image:
        "https://image-resource.creatie.ai/155238777211102/155238777211104/d1dc32601efd33a689312f091dfd7c93.png",
    },
    {
      id: "rules",
      title: "Road Rules",
      image:
        "https://image-resource.creatie.ai/155238777211102/155238777211104/71d5b82338f4788c4740387bec92c635.png",
    },
    {
      id: "scenarios",
      title: "Situational scenarios and Emergency",
      image:
        "https://image-resource.creatie.ai/155238777211102/155238777211104/d9ccbe2bcee9dbfc0040bd0d62498140.png",
    },
  ];

  const signModules: Module[] = [
    {
      id: "mandatory",
      title: "Mandatory signs",
      image:
        "https://image-resource.creatie.ai/155238777211102/155238777211104/3b9e7262b32574d9bf8ad92e52b0f195.png",
    },
    {
      id: "cautionary",
      title: "Cautionary Signs",
      image:
        "https://image-resource.creatie.ai/155238777211102/155238777211104/99f050b16b76634c5827ec6c0842ee94.png",
    },
    {
      id: "informatory",
      title: "Informatory Signs",
      image:
        "https://image-resource.creatie.ai/155238777211102/155238777211104/f5dc3a1be01a215f72957318a1293eaa.png",
    },
    {
      id: "hand",
      title: "Hand signals",
      image:
        "https://image-resource.creatie.ai/155238777211102/155238777211104/e4bf0dad48575b08b7bd2738092d590e.png",
    },
  ];

  const activeModules =
    activeSection === "theory" ? theoryModules : signModules;
  const handleModuleClick = (moduleId: string) => {
    setShowModule(true);
    setSelectedModuleId(moduleId);
  };
  const handleBack = () => {
    setShowModule(false);
    setSelectedModuleId("");
  };
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm">
          {/* Header Section */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex space-y-2 justify-between items-center">
              <div className="flex flex-col space-x-2">
                <h1 className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
                  Reading Material
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Click to explore more
                </p>
              </div>
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Back</span>
              </button>
            </div>

            {/* Toggle Section */}
            <div className="mt-6">
              <div className="flex rounded-lg bg-gray-100 dark:bg-gray-700 p-1">
                <button
                  onClick={() => {
                    setActiveSection("theory");
                    setShowModule(false);
                  }}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === "theory"
                      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  Theory
                </button>
                <button
                  onClick={() => {
                    setActiveSection("signs");
                    setShowModule(false);
                  }}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === "signs"
                      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  Signs & Symbols
                </button>
              </div>
            </div>
          </div>

          {/* Content Section */}
          {!showModule ? (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeModules.map((module) => (
                  <div
                    key={module.id}
                    onClick={() => {
                      handleModuleClick(module.id);
                    }}
                    className="bg-white cursor-pointer hover:scale-105 transition-transform dark:bg-gray-900 rounded-xl shadow-sm hover:shadow-md overflow-hidden border border-gray-200 dark:border-gray-700"
                  >
                    <div className="aspect-[16/9] bg-gray-100 dark:bg-gray-700">
                      <img
                        src={module.image}
                        alt={module.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center">
                        {module.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-8 text-gray-500 dark:text-gray-400 text-sm">
                Select a module to read
              </div>
            </div>
          ) : (
            <>
              {selectedModuleId === "ethics" && (
                <DrivingEthics onBack={handleBack} />
              )}
              {selectedModuleId === "regulation" && (
                <Regulations onBack={handleBack} />
              )}
              {selectedModuleId === "rules" && (
                <RulesMaterial onBack={handleBack} />
              )}
              {selectedModuleId === "scenarios" && (
                <SituationalScenarios onBack={handleBack} />
              )}
              {selectedModuleId === "mandatory" && (
                <MandatorySigns onBack={handleBack} />
              )}
              {selectedModuleId === "cautionary" && (
                <CautionarySigns onBack={handleBack} />
              )}
              {selectedModuleId === "informatory" && (
                <InformatorySigns onBack={handleBack} />
              )}
              {selectedModuleId === "hand" && <HandSigns onBack={handleBack} />}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReadingMaterial;
