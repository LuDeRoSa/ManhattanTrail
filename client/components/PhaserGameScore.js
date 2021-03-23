import React, { Component } from 'react';
import { connect } from 'react-redux';


class PhaserGameScore extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    debugger;
    return <div>hi you have this many points! {this.props.points}</div>;
  }
}

export default connect((state) => state)(PhaserGameScore);