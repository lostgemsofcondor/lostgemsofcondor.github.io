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
