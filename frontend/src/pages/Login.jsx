import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black text-white px-6 overflow-hidden animate-fadeIn">
      {/* Aura */}
      <div className="absolute w-[650px] h-[650px] bg-indigo-600/20 rounded-full blur-[180px] animate-pulse -z-10"></div>
      <div className="absolute w-[450px] h-[450px] bg-purple-600/20 rounded-full blur-[150px] -z-10 bottom-1/4 left-1/4"></div>

      <div className="w-full max-w-md bg-white/5 border border-purple-400/30 rounded-3xl p-10 shadow-[0_0_40px_rgba(168,85,247,0.3)] backdrop-blur-xl">
        <h1 className="text-3xl font-semibold text-center mb-2">
          Welcome back
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Enter your portal.
        </p>

        <form className="space-y-4">
          <div>
            <label className="text-sm text-gray-300">Email</label>
            <input
              type="email"
              className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-purple-400/60"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Password</label>
            <input
              type="password"
              className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-purple-400/60"
              placeholder="••••••••"
            />
          </div>

          <button
            type="button"
            className="w-full mt-2 px-8 py-3 rounded-full bg-chakra-gradient text-black font-semibold tracking-wide shadow-[0_0_25px_rgba(168,85,247,0.6)] transition duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(168,85,247,0.9)]"
          >
            Sign in
          </button>
        </form>

        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-gray-400 hover:text-gray-200">
            ← Back to SoulCode
          </Link>
        </div>
      </div>
    </div>
  );
}
