class Mortal extends Entity {
    constructor(x, y){
		super(x, y)
			.setLight("medium");
		this.dead = false;
		this.despawnDistance = 4000;
		this.bulletBuilder = new BulletBuilder();
		this.hitSound = game.sounds.defultHit;
	}
	
	setDespawnDistance(despawnDistance){
		this.despawnDistance = despawnDistance;
		return this;
	}

	setMaxHealth(maxHealth){
		this.maxHealth = maxHealth;
		this.health = this.maxHealth;
		return this;
	}

	setHitSound(hitSound){
		this.hitSound = hitSound;
		return this;
		
	}
	
	struck(bullet){
		this.drawHealth = true;
		var damage = bullet.getDamage();
		if(damage > 0){
			if(this.hitSound){
				this.hitSound.play();
			}
			
			this.risingText("-" + damage, "red");
			this.health -= damage; 
			if(this.health <= 0 && !this.dead){
				this.dead = true;
				this.die();
			}
		}
	}
    
	heal(h){
		// might use Math.floor
		var healed = Math.min(h + this.health, this.maxHealth) - this.health;
		if(healed > 0){
			this.risingText("+" + healed, "green");
			this.health += healed;
		}
	}
	
	update(){
		this.checkToDespawn();
		super.update();
	}
	
	checkToDespawn(){
		if(Math.sqrt(Math.pow(this.positionX - game.player.positionX, 2) + Math.pow(this.positionY - game.player.positionY, 2)) >= this.despawnDistance){
			this.delete();
		}
	}
}
