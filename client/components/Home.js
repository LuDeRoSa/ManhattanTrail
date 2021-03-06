import React from 'react';
import { connect } from 'react-redux';

import MapWrapped from './Map';
/**
 * COMPONENT
 */
export const Home = (props) => {
  const { username } = props;

  return (
    <div>
      <h3>Welcome , {username}</h3>
      <div style={{ width: '50vw', height: '50vh' }}>
        <MapWrapped
        // googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${"AIzaSyCnNLEaNM_3zfMo0yHe - nINMSUPPfyJwUI"}`}
        // loadingElement={<div style={{ height: `100%` }} />}
        // containerElement={<div style={{ height: `100%` }} />}
        // mapElement={<div style={{ height: `100%` }} />}
        />
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
