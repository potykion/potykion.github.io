/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./content/**/*.{html,md}",
        "./templates/**/*.{html,md}",
        "./potyk_io_back/**/*.py",
    ],
    theme: {
        fontFamily: {
            "sans": ["Noto Sans"],

            'mono': ['monospace'],
        },

        extend: {},
    },
    plugins: [require("@tailwindcss/typography"), require("daisyui")],
}

