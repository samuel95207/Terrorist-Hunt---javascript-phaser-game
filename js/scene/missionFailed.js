class MissionFailed extends Phaser.Scene {
    constructor() {
        super('MissionFailed');
    }

    create() {
        if (gameStatus.music != undefined) {
            gameStatus.music.stop();
        }
        var style = { font: "bold 50px Arial", fill: "#fff" };
        var title = this.add.text(gameConfig.width / 2 - 200, gameConfig.height / 2, "Mission Failed!", style);
        setTimeout(() => {
            gameStatus.scene.sound.play('missionFailed');
        }, 2000);
        setTimeout(() => {
            this.scene.start('Playground');
        }, 8000);
    }
}