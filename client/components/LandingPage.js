import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { checkGame, setGame } from '../store/game';
import { setRests } from '../store/rest';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import './Style/LandingPage.css';
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
        <div className="landing-page-heading">Welcome to Manhattan Trail!</div>
        <br />
        <div className="landing-page-body">Travel through Manhattan restaurants, play games, and collect food at each restaurant that you will donate to a food shelter at the end. The better you do in the games, the more food you can collect! </div>

        {!game.path_name && (
          <React.Fragment>
            <br/>
            <div className="game-play-text">You don't have a game set up yet, please pick a path!</div>
            <br />
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

            <h1>Food Waste: A Massive Crisis</h1>
            <img src="./img/zero-waste.jpeg" />
            <p>US restaurants generate an estimated 22 to 33 billion pounds of food
            waste each year. Drivers of food waste at restaurants include
            oversized portions, inflexibility of chain store management and
            extensive menu choices. According to the Cornell University Food and
            Brand Lab, on average, diners leave 17 percent of their meals
            uneaten and 55 percent of edible leftovers are left at the
            restaurant. <b>When the pandemic first happened there was a lot of
            extra waste because the sudden closures of businesses created
            bottlenecks in supply chains. As a result, food could not reach
            people fast enough. </b> </p>

            <p>The pandemic has forced many restaurants to
            innovate, cut back, and better utilize their resources. In doing so,
            they have shifted away from buffet models, a major contributor of
            food waste. They are also offering smaller menus and, as a result,
            are keeping smaller inventories. These new shifts will hopefully
            help ensure less food waste going forward.</p>


            <p>One of the best ways to
            help reduce food waste is to provide extra food to those in need,
            via food pantries and food shelters. <i>Our game seeks to bring
            awareness to this issue and show how restaurants and food shelters
            can work together to reduce food waste.</i></p>

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
