class Enemy extends Entity{
	constructor(path, speed, x, y, width, height, moving = false){
		super(path, speed, x, y, width, height, moving);

		game.add(this);
		this.maxHealth = 100;
		this.health = this.maxHealth;
		this.drawHealth = true;
		// this.key = 0; // for game class
		// this.positionX = 0;
		// this.positionY = 0;
	}
	
	struck(bullet){
		this.health -= 25; 
		if(this.health <= 0){
			this.die()
		}
	}
	
	die(){
		game.delete(this);
	}
}
