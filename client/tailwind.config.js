/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brandDark: "#1A1615",
        brandGold: "#D4AF37",
        brandGoldHover: "#C5A028",
        brandIvory: "#FAF8F5"
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif']
      }
    },
  },
  plugins: [],
}
