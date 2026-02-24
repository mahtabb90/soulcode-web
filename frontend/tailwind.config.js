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
    },
  },
  plugins: [],
};