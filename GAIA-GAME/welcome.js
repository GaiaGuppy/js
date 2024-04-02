class welcome extends Phaser.Scene {
  constructor() {
    super({ key: "welcome" });
  }

  preload() {
    this.load.image("welcomescene", "assets/WELCOMESCENE.jpg");

  }

  create() {
    this.welcomescene = this.add.image(0, 0, "welcomescene").setOrigin(0,0)
    
    console.log("menu page - welcome");

    var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function(){
            this.scene.start("instructions");
            }, this );


    }
 
}
