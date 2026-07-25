import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand — deep, trustworthy industrial blue
        navy: {
          DEFAULT: "#0b2a48",
          dark: "#071e35",
          light: "#15466e",
        },
        // Supporting cool accent — professional azure, used sparingly
        cyan: {
          DEFAULT: "#116aa0",
          hover: "#0b557f",
          soft: "#9fd2f0",
        },
        // Trust / verification green
        trust: {
          DEFAULT: "#08783f",
          soft: "#e6f6ee",
        },
        // Primary CTA — confident amber
        amber: {
          DEFAULT: "#f5a524",
          hover: "#dd8c0c",
          ink: "#9a5b00",
        },
        // Neutrals
        ink: "#0f1b29",
        slate: {
          DEFAULT: "#2a3b4d",
          soft: "#627287",
        },
        line: {
          DEFAULT: "#e6edf4",
          soft: "#eef3f8",
        },
        // Light surfaces — the airy backdrop of the cleaner design
        ice: "#f5f9fc",
        cloud: "#fbfcfe",
        mist: "#eef4fa",
      },
      fontFamily: {
        heading: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "18px",
        xl2: "26px",
        pill: "999px",
      },
      boxShadow: {
        // Softer, more diffuse elevation for the lighter look.
        card: "0 1px 2px rgba(13,42,72,0.04), 0 8px 24px -12px rgba(13,42,72,0.12)",
        soft: "0 2px 12px rgba(13,42,72,0.06)",
        lift: "0 28px 60px -28px rgba(13,42,72,0.22)",
        ring: "0 0 0 1px rgba(13,42,72,0.05)",
      },
      backgroundImage: {
        // Light, airy hero/section washes
        "hero-light": "linear-gradient(180deg, #ffffff 0%, #f1f8fd 100%)",
        "mist-soft": "linear-gradient(165deg, #fbfdff 0%, #eef4fa 100%)",
        // Dark gradients kept for the few accent surfaces that still want depth
        "cool-gradient": "linear-gradient(135deg, #071e35 0%, #0b2a48 55%, #15466e 100%)",
        "cool-gradient-soft": "linear-gradient(140deg, #0b2a48 0%, #15466e 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
        "slide-in": "slide-in 0.28s cubic-bezier(0.16,1,0.3,1) both",
        "fade-in": "fade-in 0.2s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
