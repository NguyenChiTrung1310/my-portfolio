/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin'

export default {
  darkMode: ['class'],
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {},
    },
    extend: {
      screens: {
        /* CUSTOMIZE SCREEN */
        xs: '528px',
        xs_max: {max: '527px'},
        /**************************** */

        /* DEFAULT sm: '640px', */
        sm_max: {max: '639px'},

        /* DEFAULT md: '768px', */
        md_max: {max: '767px'},

        /* DEFAULT lg: '1024px', */
        lg_max: {max: '1023px'},

        /* DEFAULT xl: '1280px', */
        xl_max: {max: '1279px'},
      },
      colors: {
        primary: {
          DEFAULT: '#56b8ff',
          100: '#40adfb',
        },
        secondary: {
          DEFAULT: '#c9fd74',
        },
      },
      fontSize: {
        '5xl': ['48px', {lineHeight: '60px', fontWeight: 600}],
        '4xl': ['40px', {lineHeight: '60px', fontWeight: 600}],
        '3xl': ['32px', {lineHeight: '48px', fontWeight: 600}],
        '2xl': ['24px', {lineHeight: '40.8px', fontWeight: 600}],
        xl: ['20px', {lineHeight: '34px', fontWeight: 600}],
        lg: ['18px', {lineHeight: '20px', fontWeight: 600}],
        base: ['16px', {lineHeight: '27.2px', fontWeight: 400}],
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    plugin(function ({addBase, theme, addComponents}) {
      addComponents({
        '.flex-between': {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        '.flex-center': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
        '.absolute-center': {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        },
      })
      addBase({
        h1: {
          fontSize: theme('fontSize.5xl'),
          lineHeight: theme('lineHeight.5xl'),
          fontStyle: theme('fontStyle.normal'),
          fontWeight: 600,
        },
        h2: {
          fontSize: theme('fontSize.4xl'),
          lineHeight: theme('lineHeight.4xl'),
          fontStyle: theme('fontStyle.normal'),
          fontWeight: 600,
          // '@screen tablet_max': {
          //   fontSize: theme('fontSize.3xl'),
          //   lineHeight: theme('lineHeight.3xl'),
          //   fontStyle: theme('fontStyle.normal'),
          // fontWeight: 600
          // },
        },
        h3: {
          fontSize: theme('fontSize.3xl'),
          lineHeight: theme('lineHeight.3xl'),
          fontStyle: theme('fontStyle.normal'),
          fontWeight: 600,
        },
        h4: {
          fontSize: theme('fontSize.2xl'),
          lineHeight: theme('lineHeight.2xl'),
          fontStyle: theme('fontStyle.normal'),
          fontWeight: 600,
        },
        h5: {
          fontSize: theme('fontSize.xl'),
          lineHeight: theme('lineHeight.xl'),
          fontStyle: theme('fontStyle.normal'),
          fontWeight: 600,
        },
        h6: {
          fontSize: theme('fontSize.lg'),
          lineHeight: theme('lineHeight.lg'),
          fontStyle: theme('fontStyle.normal'),
          fontWeight: 600,
        },
        p: {
          fontSize: theme('fontSize.base'),
          lineHeight: theme('lineHeight.base'),
          fontStyle: theme('fontStyle.normal'),
          fontWeight: 600,
        },
      })
    }),
  ],
}
