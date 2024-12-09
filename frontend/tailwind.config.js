/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [  "./src/**/*.{js,jsx,ts,tsx}" ,   "./public/index.html"],
  theme: {
    extend: {
      colors:{
      customBlue: 'rgb(52, 106, 130)',
    }
    },
  },
  plugins: [],
}
