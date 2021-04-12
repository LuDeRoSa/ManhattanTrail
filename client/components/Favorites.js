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
      <Container id="account_container">
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
                {favorites.map((favorite) => {
                  const query = favorite.restaurant.restaurant_name
                    .split(' ')
                    .join('+');
                  const searchGoogle = `https://www.google.com/search?q=${query}`;
                  return (
                    <TableRow key={favorite.restaurant.restaurant_name}>
                      <TableCell align="left">
                        <a href={searchGoogle} target="_blank">
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
