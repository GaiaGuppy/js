class preloadScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'preloadScene' });

    }

    preload ()
    
    {
        this.load.audio("game_ost", "assets/game_ost.mp3");

    }

    create () {

        this.music = this.sound.add("game_ost",{loop: true}).setVolume(0.7);
    this.music.play();
    
        console.log("preloadScene")
        this.add.text(10,500, 'Animation labs, press spacebar to continue', 
            { font: '24px Courier', fill: '#ffffff' });

        var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function(){
            this.scene.start("level1");
            }, this );


    }

}
