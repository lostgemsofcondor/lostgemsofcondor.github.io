class Game {
	constructor(){
		this.map = {};
		this.player = new Player();
		this.width;
		this.height;
		this.cameraX = 0;
		this.cameraY = 0;
		
	}
}

class Player {
	constructor(){
		this.positionX = 0;
		this.positionY = 0;
		this.speed = 15;
		this.sprite = new Sprite("player");
	}
	
}

class Map {
	constructor(){
		
	}
	
	foo(){
		
	}
}

class Sprite {
	constructor(path){
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
