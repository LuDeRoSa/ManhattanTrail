
Cake.Game = function(game) {
    this._player = null;
    this._cakeGroup = null;
    this._spawnCakeTimer = 0;
    this._fontStyle = null;
    this._cursors = null;
    Cake._scoreText = null;
    Cake._score = 0;
    Cake._health = 0;
};

Cake.Game.prototype = {
    //initialization
    create: function() {
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.physics.arcade.gravity.y = 200;
    
        this.add.sprite(0, 0, 'background');
        this.add.sprite(55, 5, 'score-sign').scale.setTo(.25,.25);
    
        this._player = this.add.sprite(0, 560, 'player');
        this._player.scale.setTo(.2,.2);
    
        this._spawnCakeTimer = 0;
        Cake._health = 10;
    
        this._fontStyle = { font: "40px Arial", fill: "#FFCC00", stroke: "#333", strokeThickness: 5, align: "center" };
        Cake._scoreText = this.add.text(120, 20, "0", this._fontStyle);
    
        this._cakeGroup = this.add.group();
        Cake.item.spawnCake(this);

        
        Cake.player.updateMovement(this);
        
    },
    //manages the main game loop for updates on every frame of the game
    update: function() {
        this._spawnCakeTimer += this.time.elapsed;
        if(this._spawnCakeTimer > 1000) {
            this._spawnCakeTimer = 0;
            Cake.item.spawnCake(this);
        }
        this._cakeGroup.forEach(function(cake){
            cake.angle += cake.rotateMe;
        });
        if(!Cake._health) {
            this.add.sprite((Cake.GAME_WIDTH-594)/2, (Cake.GAME_HEIGHT-271)/2, 'game-over');
            this.game.paused = true;
        }
    }
};

Cake.item = {

    //adds new cake to the game
    spawnCake: function(game) {
        //randomized x-coord to drop the cake from (b/w zero and Canvas width)
        let dropPos = Math.floor(Math.random()*Cake.GAME_WIDTH);

        //array of random y-coordinates to drop the food from 
        let dropOffset = [-27,-36,-38,-48];

        //one of five objects to be dropped (randomly chosen)
        let cakeType = Math.floor(Math.random()*5);
        
        //add food to game
        let cakeOptions = ['cake','cookie','cupcake', 'trashcan', 'fishbone'];
        let cake = game.add.sprite(dropPos, dropOffset[cakeType], cakeOptions[cakeType]);
        cake.scale.setTo(.15,.15);

        //making the cake an "anim" animation, with framerate = 10, and played on loop (so food keeps dropping)
        cake.animations.add('anim', [cakeType], 10, true)

        //start animation
        cake.animations.play('anim');
        
        //enable the cake for the physics engine (so it falls naturally from screen when gravity is set)
        game.physics.enable(cake, Phaser.Physics.ARCADE);
        
        //when cake leaves the screen, remove it
        cake.checkWorldBounds = true;
        cake.events.onOutOfBounds.add(this.removeCake, this);

        //this ensures cake will spin naturally around its own middle axis
        cake.anchor.setTo(0.5, 0.5);
        cake.rotateMe = (Math.random()*4)-2;
        game._cakeGroup.add(cake);
    },

    // clickCake: function(cake){
	// 	// kill the candy when it's clicked
	// 	candy.kill();
	// 	// add points to the score
	// 	Candy._score += 1;
	// 	// update score text
	// 	Candy._scoreText.setText(Candy._score);
	// },

    //removes cake
    removeCake: function(cake) {
        cake.kill();
        Cake._health -= 2;
    }
};

Cake.player = {
    updateMovement: function(game) {

        let player = game.add.sprite(0, Cake.GAME_HEIGHT-390, 'player');
        player.scale.setTo(0.20,0.20);



        // candy.inputEnabled = true;

        // this._cursors = this.input.keyboard.createCursorKeys();
        // Cake.player.updateMovement(this._cursors);

        
        // if (cursors.left.isDown) {
        //      this.setVelocityX(-360);
        // }
        // else if (cursors.right.isDown) {
        //       this.setVelocityX(360);
        // }
        // else {
        //       this.setVelocityX(0);
        // }
    }
}