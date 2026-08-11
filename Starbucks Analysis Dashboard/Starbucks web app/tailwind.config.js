/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sb: {
          green: '#006241',      // Starbucks House Deep Green
          dark: '#1E3932',       // Starbucks Dark Emerald
          light: '#D4E9E2',      // Starbucks Light Mint
          accent: '#00754A',     // Starbucks Vibrant Green
          gold: '#CBA258',       // Starbucks Gold Accent
          cream: '#F2F0EB',      // Starbucks Warm Cream
          bg: '#F7F8F9',         // Clean soft slate background
          card: '#FFFFFF',
          text: '#111827',
          muted: '#6B7280',
        }
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'sb-sm': '0 2px 8px -2px rgba(0, 98, 65, 0.08)',
        'sb-md': '0 4px 20px -4px rgba(0, 98, 65, 0.12)',
        'sb-lg': '0 10px 30px -5px rgba(0, 98, 65, 0.16)',
      }
    },
  },
  plugins: [],
}
