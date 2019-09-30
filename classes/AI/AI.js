class AI {
	constructor(entity){
		entity.angle = Math.random() * Math.PI*2;
		this.offset = Math.floor(Math.random() * 60*5);
	}
	
	calculate(entity){
		if((game.gameTick + this.offset) % (60*5) == 0){
			entity.angle = Math.random() * Math.PI*2;
		}
	}
}
