class Web extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key, frame) {
        super(scene, x, y, key, frame);

        scene.add.existing(this);

        this.radius = 300;
        this.growthStep = 100;

        this.setDisplaySize(this.radius * 2, this.radius * 2);
    }
    
    play_eating() {
        this.isEating = true;
        this.anims.play('eat', true);
    }
    
    stop_eating() {
        this.isEating = false;
        this.anims.stop();
        this.setTexture('spider_ud', 0);
    }

    reset() {

    }

    grow() {
        this.radius += this.growthStep;
        this.setDisplaySize(this.radius * 2, this.radius * 2);
    }
}