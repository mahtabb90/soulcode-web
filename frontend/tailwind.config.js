/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        chakra: {
          root: "#ef4444",
          sacral: "#f97316",
          solar: "#eab308",
          heart: "#22c55e",
          throat: "#3b82f6",
          third: "#6366f1",
          crown: "#a855f7",
        },
      },

      backgroundImage: {
        "chakra-gradient":
          "linear-gradient(to right, #ef4444, #f97316, #eab308, #22c55e, #3b82f6, #6366f1, #a855f7)",
      },

      // 🔥 ANIMATIONS
      animation: {
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "text-glow": "textGlow 4s ease-in-out infinite",
      },

      // 🔥 KEYFRAMES
      keyframes: {
        glowPulse: {
          "0%, 100%": {
            filter: "drop-shadow(0 0 10px rgba(168,85,247,0.4))",
            transform: "scale(1)",
          },
          "50%": {
            filter: "drop-shadow(0 0 30px rgba(168,85,247,0.9))",
            transform: "scale(1.05)",
          },
        },

        textGlow: {
          "0%, 100%": {
            textShadow: "0 0 10px rgba(168,85,247,0.4)",
          },
          "50%": {
            textShadow: "0 0 25px rgba(168,85,247,0.9)",
          },
        },
      },
    },
  },
  plugins: [],
};