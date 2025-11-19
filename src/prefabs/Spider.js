class Spider extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key, frame) {
        super(scene, x, y, key, frame);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(0.5);

        // set basic physics properties
        this.moveSpeed = 300;
        this.body.setVelocity(0, 0);
        this.body.setCollideWorldBounds(true);
        this.body.setImmovable(true);
    }

    update() {
        // diagonal movement checking
        let vx = 0;
        let vy = 0;

        if (keyLEFT.isDown) {
            vx = -this.moveSpeed;
        } else if (keyRIGHT.isDown) {
            vx = this.moveSpeed;
        }

        if (keyUP.isDown) {
            vy = -this.moveSpeed;
        } else if (keyDOWN.isDown) {
            vy = this.moveSpeed;
        }

        this.body.setVelocityX(vx);
        this.body.setVelocityY(vy);

        // check for movement
        const moving = (vx !== 0) || (vy !== 0);

        if (moving) {
            let animKey = null;
            if (vx < 0) animKey = 'moveLeft';
            else if (vx > 0) animKey = 'moveRight';
            else if (vy < 0) animKey = 'moveUp';
            else if (vy > 0) animKey = 'moveDown';

            if (animKey) {
                this.anims.play(animKey, true);
            }
        } else {
            // idle frame plays when movement stops
            this.anims.stop();
            this.setTexture('spider_ud', 0);
        }
    }

    reset() {

    }
}