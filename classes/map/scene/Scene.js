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

		var e = new Entrance(spawnX, spawnY)
            .setImage("./sprites/entrance/ropeUp.png", 0)
            .setDimensions(96,96)
            .setSolid(true)
            .setExit(true);
    }

    getTile(x, y){
        return game.map.grass;
    }

    delete(){
        game.map.loadAllChunks(true);
        delete this;
    }
}
