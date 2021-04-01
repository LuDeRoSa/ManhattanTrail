import React from 'react';
// import { connect } from 'react-redux';
//
import SnakeGame from './SnakeGame';
import FlappyCake from './FlappyCake';
import Hangman from './HangmanGame/Hangman';

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
          <div>
            <h2>Snake Game:</h2>
            <p>Snake game default text to be edited</p>
            {this.state.gameStarted ? (
              <SnakeGame />
            ) : (
              <button onClick={this.handleClick}>Start Game</button>
            )}
          </div>
        );
      case 'flappy':
        return (
          <div>
            <h2>FlappyCake Game:</h2>
            <p>Press spacebar, up, or click to raise Penguin to catch cakes</p>
            {this.state.gameStarted ? (
              <FlappyCake />
            ) : (
              <button onClick={this.handleClick}>Start Game</button>
            )}
          </div>
        );
      case 'hangman':
        return (
          <div>
            <h2>Hangman Game:</h2>
            <p>Game The Food Category</p>
            {this.state.gameStarted ? (
              <Hangman />
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
