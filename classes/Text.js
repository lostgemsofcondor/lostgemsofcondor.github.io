class Text extends Point {
	constructor(x, y, str){
		super(x, y);
		this.str = str;
		
		// this.color = color;
		// this.speed = speed;
		this.speed = 2;
		this.life = 60;
		this.deathTick = game.gameTick + this.life;
		this.color = game.config.gray;

		game.addText(this);
	}

	setLife(life){
		this.life = life;
		this.deathTick = game.gameTick + this.life;
		return this;
	}

	setSpeed(speed){
		this.speed = speed;
		return this;
	}

	setColor(color){
		this.color = color;
		return this;
	}

	setOffset(y){
		var angle = 3 * Math.PI / 2 - game.angle;
		this.x = this.x + Math.cos(angle)*y;
		this.y = this.y + Math.sin(angle)*y;
		return this;
	}

	update(){
		var angle = 3 * Math.PI / 2 - game.angle;
		this.x = this.x + Math.cos(angle)*this.speed;
		this.y = this.y + Math.sin(angle)*this.speed;
	}
}
