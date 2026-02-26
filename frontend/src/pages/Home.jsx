import { Link } from "react-router-dom";
import logo from "../assets/soulcode-logo.png";

function Particles() {
  // 14 particles, fixed positions + different animation speeds
  const dots = Array.from({ length: 14 }, (_, i) => i);

  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {dots.map((i) => (
        <span
          key={i}
          className={`particle particle-${i}`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center text-white overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-black to-indigo-950 opacity-95 -z-20" />

      {/* Big glow blobs */}
      <div className="absolute w-[780px] h-[780px] bg-purple-600/25 blur-[190px] rounded-full -z-20 top-1/3 left-1/2 -translate-x-1/2" />
      <div className="absolute w-[560px] h-[560px] bg-indigo-600/20 blur-[170px] rounded-full -z-20 top-1/4 right-1/4" />
      <div className="absolute w-[520px] h-[520px] bg-fuchsia-600/10 blur-[170px] rounded-full -z-20 bottom-10 left-10" />

      {/* Particles */}
      <Particles />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-6">
        {/* Logo with subtle pulse */}
        <div className="logo-wrap mb-10">
          <img
            src={logo}
            alt="SoulCode Logo"
            className="w-72 md:w-80 drop-shadow-[0_0_30px_rgba(168,85,247,0.6)]"
          />
        </div>

        {/* Shimmer title */}
        <h1 className="text-7xl md:text-8xl font-bold mb-6 tracking-wide title-shimmer">
          SoulCode
        </h1>

        {/* Subtitle */}
        <p className="text-2xl md:text-3xl text-gray-200/90 mb-12 max-w-2xl leading-relaxed">
          Where spirituality meets technology.
          <br />
          Decode your inner system.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
          <Link
            to="/login"
            className="px-11 py-4 text-lg rounded-full bg-chakra-gradient text-black font-semibold hover:scale-110 transition duration-300 shadow-[0_0_35px_rgba(168,85,247,0.75)]"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-11 py-4 text-lg rounded-full border border-purple-400/70 bg-white/5 hover:bg-white/10 hover:scale-110 transition duration-300"
          >
            Register
          </Link>
        </div>

        {/* Tiny microcopy */}
        <p className="mt-10 text-sm text-gray-400/90">
          Your energy has a pattern. SoulCode helps you see it.
        </p>
      </div>
    </div>
  );
}