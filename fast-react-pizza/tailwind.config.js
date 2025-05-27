/** @type {import('tailwindcss').Config} */


export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pizza: ['Roboto Mono', 'sans-serif'],
      },
      height: {
        screen: "100dvh"
      },
    },
  },
  plugins: [],
}
