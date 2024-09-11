/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'anna': "url('/assets/Anna2.png')",
        'anna-md': "url('/assets/Anna.png')",
      },
    },
  },
  plugins: [],
}

