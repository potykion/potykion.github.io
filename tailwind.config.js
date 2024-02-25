/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./content/**/*.{html,md}"],
  theme: {
    fontFamily: {
      "sans": ["Noto Sans"],
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
}

