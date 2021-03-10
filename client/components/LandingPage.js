import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setGame } from '../store/game';
/**
 * COMPONENT
 */
export class LandingPage extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.setGame(this.props.userId);
  }
  render() {
    const { username } = this.props;

    return (
      <div>
        <h3>Welcome , {username}</h3>
        <h4>In the future, category options might be here</h4>
        <h4>
          Some information could be displayed here whether a user currently has
          a game in progress
        </h4>
        <Link to="/home">Begin Game</Link>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    userId: state.auth.id,
    username: state.auth.username,
  };
};
const mapDispatch = {
  setGame,
};

export default connect(mapState, mapDispatch)(LandingPage);
