class ShootAI {
	constructor(target){
		this.offset = Math.floor(Math.random() * 60*20);
		
	}
	
	calculate(entity){
		if((game.gameTick + this.offset) % (60*20) == 0){
			if(entity.shoot){
				var angle =  Math.atan2(game.player.positionY - entity.positionY, game.player.positionX - entity.positionX);
				entity.shoot(angle);
			}
		}
	}
}
