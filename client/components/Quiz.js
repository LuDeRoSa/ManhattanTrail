import React from 'react';
import { connect } from 'react-redux';
import { fetchQuiz, updateQuiz } from '../store/quiz';
import SingleQuestion from './SingleQuestion';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles, StylesProvider } from '@material-ui/core/styles';

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      points: 0,
      played: false,
      value: ``,
      status: '',
      currentQuestion: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(ev) {
    this.setState({
      value: ev.target.value,
    });
  }

  /// send the changes to our database/backend
  handleSubmit(ev) {
    ev.preventDefault();
    if (this.state.currentQuestion < this.props.quiz.questions.length - 1) {
      this.setState({
        currentQuestion: this.state.currentQuestion + 1,
      });
    }

    let userResponse = this.state.value;
    // console.log('userResponse', userResponse);
    const correctAnswer = this.props.quiz.questions[
      this.state.currentQuestion
    ].answers.find((answer) => answer.isCorrect).answer;
    const points = userResponse === correctAnswer ? 1 : 0;
    this.setState({
      played: true,
      points,
      status: points > 0 ? 'correct' : 'wrong',
    });
    this.props.updateQuiz(points);
  }

  componentDidMount() {
    this.props.fetchQuiz(1);
    // console.log(this.props.game.gameStage - 1);
  }

  componentDidUpdate() {
    //responsive to restaurant id  - COME BACK
  }

  render() {
    const { currentQuestion } = this.state;
    return (
      <div className={this.state.status}>
        <h2>QUIZ</h2>
        <div id='quiz'>
          <form id='quiz-form' onSubmit={this.handleSubmit}>
            <FormControl id='form-control' component='fieldset'>
              {this.props.quiz.questions &&
                this.props.quiz.questions.length > 0 && (
                  <div id='question'>
                    <SingleQuestion
                      questions={this.props.quiz.questions[currentQuestion]}
                    />
                    <div id='answer'>
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
                              id='form-label'
                            />
                          </RadioGroup>
                        )
                      )}
                    </div>
                  </div>
                )}
            </FormControl>
            <input type='submit' value='Submit' />
          </form>
        </div>
        <div id='points'>
          {this.state.played === true && (
            <div id='score'> Points: {this.state.points} </div>
          )}
        </div>
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

const mapDispatch = (dispatch) => {
  return {
    fetchQuiz: (num) => dispatch(fetchQuiz(num)),
    updateQuiz: (points) => dispatch(updateQuiz(points)),
  };
};

export default connect(mapState, mapDispatch)(Quiz);
