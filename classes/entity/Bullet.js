class Bullet extends Entity{
	constructor(x, y){
		super(x, y);
		this.moving = true;
		this.noCollsion = true;
		this.friendly = true;
		this.piercing = false;
		this.hit = [];
		this.itemKey = null;
		this.baseDamage = 1;
		this.gainEndurance = 0;

		game.add(this);
		// this.key = 0; // for game class
		// this.positionX = 0;
		// this.positionY = 0;
	}

	
	setFriendly(friendly){
		this.friendly = friendly;
		return this;
	}

	setPiercing(piercing){
		this.piercing = piercing;
		return this;
	}

	setNoCollsion(noCollsion){
		this.noCollsion = noCollsion;
		return this;
	}

	setBaseDamage(baseDamage){
		this.baseDamage = baseDamage;
		return this;
	}

	setItemKey(itemKey){
		this.itemKey = itemKey;
		return this;
	}

	setStaminaCost(s){
		if(this.friendly){
			this.gainEndurance = s;
		}
		
		return this;
		
	}

	getDamage(){
		return this.baseDamage; 
	}

	handleHit(){
		if(this.gainEndurance){
			game.experienceService.spendStamina(this.gainEndurance);
		}
		if(this.itemKey){
			new DroppedItem(this.x, this.y).setItemKey(this.itemKey);
		}
	}

    die(){
        super.die();
	}
	
	
	getDescription(){
		if(this.friendly){
			return "Your Bullet it does " + this.baseDamage + " damage";
		}
		return "Looks dangerous it does " + this.baseDamage + " damage";
	}
}
