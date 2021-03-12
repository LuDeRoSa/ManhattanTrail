import React, { Component } from 'react'
import Phaser from 'phaser'
import { IonPhaser } from '@ion-phaser/react'

//global object for game
let Cake = {};
Cake.Boot = function(game) {};

Cake.Boot.prototype = {
    preload: function() {
        this.load.image('preloaderBar', '../img/loading-bar.png');
    },
    create: function() {
        //not using multi-touch
        this.input.maxPointers = 1;

        //everything shown on screen no matter the dimension
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        //activates scaling
        this.scale.setScreenSize(true);

        //executes the preloader state
        this.state.start('Preloader');
    }
};
 
class PhaserGame extends Component {
      
  state = {
    initialize: true,
    game: {
      width: "100%",
      height: "100%",
      type: Phaser.AUTO,
      scene: {
        init: function() {
          this.cameras.main.setBackgroundColor('#24252A')
        },
        create: function() {
          this.helloWorld = this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.centerY, 
            "Hello World", { 
              font: "40px Arial", 
              fill: "#ffffff" 
            }
          );
          this.helloWorld.setOrigin(0.5);
        },
        update: function() {
          this.helloWorld.angle += 1;
        }
      }
    }
  }

  componentDidMount() {
    (function() {
          // initialize framework 
          let game = new Phaser.Game(1200, 950, Phaser.AUTO, 'game');
          // add game states
          game.state.add('Boot', Cake.Boot);
          game.state.add('Preloader', Cake.Preloader);
          game.state.add('MainMenu', Cake.MainMenu);
          game.state.add('Game', Cake.Game);
          game.state.start('Boot');
      })();
  }

    
  








 
  render() {
    const { initialize, game } = this.state
    console.log('phaser')
    return (
      <IonPhaser game={game} initialize={initialize} />
    )
  }
}
 
export default PhaserGame;