const config = {
    width: gameConfig.width,
    height: gameConfig.height,
    backgroundColor:'black',
    physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: gameConfig.gravity },
          enableBody: true,
          debug: false
        }
    },
    scene: [Load, Menu, Playground]
}


const game = new Phaser.Game(config);