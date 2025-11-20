class Prey extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame)

        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.points = pointValue
        this.setScale(1.5);

        this.moveSpeed = 200;
        this.body.setVelocity(0, 0);
        this.body.setCollideWorldBounds(true);
        this.body.setImmovable(false);
        
        this.been_eaten = false;

    }

    update() {
        if (this.been_eaten) {
            this.body.setVelocity(0, 0);
            return;
        }
        
        // Change direction randomly every 2 seconds
        if (!this.moveTimer) {
            this.moveTimer = this.scene.time.addEvent({
                delay: 2000,
                callback: this.changeDirection,
                callbackScope: this,
                loop: true
            });
            this.changeDirection();
        }
        
        if (this.body.blocked.left || this.body.blocked.right) {
            this.direction *= -1;
        }
        
        this.body.setVelocityX(this.direction * this.moveSpeed);
    }
    
    stopMoving() {
        this.been_eaten = true;
        this.body.setVelocity(0, 0);
    }
    
    resumeMoving() {
        this.been_eaten = false;
    }

    changeDirection() {
        let randomNumber = Phaser.Math.Between(0, 1);
        if (randomNumber === 0) {
            this.direction = -1; // left
        } else {
            this.direction = 1; // right
        }
    }

    reset() {
        
    }
}