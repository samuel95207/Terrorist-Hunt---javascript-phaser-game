
// const Menu = {
//     key: 'Menu',
//     preload: function(){
//         this.load.image('bgLayer1', 'images/background/layer1.png');
//         this.load.image('bgLayer2', 'images/background/layer2.png');
//         this.load.image('bgLayer3', 'images/background/layer3.png');
//         // this.load.image('codey', 'https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/codey.png');

//         //TODO: find animation spritesheet
//         this.load.spritesheet('codey','https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/Cave+Crisis/codey_sprite.png',{ frameWidth: 72, frameHeight: 90 })
//     },
//     create: function(){
//         gameConfig.background = {}
//         gameConfig.background.layer1 = this.add.tileSprite(gameConfig.width/2, gameConfig.height/2, gameConfig.width, gameConfig.height, 'bgLayer1');
//         gameConfig.background.layer2 = this.add.tileSprite(gameConfig.width/2, gameConfig.height/2, gameConfig.width, gameConfig.height, 'bgLayer2');
//         gameConfig.background.layer3 = this.add.tileSprite(gameConfig.width/2, gameConfig.height/2, gameConfig.width, gameConfig.height, 'bgLayer3');

//         gameStatus.player = this.physics.add.sprite(30, 200, 'codey');
//         gameStatus.cursors = this.input.keyboard.createCursorKeys();
//     },
//     update: function(){
        
//     }
// }