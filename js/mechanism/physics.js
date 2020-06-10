Playground.prototype.playerWeaponOverlap = function(){
    gameStatus.player.carryItem = null;
    gameStatus.player.dropCounter = 51;
    this.physics.add.overlap( gameStatus.player,gameStatus.weapons, function(player,weapon){
        if(gameStatus.cursors.pickup.isDown && gameStatus.player.dropCounter > 10) {
            if(player.carryItem === null){
                player.carryItem = weapon
                weapon.owner = player

                weapon.body.setAllowGravity(false)

                let weaponConfig = gameConfig.weapon[weapon.texture.key]
                if(player.flipX === true){
                    weapon.x = player.x - weaponConfig.handle.x
                }else{
                    weapon.x = player.x + weaponConfig.handle.x
                }
                weapon.y = player.y + weaponConfig.handle.y

                gameStatus.player.carryItemCounter = 0;
            }
        }
    })
}


Playground.prototype.playerBlocksCollider = function(){
    this.physics.add.collider(gameStatus.player, gameStatus.blocks,function(player,block){
        //TODO block friction
        if(player.body.velocity.x > 0){
            player.body.velocity.x -= gameConfig.playerFriction;
        }else if(player.body.velocity.x < 0){
            player.body.velocity.x += gameConfig.playerFriction;
        }
    });
}


Playground.prototype.weaponBlockCollider = function(){
    this.physics.add.collider(gameStatus.weapons, gameStatus.blocks, function(weapon,block){
        let weaponConfig = gameConfig.weapon[weapon.texture.key]
        //TODO 
        if(weapon.body.velocity.x > 0){
            weapon.body.velocity.x -= weaponConfig.friction;
        }else if(weapon.body.velocity.x < 0){
            weapon.body.velocity.x += weaponConfig.friction;
        }
        if(weapon.body.velocity.x < 50 && weapon.body.velocity.x > -50){
            weapon.body.velocity.x = 0;
        }
    });
}


Playground.prototype.enemyBlockCollider = function(){
    this.physics.add.collider(gameStatus.enemies, gameStatus.blocks,function(enemy,block){
        //TODO block friction
        if(enemy.body.velocity.x > 0){
            enemy.body.velocity.x -= gameConfig.enemyFriction;
        }else if(enemy.body.velocity.x < 0){
            enemy.body.velocity.x += gameConfig.enemyFriction;
        }
    });
}

Playground.prototype.bulletBlockCollider = function(){
    this.physics.add.collider(gameStatus.bullets, gameStatus.blocks,function(bullet,block){
        if (bullet.trail) {
            if (bullet.line != undefined) {
                bullet.line.destroy();
            }
        }
        bullet.destroy();
        console.log("bullet collide")
    });
}