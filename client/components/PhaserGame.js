import React, { Component } from 'react'
import Phaser from 'phaser'
import { IonPhaser } from '@ion-phaser/react'

const TOTAL_GAME_LENGTH = 45 * 10000; //game lasts 45 seconds

/*
Timer methods
 */
function getTime() {
    // return the number of milliseconds since 1 January 1970 00:00:00
    let d = new Date();
    return d.getTime();
}
function getDelta(game) {
    // subtract the start time from the time now
    let elapsed = getTime() - game.start;
    return elapsed;
}
function resetTime(game) {
    // reset the start time
    game.start = getTime();
}

/*
Game methods
 */
 function spawnCake(game, cakeOptions) {
    // randomized x-coord to drop the cake from (b/w zero and Canvas width)
    let dropPos = Math.floor(Math.random() * game.game.config.width);

    // array of random y-coordinates to drop the food from
    let dropOffset = [-9,-4,-6,-1];

     // one of five objects to be dropped (randomly chosen)
     let cakeType = Math.floor(Math.random() * cakeOptions.length);
     let cake = game.physics.add.sprite(dropPos, dropOffset[cakeType], cakeOptions[cakeType]);
     cake.setScale(.08,.08);
     cake.setGravity(0, 200); // enable the cake for the physics engine (so it falls naturally from screen when gravity is set)
     
     //set anchor point of cake for rotation
     cake.setOrigin(0.5,0.5);
     game._cakeGroup.add(cake);

     // when cake leaves the screen, remove it
     game.physics.world.setBoundsCollision(true, true, true, true);
 }
function collisionHandler(spriteOne, spriteTwo) {
    // Remove the cake
    spriteTwo.destroy();
    // Update score based on food type
    let spriteName = spriteTwo.texture.key;
    if (spriteName  === 'trashcan' || spriteName === 'fishbone') {
        this.score -= 3;
    } else {
        this.score += 2;
    }
    this.scoreText.setText(this.score);
}
// removes cake and decreases health (because player didn't get it)
function removeCake(game, cake) {
    cake.destroy();
    let cakeName = cake.texture.key;
    // if good food dropped, decrease health (can drop 3 before game mover)
    if (cakeName === 'cake' || cakeName === 'cookie' || cakeName === 'cupcake') {
        game.health -= 2;
    }
}

class PhaserGame extends Component {
    state = {
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
        initialize: true,
        game: {
          width: 1200/2,
          height: 950/2,
          type: Phaser.AUTO,
          physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 200 },
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
            },
            init: function() {
            },
            create: function() {
                this.add.sprite(0, 0, 'background').setOrigin(0).setScale(.5,.5);
                this.add.sprite(10, 10, 'score-sign').setOrigin(0).setScale(.25/2,.25/2);
                // player setup
                this._player = this.physics.add.sprite(3, 320, 'player').setOrigin(0).setScale(.2/3,.2/3);
                this._player.body.setAllowGravity(false)
                this._player.body.setCollideWorldBounds(true);
                this._player.setVelocityX(0);
                this._player.setImmovable(true);
                // enabling keys to navigate player
                this._cursors = this.input.keyboard.createCursorKeys();  
                // create timer & record the start time
                this.start = getTime();
                this._spawnCakeTimer = 0;
                this.health = 6;
                this._fontStyle = { font: "36px Arial", fill: "#FFCC00", stroke: "#333", strokeThickness: 5, align: "center" };
                this.scoreText = this.add.text(38, 6, "0", this._fontStyle);
                this.timeText = this.add.text(100, 6, "0", this._fontStyle);
                this.score = 0;
                this.totalElapsedTime = 0;
                this._cakeGroup = this.add.group();
                // add food to game
                let cakeOptions = ['cake','cookie','cupcake', 'trashcan', 'fishbone'];
                spawnCake(this, cakeOptions );
            },
            update: function() {
                //counting total time elapsed
                this.totalElapsedTime += getDelta(this);
                this.timeText.setText("Time: " + Math.floor(this.totalElapsedTime/10000) + "s");

                if (this.totalElapsedTime > TOTAL_GAME_LENGTH) {
                    this.add.sprite(300, 200, 'game-over').setScale(.4,.4);
                    this.scene.pause();
                 }

                // add food to game
                let cakeOptions = ['cake','cookie','cupcake', 'trashcan', 'fishbone'];
                if (getDelta(this) > 1000) {          
                        spawnCake(this, cakeOptions);
                        resetTime(this);
 
                }

                this.physics.add.overlap(this._player, this._cakeGroup, collisionHandler, null, this);

                // Reset the players velocity (movement)
                // Navigate player based on cursor keys
                this._player.setVelocityX(0);
                if (this._cursors.left.isDown)
                {
                    //  Move to the left
                    this._player.setVelocityX(-300);
                }
                else if (this._cursors.right.isDown)
                {
                    //  Move to the right
                    this._player.setVelocityX(300);
                }
                else
                {
                    //  Stand still
                    this._player.setVelocityX(0);
                }
            }, // end bracket for update function
          }, // end bracket for scene
        }, // end bracket for game
      }; // end bracket for state

  render() {
    const { initialize, game } = this.state
    console.log('phaser')
    return (
      <IonPhaser game={game} initialize={initialize} />
    )
  } //end bracket for render
}
export default PhaserGame;