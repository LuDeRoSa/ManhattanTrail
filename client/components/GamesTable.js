import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  root: {},
  Table: {
    minWidth: 340,
    height: 100,
    overflowY: 'auto',
  },
  Cell: {
    paddingRight: 4,
    paddingLeft: 5,
  },
}));

export default function GamesTable(props) {
  const classes = useStyles();
  let { data, pastgames } = props;
  return (
    <Container>
      <Paper variant="elevation" elevation={1}>
        <TableContainer>
          <Table
            stickyHeader
            className={classes.Table}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                {!pastgames && (
                  <TableCell align="left" className={classes.Cell}>
                    <b>Username</b>
                  </TableCell>
                )}

                <TableCell align="left" className={classes.Cell}>
                  <b>Date Played</b>
                </TableCell>
                <TableCell align="left" className={classes.Cell}>
                  <b>Path Taken</b>
                </TableCell>
                <TableCell align="left" className={classes.Cell}>
                  <b>Score</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((game) => (
                <TableRow key={game.id}>
                  {!pastgames && (
                    <TableCell align="left" className={classes.Cell}>
                      {game.user.username}
                    </TableCell>
                  )}
                  <TableCell align="left" className={classes.Cell}>
                    {game.updatedAt}
                  </TableCell>
                  <TableCell className={classes.Cell}>
                    {game.path_name}
                  </TableCell>
                  <TableCell align="left" className={classes.Cell}>
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
