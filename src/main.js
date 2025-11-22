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
    scene: [ Load, Menu, Controls, Credits, Play, End, Minigame ]
}

let game = new Phaser.Game(config)
let centerX = game.config.width / 2
let centerY = game.config.height / 2

// keyboard bindings if needed (I used these in my other phaser projects lol)
let keyLEFT, keyRIGHT, keyUP, keyDOWN, keySTART, keyCREDITS, keyCONTROLS, keyMENU, keyMUTE, keyINTERACT

// UI sizes!!

let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3
