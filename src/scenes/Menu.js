class Menu extends Phaser.Scene {
    constructor () {
        super("menuScene")
    }

    
    preload() {
    //asset folder path
    this.load.path = './assets/';
    
    // image + sprite loading
    this.load.spritesheet('spider', 'images/Spider.png', { frameWidth: 20, frameHeight: 20 });
    this.load.image('map', 'images/map.png');
    this.load.image('frog', 'images/frog.png');
    this.load.image('what', 'images/what.png');


    // for menu

        // ex) this.load.image('menu', './assets/png/menu.png')

    //audio!!

        // ex) this.load.audio('bgm', './assets/audio/ltl_music.wav')
    this.load.audio('background1', 'audios/background1.mp3')

    }


    create() {

        // for bg ex)
        // this.mainScreen = this.add.tileSprite(0, 0, 640, 480, 'menu').setOrigin(0, 0)
        this.add.image(0, 0, 'what').setOrigin(0).setScale(2)
        this.background1 = this.sound.add('background1', {volume: 0.5, loop: true})
        //this.background1.play()
        //placeholder menu text

        let menuConfig = {
            fontFamily: 'Times New Roman',
            fontSize: '18px',
            backgroundColor: '#f0f14e',
            color: '#000',
            allig: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },

            fixedWidth: 0
        }

        this.add.text(200, 600, '[SPACE] to Start', menuConfig).setOrigin(0.5)
        menuConfig.backgroundColor = '#ff901f'
        this.add.text(400, 600, '[C] for Controls', menuConfig).setOrigin(0.5)
        menuConfig.backgroundColor = '#ff5f85'
        this.add.text(600, 600, '[X] for Credits', menuConfig).setOrigin(0.5)
        menuConfig.backgroundColor = '#ff5f85'
        this.add.text(200, 700, '[U] to Mute', menuConfig).setOrigin(0.5)
        menuConfig.backgroundColor = '#ff901f'

        //keys

        keyCONTROLS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)
        keyCREDITS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X)
        keySTART = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        keyMUTE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.U)
        
        // Track mute state
        this.isMuted = false

        // Create Spider animations
        if(!this.anims.exists('moveUp')){
            this.anims.create({
                key: 'moveUp',
                frames: this.anims.generateFrameNumbers('spider', { start: 0, end: 0 }),
                frameRate: 10,
                repeat: -1
            });
        }
        if(!this.anims.exists('moveDown')){
            this.anims.create({
                key: 'moveDown',
                frames: this.anims.generateFrameNumbers('spider', { start: 1, end: 1 }),
                frameRate: 10,
                repeat: -1
            });
        }
        if(!this.anims.exists('moveRight')){
            this.anims.create({
                key: 'moveRight',
                frames: this.anims.generateFrameNumbers('spider', { start: 2, end: 2 }),
                frameRate: 10,
                repeat: -1
            });
        }
        if(!this.anims.exists('moveLeft')){
            this.anims.create({
                key: 'moveLeft',
                frames: this.anims.generateFrameNumbers('spider', { start: 3, end: 3 }),
                frameRate: 10,
                repeat: -1
            });
        }
    }
    
    update() {


        if (Phaser.Input.Keyboard.JustDown(keySTART)) {
            
            this.scene.start('playScene')    
        }

        if (Phaser.Input.Keyboard.JustDown(keyCONTROLS)) {

            this.scene.start('controlsScene')    
        }

        if (Phaser.Input.Keyboard.JustDown(keyCREDITS)) {

            this.scene.start('creditsScene')    
        }

        if (Phaser.Input.Keyboard.JustDown(keyMUTE)) {
            this.toggleMute()
        }
    }

    toggleMute() {
        if (this.isMuted) {
            // Unmute the music
            this.background1.setVolume(0.5)
            this.isMuted = false
        } else {
            // Mute the music
            this.background1.setVolume(0)
            this.isMuted = true
        }
    }
}