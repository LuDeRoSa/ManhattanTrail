import React, { Component } from 'react';
import Phaser from 'phaser';
import { IonPhaser } from '@ion-phaser/react';
import { connect } from 'react-redux';

import { updateMiniGameScore } from '../store/game';

//helpful docs https://gamedevacademy.org/how-to-make-a-mario-style-platformer-with-phaser-3/
//if custom sprite are uploaded, then use these for flipping animations
// https://www.html5gamedevs.com/topic/1582-horizontal-sprite-flip/
// https://www.html5gamedevs.com/topic/5794-how-can-i-flip-animations-for-left-and-right-in-a-phaser-spritesheet/
// https://www.html5gamedevs.com/topic/16158-how-do-i-horizontally-flip-an-animation-made-of-spritesheets/

class Galaga extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: {
        width: 1200 / 2,
        height: 950 / 2,
        type: Phaser.AUTO,
        physics: {
          default: 'arcade',
          arcade: {
            debug: false,
          },
        },
        scene: {
          init: function () {
            //set background color
            this.cameras.main.setBackgroundColor('rgb(47, 52, 55)');
          },
          preload: function () {
            //load up images. these can all be stylistically replaced easily.
            //Note: the images are loaded up directly at the size they're at unless
            //scaled down manually later in create() code. Burger is manually scaled
            //down this way.
            this.load.spritesheet('dude', './img/dude.png', {
              frameWidth: 32,
              frameHeight: 48,
            });

            // //https://rkuhlf-assets.itch.io/restaurant-pixel-art
            // this.load.spritesheet('chef', './img/ChefSheet.png', {
            //   frameWidth: 32,
            //   frameHeight: 32,
            // });

            //food assets from https://frozentaurus.itch.io/food-assets
            this.load.spritesheet('fruits', './img/fruits.png', {
              frameWidth: 16,
              frameHeight: 16,
            });
            this.load.image('burger', './img/burger.png');
            this.load.image('bullet', './img/bullet.png');
          },
          create: function () {
            //cursor keys from keyboard are set up
            this.cursors = this.input.keyboard.createCursorKeys();
            //instantiate score and place on screen
            this.score = 0;
            this.scoreText = this.add.text(16, 16, `score: ${this.score}`, {
              fontSize: '32px',
              fill: 'white',
            });

            // load up a player at set location and limit him inside world bounds
            this.player = this.physics.add.sprite(100, 450, 'dude');
            this.player.setCollideWorldBounds(true);
            //set up animation frames based on the spritesheet
            this.anims.create({
              key: 'left',
              frames: this.anims.generateFrameNumbers('dude', {
                start: 0,
                end: 3,
              }),
              frameRate: 10,
              repeat: -1,
            });
            this.anims.create({
              key: 'turn',
              frames: [{ key: 'dude', frame: 4 }],
              frameRate: 20,
            });
            this.anims.create({
              key: 'right',
              frames: this.anims.generateFrameNumbers('dude', {
                start: 5,
                end: 8,
              }),
              frameRate: 10,
              repeat: -1,
            });

            //adding groups: https://phaser.io/examples/v3/view/game-objects/render-texture/group-to-render-texture
            this.aliens = this.physics.add.group([
              {
                key: 'burger',
                repeat: 5,
                setXY: {
                  x: 50,
                  y: 50,
                  stepX: 100,
                },
                setScale: { x: 0.05, y: 0.05 },
              },
              {
                key: 'fruits',
                frame: 1,
                repeat: 5,
                setXY: {
                  x: 50,
                  y: 100,
                  stepX: 100,
                },
                setScale: { x: 2, y: 2 },
              },
            ]);

            //set all aliens to bounce the walls at 100 x velocity
            this.aliens.children.iterate((alien) => {
              alien.setVelocityX(100);
              alien.body.setCollideWorldBounds(true);
              alien.body.setBounce(1);
            });

            //instantiate bullets as inactive and invisible until player later shoots them
            this.bullets = this.physics.add.group({
              key: 'bullet',
              maxSize: 50,
              active: false,
              visible: false,
            });

            //physics colliders below between player/aliens and bullets/aliens
            this.physics.add.collider(
              this.player,
              this.aliens,
              (player, alien) => {
                this.physics.pause();
                player.setTint(0xff0000);
                player.anims.play('turn');
                this.gameOver = true;
                props.updateMiniGameScore(this.score);
              },
              null,
              this
            );
            this.physics.add.collider(
              this.bullets,
              this.aliens,
              (bullet, alien) => {
                alien.disableBody(true, true);
                bullet.disableBody(true, true);
                this.score += 1;
                this.scoreText.setText('Score: ' + this.score);
              },
              null,
              this
            );
          },
          update: function () {
            //check gameover variable. this will freeze the player and return
            if (this.gameOver) {
              this.player.setVelocityX(0);
              this.player.anims.play('turn');
              return;
            }

            //respond to user pressing keyboard cursor keys left and right
            if (this.cursors.left.isDown) {
              this.player.setVelocityX(-160);
              this.player.anims.play('left', true);
            } else if (this.cursors.right.isDown) {
              this.player.setVelocityX(160);
              this.player.anims.play('right', true);
            } else {
              this.player.setVelocityX(0);
              this.player.anims.play('turn');
            }
            //respond to user pressing up on keyboard with a 250ms delay
            if (this.input.keyboard.checkDown(this.cursors.up, 250)) {
              let bullet = this.bullets.getFirstDead(
                true,
                0,
                0,
                'bullet',
                false
              );
              if (bullet) {
                bullet.x = this.player.x;
                bullet.y = this.player.y;
                bullet.setActive(true);
                bullet.setVisible(true);
                bullet.setVelocityY(-300);
              }
            }

            //deactivate bullets that go beyond the top of screen
            this.bullets.children.each((bullet) => {
              if (bullet.active) {
                if (bullet.y < 0) {
                  bullet.setActive(false);
                }
              }
            });

            //if aliens bounce on the walls, move them down towards the player
            this.aliens.children.iterate((alien) => {
              if (alien.body.checkWorldBounds()) {
                alien.y += 50;
              }
            });

            //game ends when all aliens are inactive
            if (this.aliens.countActive(true) === 0) {
              this.gameOver = true;
              props.updateMiniGameScore(this.score);
            }
          },
        },
      },
    };
  }
  render() {
    //boilerplate rendering via IonPhaser
    const { initialize, game } = this.state;
    return (
      <>
        <IonPhaser game={game} initialize={initialize} />
      </>
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

export default connect(mapState, mapDispatch)(Galaga);
