import React from 'react';
import SnakeGame from './SnakeApp/SnakeGame';
import FlappyCake from './FlappyCake';
import SortFruits from '../components/SortFruitsGame/SortFruits';
import Hangman from './HangmanGame/Hangman';
import Quiz from './Quiz';
import Button from '@material-ui/core/Button';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Paper from '@material-ui/core/Paper';
import { fetchMiniGameComplete } from '../store/game';
import { connect } from 'react-redux';

const Start = (props) =>
  props.mini_status === 'finished' ? (
    ''
  ) : (
    <Button
      variant="contained"
      color="primary"
      startIcon={<PlayArrowIcon />}
      onClick={props.handleClick}
    >
      Start Game
    </Button>
  );

class GameStart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStarted: false,
      miniGameComplete: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.game_type !== this.props.game_type) {
      this.setState({ gameStarted: false });
    }
  }
  handleClick() {
    this.setState({ gameStarted: true });
  }
  componentDidMount() {
    this.props.fetchMiniGameComplete();
  }
  render() {
    const start = (
      <Start
        mini_status={this.props.game.mini_status}
        handleClick={this.handleClick}
      />
    );
    switch (this.props.game_type) {
      case 'snake':
        return (
          <Paper elevation={10}>
            <h2>Snake Game:</h2>
            <p>
              Eat the food but don't hit the walls! The more food you eat, the
              faster you'll move!
            </p>

            {this.state.gameStarted ? <SnakeGame /> : start}
          </Paper>
        );
      case 'flappy':
        return (
          <Paper elevation={10}>
            <h2>FlappyCake Game:</h2>
            <p>Press spacebar, up, or click to raise Penguin to catch cakes</p>

            {this.state.gameStarted ? <FlappyCake /> : start}

          </Paper>
        );
      case 'hangman':
        return (
          <Paper elevation={10}>
            <h2>Hangman Game:</h2>
            <p>Game The Food Category</p>

            {this.state.gameStarted ? <Hangman /> : start}

          </Paper>
        );
      case 'quiz':
        return (
          <Paper elevation={10}>
            <h2>Quiz</h2>
            <p>Answer all the questions!</p>

            {this.state.gameStarted ? <Quiz /> : start}

          </Paper>
        );
      case 'sortfruits':
        return (
          <div>
            <h2>Sort the Foods!</h2>
            <p>
              Drag and drop each food into the "Good" or "Bad" column depending
              on whether it's "good" for the environment or "bad."
              <br />
              When you're done, press the "I'm done!" button.
            </p>

            {this.state.gameStarted ? <SortFruits /> : start}

          </div>
        );
      default:
        return <></>;
    }
  }
}
const mapStateToProps = (state) => {
  return {
    userId: state.auth.id,
    rests: state.rest.rests,
    game: state.game,
  };
};
const mapDispatchToProps = {
  fetchMiniGameComplete,
};
export default connect(mapStateToProps, mapDispatchToProps)(GameStart);
