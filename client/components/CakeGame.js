import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateMiniGameScore, updateLastStagePlayed } from '../store/game';


class CakeGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ctx: null,
            deltaX: 0,
            current_stage: 0,
            scoreText: null,
            timeText: null,
            score: 0,
            totalElapsedTime: 0,
            health: 0,

            _player: null,
            _cakeGroup: null,
            _spawnCakeTimer: 0,
            _fontStyle: null,
            _cursors: null,
            _cake: null,

            gameDone: false,


            gravity: 0.5,
            lift: -15,
            bird: {
                x: 50,
                y: 100,
                velocity: 0,
                radius: 20
            }
        }
    }

    update = () => {
        
        let newV = (this.state.bird.velocity + this.state.gravity) * 0.9
        this.setState({
          bird: {
            x: 50,
            y: Math.max(
              Math.min(
                this.state.bird.y + newV,
                this.refs.canvas.height - this.state.bird.radius
              ),
              0
            ),
            velocity: newV,
            radius: 20
          }
        });


    }

    draw = () => {
          

        //ctx.fillStyle = "green";
        // ctx.fillStyle = "white";
        // ctx.fillRect(0, 0, this.refs.canvas.width,   
        //              this.refs.canvas.height);           
        // ctx.beginPath();
        // ctx.arc(this.state.bird.x, this.state.bird.y, 
        //        this.state.bird.radius, 0, 2 * Math.PI);
        // ctx.fill();
        // ctx.stroke();
    }


    preload = () => {
        this.ctx = this.refs.canvas.getContext("2d");

        const background = new Image();
        background.src = './img/background.jpg';
        background.onload = () => {
            this.ctx.drawImage(background, 0, 0, this.refs.canvas.width, this.refs.canvas.height);
          };
        
        this._player = new Image();
        this._player.src = './img/player.png';
        this._player.onload = () => {
            this.ctx.drawImage(this._player, 3, 300, this.refs.canvas.width *.18, this.refs.canvas.height*.2);
          };
        
        const scoreSign = new Image();
        scoreSign.src = './img/score-sign.png';
        scoreSign.onload = () => {
            this.ctx.drawImage(scoreSign, 5, 15, this.refs.canvas.width*.17, this.refs.canvas.height*.09);
        }
        
    }

    
    movePlayer = (e) => {

        switch(e.keyCode) {
            case 37: //left key
                this.deltaX -= 100;
                break;
            case 39:  //right key
                this.deltaX += 100;
                break;
        }
        e.preventDefault();
        this.drawPlayer();
    }

    drawPlayer = () => {

        // ctx.drawImage(this._player, 3, 300, this.refs.canvas.width *.18, this.refs.canvas.height*.2);
        this.ctx.drawImage(this._player, 3+this.deltaX, 300, this.refs.canvas.width *.18, this.refs.canvas.height*.2);
    }

    componentDidMount() {
        this.preload();
        setInterval(() => {
            this.update();
            this.draw();
        }, 1000 / 60);

        window.addEventListener("keydown", this.movePlayer, false);

          
  
    }

    render() {
        return (
            <div> 
              <canvas ref="canvas" width={600} height={475} />
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
    updateLastStagePlayed
  };
  
  export default connect(mapState, mapDispatch)(CakeGame);