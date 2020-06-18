class Load extends Phaser.Scene {
    constructor() {
        super('Load');
    }
    preload() {
        var style = { font: "bold 32px Arial", fill: "#fff"};
        var title = this.add.text(gameConfig.width/2 - 40, gameConfig.height/2, "Loading", style);

        this.loadBackground();
        this.loadBlocks();
        this.loadWeapons();
        this.loadEnemies();
        this.loadPlayer();
        this.loadBGM();


        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff //white
            }
        })

        this.load.on("progress", (percent) => {
            loadingBar.fillRect(0, this.game.renderer.height * 0.8, this.game.renderer.width * percent, 50);
            // console.log(percent);
        })

        this.load.on("complete", () => {
            //this.scene.start(CST.SCENES.MENU, "hello from LoadScene");
        });

        this.load.on("load", (file) => {
            // console.log(file.src)
        })
    }
    
    create() {
        this.scene.start('Menu');
    }

    loadBackground() {
        //preload background
        this.load.image('bgLayer1', 'images/background/layer1.png');
        this.load.image('bgLayer2', 'images/background/layer2.png');
        this.load.image('bgLayer3', 'images/background/layer3.png');
    }

    loadBlocks() {
        //load blocks
        for (let i = 0; i <= 230; i++) {
            let num_string = i.toString();
            let filename = "isometric_pixel_flat_" + "0".repeat(4 - num_string.length) + num_string;
            this.load.image(filename, 'images/blocks/' + filename + ".png");
        }
    }

    loadWeapons() {
        //preload weapons 
        this.load.image('bullet', 'images/weapons/bullet.png')
        this.load.image('assaultRifle', 'images/weapons/assaultrifle.png')
        this.load.image('pistol', 'images/weapons/pistol.png')
        this.load.image('smg', 'images/weapons/smg.png')
        this.load.image('revolver', 'images/weapons/revolver.png')
        this.load.image('sniper', 'images/weapons/sniper.png')
        this.load.image('shotgun', 'images/weapons/shotgun.png')
        this.load.image('grenade', 'images/weapons/grenade.png')

        this.load.audio('assaultRifleSound', 'sounds/weapons/assaultRifle.wav');
        this.load.audio('pistolSound', 'sounds/weapons/pistol.wav');
        this.load.audio('shotgunSound', 'sounds/weapons/shotgun.wav');
        this.load.audio('sniperSound', 'sounds/weapons/sniper.wav');
        this.load.audio('smgSound', 'sounds/weapons/smg.wav');
        this.load.audio('emptySound', 'sounds/weapons/empty.wav');
        this.load.audio('explodeSound', 'sounds/weapons/explode.wav');
    }

    loadEnemies() {
        this.load.image('ordinaryEnemy', 'images/enemies/ordinaryEnemy.png')
    }

    loadPlayer() {
        //TODO: find animation spritesheet
        this.load.spritesheet('codey', 'https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/Cave+Crisis/codey_sprite.png', { frameWidth: 72, frameHeight: 90 })
    }

    loadBGM(){
        this.load.audio('menuBGM', 'sounds/bgm/menu.wav');
        this.load.audio('level1BGM', 'sounds/bgm/level1.wav');
        this.load.audio('level2BGM', 'sounds/bgm/level2.wav');
        this.load.audio('endBGM', 'sounds/bgm/end.wav');


    }

}
