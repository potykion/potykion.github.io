/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./content/**/*.{html,md}",
        "./templates/**/*.{html,md}",
        "./potyk_io_back/**/*.py",
    ],


    darkMode: 'false',

    theme: {
        fontFamily: {
            "sans": ["Noto Sans"],

            'mono': ['monospace'],
        },

        extend: {
            // class="animate-fadeOut"
            animation: {
                fadeOut: 'fadeOut 3s ease-in-out forwards',
                fadeIn: 'fadeIn 2s ease-in-out infinite',

            },
            keyframes: {
                fadeOut: {
                    '0%': {opacity: 1},
                    '100%': {opacity: 0},
                },
                fadeIn: {
                    '0%': {opacity: '0'},
                    '100%': {opacity: '1'},
                },
            },
        }

    },
    plugins: [require("@tailwindcss/typography"), require("daisyui")],
    daisyui: {
        themes: ['light'],
        darkMode: 'light',
    }
}

