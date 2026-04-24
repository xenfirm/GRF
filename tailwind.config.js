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
          DEFAULT: '#0b3d2c',
          50: '#e8f3ef',
          100: '#c5e2d5',
          200: '#9ecfbb',
          300: '#6fba9f',
          400: '#45a181',
          500: '#1f8763',
          600: '#16694c',
          700: '#105039',
          800: '#0b3d2c',
          900: '#07291d',
        },
        cream: '#fcfcfc',
        offwhite: '#f9f9f9',
        darktext: '#111827',
        farmgold: '#C9A227',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        card: '0 2px 16px 0 rgba(31,122,99,0.08)',
        'card-hover': '0 8px 32px 0 rgba(31,122,99,0.18)',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
      },
    },
  },
  plugins: [],
}
