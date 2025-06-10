/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-wave": "linear-gradient(-45deg, #ff9a9e, #fad0c4, #fbc2eb, #a6c1ee)",
      },
      animation: {
        "gradient-wave": "gradientWave 15s ease infinite",
      },
      keyframes: {
        gradientWave: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
    },
  },

  plugins: [],
};
