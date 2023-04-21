/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        mainColor: "#0073EA",
        mainTextColor: "#344563",
        altButtonColor: "#0052CC",
        profileButtonColor: "#00875A",
        borderColor: {
          primary: "#e0e0e0",
          secondary: "#E8E8EC",
        },
        navBackgroundColor: {
          primary: "#F7F7F7",
        },
        textColor: {
          primary: "#333333",
        },
        white: "#ffffff",
        shadowColor: "#0003221a",
      },
    },
  },
  plugins: [],
};
