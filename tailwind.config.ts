import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        carbon: {
          900: "#0a0b0d",
          800: "#0f1115",
          700: "#161922",
          600: "#1f2430",
        },
        neon: {
          blue: "#1fb6ff",
          violet: "#7c5cff",
          green: "#20f0a8",
        },
        metal: {
          200: "#d6d7dc",
          300: "#b7bac1",
          400: "#9aa0aa",
        }
      },
      fontFamily: {
        display: ["var(--font-serif)"],
        ui: ["var(--font-sans)"],
      },
      keyframes: {
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-1px, 1px)' },
          '40%': { transform: 'translate(1px, -1px)' },
          '60%': { transform: 'translate(-1px, 0)' },
          '80%': { transform: 'translate(1px, 0)' },
          '100%': { transform: 'translate(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        portal: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        }
      },
      animation: {
        glitch: 'glitch 2s infinite ease-in-out',
        float: 'float 4s ease-in-out infinite',
        portal: 'portal 500ms ease-out',
      },
      boxShadow: {
        glow: '0 0 30px 5px rgba(124, 92, 255, 0.35)',
      },
    },
  },
  plugins: [
  ],
}

export default config
