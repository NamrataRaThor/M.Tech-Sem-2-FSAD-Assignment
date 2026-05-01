/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#050507',
        surface: 'rgba(20, 20, 25, 0.6)'
      }
    },
  },
  plugins: [],
}
