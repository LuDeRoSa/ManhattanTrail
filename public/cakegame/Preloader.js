
Cake.Preloader = function(game) {
    Cake.GAME_WIDTH = 1200;
    Cake.GAME_HEIGHT = 950;
};

Cake.Preloader.prototype = {
    preload: function() {
        
    },
    create: function() {
        this.state.start('MainMenu');
    }
};