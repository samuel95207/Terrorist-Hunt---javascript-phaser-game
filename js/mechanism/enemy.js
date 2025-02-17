Playground.prototype.createEnemy = function (x, y, texture, weapon) {
    let enemy = gameStatus.enemies.create(x, y, texture);
    let enemyConfig = gameConfig.enemy[texture];

    enemy.is_dead = false;
    enemy.body.maxVelocity.x = enemyConfig.maxSpeed;
    enemy.sight = enemyConfig.sight;
    enemy.fireProbability = enemyConfig.fireProbability;
    enemy.fireDelay = enemyConfig.fireDelay;

    enemy.carryItem = Playground.prototype.createWeapon(enemy.body.x, enemy.body.y, weapon)
    enemy.carryItem.owner = enemy;


    enemy.die = function () {
        enemy.is_dead = true;


        if (enemy.carryItem) {
            let item = enemy.carryItem;
            item.body.setAllowGravity(true);
            enemy.carryItem = null;
            item.owner = null;
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

Playground.prototype.enemyMovement = function () {
    gameStatus.enemies.children.each(function (enemy) {

        //return if enemy is dead
        if (enemy.is_dead) {
            return;
        }

        //movement
        if ((!enemy.decisionCooldownCounter) || (enemy.decisionCooldownCounter <= 0)) {
            let rand = Math.floor(Math.random() * 100);
            if (rand < 10) {
                enemy.flipX = !enemy.flipX;
                // console.log("flip")
            }
            else if (rand < 80) {
                if (enemy.flipX) {
                    enemy.moveLeft();
                } else {
                    enemy.moveRight();
                }
            }
            enemy.decisionCooldownCounter = 10;
        } else {
            enemy.decisionCooldownCounter -= 1;
        }

        if (!enemy.body.blocked.down) {
            // console.log("down");
            enemy.body.velocity.y = 500;
            // console.log(enemy.body.y)
            if (enemy.flipX) {
                enemy.body.velocity.x = 500;
            } else {
                enemy.body.velocity.x = -500;
            }
        }

        //detect player
        gameStatus.players.children.each(function (player) {
            let rand = Math.floor(Math.random());
            if (enemy.body.y - player.body.y < 20 && enemy.body.y - player.body.y > -20) {
                // console.log(player.body.x - enemy.body.x);
                if (rand < enemy.fireProbability) {
                    let distance = enemy.body.x - player.body.x;
                    if ((enemy.flipX && distance > 0 && distance < enemy.sight) || (!enemy.flipX && -distance > 0 && -distance < enemy.sight)) {
                        setTimeout(() => {
                            enemy.fire();
                        }, enemy.fireDelay);
                    }
                }
            }
        })

        if(enemy.y > gameStatus.mapSize.height - 10){
            enemy.die();
        }


    }, this);
}


