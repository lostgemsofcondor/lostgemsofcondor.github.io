class ThrowsAI {
	constructor(target, speed){
        this.target = target;
        this.speed = speed;
	}
	
	calculate(entity){
        var target = game.get(this.target);
        if(target && target.moving && entity.moving){
            var r1 = this.speed;
            var r2 = target.speed;
            var theta1 = main.correctMod(entity.angle, Math.PI*2);
            var theta2 = main.correctMod(target.angle, Math.PI*2);
            
            entity.speed = Math.sqrt(r1*r1 + r2*r2 + 2*r1*r2*Math.cos(theta2 - theta1));
            entity.angle = theta1 + Math.atan2(r2*Math.sin(theta2 - theta1), r1 + r2*Math.cos(theta2 - theta1));
        } else {
            entity.speed = this.speed;
        }
	}
}
