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
      minWidth: 600,
      height: 100,
      overflowY: 'auto',
    },
    Row: {},
    Cell: {
      width: 100,
    },
  };
  let { data } = props;
  return (
    <Container style={{ width: 700 }}>
      <Paper variant="elevation" elevation={1}>
        <TableContainer>
          <Table stickyHeader style={styles.Table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left"><b>Date Played</b></TableCell>
                <TableCell align="left"><b>Path Taken</b></TableCell>
                <TableCell align="left"><b>Score</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((game) => (
                <TableRow key={game.id}>
                  <TableCell align="left">{game.updatedAt}</TableCell>
                  <TableCell component="th" scope="row">
                    {game.path_name}
                  </TableCell>
                  <TableCell align="left">{game.score.total_score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
}
