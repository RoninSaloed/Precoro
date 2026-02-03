/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "top-bar-gradient": "linear-gradient(to right, #161B40, #2E3985)",
      },
    },
  },
  plugins: [],
};
