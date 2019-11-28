class Text extends Point {
	constructor(x, y, str, life = 60){
		super(x, y);
		
		this.str = str;
		this.deathTick = game.gameTick + life;
		
		this.speed = 1;
		
		game.addText(this);
	}
	
	update(){
		this.angle = 3 * Math.PI / 2 - game.angle;
		this.x = this.x + Math.cos(this.angle)*this.speed;
		this.y = this.y + Math.sin(this.angle)*this.speed;
	}
}
