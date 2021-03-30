import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateMiniGameScore, updateLastStagePlayed } from '../store/game';

import canvas from 'canvas';

class CakeGameAnimation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { angle: 0 };
    this.updateAnimationState = this.updateAnimationState.bind(this);
  }

  componentDidMount() {
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  }

  updateAnimationState() {
    this.setState(prevState => ({ angle: prevState.angle + 1 }));
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rAF);
  }

  render() {
    return <Canvas angle={this.state.angle} />;
  }
}