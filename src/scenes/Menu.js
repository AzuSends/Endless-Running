class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {
        // load images/tile sprites
        this.load.image('spaceship', './assets/spaceship.png')
        this.load.image('starfield', './assets/starfield.png')

        
    }

    create() {
      //Create animations
      console.log("Menu scene loaded")
      this.scene.start("playScene")


      //Text config for menu


      //Menu text

      //Define menu keys
    
    
    
    }

    update() {
      //Menu key actions
      {
        //Game settings and enter gameplay scene
      }




    }
}