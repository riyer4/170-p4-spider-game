class Spider extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key, frame) {
        super(scene, x, y, key, frame);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(0.3);
        this.growthRate = 0.03;
        this.maxScale = 0.8;

        // set basic physics properties
        this.moveSpeed = 300;
        this.body.setVelocity(0, 0);
        this.body.setCollideWorldBounds(true);
        this.body.setImmovable(true);
        
        this.isEating = false;
        this.isCapturing = false;

        // Variables for capturing and eating fly
        this.currentPrey = null;
        this.flyCaptureDuration = 1000;  // press Z for 1 second to capture the fly
    }

    update() {
        this.moveUpdate();
        this.interactUpdate();
        this.capturingUpdate();
        this.eatingUpdate();
    }

    moveUpdate() {

        if (this.isEating || this.isCapturing) return;

        // movement checking
        let vx = 0;
        let vy = 0;

        if (keyLEFT.isDown) {
            vx = -1;
        } else if (keyRIGHT.isDown) {
            vx = 1;
        }

        if (keyUP.isDown) {
            vy = -1;
        } else if (keyDOWN.isDown) {
            vy = 1;
        }

        let newVelo = new Phaser.Math.Vector2(vx, vy);
        newVelo = newVelo.normalize();

        this.body.setVelocity(newVelo.x * this.moveSpeed, newVelo.y * this.moveSpeed);

        // Enforce circular boundary (I generated this with GPT but the math is straightforward)
        const dx = this.x - this.scene.worldCenterX;
        const dy = this.y - this.scene.worldCenterY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let radius = this.scene.web.radius;

        if (dist > radius) {
            // Compute outward vector (normal)
            const nx = dx / dist;
            const ny = dy / dist;

            // Remove outward component of velocity (keep tangential + inward)
            const dot = this.body.velocity.x * nx +
                        this.body.velocity.y * ny;

            if (dot > 0) {
                // Subtract the outward part only
                this.body.velocity.x -= dot * nx;
                this.body.velocity.y -= dot * ny;
            }
        }
        
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

    interactUpdate() {
        if (Phaser.Input.Keyboard.JustDown(keyINTERACT)) {
            this.scene.interactCheck();
        }
    }

    triggerEating(collidingFly) {
        if (!collidingFly.isCaptured) return;
        this.currentPrey = collidingFly;
        this.startEating();
    }

    triggerCapturing(collidingFly) {
        if (collidingFly.isCaptured) return;
        this.currentPrey = collidingFly;
        this.startCapturing();
    }

    capturingUpdate() {
        if (!this.isCapturing) return;

        if (keyINTERACT.getDuration() >= this.flyCaptureDuration) {
            this.currentPrey.capture();
            this.currentPrey = null;
            this.stopCapturing();
        }

        else if (!keyINTERACT.isDown) {
            this.currentPrey = null;
            this.stopCapturing();
        }
    }

    eatingUpdate() {
        if (!this.isEating) return;

        // If the eating button has been held down longer than the required duration, kill the fly
        if (keyINTERACT.getDuration() >= this.flyCaptureDuration) {
            this.currentPrey.kill();
            this.grow();
            this.currentPrey = null;
            this.stopEating();
        }

        // If the key is not being held down anymore, release the fly
        else if (!keyINTERACT.isDown) {
            this.currentPrey.release();
            this.currentPrey = null;
            this.stopEating();
        }
    }
    
    startCapturing() {
        this.isCapturing = true;
        this.body.setVelocity(0, 0);
        this.anims.play('eat', true);
    }
    
    stopCapturing() {
        this.isCapturing = false;
        this.anims.stop();
        this.setTexture('spider_ud', 0);
    }
    
    startEating() {
        this.isEating = true;
        this.body.setVelocity(0, 0);
        this.anims.play('eat', true);
    }
    
    stopEating() {
        this.isEating = false;
        this.anims.stop();
        this.setTexture('spider_ud', 0);
    }

    grow() {
        let newScale = this.scale + this.growthRate;
        if (newScale <= this.maxScale) {
            this.setScale(newScale);
        } else {
            this.setScale(this.maxScale);
        }
    }

    reset() {

    }
}