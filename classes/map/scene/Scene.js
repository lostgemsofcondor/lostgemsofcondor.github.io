class Scene {
    constructor(x, y){
        this.overworldX = x;
        this.overworldY = y;

        this.lightLevel = game.overlay.nightLevel;
        
        this.miniMap = new MiniMap("Scene");
        
        this.type = "default";
    }

    init(downLadder){
        this.boarderSize = 32;
        this.chunk = new MapChunk(0, 0, game.map.tileSize, 16 + this.boarderSize * 2, false);

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

        if(downLadder){
            game.player.positionX = spawnX;
            game.player.positionY = spawnY + 48;
        } else {
            game.player.positionX = spawnX + 300;
            game.player.positionY = spawnY + 48;
        }

		new Entrance(spawnX, spawnY)
            .setImage("./sprites/entrance/ropeUp.png", 0)
            .setDimensions(96, 96)
            .setExit(true);

            
		new CraftingTable(spawnX, spawnY + 450);

        new Bed(spawnX + 300, spawnY)
        new Bed(spawnX + 450, spawnY)

        
		new Torch(spawnX - 32, spawnY + 32);
		new Torch(spawnX + 32, spawnY - 32);
		new Torch((this.boarderSize + 8) * 48, (this.boarderSize + 8) * 48)
            .setLight("large");
    }

    getTile(x, y){
        return game.map.grass;
    }

    delete(){
        game.map.adjustChunks(true);
        delete this;
    }
}
