/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#7C3A7E",
        secondary: "#FFD6E0",
        accent: "#FFB454",
        background: "#FFF7ED",
        card: "#FFFFFF",
        buttonhover: "#5C2552",
        textprimary: "#3D2C29",
        textsecondary: "#7C3A7E",
        textAccent: "#FFB454",
        success: "#B7A16A",
        error: "#E4576E",
      },
      backgroundImage: {
        'hostel-bg': "url('/assets/IMG_0183.jpeg')",
      },
    },
  },
  plugins: [],
};
