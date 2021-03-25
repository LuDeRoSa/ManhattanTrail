import React from 'react';
import { connect } from 'react-redux';
import { fetchQuiz } from '../store/quiz';
import { updateMiniGameScore, updateMiniScore } from '../store/game';
import SingleQuestion from './SingleQuestion';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

const styles = {
  button: {
    color: 'white',
  },
};

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
      this.setState({
        currentQuestion: this.state.currentQuestion + 1,
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

  componentDidMount() {
    this.props.fetchQuiz(1);
    // console.log(this.props.game.gameStage - 1);
  }

  componentDidUpdate() {
    //responsive to restaurant id  - COME BACK
  }

  render() {
    const { currentQuestion } = this.state;
    if (this.state.finished) {
      return <>Quiz Done!</>;
    }
    return (
      <div className={this.state.status}>
        <h2>QUIZ</h2>
        <div id="quiz" styles={styles.quiz}>
          <form id="quiz-form" onSubmit={this.handleSubmit}>
            <FormControl id="form-control" component="fieldset">
              {this.props.quiz.questions &&
                this.props.quiz.questions.length > 0 && (
                  <div id="question">
                    <h3>
                      {this.props.quiz.questions[currentQuestion].question}
                    </h3>
                    {/* <SingleQuestion
                      questions={this.props.quiz.questions[currentQuestion]}
                    /> */}
                    <div id="answer">
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
                    </div>
                    <Button
                      variant="outlined"
                      style={styles.button}
                      onClick={this.handleSubmit}
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
    restaurantId: state.rest.rests[state.game.gameStage - 1] || 0,
    game: state.game,
  };
};

const mapDispatch = {
  fetchQuiz,
  updateMiniScore,
  updateMiniGameScore,
};

export default connect(mapState, mapDispatch)(Quiz);
