
Cake.MainMenu = function(game) {};
Cake.MainMenu.prototype = {
    create: function() {
        this.add.sprite(0, 0, 'background');
        
        this.add.button(Cake.GAME_WIDTH/2-230, Cake.GAME_HEIGHT-900,
            'start-button', this.startGame, this);
    },

    //starts game when user clicks start button
    startGame: function() {
        this.state.start('Game');
    }
};