import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { checkGame, setGame } from '../store/game';
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
class LandingPage extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.checkGame();
  }
  render() {
    const { username } = this.props;
    const { game } = this.props;
    return (
      <Container style={styles.container}>
        <h3>Welcome , {username}</h3>
        {!game.path_name && (
          <React.Fragment>
            <h4>You don't have a game set up yet, please pick a path! :)</h4>
            <ButtonGroup>
              <Button onClick={() => this.props.setGame('1')}>
                Default dev path 1
              </Button>
              <Button disabled>Italian</Button>
              <Button disabled>Chinese</Button>
              <Button disabled>Indian</Button>
              <Button onClick={() => this.props.setGame('gluten-free')}>
                Gluten Free
              </Button>
            </ButtonGroup>
          </React.Fragment>
        )}

        {game.path_name && (
          <React.Fragment>
            <p>Path: {game.path_name}</p>
            <p>Stage: {game.gameStage}</p>
            <p>Status: {game.status}</p>
            <p>Score: {game.total_score}</p>
            <Button
              variant="outlined"
              startIcon={<SportsEsportsIcon />}
              color="inherit"
              component={Link}
              to="/home"
            >
              {game.gameStage > 1 ? 'Resume' : 'Begin'} Game
            </Button>
          </React.Fragment>
        )}
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
const mapDispatch = {
  checkGame,
  setGame,
};

export default connect(mapState, mapDispatch)(LandingPage);
