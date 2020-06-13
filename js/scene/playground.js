class Playground extends Phaser.Scene {
    constructor() {
        super('Playground');
    }

    preload(){
        //preload background
        this.load.image('bgLayer1', 'images/background/layer1.png');
        this.load.image('bgLayer2', 'images/background/layer2.png');
        this.load.image('bgLayer3', 'images/background/layer3.png');

        //preload weapons 
        this.load.image('bullet', 'images/weapons/bullet.png')  
        this.load.image('assaultRifle', 'images/weapons/assaultrifle.png')

        this.load.image('ordinaryEnemy', 'images/enemies/ordinaryEnemy.png')

        //TODO: find blocks
        //load blocks
        for(let i = 0;i <= 230;i++){
            let num_string = i.toString();
            let filename = "isometric_pixel_flat_" + "0".repeat(4-num_string.length) + num_string;
            this.load.image(filename, 'images/blocks/'+filename+".png");
        }
        
        //TODO: find animation spritesheet
        this.load.spritesheet('codey','https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/Cave+Crisis/codey_sprite.png',{ frameWidth: 72, frameHeight: 90 })
    }



    create(){
        this.createBackground();

        gameStatus.blocks = this.physics.add.staticGroup();
        gameStatus.weapons = this.physics.add.group({runChildUpdate: true});
        gameStatus.bullets = this.physics.add.group({runChildUpdate: true});
        gameStatus.players = this.physics.add.group({runChildUpdate: true});
        gameStatus.enemies = this.physics.add.group({runChildUpdate: true});

        this.buildMap("map/map1.json")

        this.createAnimations();

        //camera setting
        gameStatus.cameras = this.cameras;
        this.cameras.main.setBounds(0, 0, gameStatus.mapSize.width, gameStatus.mapSize.height);
        this.physics.world.setBounds(0, 0, gameStatus.mapSize.width, gameStatus.mapSize.height + gameStatus.player.height);
    
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


    }


    update(){
        //player movement
        this.playerControl();
        this.dropItemControl();
        this.fireWeaponControl();
        this.carryItemProcess();
        this.ballistic();

        this.enemyMovement();




        // if(gameStatus.player.y > 500){
        //     gameStatus.player.die();
        //     gameStatus.player.body.position.x = gameStatus.player.spawnPoint.x;
        //     gameStatus.player.body.position.y = gameStatus.player.spawnPoint.y;
        // }
        console.log(gameStatus.player.body.position)

    }

    //create Backgound
    createBackground() {
        gameConfig.background = {}
        // gameConfig.background.layer1 = this.add.image(0, 0, 'bgLayer1').setOrigin(0,0);
        // gameConfig.background.layer2 = this.add.image(0, 0, 'bgLayer2').setOrigin(0,0);
        // gameConfig.background.layer3 = this.add.image(0, 0, 'bgLayer3').setOrigin(0,0);
        gameConfig.background.layer1 = this.add.tileSprite(0, 0,10000,1000, 'bgLayer1').setOrigin(0,0);
        gameConfig.background.layer2 = this.add.tileSprite(0, 0,10000,1000, 'bgLayer2').setOrigin(0,0);
        gameConfig.background.layer3 = this.add.tileSprite(0, 0,10000,1000, 'bgLayer3').setOrigin(0,0);

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

    blockToCoord_LU(x,y){
        return {x: 40*x, y:40*y} 
    }


    
}