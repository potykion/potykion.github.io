/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./content/**/*.{html,md}"],
  theme: {
    fontFamily: {
      "sans": ["Noto Sans"],
    },

    extend: {},
  },
  darkMode: 'selector',
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
}

