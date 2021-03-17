import React, { Component } from "react";
import { connect } from "react-redux";

class GlobalScore extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <div>{this.props.points}</div>;
  }
}

export default connect((state) => state)(GlobalScore);

//add miniscore inside quiz

// i should be able grab from the state.points,
