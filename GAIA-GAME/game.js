
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    backgroundColor: '#000000',
    scene: [ opening, welcome, instructions, begin, level1, level2, level3, level4, goodending], 
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
      },

};

let game = new Phaser.Game(config);