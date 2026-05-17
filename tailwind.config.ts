/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          coffee: {
            950: '#0A0204',
            900: '#180408',
            800: '#2B080F',
            700: '#3F0D17',
            600: '#5C1422',
            500: '#7A1D2E',
            400: '#9A2A3F',
            300: '#B83D55',
          },
          gold: {
            DEFAULT: '#C8A96E',
            light: '#E0C98A',
            dark: '#9E7D45',
          },
          cream: {
            DEFAULT: '#F5E6D0',
            dark: '#D9C4A8',
          },
        },
        fontFamily: {
          serif: ['"Playfair Display"', 'Georgia', 'serif'],
          sans: ['"Inter"', 'system-ui', 'sans-serif'],
        },
        keyframes: {
          shimmer: {
            '0%': { transform: 'translateX(-150%) skewX(-20deg)' },
            '100%': { transform: 'translateX(250%) skewX(-20deg)' },
          },
          'flag-float': {
            '0%, 100%': { transform: 'rotate(-8deg) scale(1.05)' },
            '50%': { transform: 'rotate(8deg) scale(0.95)' },
          },
        },
        animation: {
          shimmer: 'shimmer 2.2s ease-in-out infinite',
          'flag-float': 'flag-float 2s ease-in-out infinite',
        },
      },
    },
    plugins: [],
  }