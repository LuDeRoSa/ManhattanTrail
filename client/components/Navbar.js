import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

import linksList from '../LinksList';

import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import GlobalScore from './GlobalScore';

import SideMenu from './SideMenu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: '1rem',
  },
  title: {
    flexGrow: 1,
    fontSize: '1.4rem',
  },
  button: {
    textTransform: 'none',
    fontWeight: 550,
    textDecoration: 'none',
    color: theme.palette.secondary.main,
    '&:hover': {
      textDecoration: 'none',
      color: theme.palette.secondary.dark,
      backgroundColor: theme.palette.primary.main,
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
    },
  },
}));

const Navbar = ({ handleClick, isLoggedIn }) => {
  const classes = useStyles();
  return (
    <div>
      <nav>
        <div className={classes.root}>
          <AppBar position="static" className={classes.palette}>
            <Hidden smDown>
              <Toolbar>
                <Typography variant="h4" className={classes.title}>
                  MANHATTAN TRAIL
                </Typography>
                {isLoggedIn ? (
                  <div>
                    <GlobalScore />
                    {linksList.map((link) => (
                      <Button
                        key={link.text}
                        className={classes.button}
                        startIcon={link.icon}
                        component={Link}
                        to={link.path}
                      >
                        {link.text}
                      </Button>
                    ))}
                    {/* Logout button */}
                    <Button
                      startIcon={<ExitToAppIcon />}
                      className={classes.button}
                      onClick={handleClick}
                      component={Link}
                      to="/#"
                    >
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Button component={Link} to="/login">
                      Login
                    </Button>
                    <Button component={Link} to="/signup">
                      Sign Up
                    </Button>
                  </div>
                )}
              </Toolbar>
            </Hidden>
            <Hidden mdUp>
              <Toolbar>
                <Typography variant="h5" className={classes.title}>
                  MANHATTAN TRAIL
                </Typography>
                {isLoggedIn && <GlobalScore />}
                <SideMenu handleClick={handleClick} isLoggedIn={isLoggedIn} />
              </Toolbar>
            </Hidden>
          </AppBar>
        </div>
      </nav>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
