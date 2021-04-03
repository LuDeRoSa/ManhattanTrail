import React from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../store';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const {
    name,
    displayName,
    handleSubmit,
    error,
    autocomplete_attribute,
  } = props;

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '30vh' }}
    >
      <Paper
        variant="elevation"
        elevation={24}
        style={{ margin: '3rem', padding: '3rem' }}
      >
        <FormControl color="primary">
          <form onSubmit={handleSubmit} name={name}>
            <div>
              <label htmlFor="email">
                <small>Email</small>
              </label>
              <input name="email" type="text" autoComplete="email" />
            </div>
            <br />
            <div>
              <label htmlFor="password">
                <small>Password</small>
              </label>
              <input
                name="password"
                type="password"
                autoComplete={autocomplete_attribute}
              />
            </div>
            <br />
            <center>
              <button type="submit">{displayName}</button>
            </center>
            {error && error.response && <div> {error.response.data} </div>}
          </form>
          <div className="login-link">
            {window.githubURL && (
              <a href={window.githubURL}>Login / Register Via Github </a>
            )}
          </div>
        </FormControl>
      </Paper>
    </Grid>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    autocomplete_attribute: 'new-password',
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    autocomplete_attribute: 'current-password',
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(authenticate(email, password, formName));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
