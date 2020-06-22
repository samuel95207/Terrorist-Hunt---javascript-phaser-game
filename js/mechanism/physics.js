Playground.prototype.playerWeaponOverlap = function () {
    gameStatus.player.carryItem = null;
    gameStatus.player.dropCounter = 51;
    this.physics.add.overlap(gameStatus.player, gameStatus.weapons, function (player, weapon) {
        if (gameStatus.cursors.pickup.isDown) {
            player.pickup(weapon);
        }
    })
}


Playground.prototype.playerBlocksCollider = function () {
    this.physics.add.collider(gameStatus.player, gameStatus.blocks, function (player, block) {
        if (player.body.velocity.x > 0) {
            player.body.velocity.x -= gameConfig.playerFriction;
        } else if (player.body.velocity.x < 0) {
            player.body.velocity.x += gameConfig.playerFriction;
        }
        if (player.body.velocity.x < 30 && player.body.velocity.x > -30) {
            player.body.velocity.x = 0;
        }
    });
}


Playground.prototype.weaponBlockCollider = function () {
    this.physics.add.collider(gameStatus.weapons, gameStatus.blocks, function (weapon, block) {
        let weaponConfig = gameConfig.weapon[weapon.texture.key]
        //TODO 
        if (weapon.body.velocity.x > 0) {
            weapon.body.velocity.x -= weaponConfig.friction;
        } else if (weapon.body.velocity.x < 0) {
            weapon.body.velocity.x += weaponConfig.friction;
        }
        if (weapon.body.velocity.x < 50 && weapon.body.velocity.x > -50) {
            weapon.body.velocity.x = 0;
        }
        
        if(weapon.body.blocked.left){
            weapon.body.velocity.x = 300;
        }
        if(weapon.body.blocked.right){
            weapon.body.velocity.x = -300;
        }
    });
}


Playground.prototype.enemyBlockCollider = function () {
    this.physics.add.collider(gameStatus.enemies, gameStatus.blocks, function (enemy, block) {
        //TODO block friction
        if (enemy.body.velocity.x > 0) {
            enemy.body.velocity.x -= gameConfig.enemyFriction;
        } else if (enemy.body.velocity.x < 0) {
            enemy.body.velocity.x += gameConfig.enemyFriction;
        }

        if (enemy.body.velocity.x < 30 && enemy.body.velocity.x > -30) {
            enemy.body.velocity.x = 0;
        }

        if (enemy.body.blocked.left || enemy.body.blocked.right) {
            enemy.body.velocity.x = 0;
        }
    });
}


Playground.prototype.bulletBlockCollider = function () {
    this.physics.add.collider(gameStatus.bullets, gameStatus.blocks, function (bullet, block) {
        if (bullet.trail) {
            if (bullet.line != undefined) {
                bullet.line.destroy();
            }
        }
        bullet.destroy();
        // console.log("bullet collide")
    });
}


Playground.prototype.bulletEnemyCollider = function () {
    this.physics.add.collider(gameStatus.bullets, gameStatus.enemies, function (bullet, enemy) {
        if (bullet.line != undefined) {
            bullet.line.destroy();
        }
        bullet.destroy();
        if (!enemy.is_dead) {
            enemy.is_dead = true;
            enemy.body.velocity.y = -700
            if (bullet.flipX) {
                enemy.setOrigin(0, 0.7)
                enemy.angle -= 90;
            } else {
                enemy.setOrigin(0, 0.3)
                enemy.angle += 90;
            }
            enemy.die();
        }

        if (enemy.body.blocked.left || enemy.body.blocked.right) {
            enemy.body.velocity.x = 0;
        }

    });

}


Playground.prototype.bulletPlayerCollider = function () {
    this.physics.add.collider(gameStatus.bullets, gameStatus.players, function (bullet, player) {
        if (bullet.line != undefined) {
            bullet.line.destroy();
        }
        bullet.destroy();
        player.die();
    });

}

