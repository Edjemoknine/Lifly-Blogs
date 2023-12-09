/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    darkMode: "class",
    extend: {
      container: {
        center: "true",
        padding: "1rem",
      },
      colors: {
        DEFAULT: "#fff",
        card: "#ddd",
        darkbg: {
          DEFAULT: "#202222",
          card: "252B443",
          dark: "black",
        },
        bg: {
          DEFAULT: "#E1E1E1",
          card: "#CCC",
        },
      },
      fontFamily: {
        caveat: ["Caveat", "cursive"],
        inter: ["Inter", " sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      gridTemplateColumns: {
        fluid: "repeat(auto-fit,minmax(15rem,1fr))",
      },
    },
  },
  plugins: [],
};
