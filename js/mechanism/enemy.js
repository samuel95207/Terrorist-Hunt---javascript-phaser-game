Playground.prototype.createEnemy = function (x, y, texture) {
    let enemy = gameStatus.enemies.create(x, y, texture);
    let enemyConfig = gameConfig.enemy[texture];
    enemy.is_dead = false;
    enemy.body.maxVelocity.x = enemyConfig.maxSpeed;
    enemy.sight = enemyConfig.sight;

    enemy.carryItem = Playground.prototype.createWeapon(enemy.body.x, enemy.body.y, enemyConfig.weapon)
    enemy.carryItem.owner = enemy;

    console.log(enemy.carryItem)
    enemy.die = function () {
        if (!enemy.is_dead) {
            enemy.is_dead = true;
        }
    }
    enemy.moveRight = function () {
        if (this.is_dead) {
            return
        }
        this.body.velocity.x += enemyConfig.acceleration;
        this.flipX = false;
    }

    enemy.moveLeft = function () {
        if (this.is_dead) {
            return
        }
        this.body.velocity.x -= enemyConfig.acceleration;
        this.flipX = true;
    }
    enemy.fire = function () {
        if (this.is_dead) {
            return
        }
        if (enemy.carryItem) {
            enemy.carryItem.fire(this);
        }
    }

}

Playground.prototype.bulletEnemyCollider = function () {
    this.physics.add.collider(gameStatus.bullets, gameStatus.enemies, function (bullet, enemy) {
        if (bullet.line != undefined) {
            bullet.line.destroy();
        }
        bullet.destroy();
        if (!enemy.is_dead) {
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
    });

}


Playground.prototype.enemyMovement = function () {
    gameStatus.enemies.children.each(function (enemy) {
        if (enemy.is_dead) {
            return;
        }
        //movement
        if ((!enemy.decisionCooldownCounter) || (enemy.decisionCooldownCounter <= 0)) {
            let rand = Math.floor(Math.random() * 100);
            if (rand < 10) {
                enemy.flipX = !enemy.flipX;
                console.log("flip")
            }
            else if (rand < 80) {
                if (enemy.flipX) {
                    enemy.moveLeft();
                    console.log("moveLeft")
                } else {
                    enemy.moveRight();
                    console.log("moveRight")
                }
            }
            // console.log(enemy)

            enemy.decisionCooldownCounter = 10;
        } else {
            enemy.decisionCooldownCounter -= 1;
        }

        if (!enemy.body.blocked.down) {
            console.log("down");
            enemy.body.velocity.y = 500;
            console.log(enemy.body.y)
            if (enemy.flipX) {
                enemy.body.velocity.x = 500;
            } else {
                enemy.body.velocity.x = -500;
            }
        }

        //detect player
        gameStatus.players.children.each(function (player) {
            let rand = Math.floor(Math.random() * 100);
            if (enemy.body.y - player.body.y < 20 && enemy.body.y - player.body.y > -20) {
                console.log(player.body.x - enemy.body.x);
                if (rand < 20) {
                    let distance = enemy.body.x - player.body.x;
                    if ((enemy.flipX && distance > 0 && distance < enemy.sight) || (!enemy.flipX && -distance > 0 && -distance < enemy.sight)) {
                        enemy.fire();
                    }
                }
            }
        })




    }, this);
}


