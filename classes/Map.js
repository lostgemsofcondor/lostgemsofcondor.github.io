class Map {
	constructor(){
		this.tileSize = 48;
		this.collisionMap = [];
		this.currentMapFunction = this.testMap;

		this.grass = new Tile("./sprites/background/grassBasic.png", 96, 96);
		this.water = new Tile("./sprites/background/waterBasic.png", 96, 96);
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


	testMap() {
		this.currentMapFunction = this.testMap;
		var x = 0;
		var y = 0;
		var width = this.tileSize;
		var height = this.tileSize;
		var sum =0;
		var sum2 =0;
		for(var i = x; i <= x + width*100; i += width){
			sum2++;
			var line = [];
			for(var j = y; j <= y + height*100; j += height){
				// rotateAndPaintImage(img, 10, i, j, width, height);
				if((i >= this.tileSize*4 && i <= this.tileSize*8 && j >= this.tileSize*3 && j <= this.tileSize*30) || (i >= this.tileSize*2 && j >= this.tileSize*15 && j <= this.tileSize*19)){
					line.push(false);
					this.water.draw(i, j);
					// mapContext.drawImage(water, i, j, width, height);
	
				} else {
					line.push(true);	
					this.grass.draw(i, j);
					// mapContext.drawImage(img, i, j, width, height);
				}
				sum++;
				
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
		var sum =0;
		var sum2 =0;
		for(var i = x; i <= x + width*30; i += width/2){
			sum2++;
			for(var j = y; j <= y + height*30; j += height/2){
				// rotateAndPaintImage(img, 10, i, j, width, height);
				mapContext.drawImage(img, i, j, width, height);
				sum++;
				
			}
		}
	}
}
