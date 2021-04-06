import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import PublicIcon from '@material-ui/icons/Public';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import './Style/GameOver.css';

const styles = {
  root: {},
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
};
class GameOver extends React.Component {
  render() {
    const { username } = this.props;
    const { game } = this.props;
    return (
      <Container style={styles.container}>
        <h1 className="game-over-heading">GAME OVER</h1>
        <div className="score-box">Total Amount of Food Items Donated: {game.total_score}</div>
        <div className="empty-box"></div>
        <h3>Help combat food waste!</h3>

        <div className="food-shelter">

          <img src="./img/food-donation.jpeg"/>
          <p> US restaurants generate an estimated 22 to 33 billion pounds of food waste each year. Drivers of food waste at restaurants include oversized portions, inflexibility of chain store management and extensive menu choices. 41 According to the Cornell University Food and Brand Lab, on average, diners leave 17 percent of their meals uneaten and 55 percent of edible leftovers are left at the restaurant. When the pandemic first happened there was a lot of extra waste,” Gunders tells Food Tank. She explains that the sudden closures of businesses created bottlenecks in supply chains. As a result, food could not reach people fast enough. Gunders explains that the pandemic has forced many restaurants to shift away from buffet models, a major contributor of food waste. She also says that restaurants, uncertain of their business, are offering smaller menus and, as a result, are keeping smaller inventories. List of food pantries in New York City that you can help contribute towards.</p>
          <p>New York Common Pantry</p>
          <a href="https://nycommonpantry.org/donate-to-new-york-common-pantry/">Donate Here!</a>
        </div>
        <p>Path: {game.pathId}</p>
        <p>Stage: {game.gameStage}</p>
        <p>Status: {game.status}</p>

        <ButtonGroup>
          <Button
            startIcon={<SportsEsportsIcon />}
            color='inherit'
            component={Link}
            to='/landing'
          >
            Play New Game
          </Button>
          <Button
            startIcon={<AccountCircleIcon />}
            color='inherit'
            component={Link}
            to='/profile'
          >
            Profile
          </Button>
          <Button
            startIcon={<PublicIcon />}
            color='inherit'
            component={Link}
            to='/leadership'
          >
            Leadership Board
          </Button>
          <Button disabled>Share with friends</Button>
        </ButtonGroup>

      </Container>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
    game: state.game,
  };
};
const mapDispatch = {};

export default connect(mapState, mapDispatch)(GameOver);
