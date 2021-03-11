import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setGame } from '../store/game';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';

const styles = {
  root: {},
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
};
/**
 * COMPONENT
 */
class GameOver extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  render() {
    const { username } = this.props;
    const { game } = this.props;
    return (
      <Container style={styles.container}>
        <h3>Game Over, {username}!</h3>
        <h4>
          This is the game over screen. Info about the game, score, team message
          will be here
        </h4>

        <div>Put score here</div>
        <ButtonGroup>
          <Button disabled>Play new Game</Button>
          <Button disabled>See scoreboard</Button>
          <Button disabled>See past games</Button>
          <Button disabled>Share with friends</Button>
        </ButtonGroup>

        <p>Path: {game.pathId}</p>
        <p>Stage: {game.gameStage}</p>
        <p>Status: {game.status}</p>
        <div>
          Put team message here, maybe nice pics of the team's headshots
        </div>
      </Container>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    userId: state.auth.id,
    username: state.auth.username,
    game: state.game,
  };
};
const mapDispatch = {};

export default connect(mapState, mapDispatch)(GameOver);
