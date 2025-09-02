/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7e22ce", // purple accent for fantasy vibe
        secondary: "#22d3ee", // cyan accent
      },
      fontFamily: {
        display: ["'Cinzel Decorative'", "serif"], // great fantasy style font
        body: ["'Inter'", "sans-serif"],
      },
    },
  },
  plugins: [],
}
