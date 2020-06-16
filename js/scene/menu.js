class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
    }

    create() {
        //creating the menu screen
        this.createBackground();


        var playButton = this.add.text(gameConfig.width / 2 - 150, gameConfig.height / 2, 'PLAY',
            {
                fontFamily: 'Arial',
                fontSize: '120px',
                fontStyle: 'bold',
                color: 'blue',
                stroke: 'yellow',
                strokeThickness: 20,
                shadow: {
                    offsetX: 0,
                    offsetY: 0,
                    color: '#000',
                    blur: 0,
                    stroke: false,
                    fill: false
                },
            });

        playButton.setInteractive();

        playButton.on("pointerover", () => {
            // hoverSprite.setVisible(true);
            // hoverSprite.play("walk");
            // hoverSprite.x = playButton.x - playButton.width;
            // hoverSprite.y = playButton.y;

        })

        playButton.on("pointerout", () => {
            // hoverSprite.setVisible(false);
        })

        playButton.on("pointerup", () => {
            gameStatus.map = 'level1';
            this.scene.start('Playground');
        })



        // let optionsButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 100, CST.IMAGE.OPTIONS).setDepth(1);

        // //create sprites (if using pixel art, remove sharpen)

        // hoverSprite.setScale(2);
        // hoverSprite.setVisible(false);

        // //create audio, disable pauseonblur

        // this.sound.pauseOnBlur = false;
        // //this.sound.play(CST.AUDIO.TITLE, {loop: true})

        // //create animation

        // this.anims.create({
        //     key: "walk",
        //     frameRate: 4,
        //     repeat: -1, //repeat forever,
        //     frames: this.anims.generateFrameNumbers(CST.SPRITE.CAT, {
        //         frames: [0, 1, 2, 3]
        //     })
        // });
        // //make image buttons interactive

        // /* 
        //     PointerEvents:
        //         pointerover - hovering
        //         pointerout - not hovering
        //         pointerup - click and release
        //         pointerdown - just click
        // */


        // optionsButton.setInteractive();

        // optionsButton.on("pointerover", () => {
        //     hoverSprite.setVisible(true);
        //     hoverSprite.play("walk");
        //     hoverSprite.x = optionsButton.x - optionsButton.width;
        //     hoverSprite.y = optionsButton.y;

        // })

        // optionsButton.on("pointerout", () => {
        //     hoverSprite.setVisible(false);
        // })

        // optionsButton.on("pointerup", () => {
        //     //this.scene.launch();
        // })


    }

    createBackground() {
        gameConfig.background = {}
        gameConfig.background.layer1 = this.add.tileSprite(0, 0, 10000, 1000, 'bgLayer1').setOrigin(0, 0);
        gameConfig.background.layer2 = this.add.tileSprite(0, 0, 10000, 1000, 'bgLayer2').setOrigin(0, 0);
        gameConfig.background.layer3 = this.add.tileSprite(0, 0, 10000, 1000, 'bgLayer3').setOrigin(0, 0);

        gameConfig.background.layer1.scaleY = 0.65
        gameConfig.background.layer2.scaleY = 0.65
        gameConfig.background.layer3.scaleY = 0.65

        gameConfig.background.layer1.scaleX = 0.65
        gameConfig.background.layer2.scaleX = 0.65
        gameConfig.background.layer3.scaleX = 0.65

        console.log(gameConfig.background.layer1)

        gameConfig.background.layer1.setScrollFactor(0.3);
        gameConfig.background.layer2.setScrollFactor(0.5);
        gameConfig.background.layer3.setScrollFactor(0.9);

    }
}