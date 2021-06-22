import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const fonts = { body: `'john-doe', sans-serif` };

const colors = {
  brand: {
    100: '#edfcfc',
    200: '#b0f2f0',
    300: '#7bbcba',
    400: '#5aaba8',
    500: '#0daba5',
    600: '#136765',
    700: '#145c5a',
    800: '#183130',
    900: '#010404',
  },
  brandAlpha: {
    100: '#edfcfca1',
    200: '#b0f2f0a1',
    300: '#7bbcbaa1',
    400: '#5aaba8a1',
    500: '#0daba5a1',
    600: '#136765a1',
    700: '#183130a1',
    800: '#18313003',
    900: '#010404a1',
  },
};

const styles = {
  global: {
    body: {
      color: 'brand.100',
      fontFamily: 'john-doe',
      bg: 'brand.200',
    },
  },
};

const components = {
  Heading: {
    baseStyle: {
      fontFamily: ['john-doe'],
      fontWeight: 'bold',
    },
  },
  Text: {
    baseStyle: {
      fontFamily: ['forma-djr-micro'],
    },
    variants: {
      typewriterNav: {
        fontFamily: 'john-doe',
        fontWeight: 'bold',
        fontSize: {
          base: '1rem',
          sm: '1.2rem',
        },
        textTransform: 'lowercase',
        _hover: {
          color: 'brandAlpha.200',
          transform: 'translateY(-3px)',
          transition: 'all 0.3s ease',
          textShadow: '0 .5rem .5rem #01040440',
        },
      },
      typewriter: {
        fontFamily: 'john-doe',
        fontSize: {
          base: '1rem',
          sm: '1.2rem',
        },
        textTransform: 'lowercase',
      },
    },
  },
};

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
});

const theme = extendTheme({
  colors,
  styles,
  fonts,
  components,
  breakpoints,
});

export default theme;
