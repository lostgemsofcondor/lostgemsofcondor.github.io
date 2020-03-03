class ShootAI {
	constructor(interval){
		this.interval = interval;
		this.offset = Math.floor(Math.random() * interval);
	}
	
	calculate(entity){
		if((game.gameTick + this.offset) % (this.interval) == 0){
			if(entity.shoot){
				var angle =  Math.atan2(game.player.positionY - entity.positionY, game.player.positionX - entity.positionX);
				entity.shoot(angle);
			}
		}
	}
}
