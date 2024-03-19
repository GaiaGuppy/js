class goodending extends Phaser.Scene {
  constructor() {
    super({ key: "goodending" });
  }

  preload() {
    this.load.image("goodending", "assets/GOODENDING.jpg");

  }

  create() {
    this.good_ending = this.add.image(0, 0, "goodending").setOrigin(0,0)
    
    console.log("goodending");

    var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function(){
            this.scene.start("opening");
            }, this );


    }
 
}
