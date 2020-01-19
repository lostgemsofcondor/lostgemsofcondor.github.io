class Player extends Entity {
	constructor(){
		// super("player", speed, 0, 0, 48, 48);
		super(0, 0);

		this.key = 0; // for game class
		this.dexterity = 15;
		this.lastShot = -this.dexterity;
		this.maxHealth = 10;
		this.health = this.maxHealth;

		this.baseRege = 300;
		this.lastRegen = -1;
		// this.positionX = 0;
		// this.positionY = 0;
	}

	handelShoot(x, y){
		if((debug.overRideMove ? game.mainTick : game.gameTick) >= this.lastShot + this.dexterity){
			this.lastShot = debug.overRideMove ? game.mainTick : game.gameTick;
			var angle =  Math.atan2(y - this.positionY, x - this.positionX);
			var arrow = new Bullet(this.positionX, this.positionY).setImage("./sprites/bullets/arrows/arrowGreen.png", angle + Math.PI/4).setSpeed(10).setDimensions(48, 48).setRotates(false).setBaseDamage(1);
			arrow.AI = new BulletAI(arrow, angle, 100);
		}
	}

	struck(bullet){
		this.drawHealth = true;
		var damage = bullet.getDamage();
		this.risingText("-" + damage, game.config.healthRed);
		this.health -= damage; 
		if(this.health <= 0){
			this.die();
		}
	}

	die(){
		//console.log("you died");
		//game.delete(this);
		game.paused = true;
	}

	// might need to go in entity.js
	handleStats(){
		if(this.lastRegen + this.getRegenTime() < game.gameTick){
			this.lastRegen = game.gameTick;
			this.heal(1);
		}
	}

	getRegenTime(){
		return this.baseRege;
	}

	heal(h){
		// might use Math.floor
		var healed = Math.min(h + this.health, this.maxHealth) - this.health;
		if(healed > 0){
			this.risingText("+" + healed, game.config.healthGreen);
			this.health += healed;
		}
	}
	
}
