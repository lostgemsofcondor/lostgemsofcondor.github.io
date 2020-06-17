class MiniMap {
	constructor(name){
		this.name = name;
		//game.miniMap = this;
		this.canvas = main.addCanvas();
		this.context = this.canvas.getContext("2d");
		this.size = 200;
        this.canvas.width = this.size;
        this.canvas.height = this.size;

        this.offsetX = 18;
        this.offsetY = 18;
        this.context.fillStyle = game.config.gray;
        this.context.fillRect(0, 0, this.size, this.size);


		this.chunks = [];
		this.mapChunkPerMiniMapChunk = 32;
		this.miniChunkSize = this.mapChunkPerMiniMapChunk * game.map.chunkSize;

		
        this.window = new GameWindow(0, 0).setWidth(this.size + this.offsetX * 2).setHeight(this.size + this.offsetY * 2);
		
		this.icons = [];
        
		this.resolution = 1;
		for(var i = -this.resolution; i <= this.resolution; i++){
			for(var j = -this.resolution; j <= this.resolution; j++){
				this.chunks.push(new MiniMapChunk(i, j, this.miniChunkSize, this.mapChunkPerMiniMapChunk));
			}
		}
	}
	  


	redraw(){
		this.window.draw(main.context);

		this.context.fillStyle = game.config.gray;
		this.context.fillRect(0, 0, this.size, this.size);
			
		for(var i in this.chunks){
			var x = this.chunks[i].x * this.miniChunkSize - game.cameraCenterX/game.map.tileSize + this.size/2;
			var y = this.chunks[i].y * this.miniChunkSize - game.cameraCenterY/game.map.tileSize + this.size/2;
			//this.context.drawImage(this.chunks[i].canvas, x, y);
			this.draw(this.chunks[i]);
		}

		this.drawIcons();
		
		main.addToContext(this.canvas, this.offsetX, this.offsetY, this.canvas.width, this.canvas.height);
	}

	draw(chunk, context){
		var adjXCamera = this.size/2;
		var adjYCamera = this.size/2;
		var adjXZero = chunk.x * this.miniChunkSize - game.cameraCenterX/game.map.tileSize + this.size/2;
		var adjYZero = chunk.y * this.miniChunkSize - game.cameraCenterY/game.map.tileSize + this.size/2;

		this.context.save();
		this.context.translate(adjXCamera, adjYCamera);
		this.context.rotate(game.angle);
		this.context.translate(-adjXCamera, -adjYCamera);
		this.context.drawImage(chunk.canvas, adjXZero, adjYZero);
		
		this.context.restore();
	}

	drawIcons(context){
		for(var i in game.icons){
			var icon = game.icons[i];
			if(icon.rotates){
				this.context.save();
				this.context.translate(icon.adjustXCord(), icon.adjustYCord());
				this.context.rotate(icon.angle + game.angle);
				this.context.drawImage(icon.image, -icon.width/2, -icon.height/2, icon.width, icon.height);
				this.context.restore();
			} else {
				this.context.save();
				this.context.translate(icon.adjustXCord(), icon.adjustYCord());
				this.context.rotate(0.01);
				this.context.drawImage(icon.image, -icon.width/2, -icon.height/2, icon.width, icon.height);
				this.context.restore();
			}
		}

	}

	getChunk(x, y){ // x and y in terms of map chunks
		var miniMapChunkX = Math.floor(x / this.mapChunkPerMiniMapChunk);
		var miniMapChunkY = Math.floor(y / this.mapChunkPerMiniMapChunk);
		for(var i in this.chunks){

			if(this.chunks[i].x == miniMapChunkX && this.chunks[i].y == miniMapChunkY){
				return this.chunks[i];
			}
		}
		return this.adjustChunks(miniMapChunkX, miniMapChunkY);
  	}

  
	adjustChunks(x, y){ //run when null miniMapChunk found
		var unboundChunks = [];
		var chunksToBeLoaded = [];
		var returnChunk;
		for(var i in this.chunks){
			if(Math.abs(this.chunks[i].x - x) >= this.resolution*2 || Math.abs(this.chunks[i].y - y) >= this.resolution*2){
				unboundChunks.push(i);
			}
		}
		
		for(var i = -this.resolution; i <= this.resolution; i++){
			for(var j = -this.resolution; j <= this.resolution; j++){
				if(!this.isLoaded(x + i, y + j)){
					chunksToBeLoaded.push({x:x + i, y:y + j});
				}
			}
		}
		if(unboundChunks.length != chunksToBeLoaded.length){
			throw "mini Map Failed?"
		}

		for(var i in unboundChunks){
			this.chunks[unboundChunks[i]].x = chunksToBeLoaded[i].x;
			this.chunks[unboundChunks[i]].y = chunksToBeLoaded[i].y;
			this.chunks[unboundChunks[i]].reload();

			if(this.chunks[unboundChunks[i]].x == x && this.chunks[unboundChunks[i]].y == y){
				returnChunk = this.chunks[unboundChunks[i]];
			}
		}

		return returnChunk;
		
	}

	
	isLoaded(x, y){
		for(var i in this.chunks){
			if(this.chunks[i].x == x && this.chunks[i].y == y){
				return true;
			}
		}
		return false;
	}

}