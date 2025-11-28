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
        this.load.image('blue_square', 'images/blue-square.png');

        //audio
        this.load.audio('background1', 'audios/background1.mp3');
        this.load.audio('eating', 'audios/nom-nom-nom_gPJiWn4.mp3');
        this.load.audio('capture', 'audios/capture_sound.wav');
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
        if(!this.anims.exists('fly_move')){
            this.anims.create({
                key: 'fly_move',
                frames: this.anims.generateFrameNumbers('fly', { start: 0, end: 1 }),
                frameRate: 10,
                repeat: -1
            });
        }
        if(!this.anims.exists('fly_been_captured')){
            this.anims.create({
                key: 'fly_been_captured',
                frames: this.anims.generateFrameNumbers('fly', { start: 2, end: 2 }),
                frameRate: 10,
                repeat: -1
            });
        }

        this.scene.start('menuScene');
    }
}