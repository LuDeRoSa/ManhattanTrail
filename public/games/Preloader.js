// import Phaser from 'phaser'

Cake.Preloader = function(game){
    Cake.GAME_WIDTH = 640;
    Cake.GAME_HEIGHT = 960;
};
Cake.Preloader.prototype = {
    preload: function() {
        this.stage.backgroundColor = '#B4D9E7';
        this.preloadBar = this.add.sprite((Cake.GAME_WIDTH-311)/2,
            (Cake.GAME_HEIGHT-27)/2, 'preloaderBar');
        this.load.setPreloadSprite(this.preloadBar);
 
        
        this.load.image('background', '../img/background.jpg');
        this.load.image('player', '../img/player.png');
        this.load.image('cooke', '../img/cookie.png');
        this.load.image('cupcake', '../img/cupcake.png');
        this.load.image('cake', '../img/cake.png');
        this.load.image('trashcan', '../img/trashcan.png');
        this.load.image('fishbone', '../img/fishbone.png');
        // this.load.image('game-over', 'img/gameover.png');
        // this.load.image('score-bg', 'img/score-bg.png');
 
        this.load.image('start-button', '../img/start-button.png');
    },
    create: function() {
        this.state.start('MainMenu');
    }
};