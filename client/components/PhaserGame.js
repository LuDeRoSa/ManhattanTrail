import React, { Component } from 'react'
import Phaser from 'phaser'
import { IonPhaser } from '@ion-phaser/react'

//global object for game

// function spawnCake(game, cakeOptions) {
//     console.log('cake', game)
//     console.log('cakeOptions',cakeOptions)
//     //randomized x-coord to drop the cake from (b/w zero and Canvas width)
//     let dropPos = Math.floor(Math.random()*game.game.config.width);

//      //array of random y-coordinates to drop the food from 
//      let dropOffset = [-27,-36,-38,-48];


// }
 
class PhaserGame extends Component {

    state = {
        scoreText: null,
        score: 0,
        health: 0,
    
        _player: null,
        //Phaser.Physics.Arcade.Sprite,
        _cakeGroup: null,
        _spawnCakeTimer: 0,
        _fontStyle: null,
        _cursors: null,
        //this.input.keyboard.createCursorKeys(),
        //Phaser.Types.Input.Keyboard.CursorKeys,
        _cake: null,
    
        initialize: true,    

        game: {
          width: 1200/2,
          height: 950/2,
          type: Phaser.AUTO,
          physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 300 },
                debug: false
            }
          },
          scene: {
            preload: function() {
                this.load.image('preloaderBar', './img/loading-bar.png');
                this.load.image('background', './img/background.jpg');
                this.load.image('player', './img/player.png');
                this.load.image('cookie', './img/cookie.png');
                this.load.image('cupcake', './img/cupcake.png');
                this.load.image('cake', './img/cake.png');
                this.load.image('trashcan', './img/trashcan.png');
                this.load.image('fishbone', './img/fishbone.png');
                this.load.image('game-over', './img/game-over.png');
                this.load.image('score-sign', './img/score-sign.png');
                this.load.image('start-button', './img/start-button.png');
    
                // this.add.sprite(0, 0, 'background');
                // this.add.button(1200/2-230, 50, 'start-button', this.startGame, this);
            },
            init: function() {
    
                
            },
            create: function() {
                this.add.sprite(0, 0, 'background').setOrigin(0).setScale(.5,.5);
                // // this.physics.startSystem(Phaser.Physics.ARCADE);
                // this.physics.arcade.gravity.y = 200;
    
                this.add.sprite(10, 10, 'score-sign').setOrigin(0).setScale(.25/2,.25/2);
    
                //player setup
                //this._player = this.add.sprite(3, 320, 'player').setOrigin(0).setScale(.2/3,.2/3);
                this._player = this.physics.add.sprite(3, 320, 'player').setOrigin(0).setScale(.2/3,.2/3);
                this._player.body.setAllowGravity(false)
                this._player.body.setCollideWorldBounds(true);
                this._player.setVelocityX(0);
                this._player.setImmovable(true);
    
                //enabling keys to navigate player
                this._cursors = this.input.keyboard.createCursorKeys();  // Phaser.Types.Input.Keyboard.CursorKeys,
               
                
                this._spawnCakeTimer = 0;
                this.health = 6;
    
                this._fontStyle = { font: "36px Arial", fill: "#FFCC00", stroke: "#333", strokeThickness: 5, align: "center" };
                this.scoreText = this.add.text(38, 6, "0", this._fontStyle);
    
                this._cakeGroup = this.add.group();
                console.log('this', this)
                // this.spawnCake();
    
            },
            update: function() {
                this._spawnCakeTimer += this.time.elapsed;

                //add food to game
                let cakeOptions = ['cake','cookie','cupcake', 'trashcan', 'fishbone'];

                if(this._spawnCakeTimer > 1000) {
                    this._spawnCakeTimer = 0;
                    // this.spawnCake(cakeOptions);
                }
            }, //end bracket for update function
          }, //end bracket for scene
        }, //end bracket for game
      }; //end bracket for state

     
  render() {
    const { initialize, game } = this.state
    console.log('phaser')
    return (
      <IonPhaser game={game} initialize={initialize} />
    )
  } //end bracket for render
}
 
export default PhaserGame;