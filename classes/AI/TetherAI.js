class TetherAI {
	constructor(target, offsetX, offsetY, angle){
		this.target = target;
		this.offsetX = Math.cos(angle)*offsetX;
		this.offsetY = Math.sin(angle)*offsetY;
	}
	
	calculate(entity){
		var target = game.get(this.target);
		if(target){
			entity.positionX = target.positionX + this.offsetX;
			entity.positionY = target.positionY + this.offsetY;
		}
	}
}
