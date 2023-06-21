/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      "2xl": "1400px",
    },
    fontFamily: {
      inter: ["Inter", "sans-serif"],
    },
    extend: {
      colors: {
        primary: "#2C666E",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        "fade-in": "fadeIn .1s ease-in",
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        sm: "1.5rem",
        md: "2.5rem",
        lg: "4rem",
        xl: "4rem",
        "2xl": "6rem",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
