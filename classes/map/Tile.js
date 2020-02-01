class Tile {
	constructor(path, width, height, tileSize, color, spawn, noCollision){
        this.img = new Image();
        this.img.src = path;
        this.width = width;
        this.height = height;
        this.tileSize = tileSize;
        this.spawn = spawn;
        this.noCollision = noCollision;

        this.r = parseInt("0x" + color.substring(1,3));
        this.g = parseInt("0x" + color.substring(3,5));
        this.b = parseInt("0x" + color.substring(5,7));
    }

    draw(mapContext, i, j){
        mapContext.drawImage(this.img, i, j, this.width, this.height);
    }
}
