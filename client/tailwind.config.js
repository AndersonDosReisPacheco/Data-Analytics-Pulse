/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
        background: {
          light: "#f8fafc",
          dark: "#0f172a",
        },
        surface: {
          light: "#ffffff",
          dark: "#1e293b",
        },
        text: {
          primary: {
            light: "#0f172a",
            dark: "#f1f5f9",
          },
          secondary: {
            light: "#475569",
            dark: "#94a3b8",
          },
        },
        border: {
          light: "#e2e8f0",
          dark: "#334155",
        },
      },
      boxShadow: {
        card: "0 4px 12px -2px rgba(0, 0, 0, 0.05)",
        cardDark: "0 4px 12px -2px rgba(0, 0, 0, 0.25)",
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease-in-out",
        slideUp: "slideUp 0.4s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
      },
    },
  },
  // Em tailwind.config.js → theme.extend
  animation: {
    fadeIn: "fadeIn 0.5s ease-out forwards",
    slideIn: "slideIn 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) forwards",
    float: "float 3s ease-in-out infinite",
  },
  keyframes: {
    fadeIn: {
      "0%": { opacity: 0, transform: "translateY(10px)" },
      "100%": { opacity: 1, transform: "translateY(0)" },
    },
    slideIn: {
      "0%": { opacity: 0, transform: "translateX(-20px)" },
      "100%": { opacity: 1, transform: "translateX(0)" },
    },
    float: {
      "0%, 100%": { transform: "translateY(0)" },
      "50%": { transform: "translateY(-8px)" },
    },
  },
  plugins: [],
};
