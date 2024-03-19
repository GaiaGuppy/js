class level1 extends Phaser.Scene {
  constructor() {
    super({ key: "level1" });
  }

  preload() {
    // Step 1, load JSON
    this.load.tilemapTiledJSON("world1", "assets/level1.tmj");

    // Step 2 : Preload any images here
    this.load.image("RoomIMG", "assets/Room_Builder_32x32.png");
    this.load.image("kitchenIMG", "assets/12_Kitchen_32x32.png");
    this.load.image("bedroomIMG", "assets/4_Bedroom_32x32.png");

    this.load.image("flash", "assets/flashlight.png")

    this.load.spritesheet("MC", "assets/GAMECHILD_MC.png", {frameWidth: 64, frameHeight: 64,});
  } // end of preload //

  create() {
    console.log("animationScene");

    //Step 3 - Create the map from main
    let map = this.make.tilemap({ key: "world1" });

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let roomtiles = map.addTilesetImage("Room_Builder_32x32", "RoomIMG");
    let kitchentiles = map.addTilesetImage("12_Kitchen_32x32", "kitchenIMG");
    let bedroomtiles = map.addTilesetImage("4_Bedroom_32x32", "bedroomIMG");

    //Step 5  create an array of tiles
    let tilesArray = [roomtiles, kitchentiles, bedroomtiles];

    // Step 6  Load in layers by layers
    this.groundlayer = map.createLayer("groundLayer", tilesArray, 0, 0);
    this.walllayer = map.createLayer("wallLayer", tilesArray, 0, 0);
    this.decorlayer = map.createLayer("decorLayer", tilesArray, 0, 0);
    this.shadowlayer = map.createLayer("shadowLayer", tilesArray, 0, 0);

    let flashlight = map.findObject("objectLayer", (obj) => obj.name === "flashlight");

    this.flashlight = this.physics.add
      .sprite(flashlight.x, flashlight.y, "flash").setScale(0.05)

    this.cursors = this.input.keyboard.createCursorKeys();

    var key2Down = this.input.keyboard.addKey(50);

    key2Down.on(
      "down",
      function () {
        console.log("Key 2 pressed");
        this.scene.start("level2");
      },
      this
    );

    // make the camera follow the player
    // this.cameras.main.startFollow(this.player);

    this.anims.create({
      key: "MC-up",
      frames: this.anims.generateFrameNumbers("MC", { start: 105, end: 112 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "MC-left",
      frames: this.anims.generateFrameNumbers("MC", { start: 118, end: 125 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "MC-down",
      frames: this.anims.generateFrameNumbers("MC", { start: 131, end: 138 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "MC-right",
      frames: this.anims.generateFrameNumbers("MC", { start: 144, end: 151 }),
      frameRate: 5,
      repeat: -1,
    });

    this.player = this.physics.add.sprite(146, 276, "MC");
    window.player = this.player;
    this.player.body.setSize(this.player.width * 0.3, this.player.height * 0.5);

    this.walllayer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.walllayer);

    this.player.setCollideWorldBounds(true);

    this.physics.add.overlap(this.player, this.flashlight, this.collectflash, null, this);


    // create the arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();
    // // camera follow player
    this.cameras.main.startFollow(this.player);
  } // end of create //

  update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play("MC-left", true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play("MC-right", true);
    } else if (this.cursors.up.isDown) {
      this.player.setVelocityY(-160);
      this.player.anims.play("MC-up", true);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(160);
      this.player.anims.play("MC-down", true);
    } else {
      this.player.setVelocity(0);
      this.player.anims.stop();
    }

    if (
      
      this.player.x > 625 && 
      this.player.y > 272 && 
      this.player.y < 320
      ) 
      
      {
      console.log("level2");
      this.level2();
    }
  } // end of update //

  // Function to jump to room1
  level2(player, tile) {
    console.log("level2 function");
    this.scene.start("level2");
  }

  collectflash(player, item) {
    console.log("collect flash");
    // this.cameras.main.shake(10);
    item.disableBody(true, true);
    return false;
  }
}
