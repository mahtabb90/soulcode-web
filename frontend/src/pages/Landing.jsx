import { useEffect, useState } from "react";
import { getHealth } from "../api/client";


import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();
  const [apiStatus, setApiStatus] = useState("connecting...");

useEffect(() => {
  getHealth()
    .then((data) => setApiStatus(`API: ${data.status}`))
    .catch(() => setApiStatus("API: offline"));
}, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white px-6 overflow-hidden animate-fadeIn">
      {/* Animated Aura Background */}
      <div className="absolute w-[700px] h-[700px] bg-purple-600/20 rounded-full blur-[180px] animate-pulse -z-10"></div>
      <div className="absolute w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[150px] -z-10 top-1/4 right-1/4"></div>

      {/* Title */}
      <h1 className="text-6xl md:text-7xl font-extrabold bg-chakra-gradient bg-clip-text text-transparent mb-6 text-center tracking-widest drop-shadow-[0_0_25px_rgba(168,85,247,0.5)]">
        SoulCode
      </h1>

      {/* Tagline */}
      <p className="text-xl md:text-2xl text-gray-300 text-center max-w-2xl mb-12 leading-relaxed tracking-wide">
        Where spirituality meets technology.
        <br />
        Decode your inner system.
      </p>

      {/* Energy Line */}
      <div className="w-72 h-1 bg-chakra-gradient rounded-full mb-12 animate-pulse"></div>
      <p className="text-sm text-gray-400 mb-8">
        {apiStatus}
      </p>

      {/* Glass Card */}
      <div className="bg-white/5 border border-purple-400/30 rounded-3xl p-10 shadow-[0_0_40px_rgba(168,85,247,0.3)] backdrop-blur-xl transition duration-500 hover:scale-105 hover:shadow-[0_0_60px_rgba(168,85,247,0.6)]">
        <h2 className="text-3xl font-semibold mb-4 text-center tracking-wide">
          Track Your Energy
        </h2>

        <p className="text-gray-400 text-center max-w-md">
          Log meditation, yoga, and align your chakras with intelligent insights.
        </p>

        <div className="flex justify-center">
          <button
            onClick={() => navigate("/login")}
            className="mt-8 px-8 py-3 rounded-full bg-chakra-gradient text-black font-semibold tracking-wide shadow-[0_0_25px_rgba(168,85,247,0.6)] transition duration-300 hover:scale-110 hover:shadow-[0_0_40px_rgba(168,85,247,0.9)]"
          >
            Enter SoulCode
          </button>
        </div>
      </div>
    </div>
  );
}