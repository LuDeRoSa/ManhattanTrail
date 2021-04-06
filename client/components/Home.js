import React from 'react';
import { connect } from 'react-redux';
import Map from './Map';
import { setRests } from '../store/rest';
import { nextStage } from '../store/game';
import { setGame } from '../store/game';
import GameStart from './GameStart';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

export const Home = (props) => {
  const game_type =
    props.rests.length > 0
      ? props.rests[props.game.gameStage - 1].game_type
      : '';
  return (
    <div>
      <center>
        <h3>Welcome, {props.username}</h3>

        <Button
          variant="contained"
          color="primary"
          disabled={props.game.mini_status !== 'finished'}
          endIcon={<NavigateNextIcon />}
          onClick={props.nextStage}
        >
          Move to Next Stage
        </Button>
      </center>
      <Grid
        container
        spacing={3}
        direction="row"
        alignItems="center"
        justify="center"
        style={{ height: '90vh' }}
      >
        <Grid item lg={1} md={1} sm={false} xs={false} />
        <Grid item lg={4} md={4} sm={10} xs={12} style={{ height: '70vh' }}>
          <Map />
        </Grid>
        <Grid item lg={1} md={1} sm={false} xs={false} />
        <Grid item lg={4} md={4} sm={10} xs={12}>
          <GameStart game_type={game_type} />
        </Grid>
      </Grid>
    </div>
  );
};
/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
    userId: state.auth.id,
    rests: state.rest.rests,
    game: state.game,
  };
};
const mapDispatch = {
  setRests,
  nextStage,
  setGame,
};
export default connect(mapState, mapDispatch)(Home);
