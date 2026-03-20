import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getHealth } from "../api/client";
import Header from "../components/Header";
import logo from "../assets/SoulCode-logo.png";

export default function Landing() {
  const navigate = useNavigate();
  const [apiStatus, setApiStatus] = useState("Checking API...");

  useEffect(() => {
    const checkAPI = async () => {
      try {
        const data = await getHealth();
        setApiStatus(data?.status === "ok" ? "API: OK" : "API: Unknown");
      } catch (error) {
        setApiStatus("API: Offline");
      }
    };

    checkAPI();
  }, []);
  
  return (
    <>
      <Header />

      <main className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white px-6 overflow-hidden animate-fadeIn">
         {/* Animated Aura Background */}
      <div className="absolute w-[700px] h-[700px] bg-purple-600/20 rounded-full blur-[180px] animate-pulse -z-10"></div>
      <div className="absolute w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[150px] -z-10 top-1/4 right-1/4"></div>

        {/* Large aura layers */}
        <div className="absolute -z-10 top-[-180px] left-[-180px] w-[1100px] h-[1100px] rounded-full bg-purple-700/30 blur-[260px] animate-pulse"></div>
        <div className="absolute -z-10 bottom-[-180px] right-[-120px] w-[900px] h-[900px] rounded-full bg-indigo-700/22 blur-[230px]"></div>
        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-fuchsia-600/12 blur-[190px]"></div>

        {/* Small particles */}
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top_left,rgba(120,0,255,0.34),transparent_34%),radial-gradient(circle_at_center,rgba(115,60,255,0.16),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(80,120,255,0.18),transparent_30%),#000]">
          <span className="absolute top-[20%] left-[7%] w-3 h-3 rounded-full bg-orange-400/45 blur-[1px]"></span>
          <span className="absolute top-[39%] left-[17%] w-3 h-3 rounded-full bg-emerald-400/40 blur-[1px]"></span>
          <span className="absolute top-[28%] right-[12%] w-3 h-3 rounded-full bg-violet-400/40 blur-[1px]"></span>
          <span className="absolute bottom-[18%] left-[27%] w-3 h-3 rounded-full bg-orange-300/35 blur-[1px]"></span>
          <span className="absolute bottom-[10%] right-[10%] w-3 h-3 rounded-full bg-violet-300/35 blur-[1px]"></span>
          <span className="absolute top-[52%] right-[25%] w-3 h-3 rounded-full bg-blue-300/35 blur-[1px]"></span>
        </div>

        {/* Hero */}
        <div className="relative flex flex-col items-center justify-center text-center -mt-4">
          {/* Animated glow behind logo */}
          <div className="absolute top-[-40px] w-[360px] h-[360px] md:w-[460px] md:h-[460px] rounded-full bg-purple-500/20 blur-[130px] animate-pulse"></div>
          <div className="absolute top-[10px] w-[230px] h-[230px] md:w-[300px] md:h-[300px] rounded-full bg-violet-400/16 blur-[90px]"></div>

          <img
            src={logo}
            alt="SoulCode logo"
            className="relative z-10 w-72 md:w-[420px] mb-4 animate-glow-pulse transition-transform duration-500 hover:scale-105"
            
          />

          

          <h1 className="relative z-10 text-7xl md:text-[6.5rem] font-extrabold bg-chakra-gradient bg-clip-text text-transparent tracking-wide drop-shadow-[0_0_35px_rgba(168,85,247,0.55)] animate-text-glow transition-all duration-500 hover:scale-105 hover:drop-shadow-[0_0_55px_rgba(168,85,247,0.9)]">
  SoulCode
</h1>

          <p className="relative z-10 mt-5 text-2xl md:text-2xl text-gray-200 leading-relaxed max-w-4xl">
            Where spirituality meets technology.
            <br />
            Decode your inner system.
          </p>
           <br />
            {/* Energy Line */}
      <div className="w-72 h-1 bg-chakra-gradient rounded-full mb-12 animate-pulse"></div>
      

      
           

          <div className="relative z-10 mt-10 flex items-center gap-5">
            <button
              onClick={() => navigate("/login")}
              className="px-10 py-4 rounded-full bg-chakra-gradient text-black font-semibold text-2xl shadow-[0_0_35px_rgba(168,85,247,0.75)] transition duration-300 hover:scale-[1.03] hover:shadow-[0_0_55px_rgba(168,85,247,1)]"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/register")}
              className="px-10 py-4 rounded-full border border-purple-300/35 bg-white/5 text-white text-2xl backdrop-blur-md hover:bg-white/10 transition"
            >
              Register
            </button>
          </div>

          <p className="relative z-10 mt-8 text-base md:text-lg text-gray-400">
            Your energy has a pattern. SoulCode helps you see it.
          </p>

          <p className="relative z-10 mt-3 text-sm md:text-base text-gray-500">
            {apiStatus}
          </p>
        </div>
      </main>
    </>
  );
}