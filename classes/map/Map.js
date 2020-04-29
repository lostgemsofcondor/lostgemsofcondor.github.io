
class Map {
	
	constructor(){
		game.map = this;
		this.tileSize = 48;
		this.collisionMap = [];
		//this.currentMapFunction = this.arenaMap;

		this.water = new Tile("./sprites/background/waterBasic.png", 96, 96, this.tileSize, "#1A42E1", null, false);
		this.sand = new Tile("./sprites/background/sandBasic.png", 96, 96, this.tileSize, "#BF9E72", game.spawnService.sand, true);
		this.grass = new Tile("./sprites/background/grassBasic.png", 96, 96, this.tileSize, "#43A047", null, true);
		this.forest = new Tile("./sprites/background/forestBasic.png", 96, 96, this.tileSize, "#29753E", game.spawnService.forest, true);
		this.moutain = new Tile("./sprites/background/moutainBasic.png", 96, 96, this.tileSize, "#333333", game.spawnService.mountain, true);
		this.snow = new Tile("./sprites/background/snowBasic.png", 96, 96, this.tileSize, "#E5E5E5", game.spawnService.mountain, true);

		
		this.pwater = new Tile("./sprites/background/waterBasic.png", 96, 96, this.tileSize, "#1A42E1", null, false);
		this.psand = new Tile("./sprites/background/pallete2/sandBasic.png", 96, 96, this.tileSize, "#E5BB85", game.spawnService.sand, true);
		this.pgrass = new Tile("./sprites/background/pallete2/grassBasic.png", 96, 96, this.tileSize, "#43A047", null, true);
		this.pforest = new Tile("./sprites/background/pallete2/forestBasic.png", 96, 96, this.tileSize, "#58668E", null, true);
		this.pmoutain = new Tile("./sprites/background/pallete2/moutainBasic.png", 96, 96, this.tileSize, "#333333", game.spawnService.mountain, true);
		this.psnow = new Tile("./sprites/background/pallete2/snowBasic.png", 96, 96, this.tileSize, "#7F7F7F", game.spawnService.mountain, true);

		
		this.undergroundFloor = new Tile("./sprites/background/underground/undergroundFloor.png", 96, 96, this.tileSize, "#724E30", null, true);
		this.underground = new Tile("./sprites/background/underground/underground.png", 96, 96, this.tileSize, "#3D2F1C", null, false);
		this.underground2 = new Tile("./sprites/background/underground/underground2.png", 96, 96, this.tileSize, "#3D2F1C", null, false);

		this.chunkSize = 32;
		this.chunks = [];

		this.lastChunkX = null;
		this.lastChunkY = null;

		this.chunkDelay = 20;
		this.lastChunkTick = null;

		this.resolution = 1;
		//add the 9 chunks
		for(var i = -this.resolution; i <= this.resolution; i++){
			for(var j = -this.resolution; j <= this.resolution; j++){
				this.chunks.push(new MapChunk(i, j, this.tileSize, this.chunkSize));
			}
		}
	}

	draw(){
		if(game.scene){
			main.copyMapChunk(game.scene.chunk);
		} else [
			this.chunks.forEach(c => {
				main.copyMapChunk(c);
			})
		]
	}

	loadAllChunks(force = false){
		this.chunks.forEach(c => {
			if(force || c.clear){
				c.load();
			}
		})
	}

	adjustChunks(){ //run on each frame
		if(game.scene){
			return;
		}
		this.loadAllChunks();
		
		var chunkX = this.currentChunkX();
		var chunkY = this.currentChunkY();
		
		if(this.lastChunkX == chunkX && this.lastChunkY == chunkY){
			this.lastChunkTick = game.gameTick;
			return;
		}
		if(game.gameTick - this.lastChunkTick < this.chunkDelay){
			return;
		}
		this.lastChunkTick = game.gameTick;
		
		this.chunks.forEach(c => {
			if(Math.abs(c.x - chunkX) >= this.resolution*2 || Math.abs(c.y - chunkY) >= this.resolution*2){
				c.unbound = true;
			}
		})
		
		for(var i = -this.resolution; i <= this.resolution; i++){
			for(var j = -this.resolution; j <= this.resolution; j++){
				if(!this.isLoaded(chunkX + i, chunkY + j)){
					this.replaceChunk(chunkX + i, chunkY + j)
				}
			}
		}
		this.lastChunkX = chunkX;
		this.lastChunkY = chunkY;
	}

	isLoaded(x, y){
		for(var i = 0; i < this.chunks.length; i++){
			if(this.chunks[i].x == x && this.chunks[i].y == y){
				return true;
			}
		}
		return false;
	}

	replaceChunk(x, y){
		for(var i = 0; i < this.chunks.length; i++){
			if(this.chunks[i].unbound){
				this.chunks[i].x = x;
				this.chunks[i].y = y;
				this.chunks[i].unbound = false;
				this.chunks[i].load();
				return;
			}
		}
	}

	currentChunkX(){
		return this.getChunkX(game.cameraCenterX);
	}
	
	currentChunkY(){
		return this.getChunkY(game.cameraCenterY);
	}

	getChunkX(x){
		return Math.floor(x / (this.chunkSize * this.tileSize));
	}
	
	getChunkY(y){
		return Math.floor(y / (this.chunkSize * this.tileSize));
	}

	getTile(x, y){
		if(game.scene){
			return game.scene.chunk.getTile(x, y);
		} else {
			var chunkX = this.getChunkX(x);
			var chunkY = this.getChunkY(y);
			for(var i = 0; i < this.chunks.length; i++){
				if(this.chunks[i].x == chunkX && this.chunks[i].y == chunkY){
					return this.chunks[i].getTile(x, y);
				}
			}
		}
		return null;

		if(chunk == null){
			game.hud.log("chunk is null");
		}

		var mapX = Math.floor(x / this.tileSize) - chunkX*this.chunkSize;
		var line = chunk.tileMap[mapX];
		if(line){
			var mapY = Math.floor(y / this.tileSize) - chunkY*this.chunkSize;
			return line[mapY] == null ? null : line[mapY];
		} else {
			return null;
		}
	}

	noCollsion(x, y){
		var tile = this.getTile(x, y);
		if(tile){
			return tile.noCollision;
		} else {
			return false;
		}
	}
}
