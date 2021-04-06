import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { checkGame, setGame } from '../store/game';
import { setRests } from '../store/rest';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';

import { makeStyles } from '@material-ui/core/styles';

const styles = {
  root: {},
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'space-around',
    alignItems: 'center',
    height: '90vh',
  }
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
  componentDidUpdate() {
    if (this.props.game.path_name && this.props.rests.length < 1) {
      this.props.setRests(this.props.game.path_name);
    }
  }
  render() {
    const { username } = this.props;
    const { game } = this.props;
    return (
      <Container style={styles.container}>
        <h3>Welcome, {username}! Here's your current status:</h3>
        {!game.path_name && (
          <React.Fragment>
            <h4>You don't have a game set up yet, please pick a path! :)</h4>
            <ButtonGroup>
              <Button
                onClick={() => {
                  this.props.setGame('1');
                  this.props.setRests('1');
                }}
              >
                Default dev path 1
              </Button>
              <Button disabled>Italian</Button>
              <Button disabled>Chinese</Button>
              <Button disabled>Indian</Button>
              <Button
                onClick={() => {
                  this.props.setGame('gluten-free');
                  this.props.setRests('gluten-free');
                }}
              >
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
              style={styles.button}
              startIcon={<SportsEsportsIcon />}
              variant="contained"
              color="primary"
              component={Link}
              to="/home"
              radius={0}
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
    rests: state.rest.rests,
  };
};
const mapDispatch = {
  checkGame,
  setGame,
  setRests,
};

export default connect(mapState, mapDispatch)(LandingPage);
