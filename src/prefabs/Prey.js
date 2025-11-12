class Prey extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame)

        scene.add.existing(this)
        this.points = pointValue


    }

    update() {

    }

    reset() {
        
    }
}