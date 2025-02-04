class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }
    
    create() {
        this.groundTemp = new Building(this, widthUI*50, heightUI*65, 'building').setOrigin(0.5, 0)
        this.groundTemp.setScale(40,8)
        var groundPhysicsObject = this.physics.add.existing(this.groundTemp, 1);
        var groundPhys = groundPhysicsObject.body;


        this.playerSprite = new Runner(this, widthUI*20, heightUI*60, 'runner').setOrigin(0.5, 0)
        this.playerSprite.setScale(.5,1)
        var playerPhysicsObject = this.physics.add.existing(this.playerSprite, 0);
        var playerPhys = playerPhysicsObject.body;
        playerPhys.setEnable();
        playerPhys.setVelocityY(0);

        this.physics.add.collider(groundPhys, playerPhys);

        

        this.physics.world.gravity.y = 100;
    






        //Build scene assests (Load background, character, enemies, etc)
        //Normalize sizes screen relative sizes here

        //Define gameplay keys

        //Define gameplay variables (Non-global stuff)


        //Define scene text and text config
        console.log("Play scene loaded")
    }
    update() {
        //Controls are defined in a module scenes i.e. spaceship.js
        this.physics.world.singleStep();

        //Define scene controls (Game over, pause etc.)

        //Scroll backround and start music loop

        
    }

    //Collision function (One for enemy one for wall one for floor )

    //TEMP Powerup tranisition and minigame scene

}