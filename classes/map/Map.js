class Map {
	constructor(){
		this.tileSize = 48;
		this.collisionMap = [];
		this.currentMapFunction = this.arenaMap;

		this.grass = new Tile("./sprites/background/grassBasic.png", 96, 96);
		this.water = new Tile("./sprites/background/waterBasic.png", 96, 96);

		this.temp = 0;

		this.chunkSize = 64;
		this.chunks = [];
		//this.tempFoo();

		this.lastChunkX = null;
		this.lastChunkY = null;
	}

	tempFoo(){
		this.chunks.push(new MapChunk(0, 0, this.tileSize, this.chunkSize));
		this.chunks.push(new MapChunk(1, 1, this.tileSize, this.chunkSize));
	}

	adjustChunks(){ //run on each frame
		var chunkX = this.currentChunkX();
		var chunkY = this.currentChunkY();
		if(this.lastChunkX == chunkX && this.lastChunkY == chunkY){
			return;
		}
		this.chunks.push(new MapChunk(chunkX, chunkY, this.tileSize, this.chunkSize));
		this.lastChunkX = chunkX;
		this.lastChunkY = chunkY;
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
