import React from 'react';
// import { connect } from 'react-redux';
//
import SnakeGame from './SnakeGame';
import FlappyCake from './FlappyCake';
import Hangman from './HangmanGame/Hangman';
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

  handleClick() {
    this.setState({ gameStarted: true });
  }

  render() {
    switch (this.props.game_type) {
      case 'snake':
        return (
          <Paper elevation={10}>
            <h2>Snake Game:</h2>
            <p>Snake game default text to be edited</p>
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
      default:
        return <></>;
    }
  }
}

export default GameStart;
