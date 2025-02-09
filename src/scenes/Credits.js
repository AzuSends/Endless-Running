class Credits extends Phaser.Scene {
    constructor() {
        super("creditScene")
    }

 

    create() {
      console.log("Credit scene loaded")
      



      keyJUMP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
      keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
      let textConfig = {
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
      this.add.text(50, game.config.height/8, 'CREDITS:', textConfig).setOrigin(0)
      this.add.text(50, game.config.height*2/8, 'Pixel Art by Ben Silver using Piskel', textConfig).setOrigin(0)
      this.add.text(50, game.config.height*3/8, 'Music Made by Ben Silver using beepbox.co', textConfig).setOrigin(0)
      this.add.text(50, game.config.height*4/8, 'Sound effcts by Ben Silver using jfxr.frozenfractal.com', textConfig).setOrigin(0)
      this.add.text(50, game.config.height*5/8, 'Design and Programming by Ben Silver using the Phaser 3 Framework', textConfig).setOrigin(0)
      this.add.text(game.config.width/2, game.config.height*7/8, 'Press ↑ to Play', textConfig).setOrigin(0)

      
    }

    update() {

      
      if (keyJUMP.isDown){
        this.scene.start("playScene")
      }
      



    }
}