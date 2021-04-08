import React from 'react';
import { connect } from 'react-redux';
import { fetchQuiz } from '../store/quiz';
import { updateMiniGameScore, updateMiniScore } from '../store/game';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import './Style/Quiz.css';

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      points: 0,
      played: false,
      value: ``,
      status: '',
      currentQuestion: 0,
      finished: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.props.fetchQuiz(this.props.restaurantId);
  }

  handleChange(ev) {
    this.setState({
      value: ev.target.value,
    });
  }
  /// send the changes to our database/backend
  handleSubmit(ev) {
    ev.preventDefault();
    let finished = false;
    if (this.state.currentQuestion < this.props.quiz.questions.length - 1) {
      this.setState((state) => {
        return {
          currentQuestion: state.currentQuestion + 1,
        };
      });
    } else {
      finished = true;
      this.setState({
        finished: true,
      });
    }
    let userResponse = this.state.value;
    const correctAnswer = this.props.quiz.questions[
      this.state.currentQuestion
    ].answers.find((answer) => answer.isCorrect).answer;
    const points = userResponse === correctAnswer ? 1 : 0;
    this.setState({
      played: true,
      points,
      status: points > 0 ? 'correct' : 'wrong',
    });
    this.props.updateMiniScore(points);
    if (finished) {
      this.props.updateMiniGameScore(this.props.game.mini_score);
    }
  }
  render() {
    const { currentQuestion } = this.state;
    if (this.state.finished) {
      return (
        <>
          <p>And that's a wrap...</p>
          <p>You answered {this.props.game.mini_score} questions correctly </p>
        </>
      );
    }
    if (!this.props.quiz.questions) {
      return <div>loading</div>;
    }
    return (
      <div className={this.state.status}>
        <div id="instructions">
          Earn points by answering the questions correctly
        </div>
        <div id="quiz">
          <form id="quiz-form" onSubmit={this.handleSubmit}>
            <FormControl id="form-control" component="fieldset">
              {this.props.quiz.questions &&
                this.props.quiz.questions.length > 0 && (
                  <div id="question">
                    <h3>
                      Question {this.state.currentQuestion + 1}/
                      {this.props.quiz.questions.length}:{' '}
                      {this.props.quiz.questions[currentQuestion].question}
                    </h3>
                    <div id="answer">
                      <Box ml={1} mb={2}>
                        {this.props.quiz.questions[currentQuestion].answers.map(
                          (answerObj, index) => (
                            <RadioGroup
                              key={index}
                              value={this.state.value}
                              onChange={this.handleChange}
                              disabled={this.state.played}
                              inputprops={{ 'aria-label': 'Radio A' }}
                            >
                              <FormControlLabel
                                control={<Radio />}
                                value={answerObj.answer}
                                key={index}
                                label={answerObj.answer}
                                id="form-label"
                              />
                            </RadioGroup>
                          )
                        )}
                      </Box>
                    </div>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleSubmit}
                      // disable={this.state.quizCount > 3 ? true : false}
                    >
                      Submit{' '}
                    </Button>
                  </div>
                )}
            </FormControl>
          </form>
        </div>
      </div>
    );
  }
}
const mapState = (state) => {
  return {
    quiz: state.quiz,
    rests: state.rest.rests,
    restaurantId: state.rest.rests[state.game.gameStage - 1].id || 0,
    game: state.game,
  };
};
const mapDispatch = {
  fetchQuiz,
  updateMiniScore,
  updateMiniGameScore,
};
export default connect(mapState, mapDispatch)(Quiz);
