class begin extends Phaser.Scene {
  constructor() {
    super({ key: "begin" });
  }

  preload() {
    this.load.image("beginscene", "assets/BEGINING.jpg");

  }

  create() {
    this.beginscene = this.add.image(0, 0, "beginscene").setOrigin(0,0)
    
    console.log("begin");

    var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function(){
            this.scene.start("level1");
            }, this );


    }
 
}
