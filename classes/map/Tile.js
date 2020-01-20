class Tile {
	constructor(path, width, height, tileSize){
        this.img = new Image();
        this.img.src = path;
        this.width = width;
        this.height = height;
        this.tileSize = tileSize;
    }

    draw(mapContext, i, j){
        
        mapContext.drawImage(this.img, i, j, this.width, this.height);
    }
}
