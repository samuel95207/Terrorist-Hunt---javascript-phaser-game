Playground.prototype.buildMap = function (json_file) {
    let map;
    let xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', json_file, false);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            let raw_data = xobj.responseText;
            map = JSON.parse(raw_data);
        }
    };
    xobj.send(null);
    gameStatus.mapSize = map.size;

    //generate blocks
    for (i = 0; i < map.block_size.height; i++) {
        for (j = 0; j < map.block_size.width; j++) {
            let block = map.array[i][j];
            if (block === -1) {
                continue;
            }

            let num_string = block.toString();
            let blockname = "isometric_pixel_flat_" + "0".repeat(4 - num_string.length) + num_string;

            let coord = this.blockToCoord_LU(j, i);
            gameStatus.blocks.create(coord.x, coord.y, blockname);
            // gameStatus.blocks.create(coord.x,coord.y,'isometric_pixel_0001').setOrigin(0, 0.5).refreshBody()
        }
    }

    //generate player
    let player_coord = this.blockToCoord_LU(map.spawn_point.x, map.spawn_point.y);
    gameStatus.player = this.createPlayer(player_coord.x, player_coord.y, 'codey');


    //generate weapons
    if (map.weapon_spawn_point) {
        for (i = 0; i < map.weapon_spawn_point.length; i++) {
            let weapon_coord = this.blockToCoord_LU(map.weapon_spawn_point[i].x, map.weapon_spawn_point[i].y);
            this.createWeapon(weapon_coord.x, weapon_coord.y, map.weapon_spawn_point[i].type);
        }
    }

    //generate Enemies
    if (map.enemy_spawn_point) {
        for (i = 0; i < map.enemy_spawn_point.length; i++) {
            let enemy_coord = this.blockToCoord_LU(map.enemy_spawn_point[i].x, map.enemy_spawn_point[i].y);
            this.createEnemy(enemy_coord.x, enemy_coord.y, map.enemy_spawn_point[i].type)
        }
    }

    //next level
    gameStatus.next_level = map.next_level;


}