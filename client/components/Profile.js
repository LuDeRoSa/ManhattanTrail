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

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getFavorites();
  }

  render() {
    const { account, favorites } = this.props;
    return (
      <>
        <h2>Welcome, {account.username}! Here are your account details:</h2>
        <Grid
          container
          spacing={1}
          direction="row"
          alignItems="center"
          justify="space-around"
        >
          <Grid item>
            <Container id="account_container" style={{ width: 450 }}>
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
          <Grid item>
            <Container id="account_container" style={{ width: 450 }}>
              <Paper variant="elevation" elevation={1}>
                <TableContainer>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">
                          <b>Favorited Restaraunts</b>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {favorites.map((favorite, id) => {
                        return (
                          <TableRow key={IDBObjectStore}>
                            <a
                              href="https://www.google.com/search?q=google&rlz=1C5CHFA_enUS787US787&sxsrf=ALeKk03emDt_mc6aqQc_kTjCA7PcVZnIxA%3A1617935407322&ei=L7xvYNKYE9Kl5NoP4biH6As&oq=google&gs_lcp=Cgdnd3Mtd2l6EAMyBAgjECcyBAgjECcyBAgjECcyDQgAEIcCELEDEIMBEBQyCggAELEDEIMBEEMyBQgAEJECMgYIABAKEEMyBQgAEJECMgcIABCxAxBDMgcIABCxAxBDOgcIABBHELADOggIABCxAxCDAToFCAAQsQM6BAgAEENQ6PYQWOb7EGCc_RBoA3ACeACAAVmIAaIEkgEBN5gBAKABAaoBB2d3cy13aXrIAQjAAQE&sclient=gws-wiz&ved=0ahUKEwiS7OOJj_DvAhXSElkFHWHcAb0Q4dUDCA0&uact=5"
                              target="_blank"
                            >
                              <TableCell align="left" key={id}>
                                {favorite.restaurant.restaurant_name}
                              </TableCell>
                            </a>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Container>
            {/* <h2>Favorited Restaraunts</h2>
            <ul>
              {favorites.map((favorite) => (
                <a
                  href='https://www.google.com/search?q=google&rlz=1C5CHFA_enUS787US787&sxsrf=ALeKk03emDt_mc6aqQc_kTjCA7PcVZnIxA%3A1617935407322&ei=L7xvYNKYE9Kl5NoP4biH6As&oq=google&gs_lcp=Cgdnd3Mtd2l6EAMyBAgjECcyBAgjECcyBAgjECcyDQgAEIcCELEDEIMBEBQyCggAELEDEIMBEEMyBQgAEJECMgYIABAKEEMyBQgAEJECMgcIABCxAxBDMgcIABCxAxBDOgcIABBHELADOggIABCxAxCDAToFCAAQsQM6BAgAEENQ6PYQWOb7EGCc_RBoA3ACeACAAVmIAaIEkgEBN5gBAKABAaoBB2d3cy13aXrIAQjAAQE&sclient=gws-wiz&ved=0ahUKEwiS7OOJj_DvAhXSElkFHWHcAb0Q4dUDCA0&uact=5'
                  target='_blank'
                >
                  <li key={favorite.id}>
                    {favorite.restaurant.restaurant_name}
                  </li>
                </a>
              ))}
            </ul> */}
          </Grid>
          <Grid item>
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
