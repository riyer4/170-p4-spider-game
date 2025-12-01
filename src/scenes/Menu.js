class Menu extends Phaser.Scene {
    constructor () {
        super("menuScene")
    }

    
    preload() {
    //asset folder path
    this.load.path = './assets/';
    
    // image + sprite loading
    this.load.spritesheet('spider_lr', 'images/spider_moving_l-r.png', { frameWidth: 186, frameHeight: 96 });
    this.load.spritesheet('spider_ud', 'images/spider_moving_u-d.png', { frameWidth: 186, frameHeight: 96 });
    this.load.spritesheet('spider_eating', 'images/spider_eating.png', { frameWidth: 186, frameHeight: 96 });
    this.load.spritesheet('fly', 'images/fly.png', { frameWidth: 26, frameHeight: 20 });
    this.load.image('map', 'images/map.png');
    this.load.image('frog', 'images/frog.png');
    this.load.image('what', 'images/what.png');
    this.load.image('ball', 'images/ball.png');
    this.load.image('cup', 'images/cup.png');
    this.load.image('portal', 'images/portal.png');


    // for menu

        // ex) this.load.image('menu', './assets/png/menu.png')

    //audio!!

        // ex) this.load.audio('bgm', './assets/audio/ltl_music.wav')
    this.load.audio('background1', 'audios/background1.mp3')

    }


    create() {

        // for bg ex)
        // this.mainScreen = this.add.tileSprite(0, 0, 640, 480, 'menu').setOrigin(0, 0)
        
        // Check if sound already exists to avoid creating duplicates
        if (!this.sound.get('background1')) {
            this.background1 = this.sound.add('background1', {volume: 0.3, loop: true})
        } else {
            this.background1 = this.sound.get('background1')
        }
        this.background1.play()
        
        this.add.text(centerX, centerY-300, "SPIDER", {
            fontFamily: "WeberSpider",   
            fontSize: "100px",
            color: "#ffffff"
        }).setOrigin(0.5);

        // Button configuration without background color
        let buttonConfig = {
            fontFamily: 'CapitolCity',
            fontSize: '30px',
            color: '#ffffff',
            align: 'center',
            fixedWidth: 0
        }

        // Create Start button
        let startButton = this.add.text(centerX, centerY, 'Start', buttonConfig).setOrigin(0.5)
        startButton.setInteractive({ useHandCursor: true })
        startButton.on('pointerover', () => startButton.setStyle({ color: '#ff901f' }))
        startButton.on('pointerout', () => startButton.setStyle({ color: '#ffffff' }))
        startButton.on('pointerdown', () => this.scene.start('playScene'))

        // Create Controls button
        let controlsButton = this.add.text(centerX, centerY+100, 'Controls', buttonConfig).setOrigin(0.5)
        controlsButton.setInteractive({ useHandCursor: true })
        controlsButton.on('pointerover', () => controlsButton.setStyle({ color: '#ff901f' }))
        controlsButton.on('pointerout', () => controlsButton.setStyle({ color: '#ffffff' }))
        controlsButton.on('pointerdown', () => this.scene.start('controlsScene'))

        // Create Credits button
        let creditsButton = this.add.text(centerX, centerY+200, 'Credits', buttonConfig).setOrigin(0.5)
        creditsButton.setInteractive({ useHandCursor: true })
        creditsButton.on('pointerover', () => creditsButton.setStyle({ color: '#ff5f85' }))
        creditsButton.on('pointerout', () => creditsButton.setStyle({ color: '#ffffff' }))
        creditsButton.on('pointerdown', () => this.scene.start('creditsScene'))

        //keys
        keyMUTE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.U)
        
        // Track mute state
        this.isMuted = false;
    }
    
    update() {
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