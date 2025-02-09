
class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }
    
    create() {
        this.anims.create({
            key: 'runR',
            frames: this.anims.generateFrameNumbers('runner', {
                start: 1, 
                end: 2 
            }),
            frameRate: 10, 
            repeat: 0 
        });
        this.anims.create({
            key: 'runL',
            frames: this.anims.generateFrameNumbers('runner', {
                start: 4, 
                end: 5 
            }),
            frameRate: 10, 
            repeat: 0 
        });

        this.anims.create({
            key: 'standR',
            frames: this.anims.generateFrameNumbers('runner', {
                start: 0, 
                end: 0 
            }),
            frameRate: 7, 
            repeat: 0
        });
        this.anims.create({
            key: 'standL',
            frames: this.anims.generateFrameNumbers('runner', {
                start: 3, 
                end: 3 
            }),
            frameRate: 7, 
            repeat: 0
        });
        this.anims.create({
            key: 'loop',
            frames: this.anims.generateFrameNumbers('enemy', {
                start: 0, 
                end: 8 
            }),
            frameRate: 7, 
            repeat: -1
        });

        this.bgm = this.sound.add('bgm', {
            volume: 0.5,
            loop: true   
        });
        this.diffUp = this.sound.add('diffUp', {
            volume: 0.30, 
            loop: false   
        });
        this.jump = this.sound.add('jump', {
            volume: 0.12, 
            loop: false   
        });
        this.gameEnd = this.sound.add('gameEnd', {
            volume: 0.60, 
            loop: false   
        });
        this.select = this.sound.add('select', {
            volume: 0.30, 
            loop: false   
        });

        this.select.play();
        
        
        this.starfield = this.add.tileSprite(0, 0, 1280, 720, 'stars').setOrigin(0, 0)


        this.player = this.physics.add.sprite(widthUI*5, heightUI*50, 'runner').setScale(.5,.5).setMaxVelocity(0);
        this.player.grounded = true
        this.player.facing = "right"
        this.player.alive = 1
        

        this.enemySpeed = 50
        this.enemy = this.physics.add.sprite(0,0,'enemy').setScale(.125,.125).setMaxVelocity(0).setOrigin(1,1);
        this.enemy.play("loop")
        this.enemyAlive = true
        



        this.building0 = this.physics.add.sprite(0, heightUI*55, 'building').setScale(1.25,1.25).setOrigin(0, 0).setPushable(false); //I tried working with groups for the buildings but doing the looping logic and adding variety over time became tedious since I was getting confused by acessing the group
        this.building1 = this.physics.add.sprite(widthUI*22, heightUI*55, 'building').setScale(1.25,1.25).setOrigin(0, 0).setPushable(false); 
        this.building2 = this.physics.add.sprite(widthUI*44, heightUI*55, 'building').setScale(1.25,1.25).setOrigin(0, 0).setPushable(false);
        this.building3 = this.physics.add.sprite(widthUI*66, heightUI*55, 'building').setScale(1.25,1.25).setOrigin(0, 0).setPushable(false);
        this.building4 = this.physics.add.sprite(widthUI*88, heightUI*55, 'building').setScale(1.25,1.25).setOrigin(0, 0).setPushable(false);

        this.physics.add.collider(this.player, this.building0, this.ground);
        this.physics.add.collider(this.player, this.building1, this.ground);
        this.physics.add.collider(this.player, this.building2, this.ground);
        this.physics.add.collider(this.player, this.building3, this.ground);
        this.physics.add.collider(this.player, this.building4, this.ground);
        this.physics.add.collider(this.player, this.enemy, this.gameOverEnemyHandler);

        this.textConfig = {
            fontFamily: 'serif',
            fontSize: '28px',
            color: '#FFFFFF',
            align: 'right',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 0
        }
        this.text1 = this.add.text(game.config.width/2, game.config.height/2, 'Press ←→ to move and ↑ to jump', this.textConfig).setOrigin(0.5)
        this.text2 = this.add.text(game.config.width/2, game.config.height/2, 'Avoid the enemy and try to get as far as you can!', this.textConfig).setOrigin(0.5)
        this.text2.alpha = 0
        this.scrollSpeed = 0
        this.clock = this.time.delayedCall(3000, () => {
            this.text1.alpha = 0;
            this.text2.alpha = 1;   
        }, null, this)
        this.clock = this.time.delayedCall(6000, () => {
            this.text2.alpha = 0;
            gameSpeed = 2
            this.player.setMaxVelocity(250)
            this.enemy.setMaxVelocity(this.enemySpeed * 2.5)
            this.scrollSpeed = 1
            this.bgm.play()
        }, null, this)




        this.player.setGravity(0,150);
    


        keyJUMP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)



       
        console.log("Play scene loaded")
    }
    update() {
        if (this.player.alive == 0){
            this.gameOver(this.player)
            this.player.alive = 1
            
        }
        this.starfield.tilePositionX += this.scrollSpeed

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




        this.physics.world.singleStep();
        this.updateEnemyTarget()

        



        let gameOver = this.physics.world.collide(this.player, this.enemy); 
        if (gameOver){
            this.gameOver(this.player)
        }

        if (this.player.x < 0 || this.player.y > heightUI * 100){
            this.gameOver(this.player)

        }

        
        

        let jumpPower = 450

        if (Phaser.Input.Keyboard.JustDown(keyJUMP)){
            if (this.player.body.velocity.y == 0){
                this.jump.play();
                this.player.setVelocityY(-jumpPower);
                this.player.grounded = false
                this.player.play("standR")
                this.player.stop();
                bufferedJump = 0;
            } else {
                bufferedJump = 15;
            }
            
        }
        if (Phaser.Input.Keyboard.JustDown(keyRESET)){
            this.bgm.stop();
            gameSpeed = 0
            this.scrollSpeed = 0
            this.scene.restart();
            
        }
        if (bufferedJump != 0){
            bufferedJump -= 1
        }
        if (bufferedJump  != 0 && this.player.body.velocity.y == 0){
            this.jump.play();
            this.player.setVelocityY(-jumpPower);
            this.player.grounded = false
            this.player.play("standR")
            this.player.stop();
            bufferedJump = 0;
        }

        if (keyRIGHT.isDown){
            this.player.setAccelerationX(400)
            this.player.facing = "right"
            if (!this.player.anims.isPlaying) {
                this.player.play("standR")
                this.player.stop();
            }
        }
        else if (keyLEFT.isDown){
            this.player.setAccelerationX(-400)
            if (!this.player.anims.isPlaying) {
                this.player.play("standL")
                this.player.stop();
            }
            this.player.facing = "left"
        }
        else if (this.player.body.velocity.x > 10) {
    
            this.player.setAccelerationX(-100)        
        }
        else if (this.player.body.velocity.x < -10) {
    
            this.player.setAccelerationX(175)        
        } else{
            this.player.setVelocityX(0)  
            this.player.setAccelerationX(0)  
            if (this.player.facing == "right"){
                this.player.play("standR")

            } else{
                this.player.play("standL")
            }
        }
        
        





        
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
        this.diffUp.play()
        gameScore += 1;

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
        this.player.setMaxVelocity(0)
        this.player.x = 2000
        this.player.y = 0
        this.player.alpha = 0
        this.enemy.setMaxVelocity(0)
        this.add.text(game.config.width/2, game.config.height/3, 'GAME OVER', this.textConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2, 'Score:', this.textConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 + 30, gameScore, this.textConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height - 200, 'R to play again', this.textConfig).setOrigin(0.5)
        gameScore = 0
        this.gameEnd.play()
        this.bgm.stop()
    }
    gameOverEnemyHandler(player){
        player.alive = 0
    }

    ground(player){
        if (!player.anims.isPlaying) {
            if (player.facing == "right"){
                player.play('runR');
            } else{
                player.play('runL');
            }
        }
    }




}