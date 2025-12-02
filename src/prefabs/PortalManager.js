class PortalManager extends Phaser.GameObjects.GameObject {
    constructor(scene) {
        super(scene);
        this.scene = scene;
        scene.add.existing(this);

        this.balls = [];
        this.ballSpawnchance = 0.00001;

        for (let i = 0; i < 3; i++) { 
            let angle = Phaser.Math.FloatBetween(0, Math.PI * 2);
            let minDistance = this.scene.web.radius * 0.9;
            let maxDistance = this.scene.web.radius * 0.99;
            let distance = Phaser.Math.FloatBetween(minDistance, maxDistance);
            
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
                Phaser.Geom.Intersects.RectangleToRectangle(spider.getBounds(), ballData.sprite.getBounds())
            ) {
                ballData.launched = true; //Mark this ball as triggered
                return ballData.sprite;
            }
        }
        return null;
    }

    update(spider) {
        let hitBall = this.checkSpiderCollision(spider);
        if (hitBall) {
            hitBall.destroy(); 
            this.scene.captureSound.play();
            this.scene.scene.pause('playScene'); 
            this.scene.scene.launch('minigameScene');
            return;
        }

        //Spawn logic for inactive portals
        let randVal = Phaser.Math.FloatBetween(0, 1);
        if (randVal < this.ballSpawnchance * this.scene.web.radius) {
            this.spawnBall();
        }
    }

    spawnBall() {
        for (let ballData of this.balls) {
            if (!ballData.sprite.active) {
                let angle = Phaser.Math.FloatBetween(0, Math.PI * 2);
                let distance = Phaser.Math.FloatBetween(0, this.scene.web.radius * 0.8);

                let x = this.scene.worldCenterX + Math.cos(angle) * distance;
                let y = this.scene.worldCenterY + Math.sin(angle) * distance;

                ballData.sprite.setPosition(x, y);
                ballData.sprite.setActive(true);
                ballData.sprite.setVisible(true);
                ballData.launched = false;
                return;
            }
        }
    }
}



