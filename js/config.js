const gameConfig = {}

gameConfig.height = 720;
gameConfig.width = 1320;

//player configs
gameConfig.playerAcceleration = 70;
gameConfig.playerFriction = 30;
gameConfig.playerMaxSpeed = 600;
gameConfig.jumpVelocity = 1100;
gameConfig.playerLives = 10;

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

//weapon config
gameConfig.weapon = {

    assaultRifle: {
        handle: {x: 10,y: 15},
        barrel: {x: [10,100],y: 10},
        friction: 20,
        recoil: 300,
        range: 700,
        automatic: true,
        cooldownTime: 4,
        ammo: 100,
        fireType: 'bullet',
        bullet: {
            bulletTexture: 'small',
            speed: 2000,
            trail: true,
            trail_length: 200,
            penetrable: false
        }
    }


}

gameConfig.enemy = {
    ordinaryEnemy: {
        acceleration: 300,
        maxSpeed: 500,
        sight: 400,
        weapon: "assaultRifle"
    }
}