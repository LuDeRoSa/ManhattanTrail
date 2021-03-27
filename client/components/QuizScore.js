import React, { Component } from 'react';
import { connect } from 'react-redux';

class QuizScore extends Component {
  render() {
    return <div>{this.props.points}</div>;
  }
}

export default connect((state) => state)(QuizScore);
