import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateMiniGameScore } from '../store/game.js';
class PhaserGameScore extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.mini_score !== this.props.mini_score) {
      this.props.updateMiniGameScore(this.props.mini_score);
    }
  }
  render() {
    return <div>MiniGame points to be submitted: {this.props.mini_score}</div>;
  }
}

const mapState = (state) => {
  return {
    mini_score: state.game.mini_score,
  };
};
const mapDispatch = {
  updateMiniGameScore,
};

export default connect(mapState, mapDispatch)(PhaserGameScore);
