// src/theme.js
// Paleta de colores a utilizar
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#49769f', // dark navy
    },
    secondary: {
      main: '#0a4174', // deep blue
    },
    info: {
      main: '#001d39', // medium blue 
    },
    success: {
      main: '#4e8ea2', // teal
    },
    warning: {
      main: '#6ea2b3', // aqua
    },
    customLight: {
      main: '#7bbde8', // light sky blue
    },
    customExtraLight: {
      main: '#bdd8e9', // pale blue
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default theme;
