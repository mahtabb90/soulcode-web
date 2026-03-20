import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getHealth } from "../api/client";
import Header from "../components/Header";
import logo from "../assets/Soulcode-logo.png";

export default function Landing() {
  const navigate = useNavigate();
  const [apiStatus, setApiStatus] = useState("Checking API...");
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 40 });

 useEffect(() => {
  const checkAPI = async () => {
    try {
      const data = await getHealth();
      setApiStatus(data?.status === "ok" ? "API: OK" : "API: Unknown");
    } catch (error) {
      console.error("API health check failed:", error);
      setApiStatus("API: Offline");
    }
  };

  checkAPI();
}, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <Header />

      <main className="relative min-h-screen flex flex-col items-center justify-center bg-[#020617] text-white px-6 overflow-hidden animate-fadeIn">
        {/* Base radial background */}
        <div className="absolute inset-0 -z-30 bg-[radial-gradient(ellipse_at_center,rgba(88,28,135,0.22)_0%,rgba(45,27,105,0.20)_35%,rgba(15,23,42,0.96)_100%)]"></div>

        {/* Mouse reactive glow */}
        <div
          className="absolute inset-0 -z-20 transition-all duration-300"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(146, 64, 223, 0.12), transparent 20%)`,
          }}
        ></div>

        {/* Floating aura layers */}
        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full bg-fuchsia-600/6 blur-[260px] animate-floatReverse"></div>
        <div className="absolute w-[1000px] h-[1000px] bg-purple-600/8 rounded-full blur-[260px] animate-pulse -z-10"></div>
        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-fuchsia-600/10 blur-[190px] animate-floatReverse"></div>

        {/* Extra soft aura */}
        <div className="absolute w-[700px] h-[700px] bg-purple-600/15 rounded-full blur-[180px] animate-pulse -z-10"></div>
        <div className="absolute w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[150px] -z-10 top-1/4 right-1/4 animate-floatSlow"></div>

        {/* Particles */}
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top_left,rgba(120,0,255,0.22),transparent_40%),radial-gradient(circle_at_center,rgba(115,60,255,0.10),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(80,120,255,0.10),transparent_40%)]">
          <span className="absolute top-[20%] left-[7%] w-3 h-3 rounded-full bg-orange-400/40 blur-[1px] animate-pulse"></span>
          <span className="absolute top-[39%] left-[17%] w-3 h-3 rounded-full bg-emerald-400/35 blur-[1px] animate-pulse"></span>
          <span className="absolute top-[28%] right-[12%] w-3 h-3 rounded-full bg-violet-400/35 blur-[1px] animate-pulse"></span>
          <span className="absolute bottom-[18%] left-[27%] w-3 h-3 rounded-full bg-orange-300/30 blur-[1px] animate-pulse"></span>
          <span className="absolute bottom-[10%] right-[10%] w-3 h-3 rounded-full bg-violet-300/30 blur-[1px] animate-pulse"></span>
          <span className="absolute top-[52%] right-[25%] w-3 h-3 rounded-full bg-blue-300/30 blur-[1px] animate-pulse"></span>
        </div>

        {/* Hero */}
        <div className="relative flex flex-col items-center justify-center text-center -mt-4">
          {/* Glow behind logo */}
          <div className="absolute top-[-70px] w-[520px] h-[520px] md:w-[640px] md:h-[640px] rounded-full bg-purple-500/10 blur-[180px] animate-pulse"></div>
<div className="absolute top-[-10px] w-[320px] h-[320px] md:w-[420px] md:h-[420px] rounded-full bg-violet-400/8 blur-[130px]"></div>

          <img
            src={logo}
            alt="SoulCode logo"
            className="relative z-10 w-72 md:w-[420px] mb-4 animate-glow-pulse transition-transform duration-500 hover:scale-105"
          />

   <h1 className="relative z-10 text-6xl md:text-[5.5rem] font-extrabold bg-[linear-gradient(to_right,#31c85b_0%,#31c85b_22%,#2fc7b7_42%,#4d8df7_72%,#8a63f6_100%)] bg-clip-text text-transparent tracking-wide transition-all duration-500 hover:scale-105">
  SoulCode
</h1>

          <p className="relative z-10 mt-5 text-2xl md:text-2xl text-gray-200 leading-relaxed max-w-4xl">
            Where spirituality meets technology.
            <br />
            Decode your inner system.
          </p>

          <div className="w-72 h-1 bg-chakra-gradient rounded-full mb-12 mt-6 animate-pulse"></div>

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
          {apiStatus !== "API: OK" && (
          
          <p className="relative z-10 mt-3 text-sm md:text-base text-red-400">
    {apiStatus}
         </p>
)}

        
        </div>
      </main>
    </>
  );
}