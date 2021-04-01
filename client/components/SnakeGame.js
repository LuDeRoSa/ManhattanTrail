import React, { Component } from 'react';
import Snake from './Snake';
import Food from './Food';
import { updateMiniGameScore } from '../store/game';
import { connect } from 'react-redux';

import './Style/Snake.css';

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
      speed: 165,
      direction: 'RIGHT',
      snakeDots: [
        [0, 0],
        [2, 0],
      ],
      score: 0,
      playing: true,
    };
    this.onGameOver = this.onGameOver.bind(this);
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
    switch (e.keyCode) {
      case 38:
        this.setState({ direction: 'UP' });
        break;
      case 40:
        this.setState({ direction: 'DOWN' });
        break;
      case 37:
        this.setState({ direction: 'LEFT' });
        break;
      case 39:
        this.setState({ direction: 'RIGHT' });
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
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.onGameOver();
    }
  }

  // checkIfCollapsed(){
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
    }
  }

  alertMessage() {
    console.log('in the alert message method!');
    <div className="YUM">YUM!</div>;
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
        <div className="game-area">
          Gameover! Snake Game score: {this.state.score}
        </div>
      );
    }
    return (
      <div className="game-area">
        <Snake snakeDots={this.state.snakeDots} />
        <Food dot={this.state.food} />
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
