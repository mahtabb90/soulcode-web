import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="absolute top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-8 md:px-12 py-5 flex items-center justify-between">
        <Link
          to="/"
          className="text-4xl md:text-5xl font-semibold tracking-wide text-white drop-shadow-[0_0_18px_rgba(255,255,255,0.18)] hover:text-purple-200 transition"
        >
          SoulCode
        </Link>

        <nav className="flex items-center gap-8 md:gap-10">
          <Link
            to="/login"
            className="text-2xl md:text-3xl text-gray-200 hover:text-white transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="text-2xl md:text-3xl text-gray-200 hover:text-white transition"
          >
            Register
          </Link>
        </nav>
      </div>
    </header>
  );
}