class End extends Phaser.Scene {
    constructor () {
        super("endScene")
    }


    create() {


        // back to main menu

        keyMENU = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)

        let textConfig = {
            fontFamily: 'CapitolCity',
            fontSize: '100px',
            color: '#ff0d00',
            align: 'center',
            fixedWidth: 0
        }
        this.add.text(centerX, centerY-200, 'Game Over', textConfig).setOrigin(0.5)

        let buttonConfig = {
            fontFamily: 'CapitolCity',
            fontSize: '30px',
            color: '#ffffff',
            align: 'center',
            fixedWidth: 0
        }
        let menuButton = this.add.text(centerX, centerY+100, 'BACK TO MENU', buttonConfig).setOrigin(0.5)
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