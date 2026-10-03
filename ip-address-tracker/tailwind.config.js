/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './app.js'],
  theme: {
    extend: {
      colors: {
        'very-dark-gray': 'hsl(0, 0%, 17%)',
        'dark-gray': 'hsl(0, 0%, 59%)',
      },
      fontFamily: {
        rubik: ['Rubik', 'sans-serif'],
      },
      backgroundImage: {
        'pattern-mobile': "url('/images/pattern-bg-mobile.png')",
        'pattern-desktop': "url('/images/pattern-bg-desktop.png')",
      },
    },
  },
  plugins: [],
};
