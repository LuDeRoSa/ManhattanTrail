import React from 'react';
import { connect } from 'react-redux';
class SingleQuestion extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>{this.props.questions.question}</div>;
  }
}

const mapState = (state) => {
  return {
    state,
  };
};
const mapDispatch = (dispatch) => {
  return {
    updateQuiz: (points) => dispatch(updateQuiz(points)),
  };
};
export default connect(mapState, mapDispatch)(SingleQuestion);
