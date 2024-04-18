'use client';
import { createTheme, responsiveFontSizes  } from '@mui/material/styles';

const theme = responsiveFontSizes(createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#195876',
        dark: '#112638',
        contrastText: '#F8F9FB',
        light: '#329bbb',
      },
      secondary: {
        main: '#ad5100',
        dark: '#803C00',
        light: '#ea730c',
        contrastText: '#F8F9FB',
      },
      background: {
        default: '#F8F9FB',
      },
      divider: '#6C6C6C',
    },
  }));

export default theme;
