class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {
        this.load.image('spaceship', './assets/spaceship.png')
        this.load.image('starfield', './assets/starfield.png')
        this.load.spritesheet('runner', './assets/runner.png', {
          frameWidth: 70, 
          frameHeight: 90 
      });

      this.load.audio('bgm', './assets/bgm.wav');
      this.load.audio('diffUp', './assets/difficulty-up.wav');
      this.load.audio('jump', './assets/jump.wav');
      this.load.audio('select', './assets/bing.wav');
      this.load.audio('gameEnd', './assets/gameOver.wav');
      
      
        

        
    }

    create() {
      console.log("Menu scene loaded")
      



      keyJUMP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
      keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
      let textConfig = {
        fontFamily: 'serif',
        fontSize: '42px',
        color: '#FFFFFF',
        align: 'right',
        padding: {
          top: 5,
          bottom: 5,
        },
        fixedWidth: 0
    }
      this.add.text(game.config.width/2, game.config.height/3, 'SPACE ESCAPE', textConfig).setOrigin(0.5)
      this.add.text(game.config.width/2, game.config.height/2+15, 'Press ↑ to Play and → for Credits', textConfig).setOrigin(0.5)
      
    }

    update() {

      
      if (keyJUMP.isDown){
        this.scene.start("playScene")
      }
      if (keyRIGHT.isDown){
        this.scene.start("creditScene")
      }
     



    }
}