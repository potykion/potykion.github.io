/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      saturate: {
         125: '1.25',
         130: '1.3',
         175: '1.75',
       }
    }
  },
  safelist: [
    "lg:row-span-3",
    "lg:row-span-2",
    "ml-\."
  ],
  plugins: []
};