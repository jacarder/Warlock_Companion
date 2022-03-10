import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#68553d',
    },
    secondary: {
      main: '#b6a98b',
    },
    error: {
      main: '#d83d2c',
    },
  },
});

export default theme;