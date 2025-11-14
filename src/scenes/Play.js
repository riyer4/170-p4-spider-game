

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
        this.spider = new Spider(this, centerX, centerY, 'spider', 0)

        //keys 
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)

        this.gameOver = false

        //Setup camera to follow the spider
        this.cameras.main.startFollow(this.spider)
        this.cameras.main.setBounds(0, 0, this.map.displayWidth, this.map.displayHeight)
        this.physics.world.setBounds(0, 0, this.map.displayWidth, this.map.displayHeight)
    }

    update() {

        if (Phaser.Input.Keyboard.JustDown(keyMENU)) {

            this.scene.start('menuScene')    
        }

        if(!this.gameOver){
            this.spider.update()
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