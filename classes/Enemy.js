class Enemy extends Entity {
	constructor(x, y){
		super(x, y);

		game.add(this);
		this.maxHealth = 4;
		this.health = this.maxHealth;
		this.drawHealth = false;
		// this.key = 0; // for game class
		// this.positionX = 0;
		// this.positionY = 0;
	}
	
	struck(bullet){
		this.drawHealth = true;
		var damage = bullet.getDamage();
		this.risingText("-" + damage, game.config.healthRed);
		this.health -= damage; 
		if(this.health <= 0){
			this.die()
		}
	}
	
	die(){
		game.player.risingText("10xp");
		game.delete(this);
	}
}
