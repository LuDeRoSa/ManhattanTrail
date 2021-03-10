
Cake.Preloader = function(game) {
    Cake.GAME_WIDTH = 1200;
    Cake.GAME_HEIGHT = 950;
};

Cake.Preloader.prototype = {
    preload: function() {
        this.stage.backgroundColor = '#FF5349';
        this.preloadBar = this.add.sprite(75,
            (Cake.GAME_HEIGHT-700)/2, 'preloaderBar');
        this.load.setPreloadSprite(this.preloadBar);
 
        this.load.image('background', '../img/background.jpg');
        this.load.image('player', '../img/player.png');
        this.load.image('cookie', '../img/cookie.png');
        this.load.image('cupcake', '../img/cupcake.png');
        this.load.image('cake', '../img/cake.png');
        this.load.image('trashcan', '../img/trashcan.png');
        this.load.image('fishbone', '../img/fishbone.png');
        this.load.image('game-over', '../img/game-over.png');
        this.load.image('score-sign', '../img/score-sign.png');
 
        this.load.image('start-button', '../img/start-button.png');
    },
    create: function() {
        this.state.start('MainMenu');
    }
};