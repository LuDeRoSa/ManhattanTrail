import React, { Component } from 'react';
import Snake from './Snake';
import Food from './Food'
import { updateMiniGameScore } from '../store/game';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';

const getRandomCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y];
};

// const initialState = {
//   food: getRandomCoordinates(),
//   speed: 200,
//   direction: 'RIGHT',
//   snakeDots: [
//     [0, 0],
//     [2, 0],
//   ],
//   score: 0,
// };

class SnakeGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      food: getRandomCoordinates(),
      speed: 80,
      direction: 'RIGHT',
      snakeDots: [
        [0, 0],
        [2, 0],
      ],
      score: 0,
      playing: true,
      open: false,
    };
    this.onGameOver = this.onGameOver.bind(this);
    this.onkeydown = this.onkeydown.bind(this);
    this.moveSnake = this.moveSnake.bind(this);
    this.checkIfOutOfBorders = this.checkIfOutOfBorders.bind(this);
    this.checkIfEat = this.checkIfEat.bind(this);
    this.enlargeSnake = this.enlargeSnake.bind(this);
    this.increaseSpeed = this.increaseSpeed.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.snackbar = this.snackbar.bind(this);
  }
  // state = initialState;

  componentDidMount() {
    //start listening to the DOM
    setInterval(this.moveSnake, this.state.speed);
    document.onkeydown = this.onkeydown;
  }

  componentDidUpdate() {
    if (!this.state.playing) {
      return;
    }
    this.checkIfOutOfBorders();
    // this.checkIfCollapsed();
    this.checkIfEat();
  }

  onkeydown = (e) => {
    e = e || window.event;
    if (e.keyCode >= 37 && e.keyCode <= 40) {
      e.preventDefault();
    }
    switch (e.keyCode) { //if stmt inside the cases
      case 38:
        //if current direction on teh state is down, break , or return
        //there would be no this.setState
        if (this.state.direction !== 'DOWN'){
          this.setState({ direction: 'UP' });
        }
        break;

      case 40:
        if (this.state.direction !== "UP"){
          this.setState({ direction: 'DOWN' });
        }
        break;

      case 37:
        if (this.state.direction !== "RIGHT"){
          this.setState({ direction: 'LEFT' });
        }
        break;

      case 39:
        if (this.state.direction !== "LEFT"){
          this.setState({ direction: 'RIGHT' });
        }

        break;
    }
  };

  moveSnake = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];

    switch (this.state.direction) {
      case 'RIGHT':
        head = [head[0] + 2, head[1]];
        break;

      case 'LEFT':
        head = [head[0] - 2, head[1]];
        break;

      case 'DOWN':
        head = [head[0], head[1] + 2];
        break;

      case 'UP':
        head = [head[0], head[1] - 2];
        break;
    }
    dots.push(head);
    dots.shift(); //removing the tail
    this.setState({
      snakeDots: dots,
    });
  };

  checkIfOutOfBorders() {
    //find the coordinates of the head & make sure it's within the game area
    //find head by finding the last item of the snakes array
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    // console.log("this is the current head", head)
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.onGameOver();
    }
  }

  // checkIfCollapsed(){
  //   console.log("in the chekc if colapsed!")
  //   let snake = [...this.state.snakeDots];
  //   let head = snake[snake.length - 1];
  //   snake.pop();
  //   snake.forEach(dot => {
  //     if(head[0] == dot[0] && head[1] == dot[1]){
  //       this.onGameOver();
  //     }
  //   })
  // }

  checkIfEat() {
    //if the snake eats the food
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let food = this.state.food;
    if (head[0] == food[0] && head[1] == food[1]) {

      this.setState({
        food: getRandomCoordinates(),
        score: (this.state.score += 1),
      });
      setTimeout(this.alertMessage, 1000);
      this.enlargeSnake();
      this.increaseSpeed();
      this.snackbar();
    }
  }

  handleClose() {
    this.setState({open: false})
  }

  snackbar() {
    this.setState({open: true})
  }


  enlargeSnake() {
    let newSnake = [...this.state.snakeDots];
    newSnake.unshift([]); //adding an empty array basically
    this.setState({
      snakeDots: newSnake,
    });
  }

  increaseSpeed() {
    if (this.state.speed > 25) {
      this.setState({
        speed: this.state.speed - 25,
      });
    }
  }

  onGameOver() {
    if (!this.state.playing) {
      return;
    }
    this.props.updateMiniGameScore(this.state.score);
    this.setState({
      playing: false,
    });
  }

  render() {
    if (!this.state.playing) {
      return (
        <div className="game-message">
          GAME OVER! Game Score: {this.state.score}
        </div>
      );
    }
    return (
      <div className='game-area'>
        <Snake snakeDots={this.state.snakeDots} />
        <Food dot={this.state.food} />
        <Snackbar
        anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
       }}
        open={this.state.open}
        onClose={this.handleClose}
        // TransitionComponent={state.Transition}
        message="YUM!"
        // key={state.Transition.name}
        autoHideDuration={500}
      />
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    state,
  };
};

const mapDispatch = {
  updateMiniGameScore,
};

export default connect(mapState, mapDispatch)(SnakeGame);
