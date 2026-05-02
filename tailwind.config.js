import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'Consolas', 'Monaco', 'monospace'],
      },
      colors: {
        ink: '#0b0d0c',
        panel: '#151716',
        panelSoft: '#1d201f',
        line: '#2a2f2c',
        glow: '#26f45f',
      },
    },
  },
  plugins: [typography],
};
