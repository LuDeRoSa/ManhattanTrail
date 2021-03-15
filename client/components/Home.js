import React from 'react';
import { connect } from 'react-redux';

import Map from './Map';

import PhaserGame from './PhaserGame';
/**
 * COMPONENT
 */
import Quiz from './Quiz';
import Container from '@material-ui/core/Container';
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

  return (
    <div>

      <center>
        <h3>Welcome , {username}</h3>
      </center>
      <Container style={styles.container}>
        <Grid
          container
          spacing={0}
          direction="row"
          alignItems="center"
          justify="center"
        >
          <Grid item lg={6} md={6} sm={12} xs={12} style={{ height: '50vh' }}>
            <Map />
            <PhaserGame />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Quiz />
          </Grid>
        </Grid>
      </Container>

    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
    rest: state.rest,
    game: state.game,
  };
};

export default connect(mapState)(Home);
