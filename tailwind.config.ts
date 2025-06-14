import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "rgb(var(--color-primary))",
          dark: "rgb(var(--color-primary-dark))",
          light: "rgb(var(--color-primary-light))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "rgb(var(--color-secondary))",
          dark: "rgb(var(--color-secondary-dark))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Cores do sistema de temas
        theme: {
          primary: "rgb(var(--color-primary))",
          "primary-dark": "rgb(var(--color-primary-dark))",
          "primary-light": "rgb(var(--color-primary-light))",
          secondary: "rgb(var(--color-secondary))",
          "bg-primary": "rgb(var(--bg-primary))",
          "bg-secondary": "rgb(var(--bg-secondary))",
          "bg-tertiary": "rgb(var(--bg-tertiary))",
          "bg-accent": "rgb(var(--bg-accent))",
          "text-primary": "rgb(var(--text-primary))",
          "text-secondary": "rgb(var(--text-secondary))",
          "text-muted": "rgb(var(--text-muted))",
          "text-accent": "rgb(var(--text-accent))",
          "border-primary": "rgb(var(--border-primary))",
          "border-secondary": "rgb(var(--border-secondary))",
        },
        // Cores do sistema de temas com opacidades
        "theme-primary-10": "rgba(var(--color-primary), 0.1)",
        "theme-primary-20": "rgba(var(--color-primary), 0.2)",
        "theme-primary-30": "rgba(var(--color-primary), 0.3)",
        "theme-primary-50": "rgba(var(--color-primary), 0.5)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "bounce-slow": "bounce 3s infinite",
        float: "float 3s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "theme-gradient": "linear-gradient(to right, rgb(var(--gradient-from)), rgb(var(--gradient-to)))",
        "radial-theme-top": "radial-gradient(ellipse at top, rgba(var(--color-primary), 0.1), transparent 70%)",
        "radial-theme-center": "radial-gradient(ellipse at center, rgba(var(--color-primary), 0.1), transparent 70%)",
        "radial-theme-bottom": "radial-gradient(ellipse at bottom, rgba(var(--color-primary), 0.2), transparent 70%)",
      },
      boxShadow: {
        theme: "0 0 25px rgba(var(--shadow-primary), 0.2)",
        "theme-lg": "0 0 35px rgba(var(--shadow-primary), 0.3)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
