/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#e0f2fe",
          DEFAULT: "#0284C7",
          dark: "#0369a1",
        },
        brand: {
          dark: "#0F172A",
          accent: "#F97316",
          bg: "#F8FAFC",
          text: "#1E293B",
        },
      },
      fontFamily: {
        sans: ["Inter", "Poppins", "sans-serif"],
        serif: ["Manrope", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 12px 0 rgba(0, 0, 0, 0.05)",
        premium: "0 12px 24px -4px rgba(15, 23, 42, 0.08)",
      },
    },
  },
  plugins: [],
};
