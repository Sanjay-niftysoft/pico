/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Brand Core ──────────────────────────────────────────
        brand: {
          DEFAULT: '#030B7D',   // Primary Brand: Deep Royal Indigo
          dark: '#020860',   // Darker shade for hover / depth
          deeper: '#010540',   // Deepest – hero backgrounds, footers
          mid: '#0A17A8',   // Mid-tone – gradient midpoints
          light: '#1A2FD4',   // Lighter shade – hover accents
          bright: '#2D45F0',   // Bright vivid blue – CTAs, highlights
        },
        // ── Navy (dark backgrounds) ──────────────────────────────
        navy: {
          primary: '#030B7D',   // Main navy = brand color
          deep: '#010540',   // Deepest backgrounds
          dark: '#030B7D',   // Alias for legacy class usage
          light: '#0A17A8',   // Mid-navy for cards on dark bg
        },
        // ── Sci (scientific palette) ──────────────────────────────
        sci: {
          blue: '#030B7D',   // Primary scientific blue = brand
          accent: '#1A2FD4',   // Accent blue – links, CTAs
          cyan: '#38BDF8',   // Cyan highlight – glow effects
          light: '#EEF0FB',   // Very light brand tint bg
          ice: '#E8EAFA',   // Ice blue – alternating sections
          white: '#FFFFFF',
          dark: '#0A0E3F',   // Near-black text for dark heading
          medium: '#1A1F5E',   // Secondary text on light bg
          muted: '#3A3F8A',   // Muted / subtext on light bg
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 20px rgba(3,11,125,0.18)',
        'glow-hover': '0 0 35px rgba(3,11,125,0.30)',
        'cyan-glow': '0 0 20px rgba(56,189,248,0.25)',
        'brand-glow': '0 8px 40px rgba(3,11,125,0.35)',
      }
    },
  },
  plugins: [],
}
