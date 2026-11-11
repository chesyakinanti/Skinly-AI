import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          rose: "#A4556B",
          roseHover: "#8F475B",
          roseActive: "#7A3A4D",
          blush: "#F3E3E7",
          cream: "#FCF8F6",
          mauve: "#64424D",
          sage: "#A9B8A2",
          white: "#FFFFFF",
        },
        skin: {
          normal: "#A9B8A2",
          dry: "#A9BDCC",
          oily: "#D58B9B",
          combo: "#B7A7C9",
          warning: "#E8B77D",
        },
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "var(--font-plus-jakarta)", "'Inter'", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        heading: ["'Plus Jakarta Sans'", "var(--font-plus-jakarta)", "sans-serif"],
        body: ["'Plus Jakarta Sans'", "var(--font-plus-jakarta)", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(100, 66, 77, 0.05), 0 2px 6px -1px rgba(100, 66, 77, 0.03)",
        card: "0 10px 32px -4px rgba(100, 66, 77, 0.08), 0 4px 12px -2px rgba(100, 66, 77, 0.03)",
        elevated: "0 20px 48px -8px rgba(100, 66, 77, 0.12), 0 8px 16px -4px rgba(100, 66, 77, 0.04)",
        glow: "0 0 30px rgba(164, 85, 107, 0.18)",
        glowSoft: "0 0 40px rgba(243, 227, 231, 0.6)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 3s infinite",
        "pulse-subtle": "pulseSubtle 4s ease-in-out infinite",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        shimmer: "shimmer 2.5s linear infinite",
        scan: "scanSweep 3s ease-in-out infinite",
        radar: "radarPing 2.5s cubic-bezier(0, 0.2, 0.8, 1) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.02)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        scanSweep: {
          "0%, 100%": { top: "5%", opacity: "0.4" },
          "50%": { top: "90%", opacity: "1" },
        },
        radarPing: {
          "0%": { transform: "scale(0.8)", opacity: "0.8" },
          "80%, 100%": { transform: "scale(1.4)", opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
