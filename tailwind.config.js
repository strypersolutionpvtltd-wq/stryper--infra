/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#062F33',
          dark: '#051f22',
        },
        secondary: {
          DEFAULT: '#0B3D40',
          light: '#0d4a4d',
        },
        gold: {
          DEFAULT: '#D4AF37',
          light: '#E5C878',
        },
        brand: {
          purple: '#7C3AED',
          magenta: '#C020A0',
          dark: '#0A0A0A',
        },
        textGray: '#D9D9D9',
      },
      fontFamily: {
        montserrat: ['Poppins', 'sans-serif'],
        roboto: ['Product Sans', 'Google Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
