import Phaser from 'phaser'

Cake.MainMenu = function(game) {};
Cake.MainMenu.prototype = {
    create: function() {
        this.add.sprite(0, 0, 'background');
        this.add.sprite(-130, Cake.GAME_HEIGHT-514, 'player');
        this.add.button(Cake.GAME_WIDTH-401-10, Cake.GAME_HEIGHT-143-10,
            'start-button', this.startGame, this);
    },

    //starts game when user clicks start button
    startGame: function() {
        this.state.start('Game');
    }
};