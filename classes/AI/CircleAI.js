class CircleAI {
	constructor(target, radius, clockwise = true){
		this.target = target;
		this.radius = radius;
		this.clockwise = clockwise;
	}
	
	calculate(entity){
		entity.moving = true;
		var target = game.get(this.target);
		if(target){
			var d = Math.sqrt(Math.pow(entity.positionX - target.positionX, 2) + Math.pow(entity.positionY - target.positionY, 2));
			var currentAngle = Math.atan((entity.positionY - target.positionY)/(entity.positionX - target.positionX)) + ((entity.positionX - target.positionX) < 0 ? Math.PI : 0);
			var f = (2 * Math.atan(d / this.radius)) * (this.clockwise ? 1 : -1);
			var newAngle = currentAngle + f;
			if(newAngle){
				entity.angle = newAngle;
			}
		}
	}
}
