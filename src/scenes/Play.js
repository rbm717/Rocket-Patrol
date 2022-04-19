class Play extends Phaser.Scene {
    constructor() {
      super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('spaceship_small', './assets/SpaceshipSmall.png');
        this.load.image('starfield', './assets/starfield.png');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }
    
    create() {
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        //Player 2 key definititions
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
        //add rocket  (p2)
        this.p2Rocket = new Rocket_P2(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);
        this.ship04 = new Spaceship(this, game.config.width, borderUISize*9, 'spaceship_small', 0, 50).setOrigin(0,0);
        this.ship04.setScale(.1);
        this.ship04.width /= 10;
        this.ship04.height /= 10;
        this.ship04.moveSpeed++;
        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });
        // initialize score
        this.p1Score = 0;
        this.p2Score = 0;
        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        let scoreConfig2 = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        this.scoreRight = this.add.text(game.config.width - borderUISize*4 - borderPadding, borderUISize + borderPadding*2, this.p2Score, scoreConfig2);
        // Initialize clock
        this.timeRemaining = game.settings.gameTimer/1000;
        this.timeElapsed = 0;
        // Display clock
        let clockConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.timeLeft = this.add.text(game.config.width/2 - borderPadding*5, borderUISize + borderPadding*2, this.timeRemaining, clockConfig);
        this.timer = 0;
        // GAME OVER flag
        this.gameOver = false;
    }

    update(time, delta, scoreConfig) {
        // Updates clock every second
        this.timer += delta;
        while (this.timer > 1000 && this.timeRemaining > 0) {
            this.timeRemaining -= 1;
            this.timeElapsed += 1;
            this.timer -= 1000;
        }
        // Ends game when timer hits 0
        if(this.timeElapsed*1000 >= game.settings.gameTimer){
            let scoreConfig = {
                fontFamily: 'Courier',
                fontSize: '28px',
                backgroundColor: '#F3B141',
                color: '#843605',
                align: 'right',
                padding: {
                    top: 5,
                    bottom: 5,
                },
                fixedWidth: 100
            }
            scoreConfig.fixedWidth = 0;
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 
              'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }
         // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        //Updates background
        this.starfield.tilePositionX -= 4;
        if (!this.gameOver) {
            // updates rockets
            this.p1Rocket.update();
            this.p2Rocket.update();
            // update spaceships (x3)
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
            this.ship04.update();
        }
        //this.input.on('pointerdown', this.p2Rocket.onRocketClick());
        if(this.p2Rocket.isFiring == false){
            this.input.on('pointerdown',() => {this.p2Rocket.onRocketClick()});
        }
        // check collisions for player 1
        if (this.checkCollision(this.p1Rocket, this.ship04)) {
            console.log('kaboom ship 01');
            this.p1Rocket.reset();
            this.p1Score += this.ship04.getPoints();
            this.shipExplode(this.ship04);
        }
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            console.log('kaboom ship 03');
            this.p1Rocket.reset();
            this.p1Score += this.ship03.getPoints();
            this.shipExplode(this.ship03);
            console.log(this.ship03.getPoints());
            console.log('hehehe');
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            console.log('kaboom ship 02');
            this.p1Rocket.reset();
            this.p1Score += this.ship02.getPoints();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            console.log('kaboom ship 01');
            this.p1Rocket.reset();
            this.p1Score += this.ship01.getPoints();
            this.shipExplode(this.ship01);
        }
        // check collisions for player 2
        if (this.checkCollision(this.p2Rocket, this.ship04)) {
            console.log('kaboom ship 01');
            this.p2Rocket.reset();
            this.p2Score += this.ship04.getPoints();
            this.shipExplode(this.ship04);
        }
        if(this.checkCollision(this.p2Rocket, this.ship03)) {
            console.log('kaboom ship 03');
            this.p2Rocket.reset();
            this.p2Score += this.ship03.getPoints();
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p2Rocket, this.ship02)) {
            console.log('kaboom ship 02');
            this.p2Rocket.reset();
            this.p2Score += this.ship02.getPoints();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p2Rocket, this.ship01)) {
            console.log('kaboom ship 01');
            this.p2Rocket.reset();
            this.p2Score += this.ship01.getPoints();
            this.shipExplode(this.ship01);
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        this.timeLeft.text = this.timeRemaining;
    }

    checkCollision(rocket, ship){
        //simple AABB checking
        if(rocket.x < ship.x + ship.width &&
           rocket.x + rocket.width > ship.x &&
           rocket.y < ship.y + ship.height &&
           rocket.y + rocket.height > ship.y){
               return true;
           }else{
               return false;
           }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
          ship.reset();                         // reset ship position
          ship.alpha = 1;                       // make ship visible again
          boom.destroy();                       // remove explosion sprite
        });
        // repaint and play explosion sound
        this.scoreLeft.text = this.p1Score;
        this.scoreRight.text = this.p2Score;
        this.sound.play('sfx_explosion'); 
        //Rewards players with extra time for killing a ship
        this.timeRemaining++;
        this.timeElapsed--;   
    }
}