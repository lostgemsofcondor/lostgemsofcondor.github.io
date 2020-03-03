class BuilderAI {
	constructor(life1, life2, AI1, AI2){
		this.offset = Math.floor(Math.random() * (life1 + life2));
		this.life1 = life1;
		this.life2 = life2;
		this.AI1 = AI1;
		this.AI2 = AI2;
	}
	
	calculate(entity){
		if((game.gameTick + this.offset) % (this.life1 + this.life2) <= this.life1){
			if(this.AI1){
				this.AI1.calculate(entity);
			}
		} else {
			if(this.AI2){
				this.AI2.calculate(entity);
			}
		}
	}
}
