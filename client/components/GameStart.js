import React from 'react';
import SnakeGame from './SnakeApp/SnakeGame';
import FlappyCake from './FlappyCake';
import SortFruits from '../components/SortFruitsGame/SortFruits';
import Hangman from './HangmanGame/Hangman';
import Quiz from './Quiz';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Paper from '@material-ui/core/Paper';
import { fetchMiniGameComplete } from '../store/game';
import { connect } from 'react-redux';

const Start = (props) =>
  props.mini_status === 'finished' ? (
    'Mini Game finished - please hit Continue button above!'
  ) : (
    <Box m={2}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<PlayArrowIcon />}
        onClick={props.handleClick}
      >
        Start Game
      </Button>
    </Box>
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
          <Paper variant="outlined" square>
            <center>
              <h2>Feed the (Hungry Hungry) Snake</h2>
              {this.state.gameStarted ? <SnakeGame /> : start}
            </center>
          </Paper>
        );
      case 'flappy':
        return (
          <Paper variant="outlined" square>
            <center>
              <h2>Catch the Cakes</h2>
              {this.state.gameStarted ? <FlappyCake /> : start}
            </center>
          </Paper>
        );
      case 'hangman':
        return (
          <Paper variant="outlined" square>
            <center>
              <h2>Save the Hangman</h2>
              {this.state.gameStarted ? <Hangman /> : start}
            </center>
          </Paper>
        );
      case 'quiz':
        return (
          <Paper variant="outlined" square>
            <center>
              <h2>Test Your Knowledge</h2>
              {this.state.gameStarted ? <Quiz /> : start}
            </center>
          </Paper>
        );
      case 'sortfruits':
        return (
          <Paper variant="outlined" square>
            <center>
              <h2>Sort the Foods</h2>
              {this.state.gameStarted ? <SortFruits /> : start}
            </center>
          </Paper>
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
