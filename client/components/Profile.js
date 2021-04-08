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
      <div className="account-page">
        <center>
          <h2>Welcome, {account.username}! Here are your account details:</h2>
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

          <h2>Game History</h2>
          <PastGames />
        </center>
      </div>
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
