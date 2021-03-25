import React from 'react';
// import { connect } from 'react-redux';
import Galaga from './Galaga';

import PhaserGame from './PhaserGame';

class PhaserGameStart extends React.Component {
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
      case 'cake':
        return (
          <div>
            <h2>Cake Game:</h2>
            <p>You'll have 45 seconds to collect cakes falling from the sky</p>
            <p>Use your left and right arrow keys to navigate</p>
            <p>The more cakes you collect, the more points you get</p>
            <p>
              But beware! You'll lose points if you collect the fishbones or
              trashcans
            </p>
            {this.state.gameStarted ? (
              <PhaserGame />
            ) : (
              <button onClick={this.handleClick}>Start Game</button>
            )}
          </div>
        );
      case 'galaga':
        return (
          <div>
            <h2>Galaga Game:</h2>
            <p>Shoot out all the food before they reach you!</p>
            <p>Use your left and right arrow keys to navigate</p>
            <p>Use your up arrow key to shoot</p>
            {this.state.gameStarted ? (
              <Galaga />
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

export default PhaserGameStart;
