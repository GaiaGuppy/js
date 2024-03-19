class level2 extends Phaser.Scene {
  constructor() {
    super({ key: "level2" });
  }

  preload() {
    // Step 1, load JSON
    this.load.tilemapTiledJSON("world2", "assets/level2.tmj");

    // Step 2 : Preload any images here
    this.load.image("RoomIMG", "assets/Room_Builder_32x32.png");
    this.load.image("kitchenIMG", "assets/12_Kitchen_32x32.png");
    this.load.image("bedroomIMG", "assets/4_Bedroom_32x32.png");

    this.load.image("heart", "assets/heart.png")
    this.load.image("battery", "assets/Battery.png")

    this.load.spritesheet("MC", "assets/GAMECHILD_MC.png", {frameWidth: 64, frameHeight: 64,});
    this.load.spritesheet("ENEMY", "assets/GAMEPUMPKIN_MAN.png", {frameWidth: 64, frameHeight:64});

  }

  create() {
    console.log("animationScene");

    //Step 3 - Create the map from main
    let map = this.make.tilemap({ key: "world2" });

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
    this.walllayer2 = map.createLayer("wallLayer2", tilesArray, 0, 0);
    this.decorlayer = map.createLayer("decorLayer", tilesArray, 0, 0);
    this.decorlayer2 = map.createLayer("decorLayer2", tilesArray, 0, 0);
    this.shadowlayer = map.createLayer("shadowLayer", tilesArray, 0, 0);

    var heart = map.findObject("objectLayer", (obj) => obj.name === "heart");
    var heart = map.findObject("objectLayer", (obj) => obj.name === "heart2");

    var battery = map.findObject("objectLayer", (obj) => obj.name === "battery");
    var battery = map.findObject("objectLayer", (obj) => obj.name === "battery2");
    var battery = map.findObject("objectLayer", (obj) => obj.name === "battery3");


    this.heart = this.physics.add.sprite(heart.x, heart.y, "heart").setScale(0.3)
    this.heart2 = this.physics.add.sprite(heart.x, heart.y, "heart").setScale(0.3)

    this.battery = this.physics.add.sprite(battery.x, battery.y, "battery").setScale(0.05)
    this.battery2 = this.physics.add.sprite(battery.x, battery.y, "battery").setScale(0.05)
    this.battery3 = this.physics.add.sprite(battery.x, battery.y, "battery").setScale(0.05)


    this.cursors = this.input.keyboard.createCursorKeys();

    var key3Down = this.input.keyboard.addKey(51);
    
    key3Down.on(
      "down",
      function () {
        console.log("Key 3 pressed");
        this.scene.start("level3");
      },
      this
    );

    var key1Down = this.input.keyboard.addKey(49);
    key1Down.on(
      "down",
      function () {
        console.log("Key 1 pressed");
        this.scene.start("level1");
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

    this.player = this.physics.add.sprite(24, 1124, "MC");
    window.player = this.player;
    this.player.body.setSize(this.player.width * 0.3, this.player.height * 0.5);

    this.walllayer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.walllayer);
    this.walllayer2.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.walllayer2);
    this.decorlayer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.decorlayer);

    this.player.setCollideWorldBounds(true);

    this.physics.add.overlap(this.player, this.heart, this.heart2, this.collectheart, null, this);
    this.physics.add.overlap(this.player, this.battery, this.battery2, this.battery3, this.collectbattery, null, this);


    // create the arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();
    // // camera follow player
    this.cameras.main.startFollow(this.player);
  }

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
      this.player.x > 75 && 
      this.player.y > 1124 && 
      this.player.y < 1185
      ) 
      
      {
      console.log("level1");
      this.level1();
    }
    if (
      
      this.player.x < 182 && 
      this.player.x > 105 && 
      this.player.y < 1
      ) 
      
      {
      console.log("level3");
      this.level3();
    }
  } //end of update

  // Function to jump to room1
  level1(player, tile) {
    console.log("level1 function");
    this.scene.start("level1");
  }

  // Function to jump to room3
  level3(player, tile) {
    console.log("level3 function");
    this.scene.start("level3");
  }

  collectheart(player, item) {
    console.log("collect heart");
    // this.cameras.main.shake(10);
    item.disableBody(true, true);
    return false;
  }
  collectbattery(player, item) {
    console.log("collect battery");
    // this.cameras.main.shake(10);
    item.disableBody(true, true);
    return false;
  }
}
