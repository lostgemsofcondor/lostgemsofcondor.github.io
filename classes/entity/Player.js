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

		this.stamina = 20;
		this.maxStamina = 20;
		this.baseStaminaRegen = 60;
		this.lastStaminaRegen = -1;
		this.startedRunningAt = -1;
		this.runLock = false;
		this.running = false;
		this.lastJump = -1;

		this.jumpLength = 3;
		// this.positionX = 0;
		// this.positionY = 0;
		this.bulletBuilder = new BulletBuilder();
		this.shoot = this.bulletBuilder.newTripleArrow(1);

		
        this.sprite.setMovingAnimationFrames(2).setRandomOffset().setMovingAnimationTime(15);
	}

	//override
	setSpeed(speed){
		this.baseSpeed = speed;
		this.speed = speed;
		return this;
	}

	handelShoot(x, y){
		if((main.debug.overRideMove ? game.mainTick : game.gameTick) >= this.lastShot + this.dexterity){
			this.lastShot = main.debug.overRideMove ? game.mainTick : game.gameTick;
			var angle =  Math.atan2(y - this.positionY, x - this.positionX);
			var weaponEntity = game.getInventory("weapons").get(0, 0);
			var ammunitionEntity = game.getInventory("weapons").get(0, 1);
			if(weaponEntity != null){
				var weaponDefinition = weaponEntity.getDefinition();
				if(weaponDefinition instanceof Bow && ammunitionEntity != null && ammunitionEntity.amount >= weaponDefinition.shots){
					this.bulletBuilder = new BulletBuilder();
					var arrow = ammunitionEntity.getDefinition();
					ammunitionEntity.discard(weaponDefinition.shots);
					game.sounds.bowFire.play();
					this.shoot = this.bulletBuilder
						.setTheta(Math.PI)
						.setAmount(weaponDefinition.shots)
						.setTheta(weaponDefinition.theta)
						.setDamage(weaponDefinition.damage + arrow.damage)
						.setDrop(arrow.itemKey)
						.setDropChance(0)
						.build();
					this.shoot(angle);
				} else {
					if(this.reduceStamina(weaponDefinition.cost, false)){
						game.sounds.swipe1.play();
						this.shoot = this.bulletBuilder
							.setImage("./sprites/bullets/melee/swipe.png")
							.setAngle(0)
							.setSize(96)
							.setAmount(1)
							.setTether(true)
							.setLife()
							.setDamage(weaponDefinition.damage)
							.setType(weaponDefinition.type)
							.setCost(weaponDefinition.cost)
							.build();
						this.shoot(angle);
					}
				}
			} else {
				if(this.reduceStamina(1, false)){
					game.sounds.swipe1.play();
					this.shoot = this.bulletBuilder.newSwipeMedium();
					this.shoot(angle);
				}
			}
		}
	}

	die(){
		game.hud.log("You died!")
		this.health = 1;
		this.stamina = 1;
		game.init();
		this.dead = false;
	}

	update(){
		this.handleRegen();
		this.updateSpeed();
		super.update();

		game.save.health = this.health;
		game.save.stamina = this.stamina;
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
		if(this.running && this.startedRunningAt + 3 <= game.gameTick){
			if(this.reduceStamina(1, true)){
				this.startedRunningAt = game.gameTick;
			} else {
				this.running = false;
			}
		}

		if(this.running){
			this.speed = this.baseSpeed*7.63289;
		} else{
			this.speed = this.baseSpeed;
		}
	}

	recoverStamina(s){
		// might use Math.floor
		var recovered = Math.min(s + this.stamina, this.maxStamina) - this.stamina;
		if(recovered > 0){
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
	
	getDescription(){
		return "This is you.";
	}
}
