class Spider extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key, frame) {
        super(scene, x, y, key, frame)

        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.setScale(3)

        //set basic physics properties
        this.moveSpeed = 300;
        this.body.setVelocity(0, 0);
        this.body.setCollideWorldBounds(true);
        this.body.setImmovable(true);

    }

    update() {
        //Handle left movement
        if(keyLEFT.isDown){
            this.body.setVelocityX(-this.moveSpeed);
            this.anims.play('moveLeft', true);
        }
        //Handle right movement
        else if(keyRIGHT.isDown){
            this.body.setVelocityX(this.moveSpeed);
            this.anims.play('moveRight', true);
        }
        else {
            this.body.setVelocityX(0);
        }
        
        //Handle up movement
        if(keyUP.isDown){
            this.body.setVelocityY(-this.moveSpeed);
            this.anims.play('moveUp', true);
        }
        //Handle down movement
        else if(keyDOWN.isDown){
            this.body.setVelocityY(this.moveSpeed);
            this.anims.play('moveDown', true);
        }
        else {
            this.body.setVelocityY(0);
        }
    }

    reset() {

        
    }
}