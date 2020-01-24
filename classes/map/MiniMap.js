class MiniMap {
	constructor(){
		this.canvas = addCanvas();
		this.context = this.canvas.getContext("2d");
        this.canvas.width = 500;
        this.canvas.height = 500;

        this.offsetX = 50;
        this.offsetY = 50;
        this.context.fillStyle = game.config.gray;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);


        this.chunks = [];
        
		for(var i = -this.resolution; i <= this.resolution; i++){
			for(var j = -this.resolution; j <= this.resolution; j++){
				this.chunks.push(new MapChunk(i, j, this.tileSize, this.chunkSize));
			}
		}
    }

    redraw(){
        //this.context.fillStyle = game.config.gray;
        //this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    addChunk(imgData, x, y, chunkSize){
		this.context.putImageData(imgData, x * chunkSize, y * chunkSize);
    }

}