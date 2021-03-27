import React, { Component } from 'react';
import { connect } from 'react-redux';

const GlobalScore = (props) => (
  <div>
    <div className="scores-box">Current Score: {props.total_score}</div>
  </div>
);

const mapState = (state) => {
  return {
    total_score: state.game.total_score,
  };
};

export default connect(mapState)(GlobalScore);
