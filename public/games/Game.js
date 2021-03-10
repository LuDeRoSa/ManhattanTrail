
Cake.Game = function(game) {
    this._player = null;
    this._cakeGroup = null;
    this._spawnCakeTimer = 0;
    this._fontStyle = null;
    this._cursors = null;
    this._cake=null;
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
        
        //player setup
        this._player = this.add.sprite(0, 560, 'player');
        this._player.scale.setTo(.2,.2);
        this.physics.arcade.enable(this._player)
        this._player.body.velocity.x = 0;
        this._player.body.allowGravity = false;
        this._player.body.collideWorldBounds = true;
        this._player.body.immovable = true;

        //enabling keys to navigate player
        this._cursors = this.input.keyboard.createCursorKeys();

        this._spawnCakeTimer = 0;
        Cake._health = 6;
    
        this._fontStyle = { font: "40px Arial", fill: "#FFCC00", stroke: "#333", strokeThickness: 5, align: "center" };
        Cake._scoreText = this.add.text(120, 20, "0", this._fontStyle);
    
        this._cakeGroup = this.add.group();
        Cake.item.spawnCake(this);

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
        if(!Cake._health || Cake._score < 0) {
            this.add.sprite((Cake.GAME_WIDTH-500)/2, (Cake.GAME_HEIGHT-500)/2, 'game-over').scale.setTo(.4,.4);
            this.game.paused = true;
        }

        this.physics.arcade.collide(this._player, this._cakeGroup, this.collisionHandler, null, this);

        //  Reset the players velocity (movement)
        // Navigate player based on cursor keys
        this._player.body.velocity.x = 0;
        if (this._cursors.left.isDown)
        {
            //  Move to the left
            this._player.body.velocity.x = -250;
        }
        else if (this._cursors.right.isDown)
        {
            //  Move to the right
            this._player.body.velocity.x = 250;
        }
        else
        {
            //  Stand still
            this._player.body.velocity.x = 0;
        }

    },

    collisionHandler: function(spriteOne, spriteTwo) {
        // Remove the cake
        spriteTwo.kill();

        //update score based on food type
        if(spriteTwo.key  === 'trashcan' || spriteTwo.key === 'fishbone') {
            Cake._score -= 3; 
        } else {
            Cake._score += 2;
        }
        Cake._scoreText.setText(Cake._score);
    }

};

Cake.item = {

    //adds new cake to the game
    spawnCake: function(game) {
        //randomized x-coord to drop the cake from (b/w zero and Canvas width)
        let dropPos = Math.floor(Math.random()*Cake.GAME_WIDTH);

        //array of random y-coordinates to drop the food from 
        let dropOffset = [-27,-36,-38,-48];

        //add food to game
        let cakeOptions = ['cake','cookie','cupcake', 'trashcan', 'fishbone'];

        //one of five objects to be dropped (randomly chosen)
        let cakeType = Math.floor(Math.random()*cakeOptions.length);
        
        
        let cake = game.add.sprite(dropPos, dropOffset[cakeType], cakeOptions[cakeType]);
        cake.scale.setTo(.15,.15);
        
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

    //removes cake and decreases health (because player didn't get it)
    removeCake: function(cake) {
        cake.kill();

        //if good food dropped, decrease health (can drop 3 before game mover)
        if (cake.key === 'cake' || cake.key === 'cookie' || cake.key === 'cupcake') {
            Cake._health -= 2;
        }
        
    },
};
