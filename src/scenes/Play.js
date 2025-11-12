

class Play extends Phaser.Scene {
    constructor () {
        super("playScene")

    }

    create() {

        keyMENU = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)

        this.p1Score = 0

        //adding spider ex)
        //this.spider = new Spider(this, 0, 180, 'larryIdle', 0).setOrigin(0, 0).setScale(2.2).setDepth(2)

        //keys 
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)

        this.gameOver = false

    }

    update() {

        if (Phaser.Input.Keyboard.JustDown(keyMENU)) {

            this.scene.start('menuScene')    
        }
    }

    checkCollision(spider, prey) {

        if (spider.x < prey.x + prey.width && 
            spider.x + spider.width > prey.x && 
            spider.y < prey.y + prey.height && 
            spider.height + spider.y > prey.y) {
            return true
        } else {
            return false
        }
    }

}