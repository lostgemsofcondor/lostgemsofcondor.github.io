class Enemy extends Entity{
	constructor(x, y){
		super(x, y);

		game.add(this);
		this.maxHealth = 100;
		this.health = this.maxHealth;
		this.drawHealth = true;
		// this.key = 0; // for game class
		// this.positionX = 0;
		// this.positionY = 0;
	}
	
	struck(bullet){
		var damage = 25;
		var t = new Text(this.x, this.y, damage);
		this.health -= damage; 
		if(this.health <= 0){
			this.die()
		}
	}
	
	die(){
		game.delete(this);
	}
}
