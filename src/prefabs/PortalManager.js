class PortalManager extends Phaser.GameObjects.GameObject {
    constructor(scene) {
        super(scene);
        this.scene = scene;
        scene.add.existing(this);

        this.balls = [];
        this.ballSpawnchance = 0.00001;

        this.portalHoldDuration = 1000; // ms required to enter minigame
        this.portalHoldStart = null;
        this.activePortal = null;

        for (let i = 0; i < 3; i++) { 
            let angle = Phaser.Math.FloatBetween(0, Math.PI * 2);
            let distance = Phaser.Math.FloatBetween(0, this.scene.web.radius);
            
            let x = this.scene.worldCenterX + Math.cos(angle) * distance;
            let y = this.scene.worldCenterY + Math.sin(angle) * distance;

            let ballSprite = scene.physics.add.sprite(x, y, 'portal');
            ballSprite.setScale(1.1);
            ballSprite.setImmovable(true);

            //Store each ball with a 'launched' flag to prevent multiple triggers
            this.balls.push({
                sprite: ballSprite,
                launched: false
            });
        }
    }

    checkSpiderCollision(spider) {
        //Return the first ball hit that has not already launched the minigame
        for (let ballData of this.balls) {
            if (!ballData.launched &&
                ballData.sprite &&
                ballData.sprite.active &&
                ballData.sprite.body &&
                this.scene.time.now > (spider.minigameSafeUntil || 0) &&
                Phaser.Geom.Intersects.RectangleToRectangle(spider.getBounds(), ballData.sprite.getBounds())
            ) {
                return ballData;
            }
        }
        return null;
    }

    update(spider) {
        let hitBallData = this.checkSpiderCollision(spider);
        if (hitBallData) {
            this.handlePortalHold(hitBallData);
        } else {
            this.resetPortalHold();
        }

        //Spawn logic for inactive portals
        let randVal = Phaser.Math.FloatBetween(0, 1);
        if (randVal < this.ballSpawnchance * this.scene.web.radius) {
            this.spawnBall();
        }
    }

    handlePortalHold(ballData) {
        this.activePortal = ballData;

        if (keyINTERACT.isDown) {
            if (this.portalHoldStart === null) {
                this.portalHoldStart = this.scene.time.now;
                this.scene.spider.startCapturing();
            }

            if (keyINTERACT.getDuration() >= this.portalHoldDuration) {
                this.launchMinigame(ballData);
            }
        } else {
            this.scene.spider.stopCapturing();
            this.portalHoldStart = null;
        }
    }

    resetPortalHold() {
        if (this.activePortal) {
            this.scene.spider.stopCapturing();
        }
        this.activePortal = null;
        this.portalHoldStart = null;
    }

    launchMinigame(ballData) {
        this.scene.spider.stopCapturing();

        // Prevent re-trigger
        this.portalHoldStart = null;
        this.activePortal = null;
        ballData.launched = true;

        // Disable and hide the portal instead of destroying so it can respawn later
        ballData.sprite.disableBody(true, true);

        // Pause play scene and launch one of the minigames
        this.scene.scene.pause('playScene'); 
        if (Math.random() < 0.5) {
            this.scene.scene.launch('minigameScene');
        } else {
            this.scene.scene.launch('platformerMinigame');
        }
    }

    spawnBall() {
        for (let ballData of this.balls) {
            if (!ballData.sprite.active) {
                // Generate random position within web radius
                let angle = Phaser.Math.FloatBetween(0, Math.PI * 2);
                let distance = Phaser.Math.FloatBetween(0, this.scene.web.radius);
                
                let x = this.scene.worldCenterX + Math.cos(angle) * distance;
                let y = this.scene.worldCenterY + Math.sin(angle) * distance;

                ballData.sprite.enableBody(true, x, y, true, true);
                ballData.sprite.setPosition(x, y);
                ballData.sprite.setActive(true);
                ballData.sprite.setVisible(true);
                ballData.sprite.setImmovable(true);
                ballData.launched = false;
                return;
            }
        }
    }
}