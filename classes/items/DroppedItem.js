class DroppedItem extends Entity {
	constructor(x, y){
        super(x, y).setDimensions(32, 32);
		game.add(this);
		this.moving = false;
        this.noCollsion = true;
        this.droppedByPlayer = false;
        this.amount = 1;
    }

    setItemKey(itemKey){
        this.itemKey = itemKey;
        this.sprite.setAngle(0);
        this.sprite.image = game.itemService[itemKey].img;
        if(this.amount > 1){
            this.name = game.itemService[this.itemKey].name + " (" + this.amount + ")";
        } else {
            this.name = game.itemService[this.itemKey].name;
        }
        return this;
    }

    setDroppedByPlayer(droppedByPlayer){
        this.droppedByPlayer = droppedByPlayer;
        return this;
    }

    
    setAmount(amount){
        this.amount = amount;
        if(this.amount > 1){
            this.name = game.itemService[this.itemKey].name + " (" + this.amount + ")";
        } else {
            this.name = game.itemService[this.itemKey].name;
        }
        return this;
    }

    getPicked(){
        if(this.canBePicked()){
            this.amount = new ItemEntity().newEntity(this.itemKey, "inventory", this.amount);
            if(this.amount <= 0){
                game.delete(this);
            }
        }
    }

    canBePicked(){
        return !this.droppedByPlayer || this.age >= 180;
    }

    getDescription(){
        return game.itemService[this.itemKey].description;
    }

}
