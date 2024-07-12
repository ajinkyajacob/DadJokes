import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{html,js,ts}'],
    theme: {
      extend: {
        colors: {
          pastelPink: '#FFB3C1',
          pastelBlue: '#A2CFFE',
          pastelGreen: '#B9FBC0',
          pastelYellow: '#FFF3B0',
          coral: '#FF6F61',
          mint: '#98FF98',
          lavender: '#E6E6FA',
          peach: '#FFE5B4',
          skyBlue: '#87CEEB',
          lime: '#BFFF00',
        },
        spacing: {
          '72': '18rem',
          '84': '21rem',
          '96': '24rem',
          '108': '27rem',
        },
        borderRadius: {
          '4xl': '2rem',
        },
        typography: (theme:any) => ({
          DEFAULT: {
            css: {
              color: theme('colors.gray.700'),
              a: {
                color: theme('colors.blue.500'),
                '&:hover': {
                  color: theme('colors.blue.700'),
                },
              },
            },
          },
        }),
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
          serif: ['Merriweather', 'serif'],
        },
      },
    },
    plugins: [
      require('@tailwindcss/typography'),
      require('@tailwindcss/forms'),
      require('@tailwindcss/aspect-ratio'),
    ],
  } satisfies Config