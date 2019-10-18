class Sprite extends Point {
	constructor(path, x, y, width, height, angle = null){
		super(x, y);
		//this.x = x;
		//this.y = y;
		this.width = width;
		this.height = height;
		this.angle = angle;
		if(this.angle === null){
			this.turn("right");
			this.images = {}
			this.images.up = new Image();
			this.images.up.src = "./sprites/" + path + "/up.png";
			this.images.down = new Image();
			this.images.down.src = "./sprites/" + path + "/down.png";
			this.images.left = new Image();
			this.images.left.src = "./sprites/" + path + "/left.png";
			this.images.right = new Image();
			this.images.right.src = "./sprites/" + path + "/right.png";
		} else {
			this.image = new Image();
			this.image.src = path;
		}

	}
	
	getImg(){
		if(this.angle === null){
			return this.images[this.direction];
		} else {
			return this.image
		}
	}
	
	turn(direction){
		this.direction = direction;
	}

	adjustXCordSprite(){
		return this.adjustXCord() - this.width / 2;
	}

	adjustYCordSprite(){
		return this.adjustYCord() - this.height;
	}
}
