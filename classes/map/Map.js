
class Map {
	constructor(){
		game.map = this;
		this.tileSize = 48;
		this.collisionMap = [];
		//this.currentMapFunction = this.arenaMap;

		this.water = new Tile("./sprites/background/waterBasic.png", 96, 96, this.tileSize, "#1A42E1");
		this.sand = new Tile("./sprites/background/sandBasic.png", 96, 96, this.tileSize, "#BF9E72");
		this.grass = new Tile("./sprites/background/grassBasic.png", 96, 96, this.tileSize, "#43A047");
		this.forest = new Tile("./sprites/background/forestBasic.png", 96, 96, this.tileSize, "#29753E");
		this.moutain = new Tile("./sprites/background/moutainBasic.png", 96, 96, this.tileSize, "#333333");
		this.snow = new Tile("./sprites/background/snowBasic.png", 96, 96, this.tileSize, "#E5E5E5");

		
		this.pwater = new Tile("./sprites/background/waterBasic.png", 96, 96, this.tileSize, "#1A42E1");
		this.psand = new Tile("./sprites/background/pallete2/sandBasic.png", 96, 96, this.tileSize, "#E5BB85");
		this.pgrass = new Tile("./sprites/background/pallete2/grassBasic.png", 96, 96, this.tileSize, "#43A047");
		this.pforest = new Tile("./sprites/background/pallete2/forestBasic.png", 96, 96, this.tileSize, "#58668E");
		this.pmoutain = new Tile("./sprites/background/pallete2/moutainBasic.png", 96, 96, this.tileSize, "#333333");
		this.psnow = new Tile("./sprites/background/pallete2/snowBasic.png", 96, 96, this.tileSize, "#7F7F7F");

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
				game.map.chunks.push(new MapChunk(i, j, game.map.tileSize, game.map.chunkSize));
			}
		}
	}

	loadAllChunks(){
		this.chunks.forEach(c => {
			if(c.clear){
				c.load();
			}
		})
	}

	adjustChunks(){ //run on each frame
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

	noCollsion(x, y){
		var chunkX = this.getChunkX(x);
		var chunkY = this.getChunkY(y);
		for(var i = 0; i < this.chunks.length; i++){
			if(this.chunks[i].x == chunkX && this.chunks[i].y == chunkY){
				var mapX = Math.floor(x / this.tileSize) - chunkX*this.chunkSize;
				var line = this.chunks[i].collisionMap[mapX];
				if(line){
					var mapY = Math.floor(y / this.tileSize) - chunkY*this.chunkSize;
					return line[mapY] == null ? true : line[mapY];
				} else {
					return false;
				}
			}
		}
		return false;
	}
}
