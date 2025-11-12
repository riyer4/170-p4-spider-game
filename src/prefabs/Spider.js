class Spider extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key, frame) {
        super(scene, x, y, key, frame)

        scene.add.existing(this)
        scene.physics.add.existing(this)

    }

    update() {

        
    }

    reset() {

        
    }
}