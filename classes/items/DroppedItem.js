class DroppedItem extends Entity {
	constructor(x, y){
        super(x, y).setDimensions(32, 32);
		game.add(this);
		this.moving = false;
        this.noCollsion = true;
        this.droppedByPlayer = false;
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

    getPicked(){
        if(this.canBePicked()){
            if(new ItemEntity().newEntity(this.itemSpriteKey, "inventory", this.amount)){
                game.delete(this);
            }   
        }
    }

    canBePicked(){
        return !this.droppedByPlayer || this.age >= 180;
    }

}
