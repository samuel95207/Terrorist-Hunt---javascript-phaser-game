gameConfig.weapon = {
    assaultRifle: {
        handle: {x: 10,y: 15},
        barrel: {x: [10,100],y: 10},
        friction: 20,
        recoil: 250,
        range: 700,
        automatic: true,
        cooldownTime: 4,
        ammo: 50,
        fireType: 'bullet',
        fireSound: 'assaultRifleSound',
        emptySound: 'emptySound',
        randomCoef: 100,
        bullet: {
            bulletTexture: 'small',
            speed: 2000,
            trail: true,
            trail_length: 200,
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
        fireSound: 'pistolSound',
        emptySound: 'emptySound',
        randomCoef: 100,
        bullet: {
            bulletTexture: 'small',
            speed: 3000,
            trail: true,
            trail_length: 200,   
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
        fireSound: 'pistolSound',
        emptySound : 'emptySound',
        randomCoef: 50,
        bullet: {
            bulletTexture: 'small',
            speed: 3000,
            trail: true,
            trail_length: 200,
        }
    },

    sniper: {
        handle: {x: 30,y: 15},
        barrel: {x: [10,100],y: 10},
        friction: 20,
        recoil: 500,
        range: 2000,
        automatic: false,
        cooldownTime: 160,
        ammo: 10,
        fireType: 'bullet',
        fireSound: 'sniperSound',
        emptySound : 'emptySound',
        randomCoef: 0,
        bullet: {
            bulletTexture: 'small',
            speed: 5000,
            trail: true,
            trail_length: 300,
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
        fireSound: 'smgSound',
        emptySound : 'emptySound',
        randomCoef: 500,
        bullet: {
            bulletTexture: 'small',
            speed: 3000,
            trail: true,
            trail_length: 150, 
        }
    },

    shotgun: {
        handle: {x: 30,y: 15},
        barrel: {x: [10,100],y: 10},
        friction: 20,
        recoil: 2000,
        range: 200,
        automatic: false,
        cooldownTime: 80,
        ammo: 6,
        fireType: 'bullet-shotgun',
        fireSound: 'shotgunSound',
        emptySound : 'emptySound',
        randomCoef: 2000,
        bullet: {
            bulletTexture: 'small',
            speed: 2000,
            trail: true,
            trail_length: 200,
        }
    },

    grenade: {
        handle: {x: 30,y: 15},
        friction: 25,
        range: 200,
        automatic: false,
        cooldownTime: 6,
        ammo: 1,
        fireType: 'explode',
        fireSound: 'explodeSound',
        bullet: {
            bulletTexture: 'small',
            speed: 3000,
            trail: true,
            trail_length: 200,
        }
    }
}