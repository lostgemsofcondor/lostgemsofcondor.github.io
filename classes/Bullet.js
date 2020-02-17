class Bullet extends Entity{
	constructor(x, y){
		super(x, y);
		this.moving = true;
		this.noCollsion = true;
		this.friendly = true;
		this.piercing = false;
		this.hit = [];
		this.itemSpriteKey = null;
		this.baseDamage = 1;

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

	setItemSpriteKey(itemSpriteKey){
		this.itemSpriteKey = itemSpriteKey;
		return this;
	}

	getDamage(){
		return this.baseDamage; 
	}

    die(){
		if(this.itemSpriteKey){
			new DroppedItem(this.x, this.y).setItemSpriteKey(this.itemSpriteKey);
		}

        super.die();
    }

}
