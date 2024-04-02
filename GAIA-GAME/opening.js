class opening extends Phaser.Scene {
  constructor() {
    super({ key: "opening" });
  }

  preload() {
    this.load.image("openingscene", "assets/OPENINGSCENE.jpg");    
  }

  create() {
    
    this.openingscene = this.add.image(0, 0, "openingscene").setOrigin(0,0)
    
    console.log("menu page - opening");


    var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function(){
            this.scene.start("welcome");
            }, this );


    }
 
}
