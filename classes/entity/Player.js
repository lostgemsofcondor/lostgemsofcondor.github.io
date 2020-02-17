class Player extends Mortal {
	constructor(x, y){
		// super("player", speed, 0, 0, 48, 48);
		super(x, y);

		this.key = 0; // for game class
		this.dexterity = 15;
		this.lastShot = -this.dexterity;
		// this.maxHealth = 1000;
		// this.health = this.maxHealth;
		this.friendly = true;

		this.baseRege = 300;
		this.lastRegen = -1;
		// this.positionX = 0;
		// this.positionY = 0;
		this.shoot = game.bulletService.newTripleArrow();
	}

	handelShoot(x, y){
		if((debug.overRideMove ? game.mainTick : game.gameTick) >= this.lastShot + this.dexterity){
			this.lastShot = debug.overRideMove ? game.mainTick : game.gameTick;
			var angle =  Math.atan2(y - this.positionY, x - this.positionX);
			if(key.spaceBar){
				var arrow = game.inventory.getWithItemSpriteKey("arrow");
				if(arrow != null){
					arrow.delete();
				}
				this.shoot = game.bulletService.newTripleArrow();
				this.shoot(angle);
			} else {
				this.shoot = game.bulletService.newSwipeMedium();
				this.shoot(angle);
			}
		}
	}

	// struck(bullet){
	// 	this.drawHealth = true;
	// 	var damage = bullet.getDamage();
	// 	this.risingText("-" + damage, game.config.healthRed);
	// 	this.health -= damage; 
	// 	if(this.health <= 0){
	// 		this.die();
	// 	}
	// }

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

	
}
