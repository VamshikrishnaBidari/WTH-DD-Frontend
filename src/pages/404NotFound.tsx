import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import brokenCar from "../assets/brokenCar.png";

const NotFound404: React.FC = () => {
  const navigate = useNavigate();
  const [hornSound, setHornSound] = useState(false);
  const [smokeAnimation, setSmokeAnimation] = useState(true);

  const playHorn = () => {
    setHornSound(true);
    setTimeout(() => setHornSound(false), 500);
  };

  useEffect(() => {
    const smokeInterval = setInterval(() => {
      setSmokeAnimation((prev) => !prev);
    }, 2000);
    return () => clearInterval(smokeInterval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 via-blue-300 to-green-200 flex items-center justify-center px-4 overflow-hidden relative">
      {/* Clouds */}
      <div className="absolute top-10 left-10 animate-pulse">
        <div className="w-16 h-10 bg-white rounded-full opacity-80"></div>
        <div className="w-12 h-8 bg-white rounded-full opacity-80 -mt-4 ml-4"></div>
      </div>
      <div className="absolute top-16 right-20 animate-pulse delay-1000">
        <div className="w-20 h-12 bg-white rounded-full opacity-80"></div>
        <div className="w-14 h-10 bg-white rounded-full opacity-80 -mt-6 ml-6"></div>
      </div>

      {/* Road */}
      <div className="absolute bottom-0 w-full h-32 bg-gray-800">
        <div className="absolute top-1/2 w-full h-1 bg-yellow-300 transform -translate-y-1/2">
          <div className="animate-pulse flex space-x-8">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="w-8 h-1 bg-yellow-300"></div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center z-10 max-w-4xl mx-auto">
        {/* 404 Title */}
        <div className="my-8">
          <h1 className="text-7xl md:text-9xl font-black text-red-600 animate-bounce drop-shadow-lg">
            4🚗4
          </h1>
          <div className="text-2xl md:text-3xl font-bold text-gray-800 mt-2">
            OOPS! WRONG TURN!
          </div>
        </div>

        {/* Broken Car Illustration */}
        <div className="relative mb-8 flex justify-center">
          {/* Car Body */}
          <div className="relative">
            {/* Smoke Animation */}
            <div
              className={`absolute -top-8 left-1/2 transform -translate-x-1/2 transition-opacity duration-1000 ${smokeAnimation ? "opacity-100" : "opacity-30"}`}
            >
              <div className="text-4xl animate-bounce">💨</div>
              <div className="text-3xl animate-bounce delay-200 -mt-2 ml-4">
                💨
              </div>
              <div className="text-2xl animate-bounce delay-500 -mt-1 ml-2">
                💨
              </div>
            </div>

            {/* Broken Car Image */}
            <div
              className="relative cursor-pointer transform hover:scale-105 transition-transform"
              onClick={playHorn}
            >
              <img
                src={brokenCar}
                alt="Broken Car"
                className="w-64 md:w-80 h-auto drop-shadow-2xl"
              />

              {/* Hazard Lights Overlay */}
              <div className="absolute top-4 left-4 w-3 h-3 bg-orange-500 rounded-full animate-ping shadow-lg"></div>
              <div className="absolute top-4 right-4 w-3 h-3 bg-orange-500 rounded-full animate-ping delay-500 shadow-lg"></div>

              {/* License Plate */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded text-sm font-mono text-black border-2 border-gray-400 shadow-md">
                404-LOST
              </div>
            </div>

            {/* Horn Effect */}
            {hornSound && (
              <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 text-3xl animate-ping">
                📢 BEEP!
              </div>
            )}
          </div>

          {/* Traffic Cone */}
          <div className="absolute -right-12 md:-right-16 top-8 text-6xl animate-wiggle">
            🚧
          </div>
        </div>

        {/* Driving School Messages */}
        <div className="mb-8 space-y-4">
          <h2 className="text-xl md:text-3xl font-bold text-red-600">
            🚦 DRIVING LESSON #404 🚦
          </h2>
          <p className="text-lg text-gray-700 font-semibold">
            "This page took a wrong exit and ended up in the breakdown lane!"
          </p>
          <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-r-lg mx-auto max-w-2xl">
            <p className="text-md text-yellow-800">
              🎯 <strong>Instructor's Note:</strong> Even experienced drivers
              sometimes miss their turn. The important thing is to safely
              navigate back to your destination!
            </p>
          </div>
        </div>

        {/* Navigation Options */}
        <div className="space-y-4">
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <button
              onClick={() => navigate("/")}
              className="bg-main hover:bg-mainDark text-white px-8 py-4 rounded-full font-bold text-lg transform hover:scale-105 transition-all shadow-lg flex items-center gap-2"
            >
              🏠 Back to Home
            </button>
          </div>

          {/* Fun Driving Tips */}
          <div className="bg-white bg-opacity-90 rounded-lg p-6 max-w-2xl mx-auto shadow-xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-2">
              🚗 While You're Here - Quick Driving Tip! 🚗
            </h3>
            <div className="text-gray-700 space-y-2">
              <p className="font-semibold">💡 Did you know?</p>
              <p>
                Always check your mirrors before changing lanes - just like
                checking your URL before clicking!
              </p>
            </div>
          </div>
        </div>

        {/* Footer Fun */}
        <div className="my-8 text-gray-600 bg-white bg-opacity-90 p-2 rounded-lg shadow-lg">
          <p className="text-sm">
            🚙 Don't worry, this happens to the best of us! Even GPS gets
            confused sometimes. 🗺️
          </p>
        </div>
      </div>

      <style>{`
        @keyframes wiggle {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-wiggle {
          animation: wiggle 1s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default NotFound404;
