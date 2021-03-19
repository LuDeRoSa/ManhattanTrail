import React from 'react';
import { connect } from 'react-redux';
import { fetchQuiz, updateQuiz } from '../store/quiz';
import SingleQuestion from './SingleQuestion';

class Quiz extends React.Component {
  constructor(props) {
    super(props);
  }

  //1
  componentDidMount() {
    this.props.fetchQuiz(1);
    // console.log(this.props.game.gameStage - 1);
  }

  componentDidUpdate() {
    //responsive to restaurant id  - COME BACK
  }

  render() {
    return (
      <div>
        <h2>QUIZ</h2>
        {this.props.quiz.questions &&
          this.props.quiz.questions.length > 0 &&
          this.props.quiz.questions.map((question) => (
            <SingleQuestion key={question.id} question={question} />
          ))}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    quiz: state.quiz,
    rests: state.rest.rests,
    restaurantId: state.rest.rests[state.game.gameStage - 1] || 0,
  };
};

const mapDispatch = {
  fetchQuiz,
};

export default connect(mapState, mapDispatch)(Quiz);
