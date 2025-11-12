class Controls extends Phaser.Scene {
    constructor () {
        super("controlsScene")
    }

    create() {

        keyMENU = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)

        // placeholder text

        let controlsConfig = {
            fontFamily: 'Times New Roman',
            fontSize: '18px',
            backgroundColor: '#089cd7ff',
            color: '#fff',
            allig: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },

            fixedWidth: 0
        }

        this.add.text(400, 600, '[M] -> Menu', controlsConfig).setOrigin(0.5)

        controlsConfig.fontSize = '25px'
        controlsConfig.backgroundColor = ''

        this.add.text(400, 180, 'Press the WASD keys to move', controlsConfig).setOrigin(0.5)
        this.add.text(400, 230, '[E] to interact with objects', controlsConfig).setOrigin(0.5)
        this.add.text(400, 280, '[C] to collect items', controlsConfig).setOrigin(0.5)


    }

    update() {

        if (Phaser.Input.Keyboard.JustDown(keyMENU)) {

            this.scene.start('menuScene')    
        }
    }


}