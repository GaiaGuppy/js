class level3 extends Phaser.Scene {
  constructor() {
    super({ key: "level3" });
  }

  preload() {
    // Step 1, load JSON
    this.load.tilemapTiledJSON("world3", "assets/level3.tmj");

    // Step 2 : Preload any images here
    this.load.image("RoomIMG", "assets/Room_Builder_32x32.png");
    this.load.image("kitchenIMG", "assets/12_Kitchen_32x32.png");
    this.load.image("bedroomIMG", "assets/4_Bedroom_32x32.png");
    this.load.image("furnitureIMG", "assets/Floors_furnitures.png");

    this.load.image("heart", "assets/heart.png")
    this.load.image("heart2", "assets/heart.png")


    this.load.spritesheet("MC", "assets/GAMECHILD_MC.png", {frameWidth: 64, frameHeight: 64,});
    this.load.spritesheet("ENEMY", "assets/GAMEPUMPKIN_MAN.png", {frameWidth: 64, frameHeight:64});

    this.load.audio("ow", "assets/MC_hit.wav");
    this.load.audio("got_it!", "assets/collect.wav");
  
  } // end of preload //

  create() {
    console.log("animationScene");

    //Step 3 - Create the map from main
    let map = this.make.tilemap({ key: "world3" });

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let roomtiles = map.addTilesetImage("Room_Builder_32x32", "RoomIMG");
    let kitchentiles = map.addTilesetImage("12_Kitchen_32x32", "kitchenIMG");
    let bedroomtiles = map.addTilesetImage("4_Bedroom_32x32", "bedroomIMG");
    let furnituretiles = map.addTilesetImage(
      "Floors_furnitures",
      "furnitureIMG"
    );

    //Step 5  create an array of tiles
    let tilesArray = [roomtiles, kitchentiles, bedroomtiles, furnituretiles];

    // Step 6  Load in layers by layers
    this.groundlayer = map.createLayer("groundLayer", tilesArray, 0, 0);
    this.walllayer = map.createLayer("wallLayer", tilesArray, 0, 0);
    this.decorlayer = map.createLayer("decorLayer", tilesArray, 0, 0);
    this.obstaclelayer = map.createLayer("obstacleLayer", tilesArray, 0, 0);
    this.shadowlayer = map.createLayer("shadowLayer", tilesArray, 0, 0);

    let heart = map.findObject("objectLayer", (obj) => obj.name === "heart");
    this.heart = this.physics.add.sprite(heart.x, heart.y, "heart")

    let heart2 = map.findObject("objectLayer", (obj) => obj.name === "heart2");
    this.heart2 = this.physics.add.sprite(heart2.x, heart2.y, "heart2")

    this.cursors = this.input.keyboard.createCursorKeys();

    var key1Down = this.input.keyboard.addKey(49);
    var key4Down = this.input.keyboard.addKey (52)

    key1Down.on(
      "down",
      function () {
        console.log("Key 1 pressed");
        this.scene.start("level1");
      },
      this
    );

    key4Down.on(
      "down",
      function () {
        console.log("Key 4 pressed");
        this.scene.start("level4");
      },
      this
    );

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

    // ENEMY MOVEMENT
    this.anims.create({
      key: "ENEMY-up",
      frames: this.anims.generateFrameNumbers("ENEMY", { start: 105, end: 112 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "ENEMY-left",
      frames: this.anims.generateFrameNumbers("ENEMY", { start: 118, end: 125 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "ENEMY-down",
      frames: this.anims.generateFrameNumbers("ENEMY", { start: 131, end: 138 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "ENEMY-right",
      frames: this.anims.generateFrameNumbers("ENEMY", { start: 144, end: 151 }),
      frameRate: 5,
      repeat: -1,
    });


    this.player = this.physics.add.sprite(159, 1250, "MC");
    window.player = this.player;
    this.player.body.setSize(this.player.width * 0.3, this.player.height * 0.5);

    this.enemy = this.physics.add.sprite(20, 1500, "ENEMY").setScale(2)


    this.walllayer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.walllayer);
    this.obstaclelayer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.obstaclelayer);

    this.physics.world.bounds.width = this.walllayer.width;
    this.physics.world.bounds.height = this.walllayer.height;
    this.player.setCollideWorldBounds(true);

    this.physics.add.overlap(this.player, this.heart, this.collectheart, null, this);
    this.physics.add.overlap(this.player, this.heart2, this.collectheart, null, this);

    this.physics.add.overlap(this.player, this.enemy, this.hitEnemy, null, this);

    this.enemy.anims.play("ENEMY-left");
    this.enemy.anims.play("ENEMY-right");
    this.enemy.anims.play("ENEMY-up");
    // this.enemy.anims.play("ENEMY-down");

    // create the arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // make the camera follow the player
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

// enemy follow after player
this.physics.moveToObject( this.enemy, this.player, 700, 1500);

      if (
        this.player.x > 44 &&
        this.player.x < 276 &&
        this.player.y < 23
      ) {
        console.log("level4");
        this.level4();
      }

    } // end of update //

    // Function to jump to room1
    level4(player, tile) {
      console.log("level4 function");
      this.scene.start("level4",);
  }
  collectheart(player, item) {
    console.log("collect heart");
    // this.cameras.main.shake(10);
    this.sound.play("got_it!")
    item.disableBody(true, true);
    return false;
  } 
  hitEnemy(player, item) {
    console.log("got hurt!");
    this.cameras.main.shake(10);
    this.sound.play("ow");
    item.disableBody(true, true);
    return false;
  }
}
