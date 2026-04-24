import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Special Elite"', "ui-monospace", "Courier", "monospace"],
        display: ['"Special Elite"', "ui-monospace", "Courier", "monospace"],
      },
      colors: {
        void: "#0a0a0a",
        bone: "#e8e4db",
      },
      animation: {
        "breathe": "breathe 9s ease-in-out infinite",
        "drift": "drift 22s ease-in-out infinite",
      },
      keyframes: {
        breathe: {
          "0%, 100%": { opacity: "0.45", transform: "scale(1)" },
          "50%": { opacity: "0.7", transform: "scale(1.08)" },
        },
        drift: {
          "0%, 100%": { transform: "translate(-50%, -50%)" },
          "50%": { transform: "translate(-48%, -53%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
