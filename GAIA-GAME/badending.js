class badending extends Phaser.Scene {
  constructor() {
    super({ key: "badending" });
  }

  preload() {
    this.load.image("badending", "assets/badending.jpg");

  }

  create() {
    this.badending = this.add.image(0, 0, "badending").setOrigin(0,0)
    
    console.log("bad ending - gameover");

    var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function(){
            this.scene.start("opening");
            }, this );


    }
 
}
