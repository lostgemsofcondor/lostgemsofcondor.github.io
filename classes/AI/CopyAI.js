class CopyAI {
	constructor(target, copySpeed = false){
		this.target = target;
		this.copySpeed = copySpeed;
	}
	
	calculate(entity){
		var target = game.get(this.target);
		if(target){
			entity.angle = target.angle;
			entity.moving = target.moving;
			if(this.copySpeed){
				entity.speed = target.speed;
			}
		}
	}
}
