class MiniGame extends Phaser.Scene {
    constructor() {
        super("MiniGameScene");
    }

    create() {
        this.add.rectangle(400, 400, 800, 800, 0);

        //Slingshot pos
        this.restX = 150;
        this.restY = 700;

        this.ball = this.physics.add.sprite(this.restX, this.restY, 'ball').setScale(1.3);
        this.ball.setCollideWorldBounds(true);
        this.ball.setBounce(0.6);
        this.ball.body.setGravityY(0); //No gravity until shot
        this.ball.setImmovable(true); //Ball stays in place before shot

        //Add Cups 
        this.cups = this.physics.add.staticGroup();
        for (let i = 0; i < 5; i++) {
            let cup = this.cups.create(600 + i * 60, 700 - i * 20, 'cup').setScale(0.5).refreshBody();
        }

        this.dragging = false;
        this.shot = false;

        this.input.on('pointerdown', pointer => {
            if (!this.shot) {
                //Check if pointer is near the ball
                const distance = Phaser.Math.Distance.Between(pointer.x, pointer.y, this.ball.x, this.ball.y);
                if (distance < 50) { 
                    this.dragging = true;
                }
            }
        });

        this.input.on('pointermove', pointer => {
            if (this.dragging) {
                // Drag the ball, but limit max distance from rest point
                const maxDistance = 150;
                let angle = Phaser.Math.Angle.Between(this.restX, this.restY, pointer.x, pointer.y);
                let distance = Phaser.Math.Distance.Between(this.restX, this.restY, pointer.x, pointer.y);
                distance = Phaser.Math.Clamp(distance, 0, maxDistance);

                this.ball.x = this.restX + Math.cos(angle) * distance;
                this.ball.y = this.restY + Math.sin(angle) * distance;
            }
        });

        this.input.on('pointerup', pointer => {
            if (this.dragging && !this.shot) {
                this.dragging = false;
                this.shot = true;

                //Enable gravity and make ball movable
                this.ball.body.setGravityY(600);
                this.ball.setImmovable(false);

                //Launch the ball based on distance from rest point
                const dx = this.restX - this.ball.x;
                const dy = this.restY - this.ball.y;
                this.ball.setVelocity(dx * 5.3, dy * 5.3); 
            }
        });

        //Cup hit detection
        this.physics.add.overlap(this.ball, this.cups, (ball, cup) => {
            cup.destroy();
            this.scene.stop('MiniGameScene');
            this.scene.resume('playScene');
        });
    }

    update() {
        if (this.shot && (this.ball.body.speed < 200 || this.ball.y > 800 || this.ball.x > 800 || this.ball.x < 0)) {
                this.scene.stop('MiniGameScene');
                this.scene.resume('playScene');
        }
    }
}