import React from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import MainLayout from './components/Layout/MainLayout';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* <CssBaseline /> */}
      <MainLayout />
    </ThemeProvider>
  );
}

export default App;
