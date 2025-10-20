import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}',
  ],
  safelist: [
    'w-64', 'w-20', 'ml-0', 'ml-64', 'ml-20',
    '-translate-x-full', 'translate-x-0',
    'fixed', 'sticky', 'top-16', 'left-0', 'z-30',
    'h-[calc(100vh-64px)]',
    'bottom-4', 'bottom-16', 'right-4', 'right-8',
    'opacity-0', 'opacity-100', 'w-0', 'overflow-hidden',
    'transition-all', 'duration-300', 'hydration-transition',
    'prose', 'prose-lg', 'prose-indigo', 'max-w-none', 'content-format',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#6b21a8',
          light: '#f3e8ff',
          dark: '#581c87',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
      },
    },
  },
  plugins: [typography],
};
