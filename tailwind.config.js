/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,ts,tsx,jsx}',
    './components/**/*.{js,ts,tsx,jsx}',
    './components/**/**/*.{js,ts,tsx,jsx}',
    './screens/*.{js,ts,tsx,jsx}',
    './layouts/*.{js,ts,tsx,jsx}',
  ],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
    },
    colors: {
      transparent: 'transparent',
      purple: '#9b82aa',
      purpleDark: '#3a2546',
      blue: '#73cbcd',
      yellow: '#f5e673',
      black: '#101010',
      white: '#ffffff',
    }
  },
  plugins: [],
};
