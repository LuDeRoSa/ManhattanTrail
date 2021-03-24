import React, { Component } from 'react';
import Phaser from 'phaser';
import { IonPhaser } from '@ion-phaser/react';
import { connect } from 'react-redux';

//helpful docs https://gamedevacademy.org/how-to-make-a-mario-style-platformer-with-phaser-3/
//if custom sprite are uploaded, then use these for flipping animations
// https://www.html5gamedevs.com/topic/1582-horizontal-sprite-flip/
// https://www.html5gamedevs.com/topic/5794-how-can-i-flip-animations-for-left-and-right-in-a-phaser-spritesheet/
// https://www.html5gamedevs.com/topic/16158-how-do-i-horizontally-flip-an-animation-made-of-spritesheets/

class Galaga extends Component {
  state = {
    player: null,
    burgers: null,
    bullets: null,
    cursors: null,
    initialize: true,
    gameOver: false,
    score: 0,
    scoreText: '',
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

          //cursor keys from keyboard are set up
          this.cursors = this.input.keyboard.createCursorKeys();
          // this.fruits = this.physics.add.group({
          //   key: 'fruits',
          //   frame: 0,
          //   setXY: {
          //     x: 50,
          //     y: 200,
          //     stepX: 100,
          //   },
          //   setScale: { x: 2, y: 2 },
          // });
          this.burgers = this.physics.add.group([
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
          this.burgers.children.iterate((burger) => {
            burger.setVelocityX(100);

            burger.body.setCollideWorldBounds(true);
            burger.body.setBounce(1);
          });

          this.bullets = this.physics.add.group({
            key: 'bullet',
            maxSize: 50,
            active: false,
            visible: false,
          });
          this.score = 0;
          this.scoreText = this.add.text(16, 16, `score: ${this.score}`, {
            fontSize: '32px',
            fill: 'white',
          });
          this.physics.add.collider(
            this.player,
            this.burgers,
            (player, burger) => {
              this.physics.pause();
              player.setTint(0xff0000);
              player.anims.play('turn');
              this.gameOver = true;
              //could call store here
            },
            null,
            this
          );
          this.physics.add.collider(
            this.bullets,
            this.burgers,
            (bullet, burger) => {
              burger.disableBody(true, true);
              bullet.disableBody(true, true);
              this.score += 1;
              this.scoreText.setText('Score: ' + this.score);
            },
            null,
            this
          );
        },
        update: function () {
          if (this.gameOver) {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
            return;
          }
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

          if (this.input.keyboard.checkDown(this.cursors.up, 250)) {
            let bullet = this.bullets.getFirstDead(true, 0, 0, 'bullet', false);
            if (bullet) {
              bullet.x = this.player.x;
              bullet.y = this.player.y;
              bullet.setActive(true);
              bullet.setVisible(true);
              bullet.setVelocityY(-300);
            }
          }

          this.bullets.children.each((bullet) => {
            if (bullet.active) {
              if (bullet.y < 0) {
                bullet.setActive(false);
              }
            }
          });
          this.burgers.children.iterate((burger) => {
            if (burger.body.checkWorldBounds()) {
              burger.y += 50;
            }
          });

          if (this.burgers.countActive(true) === 0) {
            this.gameOver = true;
          }
        },
      },
    },
  };

  render() {
    const { initialize, game } = this.state;
    return <IonPhaser game={game} initialize={initialize} />;
  }
}

const mapState = (state) => {
  return {
    state,
  };
};

const mapDispatch = {};

export default connect(mapState, mapDispatch)(Galaga);
