//Gabriel Allen
//Rockets and Space Amoebas
// 4 hours to completion
// Mods chosen: Rocket Destruction Particle Emmitter, New Spaceship Type (Space Amoeba),
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config)

let keyFIRE, keyRESET, keyLEFT, keyRIGHT

let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3