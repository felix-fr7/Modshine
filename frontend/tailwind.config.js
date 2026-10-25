/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          darkest: '#091c16',
          dark: '#0e2d24',
          primary: '#14453a',
          medium: '#1c5c4f',
          accent: '#267a68',
          light: '#e8f3f0'
        },
        gold: {
          light: '#f5edd8',
          champagne: '#ddc59f',
          primary: '#c49f64',
          rich: '#aa8243',
          dark: '#8b672f'
        },
        warm: {
          canvas: '#fdfcf9',
          cream: '#f7f4ed',
          border: '#e8e2d4',
          muted: '#8c867b'
        },
        ink: {
          charcoal: '#181e1c',
          body: '#2d3733',
          muted: '#63726d'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(14, 45, 36, 0.12)',
        'luxury-lg': '0 30px 60px -20px rgba(14, 45, 36, 0.18)',
        'gold-glow': '0 0 25px rgba(196, 159, 100, 0.25)',
      }
    },
  },
  plugins: [],
}
