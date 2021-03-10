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
      <h4>In the future, category options might be here</h4>
      <h4>
        Some information could be displayed here whether a user currently has a
        game in progress
      </h4>
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
