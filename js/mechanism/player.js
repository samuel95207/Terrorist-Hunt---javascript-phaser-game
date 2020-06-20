Playground.prototype.createPlayer = function (x, y, texture) {
    let player = gameStatus.players.create(x, y, texture);
    // player.body.maxVelocity.x = gameConfig.playerMaxSpeed
    player.maxSpeed = gameConfig.playerMaxSpeed;


    player.lives = gameConfig.playerLives;
    player.spawnPoint = { x: x, y: y };

    player.die = function () {
        if (gameStatus.winFlag) {
            console.log('not die');
            return;
        }
        gameStatus.cameras.main.shake(240, .01, false);
        player.lives--;

        gameStatus.scene.sound.play('playerDieSound');

        player.body.position.x = player.spawnPoint.x;
        player.body.position.y = player.spawnPoint.y;
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;


    }

    player.update = function () {
        if (player.y > gameStatus.mapSize.height - 10) {
            if (gameStatus.winFlag) {
                console.log('not die');
                return;
            }
            player.die();
            player.x = player.spawnPoint.x;
            player.y = player.spawnPoint.y;
        }
    }

    player.jump = function () {
        if (player.body.blocked.down) {
            gameStatus.scene.sound.play('playerJumpSound');
            player.anims.play('jump', true);
            player.setVelocityY(-gameConfig.jumpVelocity);
        }

    }

    player.left = function () {
        if (-player.body.velocity.x < player.maxSpeed) {
            player.body.velocity.x -= gameConfig.playerAcceleration;
        }
        player.anims.play('run', true);
        player.flipX = true;
    }

    player.right = function () {
        if (player.body.velocity.x < player.maxSpeed) {
            player.body.velocity.x += gameConfig.playerAcceleration;
        }

        player.anims.play('run', true);
        player.flipX = false;
    }

    player.stand = function () {
        player.anims.play('idle', true);
        player.body.velocity.x *= 0.9;
    }

    player.pickup = function (weapon) {
        if (player.dropCounter > 10) {
            if (player.carryItem === null) {
                player.carryItem = weapon
                weapon.owner = player

                weapon.body.setAllowGravity(false)

                let weaponConfig = gameConfig.weapon[weapon.texture.key]
                if (player.flipX === true) {
                    weapon.x = player.x - weaponConfig.handle.x
                } else {
                    weapon.x = player.x + weaponConfig.handle.x
                }
                weapon.y = player.y + weaponConfig.handle.y

                gameStatus.player.carryItemCounter = 0;
            }
        }
    }

    player.dropItem = function () {
        if (player.carryItemCounter > 10 && player.carryItem != null) {
            let item = player.carryItem;
            item.body.velocity.x = player.body.velocity.x * 1.5 + (player.flipX ? -100 : 100);
            item.body.velocity.y = -800;
            item.body.setAllowGravity(true);
            player.carryItem = null;
            item.owner = null;

            player.dropCounter = 0;
        }

    }

    player.fire = function () {
        if (player.carryItem != null) {
            let weapon = gameStatus.player.carryItem;
            weapon.fire(this);
        }
    }

    return player;
}


Playground.prototype.playerControl = function () {
    if (gameStatus.cursors.right.isDown) {
        gameStatus.player.right();
    } else if (gameStatus.cursors.left.isDown) {
        gameStatus.player.left();
    } else {
        gameStatus.player.stand();
    }
    if (gameStatus.cursors.jump.isDown || this.input.keyboard.addKey('SPACE').isDown) {
        gameStatus.player.jump();
    } status
}

Playground.prototype.dropItemControl = function () {
    gameStatus.players.children.each(function (player) {
        player.dropCounter += 1;
        player.carryItemCounter += 1;
    })
    if (gameStatus.cursors.pickup.isDown) {
        gameStatus.player.dropItem();
    }

}

Playground.prototype.fireWeaponControl = function () {
    if (gameStatus.cursors.fire.isDown) {
        gameStatus.player.fire();
    }
    else {
        if (gameStatus.player.carryItem) {
            gameStatus.player.carryItem.release = true;
        }
    }
}

Playground.prototype.carryItemProcess = function () {
    gameStatus.players.children.each(function (entity) {
        let weapon = entity.carryItem
        if (weapon != null) {
            let weaponConfig = gameConfig.weapon[weapon.texture.key]
            if (entity.flipX === true) {
                weapon.x = entity.x - weaponConfig.handle.x
            } else {
                weapon.x = entity.x + weaponConfig.handle.x
            }
            weapon.y = entity.y + weaponConfig.handle.y
            weapon.flipX = entity.flipX
            weapon.cooldownCounter += 1;
        }
    }, this)
    gameStatus.enemies.children.each(function (entity) {
        let weapon = entity.carryItem
        if (weapon != null) {
            let weaponConfig = gameConfig.weapon[weapon.texture.key]
            if (entity.flipX === true) {
                weapon.x = entity.x - weaponConfig.handle.x
            } else {
                weapon.x = entity.x + weaponConfig.handle.x
            }
            weapon.y = entity.y + weaponConfig.handle.y
            weapon.flipX = entity.flipX
            weapon.cooldownCounter += 1;
        }
    }, this)
}