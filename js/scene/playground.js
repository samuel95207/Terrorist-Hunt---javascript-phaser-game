class Playground extends Phaser.Scene {
  constructor() {
    super('Playground');
  }

  create() {
    if (gameStatus.music != undefined) {
      gameStatus.music.stop();
    }

    this.createBackground();

    gameStatus.blocks = this.physics.add.staticGroup();
    gameStatus.weapons = this.physics.add.group({ runChildUpdate: true });
    gameStatus.bullets = this.physics.add.group({ runChildUpdate: true });
    gameStatus.players = this.physics.add.group({ runChildUpdate: true });
    gameStatus.enemies = this.physics.add.group({ runChildUpdate: true });

    this.buildMap(`map/${gameStatus.map}.json`)

    this.createAnimations();

    //camera setting
    gameStatus.cameras = this.cameras;
    this.cameras.main.setBounds(0, 0, gameStatus.mapSize.width, gameStatus.mapSize.height);
    this.physics.world.setBounds(0, 0, gameStatus.mapSize.width, gameStatus.mapSize.height + gameStatus.player.height);
    this.cameras.main.startFollow(gameStatus.player, true, 0.5, 0.5)
    gameStatus.player.setCollideWorldBounds(true);

    gameStatus.music.play({ loop: true, volume: 0.5 });


    if (gameStatus.map == 'end') {
      this.endgameScene();
    } else {
      this.startScene();
    }






    //input setting
    gameStatus.cursors = {
      right: this.input.keyboard.addKey(gameConfig.keyConfig.right),
      left: this.input.keyboard.addKey(gameConfig.keyConfig.left),
      up: this.input.keyboard.addKey(gameConfig.keyConfig.up),
      down: this.input.keyboard.addKey(gameConfig.keyConfig.down),
      jump: this.input.keyboard.addKey(gameConfig.keyConfig.jump),
      pickup: this.input.keyboard.addKey(gameConfig.keyConfig.pickup),
      fire: this.input.keyboard.addKey(gameConfig.keyConfig.fire),
      space: this.input.keyboard.addKey('SPACE')
    }





    //collider setting
    this.playerWeaponOverlap();

    //--player block friction
    this.playerBlocksCollider();
    this.weaponBlockCollider();
    this.enemyBlockCollider();

    this.bulletEnemyCollider();
    this.bulletBlockCollider();
    this.bulletPlayerCollider();


    gameStatus.winFlag = false;






  }


  update() {
    this.carryItemProcess();
    this.ballistic();
    this.enemyMovement();

    if (gameStatus.map == 'end') {
      return;
    }
    //player movement
    this.playerControl();
    this.dropItemControl();
    this.fireWeaponControl();

    this.playerLivesCheck();


    this.stageClearCheck();

    this.livesDisplay();




  }



  //create Backgound
  createBackground() {
    gameStatus.scene = this;
    gameConfig.background = {}
    // gameConfig.background.layer1 = this.add.image(0, 0, 'bgLayer1').setOrigin(0,0);
    // gameConfig.background.layer2 = this.add.image(0, 0, 'bgLayer2').setOrigin(0,0);
    // gameConfig.background.layer3 = this.add.image(0, 0, 'bgLayer3').setOrigin(0,0);
    gameConfig.background.layer1 = this.add.tileSprite(0, 0, 10000, 1000, 'bgLayer1').setOrigin(0, 0);
    gameConfig.background.layer2 = this.add.tileSprite(0, 0, 10000, 1000, 'bgLayer2').setOrigin(0, 0);
    gameConfig.background.layer3 = this.add.tileSprite(0, 0, 10000, 1000, 'bgLayer3').setOrigin(0, 0);

    gameConfig.background.layer1.setScrollFactor(0.3);
    gameConfig.background.layer2.setScrollFactor(0.5);
    gameConfig.background.layer3.setScrollFactor(0.9);

  }

  //create Animation
  createAnimations() {
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('codey', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('codey', { start: 4, end: 5 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'jump',
      frames: this.anims.generateFrameNumbers('codey', { start: 2, end: 3 }),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'fire',
      frames: this.anims.generateFrameNumbers('campfire'),
      frameRate: 10,
      repeat: -1
    })
  }

  blockToCoord_LU(x, y) {
    return { x: 40 * x, y: 40 * y }
  }

  livesDisplay() {
    if(gameStatus.liveText  != undefined){
      gameStatus.liveText.destroy();
    }
    gameStatus.liveText = this.add.text(50, 50, `lives: ${gameStatus.player.lives}`,
      {
        fontFamily: 'Arial',
        fontSize: '20px',
        fontStyle: 'bold',
        color: 'white',
      }
    );
    gameStatus.liveText.setScrollFactor(0);

  }

  playerLivesCheck(){
    if (gameStatus.player.lives < 0) {
      gameStatus.cameras.main.fadeOut(2000, 0, 0, 0);
      this.scene.start('MissionFailed');
    }
  }

  startScene() {
    gameStatus.cameras.main.setZoom(2);
    gameStatus.cameras.main.fadeIn(500, 0, 0, 0);
    setTimeout(() => {
      gameStatus.cameras.main.zoomTo(1, 500);
    }, 100);
  }

  stageClearCheck() {
    var win = true;
    if (gameStatus.enemies.getLength() == 0) {
      win = false;
    }
    gameStatus.enemies.children.each(function (enemy) {
      if (!enemy.is_dead) {
        win = false;
      }
    })
    if (win && !gameStatus.winFlag) {
      gameStatus.winFlag = true;
      console.log('win');
      gameStatus.map = gameStatus.next_level;
      gameStatus.cameras.main.zoomTo(2, 1000);

      setTimeout(() => {
        gameStatus.cameras.main.fadeOut(1000, 0, 0, 0);
      }, 4000);

      if (!gameStatus.map) {
        gameStatus.map = 'end';
      }
      setTimeout(() => {
        gameStatus.music.stop();
        this.scene.restart();
      }, 5000);

    }
  }


  endgameScene() {
    gameStatus.cameras.main.setZoom(1);
    gameStatus.cameras.main.fadeIn(300, 0, 0, 0);

    setTimeout(() => {
      gameStatus.cameras.main.zoomTo(1.5, 100);
    }, 1000);

    setTimeout(() => {
      gameStatus.cameras.main.zoomTo(1.7, 100);
    }, 3600);

    setTimeout(() => {
      gameStatus.cameras.main.zoomTo(2.1, 100);
    }, 6000);

    setTimeout(() => {
      gameStatus.cameras.main.zoomTo(2.5, 100);
    }, 8500);

    setTimeout(() => {

      gameStatus.titleText = this.add.text(200, gameConfig.height * 0.95, 'Winner',
        {
          fontFamily: 'Arial',
          fontSize: '70px',
          fontStyle: 'bold',
          color: 'yellow',
          stroke: 'aqua',
          strokeThickness: 3
        }
      )

    }, 6000);

    var weapon = Playground.prototype.createWeapon(gameStatus.player.body.x, gameStatus.player.body.y, 'assaultRifle');
    gameStatus.player.carryItem = weapon
    weapon.ammo = 1000000000
    weapon.owner = gameStatus.player;

    setTimeout(() => {
      var id = setInterval(function () {
        gameStatus.player.carryItem = weapon
        weapon.owner = gameStatus.player;
        weapon.fire();
        gameStatus.player.stand();
      }, 100);

      setTimeout(() => {
        clearInterval(id);
      }, 3000)

    }, 10000);

    setTimeout(() => {
      gameStatus.cameras.main.fadeOut(2000, 0, 0, 0);
    }, 13000);

    setTimeout(() => {
      gameStatus.music.stop();
      this.scene.start('Menu');
    }, 15000);
  }

}


