import colors from 'tailwindcss/colors'
import flowbite from 'flowbite/plugin'
import flowbiteTypography from 'flowbite-typography'

const primaryColors = {
  50: '#FBE3ED',
  100: '#F5BAD3',
  200: '#F08DB6',
  300: '#EB5E99',
  400: '#E73982',
  500: '#E5056B',
  600: '#D40567',
  700: '#EB5E99',
  800: '#A8065D',
  900: '#820653',
}

const secondaryColors = {
  50: '#FFFEE6',
  100: '#FEFAC0',
  200: '#FDF695',
  300: '#FCF267',
  400: '#F9EE3E',
  500: '#F6E900',
  600: '#FFDD01',
  700: '#FFC400',
  800: '#FFAB00',
  900: '#FF7E00',
}

export default {
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/flowbite-react/lib/**/*.{js,ts}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './index.html',
    './index.js',
  ],
  theme: {
    colors: {
      cyan: primaryColors,
      blue: primaryColors,
    },
    extend: {
      colors: {
        primary: primaryColors,
        secondary: secondaryColors,
      },
      fontFamily: {
        body: [
          'Sora',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'system-ui',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji',
        ],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'Courier New',
          'monospace',
        ],
        sans: [
          'Sora',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'system-ui',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji',
        ],
      },
      maxWidth: {
        '2xs': '16rem',
        '8xl': '90rem',
      },
    },
  },
  plugins: [flowbite, flowbiteTypography],
}
