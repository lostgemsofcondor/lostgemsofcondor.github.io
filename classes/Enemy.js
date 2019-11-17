class Enemy extends Entity{
	constructor(path, speed, x, y, width, height, moving = false){
		super(path, speed, x, y, width, height, moving);

		game.add(this);
		// this.key = 0; // for game class
		// this.positionX = 0;
		// this.positionY = 0;
	}
}
