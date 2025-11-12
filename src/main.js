let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 800,
    backgroundColor: "#ffffffff",
    render: {
        pixelArt: true
    },

    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
        }
    },
    scene: [ Menu, Controls, Credits, Play, End ]
}

let game = new Phaser.Game(config)

// keyboard bindings if needed (I used these in my other phaser projects lol)
let keyLEFT, keyRIGHT, keyUP, keyDOWN, keySTART, keyCREDITS, keyCONTROLS, keyMENU

// UI sizes!!

let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3
