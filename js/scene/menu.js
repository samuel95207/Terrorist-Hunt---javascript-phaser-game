class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
    }

    create() {
        //creating the menu screen
        this.createBackground();


        gameStatus.startText = this.add.text(gameConfig.width / 2 - 150, gameConfig.height * 0.8, 'Press Space to Start',
            {
                fontFamily: 'Arial',
                fontSize: '30px',
                fontStyle: 'bold',
                color: 'white',
            });

        gameStatus.textDir = true;


        gameStatus.cameras = this.cameras;



    }

    update() {
        if (this.input.keyboard.addKey('SPACE').isDown) {
            gameStatus.cameras.main.fadeOut(1000, 0, 0, 0);
            gameStatus.map = 'level1';
            this.scene.start('Playground');
        }

        if(gameStatus.textDir){
            gameStatus.startText.scaleX += 0.01;
            gameStatus.startText.scaleY += 0.01;
            gameStatus.startText.x -= 1;
            gameStatus.startText.y -= 1;
        }else{
            gameStatus.startText.scaleX -= 0.01;
            gameStatus.startText.scaleY -= 0.01;
            gameStatus.startText.x += 1;
            gameStatus.startText.y += 1;
        }
        if(gameStatus.startText.scaleX > 1.2 || gameStatus.startText.scaleX < 1){
            gameStatus.textDir = !gameStatus.textDir;
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

        gameConfig.background.layer1.setScrollFactor(0.3);
        gameConfig.background.layer2.setScrollFactor(0.5);
        gameConfig.background.layer3.setScrollFactor(0.9);

    }
}