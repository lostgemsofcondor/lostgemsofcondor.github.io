class Scene {
    constructor(x, y){
        this.boarderSize = 32;
        this.chunk = new MapChunk(0, 0, game.map.tileSize, 16 + this.boarderSize * 2, false);
        //this.chunk.load();

        this.overworldX = x;
        this.overworldY = y + 48;

        this.lightLevel = game.overlay.nightLevel;
        
		this.miniMap = new MiniMap("Scene");
    }

    init(){
        this.chunk.clearTileMap(true);
        for(var i = 0; i < this.chunk.chunkSize; i++){
            for(var j = 0; j < this.chunk.chunkSize; j++){
                var tile
                if(i < this.boarderSize || j < this.boarderSize || i >= this.chunk.chunkSize - this.boarderSize || j >= this.chunk.chunkSize - this.boarderSize){
                    if(Math.random() <= .25){
                        tile = game.map.underground;
                    } else {
                        tile = game.map.underground2;
                    }
                } else {
                    tile = game.map.undergroundFloor;
                }
                this.chunk.setTile(tile, i, j, false);
            }
        }

        this.chunk.setMiniMapChunk();

        var spawnX = this.boarderSize * 48 + 100;
        var spawnY = this.boarderSize * 48 + 100;

        game.player.positionX = spawnX;
        game.player.positionY = spawnY + 48;

		new Entrance(spawnX, spawnY)
            .setImage("./sprites/entrance/ropeUp.png", 0)
            .setDimensions(96, 96)
            .setExit(true);

            
		new CraftingTable(spawnX, spawnY + 450)
            .setDimensions(96, 96)
            .setExit(true);

		var e = new Entity(spawnX + 300, spawnY)
            .setImage("./sprites/furniture/bed.png", 0)
            .setDimensions(144, 72);

        game.add(e);

		var e = new Entity(spawnX + 450, spawnY)
            .setImage("./sprites/furniture/bed.png", 0)
            .setDimensions(144, 72);

        game.add(e);

        
		var e = new Entity(spawnX - 32, spawnY + 32)
        .setImage("./sprites/lighting/torch.png", 0)
        .setDimensions(48, 48)
        .setLight("medium");

        game.add(e);
        
		var e = new Entity(spawnX + 32, spawnY - 32)
        .setImage("./sprites/lighting/torch.png", 0)
        .setDimensions(48, 48)
        .setLight("medium");

        game.add(e);

        
		var e = new Entity((this.boarderSize + 8) * 48, (this.boarderSize + 8) * 48)
        .setImage("./sprites/lighting/torch.png", 0)
        .setDimensions(48, 48)
        .setLight("large");

        game.add(e);
    }

    getTile(x, y){
        return game.map.grass;
    }

    delete(){
        game.map.loadAllChunks(true);
        delete this;
    }
}
