class Load extends Phaser.Scene {
    constructor () {
        super("loadScene")
    }
    
    preload() {
    
        //asset folder path
        this.load.path = './assets/';
        
        // image + sprite loading
        this.load.spritesheet('spider_lr', 'images/spider-moving-lr.png', { frameWidth: 186, frameHeight: 96 });
        this.load.spritesheet('spider_ud', 'images/spider-moving-ud.png', { frameWidth: 186, frameHeight: 96 });
        this.load.spritesheet('spider_eating', 'images/spider-eating.png', { frameWidth: 186, frameHeight: 96 });
        this.load.spritesheet('web', 'images/web-placeholder.png', { frameWidth: 66, frameHeight: 66 });
        this.load.spritesheet('fly', 'images/fly.png', { frameWidth: 26, frameHeight: 20 });
        // this.load.image('map', 'images/map.png');
        // this.load.image('frog', 'images/frog.png');
        // this.load.image('what', 'images/what.png');
        this.load.image('blue_square', 'images/blue-square.png');

        //audio
        this.load.audio('background1', 'audios/background1.mp3');
    }

    create() {

        // Create Spider animations
        if(!this.anims.exists('moveUp')){
            this.anims.create({
                key: 'moveUp',
                frames: this.anims.generateFrameNumbers('spider_ud', { start: 0, end: 2 }),
                frameRate: 10,
                repeat: -1
            });
        }
        if(!this.anims.exists('moveDown')){
            this.anims.create({
                key: 'moveDown',
                frames: this.anims.generateFrameNumbers('spider_ud', { start: 0, end: 2 }),
                frameRate: 10,
                repeat: -1
            });
        }
        if(!this.anims.exists('moveRight')){
            this.anims.create({
                key: 'moveRight',
                frames: this.anims.generateFrameNumbers('spider_lr', { start: 3, end: 5 }),
                frameRate: 10,
                repeat: -1
            });
        }
        if(!this.anims.exists('moveLeft')){
            this.anims.create({
                key: 'moveLeft',
                frames: this.anims.generateFrameNumbers('spider_lr', { start: 0, end: 2 }),
                frameRate: 10,
                repeat: -1
            });
        }
        if(!this.anims.exists('eat')){
            this.anims.create({
                key: 'eat',
                frames: this.anims.generateFrameNumbers('spider_eating', { start: 0, end: 2 }),
                frameRate: 10,
                repeat: -1
            });
        }

        this.scene.start('menuScene');
    }
}