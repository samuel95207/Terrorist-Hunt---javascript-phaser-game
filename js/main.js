const config = {
    width: gameConfig.width,
    height: gameConfig.height,
    backgroundColor:'black',
    parent: 'phaser',
    dom: {
        createContainer: true
    },
    physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: gameConfig.gravity },
          enableBody: true,
          debug: false
        }
    },
    scene: [Load, Menu, Playground, MissionFailed]
}


const game = new Phaser.Game(config);