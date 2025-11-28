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
        
        this.isHeld = false;
        this.isCaptured = false;
        this.isActive = false;
        this.isEscaping = false;

        this.captureTime = 0;
        this.escape_time = 8000;

        this.lifetime = 8000; // Actual values set in the spawn function, not here in the constructor
        this.escapeSpeed = 500;
        
        // Store spawn position for struggle range
        this.spawnX = x;
        this.spawnY = y;
        this.struggleRange = 20;
        
        // Target position within struggle range
        this.targetX = x;
        this.targetY = y;
    }

    spawn(x, y) {
        this.x = x;
        this.y = y;
        this.spawnX = x;
        this.spawnY = y;
        this.targetX = x;
        this.targetY = y;

        this.isHeld = false;
        this.isCaptured = false;
        this.isEscaping = false;

        this.lifetime = 8000;
        this.escape_time = Phaser.Math.Between(2000, 6000);
        this.captureTime = 0;
    }

    update() {
        if (!this.isActive) {
            return;
        }

        // Fly runs away from web
        if (this.isEscaping) {
            this.anims.play('fly_move', true);
            const screenWidth = this.scene.cameras.main.width;
            const screenHeight = this.scene.cameras.main.height;
            
            if (this.x > screenWidth || this.y > screenHeight) {
                this.kill(false);
            }
            return;
        }

        if (this.isCaptured) {
            let currentTime = this.scene.time.now;
            if (currentTime - this.captureTime >= this.escape_time) {
                this.escape();
            }
            return;
        }

        // Do not move if the player is currently eating or capturing this fly
        if (this.isHeld) {
            this.body.setVelocity(0, 0);
            return;
        }
        
        this.anims.play('fly_move', true);
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

        // When lifetime expires, fly tries to escape
        this.lifetime -= this.scene.game.loop.delta;
        if (this.lifetime <= 0) {
            this.startEscaping();
        }
    }
    
    capture() {
        this.isCaptured = true;
        this.captureTime = this.scene.time.now;
        this.body.setVelocity(0, 0);
        this.anims.play('fly_been_captured', true);
    }

    // Set by the spider if the spider is currently eating or capturing the fly
    setHeld(val) {
        this.isHeld = val;
    }
    
    escape() {
        this.isCaptured = false;
        this.captureTime = 0;
        this.anims.play('fly_move', true);
    }

    setNewTarget() {
        if (!this.isActive) return;

        // Set a new random target position within struggle range
        let angle = Phaser.Math.FloatBetween(0, Math.PI * 2);
        let distance = Phaser.Math.FloatBetween(0, this.struggleRange);
        this.targetX = this.spawnX + Math.cos(angle) * distance;
        this.targetY = this.spawnY + Math.sin(angle) * distance;
    }

    startEscaping() {
        this.isEscaping = true;
        
        if (this.moveTimer) {
            this.moveTimer.remove();
            this.moveTimer = null;
        }
        
        const directions = [
            { x: 0, y: -1 },  // up
            { x: 0, y: 1 },   // down
            { x: -1, y: 0 },  // left
            { x: 1, y: 0 }    // right
        ];
        
        const direction = directions[Phaser.Math.Between(0, directions.length - 1)];
        this.body.setVelocity(direction.x * this.escapeSpeed, direction.y * this.escapeSpeed);
        this.body.setCollideWorldBounds(false);
    }

    kill(wasEaten) {
        this.scene.preyManager.killPrey(this, wasEaten);
    }

    setActive(newActive) {
        this.visible = newActive;
        this.body.enable = newActive;
        this.birthTime = this.scene.time.now;

        this.isActive = newActive;
    }
}