class AI {
	constructor(){
		this.angle = Math.random() * Math.PI*2;
		this.offset = Math.floor(Math.random() * 60*5);
	}
	
	calculate(entity){
		entity.moving = true;
		if((game.gameTick + this.offset) % (60*5) == 0){
			this.angle = Math.random() * Math.PI*2;
		}
		entity.angle = this.angle;
	}
}
