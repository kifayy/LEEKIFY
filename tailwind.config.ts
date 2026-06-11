import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        pathpicker: {
          purple: "hsl(var(--pathpicker-purple))",
          "purple-dark": "hsl(var(--pathpicker-purple-dark))",
          gold: "hsl(var(--pathpicker-gold))",
        },
      },
      fontFamily: {
        /** Section headlines (home2, newsletter) — matches root Poppins stack */
        hero: ["var(--font-poppins)", "ui-sans-serif", "system-ui", "sans-serif"],
        script: ["var(--font-pathpicker-script)", "cursive"],
        volkhov: ["var(--font-volkhov)", "serif"],
        luckiest: ["var(--font-luckiest-guy)", "cursive"],
        grace: ["var(--font-covered-by-your-grace)", "cursive"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "logo-marquee-x": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-25%)" },
        },
        "vibe-egg-settle": {
          "0%": { transform: "translateY(-3px)" },
          "100%": { transform: "translateY(0)" },
        },
        "vibe-egg-pop": {
          "0%": { transform: "scale(0.88)" },
          "45%": { transform: "scale(1.22)" },
          "70%": { transform: "scale(0.96)" },
          "100%": { transform: "scale(1.1)" },
        },
        "vibe-egg-hop": {
          "0%": { transform: "scale(1.1) translateY(0)" },
          "35%": { transform: "scale(1.12) translateY(-9px)" },
          "55%": { transform: "scale(1.1) translateY(-2px)" },
          "75%": { transform: "scale(1.1) translateY(-5px)" },
          "100%": { transform: "scale(1.1) translateY(0)" },
        },
      },
      animation: {
        "logo-marquee-x": "logo-marquee-x 20s linear infinite",
        "vibe-egg-settle": "vibe-egg-settle 0.3s ease-out forwards",
        "vibe-egg-pop": "vibe-egg-pop 0.45s cubic-bezier(0.34, 1.4, 0.64, 1) forwards",
        "vibe-egg-hop": "vibe-egg-hop 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
