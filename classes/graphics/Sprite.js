class Sprite extends Point {
	constructor(x, y){
		super(x, y);
		this.frames = 1;
		this.animationOffset = 0;
		this.animationTime = 20;

		this.moving = false;
		
		// Only works for player because of gameLoop.js updateRotation function.
		this.movingAnimation = false;

		this.movingAnimationFrames = 1;
		this.movingAnimationTime = 20;

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
	
	setDirection(direction, moving = false){
		this.direction = direction;
		this.moving = moving;
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

	setMovingAnimationTime(movingAnimationTime){
		this.setMovingAnimation();
		this.movingAnimationTime = movingAnimationTime;
		return this;
	}

	setMovingAnimationFrames(movingAnimationFrames){
		this.setMovingAnimation();
		this.movingAnimationFrames = movingAnimationFrames;
		return this;
	}

	setMovingAnimation(){
		this.movingAnimation = true;
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
			if(this.movingAnimation){
				this.images.movingUp = new Image();
				this.images.movingUp.src = "./sprites/" + path + "/movingUp.png";
				this.images.movingDown = new Image();
				this.images.movingDown.src = "./sprites/" + path + "/movingDown.png";
				this.images.movingLeft = new Image();
				this.images.movingLeft.src = "./sprites/" + path + "/movingLeft.png";
				this.images.movingRight = new Image();
				this.images.movingRight.src = "./sprites/" + path + "/movingRight.png";
			}
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
		if(this.moving){
			if(this.movingAnimationFrames > 1){
				return this.width * (Math.floor(((game.gameTick + this.animationOffset) % (this.movingAnimationTime * this.movingAnimationFrames)) / this.movingAnimationTime));
			}
		} else if(this.frames > 1){
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
