Playground.prototype.createPlayer = function(x,y,texture){
    let player = gameStatus.players.create(x,y,texture);
    // player.body.maxVelocity.x = gameConfig.playerMaxSpeed
    player.maxSpeed = gameConfig.playerMaxSpeed;


    player.lives = gameConfig.playerLives;
    player.spawnPoint = {x:x,y:y};

    player.die = function(){
        gameStatus.cameras.main.shake(240, .01, false);
        player.lives--;
        if(player.lives < 0){
            //TODO: gameover
        }

        player.body.position.x = player.spawnPoint.x;
        player.body.position.y = player.spawnPoint.y;
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;

        
    }

    player.update = function(){
        if(player.y > gameStatus.mapSize.height-10){
            player.die();
            player.x = player.spawnPoint.x;
            player.y = player.spawnPoint.y;
        }
    }



    return player;
}


Playground.prototype.playerControl = function(){    
    if (gameStatus.cursors.right.isDown) {
        if(gameStatus.player.body.velocity.x < gameStatus.player.maxSpeed){
            gameStatus.player.body.velocity.x += gameConfig.playerAcceleration;
        }

        gameStatus.player.anims.play('run', true);
        gameStatus.player.flipX = false;
            
    } else if (gameStatus.cursors.left.isDown) {
        if(-gameStatus.player.body.velocity.x < gameStatus.player.maxSpeed){
            gameStatus.player.body.velocity.x -= gameConfig.playerAcceleration;
        }
        gameStatus.player.anims.play('run', true);
        gameStatus.player.flipX = true;
            
    } else {
            // gameStatus.player.setVelocityX(0);
        gameStatus.player.anims.play('idle', true);
    }


    if ( gameStatus.cursors.jump.isDown && gameStatus.player.body.blocked.down) {
        gameStatus.player.anims.play('jump', true);
        gameStatus.player.setVelocityY(-gameConfig.jumpVelocity);
    }
}

Playground.prototype.dropItemControl = function(){
    if(gameStatus.cursors.pickup.isDown && gameStatus.player.carryItemCounter > 10 && gameStatus.player.carryItem != null){
        let item = gameStatus.player.carryItem;
        item.body.velocity.x = gameStatus.player.body.velocity.x*2;
        item.body.velocity.y = -700;
        item.body.setAllowGravity(true);
        gameStatus.player.carryItem = null;
        item.owner = null;
    
        gameStatus.player.dropCounter = 0;
    }
    gameStatus.player.dropCounter += 1;
    gameStatus.player.carryItemCounter += 1;
}

Playground.prototype.fireWeaponControl = function(){
    if(gameStatus.player.carryItem != null){
        let weapon = gameStatus.player.carryItem;
        if(gameStatus.cursors.fire.isDown){
            weapon.fire(this);
        }else{
            weapon.release = true;
        }
    }
}

Playground.prototype.carryItemProcess = function(){
    gameStatus.players.children.each(function(entity){
        let weapon = entity.carryItem
        if(weapon != null){
            let weaponConfig = gameConfig.weapon[weapon.texture.key]
            if(entity.flipX === true){
                weapon.x = entity.x - weaponConfig.handle.x
            }else{
                weapon.x = entity.x + weaponConfig.handle.x
            }
            weapon.y = entity.y + weaponConfig.handle.y
            weapon.flipX = entity.flipX   
            weapon.cooldownCounter += 1; 
        }
    }, this)
    gameStatus.enemies.children.each(function(entity){
        let weapon = entity.carryItem
        if(weapon != null){
            let weaponConfig = gameConfig.weapon[weapon.texture.key]
            if(entity.flipX === true){
                weapon.x = entity.x - weaponConfig.handle.x
            }else{
                weapon.x = entity.x + weaponConfig.handle.x
            }
            weapon.y = entity.y + weaponConfig.handle.y
            weapon.flipX = entity.flipX   
            weapon.cooldownCounter += 1; 
        }
    }, this)
}