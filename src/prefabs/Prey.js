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
        
        // Store spawn position for struggle range
        this.spawnX = x;
        this.spawnY = y;
        this.struggleRange = 20;
        
        // Target position within struggle range
        this.targetX = x;
        this.targetY = y;
    }

    update() {
        if (this.been_eaten) {
            this.body.setVelocity(0, 0);
            return;
        }
        
        // Change target position randomly within struggle range every 1-2 seconds
        if (!this.moveTimer) {
            this.moveTimer = this.scene.time.addEvent({
                delay: Phaser.Math.Between(1000, 2000),
                callback: this.setNewTarget,
                callbackScope: this,
                loop: true
            });
            this.setNewTarget();
        }
        
        // Move towards target position
        let dx = this.targetX - this.x;
        let dy = this.targetY - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 5) {
            // Normalize direction and set velocity
            let vx = (dx / distance) * this.moveSpeed;
            let vy = (dy / distance) * this.moveSpeed;
            this.body.setVelocity(vx, vy);
        } else {
            // Reached target, stop moving
            this.body.setVelocity(0, 0);
        }
    }
    
    capture() {
        this.been_eaten = true;
        this.body.setVelocity(0, 0);
    }
    
    release() {
        this.been_eaten = false;
    }

    setNewTarget() {
        // Set a new random target position within struggle range
        let angle = Phaser.Math.FloatBetween(0, Math.PI * 2);
        let distance = Phaser.Math.FloatBetween(0, this.struggleRange);
        this.targetX = this.spawnX + Math.cos(angle) * distance;
        this.targetY = this.spawnY + Math.sin(angle) * distance;
    }

    kill() {
        this.scene.preyManager.killFly(this);
    }

    reset() {
        
    }
}