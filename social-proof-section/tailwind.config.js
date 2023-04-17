/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'primary-magenta': 'hsl(300, 43%, 22%)',
        'primary-soft-pink': 'hsl(333, 80%, 67%)',
        'neutral-grayish-magenta': 'hsl(303, 10%, 53%)',
        'neutral-light-grayish-magenta': 'hsl(300, 24%, 96%)',
        white: 'hsl(0, 0%, 100%)',
      },
    },
    fontFamily: {
      primary: ['League Spartan', 'sans-serif'],
    },
  },
  plugins: [],
};
