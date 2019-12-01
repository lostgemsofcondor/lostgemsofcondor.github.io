class Enemy extends Entity{
	constructor(path, speed, x, y, width, height, moving = false, spriteDirection = null, rotates = true){
		super(path, speed, x, y, width, height, moving, spriteDirection, rotates);

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
