import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        violet: '#9e7f66',
        midnight: '#121721',
        gray: '#9DAEC2',
        'light-violet': '#939BF4',
        'very-dark-blue': '#19202D',
        'light-grey': '#F4F6F8',
        'dark-grey': '#6E8098',
      },
    },
  },
  plugins: [],
};
export default config;
