class MapChunk {
	constructor(x, y, tileSize, chunkSize){
		this.x = x;
		this.y = y;
		this.tileSize = tileSize;
		this.chunkSize = chunkSize;

		this.tileMap = [];
		
		this.clear = true;
		this.canvas = addCanvas();
		this.context = this.canvas.getContext("2d");

		this.offsetX = this.tileSize / 2;
		this.offsetY = this.tileSize / 2;
		
		this.canvas.width = this.tileSize * this.chunkSize + this.offsetX * 2;
		this.canvas.height = this.tileSize * this.chunkSize + this.offsetY * 2;

		// this.grass = new Tile("./sprites/background/grassBasic.png", 96, 96, this.tileSize);
		// this.water = new Tile("./sprites/background/waterBasic.png", 96, 96, this.tileSize);
		
		this.mapWorker = new Worker('classes/map/MapWorker.js');
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
			self.tileMap = [];
			var imgData = game.miniMap.context.createImageData(self.chunkSize, self.chunkSize);
			
			for(var j = 0; j < self.chunkSize; j += 1){
				self.tileMap.push([]);
			}
			for(var j = 0; j < self.chunkSize; j += 1){
				for(var i = 0; i < self.chunkSize; i += 1){
					//var noCollision = true;
					var pallet = e.data.map[i][j].pallet;
					var noise = e.data.map[i][j].noise;
					var tile; 
					if(noise < .3){
						//noCollision = false;
						tile = game.map.water;
						// mapContext.drawImage(water, i, j, width, height);
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

					tile.draw(self.context, i * self.tileSize, j * self.tileSize);
					
					var pos = ((j) * self.chunkSize + i)*4;
					// imgData.data[pos] = j;
					// imgData.data[pos+1] = j;
					// imgData.data[pos+2] = j;
					// imgData.data[pos+3] = 255;
					imgData.data[pos] = tile.r;
					imgData.data[pos+1] = tile.g;
					imgData.data[pos+2] = tile.b;
					imgData.data[pos+3] = 255;

					self.tileMap[i][j] = tile;
					//collisionLine.push(noCollision);
				}
				//self.collisionMap.push(collisionLine);
			}
			game.miniMap.addChunkImage(imgData, self.x, self.y, self.chunkSize);
		}
		
		this.clear = false;
	}
	get positionX(){
		return this.x * this.tileSize * this.chunkSize;
	}
	get positionY(){
		return this.y * this.tileSize * this.chunkSize;
	}
}
