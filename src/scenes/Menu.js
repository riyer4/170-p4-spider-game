class Menu extends Phaser.Scene {
    constructor () {
        super("menuScene")
    }

    
    preload() {
    
    // image + sprite loading

    // for menu

        // ex) this.load.image('menu', './assets/png/menu.png')

    //audio!!

        // ex) this.load.audio('bgm', './assets/audio/ltl_music.wav')

    }


    create() {

        // for bg ex)
        // this.mainScreen = this.add.tileSprite(0, 0, 640, 480, 'menu').setOrigin(0, 0)


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
        

        //keys

        keyCONTROLS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)
        keyCREDITS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X)
        keySTART = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

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
    }
}