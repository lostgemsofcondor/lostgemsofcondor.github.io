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

	adjustXCord(){
		var cos = Math.cos(game.angle);
		var sin = Math.sin(game.angle);
		return cos*(this.positionX - game.cameraCenterX) - sin*(this.positionY - game.cameraCenterY) + game.cameraCenterX + game.cameraX;
	}

	adjustYCord(){
		var cos = Math.cos(game.angle);
		var sin = Math.sin(game.angle);
		return sin*(this.positionX - game.cameraCenterX) + cos*(this.positionY - game.cameraCenterY) + game.cameraCenterY + game.cameraY;
	}
	
	setCords(x, y){
		var cos = Math.cos(-game.angle);
		var sin = Math.sin(-game.angle);
		var adjX = game.cameraCenterX + game.cameraX;
		var adjY = game.cameraCenterY + game.cameraY;
		this.x = cos*(x - adjX) - sin*(y - adjY) + adjX - game.cameraX;
		this.y = sin*(x - adjX) + cos*(y - adjY) + adjY - game.cameraY;
	}
}
