class Minigame extends Phaser.Scene {
    constructor() {
        super("minigameScene");
    }

    create() {
        this.add.rectangle(400, 400, 800, 800, 0x000000);
        this.add.image(400, 400, 'minigame_bg').setScale(7.0);
        this.add.image(400, 400, 'holes').setScale(7.0);

        // Button configuration without background color
        let buttonConfig = {
            fontFamily: 'CapitolCity',
            fontSize: '30px',
            color: '#ffffff',
            align: 'center',
            fixedWidth: 0
        }

        // controls button
        let controlButton = this.add.text(680, 80, 'Controls', buttonConfig).setOrigin(0.5)
        controlButton.setInteractive({ useHandCursor: true })
        controlButton.on('pointerover', () => controlButton.setStyle({ color: '#ff901f' }))
        controlButton.on('pointerout', () => controlButton.setStyle({ color: '#ffffff' }))
        controlButton.on('pointerdown', () => this.scene.start('MGcontrolsScene'))
        //Slingshot pos
        this.restX = 180;
        this.restY = 550;

        this.ball = this.physics.add.sprite(this.restX, this.restY, 'ball').setScale(0.8);
        this.ball.setCollideWorldBounds(true);
        this.ball.setBounce(0.6);
        this.ball.body.setGravityY(0); //No gravity until shot
        this.ball.setImmovable(true); //Ball stays in place before shot

        this.ball.body.setFriction(1, 1);
        this.ball.body.setDamping(true);
        this.ball.body.setDrag(0.9);
        this.ball.setBounce(0.6);

        this.spider = this.add.sprite(this.restX - 70, this.restY, 'spider_eating', 0).setScale(0.6);
        this.anims.create({
            key: 'mg_spider_eat',
            frames: this.anims.generateFrameNumbers('spider_eating', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });

        // invisible
        this.holes = this.physics.add.staticGroup();

        const holePositions = [
            { x: 620, y: 200, r: 30 },
            { x: 600, y: 430, r: 25 },
            { x: 600, y: 680, r: 40 },
        ];

        for (let hole of holePositions) {
            let circle = this.add.circle(hole.x, hole.y, hole.r, 0x000000, 0);

            this.physics.add.existing(circle, true);
            circle.body.setCircle(hole.r);
            circle.body.setOffset(-hole.r, -hole.r);

            this.holes.add(circle);
        }

        this.dragging = false;
        this.shot = false;

        this.dragX = this.restX;
        this.dragY = this.restY;

        this.slingLine = this.add.graphics();

        this.input.on('pointerdown', pointer => {
            if (!this.shot) {
                //Check if pointer is near the ball
                const distance = Phaser.Math.Distance.Between(pointer.x, pointer.y, this.restX, this.restY);
                if (distance < 50) { 
                    this.dragging = true;
                    this.spider.play('mg_spider_eat');
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

                this.dragX = this.restX + Math.cos(angle) * distance;
                this.dragY = this.restY + Math.sin(angle) * distance;

                this.slingLine.clear();
                this.slingLine.lineStyle(4, 0xffffff, 1);
                this.slingLine.beginPath();
                this.slingLine.moveTo(this.restX, this.restY);
                this.slingLine.lineTo(this.dragX, this.dragY);
                this.slingLine.strokePath();
            }
        });

        this.input.on('pointerup', pointer => {
            if (this.dragging && !this.shot) {
                this.dragging = false;
                this.shot = true;

                this.slingLine.clear();

                this.spider.stop();
                this.spider.setFrame(0);

                //Enable gravity and make ball movable
                this.ball.body.setGravityY(600);
                this.ball.setImmovable(false);

                //Launch the ball based on distance from rest point
                const dx = this.restX - this.dragX;
                const dy = this.restY - this.dragY;

                this.ball.setVelocity(dx * 5.3, dy * 5.3); 
            }
        });

        this.physics.add.overlap(this.ball, this.holes, () => {
            this.scene.stop('minigameScene');
            this.scene.resume('playScene');
            this.scene.get('playScene').spider.minigameSafeUntil = this.time.now + 1000;
            this.scene.get('playScene').growWeb();


        });

        this.bgSize = 896;
        this.minX = 400 - this.bgSize / 2;
        this.maxX = 400 + this.bgSize / 2;
        this.minY = 400 - this.bgSize / 2;
        this.maxY = 400 + this.bgSize / 2;
    }

    update() {

        this.ball.x = Phaser.Math.Clamp(this.ball.x, this.minX, this.maxX);
        this.ball.y = Phaser.Math.Clamp(this.ball.y, this.minY, this.maxY);

        if (this.shot && (this.ball.body.speed < 200 || this.ball.y > 800 || this.ball.x > 800 || this.ball.x < 0)) {
                this.scene.stop('minigameScene');
                this.scene.resume('playScene');
                
        }
    }
}
