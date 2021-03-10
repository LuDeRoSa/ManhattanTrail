//global object for game
let Cake = {};

//Boot() is used in index.html, and receives game object, which is also created in index.html
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