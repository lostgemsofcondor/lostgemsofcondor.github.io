class WeaponAI {
	constructor(){
	}
	
	calculate(entity){
		entity.angle = game.player.entity.angle;
		entity.sprite.angle = game.player.entity.angle;
		// entity.positionX = game.player.positionX + Math.cos(-game.angle - Math.PI/2);
		// entity.positionY = game.player.positionY + Math.sin(-game.angle - Math.PI/2);
		entity.positionX = game.player.positionX + Math.cos(game.player.entity.angle - .1);
		entity.positionY = game.player.positionY + Math.sin(game.player.entity.angle - .1);
	}
}
