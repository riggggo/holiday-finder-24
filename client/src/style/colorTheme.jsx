import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#f8ffd7',
      main: '#013474',
      dark: '#94af76',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#a98274',
      main: '#795548',
      dark: '#4b2c20',
      contrastText: '#000000',
    },
  },
});

export default theme;