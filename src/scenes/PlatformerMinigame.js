class PlatformerMinigame extends Phaser.Scene {
    constructor() {
        super("platformerMinigame");
    }

    create() {

        this.add.rectangle(400, 400, 800, 800, 0x000000);
        this.add.rectangle(400, 400, 700, 700, 0xffffff);

        this.keyUP_L = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.keyLEFT_L = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.keyDOWN_L = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.keyRIGHT_L = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.keyW_L = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyA_L = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS_L = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD_L = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.platformGroup = this.physics.add.staticGroup();

        let tiers = [650, 500, 360, 230, 120];

        for (let i = 0; i < tiers.length; i++) {

            let x = Phaser.Math.Between(180, 620);
            let width = Phaser.Math.Between(150, 260);

            if (i === 0) {
                x = 400;
                width = 350;
            }

            if (i === tiers.length - 1) {
                x = 400;
                width = 270;
            }

            let p = this.add.rectangle(x, tiers[i], width, 20, 0x000000);
            this.physics.add.existing(p, true);
            this.platformGroup.add(p);
        }

        this.spider = this.physics.add.sprite(400, 640, 'spider_lr', 0).setScale(0.8);
        this.spider.body.setGravityY(800);
        this.spider.setCollideWorldBounds(true);

        this.physics.world.setBounds(50, 50, 700, 700);
        this.spider.body.setBoundsRectangle(new Phaser.Geom.Rectangle(50, 50, 700, 700));

        this.physics.add.collider(this.spider, this.platformGroup, () => {
            this.canDoubleJump = true;
        });

        this.canDoubleJump = true;
        this.spiderState = "idle";
    }

    update() {

        let left = this.keyLEFT_L.isDown || this.keyA_L.isDown;
        let right = this.keyRIGHT_L.isDown || this.keyD_L.isDown;
        let up = this.keyUP_L.isDown || this.keyW_L.isDown;

        if (left) {
            this.spider.setVelocityX(-200);

            if (this.spider.body.blocked.down && this.spiderState !== "left") {
                this.spiderState = "left";
                this.spider.setTexture('spider_lr');
                this.spider.anims.play('moveLeft', true);
            }

        } else if (right) {
            this.spider.setVelocityX(200);

            if (this.spider.body.blocked.down && this.spiderState !== "right") {
                this.spiderState = "right";
                this.spider.setTexture('spider_lr');
                this.spider.anims.play('moveRight', true);
            }

        } else {
            this.spider.setVelocityX(0);

            if (this.spider.body.blocked.down && this.spiderState !== "idle") {
                this.spiderState = "idle";
                this.spider.anims.stop();
                this.spider.setTexture('spider_ud');
                this.spider.setFrame(0);
            }
        }


        if (up) {
            if (this.spider.body.blocked.down) {
                this.spider.setVelocityY(-430);
                this.canDoubleJump = false;

                if (this.spiderState !== "jump") {
                    this.spiderState = "jump";
                    this.spider.setTexture('spider_ud');
                    this.spider.anims.play('moveUp', true);
                }

            } else if (this.canDoubleJump) {
                this.spider.setVelocityY(-430);
                this.canDoubleJump = false;

                if (this.spiderState !== "jump") {
                    this.spiderState = "jump";
                    this.spider.setTexture('spider_ud');
                    this.spider.anims.play('moveUp', true);
                }
            }
        }

        if (this.spider.body.blocked.down && !left && !right && !up) {
            if (this.spiderState !== "idle") {
                this.spiderState = "idle";
                this.spider.anims.stop();
                this.spider.setTexture('spider_ud');
                this.spider.setFrame(0);
            }
        }


        if (!this.spider.body.blocked.down) {
            if (this.spiderState !== "jump") {
                this.spiderState = "jump";
                this.spider.setTexture('spider_ud');
                this.spider.anims.play('moveUp', true);
            }
        }

        if (this.spider.y < 100) {
            this.scene.stop('platformerMinigame');
            this.scene.resume('playScene');
            this.scene.get('playScene').spider.minigameSafeUntil = this.time.now + 1000;
            this.scene.get('playScene').growWeb();
        }

        if (this.spider.y > 820) {
            this.scene.stop('platformerMinigame');
            this.scene.resume('playScene');
            this.scene.get('playScene').spider.minigameSafeUntil = this.time.now + 1000;
        }
    }
}
