import React, { Component } from 'react';
import { connect } from 'react-redux';


class PhaserGameScore extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    // return <div>{this.props.points}</div>;
    return <div>hihi</div>
  }
}

export default connect((state) => state)(PhaserGameScore);
