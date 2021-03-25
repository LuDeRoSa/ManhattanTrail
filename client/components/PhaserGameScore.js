import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateMiniGameScore } from '../store/game.js';
class PhaserGameScore extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.game.score !== this.props.game.score) {
      this.props.updateMiniGameScore(this.props.game.score);
    }
  }
  render() {
    return <div>MiniGame points to be submitted: {this.props.game.score}</div>;
  }
}

const mapDispatch = {
  updateMiniGameScore,
};
// function mapDispatchToProps(dispatch) {
//   return {
//     updatePhaserGameScore: (points) => dispatch(updateMiniGameScore(points)),
//   };
// }
export default connect((state) => state, mapDispatch)(PhaserGameScore);
