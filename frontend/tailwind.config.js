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
          root: "#dc2626",   // darker red
          sacral: "#e95b0e", // darker orange
          solar: "#ca8a04",  // darker yellow
          heart: "#16a34a",  // deeper green
          throat: "#2563eb", // deeper blue
          third: "#4f46e5",  // indigo darker
          crown: "#7e22ce",  // deeper purple
        },
      },

      backgroundImage: {
        "chakra-gradient":
          "linear-gradient(to right, #dc2626, #ea580c, #ca8a04, #16a34a, #2563eb, #4f46e5, #7e22ce)",
      },

      animation: {
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "text-glow": "textGlow 4s ease-in-out infinite",
        floatSlow: "floatSlow 10s ease-in-out infinite",
        floatMedium: "floatMedium 14s ease-in-out infinite",
        floatReverse: "floatReverse 12s ease-in-out infinite",
      },

      keyframes: {
        glowPulse: {
          "0%, 100%": {
            filter: "drop-shadow(0 0 10px rgba(168,85,247,0.35))",
            transform: "scale(1)",
          },
          "50%": {
            filter: "drop-shadow(0 0 22px rgba(97, 19, 170, 0.6))",
            transform: "scale(1.03)",
          },
        },

        textGlow: {
  "0%, 100%": {
    textShadow: "0 0 4px rgba(168,85,247,0.12)",
  },
  "50%": {
    textShadow: "0 0 8px rgba(168,85,247,0.2)",
  },
},

        floatSlow: {
          "0%, 100%": {
            transform: "translate(0px, 0px)",
          },
          "50%": {
            transform: "translate(30px, -20px)",
          },
        },

        floatMedium: {
          "0%, 100%": {
            transform: "translate(0px, 0px)",
          },
          "50%": {
            transform: "translate(-25px, 20px)",
          },
        },

        floatReverse: {
          "0%, 100%": {
            transform: "translate(-50%, -50%) translate(0px, 0px)",
          },
          "50%": {
            transform: "translate(-50%, -50%) translate(20px, -15px)",
          },
        },
      },
    },
  },
  plugins: [],
};