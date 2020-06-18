Playground.prototype.createWeapon = function (x, y, texture) {
    let weapon = gameStatus.weapons.create(x, y, texture);

    weapon.cooldownCounter = 5000;
    weapon.release = true;
    weapon.setDepth(10);
    weapon.ammo = gameConfig.weapon[weapon.texture.key].ammo;

    weapon.fire = function (playground) {
        let weapon = this;
        let weaponConfig = gameConfig.weapon[weapon.texture.key];




        if (weaponConfig.fireType === "bullet") {
            if (weapon.cooldownCounter < weaponConfig.cooldownTime) {
                return;
            }
            if (!weaponConfig.automatic && !weapon.release) {
                return;
            }
            if (weapon.ammo === 0) {
                if(gameStatus.emptySound){
                    console.log(gameStatus.emptySound.isPlaying)
                    if(gameStatus.emptySound.isPlaying){
                        return;
                    }
                }
                gameStatus.emptySound = gameStatus.scene.sound.add(weaponConfig.emptySound);
                gameStatus.emptySound.play();
                return;
            }

            if(weaponConfig.fireSound != undefined){
                gameStatus.scene.sound.play(weaponConfig.fireSound);
            }
            
            let pos = { x: weapon.body.x + (weapon.flipX ? -weaponConfig.barrel.x[0] : weaponConfig.barrel.x[1]), y: weapon.body.y + weaponConfig.barrel.y };
            let bullet;
            if (weapon.flipX) {
                weapon.owner.body.velocity.x += weaponConfig.recoil;
                bullet = gameStatus.bullets.create(pos.x + 30, pos.y, 'bullet');
            } else {
                weapon.owner.body.velocity.x -= weaponConfig.recoil;
                bullet = gameStatus.bullets.create(pos.x - 30, pos.y, 'bullet');
            }

            // if (weaponConfig.bullet.penetrable == false) {
            //     playground.physics.add.collider(bullet, gameStatus.blocks, function (bullet_instance, block) {
            //         console.log(block)
            //         setTimeout(function () {
            //             if (bullet_instance.line != undefined) {
            //                 bullet_instance.line.destroy();
            //             }
            //             bullet_instance.destroy();
            //         }, 5)
            //     })
            // }


            bullet.body.firePoint = { x: bullet.body.x, y: bullet.body.y };
            bullet.flipX = weapon.flipX;
            bullet.range = weaponConfig.range;
            bullet.trail = weaponConfig.bullet.trail;
            bullet.trail_length = weaponConfig.bullet.trail_length

            bullet.body.setAllowGravity(false);
            bullet.body.velocity.x = weaponConfig.bullet.speed * (weapon.flipX ? -1 : 1);
            bullet.body.velocity.y = (Math.random() - 0.5) * weaponConfig.randomCoef;



        } else if (weaponConfig.fireType === "bullet-shotgun") {
            let weapon = this;
            let weaponConfig = gameConfig.weapon[weapon.texture.key];



            if (weapon.cooldownCounter < weaponConfig.cooldownTime) {
                return;
            }
            if (!weaponConfig.automatic && !weapon.release) {
                return;
            }
            if (weapon.ammo === 0) {
                if(gameStatus.emptySound){
                    console.log(gameStatus.emptySound.isPlaying)
                    if(gameStatus.emptySound.isPlaying){
                        return;
                    }
                }
                gameStatus.emptySound = gameStatus.scene.sound.add(weaponConfig.emptySound);
                gameStatus.emptySound.play();
                return;
            }

            if(weaponConfig.fireSound != undefined){
                gameStatus.scene.sound.play(weaponConfig.fireSound);
            }


            let pos = { x: weapon.body.x + (weapon.flipX ? -weaponConfig.barrel.x[0] : weaponConfig.barrel.x[1]), y: weapon.body.y + weaponConfig.barrel.y };


            for (let i = -3; i < 3; i++) {
                let bullet;
                if (weapon.flipX) {
                    weapon.owner.body.velocity.x += weaponConfig.recoil * 0.1;
                    bullet = gameStatus.bullets.create(pos.x + 30, pos.y, 'bullet');
                } else {
                    weapon.owner.body.velocity.x -= weaponConfig.recoil * 0.1;
                    bullet = gameStatus.bullets.create(pos.x - 30, pos.y, 'bullet');
                }


                bullet.body.firePoint = { x: bullet.body.x, y: bullet.body.y };
                bullet.flipX = weapon.flipX;
                bullet.range = weaponConfig.range;
                bullet.trail = weaponConfig.bullet.trail;
                bullet.trail_length = weaponConfig.bullet.trail_length

                bullet.body.setAllowGravity(false);
                bullet.body.velocity.x = weaponConfig.bullet.speed * (weapon.flipX ? -1 : 1);
                bullet.body.velocity.y = i * 0.1 * weaponConfig.randomCoef;
            }



        } else if (weaponConfig.fireType === "explode") {
            let weapon = this;
            let weaponConfig = gameConfig.weapon[weapon.texture.key];
            if (weapon.cooldownCounter < weaponConfig.cooldownTime) {
                return;
            }
            if (!weaponConfig.automatic && !weapon.release) {
                return;
            }
            if (weapon.ammo === 0) {
                return;
            }

            

            setTimeout(() => {
                let pos = { x: weapon.body.x, y: weapon.body.y };
                gameStatus.scene.sound.play(weaponConfig.fireSound);
                for (let i = -1; i < 2; i+=2) {
                    for (let j = -20; j < 20; j++) {
                        let bullet = gameStatus.bullets.create(pos.x, pos.y, 'bullet');

                        bullet.body.firePoint = { x: bullet.body.x, y: bullet.body.y };
                        bullet.range = weaponConfig.range;
                        bullet.trail = weaponConfig.bullet.trail;
                        bullet.trail_length = weaponConfig.bullet.trail_length

                        bullet.body.setAllowGravity(false);
                        bullet.body.velocity.x = i * weaponConfig.bullet.speed;
                        bullet.body.velocity.y = j * 500 * (j>0?j:-j);
                    }
                }
                if(weapon.owner){
                    weapon.owner.carryItem = null;
                    weapon.owner = null;
                    weapon.destroy();
                }else{
                    weapon.destroy();
                }
            }, 2000);

        }



        weapon.cooldownCounter = 0;
        weapon.release = false;
        weapon.ammo -= 1;
    }



    return weapon;
}


Playground.prototype.ballistic = function () {
    gameStatus.bullets.children.each(function (bullet) {
        let distance_square = (bullet.body.x - bullet.body.firePoint.x) ** 2 + (bullet.body.y - bullet.body.firePoint.y) ** 2
        if (bullet.trail) {
            if (bullet.line != undefined) {
                bullet.line.destroy();
            }
            let magnitude = (bullet.body.velocity.x ** 2 + bullet.body.velocity.y ** 2) ** 0.5
            if (distance_square < bullet.trail_length ** 2) {
                bullet.line = this.add.line(0, 0, bullet.body.firePoint.x, bullet.body.firePoint.y + 1.3, bullet.body.x, bullet.body.y + 1.3, 0xffffff).setOrigin(0, 0);
            } else {
                bullet.line = this.add.line(0, 0, bullet.body.x - bullet.trail_length * bullet.body.velocity.x / magnitude, bullet.body.y - bullet.trail_length * bullet.body.velocity.y / magnitude + 1.3, bullet.body.x, bullet.body.y + 1.3, 0xffffff).setOrigin(0, 0);
            }
        }

        if (distance_square >= bullet.range ** 2) {
            if (bullet.line != undefined) {
                bullet.line.destroy();
            }
            bullet.destroy();
        }

    }, this)
}