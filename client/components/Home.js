import React from 'react';
import { connect } from 'react-redux';

import Map from './Map';
/**
 * COMPONENT
 */
export const Home = (props) => {
  const { username } = props;

  return (
    <div>
      <h3>Welcome , {username}</h3>
      <div style={{ width: '50vw', height: '50vh' }}>
        <Map />
      </div>
      {/* <div>This will be the game container</div> */}
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
