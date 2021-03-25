import React from 'react';
import { connect } from 'react-redux';

import Map from './Map';

import { setRests } from '../store/rest';
import { nextStage } from '../store/game';
import { setGame } from '../store/game';

import PhaserGameStart from './PhaserGameStart';

/**
 * COMPONENT
 */
import Quiz from './Quiz';
import Grid from '@material-ui/core/Grid';
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
};

export const Home = (props) => {
  const { username } = props;
  const game_type =
    props.rests.length > 0
      ? props.rests[props.game.gameStage - 1].game_type
      : '';
  //TODO: move game_type into store
  return (
    <div>
      <center>
        <h3>Welcome , {username}</h3>
      </center>
      <Grid
        container
        spacing={3}
        direction='row'
        alignItems='center'
        justify='center'
      >
        <Grid item lg={1} md={1} sm={false} xs={false} />
        <Grid item lg={3} md={3} sm={10} xs={12} style={{ height: '50vh' }}>
          <Map />
        </Grid>
        <Grid item lg={1} md={1} sm={false} xs={false} />

        <Grid item lg={5} md={5} sm={10} xs={12}>
          {
            {
              quiz: <Quiz />,
              cake: <PhaserGameStart game_type={'cake'} />,
              galaga: <PhaserGameStart game_type={'galaga'} />,
            }[game_type]
          }
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
