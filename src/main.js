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
    scene: [ Menu, Play, Credits],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        },
    },
}
let game = new Phaser.Game(config)
let gameOverCondition = false;
let gameScore = 0;
let bufferedJump = 0; //Allows for buffered jumps making moevemnt feel smoother
let gameSpeed = 0
let keyUP, keyDOWN, keyJUMP, keyLEFT, keyRIGHT, keyRESET


let widthUI = game.config.width / 100 //Size units for changing resolution
let heightUI = game.config.height / 100 // ^^
