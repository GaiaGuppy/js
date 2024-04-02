class level4 extends Phaser.Scene {
  constructor() {
    super({ key: "level4" });
  }

  preload() {
    // Step 1, load JSON
    this.load.tilemapTiledJSON("world4", "assets/level4.tmj");

    // Step 2 : Preload any images here
    this.load.image("RoomIMG", "assets/Room_Builder_32x32.png");
    this.load.image("bedroomIMG", "assets/4_Bedroom_32x32.png");
    this.load.image("furnitureIMG", "assets/Floors_furnitures.png");

    this.load.spritesheet("MC", "assets/GAMECHILD_MC.png", {frameWidth: 64, frameHeight: 64,});
    this.load.spritesheet("mama", "assets/GAMEMC_MAMA.png", {frameWidth: 64, frameHeight:64});
    this.load.spritesheet("papa", "assets/GAMEMC_PAPA.png", {frameWidth: 64, frameHeight:64});

  } // end of preload //

  create() {
    console.log("animationScene");

    //Step 3 - Create the map from main
    let map = this.make.tilemap({ key: "world4" });

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let roomtiles = map.addTilesetImage("Room_Builder_32x32", "RoomIMG");
    let bedroomtiles = map.addTilesetImage("4_Bedroom_32x32", "bedroomIMG");
    let furnituretiles = map.addTilesetImage("Floors_furnitures", "furnitureIMG");

    //Step 5  create an array of tiles
    let tilesArray = [roomtiles, bedroomtiles, furnituretiles];

    // Step 6  Load in layers by layers
    this.groundlayer = map.createLayer("groundLayer", tilesArray, 0, 0);
    this.walllayer = map.createLayer("wallLayer", tilesArray, 0, 0);
    this.decorlayer = map.createLayer("decorLayer", tilesArray, 0, 0);
    this.walllayer2 = map.createLayer("wallLayer2", tilesArray, 0, 0);
    this.shadowlayer = map.createLayer("shadowLayer", tilesArray, 0, 0);
    this.shadowlayer2 = map.createLayer("shadowLayer2", tilesArray, 0, 0);

    let mama = map.findObject("objectLayer", (obj) => obj.name === "mama");
    let papa = map.findObject("objectLayer", (obj) => obj.name === "papa");

    this.mama = this.physics.add.sprite(mama.x, mama.y, "mama").setScale(1)
    this.papa = this.physics.add.sprite(papa.x, papa.y, "papa").setScale(1)

    this.cursors = this.input.keyboard.createCursorKeys();

    var key1Down = this.input.keyboard.addKey(49);

    key1Down.on(
      "down",
      function () {
        console.log("Key 1 pressed");
        this.scene.start("level1");
      },
      this
    );

    this.anims.create({
      key: "MC-up",
      frames: this.anims.generateFrameNumbers("MC", { start: 105, end: 112 }),
      frameRate: 10,
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
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "MC-right",
      frames: this.anims.generateFrameNumbers("MC", { start: 144, end: 151 }),
      frameRate: 5,
      repeat: -1,
    });

    this.player = this.physics.add.sprite(337, 591, "MC");
    window.player = this.player;
    this.player.body.setSize(this.player.width * 0.3, this.player.height * 0.5);

    this.walllayer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.walllayer);
    this.walllayer2.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.walllayer2);

    this.physics.world.bounds.width = this.walllayer.width;
    this.physics.world.bounds.height = this.walllayer.height;
    this.player.setCollideWorldBounds(true);


    // create the arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();
    // // camera follow player
    this.cameras.main.startFollow(this.player);

    // make the camera follow the player
    // this.cameras.main.startFollow(this.player);
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
      this.player.x > 294 &&
      this.player.x < 350 &&
      this.player.y < 439
    ) {
      console.log("goodending");
      this.scene.start("goodending");
    }

    } // end of update //
 
}
