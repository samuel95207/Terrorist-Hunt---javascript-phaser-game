class End extends Phaser.Scene {
    constructor() {
        super('End');
    }

    create() {
        //creating the menu screen
        this.createBackground();

        this.buildMap(`map/end.json`)


        this.add.text(gameConfig.width / 2 - 150, gameConfig.height / 2, 'Press Space to Start',
            {
                fontFamily: 'Arial',
                fontSize: '30px',
                fontStyle: 'bold',
                color: 'white',
            });

        gameStatus.cameras = this.cameras;



    }

    update(){
        if(this.input.keyboard.addKey('ESC').isDown){
            gameStatus.cameras.main.fadeOut(1000, 0, 0, 0);
            gameStatus.map = 'level1';
            this.scene.start('Menu');
        }
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