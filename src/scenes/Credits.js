class Credits extends Phaser.Scene {
    constructor () {
        super("creditsScene")
    }

    create() {


        keyMENU = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)


        //placeholder text

        // Button configuration without background color
        let buttonConfig = {
            fontFamily: 'CapitolCity',
            fontSize: '32px',
            color: '#ffffff',
            align: 'center',
            fixedWidth: 0
        }

        // Create Menu button
        let menuButton = this.add.text(centerX, 600, 'BACK TO MENU', buttonConfig).setOrigin(0.5)
        menuButton.setInteractive({ useHandCursor: true })
        menuButton.on('pointerover', () => menuButton.setStyle({ color: '#ff901f' }))
        menuButton.on('pointerout', () => menuButton.setStyle({ color: '#ffffff' }))
        menuButton.on('pointerdown', () => this.scene.start('menuScene'))

    }

    update() {

        if (Phaser.Input.Keyboard.JustDown(keyMENU)) {

            this.scene.start('menuScene')    
        }
    }

}