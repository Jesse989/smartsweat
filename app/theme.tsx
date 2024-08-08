import { extendTheme } from '@mui/joy/styles';
import { Inter, Source_Code_Pro } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  adjustFontFallback: false, // prevent NextJS from adding its own fallback font
  fallback: ['var(--joy-fontFamily-fallback)'], // use Joy UI's fallback font
  display: 'swap',
});

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  adjustFontFallback: false, // prevent NextJS from adding its own fallback font
  fallback: [
    // the default theme's fallback for monospace fonts
    'ui-monospace',
    'SFMono-Regular',
    'Menlo',
    'Monaco',
    'Consolas',
    'Liberation Mono',
    'Courier New',
    'monospace',
  ],
  display: 'swap',
});

const theme = extendTheme({
  fontFamily: {
    body: inter.style.fontFamily,
    display: inter.style.fontFamily,
    code: sourceCodePro.style.fontFamily,
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          '50': '#fffbeb',
          '100': '#fef3c7',
          '200': '#fde68a',
          '300': '#fcd34d',
          '400': '#fbbf24',
          '500': '#f59e0b',
          '600': '#d97706',
          '700': '#b45309',
          '800': '#92400e',
          '900': '#78350f',
        },
      },
    },
    dark: {
      palette: {
        primary: {
          '50': '#fffbeb',
          '100': '#fef3c7',
          '200': '#fde68a',
          '300': '#fcd34d',
          '400': '#fbbf24',
          '500': '#f59e0b',
          '600': '#d97706',
          '700': '#b45309',
          '800': '#92400e',
          '900': '#78350f',
        },
      },
    },
  },
  components: {
    // JoyButton: {
    //   styleOverrides: {
    //     root: {
    //       borderRadius: 'lg',
    //     },
    //   },
    // },
  },
});

export default theme;
