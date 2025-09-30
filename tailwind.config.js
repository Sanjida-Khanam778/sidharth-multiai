/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        manrope: ["Manrope", "serif"],
      },
      colors: {
        'primary': '#254885',
        'curie-green': '#28a745',
        'curie-red': '#dc3545',
        'curie-yellow': '#ffc107',
        'curie-purple': '#6f42c1',
      },
    },
  },
  plugins: [],
};
