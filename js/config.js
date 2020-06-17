const gameConfig = {}

gameConfig.height = window.innerHeight-120;
gameConfig.width = window.innerWidth-120;

console.log(gameConfig.width)

//player configs
gameConfig.playerAcceleration = 70;
gameConfig.playerFriction = 30;
gameConfig.playerMaxSpeed = 600;
gameConfig.jumpVelocity = 1100;
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

//weapon config
gameConfig.weapon = {

    assaultRifle: {
        handle: {x: 10,y: 15},
        barrel: {x: [10,100],y: 10},
        friction: 20,
        recoil: 400,
        range: 700,
        automatic: true,
        cooldownTime: 4,
        ammo: 100,
        fireType: 'bullet',
        randomCoef: 200,
        bullet: {
            bulletTexture: 'small',
            speed: 2000,
            trail: true,
            trail_length: 200,
            penetrable: false
        }
    },

    pistol: {
        handle: {x: 30,y: 15},
        barrel: {x: [10,100],y: 10},
        friction: 20,
        recoil: 300,
        range: 400,
        automatic: false,
        cooldownTime: 4,
        ammo: 10,
        fireType: 'bullet',
        randomCoef: 100,
        bullet: {
            bulletTexture: 'small',
            speed: 2000,
            trail: true,
            trail_length: 200,
            penetrable: false
        }
    },

    revolver: {
        handle: {x: 30,y: 15},
        barrel: {x: [10,100],y: 10},
        friction: 20,
        recoil: 500,
        range: 600,
        automatic: false,
        cooldownTime: 6,
        ammo: 6,
        fireType: 'bullet',
        randomCoef: 50,
        bullet: {
            bulletTexture: 'small',
            speed: 2000,
            trail: true,
            trail_length: 200,
            penetrable: false
        }
    },

    sniper: {
        handle: {x: 30,y: 15},
        barrel: {x: [10,100],y: 10},
        friction: 20,
        recoil: 500,
        range: 2000,
        automatic: false,
        cooldownTime: 20,
        ammo: 10,
        fireType: 'bullet',
        randomCoef: 0,
        bullet: {
            bulletTexture: 'small',
            speed: 5000,
            trail: true,
            trail_length: 300,
            penetrable: false
        }
    },

    smg: {
        handle: {x: 30,y: 15},
        barrel: {x: [10,100],y: 10},
        friction: 20,
        recoil: 200,
        range: 600,
        automatic: true,
        cooldownTime: 3,
        ammo: 50,
        fireType: 'bullet',
        randomCoef: 500,
        bullet: {
            bulletTexture: 'small',
            speed: 2000,
            trail: true,
            trail_length: 150,
            penetrable: false
        }
    },




}

gameConfig.enemy = {
    ordinaryEnemy: {
        acceleration: 300,
        maxSpeed: 500,
        sight: 400,
        fireProbability: 0.3,
        fireDelay: 500,
        weapon: "assaultRifle"
    }
}