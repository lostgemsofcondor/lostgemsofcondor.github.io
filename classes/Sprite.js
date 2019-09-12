class Sprite extends Point {
	constructor(path, x, y, width, height){
		super(x, y);
		//this.x = x;
		//this.y = y;
		this.width = width;
		this.height = height;

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
	}
	
	getImg(){
		return this.images[this.direction];
	}
	
	turn(direction){
		this.direction = direction;
	}

	adjustXCordSprite(){
		return this.adjustXCord() - this.width / 2;
	}

	adjustYCordSprite(){
		return this.adjustYCord() - this.height / 2;
	}
}
