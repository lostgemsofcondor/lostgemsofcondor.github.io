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

		this.baseRegen = 300;
		this.lastRegen = -1;

		this.stamina = 100;
		this.maxStamina = 100;
		this.baseStaminaRegen = 60;
		this.lastStaminaRegen = -1;
		this.startedRunningAt = -1;
		this.runLock = false;
		// this.positionX = 0;
		// this.positionY = 0;
		this.shoot = game.bulletService.newTripleArrow();
	}
	//override
	setSpeed(speed){
		this.baseSpeed = speed;
		this.speed = speed;
		return this;
	}

	handelShoot(x, y){
		if((debug.overRideMove ? game.mainTick : game.gameTick) >= this.lastShot + this.dexterity){
			this.lastShot = debug.overRideMove ? game.mainTick : game.gameTick;
			var angle =  Math.atan2(y - this.positionY, x - this.positionX);
			if(key.spaceBar){
				var arrow = game.inventory.getWithItemSpriteKey("arrow");
				if(arrow != null){
					arrow.delete();
					this.shoot = game.bulletService.newTripleArrow();
					this.shoot(angle);
				}
			} else {
				if(this.reduceStamina(2, false)){
					this.shoot = game.bulletService.newSwipeMedium();
					this.shoot(angle);
				}
			}
		}
	}

	die(){
		game.paused = true;
	}

	update(){
		this.handleRegen();
		this.updateSpeed();
		super.update();
	}

	reduceStamina(s, gainEXP){
		if(this.stamina >= s){
			this.stamina -= s;
			if(gainEXP){

				game.experienceService.spendStamina(s);
			}

			return true;
		} else {
			return false;
		}
	}

	updateSpeed(){
		if(!this.moving){
			return;
		}
		if(this.running && this.startedRunningAt + 40 <= game.gameTick){
			if(this.reduceStamina(1, true)){
				this.startedRunningAt = game.gameTick;
			} else {
				this.running = false;
			}
		}

		if(this.running){
			this.speed = this.baseSpeed*2;
		} else{
			this.speed = this.baseSpeed;
		}
	}


	recoverStamina(s){
		// might use Math.floor
		var recovered = Math.min(s + this.stamina, this.maxStamina) - this.stamina;
		if(recovered > 0){
			//this.risingText("+" + recovered, game.config.healthGreen);
			this.stamina += recovered;
		}
	}
	
	handleRegen(){
		if(this.lastRegen + this.getRegenTime() < game.gameTick){
			this.lastRegen = game.gameTick;
			this.heal(1);
		}

		if(this.lastStaminaRegen + this.getStaminaRegenTime() < game.gameTick){
			this.lastStaminaRegen = game.gameTick;
			this.recoverStamina(1);
		}
	}

	getRegenTime(){
		return this.baseRegen;
	}

	getStaminaRegenTime(){
		return this.baseStaminaRegen;
	}	
}
