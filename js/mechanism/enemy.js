Playground.prototype.createEnemy = function(x,y,texture){
    let enemy = gameStatus.enemies.create(x,y,texture);
    let enemyConfig = gameConfig.enemy[texture];
    enemy.is_dead = false;
    enemy.body.maxVelocity.x = enemyConfig.maxSpeed;
    enemy.die = function(){
        if(!enemy.is_dead){
            enemy.is_dead = true;
        }
    }
    enemy.moveRight= function(){
        if(this.is_dead){
            return
        }
        this.body.velocity.x += enemyConfig.acceleration;
        this.flipX = false;
    }
            
    enemy.moveLeft = function(){
        if(this.is_dead){
            return
        }
        this.body.velocity.x -= enemyConfig.acceleration;
        this.flipX = true;
    }
}

Playground.prototype.bulletEnemyCollider = function(){
    this.physics.add.collider(gameStatus.bullets, gameStatus.enemies, function(bullet,enemy){
        if(bullet.line != undefined){
            bullet.line.destroy();
        }
        bullet.destroy();
        if(!enemy.is_dead){
            enemy.body.velocity.y = -700
            if(bullet.flipX){
                enemy.setOrigin(0,0.7)
                enemy.angle -= 90;
            }else{
                enemy.setOrigin(0,0.3)
                enemy.angle += 90;
            }
            enemy.die();
        }
    });
    
}


Playground.prototype.enemyMovement = function(){
    gameStatus.enemies.children.each(function(enemy){
        if((!enemy.desitionCooldownCounter) || (enemy.desitionCooldownCounter <= 0)){
            let rand = Math.floor(Math.random() * 100); 
            if(rand < 10){
                enemy.flipX = !enemy.flipX;
                console.log("flip")
            }
            else if(rand < 80){
                if(enemy.flipX){
                    enemy.moveLeft();
                    console.log("moveLeft")
                }else{
                    enemy.moveRight();
                    console.log("moveRight")
                }
            }
            // console.log(enemy)

            enemy.desitionCooldownCounter = 10;
        }else{
            enemy.desitionCooldownCounter -= 1;
        }

        if(!enemy.body.blocked.down && !enemy.is_dead){
            console.log("down");
            enemy.body.velocity.y = 500;
            console.log(enemy.body.y )
            if(enemy.flipX){
                enemy.body.velocity.x = -500;
            }else{
                enemy.body.velocity.x = -500;
            }
        }

        

    }, this);
}


