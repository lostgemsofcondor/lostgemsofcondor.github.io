class BulletAI {
	constructor(entity, life){
		//entity.angle = angle;
		this.timeOfDeath = game.gameTick + life;
	}
	
	calculate(entity){
		if(game.gameTick >= this.timeOfDeath){
			game.delete(entity);
		}
	}
}
