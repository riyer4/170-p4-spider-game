class PreyManager extends Phaser.GameObjects.GameObject {
    constructor(scene) {
        super(scene);
        scene.add.existing(this);

        // Create 10 flies at random positions
        this.flies = [];
        for (let i = 0; i < 10; i++) {
            let randomX = Phaser.Math.Between(50, scene.worldWidth - 50);
            let randomY = Phaser.Math.Between(50, scene.worldHeight - 50);

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