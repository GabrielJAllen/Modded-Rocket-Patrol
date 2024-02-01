//Gabriel Allen
//Rockets and Space Amoebas
// 4 hours to completion
// Mods chosen: Rocket Destruction Particle Emmitter(5 pts), New Spaceship Type (Space Amoeba)(5pts), Mouse Controls (though any mouse button works not just left click)(5 pts), and new random sound effects(3pts)
// Just used Phaser documentation and on site examples as well as JFXR to generate sounds
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