import React from 'react';
import { connect } from 'react-redux';

import { makeStyles, createStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';

function Footer() {
  return (
    <>
      <Toolbar>Made with ♥ by Luderosa</Toolbar>
    </>
  );
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = {};

export default connect(mapState, mapDispatch)(Footer);
