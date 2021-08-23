import {common, grey, red} from '@material-ui/core/colors';
import {createMuiTheme} from '@material-ui/core/styles';

/**
 * Exness main site theme taken from `exness-web-cloud` repository.
 * Actual on May 11 2021
 */
export default createMuiTheme({
  palette: {
    primary: {
      main: '#26292D',
    },
    secondary: {
      main: '#FFCF01',
      dark: '#FFDA33',
    },
    error: {
      main: red.A400,
    },
    info: {
      main: '#0376BC',
      secondary: '#800080',
    },
    divider: grey[200],
    background: {
      almostGrey: '#2C3033',
      default: common.white,
      grey: '#8F9297',
      greyLight: grey[200],
      greyMedium: '#CBCBCB',
      greyDark: '#51575B',
      paleGrey: '#EEEEEE',
      red: '#D84027',
    },
    text: {
      grey: '#8F9297',
      success: '#23B14A',
      disabled: '#51575B',
    },
  },
  breakpoints: {
    keys: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1600,
    },
  },
  /**
   * @see https://css-tricks.com/linearly-scale-font-size-with-css-clamp-based-on-the-viewport/
   */
  typography: {
    h1: {
      fontSize: 'clamp(2rem, 1.5rem + 2.5vw, 4.5rem)',
      lineHeight: 1.22222222222,
      fontWeight: 700,
    },
    h2: {
      fontSize: 'clamp(1.5rem, 1.2rem + 1.5vw, 3rem)',
      lineHeight: 1.16666666667,
      fontWeight: 700,
    },
    h3: {
      fontSize: 'clamp(1.125rem, 0.95rem + 0.875vw, 2rem)',
      lineHeight: 1.25,
      fontWeight: 700,
    },
    h4: {
      fontSize: 'clamp(0.875rem, 0.75rem + 0.625vw, 1.5rem)',
      lineHeight: 1.33333333333,
      fontWeight: 700,
    },
    h5: {
      fontSize: 'clamp(0.875rem, 0.825rem + 0.25vw, 1.125rem)',
      lineHeight: 1.33333333333,
      fontWeight: 700,
    },
    h6: {
      fontSize: 'clamp(0.75rem, 0.725rem + 0.125vw, 0.875rem)',
      lineHeight: 1.42857142857,
      fontWeight: 700,
    },
    subtitle1: {
      fontSize: 'clamp(1.125rem, 1rem + 0.625vw, 1.75rem)',
      lineHeight: 1.28571428571,
      fontWeight: 400,
    },
    subtitle2: {
      fontSize: 'clamp(0.875rem, 0.75rem + 0.625vw, 1.5rem)',
      lineHeight: 1.33333333333,
      fontWeight: 400,
    },
    navigation: {
      fontSize: 'clamp(0.75rem, 0.7rem + 0.25vw, 1rem)',
      lineHeight: 1.25,
      fontWeight: 400,
      whiteSpace: 'nowrap',
    },
    body1: {
      fontSize: 'clamp(0.875rem, 0.825rem + 0.25vw, 1.125rem)',
      lineHeight: 1.33333333333,
      fontWeight: 400,
    },
    body2: {
      fontSize: 'clamp(0.75rem, 0.725rem + 0.125vw, 0.875rem)',
      lineHeight: 1.42857142857,
    },
    caption: {
      fontSize: 'clamp(0.6875rem, 0.675rem + 0.0625vw, 0.75rem)',
      lineHeight: 1.33333333333,
      fontWeight: 400,
    },
    button: {
      textTransform: 'none',
      whiteSpace: 'nowrap',
      fontWeight: 400,
    },
    fontWeightBold: 700,
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '*:focus': {
          outline: 'none',
        },
        body: {
          fallbacks: [{minHeight: '100%'}],
          minHeight: 'fill-available',
          backgroundColor: grey[200],
        },
        html: {
          WebkitFontSmoothing: 'auto',
          fallbacks: [{height: '100%'}],
          height: 'fill-available',
        },
      },
    },
    MuiAccordion: {
      root: {
        boxShadow: 'none',
        '&$expanded': {
          margin: 0,
        },
        '&:before': {
          display: 'none',
        },
      },
    },
    MuiAccordionSummary: {
      root: {
        minHeight: 0,
        margin: 0,
        '&$expanded': {
          margin: 0,
          minHeight: 0,
        },
      },
      content: {
        margin: 0,
        '&$expanded': {
          margin: 0,
        },
      },
    },
    MuiAccordionDetails: {
      root: {
        display: 'block',
      },
    },
  },
});
