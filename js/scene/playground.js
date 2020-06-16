class Playground extends Phaser.Scene {
  constructor() {
    super('Playground');
  }

  preload() {

  }



  create() {
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
    gameStatus.cameras.main.setZoom(1);
    this.cameras.main.startFollow(gameStatus.player, true, 0.5, 0.5)
    gameStatus.player.setCollideWorldBounds(true);





    //input setting
    gameStatus.cursors = {
      right: this.input.keyboard.addKey(gameConfig.keyConfig.right),
      left: this.input.keyboard.addKey(gameConfig.keyConfig.left),
      up: this.input.keyboard.addKey(gameConfig.keyConfig.up),
      down: this.input.keyboard.addKey(gameConfig.keyConfig.down),
      jump: this.input.keyboard.addKey(gameConfig.keyConfig.jump),
      pickup: this.input.keyboard.addKey(gameConfig.keyConfig.pickup),
      fire: this.input.keyboard.addKey(gameConfig.keyConfig.fire)
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



    this.startScene();


  }


  update() {
    //player movement
    this.playerControl();
    this.dropItemControl();
    this.fireWeaponControl();
    this.carryItemProcess();
    this.ballistic();

    this.enemyMovement();

    if (gameStatus.player.lives < 0) {
      this.scene.restart();
    }

    
    var win = true;
    if(gameStatus.enemies.getLength() == 0){
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
      gameStatus.cameras.main.zoomTo(2,);

      setTimeout(() => {
        gameStatus.cameras.main.fadeOut(1000,0,0,0);
      }, 4000);
      
      setTimeout(() => {
        this.scene.restart();
      }, 5000);

    }

  }



  //create Backgound
  createBackground() {
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

  startScene(){
    this.cameras.main.fade(0,0,0,0);
    
    var style = { font: "bold 32px Arial", fill: "#fff"};
    var title = this.add.text(gameConfig.width/2 - 40, gameConfig.height/2, "Loading", style);
    
    setTimeout(() => {
      gameStatus.cameras.main.fadeIn(1000,0,0,0);
    }, 4000);
  }

}


