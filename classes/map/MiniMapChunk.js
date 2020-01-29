class MiniMapChunk {
	constructor(x, y, miniChunkSize){
		this.x = x;
		this.y = y;
		this.miniChunkSize = miniChunkSize;

		this.collisionMap = [];
		
		//this.clear = true;
		this.canvas = addCanvas();
		this.context = this.canvas.getContext("2d");
		
		this.canvas.width = this.miniChunkSize;
		this.canvas.height = this.miniChunkSize;
		this.reload();
		
		this.unbound = false;
	}

	get positionX(){
		return this.x * this.miniChunkSize;
	}

	get positionY(){
		return this.y * this.miniChunkSize;
	}

	reload(){
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		//this.context.strokeRect(0, 0, this.canvas.width, this.canvas.height);
		
	}

	putImageData(imgData, x, y){ // x and y in terms of pixels
		this.context.putImageData(imgData, x, y);
	}

}
