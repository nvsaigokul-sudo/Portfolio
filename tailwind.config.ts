import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        console: {
          bg: "#0A0E14",
          surface: "#0D1117",
          panel: "#111722",
          card: "#151C28",
          border: "#1E293B",
          borderSubtle: "rgba(255, 255, 255, 0.08)",
          text: "#F1F5F9",
          muted: "#94A3B8",
          dim: "#64748B",
        },
        cyan: {
          glow: "#3DDBFF",
          primary: "#00C2FF",
          deep: "#0284C7",
        },
        electric: {
          blue: "#5B8CFF",
        },
        alert: {
          amber: "#F59E0B",
          orange: "#F97316",
          dark: "#78350F",
        },
        verified: {
          green: "#10B981",
          emerald: "#059669",
        },
        threat: {
          red: "#EF4444",
          crimson: "#DC2626",
          rose: "#F43F5E",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        "grid-pattern": "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "shimmer": "shimmer 2.5s ease-in-out infinite",
      },
      keyframes: {
        shimmer: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
