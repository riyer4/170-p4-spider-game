class StaminaBar extends Phaser.GameObjects.GameObject {
    constructor(scene) {
        super(scene);
        scene.add.existing(this);

        //Add Stamina Bar
        this.maxStamina = 200;
        this.stamina = this.maxStamina;
        this.staminaDrainRate = 5;

        this.staminaBarBG = scene.add.rectangle(0, 0, 160, 20, 0x000000).setScrollFactor(0).setOrigin(1, 0);
        this.staminaBar = scene.add.rectangle(0, 0, 158, 18, 0x00ff00).setScrollFactor(0).setOrigin(1, 0);
        this.staminaBarBG.setPosition(scene.cameras.main.width - 10, 10);
        this.staminaBar.setPosition(scene.cameras.main.width - 11, 11);
    }

    update() {
        // Update stamina bar
        this.stamina = Math.max(0, this.stamina - this.staminaDrainRate * this.scene.game.loop.delta / 1000);
        this.staminaBar.width = (this.stamina / this.maxStamina) * 158;

        if (this.stamina <= 0) {
            this.scene.endGame();
        }
    }

    addStamina(val) {
        this.stamina += val;
    }
}