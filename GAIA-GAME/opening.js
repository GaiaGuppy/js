class opening extends Phaser.Scene {
  constructor() {
    super({ key: "opening" });
  }

  preload() {
    this.load.image("openingscene", "assets/OPENINGSCENE.jpg");
    this.load.audio("bgmusic", "assets/BG_MUSIC.mp3");
    
  }

  create() {
    this.music = this.sound.add("bgmusic",{loop: true}).setVolume(0.2);
    this.music.play();

    this.openingscene = this.add.image(0, 0, "openingscene").setOrigin(0,0)
    
    console.log("menu page - opening");


    var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function(){
            this.scene.start("welcome");
            }, this );


    }
 
}
