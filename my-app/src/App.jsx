// src/App.jsx
import React from 'react';
import { ThemeProvider, CssBaseline, Box, Typography, Button } from '@mui/material';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Fullscreen Flexbox container */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',      // full viewport height
          textAlign: 'center',
          gap: 3,                  // spacing between elements
          px: 2,                   // horizontal padding
        }}
      >
        <Typography variant="h3" color="primary">
          Prueba de Tema Personalizado con MUI
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button variant="contained" color="primary">Primary</Button>
          <Button variant="contained" color="secondary">Secondary</Button>
          <Button variant="contained" color="info">Info</Button>
          <Button variant="contained" color="success">Success</Button>
          <Button variant="contained" color="warning">Warning</Button>
        </Box>

        <Box
          sx={{
            marginTop: 4,
            padding: 2,
            borderRadius: 2,
            backgroundColor: theme.palette.customExtraLight.main,
          }}
        >
          <Typography variant="h6" color={theme.palette.customLight.main}>
            This box uses custom palette colors 🎨
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
