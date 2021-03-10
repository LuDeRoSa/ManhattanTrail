
//global object for game
let Cake = {};
Cake.Boot = function(game) {};
Cake.Boot.prototype = {
    preload: function() {
        this.load.image('preloaderBar', 'img/loading-bar.png');
    },
    create: function() {
        this.input.maxPointers = 1;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.setScreenSize(true);
        this.state.start('Preloader');
    }
};