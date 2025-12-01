
class Minigame extends Phaser.Scene {
    constructor () {
        super("minigameScene");
    }

    create() {
        
        //map
        this.map = this.add.image(0, 0, 'blue_square').setOrigin(0).setScale(50);

        keyMENU = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);

        //keys 
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyINTERACT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);

        this.minigameWon = false;
    }

    update() {
    }

    returnToGame() {
        let playScene = this.scene.get('playScene');
        playScene.setStamina(stamina);
        if (this.minigameWon) playScene.growWeb();
        this.scene.stop().wake('playScene');
    }
}