// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "'Manrope', sans-serif",
  },

  palette: {
    primary: {
      main: "#49769f", // dark navy
    },
    secondary: {
      main: "#0a4174", // deep blue
    },
    info: {
      main: "#001d39", // medium blue
    },
    success: {
      main: "#4e8ea2", // teal
    },
    warning: {
      main: "#6ea2b3", // aqua
    },
    customLight: {
      main: "#7bbde8", // light sky blue
    },
    customExtraLight: {
      main: "#bdd8e9", // pale blue
    },

    accentOrange: {
      main: "#ff914d", // warm orange
    },
    accentGreen: {
      main: "#6cc551", // fresh green
    },
    accentPurple: {
      main: "#9b5de5", // vivid purple
    },
    accentPink: {
      main: "#f15bb5", // bright pink
    },
    accentRed: {
      main: "#ff0000",
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
