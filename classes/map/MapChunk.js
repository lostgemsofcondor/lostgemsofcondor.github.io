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

	}
	draw(){
		for(var i = 0; i < this.chunkSize; i += 1){
			var line = [];
			for(var j = 0; j < this.chunkSize; j += 1){
				// rotateAndPaintImage(img, 10, i, j, width, height);
				//var noise = 1;
				//perlin noise of size 400 at 95% and size 12 at 5% with a total factor of 96% and a random noice pattern at 4%
				// var noise = p.perlinRec(i + this.x * this.chunkSize, j + this.y * this.chunkSize, [400, 12], [.95, .05]) * .96 + Math.random()*.04;
				var pallet = p.perlinRec(i + this.x * this.chunkSize, j + this.y * this.chunkSize, [500, 12], [.97, .03])
				var noise
				if(p.perlinRec(i + this.x * this.chunkSize, j + this.y * this.chunkSize, [300, 12], [.95, .05]) < .75){
					noise = p.perlinRec(i + this.x * this.chunkSize, j + this.y * this.chunkSize, [300, 12], [.95, .05]) * .96 + Math.random()*.04;
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
						}else if(noise < .6){
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
						}else if(noise < .6){
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

		this.clear = false;
	}
	get positionX(){
		return this.x * this.tileSize * this.chunkSize;
	}
	get positionY(){
		return this.y * this.tileSize * this.chunkSize;
	}
}
