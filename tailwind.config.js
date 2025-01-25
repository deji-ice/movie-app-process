/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'source': ['"Source Serif 4"'],
        'oswald': ['Oswald'],
      },
    },
  },
  plugins: [],
}
