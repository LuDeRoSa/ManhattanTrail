import React from 'react';
import { connect } from 'react-redux';
import PastGames from './PastGames';
import { getFavorites } from '../store/favorites';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Favorites from './Favorites';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

class Profile extends React.Component {
  componentDidMount() {
    this.props.getFavorites();
  }

  render() {
    const { account, favorites } = this.props;
    return (
      <>
        <center>
          <Typography variant="h4">
            Welcome, {account.username}! Here are your account details:
          </Typography>
        </center>

        <Grid
          container
          spacing={1}
          direction="row"
          alignItems="center"
          justify="space-around"
        >
          <Grid item xs={12} sm={6} lg={4}>
            <Container id="account_container">
              <Paper variant="elevation" elevation={1}>
                <TableContainer>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">
                          <b>Credentials</b>
                        </TableCell>
                        <TableCell align="left">
                          <b>Information</b>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.keys(account)
                        .filter(
                          (key) =>
                            key !== 'password' &&
                            key !== 'id' &&
                            key !== 'updatedAt'
                        )
                        .map((key, idx) => {
                          return (
                            <TableRow key={idx}>
                              <TableCell align="left">{key}</TableCell>
                              <TableCell align="left">{account[key]}</TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Container>
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <Favorites />
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <h2>Game History</h2>
            <PastGames />
          </Grid>
        </Grid>
      </>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    account: state.auth,
    favorites: state.favorites.favorites,
  };
};

const mapDispatch = {
  getFavorites,
};
export default connect(mapState, mapDispatch)(Profile);
