class MapChunk {
	constructor(x, y, tileSize, chunkSize, overworld = true){
		this.x = x;
		this.y = y;
		this.tileSize = tileSize;
		this.chunkSize = chunkSize;
		this.overworld = overworld;

		this.tileMap = [];
		
		this.clear = true;
		this.canvas = main.addCanvas();
		this.context = this.canvas.getContext("2d");

		this.offsetX = this.tileSize / 2;
		this.offsetY = this.tileSize / 2;
		
		this.canvas.width = this.tileSize * this.chunkSize + this.offsetX * 2;
		this.canvas.height = this.tileSize * this.chunkSize + this.offsetY * 2;

		// this.grass = new Tile("./sprites/background/grassBasic.png", 96, 96, this.tileSize);
		// this.water = new Tile("./sprites/background/waterBasic.png", 96, 96, this.tileSize);
		if(this.overworld){
			this.mapWorker = new Worker("classes/map/MapWorker.js");
		}
		this.loaded = false;

		this.imgData = null;
	}

	load(){
		var self = this;
		var message = {
			chunkSize: this.chunkSize,
			x: this.x,
			y: this.y,
		}
		this.mapWorker.postMessage(message);
		this.mapWorker.onmessage = function(e) {
			self.context.clearRect(0, 0, self.canvas.width, self.canvas.height);
			
			var miniChunk = self.miniMap.getChunk(self.x, self.y);
			//bool if this chunk apears on the minimap yet
			var seen = miniChunk.seen[main.correctMod(self.x, self.miniMap.mapChunkPerMiniMapChunk)][main.correctMod(self.y, self.miniMap.mapChunkPerMiniMapChunk)];

			self.clearTileMap(!seen);
			
			for(var j = 0; j < self.chunkSize; j += 1){
				for(var i = 0; i < self.chunkSize; i += 1){
					//var noCollision = true;
					var pallet = e.data.map[i][j].pallet;
					var noise = e.data.map[i][j].noise;
					var tile;

					//noise is a number from 0-1 on a non regular scale constructed by the map worker
					if(noise < .3){
						tile = game.map.water;
					} else {
						if(pallet > .5){
							if(noise < .4){
								tile = game.map.sand;
							}else if(noise < .55){
								tile = game.map.grass;
							}else if(noise < .7){
								tile = game.map.forest;
							}else if(noise < .8){
								tile = game.map.moutain;
							}else{
								tile = game.map.snow;
							}
						} else {
							if(noise < .4){
								tile = game.map.psand;
							}else if(noise < .55){
								tile = game.map.grass;
							}else if(noise < .7){
								tile = game.map.pforest;
							}else if(noise < .8){
								tile = game.map.pmoutain;
							}else{
								tile = game.map.psnow;
							}
						}
					}
					self.setTile(tile, i, j, seen);
				}
			}
			if(!seen){
				self.setMiniMapChunk();
			}
			self.loaded = true;

			if(self.x == 0 && self.y == 0){
				var e = new Entrance(0, 0)
					.setImage("./sprites/entrance/hole.png", 0)
					.setDimensions(96,96)
					.setSolid(true)
					.setType("tutorial");
			} else if(self.tileMap[0][0] == game.map.grass && game.perlin.randomHash(self.x, self.y) < .04){
				var x = Math.floor((self.x + game.perlin.randomHash(self.x + 17, self.y)) * self.tileSize * self.chunkSize);
				var y = Math.floor((self.y + game.perlin.randomHash(self.x, self.y + 17)) * self.tileSize * self.chunkSize);
				if(self.getTile(x, y).noCollision){
					var e = new Entrance(x, y)
						.setImage("./sprites/entrance/hole.png", 0)
						.setDimensions(96,96)
						.setSolid(true)
						.setType("defult");
				}
			}
		}
		//end of map worker call
		
		this.clear = false;
	}

	setTile(tile, x, y, seen = true){

		tile.draw(this.context, x * this.tileSize, y * this.tileSize);
		if(!seen){
			if(!game.scene && Math.random() < game.spawnService.randomChunkSpawnRate){
				if(tile.spawn){
					tile.spawn((this.x*this.chunkSize + x) * this.tileSize, (this.y*this.chunkSize + y) * this.tileSize, true);
				}
			}
			
			var pos = ((y) * this.chunkSize + x)*4;
			this.imgData.data[pos] = tile.r;
			this.imgData.data[pos+1] = tile.g;
			this.imgData.data[pos+2] = tile.b;
			this.imgData.data[pos+3] = 255;
		}
		this.tileMap[x][y] = tile;
	}

	setMiniMapChunk(){
		var miniChunk = this.miniMap.getChunk(this.x, this.y);
		miniChunk.addChunkImage(this.imgData, this.x, this.y, this.chunkSize);
	}

	clearTileMap(newImgData){
		this.tileMap = [];

		for(var j = 0; j < this.chunkSize; j += 1){
			this.tileMap.push([]);
		}
		
		if(newImgData){
			this.imgData = this.miniMap.context.createImageData(this.chunkSize, this.chunkSize);
		}
	}

	getTile(x, y){
		var mapX = Math.floor(x / this.tileSize) - this.x*this.chunkSize;
		var line = this.tileMap[mapX];
		if(line){
			var mapY = Math.floor(y / this.tileSize) - this.y*this.chunkSize;
			return line[mapY] == null ? null : line[mapY];
		} else {
			return null;
		}
	}

	get miniMap(){
		if(this.overworld){
			return game.miniMap;
		} else {
			return game.scene.miniMap;
		}
	}

	get positionX(){
		return this.x * this.tileSize * this.chunkSize;
	}
	get positionY(){
		return this.y * this.tileSize * this.chunkSize;
	}
}
