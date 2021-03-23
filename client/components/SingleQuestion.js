import React from 'react';
import { connect } from 'react-redux';
import { updateQuiz } from '../store/quiz.js';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

//handle submit inside the single question
//that will just send a score of 1 or 0 to the question
// handle change for whatever the user clicks
// conditional logic - once a user has submitted, they can't change their mind. - disable the components

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles, StylesProvider } from '@material-ui/core/styles';

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
