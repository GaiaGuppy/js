class preloadScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'preloadScene' });
        this.load.audio("bgmusic", "assets/BG_MUSIC.mp3");
    }


    create () {
        this.music = this.sound.add("bgmusic",{loop: true}).setVolume(0.2);
        this.music.play();
        
        console.log("preloadScene")
        this.add.text(10,500, 'Animation labs, press spacebar to continue', 
            { font: '24px Courier', fill: '#ffffff' });

        var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function(){
            this.scene.start("testMap");
            }, this );


    }

}
