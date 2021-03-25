import React, { Component } from 'react';
import { connect } from 'react-redux';

class GlobalScore extends Component {
  render() {
    return (
      <div>
        <div className="scores-box">
          Current Score: {this.props.total_score}
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    total_score: state.game.total_score,
  };
};

const mapDispatch = {};

export default connect(mapState, mapDispatch)(GlobalScore);
