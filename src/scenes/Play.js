class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }
    
    create() {

        this.starfield = this.add.tileSprite(0, 0, 1280, 720, 'starfield').setOrigin(0, 0)
        /*this.groundTemp = new Building(this, 0, heightUI*100, 'building').setOrigin(0, 1)
        this.groundTemp.setScale(6,10)
        var groundPhysicsObject = this.physics.add.existing(this.groundTemp, 1);
        var groundPhys = groundPhysicsObject.body;


        this.playerSprite = new Runner(this, widthUI*10, heightUI*50, 'runner').setOrigin(0.5, 0)
        this.playerSprite.setScale(.5,1)
        var playerPhysicsObject = this.physics.add.existing(this.playerSprite, 0);
        var playerPhys = playerPhysicsObject.body;
        playerPhys.setEnable();
        playerPhys.setVelocityY(0);

        */

        this.player = this.physics.add.sprite(widthUI*10, heightUI*30, 'runner').setScale(.5,1).setMaxVelocity(250);
        this.player.setCollideWorldBounds()
        this.physics.world.on('collide', this.handleWorldBoundsCollision, this);


        this.enemy = this.physics.add.sprite(0,0,'enemy').setScale(.5,.5).setMaxVelocity(this.enemySpeed * 2.5).setOrigin(1,1);
        this.enemySpeed = 50
        this.enemyAlive = true



        this.building0 = this.physics.add.sprite(0, heightUI*55, 'building').setScale(6,20).setOrigin(0, 0).setPushable(false); //I tried working with groups for the buildings but doing the looping logic and adding variety over time became tedious since I was getting confused by acessing the group
        this.building1 = this.physics.add.sprite(widthUI*22, heightUI*55, 'building').setScale(6,20).setOrigin(0, 0).setPushable(false); 
        this.building2 = this.physics.add.sprite(widthUI*44, heightUI*55, 'building').setScale(6,20).setOrigin(0, 0).setPushable(false);
        this.building3 = this.physics.add.sprite(widthUI*66, heightUI*55, 'building').setScale(6,20).setOrigin(0, 0).setPushable(false);
        this.building4 = this.physics.add.sprite(widthUI*88, heightUI*55, 'building').setScale(6,20).setOrigin(0, 0).setPushable(false);

        this.physics.add.collider(this.player, this.building0);
        this.physics.add.collider(this.player, this.building1);
        this.physics.add.collider(this.player, this.building2);
        this.physics.add.collider(this.player, this.building3);
        this.physics.add.collider(this.player, this.building4);

        




        this.player.setGravity(0,150);
    


        keyJUMP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)



        //Build scene assests (Load background, character, enemies, etc)
        //Normalize sizes screen relative sizes here

        //Define gameplay keys

        //Define gameplay variables (Non-global stuff)


        //Define scene text and text config
        console.log("Play scene loaded")
    }
    update() {
        this.starfield.tilePositionX += 4

        this.building0.x -= gameSpeed
        if (this.building0.x < -200){
            this.building0.x = widthUI * 100
            let lastY = this.building4.y  
            let rand = ((Math.random() * 200) - 100) + lastY
            this.building0.y = this.checkRand(rand)
        }
        this.building1.x -= gameSpeed
        if (this.building1.x < -200){
            this.building1.x = widthUI * 100
            let lastY = this.building0.y  
            let rand = ((Math.random() * 200) - 100) + lastY
            this.building1.y = this.checkRand(rand)
        }
        this.building2.x -= gameSpeed
        if (this.building2.x < -200){
            this.building2.x = widthUI * 100
            let lastY = this.building1.y  
            let rand = ((Math.random() * 200) - 100) + lastY
            this.building2.y = this.checkRand(rand)
        }
        this.building3.x -= gameSpeed
        if (this.building3.x < -200){
            this.building3.x = widthUI * 100
            let lastY = this.building2.y  
            let rand = ((Math.random() * 200) - 100) + lastY
            this.building3.y = this.checkRand(rand)
        }
        this.building4.x -= gameSpeed
        if (this.building4.x < -200){
            this.building4.x = widthUI * 100
            this.building4.x = widthUI * 100
            let lastY = this.building3.y  
            let rand = ((Math.random() * 200) - 100) + lastY
            this.building4.y = this.checkRand(rand)
            this.difficultyUp()

        }




        //Controls are defined in a module scenes i.e. spaceship.js
        this.physics.world.singleStep();
        this.updateEnemyTarget()

        



        let gameOver = this.physics.world.overlap(this.player, this.enemy); 
        if (gameOver){
            this.gameOver()
        }

        
        

        let jumpPower = 450

        if (Phaser.Input.Keyboard.JustDown(keyJUMP)){
            if (this.player.body.velocity.y == 0){
                this.player.setVelocityY(-jumpPower);
                bufferedJump = 0;
            } else {
                bufferedJump = 15;
            }
            
        }
        if (bufferedJump != 0){
            bufferedJump -= 1
        }
        if (bufferedJump  != 0 && this.player.body.velocity.y == 0){
            this.player.setVelocityY(-jumpPower);
            bufferedJump = 0;
        }

        if (keyRIGHT.isDown){
            this.player.setAccelerationX(400)
        }
        else if (keyLEFT.isDown){
            this.player.setAccelerationX(-400)
        }
        else if (this.player.body.velocity.x > 10) {
    
            this.player.setAccelerationX(-100)        
        }
        else if (this.player.body.velocity.x < -10) {
    
            this.player.setAccelerationX(175)        
        } else{
            this.player.setVelocityX(0)  
            this.player.setAccelerationX(0)  
        }
        
        



        //Define scene controls (Game over, pause etc.)

        //Scroll backround and start music loop

        
    }

    checkRand(rand){
        if (rand > heightUI * 90){
            rand = heightUI * 90
        }
        if (rand < heightUI * 20){
            rand = heightUI * 20
        }
        return rand
    } 

    difficultyUp() {
        gameSpeed += .5
        this.enemySpeed += 10
        this.enemyAlive = true
        this.enemy.setMaxVelocity(this.enemySpeed * 2.5)


    }

    updateEnemyTarget(){
        if(this.enemy.x > this.player.x){
            this.enemy.setAccelerationX(-this.enemySpeed)
        } else{
            this.enemy.setAccelerationX(this.enemySpeed)
        }
        
        if(this.enemy.y > this.player.y){
            this.enemy.setAccelerationY(-this.enemySpeed)
        } else{
            this.enemy.setAccelerationY(this.enemySpeed)
        }
    }

    gameOver(){
        this.player.x = 0
        this.player.y = 0
    }

    handleWorldBoundsCollision(gameObject, otherGameObject) {
        console.log('Collided with world bounds!');
        if (gameObject === this.player && otherGameObject.body.worldBounds) {
          console.log('Collided with world bounds!');
          gameObject.setTint(0xff0000); // Example: tint the colliding object red
          // ... other actions ...
        }
  
    }



    //Collision function (One for enemy one for wall one for floor )

    //TEMP Powerup tranisition and minigame scene

}