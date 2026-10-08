/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        'dark-blue-gray': '#666CA3',
        'yankees-blue': '#13183F',
        'roman-silver': '#83869A',
        'sasquatch-socks': '#F74780',
        'carnation-pink': '#FFA7C3',
      },
      fontFamily: {
        'jakarta-sans': ['Plus Jakarta Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
