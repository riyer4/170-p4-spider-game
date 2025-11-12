class End extends Phaser.Scene {
    constructor () {
        super("endScene")
    }


    create() {


        // back to main menu

        keyMENU = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)

        let controlsConfig = {
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

        this.add.text(320, 400, '[M] -> Menu', controlsConfig).setOrigin(0.5)

    }

    update() {

        if (Phaser.Input.Keyboard.JustDown(keyMENU)) {

            this.scene.start('menuScene')    
        }
    }


}