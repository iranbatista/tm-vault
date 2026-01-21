const { colors } = require("./constants/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    "bg-primary",
    "text-primary",
    "border-primary",
    "border-primary/30",
    "border-green-500/30",
    "border-red-500/30",
    "bg-green-500",
    "bg-green-500/20",
    "bg-red-500",
    "border-white/20",
    "bg-black/70",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    fontFamily: {
      sans: ["Inter-Regular"],
      "sans-light": ["Inter-Light"],
      "sans-medium": ["Inter-Medium"],
      "sans-semibold": ["Inter-SemiBold"],
      "sans-bold": ["Inter-Bold"],
    },
    extend: {
      colors: {
        primary: colors.primary,
      },
    },
  },
  plugins: [],
};
