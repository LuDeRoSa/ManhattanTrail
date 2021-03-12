import React from 'react';
import { connect } from 'react-redux';

import Map from './Map';

import Container from '@material-ui/core/Container';

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
      <h3>Welcome , {username}</h3>
      <Container style={styles.container}>
        <div className="map" style={{ width: '50%', height: '50vh' }}>
          <Map />
        </div>
        <div>This will be the game container</div>
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
