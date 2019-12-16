class Tile {
	constructor(path, width, height, tileSize){
        this.img = new Image();
        this.img.src = path;
        this.width = width;
        this.height = height;
        this.tileSize = tileSize;
    }

    draw(mapContext, i, j){
        
        mapContext.drawImage(this.img, i - (this.width - this.tileSize*1.5)/2, j - (this.height - this.tileSize*1.5)/2, this.width, this.height);
    }
}
