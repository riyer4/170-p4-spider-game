class PMControls extends Phaser.Scene {
    constructor () {
        super("PMcontrolsScene")
    }

    create() {

        this.add.rectangle(400, 400, 800, 800, 0x000000);

        keyMENU = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)

        // placeholder text

        // Button configuration without background color
        let buttonConfig = {
            fontFamily: 'CapitolCity',
            fontSize: '32px',
            color: '#ffffff',
            align: 'center',
            fixedWidth: 0
        }

        // Create Menu button
        let menuButton = this.add.text(centerX, 600, 'BACK TO GAME', buttonConfig).setOrigin(0.5)
        menuButton.setInteractive({ useHandCursor: true })
        menuButton.on('pointerover', () => menuButton.setStyle({ color: '#ff901f' }))
        menuButton.on('pointerout', () => menuButton.setStyle({ color: '#ffffff' }))
        menuButton.on('pointerdown', () => {
            let parent = this.scene.settings.data.returnScene;
            this.scene.stop(); 
            this.scene.resume(parent);
            this.scene.get('playScene').scene.resume();
        });

        // Text configuration for instructions
        let textConfig = {
            fontFamily: 'JAi_____',
            fontSize: '23px',
            color: '#ffffff',
            align: 'center',
            fixedWidth: 0
        }

        this.add.text(centerX, 200, 'Hold the Arrow Keys or WASD to move the spider.', textConfig).setOrigin(0.5);
        this.add.text(centerX, 300, 'Keys A & D / <- & -> to move left and right, Key W / Up Arrow to jump.', textConfig).setOrigin(0.5);
        this.add.text(centerX, 400, 'Get to the top to grow your web!', textConfig).setOrigin(0.5);
    }

    update() {

        if (Phaser.Input.Keyboard.JustDown(keyMENU)) {

            let parent = this.scene.settings.data.returnScene;
            this.scene.stop();
            this.scene.resume(parent);
            this.scene.get('playScene').scene.resume();
        }
    }


}