import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="absolute top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-8 md:px-12 py-5 flex items-center justify-between">
        
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