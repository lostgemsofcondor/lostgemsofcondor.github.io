class Sprite extends Point {
	constructor(x, y){
		super(x, y);
		this.frames = 1;
		this.animationOffset = 0;
		this.animationTime = 20;
	}

	//builder functions
	setDimensions(width, height){
		this.width = width;
		this.height = height;
		return this;
	}

	setAngle(angle){
		this.angle = angle;
		return this;
	}

	setRotates(rotates){
		this.rotates = rotates;
		return this;
	}
	
	setDirection(direction){
		this.direction = direction;
		return this;
	}
	
	setRandomOffset(){
		this.animationOffset = Math.floor(Math.random() * this.frames * this.animationTime);
		return this;
	}

	setAnimationTime(animationTime){
		this.animationTime = animationTime;
		return this;
	}

	setFrames(frames){
		this.frames = frames;
		return this;
	}
	
	//logic functions
	setImage(path, angle = null){
		this.angle = angle;
		if(this.angle === null){
			this.setDirection("right");
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
		return this;
	}


	getImg(){
		if(this.angle === null){
			return this.images[this.direction];
		} else {
			return this.image;
		}
	}

	getAnimationDelta(){
		if(this.frames > 1){
			return this.width * (Math.floor(((game.gameTick + this.animationOffset) % (this.animationTime * this.frames)) / this.animationTime));
		} else {
			return 0;
		}
	}

	adjustXCordSprite(){
		return this.adjustXCord() - this.width / 2;
	}

	adjustYCordSprite(){
		return this.adjustYCord() - this.height;
	}
}
