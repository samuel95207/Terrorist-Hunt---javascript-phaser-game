class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
    }

    create() {
        //creating the menu screen
        this.createBackground();


        var startText = this.add.text(gameConfig.width / 2 - 150, gameConfig.height * 0.8, 'Press Space to Start',
            {
                fontFamily: 'Arial',
                fontSize: '30px',
                fontStyle: 'bold',
                color: 'white',
            });

        gameStatus.textTween = this.tweens.add({
            targets: startText,
            scaleX: {10},
            ease: 'Bounce',
            duration: 5000,
            repeat: -1,
            yoyo: true
        });

        gameStatus.textTween.play();
        


        gameStatus.cameras = this.cameras;






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

    update() {
        if (this.input.keyboard.addKey('SPACE').isDown) {
            gameStatus.cameras.main.fadeOut(1000, 0, 0, 0);
            gameStatus.map = 'level1';
            this.scene.start('Playground');
        }
        console.log(gameStatus.textTween.isPlaying())
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

        gameConfig.background.layer1.setScrollFactor(0.3);
        gameConfig.background.layer2.setScrollFactor(0.5);
        gameConfig.background.layer3.setScrollFactor(0.9);

    }
}