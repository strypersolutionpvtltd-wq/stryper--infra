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
          DEFAULT: '#050505', // Vittaazio Deep Charcoal
          dark: '#000000',    // Vittaazio Pure Black
        },
        secondary: {
          DEFAULT: '#0d0d0d', // Vittaazio alternate dark
          light: '#121212',
        },
        gold: {
          DEFAULT: '#ffcc33', // Vittaazio Yellow-Gold Accent
          light: '#ffe066',
        },
        brand: {
          purple: '#7C3AED',
          magenta: '#C020A0',
          dark: '#0d0d0d',
        },
        textGray: '#e5e5e5',
      },
      fontFamily: {
        montserrat: ['Poppins', 'sans-serif'],
        roboto: ['Product Sans', 'Google Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
