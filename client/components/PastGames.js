import React from 'react';
import { connect } from 'react-redux';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import { fetchPastGames } from '../store/pastgames';

class PastGames extends React.Component {
  componentDidMount() {
    this.props.fetchPastGames();
  }
  render() {
    const styles = {
      Table: {
        minWidth: 650,
        height: 200,
        overflowY: 'auto',
      },
      Row: {},
      Cell: {
        width: 130,
      },
    };
    console.log(this.props);
    let { pastgames } = this.props;
    return (
      <Container>
        <Paper variant="elevation" elevation={24}>
          <TableContainer>
            <Table stickyHeader style={styles.Table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Game ID</TableCell>
                  <TableCell align="left">Date</TableCell>
                  <TableCell align="left">Path taken</TableCell>
                  <TableCell align="right">Score</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pastgames.map((game) => (
                  <TableRow key={game.id}>
                    <TableCell align="left">{game.id}</TableCell>
                    <TableCell align="left">{game.updatedAt}</TableCell>
                    <TableCell component="th" scope="row">
                      {game.pathId}
                    </TableCell>
                    <TableCell align="right">
                      {game.score.total_score}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    );
  }
} //end class

const mapState = (state) => {
  return {
    pastgames: state.pastgames.pastgames,
  };
};

const mapDispatch = {
  fetchPastGames,
};

export default connect(mapState, mapDispatch)(PastGames);
