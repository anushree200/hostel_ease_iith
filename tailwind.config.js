/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brown: {
          600: "#6B4226",
          700: "#5A3621",
          800: "#4C2F1E",
        },
      },
    },
  },
  plugins: [],
};
