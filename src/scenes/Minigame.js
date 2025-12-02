class Minigame extends Phaser.Scene {
    constructor() {
        super("minigameScene");
    }

    create() {
        this.add.rectangle(400, 400, 800, 800, 0x000000);
        this.add.image(400, 400, 'minigame_bg').setScale(6.0);
        this.add.image(400, 400, 'holes').setScale(6.0);

        //Slingshot pos
        this.restX = 150;
        this.restY = 550;

        this.ball = this.physics.add.sprite(this.restX, this.restY, 'ball').setScale(1.0);
        this.ball.setCollideWorldBounds(true);
        this.ball.setBounce(0.6);
        this.ball.body.setGravityY(0); //No gravity until shot
        this.ball.setImmovable(true); //Ball stays in place before shot

        // invisible
        this.holes = this.physics.add.staticGroup();

        const holePositions = [
            { x: 600, y: 220, r: 30 },
            { x: 580, y: 430, r: 25 },
            { x: 580, y: 660, r: 40 },
        ];

        for (let hole of holePositions) {
            let circle = this.add.circle(hole.x, hole.y, hole.r, 0xff0000, 0);

            this.physics.add.existing(circle, true);
            circle.body.setCircle(hole.r);
            circle.body.setOffset(-hole.r, -hole.r);

            this.holes.add(circle);
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
                //Drag the ball, but limit max distance from rest point
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

        this.physics.add.overlap(this.ball, this.holes, () => {
            this.scene.stop('minigameScene');
            this.scene.resume('playScene');
        });

    }

    update() {
        if (this.shot && (this.ball.body.speed < 200 || this.ball.y > 800 || this.ball.x > 800 || this.ball.x < 0)) {
                this.scene.stop('minigameScene');
                this.scene.resume('playScene');
                
        }
    }
}
