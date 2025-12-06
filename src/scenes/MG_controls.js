class MGControls extends Phaser.Scene {
    constructor () {
        super("MGcontrolsScene")
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

        this.add.text(centerX, 200, 'Use the trackpad and click and drag backwards to launch the silk ball.', textConfig).setOrigin(0.5);
        this.add.text(centerX, 300, 'Shoot the ball into one of the tree holes.', textConfig).setOrigin(0.5);
        this.add.text(centerX, 400, 'If you make it in, your web will grow!', textConfig).setOrigin(0.5);
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