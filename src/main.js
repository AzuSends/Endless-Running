/*
Ben Silver
Space Escape
10-15 ish Hours, I didn't keep great track
For my technical creative tilt I did a few small things that I thought were cool. 
First is jump buffering, when you land from a jump the game checks if you presses the jump key in the last 15 frames and if you have you will jump.
This makes it so the controls feel much more responsive since you don't have to time your jumps perfectly as you land,
Secondly, I'm happy with my enemy movement. I started with the super basic platforming in the game then added the enemy just to test it out and was super happy about how it followed
the player with just some basic acceleration logic and speed cap. It added a lot of moment to moment decision making from a gameplay standpoint and was cool technically because I 
initially had the idea of some sort of bat like enemy taking swoops at you and I feel like I was able to capture that feeling exactly.
Lastly, I wanted to make sure the player could never lose from a platform spawning too high or too low so I did some simple logic to make sure the player will always be able to jump to
the next platform. Very simple but I thought it added a lot to the game via varience and making sure the player doesn't get frusterated with the way platforms spawn.

For my style creative tilt I didn't really do anything special. I'm not really an artist but I set the goal of making all my own assets for this project and while the style and scaling
is a bit all over the place I'm proud of what I was able to make. In particular, I'm happy about how the enemy art came out. I had been unsure about a theme for the game since I was 
mostly focusing on gameplay/technical stuff. I eventually decided on a space theme and had a fairly easy time with most of my assests. A spcae background is easy, and I kinda just 
messed around till I got my platform and charater design but I couldn't really decide what to do for the enemy. When I had the idea for some sort of "star orb" I thought it might be cool
but was unsure how to go about it. After trying different designs in piskel for like an hour I finally had the model that's in the game and was super happy with how it looks zipping around.
I felt like it fit the vibe I was going for and also fit really well with the enemy movement I implemented. 
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
let bufferedJump = 0; //Allows for buffered jumps making movement feel smoother
let gameSpeed = 0
let keyUP, keyDOWN, keyJUMP, keyLEFT, keyRIGHT, keyRESET


let widthUI = game.config.width / 100 //Size units for changing resolution
let heightUI = game.config.height / 100 // ^^
