class MapChunk {
	constructor(x, y, tileSize, chunkSize){
		this.x = x;
		this.y = y;
		this.tileSize = tileSize;
		this.chunkSize = chunkSize;
		
		this.clear = true;
		this.canvas = addCanvas();
		this.context = this.canvas.getContext("2d");

		
		this.canvas.width = this.tileSize * this.chunkSize;
		this.canvas.height = this.tileSize * this.chunkSize;

		this.grass = new Tile("./sprites/background/grassBasic.png", 96, 96);
		this.water = new Tile("./sprites/background/waterBasic.png", 96, 96);

		for(var i = 0; i < this.chunkSize; i += 1){
			var line = [];
			for(var j = 0; j < this.chunkSize; j += 1){
				// rotateAndPaintImage(img, 10, i, j, width, height);
				//var noise = 1;
				var noise = p.perlinRec(i + x * this.chunkSize, j + y * this.chunkSize, [35], [1]);
				if(noise < .3){
					line.push(false);
					this.water.draw(this.context, i * this.tileSize, j * this.tileSize);
					// mapContext.drawImage(water, i, j, width, height);
	
				} else {
					line.push(true);	
					this.grass.draw(this.context, i * this.tileSize, j * this.tileSize);
					// mapContext.drawImage(img, i, j, width, height);
				}
				
			}
			//this.collisionMap.push(line);
		}
	}
	get positionX(){
		return this.x * this.tileSize * this.chunkSize;
	}
	get positionY(){
		return this.y * this.tileSize * this.chunkSize;
	}
}
