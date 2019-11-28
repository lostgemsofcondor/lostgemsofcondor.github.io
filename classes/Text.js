class Text extends Point {
	constructor(x, y, str, life = 60, speed = 2){
		super(x, y);
		
		this.str = str;
		this.speed = speed;
		this.deathTick = game.gameTick + life;
		
		
		game.addText(this);
	}
	
	update(){
		this.angle = 3 * Math.PI / 2 - game.angle;
		this.x = this.x + Math.cos(this.angle)*this.speed;
		this.y = this.y + Math.sin(this.angle)*this.speed;
	}
}
