class MissionFailed extends Phaser.Scene {
    constructor() {
        super('MissionFailed');
    }

    create() {
        var style = { font: "bold 32px Arial", fill: "#fff"};
        var title = this.add.text(gameConfig.width/2 - 40, gameConfig.height/2, "Mission Failed!", style);
        setTimeout(() => {
            gameStatus.cameras.main.fadeOut(2000, 0, 0, 0);
          }, 10000);
          setTimeout(() => {
            this.scene.start('Playground');
          }, 12000);
    }
}