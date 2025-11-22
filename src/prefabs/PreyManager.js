class PreyManager extends Phaser.GameObjects.GameObject {
    constructor(scene) {
        super(scene);
        scene.add.existing(this);

        // Create 10 flies at random positions within web range
        this.flies = [];
        for (let i = 0; i < 10; i++) {
            // Generate random position within web circle
            let angle = Phaser.Math.FloatBetween(0, Math.PI * 2);
            let distance = Phaser.Math.FloatBetween(0, scene.web.radius * 0.8); // keep flies within web range, like, it won't spawn on the edge of the web.
            let randomX = scene.worldCenterX + Math.cos(angle) * distance;
            let randomY = scene.worldCenterY + Math.sin(angle) * distance;

            let fly = new Prey(scene, randomX, randomY, 'fly', 0, 10);
            this.flies.push(fly);
        }
    }

    update() {

        if (this.flies.length === 0) {
            this.scene.endGame();
            return;
        }

        // Update all flies
        for (let i = 0; i < this.flies.length; i++) {
            this.flies[i].update();
        }
    }

    killFly(fly) {
        // Remove the fly from the array
        let index = this.flies.indexOf(fly);
        if (index > -1) {
            fly.destroy();
            this.flies.splice(index, 1);
            this.scene.addScore(fly.points);
            this.scene.staminaBar.addStamina(10);
        }
    }

    checkCollision(other) {
        for (let i = 0; i < this.flies.length; i++) {
            if (this.scene.physics.overlap(other, this.flies[i])) {
                return this.flies[i];
            }
        }
    }
}