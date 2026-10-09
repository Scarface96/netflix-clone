module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#2ec4b6', dark: '#24a89c' },
      },
      fontFamily: {
        display: ['"Archivo Black"', 'Lato', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
