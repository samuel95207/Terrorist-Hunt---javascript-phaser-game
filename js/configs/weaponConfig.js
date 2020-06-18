
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
        randomCoef: 100,
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

    shotgun: {
        handle: {x: 30,y: 15},
        barrel: {x: [10,100],y: 10},
        friction: 20,
        recoil: 700,
        range: 200,
        automatic: false,
        cooldownTime: 6,
        ammo: 6,
        fireType: 'bullet-shotgun',
        randomCoef: 2000,
        bullet: {
            bulletTexture: 'small',
            speed: 2000,
            trail: true,
            trail_length: 200,
            penetrable: false
        }
    },

    grenade: {
        handle: {x: 30,y: 15},
        friction: 20,
        range: 200,
        automatic: false,
        cooldownTime: 6,
        ammo: 1,
        fireType: 'explode',
        bullet: {
            bulletTexture: 'small',
            speed: 2000,
            trail: true,
            trail_length: 200,
            penetrable: false
        }
    }


}