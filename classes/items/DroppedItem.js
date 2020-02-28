class DroppedItem extends Entity {
	constructor(x, y){
        super(x, y).setDimensions(32, 32);
		game.add(this);
		this.moving = false;
        this.noCollsion = true;
        this.droppedByPlayer = false;
        this.amount = 1;
    }
    
    setItemSpriteKey(itemSpriteKey){
        this.itemSpriteKey = itemSpriteKey;
        this.sprite.setAngle(0);
        this.sprite.image = game.itemSprites[itemSpriteKey];
        return this;
    }

    setDroppedByPlayer(droppedByPlayer){
        this.droppedByPlayer = droppedByPlayer;
        return this;
    }

    
    setAmount(amount){
        this.amount = amount;
        return this;
    }

    getPicked(){
        if(this.canBePicked()){
            this.amount = new ItemEntity().newEntity(this.itemSpriteKey, "inventory", this.amount);
            if(this.amount <= 0){
                game.delete(this);
            }
        }
    }

    canBePicked(){
        return !this.droppedByPlayer || this.age >= 180;
    }

}
