
class Map {
	constructor(){
		game.map = this;
		this.tileSize = 48;
		this.collisionMap = [];
		this.currentMapFunction = this.arenaMap;

		this.water = new Tile("./sprites/background/waterBasic.png", 96, 96, this.tileSize);
		this.sand = new Tile("./sprites/background/sandBasic.png", 96, 96, this.tileSize);
		this.grass = new Tile("./sprites/background/grassBasic.png", 96, 96, this.tileSize);
		this.forest = new Tile("./sprites/background/forestBasic.png", 96, 96, this.tileSize);
		this.moutain = new Tile("./sprites/background/moutainBasic.png", 96, 96, this.tileSize);
		this.snow = new Tile("./sprites/background/snowBasic.png", 96, 96, this.tileSize);

		this.temp = 0;

		this.chunkSize = 32;
		this.chunks = [];

		this.lastChunkX = null;
		this.lastChunkY = null;

		//add the 9 chunks
		for(var i = -1; i <= 1; i++){
			for(var j = -1; j <= 1; j++){
				this.chunks.push(new MapChunk(i, j, this.tileSize, this.chunkSize));
			}
		}
	}


	adjustChunks(){ //run on each frame
		var chunkX = this.currentChunkX();
		var chunkY = this.currentChunkY();
		this.chunks.forEach(c => {
			if(c.clear){
				c.draw();
			}
		})
		if(this.lastChunkX == chunkX && this.lastChunkY == chunkY){
			return;
		}
		
		this.chunks.forEach(c => {
			if(Math.abs(c.x - chunkX) >= 2 || Math.abs(c.y - chunkY) >= 2){
				c.unbound = true;
			}
		})
		
		for(var i = -1; i <= 1; i++){
			for(var j = -1; j <= 1; j++){
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
				this.chunks[i].draw();
				return;
			}
		}
	}

	currentChunkX(){
		return Math.floor(game.cameraCenterX / (this.chunkSize * this.tileSize));
	}
	
	currentChunkY(){
		return Math.floor(game.cameraCenterY / (this.chunkSize * this.tileSize));
	}

	noCollsion(x, y){
		var mapX = Math.floor(x / this.tileSize);
		
		var line = this.collisionMap[mapX];
		if(line){
			var mapY = Math.floor(y / this.tileSize);
			return line[mapY] == null ? true : line[mapY];
		}
		return true;
	}

	currentMap(){
		this.collisionMap = [];
		this.currentMapFunction();
	}

	arenaMap() {
		return;
		var start = performance.now();
		this.currentMapFunction = this.arenaMap;
		var x = 0;
		var y = 0;
		var width = this.tileSize;
		var height = this.tileSize;
		for(var i = 0; i <= 64*width; i += width){
			var line = [];
			for(var j = y; j <= y + height*64; j += height){
				// rotateAndPaintImage(img, 10, i, j, width, height);
				//var noise = 1;
				var noise = p.perlinRec(i/width, j/height, [70, 50, 20], [.4, .3, .3]);
				if(noise < .3){
					line.push(false);
					this.water.draw(this.chunks[0].context, i, j);
					this.water.draw(this.chunks[1].context, i, j);
					// mapContext.drawImage(water, i, j, width, height);
	
				} else {
					line.push(true);	
					this.grass.draw(this.chunks[0].context, i, j);
					this.grass.draw(this.chunks[1].context, i, j);
					// mapContext.drawImage(img, i, j, width, height);
				}
				
			}
			this.collisionMap.push(line);
		}
		//this.temp += 48
		console.log((performance.now() - start));
	}

	testMap() {
		this.currentMapFunction = this.testMap;
		var x = 0;
		var y = 0;
		var width = this.tileSize;
		var height = this.tileSize;
		for(var i = x; i <= x + width*100; i += width){
			var line = [];
			for(var j = y; j <= y + height*100; j += height){
				// rotateAndPaintImage(img, 10, i, j, width, height);
				if((i >= this.tileSize*4 && i <= this.tileSize*8 && j >= this.tileSize*3 && j <= this.tileSize*30) || (i >= this.tileSize*2 && j >= this.tileSize*15 && j <= this.tileSize*20)){
					line.push(false);
					this.water.draw(i, j);
					// mapContext.drawImage(water, i, j, width, height);
	
				} else {
					line.push(true);	
					this.grass.draw(i, j);
					// mapContext.drawImage(img, i, j, width, height);
				}
				
			}
			this.collisionMap.push(line);
		}
	}

	testMapGrass() {
		this.currentMapFunction = this.testMapGrass;
		var x = 0;
		var y = 0;
		var width = this.tileSize;
		var height = this.tileSize;
		for(var i = x; i <= x + width*30; i += width){
			for(var j = y; j <= y + height*30; j += height){
				// rotateAndPaintImage(img, 10, i, j, width, height);
				this.grass.draw(i, j);
			}
		}
	}
}