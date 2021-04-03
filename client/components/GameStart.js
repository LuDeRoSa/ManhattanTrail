import React from 'react';
// import { connect } from 'react-redux';
//
import SnakeGame from './SnakeGame';
import FlappyCake from './FlappyCake';
import SortFruits from './SortFruits';
import Hangman from './HangmanGame/Hangman';
import Quiz from './Quiz';
import Button from '@material-ui/core/Button';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Paper from '@material-ui/core/Paper';

const Start = (props) => (
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
  render() {
    switch (this.props.game_type) {
      case 'snake':
        return (
          <Paper elevation={10}>
            <h2>Snake Game:</h2>
            <p>Eat the food but don't hit the walls! The more food you eat, the faster you'll move!</p>
            {this.state.gameStarted ? (
              <SnakeGame />
            ) : (
              <Start handleClick={this.handleClick} />
            )}
          </Paper>
        );
      case 'flappy':
        return (
          <Paper elevation={10}>
            <h2>FlappyCake Game:</h2>
            <p>Press spacebar, up, or click to raise Penguin to catch cakes</p>
            {this.state.gameStarted ? (
              <FlappyCake />
            ) : (
              <Start handleClick={this.handleClick} />
            )}
          </Paper>
        );
      case 'hangman':
        return (
          <Paper elevation={10}>
            <h2>Hangman Game:</h2>
            <p>Game The Food Category</p>
            {this.state.gameStarted ? (
              <Hangman />
            ) : (
              <Start handleClick={this.handleClick} />
            )}
          </Paper>
        );
      case 'quiz':
        return (
          <Paper elevation={10}>
            <h2>Quiz</h2>
            <p>Answer all the questions!</p>
            {this.state.gameStarted ? (
              <Quiz />
            ) : (
              <Start handleClick={this.handleClick} />
            )}
          </Paper>
        );
      case 'sortfruits':
        return (
            <div>
              <h2>SortFruits Game:</h2>
              <p>Do some cool drag and dropping</p>
              {this.state.gameStarted ? (
                  <SortFruits />
              ) : (
                  <button onClick={this.handleClick}>Start Game</button>
              )}
            </div>
        );
      default:
        return <></>;
    }
  }
}
export default GameStart;