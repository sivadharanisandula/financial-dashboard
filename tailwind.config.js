/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f7ff',
          100: '#e6ebff',
          500: '#335cff',
          600: '#2447d6',
          900: '#101b40',
        },
        accent: {
          mint: '#2dd4bf',
          coral: '#fb7185',
          amber: '#f59e0b',
        },
      },
      boxShadow: {
        soft: '0 20px 45px rgba(15, 23, 42, 0.12)',
      },
      backgroundImage: {
        mesh: 'radial-gradient(circle at top left, rgba(51, 92, 255, 0.16), transparent 32%), radial-gradient(circle at bottom right, rgba(45, 212, 191, 0.12), transparent 24%)',
      },
      fontFamily: {
        sans: ['"Sora"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
