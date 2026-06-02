/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#f59e0b',
        'primary-dark': '#d97706',
        dark: {
          900: '#000000',
          800: '#0a0a0a',
          700: '#111111',
          600: '#1f1f1f',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}