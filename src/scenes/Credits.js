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

        let refButton = this.add.text(centerX, 520, 'REFERENCES', buttonConfig).setOrigin(0.5)
        refButton.setInteractive({ useHandCursor: true })
        refButton.on('pointerover', () => refButton.setStyle({ color: '#7dd3ff' }))
        refButton.on('pointerout', () => refButton.setStyle({ color: '#ffffff' }))
        refButton.on('pointerdown', () => {
            window.open('https://github.com/riyer4/170-p4-spider-game/blob/main/README.md', '_blank')
        })

        let teamHeader = this.add.text(centerX, 200, 'TEAM', buttonConfig).setOrigin(0.5)

        let row1 = [
            { label: 'Chengkun L', x: centerX - 150, y: 270, link: 'https://github.com/Bigfish3012' },
            { label: 'Marcus O', x: centerX + 150, y: 270, link: 'https://github.com/marcus-ochoa' }
        ]

        let row2 = [
            { label: 'Marcus T', x: centerX - 150, y: 340, link: 'https://github.com/marcustierney' },
            { label: 'Ria I', x: centerX + 150, y: 340, link: 'https://github.com/riyer4' }
        ]

        row1.concat(row2).forEach(btn => {
            let t = this.add.text(btn.x, btn.y, btn.label, buttonConfig).setOrigin(0.5)
            t.setInteractive({ useHandCursor: true })
            t.on('pointerover', () => t.setStyle({ color: '#7dd3ff' }))
            t.on('pointerout', () => t.setStyle({ color: '#ffffff' }))
            t.on('pointerdown', () => {
                window.open(btn.link, '_blank')
            })
        })

        let menuButton = this.add.text(centerX, 680, 'BACK TO MENU', {
            fontFamily: 'CapitolCity',
            fontSize: '28px',
            color: '#ffffff',
            align: 'center',
            fixedWidth: 0
        }).setOrigin(0.5)
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
