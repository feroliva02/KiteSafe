/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0B1320',
          sidebar: '#080E18',
          card: '#111C2E',
          teal: '#0D9488',
          emerald: '#059669',
          danger: '#DC2626'
        }
      }
    },
  },
  plugins: [],
}