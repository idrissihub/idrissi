import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#d4c4b0", // Beige/tan from logo
          foreground: "#000000", // Black text
          50: "#faf9f7",
          100: "#f5f2ed",
          200: "#ebe4d9",
          300: "#ddd1c0",
          400: "#d4c4b0", // Main color
          500: "#c4b299",
          600: "#b09d82",
          700: "#9a886b",
          800: "#847354",
          900: "#6e5e3d",
        },
        secondary: {
          DEFAULT: "#f8f6f3", // Very light beige
          foreground: "#000000",
        },
        accent: {
          DEFAULT: "#000000", // Black
          foreground: "#ffffff", // White text on black
        },
        destructive: {
          DEFAULT: "#ef4444", // Red for errors
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#f5f3f0", // Light beige
          foreground: "#666666",
        },
        card: {
          DEFAULT: "#ffffff", // White
          foreground: "#000000", // Black
        },
        popover: {
          DEFAULT: "#ffffff",
          foreground: "#000000",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
