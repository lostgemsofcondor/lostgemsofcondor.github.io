class WeaponAI {
	constructor(){
	}
	
	calculate(entity){
		entity.angle = this.angle();
		entity.sprite.angle = this.angle();
		// entity.positionX = game.player.positionX + Math.cos(-game.angle - Math.PI/2);
		// entity.positionY = game.player.positionY + Math.sin(-game.angle - Math.PI/2);
		entity.positionX = game.player.positionX + Math.cos(game.player.angle - .1);
		entity.positionY = game.player.positionY + Math.sin(game.player.angle - .1);
	}
	
	angle(){
		var absoluteAngle = game.player.angle + game.angle;
		return (absoluteAngle > 3*Math.PI/2 || absoluteAngle <= Math.PI/2 ?  Math.PI/2 : 3*Math.PI/2) - game.angle;
	}
}
