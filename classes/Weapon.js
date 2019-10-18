class Weapon {
	constructor(path, width, height){
        this.img = new Image();
        this.img.src = path;
        this.width = width;
        this.height = height;
        this.sprite = new Sprite(path, 0, 0, width, height, 0);
    }
}
