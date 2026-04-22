import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFCF7',
          100: '#FAF8F1',
          200: '#F2EFE4',
          300: '#E8E3D2',
        },
        ink: {
          DEFAULT: '#18181B',
          soft: '#3F3F46',
          muted: '#71717A',
          faint: '#A1A1AA',
        },
        line: {
          DEFAULT: '#E7E2D3',
          strong: '#D6D0BE',
        },
        amber: {
          ink: '#7C2D12',
          DEFAULT: '#B45309',
          soft: '#F59E0B',
          wash: '#FEF3C7',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Frank Ruhl Libre', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Assistant', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      maxWidth: {
        '8xl': '88rem',
      },
      boxShadow: {
        'soft': '0 1px 2px rgba(24,24,27,0.04), 0 8px 24px -12px rgba(24,24,27,0.08)',
        'lift': '0 4px 12px -2px rgba(24,24,27,0.06), 0 16px 40px -16px rgba(24,24,27,0.12)',
      },
      animation: {
        'fade-up': 'fadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fadeIn 0.4s ease-out both',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
