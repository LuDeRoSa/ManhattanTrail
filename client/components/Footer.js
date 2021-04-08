import React from 'react';
import { connect } from 'react-redux';

import { makeStyles, createStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';

function Footer() {
  return (
    <footer>
      <center>Made with ♥ by Luderosa</center>
    </footer>
  );
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = {};

export default connect(mapState, mapDispatch)(Footer);
