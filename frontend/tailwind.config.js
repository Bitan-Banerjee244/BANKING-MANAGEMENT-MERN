/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui")   // ✅ Import DaisyUI plugin
  ],
  daisyui: {
    themes: ["light"], // 🌞 Force light theme only
  }
}
