class Tile {
	constructor(path, width, height){
        this.img = new Image();
        this.img.src = path;
        this.width = width;
        this.height = height;
    }

    draw(i, j){
        
        mapContext.drawImage(this.img, i - (this.width - game.map.tileSize)/2, j - (this.height - game.map.tileSize)/2, this.width, this.height);
    }
}
