class MapChunk {
	constructor(x, y, tileSize, chunkSize){
		this.x = x;
		this.y = y;
		this.tileSize = tileSize;
		this.chunkSize = chunkSize;
		
		this.clear = true;
		this.canvas = addCanvas();
		this.context = this.canvas.getContext("2d");

		
		this.canvas.width = this.tileSize * (this.chunkSize + 1);
		this.canvas.height = this.tileSize * (this.chunkSize + 1);

		this.grass = new Tile("./sprites/background/grassBasic.png", 96, 96, this.tileSize);
		this.water = new Tile("./sprites/background/waterBasic.png", 96, 96, this.tileSize);
		
		this.mapWorker = new Worker('classes/map/MapWorker.js');
	}

	draw(){
		var self = this;
		var message = {
			chunkSize: this.chunkSize,
			x: this.x,
			y: this.y,
		}
		this.mapWorker.postMessage(message);
		this.mapWorker.onmessage = function(e) {
			for(var i = 0; i < self.chunkSize; i += 1){
				var line = [];
				for(var j = 0; j < self.chunkSize; j += 1){
					var pallet = e.data.map[i][j].pallet;
					var noise = e.data.map[i][j].noise;
					
					if(noise < .3){
						line.push(false);
						game.map.water.draw(self.context, i * self.tileSize, j * self.tileSize);
						// mapContext.drawImage(water, i, j, width, height);
					} else {
						line.push(true);
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
								game.map.pgrass.draw(self.context, i * self.tileSize, j * self.tileSize);
							}else if(noise < .7){
								game.map.pforest.draw(self.context, i * self.tileSize, j * self.tileSize);
							}else if(noise < .8){
								game.map.pmoutain.draw(self.context, i * self.tileSize, j * self.tileSize);
							}else{
								game.map.psnow.draw(self.context, i * self.tileSize, j * self.tileSize);
							}
						}
					}
				}
			}
		}

		//old:
		/*
		for(var i = 0; i < this.chunkSize; i += 1){
			var line = [];
			for(var j = 0; j < this.chunkSize; j += 1){
				// rotateAndPaintImage(img, 10, i, j, width, height);
				//var noise = 1;
				//perlin noise of size 400 at 95% and size 12 at 5% with a total factor of 96% and a random noice pattern at 4%
				// var noise = p.perlinRec(i + this.x * this.chunkSize, j + this.y * this.chunkSize, [400, 12], [.95, .05]) * .96 + Math.random()*.04;
				var pallet = p.perlinRec(i + this.x * this.chunkSize, j + this.y * this.chunkSize, [500, 12], [.97, .03])
				var noise
				var altitude = p.perlinRec(i + this.x * this.chunkSize, j + this.y * this.chunkSize, [300, 12], [.95, .05]);
				if(altitude > .35  && altitude < .75){
					noise = altitude * .96 + (Math.random()*.04);
				} else {
					noise = p.perlinRec(i + this.x * this.chunkSize, j + this.y * this.chunkSize, [300, 12], [.97, .03])
				}
				if(noise < .3){
					line.push(false);
					game.map.water.draw(this.context, i * this.tileSize, j * this.tileSize);
					// mapContext.drawImage(water, i, j, width, height);
				} else {
					line.push(true);
					if(pallet > .5){
						if(noise < .4){
							game.map.sand.draw(this.context, i * this.tileSize, j * this.tileSize);
						}else if(noise < .55){
							game.map.grass.draw(this.context, i * this.tileSize, j * this.tileSize);
						}else if(noise < .7){
							game.map.forest.draw(this.context, i * this.tileSize, j * this.tileSize);
						}else if(noise < .8){
							game.map.moutain.draw(this.context, i * this.tileSize, j * this.tileSize);
						}else{
							game.map.snow.draw(this.context, i * this.tileSize, j * this.tileSize);
						}
					} else {
						if(noise < .4){
							game.map.psand.draw(this.context, i * this.tileSize, j * this.tileSize);
						}else if(noise < .55){
							game.map.pgrass.draw(this.context, i * this.tileSize, j * this.tileSize);
						}else if(noise < .7){
							game.map.pforest.draw(this.context, i * this.tileSize, j * this.tileSize);
						}else if(noise < .8){
							game.map.pmoutain.draw(this.context, i * this.tileSize, j * this.tileSize);
						}else{
							game.map.psnow.draw(this.context, i * this.tileSize, j * this.tileSize);
						}
					}
					// mapContext.drawImage(img, i, j, width, height);
				}
				
			}
			//this.collisionMap.push(line);
		}

		*/
		this.clear = false;
	}
	get positionX(){
		return this.x * this.tileSize * this.chunkSize;
	}
	get positionY(){
		return this.y * this.tileSize * this.chunkSize;
	}
}
