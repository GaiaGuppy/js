class begin extends Phaser.Scene {
  constructor() {
    super({ key: "begin" });
  }

  preload() {
    this.load.image("beginscene", "assets/BEGINING.jpg");
    this.load.audio("game_ost", "assets/game_ost.mp3");


  }

  create() {
    this.beginscene = this.add.image(0, 0, "beginscene").setOrigin(0,0)
    this.music = this.sound.add("game_ost",{loop: true}).setVolume(0.2);
        this.music.play();

    
    console.log("begin");

    var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function(){
            this.scene.start("level1");
            }, this );


    }
 
}
