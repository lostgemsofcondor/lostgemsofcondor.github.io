class StopAndShootAI {
	constructor(interval, pauseBeforeShoot){
		this.interval = interval;
		this.pauseBeforeShoot = pauseBeforeShoot;
		this.nextShoot = -1;
		this.offset = Math.floor(Math.random() * interval);
	}
	
	calculate(entity){
		if(entity.moving){
			entity.moving = false;
			this.nextShoot = game.gameTick + this.pauseBeforeShoot;
		}
		if(game.gameTick >= this.nextShoot && (game.gameTick + this.offset) % (this.interval) == 0){
			if(entity.shoot){
				var angle =  Math.atan2(game.player.positionY - entity.positionY, game.player.positionX - entity.positionX);
				entity.shoot(angle);
			}
		}
	}
}
