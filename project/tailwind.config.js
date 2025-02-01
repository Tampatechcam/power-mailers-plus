/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          700: '#1e3a5f',
          800: '#1b3557',
          900: '#172f4f'
        },
        orange: {
          500: '#ff5722'
        }
      }
    },
  },
  plugins: [],
};