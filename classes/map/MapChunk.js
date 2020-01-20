class MapChunk {
	constructor(x, y, tileSize, chunkSize){
		this.x = x;
		this.y = y;
		this.tileSize = tileSize;
		this.chunkSize = chunkSize;

		this.collisionMap = [];
		
		this.clear = true;
		this.canvas = addCanvas();
		this.context = this.canvas.getContext("2d");

		this.offsetX = this.tileSize / 2;
		this.offsetY = this.tileSize / 2;
		
		this.canvas.width = this.tileSize * this.chunkSize + this.offsetX * 2;
		this.canvas.height = this.tileSize * this.chunkSize + this.offsetY * 2;

		this.grass = new Tile("./sprites/background/grassBasic.png", 96, 96, this.tileSize);
		this.water = new Tile("./sprites/background/waterBasic.png", 96, 96, this.tileSize);
		
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
			self.collisionMap = [];
			for(var i = 0; i < self.chunkSize; i += 1){
				var collisionLine = [];
				for(var j = 0; j < self.chunkSize; j += 1){
					var noCollision = true;
					var pallet = e.data.map[i][j].pallet;
					var noise = e.data.map[i][j].noise;
					
					if(noise < .3){
						noCollision = false;
						game.map.water.draw(self.context, i * self.tileSize, j * self.tileSize);
						// mapContext.drawImage(water, i, j, width, height);
					} else {
						if(pallet > .5){
							if(noise < .4){
								game.map.sand.draw(self.context, i * self.tileSize, j * self.tileSize);
							}else if(noise < .55){
								game.map.grass.draw(self.context, i * self.tileSize, j * self.tileSize);
							}else if(noise < .7){
								game.map.forest.draw(self.context, i * self.tileSize, j * self.tileSize);
							}else if(noise < .8){
								game.map.moutain.draw(self.context, i * self.tileSize, j * self.tileSize);
							}else{
								game.map.snow.draw(self.context, i * self.tileSize, j * self.tileSize);
							}
						} else {
							if(noise < .4){
								game.map.psand.draw(self.context, i * self.tileSize, j * self.tileSize);
							}else if(noise < .55){
								game.map.grass.draw(self.context, i * self.tileSize, j * self.tileSize);
							}else if(noise < .7){
								game.map.pforest.draw(self.context, i * self.tileSize, j * self.tileSize);
							}else if(noise < .8){
								game.map.pmoutain.draw(self.context, i * self.tileSize, j * self.tileSize);
							}else{
								game.map.psnow.draw(self.context, i * self.tileSize, j * self.tileSize);
							}
						}
					}

					collisionLine.push(noCollision);
				}
				self.collisionMap.push(collisionLine);
			}
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
