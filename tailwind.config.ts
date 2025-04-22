import type { Config } from "tailwindcss"
const { shadcnPlugin } = require("./lib/shadcn-plugin")

const config: Config = {
    darkMode: "class",
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
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
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
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
                champagne: {
                    DEFAULT: "#e1dad0",
                    light: "#f5f3f0",
                    dark: "#c5bdb2",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            fontFamily: {
                sans: ["var(--font-inter)"],
                playfair: ["var(--font-playfair)"],
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            animation: {
                "float": "float 6s ease-in-out infinite",
                "float-slow": "float 10s ease-in-out infinite",
                "float-reverse": "float-reverse 6s ease-in-out infinite",
                "float-slow-reverse": "float-reverse 10s ease-in-out infinite",
                "pulse-slow": "pulse-slow 8s ease-in-out infinite",
                "pulse-slow-reverse": "pulse-slow 8s ease-in-out infinite reverse",
                "fade-in": "fade-in 1.5s ease-out forwards",
                "fade-in-delay": "fade-in 1.5s ease-out 0.5s forwards",
                "slide-up": "slide-up 1s ease-out forwards",
                "beat": "beat 1.5s ease-in-out infinite",
                "pulse-button": "pulse-button 3s infinite",
            },
            keyframes: {
                "float": {
                    "0%, 100%": { transform: "translateY(0) rotate(0)" },
                    "50%": { transform: "translateY(-15px) rotate(2deg)" },
                },
                "float-reverse": {
                    "0%, 100%": { transform: "translateY(0) rotate(0)" },
                    "50%": { transform: "translateY(15px) rotate(-2deg)" },
                },
                "pulse-slow": {
                    "0%, 100%": { transform: "scale(1)", opacity: "0.1" },
                    "50%": { transform: "scale(1.05)", opacity: "0.2" },
                },
                "fade-in": {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                "slide-up": {
                    "0%": { transform: "translateY(20px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
                "beat": {
                    "0%, 100%": { transform: "scale(1)" },
                    "25%": { transform: "scale(1.2)" },
                    "40%": { transform: "scale(1)" },
                    "60%": { transform: "scale(1.2)" },
                    "75%": { transform: "scale(1)" },
                },
                "pulse-button": {
                    "0%, 100%": { transform: "scale(1)" },
                    "50%": { transform: "scale(1.05)" },
                },
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
}

export default config
