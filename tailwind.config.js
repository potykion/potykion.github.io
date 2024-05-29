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

        extend: {
            // class="animate-fadeOut"
            animation: {
                fadeOut: 'fadeOut 3s ease-in-out forwards',
            },
            keyframes: {
                fadeOut: {
                    '0%': {opacity: 1},
                    '100%': {opacity: 0},
                },
            },
        }

    },
    plugins: [require("@tailwindcss/typography"), require("daisyui")],
}

