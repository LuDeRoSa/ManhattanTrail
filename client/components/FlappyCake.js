import React, { Component } from 'react';
import { updateMiniGameScore } from '../store/game';
import { connect } from 'react-redux';

const getRandomCoordinates = () => {
  let min = 5;
  let max = 350;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return y;
};

const penguin = new Image();
penguin.src = './img/player.png';
const cupcake = new Image();
cupcake.src = './img/cupcake.png';

class FlappyCake extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gravity: 0.8,
      lift: -15,
      bird: {
        x: 50,
        y: 100,
        velocity: 0,
        radius: 20,
      },
      cakes: [{ x: 550, y: 100 }],
      cakespeed: 1,
      score: 0,
      playing: true,
    };
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    setInterval(() => {
      this.update();
      this.draw();
    }, 1000 / 60);
    document.addEventListener('click', (e) => {
      if (e.target.tagName === 'CANVAS') {
        this.bump();
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        this.bump();
      }
    });
  }

  componentDidUpdate() {
    if (!this.state.playing) {
      return;
    }
  }
  bump() {
    this.setState({
      bird: {
        x: 50,
        y: this.state.bird.y,
        velocity: this.state.bird.velocity + this.state.lift,
        radius: 20,
      },
    });
  }
  update = () => {
    if (!this.state.playing) {
      return;
    }
    const node = this.canvasRef.current;
    let newV = (this.state.bird.velocity + this.state.gravity) * 0.9;
    this.setState((state) => {
      return {
        bird: {
          x: 50,
          y: Math.max(
            Math.min(state.bird.y + newV, node.height - state.bird.radius),
            0
          ),
          velocity: newV,
          radius: 20,
        },
        cakes: state.cakes.map((cake) => {
          cake.x = cake.x - 5;
          return cake;
        }),
      };
    });

    this.state.cakes.forEach((cake) => {
      if (
        Math.abs(cake.y - this.state.bird.y) < 50 &&
        Math.abs(cake.x - this.state.bird.x) < 50
      ) {
        this.setState((state) => {
          const cake = {
            x: 550,
            y: getRandomCoordinates(),
          };
          return {
            score: state.score + 1,
            cakes: [cake],
          };
        });
      }
      if (cake.x === 0) {
        this.setState({ playing: false });
        this.gameover();
      }
    });
  };
  draw = () => {
    if (!this.state.playing) {
      return;
    }
    const node = this.canvasRef.current;
    const ctx = node.getContext('2d');
    ctx.fillStyle = 'skyblue';
    ctx.fillRect(0, 0, node.width, node.height);
    ctx.drawImage(penguin, this.state.bird.x, this.state.bird.y, 50, 50);
    this.state.cakes.forEach((cake) => {
      ctx.drawImage(cupcake, cake.x, cake.y, 50, 50);
    });
  };
  gameover() {
    this.props.updateMiniGameScore(this.state.score);
  }
  render() {
    if (!this.state.playing) {
      return <div>Game Over! Flappy Cake score: {this.state.score}</div>;
    }
    return (
      <div>
        {this.state.score}
        <canvas ref={this.canvasRef} width={600} height={400} />
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

export default connect(mapState, mapDispatch)(FlappyCake);
