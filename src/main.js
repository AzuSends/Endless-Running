/*
Ben Silver
TBD
TBD
NA
TBD
*/
let config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    scene: [ Menu, Play],
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        },
    },
}
let game = new Phaser.Game(config)
let highScore = 0;
let timer = 0;
let tick = 1000 //define a second of gametime
let keyUP, keyDOWN, keyJUMP 


let widthUI = game.config.width / 100 //Size units for changing resolution
let heightUI = game.config.height / 100 // ^^
