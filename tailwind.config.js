/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./content/**/*.{html,md}"],
  theme: {
    fontFamily: {
      "sans": ["Noto Sans"],
    },

    extend: {},
  },
  darkMode: false,
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
}

