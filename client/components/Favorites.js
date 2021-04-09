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

const Favorites = (props) => {
  const { favorites } = props;

  return (
    <>
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
                      <TableCell align="left" key={id}>
                        <a
                          href="https://www.google.com/search?q=google&rlz=1C5CHFA_enUS787US787&sxsrf=ALeKk03emDt_mc6aqQc_kTjCA7PcVZnIxA%3A1617935407322&ei=L7xvYNKYE9Kl5NoP4biH6As&oq=google&gs_lcp=Cgdnd3Mtd2l6EAMyBAgjECcyBAgjECcyBAgjECcyDQgAEIcCELEDEIMBEBQyCggAELEDEIMBEEMyBQgAEJECMgYIABAKEEMyBQgAEJECMgcIABCxAxBDMgcIABCxAxBDOgcIABBHELADOggIABCxAxCDAToFCAAQsQM6BAgAEENQ6PYQWOb7EGCc_RBoA3ACeACAAVmIAaIEkgEBN5gBAKABAaoBB2d3cy13aXrIAQjAAQE&sclient=gws-wiz&ved=0ahUKEwiS7OOJj_DvAhXSElkFHWHcAb0Q4dUDCA0&uact=5"
                          target="_blank"
                        >
                          {favorite.restaurant.restaurant_name}
                        </a>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    favorites: state.favorites.favorites,
  };
};

const mapDispatch = {
  getFavorites,
};
export default connect(mapState, mapDispatch)(Favorites);
