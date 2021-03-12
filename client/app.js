import React from 'react';

import Navbar from './components/Navbar';
import Routes from './routes';

import CssBaseline from '@material-ui/core/CssBaseline';
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#F5F5F5',
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
