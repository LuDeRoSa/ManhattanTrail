import React from 'react';

import Navbar from './components/Navbar';
import Routes from './routes';

import CssBaseline from '@material-ui/core/CssBaseline';
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
const theme = createMuiTheme({
  palette: {
    background: {
      default: '#F5F5F5',
    },
    primary: {
      // main: purple[500],
      main: '#115293'
    },
    secondary: {
      // main: green[500],
      main: '#e57373',
    },
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
