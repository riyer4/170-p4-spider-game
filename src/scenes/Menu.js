class Menu extends Phaser.Scene {
    constructor () {
        super("menuScene")
    }

    create() {

        // for bg ex)
        // this.mainScreen = this.add.tileSprite(0, 0, 640, 480, 'menu').setOrigin(0, 0)
        
        // Check if sound already exists to avoid creating duplicates
        if (!this.sound.get('background1')) {
            this.background1 = this.sound.add('background1', {volume: 0.5, loop: true})
        } else {
            this.background1 = this.sound.get('background1')
        }
        this.background1.play()
        
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