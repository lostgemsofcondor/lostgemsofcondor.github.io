class Bullet extends Entity{
	constructor(x, y){
		super(x, y);
		this.moving = true;
		this.noCollsion = true;
		this.friendly = true;

		game.add(this);
		// this.key = 0; // for game class
		// this.positionX = 0;
		// this.positionY = 0;
	}

	
	setFriendly(friendly){
		this.friendly = friendly;
		return this;
	}

	setNoCollsion(noCollsion){
		this.noCollsion = noCollsion;
		return this;
	}

	setBaseDamage(setBaseDamage){
		this.setBaseDamage = setBaseDamage;
		return this;
	}

	getDamage(){
		return this.setBaseDamage; 
	}

}
