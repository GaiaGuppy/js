class sponsor extends Phaser.Scene {
  constructor() {
    super({ key: "sponsor" });
  }

  preload() {
    this.load.image("sponsor", "assets/sponsor.jpg");

  }

  create() {
    this.sponsor = this.add.image(0, 0, "sponsor").setOrigin(0,0)
    
    console.log("sponsorpage");

    var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function(){
            this.scene.start("opening");
            }, this );


    }
 
}
