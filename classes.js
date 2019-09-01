class Game {
	constructor(){
		this.map = {};
		this.player = new Player(15);
		this.width;
		this.height;
		this.cameraX = 0;
		this.cameraY = 0;
		
	}
}

class Player {
	set positionX(x) {
		this.entity.positionX = x;
	}
	set positionY(y) {
		this.entity.positionY = y;
	}
	get positionX(){
		return this.entity.positionX;
	}
	get positionY(){
		return this.entity.positionY;
	}
	set speed(x) {
		this.entity.speed = x;
	}
	get speed(){
		return this.entity.speed;
	}

	constructor(speed){
		this.entity = new Entity("player", speed, 0, 0, 48, 48);
		this.positionX = 0;
		this.positionY = 0;
	}
}


class Entity {
	set positionX(x) {
		this.sprite.x = x;
	}
	set positionY(y) {
		this.sprite.y = y;
	}
	get positionX(){
		return this.sprite.x;
	}
	get positionY(){
		return this.sprite.y;
	}

	constructor(path, speed, x, y, width, height){
		this.sprite = new Sprite(path, x, y, width, height);
		this.positionX = x;
		this.positionY = y;
		this.speed = speed;
		this.angle = 0;
		this.moving = false;
	}

	correctMod(a, b){
		return ((a % b) + b) % b;
	}

	adjustSpriteDirection(){
		var angle = this.correctMod(this.angle/Math.PI*180, 360);
		if(angle >= 315 || angle <= 45){
			this.sprite.turn("right");
		} else if(angle > 45 && angle < 135){
			this.sprite.turn("down");
		} else if(angle >= 135 && angle <= 225){
			this.sprite.turn("left");
		} else {
			this.sprite.turn("up");
		}
	}
}

class Map {
	constructor(){
		
	}
}

class Sprite {
	constructor(path, x, y, width, height){
		this.x = x;
		this.y = y;
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
}
