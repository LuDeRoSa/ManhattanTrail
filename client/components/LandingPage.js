import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

/**
 * COMPONENT
 */
export const LandingPage = (props) => {
  const { username } = props;

  return (
    <div>
      <h3>Welcome , {username}</h3>
      <h2>In the future, category options might be here</h2>
      <Link to="/home">Begin Game</Link>
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

export default connect(mapState)(LandingPage);
