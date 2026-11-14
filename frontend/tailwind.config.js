/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep forest — derived from the Modshine logo green
        brand: {
          darkest: '#0e1a16',
          dark: '#152822',
          primary: '#1f3d34',
          medium: '#2d5446',
          accent: '#44705f',
          light: '#e4ebe5'
        },
        // Brushed brass
        gold: {
          light: '#f2eadb',
          champagne: '#d8c29c',
          primary: '#b48e57',
          rich: '#98743f',
          dark: '#765828'
        },
        // Linen & travertine neutrals
        warm: {
          canvas: '#f5f1ea',
          cream: '#ece5d8',
          border: '#ddd4c4',
          muted: '#8b8275'
        },
        ink: {
          charcoal: '#1d1b18',
          body: '#3b3732',
          muted: '#6e675d'
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Cormorant', 'Georgia', 'serif'],
        sans: ['Manrope', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 24px 48px -24px rgba(14, 26, 22, 0.18)',
        'luxury-lg': '0 40px 80px -32px rgba(14, 26, 22, 0.28)',
        'gold-glow': '0 14px 40px -12px rgba(180, 142, 87, 0.45)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
      },
    },
  },
  plugins: [],
}
