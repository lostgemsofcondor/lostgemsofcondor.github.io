class Game {
	constructor(){
		this.map = {};
		this.player = new Player(playerSpeed);
		this.width;
		this.height;
		this.cameraX = 0;
		this.cameraY = 0;
		this.cameraCenterX = 0;
		this.cameraCenterY = 0;
		this.angle = 0;
		this.rotateSpeed = rotateSpeed/180 * Math.PI;

		this.temp = new Entity("player", 0, 200, 200, 48, 48);
	}

	adjustAllSpriteDirections(){
		this.player.entity.adjustSpriteDirection();
		this.temp.adjustSpriteDirection();
	}

	
	adjustCameraToPlayer(){
		this.cameraCenterX = this.player.positionX;
		this.cameraCenterY = this.player.positionY;
		this.adjustCamera();
	}
	
	adjustCamera(){
		this.cameraX = this.width / 2 - this.cameraCenterX;
		this.cameraY = this.height / 2 - this.cameraCenterY;
		
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
		this.x = x;
		this.sprite.x = x - this.sprite.width / 2;
	}
	set positionY(y) {
		this.y = y;
		this.sprite.y = y - this.sprite.height / 2;
	}
	get positionX(){
		return this.x;
	}
	get positionY(){
		return this.y;
	}
	get angle(){
		//return this.angleAbsolute;
		return this.angleAbsolute - game.angle;
	}
	set angle(theta){
		this.angleAbsolute = theta;
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
		var angle = this.correctMod(this.angleAbsolute/Math.PI*180, 360);
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

	move(){
		if(!this.moving){
			return
		}
		this.positionX += Math.cos(this.angle)*this.speed;
		this.positionY += Math.sin(this.angle)*this.speed;
	}
}

class Map {
	constructor(){
		
	}
}

class Point {
	set positionX(x) {
		this.x = x;
	}
	set positionY(y) {
		this.y = y;
	}
	get positionX(){
		return this.x;
	}
	get positionY(){
		return this.y;
	}
	constructor(x, y){
		this.x = x;
		this.y = y;
	}
}

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
}
