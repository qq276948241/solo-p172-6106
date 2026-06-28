/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        cream: {
          50: "#FDFBF8",
          100: "#FAF6F1",
          200: "#F5EDE3",
        },
        coffee: {
          900: "#3D2817",
          800: "#4E3520",
          700: "#6B4A2E",
        },
        caramel: {
          500: "#D4A574",
          400: "#E0BA90",
          300: "#EBCFAD",
        },
        mocha: {
          500: "#8B6F54",
          400: "#A0866B",
        },
      },
      boxShadow: {
        card: "0 4px 20px rgba(61, 40, 23, 0.08)",
        "card-hover": "0 8px 32px rgba(61, 40, 23, 0.14)",
      },
      borderRadius: {
        card: "16px",
        btn: "12px",
      },
      fontFamily: {
        serif: [
          "Noto Serif SC",
          "Source Han Serif SC",
          "思源宋体",
          "Georgia",
          "serif",
        ],
        sans: [
          "Noto Sans SC",
          "Source Han Sans SC",
          "思源黑体",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-up": "slideUp 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
