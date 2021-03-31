import React, { Component } from 'react';

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
      cake: [{ x: 550, y: 100 }],
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
    document.addEventListener('keydown', (e) => {
      e.code === 'Space'
        ? this.setState({
            bird: {
              x: 50,
              y: this.state.bird.y,
              velocity: this.state.bird.velocity + this.state.lift,
              radius: 20,
            },
          })
        : null;
    });
  }
  update = () => {
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
      };
    });
  };
  draw = () => {
    const node = this.canvasRef.current;
    const ctx = node.getContext('2d');
    ctx.fillStyle = 'green';
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, node.width, node.height);
    ctx.drawImage(penguin, this.state.bird.x, this.state.bird.y, 50, 50);
    this.state.cake.forEach((cake) => {
      ctx.drawImage(cupcake, cake.x, cake.y, 50, 50);
    });
  };
  render() {
    return (
      <div>
        <canvas ref={this.canvasRef} width={600} height={400} />
      </div>
    );
  }
}
export default FlappyCake;
