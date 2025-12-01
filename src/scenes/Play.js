
class Play extends Phaser.Scene {
    constructor () {
        super("playScene")

        this.worldWidth = 1000;
        this.worldHeight = 1000;
        this.worldCenterX = this.worldWidth / 2;
        this.worldCenterY = this.worldHeight / 2;
    }

    create() {
        
        // Background map
        this.map = this.add.image(0, 0, 'blue_square').setOrigin(0).setScale(50);

        this.score = 0;
        this.gameOver = false;

        this.eatingSound = this.sound.add('eating', { volume: 1, loop: false });
        this.captureSound = this.sound.add('capture', { volume: 1, loop: false });

        this.web = new Web(this, this.worldCenterX, this.worldCenterY, 'web', 0);
        this.preyManager = new PreyManager(this);
        this.spider = new Spider(this, this.worldCenterX, this.worldCenterY, 'spider_ud', 0);
        this.staminaBar = new StaminaBar(this);

        // Keys 
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyINTERACT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        keyMENU = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);

        // Setup camera to follow the spider
        this.cameras.main.startFollow(this.spider)
        this.cameras.main.setBounds(0, 0, this.worldWidth, this.worldHeight)

        //Add Stamina Bar
        this.maxStamina = 100;
        this.stamina = this.maxStamina;
        this.staminaBarBG = this.add.rectangle(0, 0, 160, 20, 0x000000).setScrollFactor(0).setOrigin(1, 0);
        this.staminaBar = this.add.rectangle(0, 0, 158, 18, 0x00ff00).setScrollFactor(0).setOrigin(1, 0);
        this.staminaBarBG.setPosition(this.cameras.main.width - 10, 10);
        this.staminaBar.setPosition(this.cameras.main.width - 11, 11);
        this.staminaDrainRate = 5;

        //Add Balls
        this.balls = [];
        for (let i = 0; i < 3; i++) { 
            let ballX = Phaser.Math.Between(50, this.map.displayWidth - 50);
            let ballY = Phaser.Math.Between(50, this.map.displayHeight - 50);
            let ball = this.physics.add.sprite(ballX, ballY, 'portal'); 
            ball.setScale(1.1);
            ball.setImmovable(true); 
            this.balls.push(ball);
        }
        this.physics.world.setBounds(0, 0, this.worldWidth, this.worldHeight)
    }

    update() {

        if (Phaser.Input.Keyboard.JustDown(keyMENU)) {
            this.scene.start('menuScene')    
        }

        this.staminaBar.update();

        if(!this.gameOver){
            this.spider.update()
            this.handleFlyEating()
            this.handleBallCollision();
            // Update all flies
            for (let i = 0; i < this.flies.length; i++) {
                this.flies[i].update();
            }

            // Update stamina bar
            this.stamina = Math.max(0, this.stamina - this.staminaDrainRate * this.game.loop.delta / 1000);
            this.staminaBar.width = (this.stamina / this.maxStamina) * 158;
            this.preyManager.update();
        }
    }

    endGame() {
        this.gameOver = true;
        this.scene.start('endScene');
    }

    interactCheck() {
        let prey = this.preyManager.checkCollision(this.spider);
        if (prey) {
            if (prey.isCaptured) {
                this.spider.triggerEating(prey);
            } else {
                this.spider.triggerCapturing(prey);
            }
        }
    }

    growWeb() {
        this.web.grow();
    }

    handleBallCollision() {
    let collidingBall = null;
    for (let ball of this.balls) {
        if (this.checkCollision(this.spider, ball)) {
            collidingBall = ball;
            break;
        }
    }

        if (collidingBall) {
            collidingBall.destroy();
            this.scene.pause(); 
            this.scene.launch('MiniGameScene');
        }
    }

    startMinigame() {
        this.scene.sleep();
        this.scene.launch('minigameScene');
        let minigameScene = this.scene.get('minigameScene');
        minigameScene.setStamina(stamina);
    }

    addScore(val) {
        this.score += val;
        console.log("New score: " + this.score);
    }
}