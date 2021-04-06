import React from 'react';

import Navbar from './components/Navbar';
import Routes from './routes';

import CssBaseline from '@material-ui/core/CssBaseline';
import {
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import amber from '@material-ui/core/colors/amber';
import orange from '@material-ui/core/colors/orange';
import createPalette from '@material-ui/core/styles/createPalette';
import createTypography from '@material-ui/core/styles/createTypography';

const theme = createMuiTheme({
  palette: {
    background: {
      default: 'white',
    },
    primary: {
      main: teal[500],
    },
    secondary: {
      main: amber[400],
    },
    typography: createTypography(createPalette({}), {
      fontFamily: 'Helvetica'
    }),
  },
});

const App = () => {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
       <CssBaseline />
        <Navbar />
        <Routes />
      </ThemeProvider>
    </React.Fragment>
  );
};

export default App;
