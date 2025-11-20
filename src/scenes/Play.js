

class Play extends Phaser.Scene {
    constructor () {
        super("playScene")

    }

    create() {
            //map
            this.map = this.add.image(0, 0, 'frog').setOrigin(0).setScale(2)

        keyMENU = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)

        this.p1Score = 0

        //adding spider ex)
        this.spider = new Spider(this, centerX, centerY, 'spider_ud', 0)

        //keys 
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        keyEAT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J)

        this.gameOver = false
        
        // Variables for eating fly
        this.currentPrey = null;
        this.eatingStartTime = 0;
        this.eating_fly = 1000;  // press j for 1 second to eat the fly

        //Setup camera to follow the spider
        this.cameras.main.startFollow(this.spider)
        this.cameras.main.setBounds(0, 0, this.map.displayWidth, this.map.displayHeight)
        this.physics.world.setBounds(0, 0, this.map.displayWidth, this.map.displayHeight)

        // Create 10 flies at random positions
        this.flies = [];
        for (let i = 0; i < 10; i++) {
            let randomX = Phaser.Math.Between(50, this.map.displayWidth - 50);
            let randomY = Phaser.Math.Between(50, this.map.displayHeight - 50);
            let fly = new Prey(this, randomX, randomY, 'fly', 0, 10);
            this.flies.push(fly);
        }
    }

    update() {

        if (Phaser.Input.Keyboard.JustDown(keyMENU)) {

            this.scene.start('menuScene')    
        }
        if (this.flies.length === 0) {
            this.scene.start('endScene')
        }

        if(!this.gameOver){
            this.spider.update()
            this.handleFlyEating()
            
            // Update all flies
            for (let i = 0; i < this.flies.length; i++) {
                this.flies[i].update();
            }
        }
    }

    handleFlyEating() {
        // Check for collision with flies
        let collidingFly = null;
        for (let i = 0; i < this.flies.length; i++) {
            if (this.checkCollision(this.spider, this.flies[i])) {
                collidingFly = this.flies[i];
                break;
            }
        }
        
        // Handle eating logic
        if (collidingFly && keyEAT.isDown) {
            // If this is a new fly being eaten, start the timer
            if (this.currentPrey !== collidingFly) {
                this.currentPrey = collidingFly;
                this.eatingStartTime = this.time.now;
                collidingFly.stopMoving();
                this.spider.play_eating();
            }
            
            // Check if we've held J for 1 second
            if (this.time.now - this.eatingStartTime >= this.eating_fly) {
                // Remove the fly from the array
                let index = this.flies.indexOf(collidingFly);
                if (index > -1) {
                    collidingFly.destroy();
                    this.flies.splice(index, 1);
                    this.p1Score += collidingFly.points;
                    console.log("fly eaten! score: " + this.p1Score);
                }
                this.currentPrey = null;
                this.spider.stop_eating();
            }
        } else {
            if (this.currentPrey) {
                this.currentPrey.resumeMoving();
                this.currentPrey = null;
                this.spider.stop_eating();
            }
        }
    }

    checkCollision(spider, prey) {
        return this.physics.overlap(spider, prey);
    }

}