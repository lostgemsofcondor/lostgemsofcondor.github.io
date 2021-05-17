class Tutorial extends Scene {
    constructor(x, y){
        super(x, y);

        this.type = "tutorial"
    }

    init(downLadder){
        this.boarderSize = 32;
        var sceneSize = 64;
        var sceneActualSize = sceneSize + this.boarderSize * 2;
        this.chunk = new MapChunk(0, 0, game.map.tileSize, sceneActualSize * 2, false);
        
        this.chunk.clearTileMap(true);
        var tile
        for(var i = 0; i < sceneActualSize; i++){
            for(var j = 0; j < sceneActualSize; j++){
                if(Math.random() <= .25){
                    tile = game.map.underground;
                } else {
                    tile = game.map.underground2;
                }
                this.chunk.setTile(tile, i, j, false);
            }
        }
        for(var i = this.boarderSize; i < this.boarderSize + 10; i++){
            for(var j = this.boarderSize; j < sceneActualSize - this.boarderSize; j++){
                tile = game.map.undergroundFloor;
                this.chunk.setTile(tile, i, j, false);
            }
        }
        
        for(var i = this.boarderSize - 5; i < this.boarderSize; i++){
            for(var j = sceneActualSize - this.boarderSize - 32 - 5; j < sceneActualSize - this.boarderSize - 32; j++){
                tile = game.map.sand;
                this.chunk.setTile(tile, i, j, false);
            }
        }
        
        for(var i = this.boarderSize + 9; i < this.boarderSize + 20; i++){
            for(var j = 40; j < sceneActualSize - this.boarderSize - 16; j++){
                if(i != this.boarderSize + 9 && (i <= this.boarderSize + 13 || j > 50) && j < sceneActualSize - this.boarderSize - 32){
                    tile = game.map.undergroundWater;
                } else {
                    tile = game.map.sand;
                }
                this.chunk.setTile(tile, i, j, false);
            }
        }

        for(var i = 32; i <= 41; i++){
            for(var j = 84; j < 86; j++){
                if(i == 36){
                    tile = game.map.sand;
                } else {
                    tile = game.map.underground2;
                }
                this.chunk.setTile(tile, i, j, false);
            }
        }

        this.chunk.setMiniMapChunk();

        var spawnX = this.boarderSize * 48 + 100;
        var spawnY = this.boarderSize * 48 + 100;

        if(downLadder){
            game.player.positionX = spawnX;
            game.player.positionY = spawnY + 48;
        } else {
            game.player.positionX = 1752;
            game.player.positionY = 4440;
        }

        
		new Entrance(spawnX, spawnY)
            .setImage("./sprites/entrance/ropeUp.png", 0)
            .setDimensions(96, 96)
            .setExit(true);

        
        new Bed(spawnX + 300, spawnY);

        
        var palm = new Palm(1416, 2952);
        palm.superStruck = palm.struck;
        palm.superDie = palm.die;

        palm.struck = (bullet) =>{
            if(bullet.type != "axe"){
                game.hud.log("Find an axe to chop this tree");
            }

            // Execute palm's super struck()
            palm.superStruck(bullet);
        }

        palm.die = () =>{
            game.hud.log("Find and right click the crafting station\nMake a bow and some arrows");

            // Execute palm's super struck()
            palm.superDie();
        }
        if(!downLadder){
            palm.dropTable.addDropAlways("palmLog", 5);
        }
        var crab = new Crab(2256, 2016);
        crab.shoot = new BulletBuilder().newBubble(0);
        crab.dropTable = null;
        new ArmorStand(1752, 4128)
        .setSolid(true);

        new CraftingTable(1584, 2160);

        new Torch(1752 - 48 * 3, 2904);
        new Torch(1752 - 48 * 3, 2904 - 48 * 15);
		new Torch(spawnX - 32, spawnY + 32);
		new Torch(spawnX + 32, spawnY - 32);
    }
}
