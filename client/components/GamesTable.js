import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

export default function GamesTable(props) {
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
  let { data } = props;
  return (
    <Container>
      <Paper variant='elevation' elevation={24}>
        <TableContainer>
          <Table stickyHeader style={styles.Table} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='left'>Username</TableCell>
                <TableCell align='left'>Game ID</TableCell>
                <TableCell align='left'>Date</TableCell>
                <TableCell align='left'>Path taken</TableCell>
                <TableCell align='right'>Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((game) => (
                <TableRow key={game.id}>
                  <TableCell align='left'>{game.user.username}</TableCell>
                  <TableCell align='left'>{game.id}</TableCell>
                  <TableCell align='left'>{game.updatedAt}</TableCell>
                  <TableCell component='th' scope='row'>
                    {game.path_name}
                  </TableCell>
                  <TableCell align='right'>{game.score.total_score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
}
