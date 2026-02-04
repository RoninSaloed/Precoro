/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "top-bar-gradient": "linear-gradient(to right, #161B40, #2E3985)",
      },
      colors: {
        "white-color": "#FFFFFF",
        "blue-color": "#1D2452",
        "disabled-color": "#9398C3",
        "line-color": "#415ADA1A",
        "secondary-text-color": "#1D245280",
        "grey-color": "#5E6A75",
        "green-color": "#00A338",
        "blur-green": "#E1F6E9",
        "blur-gray": "#EEF0F6",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
