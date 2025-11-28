
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

        this.physics.world.setBounds(0, 0, this.worldWidth, this.worldHeight)
    }

    update() {

        if (Phaser.Input.Keyboard.JustDown(keyMENU)) {
            this.scene.start('menuScene')    
        }

        this.staminaBar.update();

        if(!this.gameOver){
            this.spider.update()
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