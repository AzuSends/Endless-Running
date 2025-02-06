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
let bufferedJump = 0; //Allows for buffered jumps making moevemnt feel smoother
let keyUP, keyDOWN, keyJUMP, keyLEFT, keyRIGHT


let widthUI = game.config.width / 100 //Size units for changing resolution
let heightUI = game.config.height / 100 // ^^
