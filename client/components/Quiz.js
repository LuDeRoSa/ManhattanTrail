import React from 'react';
import { connect } from 'react-redux';
 import {fetchQuiz} from "../store/quiz";


export const Quiz = (props) => {

  const quiz = props.quiz;
  console.log("this is the quiz props",quiz);


  return (
    <div>
      <p>testing the quiz component</p>
      <button onClick={props.getQuiz}>Testing Quiz</button>
    </div>
  );



};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    quiz: state.quiz
  };
};

const mapDispatch = (dispatch) => {
  return {
    getQuiz: () => dispatch(fetchQuiz())
  };
};


export default connect(mapState, mapDispatch)(Quiz);
