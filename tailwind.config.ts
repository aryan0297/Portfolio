import type { Config } from 'tailwindcss';

/**
 * Design system tokens.
 * Palette is intentionally narrow: one deep background, a blue primary ramp,
 * a single cyan accent. Everything else is neutral. This is what keeps the
 * surface reading "premium SaaS" instead of "personal site".
 */
const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './constants/**/*.{js,ts}',
    './hooks/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
    './animations/**/*.{js,ts}',
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', sm: '1.5rem', lg: '2rem' },
      screens: { '2xl': '1280px' },
    },
    extend: {
      colors: {
        background: '#050816',
        surface: '#0A1024',
        elevated: '#0E1630',
        primary: {
          DEFAULT: '#3B82F6',
          soft: '#60A5FA',
          deep: '#1D4ED8',
        },
        accent: {
          DEFAULT: '#22D3EE',
          soft: '#67E8F9',
        },
        muted: '#A1A1AA',
        hairline: 'rgba(148, 163, 184, 0.14)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Fluid display scale — no media queries needed for headline sizing.
        display: ['clamp(2.75rem, 8vw, 6.5rem)', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
        headline: ['clamp(2rem, 4.5vw, 3.5rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        title: ['clamp(1.35rem, 2.2vw, 1.85rem)', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
      },
      borderRadius: {
        card: '24px',
        pill: '999px',
      },
      boxShadow: {
        glow: '0 0 60px -15px rgba(59, 130, 246, 0.55)',
        'glow-accent': '0 0 60px -15px rgba(34, 211, 238, 0.5)',
        card: '0 20px 60px -25px rgba(2, 6, 23, 0.9)',
        'card-hover': '0 30px 90px -30px rgba(59, 130, 246, 0.45)',
      },
      backgroundImage: {
        'radial-fade': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
        'gradient-brand': 'linear-gradient(120deg, #3B82F6 0%, #60A5FA 45%, #22D3EE 100%)',
        'gradient-text': 'linear-gradient(120deg, #FFFFFF 20%, #93C5FD 60%, #22D3EE 100%)',
      },
      keyframes: {
        'gradient-pan': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.85)', opacity: '0.7' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'gradient-pan': 'gradient-pan 8s ease infinite',
        float: 'float 6s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        marquee: 'marquee 40s linear infinite',
        blink: 'blink 1s step-end infinite',
        shimmer: 'shimmer 2s infinite',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
