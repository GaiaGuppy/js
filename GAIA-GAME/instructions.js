class instructions extends Phaser.Scene {
  constructor() {
    super({ key: "instructions" });
  }

  preload() {
    this.load.image("instructionscene", "assets/INSTRUCTIONSCENE.jpg");

  }

  create() {
    this.instructionscene = this.add.image(0, 0, "instructionscene").setOrigin(0,0)
    
    console.log("instructions");

    var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function(){
            this.scene.start("begin");
            }, this );


    }
 
}
