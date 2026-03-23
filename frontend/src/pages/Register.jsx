import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/Soulcode-logo.png";
import { register } from "../api/client";

export default function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("mahtab@test.com");
  const [password, setPassword] = useState("Secret123!");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(email, password);
      navigate("/login");
    } catch (err) {
      setError(err.message || "Could not register");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-enter min-h-screen flex flex-col items-center justify-center bg-black text-white px-6 overflow-hidden">
      <div className="absolute w-[700px] h-[700px] bg-purple-600/20 rounded-full blur-[180px] -z-10 top-1/3"></div>

      <div className="w-full max-w-md bg-white/5 border border-purple-400/30 rounded-3xl p-8 backdrop-blur-xl shadow-[0_0_40px_rgba(168,85,247,0.25)]">
        <div className="flex flex-col items-center mb-6">
          <img
  src={logo}
  alt="SoulCode"
  className="w-32 opacity-90 drop-shadow-[0_0_18px_rgba(168,85,247,0.55)] transition-transform duration-300 hover:scale-105"
/>
        </div>

        <h2 className="text-3xl font-semibold text-center mb-2">Create account</h2>
        <p className="text-gray-300 text-center mb-6">
          Join SoulCode and start tracking your energy.
        </p>

        {error && (
          <div className="mb-5 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm text-gray-300">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-purple-400/60"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-purple-400/60"
              placeholder="Choose a strong password"
            />
          </div>

          <button
            disabled={loading}
            className="w-full mt-2 px-8 py-3 rounded-full bg-chakra-gradient text-black font-semibold tracking-wide shadow-[0_0_25px_rgba(168,85,247,0.6)] transition duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(168,85,247,0.9)] disabled:opacity-60 disabled:hover:scale-100"
          >
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-300 hover:text-purple-200">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}