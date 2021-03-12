import React from 'react';
import { connect } from 'react-redux';

import Map from './Map';
import PhaserGame from './PhaserGame';
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
        <PhaserGame />
      </div>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
