/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'tablet': { 'max': '767px' },
      'mobile': { 'max': '500px' },
      'mobile-sm': { 'max': '400px' },
    },
    extend: {},
  },
  plugins: [],
}