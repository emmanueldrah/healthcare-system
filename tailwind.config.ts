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
          DEFAULT: '#1e3a5f',
          foreground: '#ffffff',
        },
        accent: {
          DEFAULT: '#0ea5e9',
          foreground: '#ffffff',
        }
      }
    },
  },
  plugins: [],
}
