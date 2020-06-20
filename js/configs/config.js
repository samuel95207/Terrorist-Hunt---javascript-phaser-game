const gameConfig = {}

gameConfig.height = window.innerHeight-120;
gameConfig.width = window.innerWidth-120;

//player configs
gameConfig.playerAcceleration = 70;
gameConfig.playerFriction = 30;
gameConfig.playerMaxSpeed = 600;
gameConfig.jumpVelocity = 1300;
gameConfig.playerLives = 3;

//physics configs
gameConfig.gravity = 3000;
gameConfig.enemyFriction = 30;



//keyboard config
gameConfig.keyConfig = {
    up: 'UP',
    down: 'DOWN',
    left: 'LEFT',
    right: 'RIGHT',
    jump: 'UP',
    fire: 'z',
    pickup: 'c'
}


gameConfig.enemy = {
    ordinaryEnemy: {
        acceleration: 300,
        maxSpeed: 500,
        sight: 400,
        fireProbability: 0.5,
        fireDelay: 400,
        weapon: "assaultRifle"
    }
}

