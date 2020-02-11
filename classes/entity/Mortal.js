class Mortal extends Entity {
    constructor(x, y){
        super(x, y);
    }

	setMaxHealth(maxHealth){
		this.maxHealth = maxHealth;
		this.health = this.maxHealth;
		return this;
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
    
	heal(h){
		// might use Math.floor
		var healed = Math.min(h + this.health, this.maxHealth) - this.health;
		if(healed > 0){
			this.risingText("+" + healed, game.config.healthGreen);
			this.health += healed;
		}
    }
    
    die(){
    }
}