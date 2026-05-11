import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-be-vietnam)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      colors: {
        yearbook: {
          navy: '#0F2C59',
          gold: '#E5B73B',
          cream: '#FFF8E7',
        },
        wedding: {
          rose: '#F8C8D8',
          ivory: '#FFF5EE',
          blush: '#E8A0BF',
        },
        birthday: {
          purple: '#7C3AED',
          orange: '#FB7185',
          sun: '#FBBF24',
        },
      },
      backgroundImage: {
        'yearbook-grad': 'linear-gradient(135deg, #0F2C59 0%, #1E3A6E 50%, #E5B73B 100%)',
        'wedding-grad': 'linear-gradient(135deg, #F8C8D8 0%, #FFF5EE 50%, #FAD0C9 100%)',
        'birthday-grad': 'linear-gradient(135deg, #7C3AED 0%, #EC4899 50%, #FB7185 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'fade-up': 'fadeUp 0.6s ease-out',
        'sparkle': 'sparkle 1.8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(2deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
