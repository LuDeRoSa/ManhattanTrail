import React, { Component } from 'react';
import Phaser from 'phaser';
import { IonPhaser } from '@ion-phaser/react';
import { connect } from 'react-redux';

function hitBurger(player, burgers) {
  this.physics.pause();
  player.setTint('red');
  player.anims.play('turn');
  this.gameOver = true;
  //could call store here
}
// function collectBurger(bullet, burger) {
//   console.log('collectBurger');
//   burger.disableBody(true, true);
//   // bullet.disableBody(true, true);
//   // this.score += 1;
//   // this.scoreText.setText('Score: ' + score);
//   return true;
// }

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
          debug: true,
        },
      },
      scene: {
        init: function () {
          this.cameras.main.setBackgroundColor('rgb(47, 52, 55)');
        },
        preload: function () {
          this.load.image('preloaderBar', './img/loading-bar.png');
          this.load.spritesheet('dude', './img/dude.png', {
            frameWidth: 32,
            frameHeight: 48,
          });
          this.load.image('burger', './img/burger.png');
          this.load.image('bullet', './img/bullet.png');
        },
        create: function () {
          // this.add.sprite(0, 0, 'background').setOrigin(0).setScale(0.5, 0.5);

          this.player = this.physics.add.sprite(100, 450, 'dude');

          this.player.setBounce(0.2);
          this.player.setCollideWorldBounds(true);

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

          this.cursors = this.input.keyboard.createCursorKeys();

          this.burgers = this.physics.add.group({
            key: 'burger',
            repeat: 5,
            setXY: {
              x: 50,
              y: 50,
              stepX: 100,
              // stepY: 50
            },
            setScale: { x: 0.05, y: 0.05 },
          });

          this.bullets = this.physics.add.group({
            key: 'bullet',
            maxSize: 10,
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
            hitBurger,
            null,
            this
          );
          this.physics.add.collider(
            this.bullets,
            this.burgers,
            (bullet, burger) => {
              burger.disableBody(true, true);
              bullet.disableBody(true, true);
              // console.log(this);
              this.score += 1;
              this.scoreText.setText('Score: ' + this.score);
            },
            null,
            this
          );
        },
        update: function () {
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
            burger.x++;
            if (burger.x === 550) {
              burger.x = 0;
              burger.y += 50;
            }
          });
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