import React, { Component } from 'react';
import Phaser from 'phaser';
import { IonPhaser } from '@ion-phaser/react';
import { connect } from 'react-redux';

class Galaga extends Component {
  state = {
    player: null,
    burgers: null,
    bullets: null,
    cursors: null,
    initialize: true,
    gameOver: false,
    game: {
      width: 1200 / 2,
      height: 950 / 2,
      type: Phaser.AUTO,
      physics: {
        default: 'arcade',
        arcade: {
          // gravity: { y: 200 },
          debug: false,
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
            setXY: { x: 50, y: 50, stepX: 100 },
            setScale: { x: 0.05, y: 0.05 },
          });
          this.burgers.children.iterate((burger) => {
            burger.body.setAllowGravity(false);
          });

          this.bullets = this.physics.add.group({
            key: 'bullet',
            maxSize: 10,
            setScale: { x: 0.05, y: 0.05 },
          });

          this.physics.add.collider(
            this.player,
            this.burgers,
            this.hitBurger,
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

          this.burgers.children.iterate((burger) => {
            burger.x++;
            if (burger.x === 550) {
              burger.x = 0;
              burger.y += 50;
            }
          });
        },
        hitBurger: function (player, burgers) {
          this.physics.pause();
          player.setTint('red');
          player.anims.play('turn');
          this.gameOver = true;
          //could call store here
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
