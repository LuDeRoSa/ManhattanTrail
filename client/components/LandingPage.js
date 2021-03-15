import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setGame } from '../store/game';


import PhaserGame from './PhaserGame'
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
    this.props.setGame(this.props.userId);
    //this can be altered to send information about desired path or category later on in a button onclick instead
  }
  render() {
    const { username } = this.props;
    const { game } = this.props;
    return (
      <Container style={styles.container}>
        <h3>Welcome , {username}</h3>
        <h4>In the future, category options might be here</h4>
        <h4>
          Some information could be displayed here whether a user currently has
          a game in progress
        </h4>
        <ButtonGroup>
          <Button disabled>Italian</Button>
          <Button disabled>Chinese</Button>
          <Button disabled>Indian</Button>
        </ButtonGroup>
        <p>Path: {game.pathId}</p>
        <p>Stage: {game.gameStage}</p>
        <p>Status: {game.status}</p>


        <Button
          variant="outlined"
          startIcon={<SportsEsportsIcon />}
          color="inherit"
          component={Link}
          to="/home"
        >
          {game.gameStage > 1 ? 'Resume' : 'Begin'} Game
        </Button>
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
  setGame,
};

export default connect(mapState, mapDispatch)(LandingPage);
